import { Router, Request, Response } from "express";
import { GoogleGenerativeAI } from "@google/generative-ai";
import { getEnvVariable } from "@/config";

const router = Router();

const genAI = new GoogleGenerativeAI(getEnvVariable("GEMINI_API_KEY") || "გამარჯბოა");

router.post("/chat", async (req: Request, res: Response) => {
  try {
    const { message, history } = req.body;

    if (!message) {
      return res.status(400).json({ error: "Message is required" });
    }

    const model = genAI.getGenerativeModel({ model: "gemini-2.5-pro" });

    const isTestRequest =
      message.toLowerCase().includes("ტესტ") ||
      message.toLowerCase().includes("test") ||
      message.toLowerCase().includes("შეკითხვ");

    let prompt = message;
    let systemPrompt = `შენ ხარ AI ასისტენტი მოსწავლეებისთვის. დაეხმარე მათ სასწავლო მასალებში, ახსენი რთული თემები მარტივად და გასაგებად. პასუხობ ქართულ ენაზე და ყოველთვის მეგობრულად და მხარდამჭერად.`;

    if (isTestRequest) {
      systemPrompt = `შენ ქმნი ტესტებს მოსწავლეებისთვის. შექმენი ტესტი იმ თემაზე რაც მოთხოვნილია.

      ᲛᲜᲘᲨᲕᲜᲔᲚᲝᲕᲐᲜᲘ: პასუხი უნდა იყოს ამ ფორმატში:
      {
        "type": "test",
        "topic": "თემის სახელი",
        "questions": [
          {
            "question": "კითხვის ტექსტი",
            "options": ["ვარიანტი A", "ვარიანტი B", "ვარიანტი C", "ვარიანტი D"],
            "correct": 0
          }
        ]
      }

      - შექმენი 5 კითხვა
      - correct არის სწორი პასუხის ინდექსი (0, 1, 2, ან 3)
      - კითხვები უნდა იყოს შესაბამისი დონის
      - დააბრუნე მხოლოდ JSON, არაფერი სხვა`;
    }

    const fullPrompt = `${systemPrompt}\n\nმოსწავლის კითხვა: ${prompt}`;

    // If client accepts streaming, respond as text/event-stream and stream partial text
    const wantsStream =
      (req.headers['accept'] || '').includes('text/event-stream') ||
      req.query.stream === '1' ||
      req.headers['x-stream'] === '1';

    if (wantsStream) {
      // SSE-style streaming
      res.setHeader('Content-Type', 'text/event-stream; charset=utf-8');
      res.setHeader('Cache-Control', 'no-cache, no-transform');
      res.setHeader('Connection', 'keep-alive');
      // flush headers
      res.flushHeaders?.();

      try {
        const result = await model.generateContent(fullPrompt);
        const responseObj: any = result.response;

        let testData: any = null;

        // If library exposes a streamable body (ReadableStream), try to consume it directly
        if (responseObj?.body && typeof responseObj.body.getReader === 'function') {
          const reader = responseObj.body.getReader();
          const decoder = new TextDecoder();
          while (true) {
            const { done, value } = await reader.read();
            if (done) break;
            const chunkText = decoder.decode(value, { stream: true });
            // send chunk as SSE data
            res.write(`data: ${chunkText.replace(/\n/g, '\\n')}\n\n`);
          }
        } else {
          // Fallback: get full text then stream it in slices so client can receive progressively
          let text = await responseObj.text();

          // try parse test JSON if present (for test requests)
          if (isTestRequest) {
            try {
              const jsonMatch = text.match(/\{[\s\S]*\}/);
              if (jsonMatch) {
                testData = JSON.parse(jsonMatch[0]);
                // remove JSON from streamed text summary (so client doesn't show huge JSON inline)
                text = `შევქმენი ტესტი თემაზე: ${testData.topic}. ტესტი შეიცავს ${testData.questions.length} კითხვას. დაიწყე პასუხების გაცემა!`;
              }
            } catch (e) {
              console.error("Failed to parse test JSON:", e);
            }
          }

          const chunkSize = 120; // chars per chunk
          for (let i = 0; i < text.length; i += chunkSize) {
            const part = text.slice(i, i + chunkSize);
            res.write(`data: ${part.replace(/\n/g, '\\n')}\n\n`);
          }

          // if no test JSON parsed earlier and it is a test request try final parse now
          if (isTestRequest && !testData) {
            try {
              const jsonMatch = responseObj.text().match(/\{[\s\S]*\}/);
              if (jsonMatch) {
                testData = JSON.parse(jsonMatch[0]);
              }
            } catch (e) {
              // ignore parsing failure
            }
          }
        }

        // send test JSON as a special event if present so client can detect and parse it
        if (isTestRequest && testData) {
          // use a distinct event name for structured payload
          res.write(`event: test\n`);
          res.write(`data: ${JSON.stringify(testData)}\n\n`);
        }

        // indicate done
        res.write(`event: done\n`);
        res.write(`data: [DONE]\n\n`);
        res.end();
        return;
      } catch (err) {
        console.error('Stream generation error:', err);
        res.write(`event: error\n`);
        res.write(`data: ${JSON.stringify({ message: 'შეცდომა გენერაციისას' })}\n\n`);
        res.end();
        return;
      }
    }

    // Non-streaming fallback: original behaviour (return full JSON)
    const result = await model.generateContent(fullPrompt);
    const response = result.response;
    console.log("AI Chat Result:", response);
    let text = response.text();

    let testData = null;
    if (isTestRequest) {
      try {
        const jsonMatch = (await text).match(/\{[\s\S]*\}/);
        if (jsonMatch) {
          testData = JSON.parse(jsonMatch[0]);
          text = `შევქმენი ტესტი თემაზე: ${testData.topic}. ტესტი შეიცავს ${testData.questions.length} კითხვას. დაიწყე პასუხების გაცემა!`;
        } else {
          text = await text;
        }
      } catch (e) {
        console.error("Failed to parse test JSON:", e);
        text = await text;
      }
    } else {
      text = await text;
    }

    res.json({
      response: text,
      test: testData,
    });
  } catch (error) {
    console.log("AI Chat Error:", error);
    res.status(500).json({
      error: "Internal server error",
      response: "ბოდიში, დაფიქსირდა შეცდომა. გთხოვ სცადო თავიდან.",
    });
  }
});

export default router;

// import { Router, Request, Response } from "express";
// import { GoogleGenerativeAI } from "@google/generative-ai";
// import { getEnvVariable } from "@/config";

// const router = Router();

// const genAI = new GoogleGenerativeAI(getEnvVariable("GEMINI_API_KEY"));

// // ძირითადი სისტემური პრომპტი განათლებისთვის
// const EDUCATION_SYSTEM_PROMPT = `შენ ხარ პროფესიონალი AI ასისტენტი ქართველი მოსწავლეებისთვის (1-12 კლასი). შენი მთავარი მიზანია სასწავლო პროცესში დახმარება და ცოდნის გაღრმავება.

// 🎯 ᲨᲔᲜᲘ როლი:
// - განათლების ხელშემწყობი და მოტივატორი
// - რთული კონცეფციების მარტივად ამხსნელი
// - ინტერაქტიული ტესტების შემქმნელი
// - მოსწავლის ინდივიდუალური საჭიროებების გამთვალისწინებელი

// 📚 ᲡᲐᲒᲜᲔᲑᲘ რომლებშიც ეხმარები:
// - მათემატიკა (არითმეტიკა, ალგებრა, გეომეტრია, ტრიგონომეტრია)
// - ქართული ენა და ლიტერატურა
// - უცხო ენები (ინგლისური, რუსული)
// - ისტორია (საქართველოს და მსოფლიო)
// - გეოგრაფია
// - ბიოლოგია, ქიმია, ფიზიკა
// - ინფორმატიკა და პროგრამირება
// - სამოქალაქო განათლება

// ✅ როგორ პასუხობ კითხვებზე:
// 1. თავდაპირველად აფასებ მოსწავლის დონეს კითხვიდან
// 2. ხსნი მარტივი, გასაგები ენით
// 3. იყენებ კონკრეტულ მაგალითებს ყოველდღიური ცხოვრებიდან
// 4. ანიჭებ პროგრესულ სირთულეს
// 5. აძლევ დამატებით რესურსებს თუ საჭიროა
// 6. ამოწმებ გაგებას დამატებითი კითხვებით

// ❌ რას არ აკეთებ:
// - არ იძლევა პირდაპირ პასუხებს საშინაო დავალებებზე (ეხმარები გააზრებაში)
// - არ საუბრობ არასასკოლო თემებზე (პოლიტიკა, რელიგია, ვიოლენსია)
// - არ აბნევ რთული ტერმინოლოგიით
// - არ აძლევ არასწორ ინფორმაციას

// 💬 ᲙᲝᲛᲣᲜᲘᲙᲐᲪᲘᲘᲡ სტილი:
// - მეგობრული და მხარდამჭერი
// - მოთმინებიანი და მოტივირებული
// - პოზიტიური რეინფორსმენტი შეცდომებზე
// - იხმარე emoji-ები ენერგიისთვის 🌟📚✨
// - დაელოდე პასუხს რთულ კითხვებზე ("კარგი კითხვაა! მოდი ვიფიქროთ ერთად...")

// 🎓 მოსწავლის მხარდაჭერა:
// - თუ მოსწავლე იბნევა: "არ ინერვიულო! ეს რთული თემაა, მაგრამ ერთად გავართვით 💪"
// - თუ სწორად პასუხობს: "შესანიშნავია! 🌟 ჭკვიანად იფიქრე!"
// - თუ შეცდომას უშვებს: "კარგი მცდელობა! მოდი შევხედოთ კიდევ ერთხელ 🤔"

// ᲛᲜᲘᲨᲕᲜᲔᲚᲝᲕᲐᲜᲘ: ყოველთვის პასუხობ ქართულად და ყოველთვის ფოკუსირებული ხარ განათლებაზე!`;

// // ტესტის შექმნის სპეციალური პრომპტი
// const TEST_CREATION_PROMPT = `შენ ქმნი ინტერაქტიულ ტესტებს ქართველი მოსწავლეებისთვის.

// 🎯 ტესტის შექმნის წესები:

// 1. ᲗᲔᲛᲘᲡ ანალიზი:
//    - გააანალიზე რა თემაზე იხსენება ტესტი
//    - განსაზღვრე რომელ კლასს შეეფერება (1-12)
//    - გაიაზრე რა დონის უნდა იყოს კითხვები

// 2. ᲙᲘᲗᲮᲕᲔᲑᲘᲡ ᲡᲢᲠᲣᲥᲢᲣᲠᲐ:
//    - შექმენი 5 კითხვა
//    - კითხვები უნდა იყოს პროგრესული (ადვილიდან რთულამდე)
//    - თითოეულ კითხვას 4 ვარიანტი (A, B, C, D)
//    - მხოლოდ 1 სწორი პასუხი
//    - არასწორი ვარიანტები უნდა იყოს დამაჯერებელი მაგრამ აშკარად არასწორი

// 3. ᲙᲘᲗᲮᲕᲔᲑᲘᲡ ᲢᲘᲞᲔᲑᲘ (მოურთავე):
//    - ფაქტობრივი ცოდნა
//    - გაგება და გააზრება  
//    - გამოყენება პრაქტიკაში
//    - ანალიზი და სინთეზი
//    - შეფასება

// 4. ᲗᲔᲛᲔᲑᲘᲡ მაგალითები:
//    - მათემატიკა: "პითაგორას თეორემა", "წილადები", "განტოლებები"
//    - ქართული: "მარტივი წინადადება", "ზმნის დროები", "ლიტერატურული ეპოქები"
//    - ისტორია: "საქართველოს გაერთიანება", "პირველი მსოფლიო ომი"
//    - ბიოლოგია: "ფოტოსინთეზი", "უჯრედის აგებულება"
//    - ქიმია: "ატომის აგებულება", "ქიმიური ელემენტები"
//    - ფიზიკა: "ნიუტონის კანონები", "ელექტრობა"

// 5. ᲗᲐᲕᲘᲓᲐᲜ ᲐᲪᲘᲚᲔᲑᲐ:
//    ❌ არ შექმნა ძალიან მარტივი კითხვები (გარდა დაწყებითი კლასებისა)
//    ❌ არ გამოიყენო ბუნდოვანი ფორმულირებები
//    ❌ არ შექმნა ორაზროვანი კითხვები
//    ❌ არ იყოს რთული ტერმინოლოგია მცირე კლასებისთვის

// 6. JSON ფორმატი:
// {
//   "type": "test",
//   "topic": "თემის სახელი (ქართულად)",
//   "subject": "საგანი",
//   "grade": "კლასი (1-12)",
//   "difficulty": "ადვილი/საშუალო/რთული",
//   "questions": [
//     {
//       "question": "კითხვის ტექსტი?",
//       "options": ["პასუხი A", "პასუხი B", "პასუხი C", "პასუხი D"],
//       "correct": 0,
//       "explanation": "მოკლე ახსნა რატომ არის ეს პასუხი სწორი"
//     }
//   ]
// }

// ᲛᲜᲘᲨᲕᲜᲔᲚᲝᲕᲐᲜᲘ: 
// - correct არის ინდექსი (0, 1, 2, 3)
// - explanation უნდა იყოს მოკლე და გასაგები
// - questions მასივში უნდა იყოს ზუსტად 5 ობიექტი
// - დააბრუნე მხოლოდ JSON, არაფერი სხვა!`;

// router.post("/chat", async (req: Request, res: Response) => {
//   try {
//     const { message, history } = req.body;

//     if (!message) {
//       return res.status(400).json({ error: "Message is required" });
//     }

//     // შემოწმება: ეხება თუ არა განათლებას
//     const educationKeywords = [
//       "ტესტ",
//       "test",
//       "შეკითხვ",
//       "კითხვ",
//       "საშინაო",
//       "დავალება",
//       "მათემატიკ",
//       "ქართულ",
//       "ინგლისურ",
//       "ისტორი",
//       "გეოგრაფი",
//       "ბიოლოგი",
//       "ქიმი",
//       "ფიზიკ",
//       "ინფორმატიკ",
//       "განმარტ",
//       "ახსენ",
//       "როგორ",
//       "რა არის",
//       "რატომ",
//       "math",
//       "geography",
//       "biology",
//       "chemistry",
//       "physics",
//       "history",
//       "explain",
//       "გამოთვალ",
//       "ამოხსნ",
//       "სწავლ",
//       "კლას",
//       "მოსწავლ",
//       "მასწავლებ",
//       "საგან",
//       "გაკვეთილ",
//     ];

//     const isEducationRelated = educationKeywords.some((keyword) =>
//       message.toLowerCase().includes(keyword.toLowerCase())
//     );

//     // თუ არ არის განათლებასთან დაკავშირებული
//     if (
//       !isEducationRelated &&
//       !message.toLowerCase().includes("გამარჯობა") &&
//       !message.toLowerCase().includes("hello")
//     ) {
//       return res.json({
//         response: `😊 ბოდიში, მე ვარ განათლების ასისტენტი და დავეხმარები მხოლოდ სასწავლო მასალებში!

// 📚 შემიძლია დაგეხმარო:
// - საშინაო დავალებების გაგებაში
// - სხვადასხვა საგნების ახსნაში
// - ტესტების შექმნაში და ჩატარებაში
// - სასწავლო მასალის გააზრებაში

// 🎯 მაგალითები რაც შემიძლია:
// - "ახსენი პითაგორას თეორემა"
// - "შექმენი ტესტი ისტორიაში"
// - "როგორ ვამოხსნა ეს განტოლება?"
// - "რა არის ფოტოსინთეზი?"

// დამისვი კითხვა სასწავლო მასალაზე! 📖✨`,
//       });
//     }

//     const model = genAI.getGenerativeModel({
//       model: "gemini-1.5-flash",
//       generationConfig: {
//         temperature: 0.7,
//         topP: 0.8,
//         topK: 40,
//       },
//     });

//     // ტესტის მოთხოვნის შემოწმება
//     const isTestRequest =
//       message.toLowerCase().includes("ტესტ") ||
//       message.toLowerCase().includes("test") ||
//       message.toLowerCase().includes("შეკითხვ") ||
//       (message.toLowerCase().includes("შექმენ") &&
//         (message.toLowerCase().includes("კითხვ") ||
//           message.toLowerCase().includes("დავალება")));

//     let fullPrompt: string;
//     let shouldParseTest = false;

//     if (isTestRequest) {
//       shouldParseTest = true;
//       fullPrompt = `${TEST_CREATION_PROMPT}

// მოსწავლის მოთხოვნა: "${message}"

// გაიაზრე რა თემაზე სურს ტესტი და შექმენი შესაბამისი 5 კითხვა JSON ფორმატში.`;
//     } else {
//       fullPrompt = `${EDUCATION_SYSTEM_PROMPT}

// მოსწავლის კითხვა: "${message}"

// გაეხილე კითხვას ყურადღებით და მიეცი სრული, გასაგები პასუხი ქართულ ენაზე.`;
//     }

//     const result = await model.generateContent(fullPrompt);
//     const response = await result.response;
//     let text = response.text();

//     // ტესტის პარსინგი
//     let testData = null;
//     if (shouldParseTest) {
//       try {
//         // JSON-ის ამოღება markdown ფორმატიდან
//         const jsonMatch =
//           text.match(/```json\s*([\s\S]*?)\s*```/) ||
//           text.match(/```\s*([\s\S]*?)\s*```/) ||
//           text.match(/\{[\s\S]*\}/);

//         if (jsonMatch) {
//           const jsonStr = jsonMatch[1] || jsonMatch[0];
//           testData = JSON.parse(jsonStr);

//           // ვალიდაცია
//           if (
//             testData &&
//             testData.questions &&
//             testData.questions.length === 5
//           ) {
//             text = `✅ შევქმენი ტესტი თემაზე: **${testData.topic}**

// 📚 **საგანი:** ${testData.subject}
// 📊 **კლასი:** ${testData.grade}
// ⚡ **სირთულე:** ${testData.difficulty}

// ტესტი შეიცავს 5 კითხვას. გისურვებ წარმატებებს! 🌟

// დაიწყე პასუხის გაცემა!`;
//           } else {
//             throw new Error("Invalid test structure");
//           }
//         } else {
//           throw new Error("JSON not found in response");
//         }
//       } catch (e) {
//         console.error("Failed to parse test JSON:", e);
//         testData = null;
//         text = `😔 ბოდიში, ვერ შევძელი ტესტის შექმნა. გთხოვ სცადო კიდევ ერთხელ უფრო კონკრეტული თემით.

// მაგალითად:
// - "შექმენი ტესტი პითაგორას თეორემაზე"
// - "მჭირდება ტესტი საქართველოს ისტორიაში"
// - "გამიკეთე ტესტი ქიმიურ ელემენტებზე"`;
//       }
//     }

//     res.json({
//       response: text,
//       test: testData,
//     });
//   } catch (error: any) {
//     console.error("AI Chat Error:", error);

//     // Google API error handling
//     if (error.message?.includes("API key")) {
//       return res.status(500).json({
//         error: "API Configuration Error",
//         response:
//           "😔 ტექნიკური პრობლემა API key-თან. გთხოვ შეატყობინო ადმინისტრატორს.",
//       });
//     }

//     if (error.message?.includes("quota")) {
//       return res.status(429).json({
//         error: "Rate Limit Exceeded",
//         response:
//           "⏳ ძალიან ბევრი მოთხოვნაა. გთხოვ დაელოდო 1 წუთს და სცადო თავიდან.",
//       });
//     }

//     res.status(500).json({
//       error: "Internal server error",
//       response:
//         "😔 ბოდიში, დაფიქსირდა შეცდომა. გთხოვ სცადო თავიდან ან განაახლო გვერდი.",
//     });
//   }
// });

// export default router;

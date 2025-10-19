import React, { JSX, useState } from 'react';
import { Send, BookOpen, Sparkles } from 'lucide-react';

interface Message {
  role: 'user' | 'assistant';
  content: string;
}

interface ApiResponse {
  candidates?: Array<{
    content?: {
      parts?: Array<{
        text?: string;
      }>;
    };
  }>;
}

export default function AiAssistant(): JSX.Element {
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState<string>('');
  const [loading, setLoading] = useState<boolean>(false);

  const API_KEY: string = 'AIzaSyCOErA50AhrSLfnPahYc9I4kTVajKj_TTo';

  const sendMessage = async (): Promise<void> => {
    if (!input.trim()) return;

    const userMessage: Message = { role: 'user', content: input };
    const currentQuestion = input;
    setMessages(prev => [...prev, userMessage]);
    setInput('');
    setLoading(true);

    try {
      const requestBody = {
        contents: [{
          parts: [{
            text: `შენ ხარ მეგობრული და გამოცდილი მასწავლებელი ბავშვებისთვის. უპასუხე შემდეგ კითხვას მარტივად, გასაგებად და საინტერესოდ ქართულ ენაზე. გამოიყენე მაგალითები და ემოჯები. კითხვა: ${currentQuestion}`
          }]
        }],
        generationConfig: {
          temperature: 0.9,
          maxOutputTokens: 2000,
          topP: 1,
        },
        safetySettings: [
          {
            category: "HARM_CATEGORY_HARASSMENT",
            threshold: "BLOCK_NONE"
          },
          {
            category: "HARM_CATEGORY_HATE_SPEECH",
            threshold: "BLOCK_NONE"
          },
          {
            category: "HARM_CATEGORY_SEXUALLY_EXPLICIT",
            threshold: "BLOCK_NONE"
          },
          {
            category: "HARM_CATEGORY_DANGEROUS_CONTENT",
            threshold: "BLOCK_NONE"
          }
        ]
      };

      console.log('Sending request to API...');
      
      const response = await fetch(
        `https://generativelanguage.googleapis.com/v1/models/gemini-pro:generateContent?key=${API_KEY}`,
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(requestBody)
        }
      );

      console.log('Response status:', response.status);
      
      const data: ApiResponse = await response.json();
      console.log('API Response:', data);
      
      if (!response.ok) {
        console.error('API Error:', data);
        throw new Error(`API Error: ${response.status} - ${JSON.stringify(data)}`);
      }
      
      const aiResponse: string = data.candidates?.[0]?.content?.parts?.[0]?.text || 'ვერ მივიღე პასუხი. სცადე კიდევ ერთხელ!';
      
      setMessages(prev => [...prev, { role: 'assistant', content: aiResponse }]);
    } catch (error) {
      console.error('Detailed Error:', error);
      const errorMessage = error instanceof Error ? error.message : 'უცნობი შეცდომა';
      setMessages(prev => [...prev, { 
        role: 'assistant', 
        content: `😕 დაფიქსირდა შეცდომა:\n${errorMessage}\n\nგახსენი Console (F12) დეტალებისთვის!` 
      }]);
    } finally {
      setLoading(false);
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent<HTMLInputElement>): void => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      sendMessage();
    }
  };

  const setExampleQuestion = (question: string): void => {
    setInput(question);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-purple-50 to-pink-50 p-4">
      <div className="max-w-3xl mx-auto">
        {/* Header */}
        <div className="bg-white rounded-2xl shadow-lg p-6 mb-4">
          <div className="flex items-center gap-3">
            <div className="bg-gradient-to-br from-purple-500 to-pink-500 p-3 rounded-xl">
              <BookOpen className="w-8 h-8 text-white" />
            </div>
            <div>
              <h1 className="text-2xl font-bold text-gray-800">ჭკვიანი მასწავლებელი 🎓</h1>
              <p className="text-sm text-gray-600">დამისვი შეკითხვა და გავგიხსნი!</p>
            </div>
          </div>
        </div>

        {/* Chat Area */}
        <div className="bg-white rounded-2xl shadow-lg p-6 mb-4 h-96 overflow-y-auto">
          {messages.length === 0 ? (
            <div className="h-full flex flex-col items-center justify-center text-center">
              <Sparkles className="w-16 h-16 text-purple-400 mb-4" />
              <h3 className="text-xl font-semibold text-gray-700 mb-2">გამარჯობა! 👋</h3>
              <p className="text-gray-500">დამისვი რამე შეკითხვა და მე გავგიხსნი მარტივად!</p>
              <div className="mt-6 grid grid-cols-1 gap-2 text-sm">
                <button
                  onClick={() => setExampleQuestion('რა არის ფოტოსინთეზი?')}
                  className="px-4 py-2 bg-purple-100 hover:bg-purple-200 rounded-lg text-purple-700 transition-colors"
                >
                  💡 რა არის ფოტოსინთეზი?
                </button>
                <button
                  onClick={() => setExampleQuestion('როგორ მუშაობს კომპიუტერი?')}
                  className="px-4 py-2 bg-blue-100 hover:bg-blue-200 rounded-lg text-blue-700 transition-colors"
                >
                  💻 როგორ მუშაობს კომპიუტერი?
                </button>
              </div>
            </div>
          ) : (
            <div className="space-y-4">
              {messages.map((msg: Message, idx: number) => (
                <div
                  key={idx}
                  className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}
                >
                  <div
                    className={`max-w-xs lg:max-w-md px-4 py-3 rounded-2xl ${
                      msg.role === 'user'
                        ? 'bg-gradient-to-br from-purple-500 to-pink-500 text-white'
                        : 'bg-gray-100 text-gray-800'
                    }`}
                  >
                    <p className="whitespace-pre-wrap">{msg.content}</p>
                  </div>
                </div>
              ))}
              {loading && (
                <div className="flex justify-start">
                  <div className="bg-gray-100 px-4 py-3 rounded-2xl">
                    <div className="flex gap-2">
                      <div className="w-2 h-2 bg-purple-400 rounded-full animate-bounce"></div>
                      <div className="w-2 h-2 bg-purple-400 rounded-full animate-bounce delay-100"></div>
                      <div className="w-2 h-2 bg-purple-400 rounded-full animate-bounce delay-200"></div>
                    </div>
                  </div>
                </div>
              )}
            </div>
          )}
        </div>

        {/* Input Area */}
        <div className="bg-white rounded-2xl shadow-lg p-4">
          <div className="flex gap-2">
            <input
              type="text"
              value={input}
              onChange={(e: React.ChangeEvent<HTMLInputElement>) => setInput(e.target.value)}
              onKeyPress={handleKeyPress}
              placeholder="დაწერე შენი შეკითხვა აქ..."
              className="flex-1 px-4 py-3 border-2 border-gray-200 rounded-xl focus:outline-none focus:border-purple-400 transition-colors"
              disabled={loading}
            />
            <button
              onClick={sendMessage}
              disabled={loading || !input.trim()}
              className="bg-gradient-to-br from-purple-500 to-pink-500 text-white px-6 py-3 rounded-xl hover:shadow-lg transition-all disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <Send className="w-5 h-5" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
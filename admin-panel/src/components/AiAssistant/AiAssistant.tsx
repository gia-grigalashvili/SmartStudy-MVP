// import React, { useState, useEffect, useRef } from 'react';
// import { Send, BookOpen, FileText, CheckCircle, XCircle, RotateCcw } from 'lucide-react';

export default function AiAssistant() {
//   const [messages, setMessages] = useState([]);
//   const [input, setInput] = useState('');
//   const [isLoading, setIsLoading] = useState(false);
//   const [currentView, setCurrentView] = useState('chat'); // chat, test, results
//   const [testData, setTestData] = useState(null);
//   const [studentAnswers, setStudentAnswers] = useState({});
//   const [testResults, setTestResults] = useState(null);
//   const [practiceExercises, setPracticeExercises] = useState(null);
//   const messagesEndRef = useRef(null);
//   const chatHistoryRef = useRef([]);

//   const API_KEY = process.env.REACT_APP_API_KEY || process.env.API_KEY;

//   const scrollToBottom = () => {
//     messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
//   };

//   useEffect(() => {
//     scrollToBottom();
//   }, [messages]);

//   const callGeminiAPI = async (prompt, systemInstruction) => {
//     const response = await fetch(
//       `https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=${API_KEY}`,
//       {
//         method: 'POST',
//         headers: { 'Content-Type': 'application/json' },
//         body: JSON.stringify({
//           contents: [{ parts: [{ text: prompt }] }],
//           systemInstruction: { parts: [{ text: systemInstruction }] },
//           generationConfig: {
//             temperature: 0.7,
//             maxOutputTokens: 2048,
//           }
//         })
//       }
//     );

//     if (!response.ok) {
//       throw new Error('API call failed');
//     }

//     const data = await response.json();
//     return data.candidates[0].content.parts[0].text;
//   };

//   const handleSendMessage = async () => {
//     if (!input.trim()) return;

//     const userMessage = { role: 'user', content: input };
//     setMessages(prev => [...prev, userMessage]);
//     chatHistoryRef.current.push(userMessage);
//     setInput('');
//     setIsLoading(true);

//     try {
//       const conversationContext = chatHistoryRef.current
//         .map(msg => `${msg.role === 'user' ? 'Student' : 'Assistant'}: ${msg.content}`)
//         .join('\n');

//       const systemInstruction = `You are a helpful and patient teacher's assistant. Your role is to:
// 1. Explain concepts clearly and in detail with examples
// 2. Answer student questions thoroughly
// 3. When a student asks to start a test, respond with: TEST_REQUEST:{topic1, topic2, ...}
// 4. Be encouraging and supportive
// 5. Break down complex topics into simpler parts
// 6. Use analogies and real-world examples

// When you detect a test request, format it exactly as: TEST_REQUEST:{topic1, topic2}`;

//       const prompt = `${conversationContext}\nAssistant:`;
//       const response = await callGeminiAPI(prompt, systemInstruction);

//       if (response.includes('TEST_REQUEST:')) {
//         const topicsMatch = response.match(/TEST_REQUEST:\{([^}]+)\}/);
//         if (topicsMatch) {
//           const topics = topicsMatch[1].split(',').map(t => t.trim());
//           await generateTest(topics);
//           const aiMessage = {
//             role: 'assistant',
//             content: `Great! I'll prepare a test on ${topics.join(' and ')}. Redirecting you to the test now...`
//           };
//           setMessages(prev => [...prev, aiMessage]);
//           chatHistoryRef.current.push(aiMessage);
//         }
//       } else {
//         const aiMessage = { role: 'assistant', content: response };
//         setMessages(prev => [...prev, aiMessage]);
//         chatHistoryRef.current.push(aiMessage);
//       }
//     } catch (error) {
//       setMessages(prev => [...prev, {
//         role: 'assistant',
//         content: 'Sorry, I encountered an error. Please try again.'
//       }]);
//     }

//     setIsLoading(false);
//   };

//   const generateTest = async (topics) => {
//     setIsLoading(true);
//     try {
//       const systemInstruction = `Generate a test with exactly 5 multiple-choice questions on the given topics. 
// Format your response as valid JSON with this exact structure:
// {
//   "title": "Test Title",
//   "questions": [
//     {
//       "id": 1,
//       "question": "Question text",
//       "options": ["A) option1", "B) option2", "C) option3", "D) option4"],
//       "correct": 0
//     }
//   ]
// }
// The "correct" field should be the index (0-3) of the correct answer.`;

//       const prompt = `Create a test on: ${topics.join(', ')}`;
//       const response = await callGeminiAPI(prompt, systemInstruction);
      
//       const jsonMatch = response.match(/\{[\s\S]*\}/);
//       if (jsonMatch) {
//         const testJson = JSON.parse(jsonMatch[0]);
//         setTestData(testJson);
//         setCurrentView('test');
//         setStudentAnswers({});
//       }
//     } catch (error) {
//       console.error('Error generating test:', error);
//       setMessages(prev => [...prev, {
//         role: 'assistant',
//         content: 'Sorry, I had trouble generating the test. Please try again.'
//       }]);
//     }
//     setIsLoading(false);
//   };

//   const handleAnswerSelect = (questionId, answerIndex) => {
//     setStudentAnswers(prev => ({ ...prev, [questionId]: answerIndex }));
//   };

//   const submitTest = async () => {
//     setIsLoading(true);
    
//     const results = testData.questions.map(q => ({
//       question: q.question,
//       studentAnswer: q.options[studentAnswers[q.id]],
//       correctAnswer: q.options[q.correct],
//       isCorrect: studentAnswers[q.id] === q.correct
//     }));

//     const score = results.filter(r => r.isCorrect).length;
//     const totalQuestions = results.length;
//     const percentage = Math.round((score / totalQuestions) * 100);

//     const testResultsData = {
//       score,
//       totalQuestions,
//       percentage,
//       results
//     };

//     setTestResults(testResultsData);

//     try {
//       const incorrectTopics = results
//         .filter(r => !r.isCorrect)
//         .map(r => r.question)
//         .join('; ');

//       const systemInstruction = `Based on the student's test performance, generate 3 practice exercises to help them improve.
// Focus on areas where they made mistakes. Format as JSON:
// {
//   "exercises": [
//     {
//       "title": "Exercise title",
//       "description": "What to do",
//       "task": "Specific task or problem"
//     }
//   ]
// }`;

//       const prompt = `Student scored ${percentage}% on the test. They got these questions wrong: ${incorrectTopics || 'None - they got everything right!'}
// Generate appropriate practice exercises.`;
      
//       const response = await callGeminiAPI(prompt, systemInstruction);
//       const jsonMatch = response.match(/\{[\s\S]*\}/);
      
//       if (jsonMatch) {
//         const exercisesJson = JSON.parse(jsonMatch[0]);
//         setPracticeExercises(exercisesJson);
//       }
//     } catch (error) {
//       console.error('Error generating exercises:', error);
//     }

//     setCurrentView('results');
//     setIsLoading(false);
//   };

//   const returnToChat = () => {
//     setCurrentView('chat');
//     setTestData(null);
//     setStudentAnswers({});
//     setTestResults(null);
//     setPracticeExercises(null);
//   };

//   if (currentView === 'test' && testData) {
//     return (
//       <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 p-4">
//         <div className="max-w-3xl mx-auto">
//           <div className="bg-white rounded-2xl shadow-xl p-8 mb-6">
//             <div className="flex items-center mb-6">
//               <FileText className="w-8 h-8 text-indigo-600 mr-3" />
//               <h2 className="text-3xl font-bold text-gray-800">{testData.title}</h2>
//             </div>
            
//             {testData.questions.map((q, idx) => (
//               <div key={q.id} className="mb-8 pb-6 border-b border-gray-200 last:border-0">
//                 <p className="font-semibold text-lg text-gray-800 mb-4">
//                   {idx + 1}. {q.question}
//                 </p>
//                 <div className="space-y-3">
//                   {q.options.map((option, optIdx) => (
//                     <label
//                       key={optIdx}
//                       className={`flex items-center p-4 rounded-lg border-2 cursor-pointer transition ${
//                         studentAnswers[q.id] === optIdx
//                           ? 'border-indigo-600 bg-indigo-50'
//                           : 'border-gray-200 hover:border-indigo-300'
//                       }`}
//                     >
//                       <input
//                         type="radio"
//                         name={`question-${q.id}`}
//                         checked={studentAnswers[q.id] === optIdx}
//                         onChange={() => handleAnswerSelect(q.id, optIdx)}
//                         className="mr-3"
//                       />
//                       <span className="text-gray-700">{option}</span>
//                     </label>
//                   ))}
//                 </div>
//               </div>
//             ))}

//             <button
//               onClick={submitTest}
//               disabled={Object.keys(studentAnswers).length !== testData.questions.length || isLoading}
//               className="w-full bg-indigo-600 text-white py-3 rounded-lg font-semibold hover:bg-indigo-700 disabled:bg-gray-400 disabled:cursor-not-allowed transition mt-6"
//             >
//               {isLoading ? 'Submitting...' : 'Submit Test'}
//             </button>
//           </div>
//         </div>
//       </div>
//     );
//   }

//   if (currentView === 'results' && testResults) {
//     return (
//       <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 p-4">
//         <div className="max-w-3xl mx-auto">
//           <div className="bg-white rounded-2xl shadow-xl p-8 mb-6">
//             <h2 className="text-3xl font-bold text-gray-800 mb-6 text-center">Test Results</h2>
            
//             <div className="text-center mb-8">
//               <div className="inline-block">
//                 <div className={`text-6xl font-bold mb-2 ${
//                   testResults.percentage >= 80 ? 'text-green-600' :
//                   testResults.percentage >= 60 ? 'text-yellow-600' : 'text-red-600'
//                 }`}>
//                   {testResults.percentage}%
//                 </div>
//                 <p className="text-gray-600">
//                   {testResults.score} out of {testResults.totalQuestions} correct
//                 </p>
//               </div>
//             </div>

//             <div className="space-y-4 mb-8">
//               {testResults.results.map((r, idx) => (
//                 <div key={idx} className="border-l-4 p-4 rounded-r-lg" style={{
//                   borderColor: r.isCorrect ? '#10b981' : '#ef4444',
//                   backgroundColor: r.isCorrect ? '#f0fdf4' : '#fef2f2'
//                 }}>
//                   <div className="flex items-start">
//                     {r.isCorrect ? (
//                       <CheckCircle className="w-6 h-6 text-green-600 mr-3 flex-shrink-0 mt-1" />
//                     ) : (
//                       <XCircle className="w-6 h-6 text-red-600 mr-3 flex-shrink-0 mt-1" />
//                     )}
//                     <div className="flex-1">
//                       <p className="font-semibold text-gray-800 mb-2">{r.question}</p>
//                       <p className="text-sm text-gray-600">
//                         <span className="font-medium">Your answer:</span> {r.studentAnswer}
//                       </p>
//                       {!r.isCorrect && (
//                         <p className="text-sm text-gray-600">
//                           <span className="font-medium">Correct answer:</span> {r.correctAnswer}
//                         </p>
//                       )}
//                     </div>
//                   </div>
//                 </div>
//               ))}
//             </div>

//             {practiceExercises && (
//               <div className="bg-indigo-50 rounded-xl p-6 mb-6">
//                 <h3 className="text-xl font-bold text-gray-800 mb-4">Practice Exercises</h3>
//                 <div className="space-y-4">
//                   {practiceExercises.exercises.map((ex, idx) => (
//                     <div key={idx} className="bg-white rounded-lg p-4">
//                       <h4 className="font-semibold text-indigo-600 mb-2">{ex.title}</h4>
//                       <p className="text-sm text-gray-600 mb-2">{ex.description}</p>
//                       <p className="text-gray-800">{ex.task}</p>
//                     </div>
//                   ))}
//                 </div>
//               </div>
//             )}

//             <button
//               onClick={returnToChat}
//               className="w-full bg-indigo-600 text-white py-3 rounded-lg font-semibold hover:bg-indigo-700 transition flex items-center justify-center"
//             >
//               <RotateCcw className="w-5 h-5 mr-2" />
//               Return to Chat
//             </button>
//           </div>
//         </div>
//       </div>
//     );
//   }

//   return (
//     <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex flex-col">
//       <div className="bg-white shadow-md p-4 flex items-center">
//         <BookOpen className="w-8 h-8 text-indigo-600 mr-3" />
//         <h1 className="text-2xl font-bold text-gray-800">AI Teacher Assistant</h1>
//       </div>

//       <div className="flex-1 overflow-y-auto p-4 max-w-4xl w-full mx-auto">
//         {messages.length === 0 && (
//           <div className="text-center py-12">
//             <BookOpen className="w-16 h-16 text-indigo-400 mx-auto mb-4" />
//             <h2 className="text-2xl font-semibold text-gray-700 mb-2">
//               Welcome to your AI Teacher Assistant!
//             </h2>
//             <p className="text-gray-600 mb-4">
//               Ask me anything or request a test on any topic
//             </p>
//             <div className="text-left max-w-md mx-auto bg-white rounded-lg p-4 shadow-md">
//               <p className="text-sm text-gray-700 mb-2 font-semibold">Try asking:</p>
//               <ul className="text-sm text-gray-600 space-y-1">
//                 <li>• "Explain photosynthesis in detail"</li>
//                 <li>• "What is the Pythagorean theorem?"</li>
//                 <li>• "Start a test on algebra and geometry"</li>
//               </ul>
//             </div>
//           </div>
//         )}

//         {messages.map((msg, idx) => (
//           <div
//             key={idx}
//             className={`flex mb-4 ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}
//           >
//             <div
//               className={`max-w-3xl px-6 py-4 rounded-2xl shadow-md ${
//                 msg.role === 'user'
//                   ? 'bg-indigo-600 text-white'
//                   : 'bg-white text-gray-800 border border-gray-200'
//               }`}
//             >
//               <p className="whitespace-pre-wrap">{msg.content}</p>
//             </div>
//           </div>
//         ))}

//         {isLoading && (
//           <div className="flex justify-start mb-4">
//             <div className="bg-white px-6 py-4 rounded-2xl shadow-md border border-gray-200">
//               <div className="flex space-x-2">
//                 <div className="w-2 h-2 bg-indigo-600 rounded-full animate-bounce"></div>
//                 <div className="w-2 h-2 bg-indigo-600 rounded-full animate-bounce" style={{ animationDelay: '0.1s' }}></div>
//                 <div className="w-2 h-2 bg-indigo-600 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
//               </div>
//             </div>
//           </div>
//         )}
//         <div ref={messagesEndRef} />
//       </div>

//       <div className="bg-white border-t border-gray-200 p-4">
//         <div className="max-w-4xl mx-auto flex gap-2">
//           <input
//             type="text"
//             value={input}
//             onChange={(e) => setInput(e.target.value)}
//             onKeyPress={(e) => e.key === 'Enter' && !isLoading && handleSendMessage()}
//             placeholder="Ask a question or request a test..."
//             disabled={isLoading}
//             className="flex-1 px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent outline-none disabled:bg-gray-100"
//           />
//           <button
//             onClick={handleSendMessage}
//             disabled={!input.trim() || isLoading}
//             className="bg-indigo-600 text-white px-6 py-3 rounded-lg hover:bg-indigo-700 disabled:bg-gray-400 disabled:cursor-not-allowed transition flex items-center"
//           >
//             <Send className="w-5 h-5" />
//           </button>
//         </div>
//       </div>
//     </div>
//   );
}
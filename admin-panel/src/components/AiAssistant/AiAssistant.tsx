import { useState, useRef, useEffect } from 'react';
import { Send, Bot, User, Loader2, FileText, CheckCircle, XCircle, Trophy, BookOpen, Brain, Sparkles } from 'lucide-react';
import type { Message, TestData, ChatRequest, ChatResponse } from '@/types/ai';

export default function AiAssistant() {
  const [messages, setMessages] = useState<Message[]>([
    {
      role: 'assistant',
      content: 'გამარჯობა! 👋 მე ვარ შენი AI მასწავლებელი და მზად ვარ დაგეხმარო ნებისმიერ სასწავლო თემაში! 📚\n\nშემიძლია:\n✨ ავხსნა რთული კონცეფციები\n📝 შევქმნა ტესტები\n🎯 დაგეხმარო საშინაო დავალებებში\n\nდამისვი კითხვა! 🚀'
    }
  ]);
  const [input, setInput] = useState<string>('');
  const [loading, setLoading] = useState<boolean>(false);
  const [testMode, setTestMode] = useState<TestData | null>(null);
  const [currentQuestion, setCurrentQuestion] = useState<number>(0);
  const [score, setScore] = useState<number>(0);
  const [userAnswers, setUserAnswers] = useState<number[]>([]);
  const [showFeedback, setShowFeedback] = useState<boolean>(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSend = async (): Promise<void> => {
    if (!input.trim() || loading) return;

    const userMessage: Message = { role: 'user', content: input };
    setMessages(prev => [...prev, userMessage]);
    const currentInput = input;
    setInput('');
    setLoading(true);

    try {
      const requestBody: ChatRequest = {
        message: currentInput,
        history: messages
      };

      const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8080'}/api/ai/chat`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        credentials: 'include',
        body: JSON.stringify(requestBody)
      });

      if (!response.ok) {
        throw new Error('Network response was not ok');
      }

      const data: ChatResponse = await response.json();
      
      setMessages(prev => [...prev, {
        role: 'assistant',
        content: data.response,
        test: data.test || null
      }]);

      if (data.test) {
        setTestMode(data.test);
        setCurrentQuestion(0);
        setScore(0);
        setUserAnswers([]);
        setShowFeedback(false);
      }
    } catch (error) {
      setMessages(prev => [...prev, {
        role: 'assistant',
        content: '😔 ბოდიში, დაფიქსირდა შეცდომა. გთხოვ სცადო თავიდან ან განაახლო გვერდი.'
      }]);
    } finally {
      setLoading(false);
    }
  };

  const handleTestAnswer = (selectedAnswer: number): void => {
    if (!testMode) return;

    const question = testMode.questions[currentQuestion];
    const isCorrect = selectedAnswer === question.correct;
    
    if (isCorrect) {
      setScore(score + 1);
    }

    setUserAnswers([...userAnswers, selectedAnswer]);

    setMessages(prev => [...prev, {
      role: 'system',
      content: isCorrect ? '✅ სწორია!' : `❌ არასწორია. სწორი პასუხი: ${question.options[question.correct]}`,
      isResult: true,
      isCorrect
    }]);

    if (currentQuestion + 1 < testMode.questions.length) {
      setTimeout(() => {
        setCurrentQuestion(currentQuestion + 1);
      }, 800);
    } else {
      const finalScore = isCorrect ? score + 1 : score;
      const percentage = Math.round((finalScore / testMode.questions.length) * 100);
      
      setTimeout(() => {
        setShowFeedback(true);
        setMessages(prev => [...prev, {
          role: 'assistant',
          content: generateFeedback(finalScore, testMode.questions.length, percentage, testMode),
        }]);
        
        setTestMode(null);
        setCurrentQuestion(0);
        setScore(0);
      }, 1000);
    }
  };

  const generateFeedback = (score: number, total: number, percentage: number, test: TestData): string => {
    let emoji = '🎉';
    let title = 'შესანიშნავია!';
    let message = 'ბრწყინვალე შედეგი!';
    let advice = 'გაგრძელე ასე!';

    if (percentage >= 80) {
      emoji = '🏆';
      title = 'შესანიშნავია!';
      message = 'შენ ბრწყინვალედ ფლობ ამ თემას!';
      advice = 'შენ ნამდვილად კარგად იცი ' + test.topic + '. გაგრძელე ასე! 💪';
    } else if (percentage >= 60) {
      emoji = '👏';
      title = 'კარგი შედეგი!';
      message = 'კარგად გაართვი თავი!';
      advice = 'კიდევ ცოტა ვარჯიში და იდეალური იქნები ' + test.topic + '-ში! 📚';
    } else if (percentage >= 40) {
      emoji = '💪';
      title = 'კარგი მცდელობა!';
      message = 'უკვე მარტივად გამოგივა!';
      advice = 'კიდევ ერთხელ გადაიკითხე მასალა ' + test.topic + '-ის შესახებ და სცადე ხელახლა! 📖';
    } else {
      emoji = '📚';
      title = 'არ დანებდე!';
      message = 'ყველას სჭირდება დრო სასწავლად.';
      advice = 'დაუთმე მეტი დრო ' + test.topic + '-ის შესწავლას. შენ შეგიძლია! 🌟';
    }

    return `${emoji} **${title}**

📊 **შენი შედეგი:** ${score}/${total} სწორი პასუხი (${percentage}%)

${message}

💡 **რჩევა:** ${advice}

გსურს სხვა თემაზე ტესტის გავლა? უბრალოდ მომწერე! 🚀`;
  };

  const handleKeyPress = (e: React.KeyboardEvent<HTMLTextAreaElement>): void => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-purple-50 to-pink-50 p-4">
      <div className="max-w-5xl mx-auto h-[95vh] flex flex-col">
        
        {/* Header Card */}
    

        {/* Messages Area */}
        <div className="flex-1 bg-white rounded-3xl shadow-xl overflow-hidden flex flex-col">
          <div className="flex-1 overflow-y-auto p-6 space-y-4">
            {messages.map((msg, idx) => (
              <div key={idx}>
                {msg.isResult ? (
                  <div className={`flex items-center justify-center gap-3 p-4 rounded-2xl animate-[slideIn_0.3s_ease-out] ${
                    msg.isCorrect 
                      ? 'bg-gradient-to-r from-green-100 to-emerald-100 text-green-800 border-2 border-green-300' 
                      : 'bg-gradient-to-r from-red-100 to-pink-100 text-red-800 border-2 border-red-300'
                  }`}>
                    {msg.isCorrect ? (
                      <CheckCircle className="w-6 h-6 flex-shrink-0" />
                    ) : (
                      <XCircle className="w-6 h-6 flex-shrink-0" />
                    )}
                    <span className="font-semibold text-center">{msg.content}</span>
                  </div>
                ) : (
                  <div className={`flex gap-3 animate-[slideIn_0.3s_ease-out] ${
                    msg.role === 'user' ? 'flex-row-reverse' : 'flex-row'
                  }`}>
                    <div className={`flex-shrink-0 w-12 h-12 rounded-2xl flex items-center justify-center shadow-lg ${
                      msg.role === 'user'
                        ? 'bg-gradient-to-br from-indigo-500 to-purple-600'
                        : 'bg-gradient-to-br from-pink-500 to-rose-600'
                    }`}>
                      {msg.role === 'user' ? (
                        <User className="w-6 h-6 text-white" />
                      ) : (
                        <Bot className="w-6 h-6 text-white" />
                      )}
                    </div>
                    <div className={`max-w-[75%] rounded-2xl p-5 shadow-md ${
                      msg.role === 'user'
                        ? 'bg-gradient-to-br from-indigo-500 to-purple-600 text-white'
                        : 'bg-gradient-to-br from-gray-50 to-gray-100 text-gray-800 border border-gray-200'
                    }`}>
                      <p className="whitespace-pre-wrap leading-relaxed">{msg.content}</p>
                    </div>
                  </div>
                )}
              </div>
            ))}
            
            {testMode && !showFeedback && (
              <div className="animate-[slideIn_0.5s_ease-out]">
                <div className="bg-gradient-to-br from-purple-50 via-pink-50 to-rose-50 rounded-3xl p-8 border-2 border-purple-200 shadow-xl">
                  <div className="flex items-start gap-3 mb-6">
                    <div className="bg-gradient-to-br from-purple-500 to-pink-600 p-3 rounded-xl">
                      <FileText className="w-7 h-7 text-white" />
                    </div>
                    <div className="flex-1">
                      <h3 className="text-xl font-bold text-purple-900 mb-2">
                        {testMode.questions[currentQuestion].question}
                      </h3>
                      <div className="flex gap-2 text-sm text-purple-600">
                        <span className="bg-purple-100 px-3 py-1 rounded-full">
                          {testMode.subject}
                        </span>
                        <span className="bg-pink-100 px-3 py-1 rounded-full">
                          {testMode.grade} კლასი
                        </span>
                        <span className="bg-rose-100 px-3 py-1 rounded-full">
                          {testMode.difficulty}
                        </span>
                      </div>
                    </div>
                  </div>
                  <div className="space-y-3">
                    {testMode.questions[currentQuestion].options.map((option, idx) => (
                      <button
                        key={idx}
                        onClick={() => handleTestAnswer(idx)}
                        className="w-full text-left p-5 rounded-2xl bg-white hover:bg-gradient-to-r hover:from-purple-100 hover:to-pink-100 border-2 border-purple-200 hover:border-purple-400 transition-all duration-200 font-medium text-gray-700 hover:text-purple-900 shadow-sm hover:shadow-md transform hover:-translate-y-0.5 group"
                      >
                        <span className="flex items-center gap-3">
                          <span className="flex-shrink-0 w-8 h-8 rounded-lg bg-gradient-to-br from-purple-500 to-pink-600 text-white flex items-center justify-center font-bold text-sm group-hover:scale-110 transition-transform">
                            {String.fromCharCode(65 + idx)}
                          </span>
                          <span>{option}</span>
                        </span>
                      </button>
                    ))}
                  </div>
                </div>
              </div>
            )}
            
            {loading && (
              <div className="flex gap-3 animate-[slideIn_0.3s_ease-out]">
                <div className="flex-shrink-0 w-12 h-12 rounded-2xl bg-gradient-to-br from-pink-500 to-rose-600 flex items-center justify-center shadow-lg">
                  <Bot className="w-6 h-6 text-white" />
                </div>
                <div className="bg-gradient-to-br from-gray-50 to-gray-100 rounded-2xl p-5 border border-gray-200 shadow-md">
                  <div className="flex items-center gap-2">
                    <Loader2 className="w-5 h-5 text-purple-600 animate-spin" />
                    <span className="text-gray-600 text-sm">ვფიქრობ...</span>
                  </div>
                </div>
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>

          {/* Input Area */}
          <div className="border-t border-gray-200 bg-gradient-to-r from-gray-50 to-gray-100 p-6">
            <div className="flex gap-3">
              <textarea
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyPress={handleKeyPress}
                placeholder="დასვი კითხვა ან სთხოვე ტესტი... 🎯"
                className="flex-1 resize-none rounded-2xl border-2 border-gray-300 p-4 focus:border-purple-500 focus:outline-none focus:ring-2 focus:ring-purple-200 transition-all bg-white shadow-sm"
                rows={2}
                disabled={loading || !!testMode}
              />
              <button
                onClick={handleSend}
                disabled={loading || !input.trim() || !!testMode}
                className="bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600 text-white px-8 rounded-2xl hover:from-indigo-700 hover:via-purple-700 hover:to-pink-700 transition-all disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center shadow-lg hover:shadow-xl transform hover:-translate-y-0.5 disabled:transform-none"
              >
                <Send className="w-6 h-6" />
              </button>
            </div>
            <p className="text-xs text-gray-500 mt-3 text-center">
              💡 მაგალითად: "ახსენი პითაგორას თეორემა" ან "შექმენი ტესტი ისტორიაში"
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
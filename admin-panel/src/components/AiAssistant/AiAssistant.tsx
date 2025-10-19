import { useState, useRef, useEffect } from 'react';
import { Send, Bot, User, Loader2, FileText, CheckCircle, XCircle, Trophy, BookOpen, Brain, Sparkles, ArrowLeft } from 'lucide-react';

// Types
interface Message {
  role: 'user' | 'assistant' | 'system';
  content: string;
  test?: TestData | null;
  isResult?: boolean;
  isCorrect?: boolean;
}

interface Question {
  question: string;
  options: string[];
  correct: number;
}

interface TestData {
  subject: string;
  grade: string;
  difficulty: string;
  topic: string;
  questions: Question[];
}

// Main App Component with Routing
export default function AiAssistantApp() {
  const [currentRoute, setCurrentRoute] = useState<'chat' | 'test'>('chat');
  const [testData, setTestData] = useState<TestData | null>(null);
  const [messages, setMessages] = useState<Message[]>([]);

  const navigateToTest = (test: TestData) => {
    setTestData(test);
    setCurrentRoute('test');
  };

  const navigateToChat = () => {
    setCurrentRoute('chat');
    setTestData(null);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-purple-50 to-pink-50">
      {currentRoute === 'chat' ? (
        <ChatPage 
          onNavigateToTest={navigateToTest}
          messages={messages}
          setMessages={setMessages}
        />
      ) : (
        <TestPage 
          testData={testData!}
          onNavigateBack={navigateToChat}
        />
      )}
    </div>
  );
}

// Chat Page Component
function ChatPage({ onNavigateToTest, messages, setMessages }: {
  onNavigateToTest: (test: TestData) => void;
  messages: Message[];
  setMessages: React.Dispatch<React.SetStateAction<Message[]>>;
}) {
  const [input, setInput] = useState<string>('');
  const [loading, setLoading] = useState<boolean>(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (messages.length === 0) {
      setMessages([{
        role: 'assistant',
        content: 'გამარჯობა! 👋 მე ვარ შენი AI მასწავლებელი და მზად ვარ დაგეხმარო ნებისმიერ სასწავლო თემაში! 📚\n\nშემიძლია:\n✨ ავხსნა რთული კონცეფციები\n📝 შევქმნა ტესტები\n🎯 დაგეხმარო საშინაო დავალებებში\n\nდამისვი კითხვა! 🚀'
      }]);
    }
  }, []);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  const handleSend = async (): Promise<void> => {
    if (!input.trim() || loading) return;

    const userMessage: Message = { role: 'user', content: input };
    setMessages(prev => [...prev, userMessage]);
    const currentInput = input;
    setInput('');
    setLoading(true);

    try {
      // Simulate API call - Replace with actual API
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      // Check if user wants a test
      const wantsTest = currentInput.toLowerCase().includes('ტესტ') || 
                       currentInput.toLowerCase().includes('test');
      
      if (wantsTest) {
        // Mock test data
        const mockTest: TestData = {
          subject: 'მათემატიკა',
          grade: '10',
          difficulty: 'საშუალო',
          topic: currentInput.includes('მათემატიკა') ? 'მათემატიკა' : 'ზოგადი ცოდნა',
          questions: [
            {
              question: 'რა არის 2 + 2?',
              options: ['3', '4', '5', '6'],
              correct: 1
            },
            {
              question: 'რა არის 5 × 3?',
              options: ['10', '12', '15', '20'],
              correct: 2
            },
            {
              question: 'რა არის 10 ÷ 2?',
              options: ['3', '4', '5', '6'],
              correct: 2
            }
          ]
        };

        setMessages(prev => [...prev, {
          role: 'assistant',
          content: `შესანიშნავია! შევქმენი ტესტი შენთვის თემაზე: "${mockTest.topic}"\n\n📚 საგანი: ${mockTest.subject}\n📊 დონე: ${mockTest.difficulty}\n📝 კითხვების რაოდენობა: ${mockTest.questions.length}\n\nდააჭირე ღილაკს ტესტის დასაწყებად! 🚀`,
          test: mockTest
        }]);
      } else {
        setMessages(prev => [...prev, {
          role: 'assistant',
          content: 'მშვენიერი კითხვაა! 🤔 რომ ტესტი გსურს, უბრალოდ მომწერე "შექმენი ტესტი" და დაგეხმარები! 📝'
        }]);
      }
    } catch (error) {
      setMessages(prev => [...prev, {
        role: 'assistant',
        content: '😔 ბოდიში, დაფიქსირდა შეცდომა. გთხოვ სცადო თავიდან.'
      }]);
    } finally {
      setLoading(false);
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent<HTMLTextAreaElement>): void => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  return (
    <div className="min-h-screen p-4">
      <div className="max-w-5xl mx-auto h-[95vh] flex flex-col">
        
        {/* Header */}
        <div className="bg-white rounded-3xl shadow-xl mb-4 overflow-hidden">
          <div className="bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600 p-6">
            <div className="flex items-center gap-4">
              <div className="relative">
                <div className="bg-white/20 p-4 rounded-2xl backdrop-blur-lg border border-white/30">
                  <Brain className="w-8 h-8 text-white" />
                </div>
                <div className="absolute -top-1 -right-1 bg-yellow-400 rounded-full p-1">
                  <Sparkles className="w-4 h-4 text-yellow-900" />
                </div>
              </div>
              <div>
                <h1 className="text-3xl font-bold text-white">AI ასისტენტი</h1>
                <p className="text-indigo-100 text-sm flex items-center gap-2">
                  <BookOpen className="w-4 h-4" />
                  შენი პირადი მასწავლებელი 24/7
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Messages */}
        <div className="flex-1 bg-white rounded-3xl shadow-xl overflow-hidden flex flex-col">
          <div className="flex-1 overflow-y-auto p-6 space-y-4">
            {messages.map((msg, idx) => (
              <div key={idx}>
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
                    {msg.test && (
                      <button
                        onClick={() => onNavigateToTest(msg.test!)}
                        className="mt-4 w-full bg-gradient-to-r from-purple-600 to-pink-600 text-white py-3 px-6 rounded-xl hover:from-purple-700 hover:to-pink-700 transition-all shadow-lg hover:shadow-xl transform hover:-translate-y-0.5 font-semibold flex items-center justify-center gap-2"
                      >
                        <FileText className="w-5 h-5" />
                        დავიწყო ტესტი
                      </button>
                    )}
                  </div>
                </div>
              </div>
            ))}
            
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

          {/* Input */}
          <div className="border-t border-gray-200 bg-gradient-to-r from-gray-50 to-gray-100 p-6">
            <div className="flex gap-3">
              <textarea
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyPress={handleKeyPress}
                placeholder="დასვი კითხვა ან სთხოვე ტესტი... 🎯"
                className="flex-1 resize-none rounded-2xl border-2 border-gray-300 p-4 focus:border-purple-500 focus:outline-none focus:ring-2 focus:ring-purple-200 transition-all bg-white shadow-sm"
                rows={2}
                disabled={loading}
              />
              <button
                onClick={handleSend}
                disabled={loading || !input.trim()}
                className="bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600 text-white px-8 rounded-2xl hover:from-indigo-700 hover:via-purple-700 hover:to-pink-700 transition-all disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center shadow-lg hover:shadow-xl transform hover:-translate-y-0.5 disabled:transform-none"
              >
                <Send className="w-6 h-6" />
              </button>
            </div>
            <p className="text-xs text-gray-500 mt-3 text-center">
              💡 მაგალითად: "ახსენი პითაგორას თეორემა" ან "შექმენი ტესტი მათემატიკაში"
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

// Test Page Component
function TestPage({ testData, onNavigateBack }: {
  testData: TestData;
  onNavigateBack: () => void;
}) {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [score, setScore] = useState(0);
  const [answers, setAnswers] = useState<number[]>([]);
  const [showResult, setShowResult] = useState(false);
  const [isCompleted, setIsCompleted] = useState(false);

  const handleAnswer = (selectedAnswer: number) => {
    const question = testData.questions[currentQuestion];
    const isCorrect = selectedAnswer === question.correct;
    
    if (isCorrect) {
      setScore(score + 1);
    }

    setAnswers([...answers, selectedAnswer]);
    setShowResult(true);

    setTimeout(() => {
      if (currentQuestion + 1 < testData.questions.length) {
        setCurrentQuestion(currentQuestion + 1);
        setShowResult(false);
      } else {
        setIsCompleted(true);
      }
    }, 1500);
  };

  const percentage = isCompleted ? Math.round((score / testData.questions.length) * 100) : 0;

  return (
    <div className="min-h-screen p-4">
      <div className="max-w-4xl mx-auto py-8">
        
        {/* Header */}
        <div className="bg-white rounded-3xl shadow-xl mb-6 overflow-hidden">
          <div className="bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600 p-6">
            <div className="flex items-center justify-between">
              <button
                onClick={onNavigateBack}
                className="bg-white/20 hover:bg-white/30 p-3 rounded-xl backdrop-blur-lg border border-white/30 transition-all"
              >
                <ArrowLeft className="w-6 h-6 text-white" />
              </button>
              <div className="text-center flex-1">
                <h1 className="text-2xl font-bold text-white">{testData.topic}</h1>
                <div className="flex gap-2 justify-center mt-2 text-sm">
                  <span className="bg-white/20 px-3 py-1 rounded-full text-white">
                    {testData.subject}
                  </span>
                  <span className="bg-white/20 px-3 py-1 rounded-full text-white">
                    {testData.grade} კლასი
                  </span>
                </div>
              </div>
              <div className="bg-white/20 px-6 py-3 rounded-2xl backdrop-blur-lg border border-white/30">
                <p className="text-sm font-bold text-white flex items-center gap-2">
                  <Trophy className="w-4 h-4" />
                  {score}/{testData.questions.length}
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Content */}
        {!isCompleted ? (
          <div className="bg-white rounded-3xl shadow-xl p-8">
            {/* Progress */}
            <div className="mb-6">
              <div className="flex justify-between items-center mb-2">
                <span className="text-sm font-semibold text-gray-600">
                  კითხვა {currentQuestion + 1} / {testData.questions.length}
                </span>
                <span className="text-sm text-purple-600">
                  {Math.round(((currentQuestion + 1) / testData.questions.length) * 100)}%
                </span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-3">
                <div
                  className="bg-gradient-to-r from-purple-600 to-pink-600 h-3 rounded-full transition-all duration-500"
                  style={{ width: `${((currentQuestion + 1) / testData.questions.length) * 100}%` }}
                />
              </div>
            </div>

            {/* Question */}
            <div className="mb-8">
              <div className="flex items-start gap-3 mb-6">
                <div className="bg-gradient-to-br from-purple-500 to-pink-600 p-3 rounded-xl">
                  <FileText className="w-7 h-7 text-white" />
                </div>
                <h3 className="text-2xl font-bold text-gray-900 flex-1">
                  {testData.questions[currentQuestion].question}
                </h3>
              </div>

              {/* Options */}
              <div className="space-y-3">
                {testData.questions[currentQuestion].options.map((option, idx) => (
                  <button
                    key={idx}
                    onClick={() => !showResult && handleAnswer(idx)}
                    disabled={showResult}
                    className={`w-full text-left p-5 rounded-2xl border-2 transition-all duration-200 font-medium shadow-sm transform ${
                      showResult
                        ? idx === testData.questions[currentQuestion].correct
                          ? 'bg-green-100 border-green-400 text-green-900'
                          : idx === answers[currentQuestion]
                          ? 'bg-red-100 border-red-400 text-red-900'
                          : 'bg-gray-100 border-gray-300 text-gray-500'
                        : 'bg-white hover:bg-gradient-to-r hover:from-purple-100 hover:to-pink-100 border-purple-200 hover:border-purple-400 text-gray-700 hover:text-purple-900 hover:shadow-md hover:-translate-y-0.5'
                    } ${showResult ? 'cursor-not-allowed' : 'cursor-pointer'}`}
                  >
                    <span className="flex items-center gap-3">
                      <span className={`flex-shrink-0 w-8 h-8 rounded-lg flex items-center justify-center font-bold text-sm ${
                        showResult && idx === testData.questions[currentQuestion].correct
                          ? 'bg-green-500 text-white'
                          : showResult && idx === answers[currentQuestion]
                          ? 'bg-red-500 text-white'
                          : 'bg-gradient-to-br from-purple-500 to-pink-600 text-white'
                      }`}>
                        {String.fromCharCode(65 + idx)}
                      </span>
                      <span className="flex-1">{option}</span>
                      {showResult && idx === testData.questions[currentQuestion].correct && (
                        <CheckCircle className="w-6 h-6 text-green-600" />
                      )}
                      {showResult && idx === answers[currentQuestion] && idx !== testData.questions[currentQuestion].correct && (
                        <XCircle className="w-6 h-6 text-red-600" />
                      )}
                    </span>
                  </button>
                ))}
              </div>
            </div>
          </div>
        ) : (
          // Final Results
          <div className="bg-white rounded-3xl shadow-xl p-8 text-center">
            <div className="mb-6">
              <div className="inline-block p-6 bg-gradient-to-br from-purple-100 to-pink-100 rounded-full mb-4">
                <Trophy className="w-16 h-16 text-purple-600" />
              </div>
              <h2 className="text-3xl font-bold text-gray-900 mb-2">
                {percentage >= 80 ? '🏆 შესანიშნავია!' : percentage >= 60 ? '👏 კარგი შედეგი!' : '💪 კარგი მცდელობა!'}
              </h2>
              <p className="text-gray-600">ტესტი დასრულებულია!</p>
            </div>

            <div className="bg-gradient-to-br from-purple-50 to-pink-50 rounded-2xl p-8 mb-6">
              <div className="text-6xl font-bold text-purple-600 mb-2">
                {score}/{testData.questions.length}
              </div>
              <div className="text-2xl font-semibold text-gray-700">
                {percentage}%
              </div>
            </div>

            <p className="text-gray-600 mb-8">
              {percentage >= 80 
                ? 'შენ ბრწყინვალედ ფლობ ამ თემას! 🌟'
                : percentage >= 60
                ? 'კარგად გაართვი თავი! კიდევ ცოტა ვარჯიში და იდეალური იქნები! 📚'
                : 'არ დანებდე! კიდევ ერთხელ გადაიკითხე მასალა და სცადე ხელახლა! 💪'
              }
            </p>

            <button
              onClick={onNavigateBack}
              className="bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600 text-white py-4 px-8 rounded-2xl hover:from-indigo-700 hover:via-purple-700 hover:to-pink-700 transition-all shadow-lg hover:shadow-xl transform hover:-translate-y-0.5 font-semibold"
            >
              დაბრუნება ჩატში
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
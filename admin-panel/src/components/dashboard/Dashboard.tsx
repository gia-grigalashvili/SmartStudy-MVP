
import { Clock, Target, FileText, MessageSquare, TrendingUp, BookOpen, CheckCircle, Zap, Loader2 } from 'lucide-react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, RadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis, Radar } from 'recharts';
import { useGetDashboard } from "@/libs/queries/student/dashboard";
import { useAuthStore } from '@/store';
import { getTranslatedObject } from '@/utils';
import { useTranslation } from 'react-i18next';

export default function Dashboard() {
 
  const {i18n} = useTranslation();
  const { data, error, isLoading } = useGetDashboard();
  const {currentUser}=useAuthStore();
  const translations = getTranslatedObject(currentUser?.translations, i18n.language)
  if (isLoading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 flex items-center justify-center">
        <div className="text-center">
          <Loader2 className="w-12 h-12 text-purple-600 animate-spin mx-auto mb-4" />
          <p className="text-gray-600 text-lg">იტვირთება...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 flex items-center justify-center">
        <div className="bg-white rounded-2xl p-8 shadow-lg text-center max-w-md">
          <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <span className="text-3xl">⚠️</span>
          </div>
          <h2 className="text-2xl font-bold text-gray-800 mb-2">შეცდომა</h2>
          <p className="text-gray-600">მონაცემების ჩატვირთვა ვერ მოხერხდა</p>
        </div>
      </div>
    );
  }

  if (!data?.data) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 flex items-center justify-center">
        <div className="bg-white rounded-2xl p-8 shadow-lg text-center">
          <p className="text-gray-600">მონაცემები არ მოიძებნა</p>
        </div>
      </div>
    );
  }

  const dashboardData = data.data;
  const stats = dashboardData.studentStatistic;

  // კვირის პროგრესის მონაცემები (მხოლოდ weekProgress გვაქვს API-დან)
  const progressData = [
    { day: 'კვირა', score: stats.weekProgress }
  ];

  // შესრულების მონაცემები
  const performanceData = [
    {
      subject: 'ტესტები',
      score: stats.passedTests
    },
    {
      subject: 'Flashcards',
      score: dashboardData.totalFlashcards
    },
    {
      subject: 'დავალებები',
      score: dashboardData.completedTasks
    },
    {
      subject: 'კითხვები',
      score: stats.askedQuestions
    },
    {
      subject: 'საათები',
      score: stats.learningHours
    }
  ];

  const statisticsCards = [
    {
      icon: Clock,
      title: 'სწავლის საათები',
      value: stats.learningHours,
      color: 'bg-blue-50 text-blue-600',
      iconBg: 'bg-blue-100'
    },
    {
      icon: Target,
      title: 'საშუალო ქულა',
      value: stats.averageScore,
      color: 'bg-purple-50 text-purple-600',
      iconBg: 'bg-purple-100'
    },
    {
      icon: FileText,
      title: 'გავლილი ტესტები',
      value: stats.passedTests,
      color: 'bg-orange-50 text-orange-600',
      iconBg: 'bg-orange-100'
    },
    {
      icon: MessageSquare,
      title: 'დასმული კითხვები',
      value: stats.askedQuestions,
      color: 'bg-green-50 text-green-600',
      iconBg: 'bg-green-100'
    }
  ];

  const additionalStats = [
    {
      icon: BookOpen,
      title: 'სულ Flashcards',
      value: dashboardData.totalFlashcards,
      color: 'text-pink-600',
      bgColor: 'bg-pink-50'
    },
    {
      icon: Zap,
      title: 'სულ Quizzes',
      value: dashboardData.totalQuizzes,
      color: 'text-yellow-600',
      bgColor: 'bg-yellow-50'
    },
    {
      icon: CheckCircle,
      title: 'დასრულებული დავალებები',
      value: dashboardData.completedTasks,
      color: 'text-teal-600',
      bgColor: 'bg-teal-50'
    }
  ];

  

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 p-6">
      <div className="max-w-7xl mx-auto">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-800 flex items-center gap-2">
            გამარჯობა, {translations.firstName}! 👋
          </h1>
          <p className="text-gray-600 mt-2">აქ არის შენი კვირის პროგრესი</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {statisticsCards.map((stat, index) => (
            <div key={index} className="bg-white rounded-2xl p-6 shadow-sm hover:shadow-md transition-shadow">
              <div className="flex items-start justify-between mb-4">
                <div className={`${stat.iconBg} p-3 rounded-xl`}>
                  <stat.icon className={`w-6 h-6 ${stat.color.split(' ')[1]}`} />
                </div>
              </div>
              <p className="text-gray-600 text-sm mb-2">{stat.title}</p>
              <p className="text-3xl font-bold text-gray-800">{stat.value}</p>
            </div>
          ))}
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
          {additionalStats.map((stat, index) => (
            <div key={index} className={`${stat.bgColor} rounded-2xl p-5 shadow-sm hover:shadow-md transition-shadow`}>
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-600 mb-1">{stat.title}</p>
                  <p className={`text-2xl font-bold ${stat.color}`}>{stat.value}</p>
                </div>
                <stat.icon className={`w-10 h-10 ${stat.color} opacity-20`} />
              </div>
            </div>
          ))}
        </div>

       

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <div className="bg-white rounded-2xl p-6 shadow-sm">
            <div className="flex items-center justify-between mb-6">
              <div>
                <h2 className="text-xl font-bold text-gray-800">კვირის პროგრესი</h2>
                <p className="text-sm text-gray-500 mt-1">{stats.weekProgress}% შესრულებული</p>
              </div>
              <TrendingUp className="w-5 h-5 text-green-500" />
            </div>
            <ResponsiveContainer width="100%" height={300}>
              <LineChart data={progressData}>
                <defs>
                  <linearGradient id="colorScore" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#8b5cf6" stopOpacity={0.3}/>
                    <stop offset="95%" stopColor="#8b5cf6" stopOpacity={0}/>
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
                <XAxis dataKey="day" stroke="#9ca3af" />
                <YAxis stroke="#9ca3af" />
                <Tooltip
                  contentStyle={{
                    backgroundColor: 'white',
                    border: 'none',
                    borderRadius: '12px',
                    boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)'
                  }}
                />
                <Line
                  type="monotone"
                  dataKey="score"
                  stroke="#8b5cf6"
                  strokeWidth={3}
                  fill="url(#colorScore)"
                  dot={{ fill: '#8b5cf6', strokeWidth: 2, r: 4 }}
                  activeDot={{ r: 6 }}
                />
              </LineChart>
            </ResponsiveContainer>
          </div>

          <div className="bg-white rounded-2xl p-6 shadow-sm">
            <div className="mb-6">
              <h2 className="text-xl font-bold text-gray-800">აქტივობის ანალიზი</h2>
              <p className="text-sm text-gray-500 mt-1">შენი მიღწევები</p>
            </div>
            <ResponsiveContainer width="100%" height={300}>
              <RadarChart data={performanceData}>
                <PolarGrid stroke="#e5e7eb" />
                <PolarAngleAxis dataKey="subject" tick={{ fill: '#6b7280', fontSize: 12 }} />
                <PolarRadiusAxis angle={90} tick={{ fill: '#9ca3af' }} />
                <Radar
                  name="რაოდენობა"
                  dataKey="score"
                  stroke="#a855f7"
                  fill="#a855f7"
                  fillOpacity={0.6}
                />
                <Tooltip
                  contentStyle={{
                    backgroundColor: 'white',
                    border: 'none',
                    borderRadius: '12px',
                    boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)'
                  }}
                />
              </RadarChart>
            </ResponsiveContainer>
          </div>
        </div>

        <div className="mt-6 bg-gradient-to-r from-blue-500 to-purple-600 rounded-2xl p-6 text-white shadow-lg">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-xl font-bold mb-2">შენი სტატისტიკა</h3>
              <p className="text-blue-100">
                {stats.passedTests} გავლილი ტესტი • {stats.askedQuestions} კითხვა • {stats.learningHours} საათი
              </p>
              <p className="text-blue-100 mt-1">გაგრძელე ასე! 🎯</p>
            </div>
            <div className="hidden md:block">
              <div className="bg-white/20 backdrop-blur-sm rounded-xl p-4">
                <p className="text-4xl font-bold">{stats.weekProgress}%</p>
                <p className="text-sm text-blue-100">პროგრესი</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
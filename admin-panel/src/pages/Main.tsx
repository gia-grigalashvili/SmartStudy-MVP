import React from "react";
import { useNavigate } from "react-router-dom";
import { GraduationCap, Shield, BookOpen } from "lucide-react";

const Main: React.FC = () => {
  const navigate = useNavigate();
  
  const loginOptions = [
    {
      title: "Student",
      description: "Access your courses and assignments",
      icon: GraduationCap,
      route: "/student/login",
      gradient: "from-blue-500 to-cyan-500",
      hoverGradient: "hover:from-blue-600 hover:to-cyan-600"
    },
    {
      title: "Administration",
      description: "Manage system and users",
      icon: Shield,
      route: "/administration/login",
      gradient: "from-emerald-500 to-teal-500",
      hoverGradient: "hover:from-emerald-600 hover:to-teal-600"
    },
    {
      title: "Teacher",
      description: "Create and grade coursework",
      icon: BookOpen,
      route: "/teacher/login",
      gradient: "from-purple-500 to-pink-500",
      hoverGradient: "hover:from-purple-600 hover:to-pink-600"
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 flex items-center justify-center p-4">
      <div className="max-w-5xl w-full">
        <div className="text-center mb-12">
          <h1 className="text-5xl font-bold text-white mb-4">
            Welcome Back
          </h1>
          <p className="text-slate-400 text-lg">
            Choose your role to continue
          </p>
        </div>
        
        <div className="grid md:grid-cols-3 gap-6">
          {loginOptions.map((option) => {
            const Icon = option.icon;
            return (
              <button
                key={option.route}
                onClick={() => navigate(option.route)}
                className={`bg-gradient-to-br ${option.gradient} ${option.hoverGradient} p-8 rounded-2xl shadow-xl transform transition-all duration-300 hover:scale-105 hover:shadow-2xl group`}
              >
                <div className="flex flex-col items-center text-center space-y-4">
                  <div className="bg-white/20 p-4 rounded-full backdrop-blur-sm group-hover:bg-white/30 transition-all duration-300">
                    <Icon className="w-10 h-10 text-white" />
                  </div>
                  <div>
                    <h2 className="text-2xl font-bold text-white mb-2">
                      {option.title}
                    </h2>
                    <p className="text-white/80 text-sm">
                      {option.description}
                    </p>
                  </div>
                </div>
              </button>
            );
          })}
        </div>
        
        <div className="mt-12 text-center">
          <p className="text-slate-500 text-sm">
            Need help? Contact support at support@example.com
          </p>
        </div>
      </div>
    </div>
  );
};

export const MainNavigationRoute = {
  element: <Main />,
  path: "/"
};

export default Main;
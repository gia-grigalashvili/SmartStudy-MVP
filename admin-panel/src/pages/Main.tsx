import React from "react";
import { useNavigate } from "react-router-dom";

const Main: React.FC = () => {
  const navigate = useNavigate();
  return (
    <div className="flex min-h-screen flex-col items-center justify-center gap-6">
      <h1 className="mb-8 text-3xl font-bold">
        Welcome! Please choose login type:
      </h1>
      <div className="flex w-64 flex-col gap-4">
        <button
          className="rounded bg-blue-600 py-3 text-white transition hover:bg-blue-700"
          onClick={() => navigate("/student/login")}
        >
          Login as Student
        </button>
        <button
          className="rounded bg-green-600 py-3 text-white transition hover:bg-green-700"
          onClick={() => navigate("/administration/login")}
        >
          Login as Admin
        </button>
        <button
          className="rounded bg-purple-600 py-3 text-white transition hover:bg-purple-700"
          onClick={() => navigate("/teacher/login")}
        >
          Login as Teacher
        </button>
      </div>
    </div>
  );
};

export const MainNavigationRoute = {
  element: <Main />,
  path: "/"
};

export default Main;

export interface DashboardResponse {
  data: Dashboard;
}

export interface Dashboard {
  studentStatistic: any;
  studentStatistics: StudentStatistic;
  totalTasks: number;
  completedTasks: number;
  totalFlashcards: number;
  totalQuizzes: number;
  averageQuizScore: number;
  passedTests: number;
  weekProgress: number;
}

export interface StudentStatistic {
  id: string;
  month: number;
  year: number;
  askedQuestions: number;
  learningHours: number;
  averageScore: number;
  passedTests: number;
  weekProgress: number;
  createdAt: string;
  updatedAt: string;
}

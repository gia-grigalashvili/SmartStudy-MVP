export interface DashboardResponse {
  data: Dashboard;
}

export interface Dashboard {
  id: string;
  studentStatistics: StudentStatistic;
  createdAt: string;
  updatedAt: string;
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

import { Language, RefreshToken } from "../global";
import { StudentStatistic } from "./dashboard";
import { Flashcard, GroupEnrollment, QuizResult, Task } from "./group";

export interface Student {
  id: string;
  email: string;
  age?: number;
  dateOfBirth: string;
  class?: number;
  personalId: string;
  needPasswordChange: boolean;
  passwordHash: string;
  cards: Flashcard[];
  studentStatistics: StudentStatistic[];
  smsCode?: string;
  smsCodeExpiresAt?: string;
  refreshTokens: RefreshToken[];
  groupEnrollments: GroupEnrollment[];
  tasks: Task[];
  quizResults: QuizResult[];
  translations: StudentTranslation[];
  createdAt: string;
  updatedAt: string;
}

export interface StudentTranslation {
  id: string;
  firstName: string;
  lastName: string;
  fullName: string;
  language: Language;
  languageId: string;
  student: Student;
  studentId: string;
  createdAt: string;
  updatedAt: string;
}

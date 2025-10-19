import { Teacher } from "../teacher";
import { Student } from "./Student";
import { Subject } from "./subject";

export interface GroupsResponse {
  data: Group[];
  count: number;
}

export interface GroupResponse {
  data: Group;
}

export interface Group {
  students: any;
  name: string;
  id: string;
  code: string;
  semester: number;
  year: string;
  subjects: GroupSubject[];
  enrollments: GroupEnrollment[];
  quizzes: Quiz[];
  teacherId: string;
  teacher: Teacher;
  academicCalendar: AcademicCalendar;
  academicCalendarId: string;
  createdAt: string;
  updatedAt: string;
}

export interface GroupSubject {
  id: string;
  group: Group;
  groupId: string;
  subject: Subject;
  subjectId: string;
  createdAt: string;
  updatedAt: string;
}

export interface GroupEnrollment {
  id: string;
  group: Group;
  groupId: string;
  student: Student;
  studentId: string;
  createdAt: string;
  updatedAt: string;
}

export interface Quiz {
  id: string;
  title: string;
  date: string;
  group: Group;
  groupId: string;
  subject: Subject;
  subjectId: string;
  results: QuizResult[];
  createdAt: string;
  updatedAt: string;
}

export interface QuizResult {
  id: string;
  quiz: Quiz;
  quizId: string;
  student: Student;
  studentId: string;
  score: number;
  createdAt: string;
  updatedAt: string;
}

export interface AcademicCalendar {
  id: string;
  year: string;
  semester: number;
  startDate: string;
  endDate: string;
  groups: Group[];
  createdAt: string;
  updatedAt: string;
}

export interface Task {
  id: string;
  title: string;
  description: string;
  dueDate: string;
  completed: boolean;
  student: Student;
  studentId: string;
  createdAt: string;
  updatedAt: string;
}

export interface Flashcard {
  id: string;
  front: string;
  back: string;
  student: Student;
  studentId: string;
  createdAt: string;
  updatedAt: string;
}

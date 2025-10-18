import { UserType } from "./userType";

export interface LoginResponse {
  user: StudentData | AdminData | TeacherData;
  userType: UserType;
}

export interface TeacherData {
  id: string;
  email: string;
  translations: TeacherTranslation[];
  personalId?: string;
}

interface TeacherTranslation {
  id: string;
  firstName: string;
  lastName: string;
  languageId: string;
  teacherId: string;
  createdAt: string;
  updatedAt: string;
}

export interface AdminData {
  id: string;
  username: string;
  translations: AdminTranslation[];
}

interface AdminTranslation {
  id: string;
  firstName: string;
  lastName: string;
  languageId: string;
  adminId: string;
  createdAt: string;
  updatedAt: string;
}

export interface StudentData {
  id: string;
  email: string;
  translations: StudentTranslation[];
}

interface StudentTranslation {
  id: string;
  firstName: string;
  lastName: string;
  languageId: string;
  studentId: string;
  createdAt: string;
  updatedAt: string;
}

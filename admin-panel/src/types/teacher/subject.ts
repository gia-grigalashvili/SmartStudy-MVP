import { Language, RefreshToken } from "../global";
import { Group } from "../student/group";

export interface Teacher {
  id: string;
  email: string;
  age: number;
  dateOfBirth: string;
  personalId: string;
  needPasswordChange: boolean;
  passwordHash: string;
  smsCode?: string;
  smsCodeExpiresAt?: string;
  refreshTokens: RefreshToken[];
  translations: TeacherTranslation[];
  groups: Group[];
  createdAt: string;
  updatedAt: string;
}

export interface TeacherTranslation {
  id: string;
  firstName: string;
  lastName: string;
  fullName: string;
  language: Language;
  languageId: string;
  teacher: Teacher;
  teacherId: string;
  createdAt: string;
  updatedAt: string;
}

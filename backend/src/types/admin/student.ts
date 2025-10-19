import { Translations } from "../global";

export interface CreateStudentDTO {
  email: string;
  personalId: string;
  dateOfBirth: Date;
  password: string;
  class?: number;
  translations: Translations;
}

export interface UpdateStudentDTO {
  id: string;
  email: string;
  personalId: string;
  class?: number;
  dateOfBirth: Date;
  translations: Translations;
}

import { Translations } from "../global";

export interface CreateTeacherDTO {
  email: string;
  personalId: string;
  dateOfBirth: Date;
  password: string;
  translations: Translations;
}

export interface UpdateTeacherDTO {
  id: string;
  email: string;
  personalId: string;
  dateOfBirth: Date;
  translations: Translations;
}

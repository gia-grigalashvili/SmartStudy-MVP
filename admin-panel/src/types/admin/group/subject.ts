import { Language } from "../../global";
import { GroupSubject, Quiz } from "./group";

export interface SubjectsResponse {
  data: Subject[];
  count: number;
}

export interface SubjectResponse {
  data: Subject;
}

export interface Subject {
  id: string;
  code: string;
  translations: SubjectTranslation[];
  groupSubjects: GroupSubject[];
  quizzes: Quiz[];
  createdAt: string;
  updatedAt: string;
}

export interface SubjectTranslation {
  id: string;
  name: string;
  languageId: string;
  language: Language;
  subjectId: string;
  subject: Subject;
  createdAt: string;
  updatedAt: string;
}

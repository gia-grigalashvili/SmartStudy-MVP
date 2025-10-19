import { Translations } from "../global";

export interface CreateSubjectDTO {
  code: string;
  translations: Translations;
}

export interface UpdateSubjectDTO extends CreateSubjectDTO {
  id: string;
}

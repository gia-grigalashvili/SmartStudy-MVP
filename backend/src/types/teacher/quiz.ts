export interface CreateQuizDTO {
  title: string;
  date: string;
  groupId: string;
  subjectId: string;
}

export interface UpdateQuizDTO extends CreateQuizDTO {
  id: string;
}

export interface CreateQuizResultDTO {
  score: number;
  quizId: string;
  studentId: string;
}

export interface UpdateQuizResultDTO extends CreateQuizResultDTO {
  id: string;
}

// types/ai.ts
import React from 'react';

type ReactI18NextChildren = string | number | React.ReactNode;

export interface Message {
  role: 'user' | 'assistant' | 'system';
  content: string;
  test?: TestData | null;
  isResult?: boolean;
  isCorrect?: boolean;
}

export interface TestData {
  subject: ReactI18NextChildren | Iterable<ReactI18NextChildren>;
  type: 'test';
  topic: string;
  questions: TestQuestion[];
}

export interface TestQuestion {
  question: string;
  options: string[];
  correct: number;
}

export interface ChatRequest {
  message: string;
  history: Message[];
}

export interface ChatResponse {
  response: string;
  test?: TestData | null;
}

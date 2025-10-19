import { NextFunction, Router, Request, Response } from "express";
import { GLOBAL_ERROR_MESSAGE } from "@/utils";
import * as quizController from "@/controllers/teacher/quiz";
import { teacherAuthenticate } from "@/middlewares/teacher";
import { validationHandler } from "@/middlewares/global/validationHandler";
import {
  fetchQuizValidation,
  createQuizValidation,
  updateQuizValidation,
  createQuizResultValidation,
  updateQuizResultValidation,
} from "@/validations/teacher/quiz.validations";

export const teacherQuizRouter = Router();

teacherQuizRouter.get(
  "/many/:id",
  teacherAuthenticate,
  fetchQuizValidation,
  validationHandler,
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      return quizController.fetchQuizzes(req, res, next);
    } catch {
      res.status(500).json({ errors: [{ message: GLOBAL_ERROR_MESSAGE }] });
    }
  }
);

teacherQuizRouter.get(
  "/:id",
  teacherAuthenticate,
  fetchQuizValidation,
  validationHandler,
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      return quizController.fetchQuiz(req, res, next);
    } catch {
      res.status(500).json({ errors: [{ message: GLOBAL_ERROR_MESSAGE }] });
    }
  }
);

teacherQuizRouter.post(
  "/",
  teacherAuthenticate,
  createQuizValidation,
  validationHandler,
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      return quizController.createQuiz(req, res, next);
    } catch {
      res.status(500).json({ errors: [{ message: GLOBAL_ERROR_MESSAGE }] });
    }
  }
);

teacherQuizRouter.put(
  "/:id",
  teacherAuthenticate,
  updateQuizValidation,
  validationHandler,
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      return quizController.updateQuiz(req, res, next);
    } catch {
      res.status(500).json({ errors: [{ message: GLOBAL_ERROR_MESSAGE }] });
    }
  }
);

teacherQuizRouter.delete(
  "/:id",
  teacherAuthenticate,
  fetchQuizValidation,
  validationHandler,
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      return quizController.deleteQuiz(req, res, next);
    } catch {
      res.status(500).json({ errors: [{ message: GLOBAL_ERROR_MESSAGE }] });
    }
  }
);

teacherQuizRouter.post(
  "/result",
  teacherAuthenticate,
  createQuizResultValidation,
  validationHandler,
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      return quizController.createQuizResult(req, res, next);
    } catch {
      res.status(500).json({ errors: [{ message: GLOBAL_ERROR_MESSAGE }] });
    }
  }
);

teacherQuizRouter.put(
  "/result/:id",
  teacherAuthenticate,
  updateQuizResultValidation,
  validationHandler,
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      return quizController.updateQuizResult(req, res, next);
    } catch {
      res.status(500).json({ errors: [{ message: GLOBAL_ERROR_MESSAGE }] });
    }
  }
);

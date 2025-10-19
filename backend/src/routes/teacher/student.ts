import { NextFunction, Router, Request, Response } from "express";
import { GLOBAL_ERROR_MESSAGE } from "@/utils";
import * as studentController from "@/controllers/teacher/student";
import { teacherAuthenticate } from "@/middlewares/teacher";
import { validationHandler } from "@/middlewares/global/validationHandler";
import { fetchStudentValidation } from "@/validations/teacher";

export const teacherStudentRouter = Router();

teacherStudentRouter.get(
  "/",
  teacherAuthenticate,
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      return studentController.fetchStudents(req, res, next);
    } catch {
      res.status(500).json({ errors: [{ message: GLOBAL_ERROR_MESSAGE }] });
    }
  }
);

teacherStudentRouter.get(
  "/:id",
  teacherAuthenticate,
  fetchStudentValidation,
  validationHandler,
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      return studentController.fetchStudent(req, res, next);
    } catch {
      res.status(500).json({ errors: [{ message: GLOBAL_ERROR_MESSAGE }] });
    }
  }
);

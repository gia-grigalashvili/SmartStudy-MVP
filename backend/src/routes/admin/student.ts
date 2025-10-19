import { NextFunction, Router, Request, Response } from "express";
import { GLOBAL_ERROR_MESSAGE } from "@/utils";
import * as studentController from "@/controllers/admin/student";
import { adminAuthenticate } from "@/middlewares/admin";
import { validationHandler } from "@/middlewares/global/validationHandler";
import {
  createStudentValidation,
  deleteStudentValidation,
  fetchStudentValidation,
  updateStudentValidation,
} from "@/validations/admin";

export const adminStudentRouter = Router();

adminStudentRouter.get(
  "/",
  adminAuthenticate,
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      return studentController.fetchStudents(req, res, next);
    } catch {
      res.status(500).json({ errors: [{ message: GLOBAL_ERROR_MESSAGE }] });
    }
  }
);

adminStudentRouter.get(
  "/:id",
  adminAuthenticate,
  fetchStudentValidation,
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      return studentController.fetchStudent(req, res, next);
    } catch {
      res.status(500).json({ errors: [{ message: GLOBAL_ERROR_MESSAGE }] });
    }
  }
);

adminStudentRouter.delete(
  "/:id",
  adminAuthenticate,
  deleteStudentValidation,
  validationHandler,
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      return studentController.deleteStudent(req, res, next);
    } catch {
      res.status(500).json({ errors: [{ message: GLOBAL_ERROR_MESSAGE }] });
    }
  }
);

adminStudentRouter.post(
  "/",
  adminAuthenticate,
  createStudentValidation,
  validationHandler,
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      return studentController.createStudent(req, res, next);
    } catch {
      res.status(500).json({ errors: [{ message: GLOBAL_ERROR_MESSAGE }] });
    }
  }
);

adminStudentRouter.put(
  "/:id",
  adminAuthenticate,
  updateStudentValidation,
  validationHandler,
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      return studentController.updateStudent(req, res, next);
    } catch {
      res.status(500).json({ errors: [{ message: GLOBAL_ERROR_MESSAGE }] });
    }
  }
);

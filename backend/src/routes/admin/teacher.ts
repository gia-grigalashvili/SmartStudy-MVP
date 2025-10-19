import { NextFunction, Router, Request, Response } from "express";
import { GLOBAL_ERROR_MESSAGE } from "@/utils";
import * as teacherController from "@/controllers/admin/teacher";
import { adminAuthenticate } from "@/middlewares/admin";
import { validationHandler } from "@/middlewares/global/validationHandler";
import {
  createTeacherValidation,
  deleteTeacherValidation,
  fetchTeacherValidation,
  updateTeacherValidation,
} from "@/validations/admin";

export const adminTeacherRouter = Router();

adminTeacherRouter.get(
  "/",
  adminAuthenticate,
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      return teacherController.fetchTeachers(req, res, next);
    } catch {
      res.status(500).json({ errors: [{ message: GLOBAL_ERROR_MESSAGE }] });
    }
  }
);

adminTeacherRouter.get(
  "/:id",
  adminAuthenticate,
  fetchTeacherValidation,
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      return teacherController.fetchTeacher(req, res, next);
    } catch {
      res.status(500).json({ errors: [{ message: GLOBAL_ERROR_MESSAGE }] });
    }
  }
);

adminTeacherRouter.delete(
  "/:id",
  adminAuthenticate,
  deleteTeacherValidation,
  validationHandler,
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      return teacherController.deleteTeacher(req, res, next);
    } catch {
      res.status(500).json({ errors: [{ message: GLOBAL_ERROR_MESSAGE }] });
    }
  }
);

adminTeacherRouter.post(
  "/",
  adminAuthenticate,
  createTeacherValidation,
  validationHandler,
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      return teacherController.createTeacher(req, res, next);
    } catch {
      res.status(500).json({ errors: [{ message: GLOBAL_ERROR_MESSAGE }] });
    }
  }
);

adminTeacherRouter.put(
  "/:id",
  adminAuthenticate,
  updateTeacherValidation,
  validationHandler,
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      return teacherController.updateTeacher(req, res, next);
    } catch {
      res.status(500).json({ errors: [{ message: GLOBAL_ERROR_MESSAGE }] });
    }
  }
);

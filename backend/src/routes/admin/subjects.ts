import { NextFunction, Router, Request, Response } from "express";
import { GLOBAL_ERROR_MESSAGE } from "@/utils";
import * as subjectController from "@/controllers/admin/subject";
import { adminAuthenticate } from "@/middlewares/admin";
import { validationHandler } from "@/middlewares/global/validationHandler";
import {
  createSubjectValidation,
  deleteSubjectValidation,
  fetchSubjectValidation,
  updateSubjectValidation,
} from "@/validations/admin";

export const adminSubjectRouter = Router();

adminSubjectRouter.get(
  "/",
  adminAuthenticate,
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      return subjectController.fetchSubjects(req, res, next);
    } catch {
      res.status(500).json({ errors: [{ message: GLOBAL_ERROR_MESSAGE }] });
    }
  }
);

adminSubjectRouter.get(
  "/:id",
  adminAuthenticate,
  fetchSubjectValidation,
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      return subjectController.fetchSubject(req, res, next);
    } catch {
      res.status(500).json({ errors: [{ message: GLOBAL_ERROR_MESSAGE }] });
    }
  }
);

adminSubjectRouter.delete(
  "/:id",
  adminAuthenticate,
  deleteSubjectValidation,
  validationHandler,
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      return subjectController.deleteSubject(req, res, next);
    } catch {
      res.status(500).json({ errors: [{ message: GLOBAL_ERROR_MESSAGE }] });
    }
  }
);

adminSubjectRouter.post(
  "/",
  adminAuthenticate,
  createSubjectValidation,
  validationHandler,
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      return subjectController.createSubject(req, res, next);
    } catch {
      res.status(500).json({ errors: [{ message: GLOBAL_ERROR_MESSAGE }] });
    }
  }
);

adminSubjectRouter.put(
  "/:id",
  adminAuthenticate,
  updateSubjectValidation,
  validationHandler,
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      return subjectController.updateSubject(req, res, next);
    } catch {
      res.status(500).json({ errors: [{ message: GLOBAL_ERROR_MESSAGE }] });
    }
  }
);

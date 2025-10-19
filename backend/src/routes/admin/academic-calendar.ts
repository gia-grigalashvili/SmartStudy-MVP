import { NextFunction, Router, Request, Response } from "express";
import { GLOBAL_ERROR_MESSAGE } from "@/utils";
import * as academicCalendarController from "@/controllers/admin/academic-calendar";
import { adminAuthenticate } from "@/middlewares/admin";
import { validationHandler } from "@/middlewares/global/validationHandler";
import {
  createAcademicCalendarValidation,
  deleteAcademicCalendarValidation,
  fetchAcademicCalendarValidation,
  updateAcademicCalendarValidation,
} from "@/validations/admin";

export const adminAcademicCalendarRouter = Router();

adminAcademicCalendarRouter.get(
  "/",
  adminAuthenticate,
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      return academicCalendarController.fetchAcademicCalendars(req, res, next);
    } catch {
      res.status(500).json({ errors: [{ message: GLOBAL_ERROR_MESSAGE }] });
    }
  }
);

adminAcademicCalendarRouter.get(
  "/:id",
  adminAuthenticate,
  fetchAcademicCalendarValidation,
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      return academicCalendarController.fetchAcademicCalendar(req, res, next);
    } catch {
      res.status(500).json({ errors: [{ message: GLOBAL_ERROR_MESSAGE }] });
    }
  }
);

adminAcademicCalendarRouter.delete(
  "/:id",
  adminAuthenticate,
  deleteAcademicCalendarValidation,
  validationHandler,
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      return academicCalendarController.deleteAcademicCalendar(req, res, next);
    } catch {
      res.status(500).json({ errors: [{ message: GLOBAL_ERROR_MESSAGE }] });
    }
  }
);

adminAcademicCalendarRouter.post(
  "/",
  adminAuthenticate,
  createAcademicCalendarValidation,
  validationHandler,
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      return academicCalendarController.createAcademicCalendar(req, res, next);
    } catch {
      res.status(500).json({ errors: [{ message: GLOBAL_ERROR_MESSAGE }] });
    }
  }
);

adminAcademicCalendarRouter.put(
  "/:id",
  adminAuthenticate,
  updateAcademicCalendarValidation,
  validationHandler,
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      return academicCalendarController.updateAcademicCalendar(req, res, next);
    } catch {
      res.status(500).json({ errors: [{ message: GLOBAL_ERROR_MESSAGE }] });
    }
  }
);

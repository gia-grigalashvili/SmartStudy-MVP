import { NextFunction, Router, Request, Response } from "express";
import { GLOBAL_ERROR_MESSAGE } from "@/utils";
import * as dashboardController from "@/controllers/student/dashboard";
import { studentAuthenticate } from "@/middlewares/student";

export const studentDashboardRouter = Router();

studentDashboardRouter.get(
  "/",
  studentAuthenticate,
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      return dashboardController.fetchDashboard(req, res, next);
    } catch {
      res.status(500).json({ errors: [{ message: GLOBAL_ERROR_MESSAGE }] });
    }
  }
);

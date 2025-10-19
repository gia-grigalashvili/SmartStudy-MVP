import { NextFunction, Router, Request, Response } from "express";
import { GLOBAL_ERROR_MESSAGE } from "@/utils";
import * as groupController from "@/controllers/student/group";
import { studentAuthenticate } from "@/middlewares/student";
import { fetchGroupValidation } from "@/validations/admin";

export const studentGroupRouter = Router();

studentGroupRouter.get(
  "/",
  studentAuthenticate,
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      return groupController.fetchGroups(req, res, next);
    } catch {
      res.status(500).json({ errors: [{ message: GLOBAL_ERROR_MESSAGE }] });
    }
  }
);

studentGroupRouter.get(
  "/:id",
  studentAuthenticate,
  fetchGroupValidation,
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      return groupController.fetchGroup(req, res, next);
    } catch {
      res.status(500).json({ errors: [{ message: GLOBAL_ERROR_MESSAGE }] });
    }
  }
);

import { NextFunction, Router, Request, Response } from "express";
import { GLOBAL_ERROR_MESSAGE } from "@/utils";
import * as groupController from "@/controllers/teacher/group";
import { teacherAuthenticate } from "@/middlewares/teacher";
import { validationHandler } from "@/middlewares/global/validationHandler";
import { fetchGroupValidation } from "@/validations/teacher";

export const teacherGroupRouter = Router();

teacherGroupRouter.get(
  "/",
  teacherAuthenticate,
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      return groupController.fetchGroups(req, res, next);
    } catch {
      res.status(500).json({ errors: [{ message: GLOBAL_ERROR_MESSAGE }] });
    }
  }
);

teacherGroupRouter.get(
  "/:id",
  teacherAuthenticate,
  fetchGroupValidation,
  validationHandler,
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      return groupController.fetchGroup(req, res, next);
    } catch {
      res.status(500).json({ errors: [{ message: GLOBAL_ERROR_MESSAGE }] });
    }
  }
);

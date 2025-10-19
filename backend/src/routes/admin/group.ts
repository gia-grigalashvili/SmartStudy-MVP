import { NextFunction, Router, Request, Response } from "express";
import { GLOBAL_ERROR_MESSAGE } from "@/utils";
import * as groupController from "@/controllers/admin/group";
import { adminAuthenticate } from "@/middlewares/admin";
import { validationHandler } from "@/middlewares/global/validationHandler";
import {
  createGroupValidation,
  deleteGroupValidation,
  fetchGroupValidation,
  updateGroupValidation,
} from "@/validations/admin";

export const adminGroupRouter = Router();

adminGroupRouter.get(
  "/",
  adminAuthenticate,
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      return groupController.fetchGroups(req, res, next);
    } catch {
      res.status(500).json({ errors: [{ message: GLOBAL_ERROR_MESSAGE }] });
    }
  }
);

adminGroupRouter.get(
  "/:id",
  adminAuthenticate,
  fetchGroupValidation,
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      return groupController.fetchGroup(req, res, next);
    } catch {
      res.status(500).json({ errors: [{ message: GLOBAL_ERROR_MESSAGE }] });
    }
  }
);

adminGroupRouter.delete(
  "/:id",
  adminAuthenticate,
  deleteGroupValidation,
  validationHandler,
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      return groupController.deleteGroup(req, res, next);
    } catch {
      res.status(500).json({ errors: [{ message: GLOBAL_ERROR_MESSAGE }] });
    }
  }
);

adminGroupRouter.post(
  "/",
  adminAuthenticate,
  createGroupValidation,
  validationHandler,
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      return groupController.createGroup(req, res, next);
    } catch {
      res.status(500).json({ errors: [{ message: GLOBAL_ERROR_MESSAGE }] });
    }
  }
);

adminGroupRouter.put(
  "/:id",
  adminAuthenticate,
  updateGroupValidation,
  validationHandler,
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      return groupController.updateGroup(req, res, next);
    } catch {
      res.status(500).json({ errors: [{ message: GLOBAL_ERROR_MESSAGE }] });
    }
  }
);

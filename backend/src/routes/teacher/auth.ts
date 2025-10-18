import { NextFunction, Router, Request, Response } from "express";
import { GLOBAL_ERROR_MESSAGE } from "@/utils";
import * as authController from "@/controllers/teacher/auth";
import {
  forgotTeacherPasswordValidation,
  forgotTeacherPasswordVerificationValidation,
  loginValidation,
  resendValidation,
  resetTeacherPasswordValidation,
  verifyValidation,
} from "@/validations/teacher/";
import { teacherAuthenticate, isTeacherVerified } from "@/middlewares/teacher";
import { validationHandler } from "@/middlewares/global/validationHandler";

export const teacherAuthRouter = Router();

teacherAuthRouter.post(
  "/login",
  loginValidation,
  validationHandler,
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      return authController.login(req, res, next);
    } catch {
      res.status(500).json({ errors: [{ message: GLOBAL_ERROR_MESSAGE }] });
    }
  }
);

teacherAuthRouter.post(
  "/verify-otp",
  verifyValidation,
  validationHandler,
  isTeacherVerified,
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      return authController.verifyOtp(req, res, next);
    } catch {
      res.status(500).json({ errors: [{ message: GLOBAL_ERROR_MESSAGE }] });
    }
  }
);

teacherAuthRouter.post(
  "/resend-otp",
  resendValidation,
  validationHandler,
  isTeacherVerified,
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      return authController.resendTeacherVerificationCode(req, res, next);
    } catch {
      res.status(500).json({ errors: [{ message: GLOBAL_ERROR_MESSAGE }] });
    }
  }
);

teacherAuthRouter.get(
  "/renew",
  teacherAuthenticate,
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      return authController.renew(req, res, next);
    } catch {
      return res
        .status(500)
        .json({ errors: [{ message: GLOBAL_ERROR_MESSAGE }] });
    }
  }
);

teacherAuthRouter.post(
  "/forgot-password",
  forgotTeacherPasswordValidation,
  validationHandler,
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      return authController.forgotPassword(req, res, next);
    } catch {
      res.status(500).json({ errors: [{ message: GLOBAL_ERROR_MESSAGE }] });
    }
  }
);

teacherAuthRouter.post(
  "/forgot-password-verification",
  forgotTeacherPasswordVerificationValidation,
  validationHandler,
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      return authController.forgotPasswordVerification(req, res, next);
    } catch {
      res.status(500).json({ errors: [{ message: GLOBAL_ERROR_MESSAGE }] });
    }
  }
);

teacherAuthRouter.post(
  "/password-reset",
  resetTeacherPasswordValidation,
  validationHandler,
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      return authController.resetPassword(req, res, next);
    } catch {
      res.status(500).json({ errors: [{ message: GLOBAL_ERROR_MESSAGE }] });
    }
  }
);

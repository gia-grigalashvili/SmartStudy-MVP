import { NextFunction, Router, Request, Response } from "express";
import { GLOBAL_ERROR_MESSAGE } from "@/utils";
import * as authController from "@/controllers/student/auth";
import {
  forgotStudentPasswordValidation,
  forgotStudentPasswordVerificationValidation,
  loginValidation,
  resendValidation,
  resetStudentPasswordValidation,
  verifyValidation,
} from "@/validations/student/";
import { studentAuthenticate, isStudentVerified } from "@/middlewares/student";
import { validationHandler } from "@/middlewares/global/validationHandler";

export const studentAuthRouter = Router();

studentAuthRouter.post(
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

studentAuthRouter.post(
  "/verify-otp",
  verifyValidation,
  validationHandler,
  isStudentVerified,
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      return authController.verifyOtp(req, res, next);
    } catch {
      res.status(500).json({ errors: [{ message: GLOBAL_ERROR_MESSAGE }] });
    }
  }
);

studentAuthRouter.post(
  "/resend-otp",
  resendValidation,
  validationHandler,
  isStudentVerified,
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      return authController.resendStudentVerificationCode(req, res, next);
    } catch {
      res.status(500).json({ errors: [{ message: GLOBAL_ERROR_MESSAGE }] });
    }
  }
);

studentAuthRouter.get(
  "/renew",
  studentAuthenticate,
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

studentAuthRouter.post(
  "/forgot-password",
  forgotStudentPasswordValidation,
  validationHandler,
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      return authController.forgotPassword(req, res, next);
    } catch {
      res.status(500).json({ errors: [{ message: GLOBAL_ERROR_MESSAGE }] });
    }
  }
);

studentAuthRouter.post(
  "/forgot-password-verification",
  forgotStudentPasswordVerificationValidation,
  validationHandler,
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      return authController.forgotPasswordVerification(req, res, next);
    } catch {
      res.status(500).json({ errors: [{ message: GLOBAL_ERROR_MESSAGE }] });
    }
  }
);

studentAuthRouter.post(
  "/password-reset",
  resetStudentPasswordValidation,
  validationHandler,
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      return authController.resetPassword(req, res, next);
    } catch {
      res.status(500).json({ errors: [{ message: GLOBAL_ERROR_MESSAGE }] });
    }
  }
);

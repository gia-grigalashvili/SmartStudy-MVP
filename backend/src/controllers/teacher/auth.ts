import { prisma } from "@/config";
import {
  ITeacherLogin,
  IForgotTeacherPasswordVerification,
  IOtpCodeResend,
  IOtpVerification,
  IResetTeacherPassword,
} from "@/types/teacher/auth";
import { IForgetPasswordWithEmail } from "@/types/teacher";
import {
  generateAccessToken,
  generateRefreshToken,
  sendError,
  verifyField,
  cookieOptions,
  inMinutes,
  getResponseMessage,
  generateSmsCode,
  createPassword,
  generateStageToken,
} from "@/utils";
import { NextFunction, Response, Request } from "express";

export const login = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { email, password, remember } = req.body as ITeacherLogin;

    const user = await prisma.teacher.findUnique({ where: { email } });

    if (!user || !(await verifyField(password, user.passwordHash))) {
      return sendError(req, res, 401, "invalidCredentials");
    }

    const payload = { id: user.id, email: user.email };
    const access = generateAccessToken(payload, "TEACHER");
    const refresh = generateRefreshToken(payload, "TEACHER");

    res.cookie("accessToken", access.token, {
      ...cookieOptions,
      maxAge: remember ? refresh.expiresIn : undefined,
    });
    res.cookie("refreshToken", refresh.token, {
      ...cookieOptions,
      maxAge: remember ? refresh.expiresIn : undefined,
    });

    return res.json({
      message: getResponseMessage("loginSuccessful"),
      data: {
        userType: "teacher",
        user: user,
      },
    });
  } catch (error: unknown) {
    next(error);
  }
};

export const verifyOtp = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { code } = req.body as IOtpVerification;

    const teacher = await prisma.teacher.findUnique({
      where: { id: (req as any).userId },
    });
    if (!teacher) {
      return sendError(req, res, 404, "userNotFound");
    }

    const isValid = teacher.smsCode
      ? await verifyField(code, teacher.smsCode)
      : false;
    if (!isValid) {
      return sendError(req, res, 401, "codeisInvalid");
    }

    res.clearCookie("teacher_verify_stage");

    const remember = (req as any).remember;
    const payload = { id: teacher.id, email: teacher.email };
    const access = generateAccessToken(payload, "TEACHER");
    const refresh = generateRefreshToken(payload, "TEACHER");

    res.cookie("accessToken", access.token, {
      ...cookieOptions,
      maxAge: remember ? refresh.expiresIn : undefined,
    });

    res.cookie("refreshToken", refresh.token, {
      ...cookieOptions,
      maxAge: remember ? refresh.expiresIn : undefined,
    });

    return res.json({
      message: getResponseMessage("loginSuccessful"),
      data: {
        userType: "teacher",
        user: teacher,
      },
    });
  } catch (error) {
    next(error);
  }
};

export const resendTeacherVerificationCode = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { email } = req.body as IOtpCodeResend;

    const teacher = await prisma.teacher.findUnique({
      where: {
        email,
      },
    });

    if (!teacher) {
      return sendError(req, res, 404, "userNotFound");
    }
    if (
      teacher.smsCodeExpiresAt &&
      new Date(teacher.smsCodeExpiresAt) > new Date()
    ) {
      return sendError(req, res, 400, "verificationCodeStillValid");
    }

    const {
      hashedSmsCode,
      //  smsCode
    } = await generateSmsCode();

    await prisma.teacher.update({
      where: {
        id: teacher.id,
      },
      data: {
        smsCode: hashedSmsCode,
        smsCodeExpiresAt: inMinutes(5),
      },
    });

    // await mailer.sendOtpCode(email, smsCode);

    return res.status(200).json({
      message: getResponseMessage("verificationCodeResent"),
    });
  } catch (error) {
    return next(error);
  }
};

export const renew = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const user = await prisma.teacher.findUnique({
      where: { id: req.user.id },
      omit: { passwordHash: true },
      include: {
        translations: {
          include: {
            language: {
              select: {
                code: true,
              },
            },
          },
        },
      },
    });

    if (!user) {
      return sendError(req, res, 404, "userNotFound");
    }

    return res.json({
      data: {
        userType: "teacher",
        user,
      },
    });
  } catch (error) {
    next(error);
  }
};

export const forgotPassword = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { email } = req.body as IForgetPasswordWithEmail;

    const teacher = await prisma.teacher.findUnique({
      where: {
        email,
      },
    });

    if (!teacher) {
      return sendError(req, res, 404, "userNotFound");
    }

    const {
      hashedSmsCode,
      //  smsCode
    } = await generateSmsCode();

    // await mailer.sendOtpCode(email, smsCode);

    await prisma.teacher.update({
      where: {
        id: teacher.id,
      },
      data: {
        smsCode: hashedSmsCode,
        smsCodeExpiresAt: inMinutes(5),
      },
    });

    return res.status(200).json({
      message: getResponseMessage("codeSent"),
    });
  } catch (error) {
    next(error);
  }
};

export const forgotPasswordVerification = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { code: smsCode, email } =
      req.body as IForgotTeacherPasswordVerification;

    const teacher = await prisma.teacher.findUnique({
      where: {
        email,
      },
    });

    if (!teacher || !teacher.smsCode) {
      return sendError(req, res, 404, "userNotFound");
    }

    const isSmsValid = await verifyField(smsCode, teacher.smsCode);
    if (!isSmsValid) {
      return sendError(req, res, 401, "codeisInvalid");
    }

    return res.status(200).json({
      message: getResponseMessage("codeVerified"),
      code: smsCode,
    });
  } catch (error) {
    next(error);
  }
};

export const resetPassword = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const {
      email,
      password,
      code: smsCode,
    } = req.body as IResetTeacherPassword;

    const teacher = await prisma.teacher.findUnique({ where: { email } });

    if (!teacher || !teacher.smsCode) {
      return sendError(req, res, 404, "userNotFound");
    }

    const isSmsValid = await verifyField(smsCode, teacher.smsCode);
    if (!isSmsValid) {
      return sendError(req, res, 401, "codeisInvalid");
    }

    const passwordHash = await createPassword(password);

    const newTeacher = await prisma.teacher.update({
      where: {
        id: teacher.id,
      },
      data: {
        passwordHash,
        smsCode: null,
      },
    });

    return res.status(200).json({
      message: getResponseMessage("passwordChanged"),
      data: {
        userType: "teacher",
        user: newTeacher,
      },
    });
  } catch (error) {
    next(error);
  }
};

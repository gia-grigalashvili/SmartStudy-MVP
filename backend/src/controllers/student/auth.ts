import { prisma } from "@/config";
import {
  IStudentLogin,
  IForgotStudentPasswordVerification,
  IOtpCodeResend,
  IOtpVerification,
  IResetStudentPassword,
} from "@/types/student/auth";
import { IForgetPasswordWithEmail } from "@/types/student";
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
    const { email, password, remember } = req.body as IStudentLogin;

    const user = await prisma.student.findUnique({ where: { email } });

    if (!user || !(await verifyField(password, user.passwordHash))) {
      return sendError(req, res, 401, "invalidCredentials");
    }

    const payload = { id: user.id, email: user.email };
    const access = generateAccessToken(payload, "STUDENT");
    const refresh = generateRefreshToken(payload, "STUDENT");

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
        userType: "student",
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

    const student = await prisma.student.findUnique({
      where: { id: (req as any).userId },
    });
    if (!student) {
      return sendError(req, res, 404, "userNotFound");
    }

    const isValid = student.smsCode
      ? await verifyField(code, student.smsCode)
      : false;
    if (!isValid) {
      return sendError(req, res, 401, "codeisInvalid");
    }

    res.clearCookie("student_verify_stage");

    const remember = (req as any).remember;
    const payload = { id: student.id, email: student.email };
    const access = generateAccessToken(payload, "STUDENT");
    const refresh = generateRefreshToken(payload, "STUDENT");

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
        userType: "student",
        user: student,
      },
    });
  } catch (error) {
    next(error);
  }
};

export const resendStudentVerificationCode = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { email } = req.body as IOtpCodeResend;

    const student = await prisma.student.findUnique({
      where: {
        email,
      },
    });

    if (!student) {
      return sendError(req, res, 404, "userNotFound");
    }
    if (
      student.smsCodeExpiresAt &&
      new Date(student.smsCodeExpiresAt) > new Date()
    ) {
      return sendError(req, res, 400, "verificationCodeStillValid");
    }

    const {
      hashedSmsCode,
      //  smsCode
    } = await generateSmsCode();

    await prisma.student.update({
      where: {
        id: student.id,
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
    const user = await prisma.student.findUnique({
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
        userType: "student",
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

    const student = await prisma.student.findUnique({
      where: {
        email,
      },
    });

    if (!student) {
      return sendError(req, res, 404, "userNotFound");
    }

    const {
      hashedSmsCode,
      //  smsCode
    } = await generateSmsCode();

    // await mailer.sendOtpCode(email, smsCode);

    await prisma.student.update({
      where: {
        id: student.id,
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
      req.body as IForgotStudentPasswordVerification;

    const student = await prisma.student.findUnique({
      where: {
        email,
      },
    });

    if (!student || !student.smsCode) {
      return sendError(req, res, 404, "userNotFound");
    }

    const isSmsValid = await verifyField(smsCode, student.smsCode);
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
    } = req.body as IResetStudentPassword;

    const student = await prisma.student.findUnique({ where: { email } });

    if (!student || !student.smsCode) {
      return sendError(req, res, 404, "userNotFound");
    }

    const isSmsValid = await verifyField(smsCode, student.smsCode);
    if (!isSmsValid) {
      return sendError(req, res, 401, "codeisInvalid");
    }

    const passwordHash = await createPassword(password);

    const newStudent = await prisma.student.update({
      where: {
        id: student.id,
      },
      data: {
        passwordHash,
        smsCode: null,
      },
    });

    return res.status(200).json({
      message: getResponseMessage("passwordChanged"),
      data: {
        userType: "student",
        user: newStudent,
      },
    });
  } catch (error) {
    next(error);
  }
};

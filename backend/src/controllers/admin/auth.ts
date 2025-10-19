import { prisma } from "@/config";
import {
  IAdminLogin,
  IForgotAdminPasswordVerification,
  IOtpCodeResend,
  IOtpVerification,
  IResetAdminPassword,
} from "@/types/admin/auth";
import { IForgetPasswordWithEmail } from "@/types/admin";
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
    const { email, password, remember } = req.body as IAdminLogin;

    const user = await prisma.admin.findUnique({ where: { email } });

    if (!user || !(await verifyField(password, user.passwordHash))) {
      return sendError(req, res, 401, "invalidCredentials");
    }

    if (!user.twoFactorAuth) {
      const payload = { id: user.id, email: user.email };
      const access = generateAccessToken(payload, "ADMIN");
      const refresh = generateRefreshToken(payload, "ADMIN");

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
          userType: "administration",
          user: user,
        },
      });
    }

    const {
      hashedSmsCode,
      //  smsCode
    } = await generateSmsCode();

    await prisma.admin.update({
      where: { id: user.id },
      data: {
        smsCode: hashedSmsCode,
        smsCodeExpiresAt: inMinutes(5),
      },
    });

    // await mailer.sendOtpCode(email, smsCode);

    const stageToken = generateStageToken(user.id, remember, "ADMIN");

    res.cookie("admin_verify_stage", stageToken.token, {
      ...cookieOptions,
      maxAge: 5 * 60 * 1000,
    });

    return res.status(200).json({ message: getResponseMessage("codeSent") });
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

    const admin = await prisma.admin.findUnique({
      where: { id: (req as any).userId },
    });
    if (!admin) {
      return sendError(req, res, 404, "userNotFound");
    }

    const isValid = admin.smsCode
      ? await verifyField(code, admin.smsCode)
      : false;
    if (!isValid) {
      return sendError(req, res, 401, "codeisInvalid");
    }

    res.clearCookie("admin_verify_stage");

    const remember = (req as any).remember;
    const payload = { id: admin.id, email: admin.email };
    const access = generateAccessToken(payload, "ADMIN");
    const refresh = generateRefreshToken(payload, "ADMIN");

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
        userType: "administration",
        user: admin,
      },
    });
  } catch (error) {
    next(error);
  }
};

export const resendAdminVerificationCode = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { email } = req.body as IOtpCodeResend;

    const admin = await prisma.admin.findUnique({
      where: {
        email,
      },
    });

    if (!admin) {
      return sendError(req, res, 404, "userNotFound");
    }
    if (
      admin.smsCodeExpiresAt &&
      new Date(admin.smsCodeExpiresAt) > new Date()
    ) {
      return sendError(req, res, 400, "verificationCodeStillValid");
    }

    const {
      hashedSmsCode,
      //  smsCode
    } = await generateSmsCode();

    await prisma.admin.update({
      where: {
        id: admin.id,
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
    const user = await prisma.admin.findUnique({
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
        userType: "administration",
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

    const admin = await prisma.admin.findUnique({
      where: {
        email,
      },
    });

    if (!admin) {
      return sendError(req, res, 404, "userNotFound");
    }

    const {
      hashedSmsCode,
      //  smsCode
    } = await generateSmsCode();

    // await mailer.sendOtpCode(email, smsCode);

    await prisma.admin.update({
      where: {
        id: admin.id,
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
      req.body as IForgotAdminPasswordVerification;

    const admin = await prisma.admin.findUnique({
      where: {
        email,
      },
    });

    if (!admin || !admin.smsCode) {
      return sendError(req, res, 404, "userNotFound");
    }

    const isSmsValid = await verifyField(smsCode, admin.smsCode);
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
    const { email, password, code: smsCode } = req.body as IResetAdminPassword;

    const admin = await prisma.admin.findUnique({ where: { email } });

    if (!admin || !admin.smsCode) {
      return sendError(req, res, 404, "userNotFound");
    }

    const isSmsValid = await verifyField(smsCode, admin.smsCode);
    if (!isSmsValid) {
      return sendError(req, res, 401, "codeisInvalid");
    }

    const passwordHash = await createPassword(password);

    const newAdmin = await prisma.admin.update({
      where: {
        id: admin.id,
      },
      data: {
        passwordHash,
        smsCode: null,
      },
    });

    return res.status(200).json({
      message: getResponseMessage("passwordChanged"),
      data: {
        userType: "administration",
        user: newAdmin,
      },
    });
  } catch (error) {
    next(error);
  }
};

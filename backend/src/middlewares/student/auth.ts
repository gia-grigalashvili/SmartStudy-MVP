import { Request, Response, NextFunction } from "express";
import jwt, { JwtPayload } from "jsonwebtoken";
import { getEnvVariable } from "@/config";
import { User } from "@/types/global";
import { getTokenFromRequest, sendError } from "@/utils";

type TokenPayload = JwtPayload & User;

export const studentAuthenticate = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const accessToken = getTokenFromRequest(req);
  const refreshToken = req.cookies?.["refreshToken"];

  if (!accessToken || !refreshToken) {
    return sendError(req, res, 401, "noTokenProvided");
  }

  const accessSecret = getEnvVariable("STUDENT_JWT_ACCESS_SECRET");
  const refreshSecret = getEnvVariable("STUDENT_JWT_REFRESH_SECRET");
  if (!accessSecret || !refreshSecret) {
    return sendError(req, res, 500, "jwtSecretNotProvided");
  }

  try {
    const decoded = jwt.verify(accessToken, accessSecret) as TokenPayload;
    req.user = decoded;
    return next();
  } catch (accessError) {
    try {
      const decodedRefresh = jwt.verify(
        refreshToken,
        refreshSecret
      ) as TokenPayload;

      const newAccessToken = jwt.sign(decodedRefresh, accessSecret, {
        expiresIn: "1d",
      });
      res.cookie("accessToken", newAccessToken, {
        httpOnly: true,
        sameSite: "strict",
      });

      req.user = decodedRefresh;
      return next();
    } catch (refreshError) {
      return sendError(req, res, 401, "studentAuthenticateFailed");
    }
  }
};

export const isStudentVerified = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const stageToken = req.cookies.student_verify_stage;

    if (!stageToken) {
      return sendError(req, res, 401, "verificationRequired");
    }

    const decoded = jwt.verify(
      stageToken,
      getEnvVariable("STAGE_JWT_SECRET")
    ) as { id: string; remember?: boolean };

    (req as any).userId = decoded.id;
    (req as any).remember = decoded.remember ?? false;

    next();
  } catch (error) {
    return sendError(req, res, 401, "invalidRefreshToken");
  }
};

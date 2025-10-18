import { Request, Response, NextFunction } from "express";
import { validationResult } from "express-validator";
import { errorMessages, TranslatedMessage } from "@/utils";

type ValidationErrorShape = {
  msg: any;
  param: string;
  value?: any;
  location?: string;
};

type ValidationErrorOutput = {
  value?: any;
  param: string;
  location?: string;
  message: TranslatedMessage;
};

export const validationHandler = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const result = validationResult(req);
  if (result.isEmpty()) return next();

  const raw = result.array();
  const rawErrors: ValidationErrorShape[] = raw.map((err) => {
    const anyErr = err as any;
    const param =
      typeof anyErr.param === "string"
        ? anyErr.param
        : String(anyErr.path ?? anyErr.location ?? "");
    const value = anyErr.value;
    const location =
      typeof anyErr.location === "string" ? anyErr.location : undefined;
    const msg = anyErr.msg;

    return {
      msg,
      param,
      value,
      location,
    };
  });

  const mapped: ValidationErrorOutput[] = rawErrors.map((err) => {
    const rawMsg = err.msg;

    if (typeof rawMsg === "string") {
      const mappedObj =
        rawMsg in errorMessages
          ? errorMessages[rawMsg as keyof typeof errorMessages]
          : undefined;

      const message = (mappedObj ?? {
        en: rawMsg,
        ka: rawMsg,
      }) as TranslatedMessage;

      return {
        value: err.value,
        param: err.param,
        location: err.location,
        message,
      };
    }

    if (rawMsg && typeof rawMsg === "object") {
      const maybe = rawMsg as Partial<TranslatedMessage>;
      const message = {
        en: maybe.en ?? String(rawMsg),
        ka: maybe.ka ?? String(rawMsg),
      } as TranslatedMessage;

      return {
        value: err.value,
        param: err.param,
        location: err.location,
        message,
      };
    }

    return {
      value: err.value,
      param: err.param,
      location: err.location,
      message: { en: String(rawMsg), ka: String(rawMsg) } as TranslatedMessage,
    };
  });

  return res.status(400).json({ errors: mapped });
};

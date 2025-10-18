import { Response, Request } from "express";
import { ErrorKey, errorMessages, TranslatedMessage } from "./messages";

export function getResponseMessage(messageKey: ErrorKey): TranslatedMessage {
  return (
    errorMessages[messageKey] || {
      en: "Unknown error",
      ka: "ამოუცნობი შეცდომა",
    }
  );
}

export async function sendError(
  req: Request,
  res: Response,
  statusCode: number,
  messageKey: ErrorKey
) {
  const message = getResponseMessage(messageKey);
  return res.status(statusCode).json({
    error: message,
  });
}

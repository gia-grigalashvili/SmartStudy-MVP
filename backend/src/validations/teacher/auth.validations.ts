import { body } from "express-validator";
import {
  codeValidation,
  emailValidation,
  existanceValidation,
  passwordValidation,
} from "../shared";

export const loginValidation = [
  passwordValidation(),
  body("email").isEmail().withMessage("invalidEmail"),
];

export const forgotTeacherPasswordValidation = [
  emailValidation(),
  existanceValidation("email", "teacher"),
];

export const forgotTeacherPasswordVerificationValidation = [
  emailValidation(),
  codeValidation("code"),
];

export const resetTeacherPasswordValidation = [
  codeValidation("code"),
  emailValidation(),
  passwordValidation(),
];

export const verifyValidation = [codeValidation("code")];
export const resendValidation = [emailValidation()];

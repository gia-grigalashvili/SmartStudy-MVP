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

export const forgotStudentPasswordValidation = [
  emailValidation(),
  existanceValidation("email", "student"),
];

export const forgotStudentPasswordVerificationValidation = [
  emailValidation(),
  codeValidation("code"),
];

export const resetStudentPasswordValidation = [
  codeValidation("code"),
  emailValidation(),
  passwordValidation(),
];

export const verifyValidation = [codeValidation("code")];
export const resendValidation = [emailValidation()];

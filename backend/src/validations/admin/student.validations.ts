import {
  emailValidation,
  passwordValidation,
  uuidValidation,
  validateTranslations,
} from "@/validations/shared";
import { body } from "express-validator";

export const fetchStudentValidation = [uuidValidation()];

export const deleteStudentValidation = [uuidValidation()];

export const createStudentValidation = [
  emailValidation("email", true),
  body("dateOfBirth").isString().withMessage("invalidDateOfBirth"),
  body("personalId")
    .isString()
    .trim()
    .notEmpty()
    .withMessage("invalidPersonalId")
    .isLength({ min: 9, max: 20 })
    .withMessage("personalIdLength"),
  body("class").optional().isInt().withMessage("invalidClass"),
  passwordValidation(),
  body("translations")
    .isObject()
    .custom((translations) =>
      validateTranslations(translations, [
        { name: "firstName", required: true },
        { name: "lastName", required: true },
        { name: "fullName", required: false },
      ])
    ),
];

export const updateStudentValidation = [
  uuidValidation(),
  emailValidation("email", true),
  body("dateOfBirth").isString().withMessage("invalidDateOfBirth"),
  body("personalId")
    .isString()
    .trim()
    .notEmpty()
    .withMessage("invalidPersonalId")
    .isLength({ min: 9, max: 20 })
    .withMessage("personalIdLength"),
  body("class").optional().isInt().withMessage("invalidClass"),
  body("translations")
    .isObject()
    .custom((translations) =>
      validateTranslations(translations, [
        { name: "firstName", required: true },
        { name: "lastName", required: true },
        { name: "fullName", required: false },
      ])
    ),
];

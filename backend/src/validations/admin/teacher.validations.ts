import {
  emailValidation,
  passwordValidation,
  uuidValidation,
  validateTranslations,
} from "@/validations/shared";
import { body } from "express-validator";

export const fetchTeacherValidation = [uuidValidation()];

export const deleteTeacherValidation = [uuidValidation()];

export const createTeacherValidation = [
  emailValidation("email", true),
  body("dateOfBirth").isString().withMessage("invalidDateOfBirth"),
  body("personalId")
    .isString()
    .trim()
    .notEmpty()
    .withMessage("invalidPersonalId")
    .isLength({ min: 9, max: 20 })
    .withMessage("personalIdLength"),
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

export const updateTeacherValidation = [
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

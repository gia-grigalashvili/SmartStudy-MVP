import {
  uniqueFieldValidation,
  uuidValidation,
  validateTranslations,
} from "@/validations/shared";
import { body } from "express-validator";

export const fetchSubjectValidation = [uuidValidation()];

export const deleteSubjectValidation = [uuidValidation()];

export const createSubjectValidation = [
  body("code").isString().withMessage("invalidCode"),
  uniqueFieldValidation("subject", "code"),
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

export const updateSubjectValidation = [
  uuidValidation(),
  ...createSubjectValidation,
];

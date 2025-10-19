import {
  existanceValidation,
  relationArrayValidation,
  uuidValidation,
} from "@/validations/shared";
import { body } from "express-validator";

export const fetchGroupValidation = [uuidValidation()];

export const deleteGroupValidation = [uuidValidation()];

export const createGroupValidation = [
  body("code").isString().withMessage("invalidCode"),
  existanceValidation("group", "code"),
  body("semester").isInt().withMessage("invalidSemester"),
  body("academicYearId").isUUID().withMessage("invalidAcademicYearId"),
  relationArrayValidation("subjects", "subject", { min: 1 }),
  body("teacherId").isUUID().withMessage("invalidTeacherId"),
  body("academicCalendarId")
    .optional()
    .isUUID()
    .withMessage("invalidAcademicCalendarId"),
];

export const updateGroupValidation = [
  uuidValidation(),
  ...createGroupValidation,
];

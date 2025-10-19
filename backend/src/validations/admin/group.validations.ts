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
  body("year").isString().withMessage("invalidYear"),
  existanceValidation("group", "code"),
  body("semester").isInt().withMessage("invalidSemester"),
  body("subjects").isArray().withMessage("invalidSubjects"),
  body("teacherId").isUUID().withMessage("invalidTeacherId"),
  body("academicCalendarId").isUUID().withMessage("invalidAcademicCalendarId"),
];

export const updateGroupValidation = [
  uuidValidation(),
  ...createGroupValidation,
];

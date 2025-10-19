import { uuidValidation } from "@/validations/shared";
import { body } from "express-validator";

export const fetchAcademicCalendarValidation = [uuidValidation()];

export const deleteAcademicCalendarValidation = [uuidValidation()];

export const createAcademicCalendarValidation = [
  body("year").isString().withMessage("invalidYear"),
  body("semester").isInt().withMessage("invalidSemester"),
  body("startDate").isString().withMessage("invalidStartDate"),
  body("endDate").isString().withMessage("invalidEndDate"),
];

export const updateAcademicCalendarValidation = [
  uuidValidation(),
  ...createAcademicCalendarValidation,
];

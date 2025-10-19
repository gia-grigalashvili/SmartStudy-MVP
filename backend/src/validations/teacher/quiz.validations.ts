import { body } from "express-validator";
import { uuidValidation } from "@/validations/shared";

export const fetchQuizValidation = [uuidValidation()];

export const createQuizValidation = [
  body("date").isISO8601().withMessage("invalidDate"),
  body("groupId").isUUID().withMessage("invalidGroupId"),
  body("subjectId").isUUID().withMessage("invalidSubjectId"),
  body("title").isString().notEmpty().withMessage("invalidTitle"),
];

export const updateQuizValidation = [uuidValidation(), ...createQuizValidation];

export const createQuizResultValidation = [
  body("quizId").isUUID().withMessage("invalidQuizId"),
  body("studentId").isUUID().withMessage("invalidStudentId"),
  body("score").isInt({ min: 0, max: 100 }).withMessage("invalidScore"),
];

export const updateQuizResultValidation = [
  uuidValidation(),
  ...createQuizResultValidation,
];

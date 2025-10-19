import { z } from "zod";
import { TFunction } from "i18next";

export const studentSchema = (
  t: TFunction<"translation", undefined>,
  isUpdate = false
) =>
  z.object({
    email: z.string().email({
      message: t("admin.students.errors.emailInvalid", "Invalid Email")
    }),
    dateOfBirth: z.string().min(1, {
      message: t(
        "admin.students.errors.dateOfBirthRequired",
        "Date of Birth Required"
      )
    }),
    personalId: z
      .string()
      .min(9, {
        message: t(
          "admin.students.errors.personalIdLength",
          "Personal ID must be at least 9 characters"
        )
      })
      .max(20, {
        message: t(
          "admin.students.errors.personalIdLength",
          "Personal ID must be at most 20 characters"
        )
      }),
    class: z
      .number()
      .int({
        message: t(
          "admin.students.errors.classInvalid",
          "Class must be an integer"
        )
      })
      .optional(),
    password: isUpdate
      ? z.string().optional()
      : z.string().min(1, {
          message: t(
            "admin.students.errors.passwordRequired",
            "Password Required"
          )
        }),
    translations: z.object({
      en: z.object({
        firstName: z.string().min(1, {
          message: t(
            "admin.students.errors.firstNameRequired",
            "First Name Required"
          )
        }),
        lastName: z.string().min(1, {
          message: t(
            "admin.students.errors.lastNameRequired",
            "Last Name Required"
          )
        }),
        fullName: z.string().optional()
      }),
      ka: z.object({
        firstName: z.string().min(1, {
          message: t(
            "admin.students.errors.firstNameRequired",
            "First Name Required"
          )
        }),
        lastName: z.string().min(1, {
          message: t(
            "admin.students.errors.lastNameRequired",
            "Last Name Required"
          )
        }),
        fullName: z.string().optional()
      })
    })
  });

export type StudentFormValues = z.infer<ReturnType<typeof studentSchema>>;

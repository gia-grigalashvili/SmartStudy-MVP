import { z } from "zod";
import { TFunction } from "i18next";

export const subjectSchema = (t: TFunction<"translation", undefined>) =>
  z.object({
    code: z.string().min(1, {
      message: t("admin.subjects.errors.codeRequired", "Code Required")
    }),
    translations: z.object({
      en: z.object({
        firstName: z.string().min(1, {
          message: t(
            "admin.subjects.errors.firstNameRequired",
            "First Name Required"
          )
        }),
        lastName: z.string().min(1, {
          message: t(
            "admin.subjects.errors.lastNameRequired",
            "Last Name Required"
          )
        }),
        fullName: z.string().optional()
      }),
      ka: z.object({
        firstName: z.string().min(1, {
          message: t(
            "admin.subjects.errors.firstNameRequired",
            "First Name Required"
          )
        }),
        lastName: z.string().min(1, {
          message: t(
            "admin.subjects.errors.lastNameRequired",
            "Last Name Required"
          )
        }),
        fullName: z.string().optional()
      })
    })
  });

export type SubjectFormValues = z.infer<ReturnType<typeof subjectSchema>>;

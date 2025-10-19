import { z } from "zod";
import { TFunction } from "i18next";

export const teacherSubjectSchema = (t: TFunction<"translation", undefined>) =>
  z.object({
    subjectId: z.string().uuid({
      message: t(
        "admin.teacherSubjects.errors.subjectRequired",
        "Subject Required"
      )
    }),
    translations: z.object({
      en: z.object({
        firstName: z.string().min(1, {
          message: t(
            "admin.teacherSubjects.errors.firstNameRequired",
            "First Name Required"
          )
        }),
        lastName: z.string().min(1, {
          message: t(
            "admin.teacherSubjects.errors.lastNameRequired",
            "Last Name Required"
          )
        }),
        fullName: z.string().optional()
      }),
      ka: z.object({
        firstName: z.string().min(1, {
          message: t(
            "admin.teacherSubjects.errors.firstNameRequired",
            "First Name Required"
          )
        }),
        lastName: z.string().min(1, {
          message: t(
            "admin.teacherSubjects.errors.lastNameRequired",
            "Last Name Required"
          )
        }),
        fullName: z.string().optional()
      })
    })
  });

export type TeacherSubjectFormValues = z.infer<
  ReturnType<typeof teacherSubjectSchema>
>;

import { z } from "zod";
import { TFunction } from "i18next";

export const groupSchema = (t: TFunction<"translation", undefined>) =>
  z.object({
    code: z.string().min(1, {
      message: t("admin.groups.errors.codeRequired", "Code Required")
    }),
    year: z.string().min(1, {
      message: t("admin.groups.errors.yearRequired", "Year Required")
    }),
    semester: z.number().int({
      message: t("admin.groups.errors.semesterRequired", "Semester Required")
    }),
    subjects: z
      .array(
        z.string().uuid({
          message: t("admin.groups.errors.subjectRequired", "Subject Required")
        })
      )
      .min(1, {
        message: t(
          "admin.groups.errors.subjectRequired",
          "At least one subject required"
        )
      }),
    teacherId: z.string().uuid({
      message: t("admin.groups.errors.teacherRequired", "Teacher Required")
    }),
    academicCalendarId: z.string().uuid({
      message: t(
        "admin.groups.errors.academicCalendarRequired",
        "Academic Calendar Required"
      )
    })
  });

export type GroupFormValues = z.infer<ReturnType<typeof groupSchema>>;

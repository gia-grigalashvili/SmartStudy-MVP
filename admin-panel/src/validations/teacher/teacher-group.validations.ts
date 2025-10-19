import { z } from "zod";
import { TFunction } from "i18next";

export const teacherGroupSchema = (t: TFunction<"translation", undefined>) =>
  z.object({
    teacherId: z.string().uuid({
      message: t(
        "admin.teacherGroups.errors.teacherRequired",
        "Teacher Required"
      )
    }),
    assignedGroups: z
      .array(
        z.string().uuid({
          message: t(
            "admin.teacherGroups.errors.groupRequired",
            "Group Required"
          )
        })
      )
      .min(1, {
        message: t(
          "admin.teacherGroups.errors.groupRequired",
          "At least one group required"
        )
      }),
    assignedSubjects: z
      .array(
        z.string().uuid({
          message: t(
            "admin.teacherGroups.errors.subjectRequired",
            "Subject Required"
          )
        })
      )
      .min(1, {
        message: t(
          "admin.teacherGroups.errors.subjectRequired",
          "At least one subject required"
        )
      }),
    academicCalendarId: z.string().uuid({
      message: t(
        "admin.teacherGroups.errors.academicCalendarRequired",
        "Academic Calendar Required"
      )
    })
  });

export type TeacherGroupFormValues = z.infer<
  ReturnType<typeof teacherGroupSchema>
>;

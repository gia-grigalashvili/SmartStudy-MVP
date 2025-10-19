import { z } from "zod";
import { TFunction } from "i18next";

export const academicCalendarSchema = (
  t: TFunction<"translation", undefined>
) =>
  z.object({
    year: z.string().min(1, {
      message: t("admin.academicCalendar.errors.yearRequired", "Year Required")
    }),
    semester: z.number().int({
      message: t(
        "admin.academicCalendar.errors.semesterRequired",
        "Semester Required"
      )
    }),
    startDate: z.string().min(1, {
      message: t(
        "admin.academicCalendar.errors.startDateRequired",
        "Start Date Required"
      )
    }),
    endDate: z.string().min(1, {
      message: t(
        "admin.academicCalendar.errors.endDateRequired",
        "End Date Required"
      )
    })
  });

export type AcademicCalendarFormValues = z.infer<
  ReturnType<typeof academicCalendarSchema>
>;

// teacher.validations.ts
import { z } from "zod";
import { TFunction } from "i18next";

/* ------------------ Academic Calendar ------------------ */
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

/* ------------------ Group ------------------ */
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

/* ------------------ Student ------------------ */
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

/* ------------------ Subject ------------------ */
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

/* ------------------ Teacher ------------------ */
export const teacherSchema = (
  t: TFunction<"translation", undefined>,
  isUpdate = false
) =>
  z.object({
    email: z.string().email({
      message: t("admin.teachers.errors.emailInvalid", "Invalid Email")
    }),
    dateOfBirth: z.string().min(1, {
      message: t(
        "admin.teachers.errors.dateOfBirthRequired",
        "Date of Birth Required"
      )
    }),
    personalId: z
      .string()
      .min(9, {
        message: t(
          "admin.teachers.errors.personalIdLength",
          "Personal ID must be at least 9 characters"
        )
      })
      .max(20, {
        message: t(
          "admin.teachers.errors.personalIdLength",
          "Personal ID must be at most 20 characters"
        )
      }),
    password: isUpdate
      ? z.string().optional()
      : z.string().min(1, {
          message: t(
            "admin.teachers.errors.passwordRequired",
            "Password Required"
          )
        }),
    translations: z.object({
      en: z.object({
        firstName: z.string().min(1, {
          message: t(
            "admin.teachers.errors.firstNameRequired",
            "First Name Required"
          )
        }),
        lastName: z.string().min(1, {
          message: t(
            "admin.teachers.errors.lastNameRequired",
            "Last Name Required"
          )
        }),
        fullName: z.string().optional()
      }),
      ka: z.object({
        firstName: z.string().min(1, {
          message: t(
            "admin.teachers.errors.firstNameRequired",
            "First Name Required"
          )
        }),
        lastName: z.string().min(1, {
          message: t(
            "admin.teachers.errors.lastNameRequired",
            "Last Name Required"
          )
        }),
        fullName: z.string().optional()
      })
    })
  });

export type TeacherFormValues = z.infer<ReturnType<typeof teacherSchema>>;

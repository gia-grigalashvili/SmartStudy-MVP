import { getEnvVariable } from "@/config";
import { Prisma, PrismaClient } from "@prisma/client";
import * as bcrypt from "bcrypt";

const users: Prisma.AdminCreateInput[] = [
  {
    email: getEnvVariable("EMAIL"),
    passwordHash: bcrypt.hashSync(
      getEnvVariable("ADMIN_PASSWORD"),
      +getEnvVariable("SALT_ROUNDS")
    ),
    translations: {
      create: [
        {
          firstName: "Beka",
          lastName: "Chaduneli",
          language: {
            connect: { code: "en" },
          },
        },
        {
          firstName: "ბექა",
          lastName: "ჩადუნელი",
          language: {
            connect: { code: "ka" },
          },
        },
      ],
    },
  },
];
const students: Prisma.StudentCreateInput[] = [
  {
    email: getEnvVariable("EMAIL"),
    passwordHash: bcrypt.hashSync(
      getEnvVariable("STUDENT_PASSWORD"),
      +getEnvVariable("SALT_ROUNDS")
    ),
    dateOfBirth: new Date("2005-05-15"),
    class: 10,
    personalId: "STU123456",
    age: 18,
    translations: {
      create: [
        {
          firstName: "Beka",
          lastName: "Chaduneli",
          fullName: "Beka Chaduneli",
          language: {
            connect: { code: "en" },
          },
        },
        {
          firstName: "ბექა",
          lastName: "ჩადუნელი",
          fullName: "ბექა ჩადუნელი",
          language: {
            connect: { code: "ka" },
          },
        },
      ],
    },
  },
];

const teachers: Prisma.TeacherCreateInput[] = [
  {
    email: getEnvVariable("EMAIL"),
    passwordHash: bcrypt.hashSync(
      getEnvVariable("TEACHER_PASSWORD"),
      +getEnvVariable("SALT_ROUNDS")
    ),
    personalId: "STU123456",
    age: 18,
    dateOfBirth: new Date("2005-05-15"),
    translations: {
      create: [
        {
          firstName: "Beka",
          lastName: "Chaduneli",
          fullName: "Beka Chaduneli",
          language: {
            connect: { code: "en" },
          },
        },
        {
          firstName: "ბექა",
          lastName: "ჩადუნელი",
          fullName: "ბექა ჩადუნელი",
          language: {
            connect: { code: "ka" },
          },
        },
      ],
    },
  },
];

export const seedUsers = async (prisma: PrismaClient) => {
  for (const user of users) {
    await prisma.admin.create({
      data: user,
    });
  }
};

export const seedStudents = async (prisma: PrismaClient) => {
  for (const student of students) {
    await prisma.student.create({
      data: student,
    });
  }
};

export const seedTeachers = async (prisma: PrismaClient) => {
  for (const teacher of teachers) {
    await prisma.teacher.create({
      data: teacher,
    });
  }
};

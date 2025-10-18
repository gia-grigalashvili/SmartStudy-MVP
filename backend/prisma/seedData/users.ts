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

export const seedUsers = async (prisma: PrismaClient) => {
  await prisma.admin.createMany({
    data: users,
    skipDuplicates: true,
  });
};

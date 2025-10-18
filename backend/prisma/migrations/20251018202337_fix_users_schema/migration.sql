/*
  Warnings:

  - You are about to drop the column `firstName` on the `students` table. All the data in the column will be lost.
  - You are about to drop the column `fullName` on the `students` table. All the data in the column will be lost.
  - You are about to drop the column `lastName` on the `students` table. All the data in the column will be lost.
  - You are about to drop the `pending_students` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `pending_teachers` table. If the table is not empty, all the data it contains will be lost.

*/
-- AlterTable
ALTER TABLE "students" DROP COLUMN "firstName",
DROP COLUMN "fullName",
DROP COLUMN "lastName";

-- DropTable
DROP TABLE "pending_students";

-- DropTable
DROP TABLE "pending_teachers";

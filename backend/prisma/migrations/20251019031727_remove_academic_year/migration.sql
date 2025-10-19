/*
  Warnings:

  - You are about to drop the column `academicYearId` on the `academic_calendars` table. All the data in the column will be lost.
  - You are about to drop the column `academicYearId` on the `groups` table. All the data in the column will be lost.
  - You are about to drop the `academic_years` table. If the table is not empty, all the data it contains will be lost.
  - Added the required column `year` to the `groups` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "academic_calendars" DROP CONSTRAINT "academic_calendars_academicYearId_fkey";

-- DropForeignKey
ALTER TABLE "groups" DROP CONSTRAINT "groups_academicYearId_fkey";

-- AlterTable
ALTER TABLE "academic_calendars" DROP COLUMN "academicYearId";

-- AlterTable
ALTER TABLE "groups" DROP COLUMN "academicYearId",
ADD COLUMN     "year" TEXT NOT NULL;

-- DropTable
DROP TABLE "academic_years";

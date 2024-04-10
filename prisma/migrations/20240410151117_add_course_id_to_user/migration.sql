/*
  Warnings:

  - You are about to drop the column `courseId` on the `User` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[CourseId]` on the table `User` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `CourseId` to the `User` table without a default value. This is not possible if the table is not empty.

*/
-- CreateEnum
CREATE TYPE "Role" AS ENUM ('USER', 'ADMIN', 'STUDENT', 'TEACHER', 'SUPER_ADMIN');

-- DropForeignKey
ALTER TABLE "User" DROP CONSTRAINT "User_courseId_fkey";

-- AlterTable
ALTER TABLE "Course" ALTER COLUMN "price" SET DATA TYPE TEXT,
ALTER COLUMN "rating" SET DATA TYPE TEXT,
ALTER COLUMN "createdAt" SET DEFAULT CURRENT_TIMESTAMP;

-- AlterTable
ALTER TABLE "User" DROP COLUMN "courseId",
ADD COLUMN     "CourseId" INTEGER NOT NULL,
ADD COLUMN     "role" "Role" NOT NULL DEFAULT 'USER';

-- CreateIndex
CREATE UNIQUE INDEX "User_CourseId_key" ON "User"("CourseId");

-- AddForeignKey
ALTER TABLE "User" ADD CONSTRAINT "User_CourseId_fkey" FOREIGN KEY ("CourseId") REFERENCES "Course"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

/*
  Warnings:

  - You are about to drop the column `authorId` on the `Videos` table. All the data in the column will be lost.
  - Added the required column `authorEmail` to the `Videos` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "Videos" DROP CONSTRAINT "Videos_authorId_fkey";

-- AlterTable
ALTER TABLE "Videos" DROP COLUMN "authorId",
ADD COLUMN     "authorEmail" TEXT NOT NULL;

-- AddForeignKey
ALTER TABLE "Videos" ADD CONSTRAINT "Videos_authorEmail_fkey" FOREIGN KEY ("authorEmail") REFERENCES "Users"("email") ON DELETE RESTRICT ON UPDATE CASCADE;

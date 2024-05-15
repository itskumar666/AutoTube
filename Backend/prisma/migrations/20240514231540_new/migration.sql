/*
  Warnings:

  - You are about to drop the column `content` on the `Videos` table. All the data in the column will be lost.
  - You are about to drop the column `title` on the `Videos` table. All the data in the column will be lost.
  - Added the required column `url` to the `Videos` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Videos" DROP COLUMN "content",
DROP COLUMN "title",
ADD COLUMN     "Size" BYTEA,
ADD COLUMN     "url" TEXT NOT NULL;

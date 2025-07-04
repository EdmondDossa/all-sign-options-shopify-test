/*
  Warnings:

  - You are about to drop the column `zipfile` on the `Design` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Design" DROP COLUMN "zipfile",
ADD COLUMN     "zipFile" TEXT;

/*
  Warnings:

  - You are about to drop the column `files` on the `Design` table. All the data in the column will be lost.
  - The `zipFile` column on the `Design` table would be dropped and recreated. This will lead to data loss if there is data in the column.

*/
-- AlterTable
ALTER TABLE "Design" DROP COLUMN "files",
ADD COLUMN     "fileName" TEXT,
ADD COLUMN     "fileSize" INTEGER,
ADD COLUMN     "fileType" TEXT,
ADD COLUMN     "fileUrl" TEXT,
ADD COLUMN     "storage" TEXT,
DROP COLUMN "zipFile",
ADD COLUMN     "zipFile" JSONB;

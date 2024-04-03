/*
  Warnings:

  - The `textColor` column on the `Color` table would be dropped and recreated. This will lead to data loss if there is data in the column.

*/
-- AlterTable
ALTER TABLE "Color" DROP COLUMN "textColor",
ADD COLUMN     "textColor" JSONB;

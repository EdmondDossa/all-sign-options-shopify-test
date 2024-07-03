/*
  Warnings:

  - You are about to drop the column `image` on the `Template` table. All the data in the column will be lost.
  - Added the required column `prevImg` to the `Template` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "Template" DROP CONSTRAINT "Template_categoryId_fkey";

-- AlterTable
ALTER TABLE "Template" DROP COLUMN "image",
ADD COLUMN     "enabledAddToCart" BOOLEAN NOT NULL DEFAULT false,
ADD COLUMN     "prevImg" TEXT NOT NULL,
ALTER COLUMN "categoryId" DROP NOT NULL;

-- AddForeignKey
ALTER TABLE "Template" ADD CONSTRAINT "Template_categoryId_fkey" FOREIGN KEY ("categoryId") REFERENCES "Category"("id") ON DELETE SET NULL ON UPDATE CASCADE;

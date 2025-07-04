/*
  Warnings:

  - You are about to drop the column `customerId` on the `Design` table. All the data in the column will be lost.
  - The `productId` column on the `Design` table would be dropped and recreated. This will lead to data loss if there is data in the column.
  - The `configId` column on the `Design` table would be dropped and recreated. This will lead to data loss if there is data in the column.
  - The `variantId` column on the `Design` table would be dropped and recreated. This will lead to data loss if there is data in the column.

*/
-- AlterTable
ALTER TABLE "Design" DROP COLUMN "customerId",
ADD COLUMN     "customerIp" TEXT,
ADD COLUMN     "orderId" TEXT,
DROP COLUMN "productId",
ADD COLUMN     "productId" INTEGER,
DROP COLUMN "configId",
ADD COLUMN     "configId" INTEGER,
DROP COLUMN "variantId",
ADD COLUMN     "variantId" INTEGER;

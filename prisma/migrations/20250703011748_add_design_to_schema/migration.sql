/*
  Warnings:

  - You are about to drop the `MaterialDiscount` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "MaterialDiscount" DROP CONSTRAINT "MaterialDiscount_configId_fkey";

-- DropForeignKey
ALTER TABLE "MaterialDiscount" DROP CONSTRAINT "MaterialDiscount_sessionId_fkey";

-- DropTable
DROP TABLE "MaterialDiscount";

-- CreateTable
CREATE TABLE "Design" (
    "id" SERIAL NOT NULL,
    "customerId" TEXT,
    "productId" TEXT,
    "configId" TEXT,
    "variantId" TEXT,
    "sessionId" TEXT NOT NULL,
    "files" JSONB,

    CONSTRAINT "Design_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "Design" ADD CONSTRAINT "Design_sessionId_fkey" FOREIGN KEY ("sessionId") REFERENCES "Session"("id") ON DELETE CASCADE ON UPDATE CASCADE;

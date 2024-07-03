/*
  Warnings:

  - You are about to drop the column `cliparts` on the `ClipartsGroup` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "ClipartsGroup" DROP COLUMN "cliparts";

-- CreateTable
CREATE TABLE "Clipart" (
    "id" SERIAL NOT NULL,
    "title" TEXT NOT NULL,
    "url" TEXT NOT NULL,
    "additionalPrice" DOUBLE PRECISION NOT NULL,
    "clipartsGroupId" INTEGER NOT NULL,

    CONSTRAINT "Clipart_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "Clipart" ADD CONSTRAINT "Clipart_clipartsGroupId_fkey" FOREIGN KEY ("clipartsGroupId") REFERENCES "ClipartsGroup"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

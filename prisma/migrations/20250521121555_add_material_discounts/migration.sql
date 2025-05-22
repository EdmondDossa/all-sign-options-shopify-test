-- CreateTable
CREATE TABLE "MaterialDiscount" (
    "id" SERIAL NOT NULL,
    "quantity" INTEGER NOT NULL,
    "discountPercentage" DOUBLE PRECISION NOT NULL,
    "configId" INTEGER NOT NULL,
    "sessionId" TEXT NOT NULL,
    "materialId" INTEGER NOT NULL,

    CONSTRAINT "MaterialDiscount_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "MaterialDiscount_configId_sessionId_materialId_quantity_key" ON "MaterialDiscount"("configId", "sessionId", "materialId", "quantity");

-- AddForeignKey
ALTER TABLE "MaterialDiscount" ADD CONSTRAINT "MaterialDiscount_sessionId_fkey" FOREIGN KEY ("sessionId") REFERENCES "Session"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "MaterialDiscount" ADD CONSTRAINT "MaterialDiscount_configId_fkey" FOREIGN KEY ("configId") REFERENCES "Configuration"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- CreateTable
CREATE TABLE "TemplatePack" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "slug" TEXT NOT NULL,
    "description" TEXT,
    "category" TEXT NOT NULL,
    "price" DOUBLE PRECISION NOT NULL,
    "jsonFile" TEXT NOT NULL,
    "previewImg" TEXT NOT NULL,
    "icon" TEXT,
    "isActive" BOOLEAN NOT NULL DEFAULT true,
    "order" INTEGER NOT NULL DEFAULT 0,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "TemplatePack_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "ShopTemplatePack" (
    "id" SERIAL NOT NULL,
    "sessionId" TEXT NOT NULL,
    "packId" INTEGER NOT NULL,
    "purchasedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "purchasePrice" DOUBLE PRECISION NOT NULL,
    "isActive" BOOLEAN NOT NULL DEFAULT true,

    CONSTRAINT "ShopTemplatePack_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "TemplatePack_slug_key" ON "TemplatePack"("slug");

-- CreateIndex
CREATE INDEX "TemplatePack_slug_idx" ON "TemplatePack"("slug");

-- CreateIndex
CREATE INDEX "TemplatePack_isActive_idx" ON "TemplatePack"("isActive");

-- CreateIndex
CREATE INDEX "ShopTemplatePack_sessionId_idx" ON "ShopTemplatePack"("sessionId");

-- CreateIndex
CREATE INDEX "ShopTemplatePack_packId_idx" ON "ShopTemplatePack"("packId");

-- CreateIndex
CREATE UNIQUE INDEX "ShopTemplatePack_sessionId_packId_key" ON "ShopTemplatePack"("sessionId", "packId");

-- AddForeignKey
ALTER TABLE "ShopTemplatePack" ADD CONSTRAINT "ShopTemplatePack_sessionId_fkey" FOREIGN KEY ("sessionId") REFERENCES "Session"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ShopTemplatePack" ADD CONSTRAINT "ShopTemplatePack_packId_fkey" FOREIGN KEY ("packId") REFERENCES "TemplatePack"("id") ON DELETE CASCADE ON UPDATE CASCADE;

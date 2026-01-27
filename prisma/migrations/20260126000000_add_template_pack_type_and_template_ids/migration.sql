-- CreateEnum
CREATE TYPE "TemplatePackType" AS ENUM ('PACK', 'TEMPLATE');

-- AlterTable
ALTER TABLE "TemplatePack" ADD COLUMN "type" "TemplatePackType" NOT NULL DEFAULT 'PACK';
ALTER TABLE "TemplatePack" ADD COLUMN "templateIds" JSONB;

-- CreateIndex
CREATE INDEX "TemplatePack_type_idx" ON "TemplatePack"("type");

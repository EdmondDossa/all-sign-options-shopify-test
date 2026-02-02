-- DropIndex
DROP INDEX IF EXISTS "TemplatePack_type_idx";

-- AlterTable
ALTER TABLE "TemplatePack" DROP COLUMN IF EXISTS "type";
ALTER TABLE "TemplatePack" DROP COLUMN IF EXISTS "templateIds";

-- DropEnum
DROP TYPE IF EXISTS "TemplatePackType";

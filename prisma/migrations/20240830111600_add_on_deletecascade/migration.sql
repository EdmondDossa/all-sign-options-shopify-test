-- DropForeignKey
ALTER TABLE "Category" DROP CONSTRAINT "Category_sessionId_fkey";

-- DropForeignKey
ALTER TABLE "Clipart" DROP CONSTRAINT "Clipart_clipartsGroupId_fkey";

-- DropForeignKey
ALTER TABLE "ClipartsGroup" DROP CONSTRAINT "ClipartsGroup_sessionId_fkey";

-- DropForeignKey
ALTER TABLE "Configuration" DROP CONSTRAINT "Configuration_sessionId_fkey";

-- DropForeignKey
ALTER TABLE "Font" DROP CONSTRAINT "Font_sessionId_fkey";

-- DropForeignKey
ALTER TABLE "Setting" DROP CONSTRAINT "Setting_sessionId_fkey";

-- DropForeignKey
ALTER TABLE "Template" DROP CONSTRAINT "Template_categoryId_fkey";

-- DropForeignKey
ALTER TABLE "Template" DROP CONSTRAINT "Template_configurationId_fkey";

-- AddForeignKey
ALTER TABLE "Configuration" ADD CONSTRAINT "Configuration_sessionId_fkey" FOREIGN KEY ("sessionId") REFERENCES "Session"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Font" ADD CONSTRAINT "Font_sessionId_fkey" FOREIGN KEY ("sessionId") REFERENCES "Session"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ClipartsGroup" ADD CONSTRAINT "ClipartsGroup_sessionId_fkey" FOREIGN KEY ("sessionId") REFERENCES "Session"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Clipart" ADD CONSTRAINT "Clipart_clipartsGroupId_fkey" FOREIGN KEY ("clipartsGroupId") REFERENCES "ClipartsGroup"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Setting" ADD CONSTRAINT "Setting_sessionId_fkey" FOREIGN KEY ("sessionId") REFERENCES "Session"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Category" ADD CONSTRAINT "Category_sessionId_fkey" FOREIGN KEY ("sessionId") REFERENCES "Session"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Template" ADD CONSTRAINT "Template_configurationId_fkey" FOREIGN KEY ("configurationId") REFERENCES "Configuration"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Template" ADD CONSTRAINT "Template_categoryId_fkey" FOREIGN KEY ("categoryId") REFERENCES "Category"("id") ON DELETE CASCADE ON UPDATE CASCADE;

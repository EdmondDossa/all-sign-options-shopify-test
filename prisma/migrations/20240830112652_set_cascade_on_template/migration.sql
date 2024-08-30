-- DropForeignKey
ALTER TABLE "Template" DROP CONSTRAINT "Template_sessionId_fkey";

-- AddForeignKey
ALTER TABLE "Template" ADD CONSTRAINT "Template_sessionId_fkey" FOREIGN KEY ("sessionId") REFERENCES "Session"("id") ON DELETE CASCADE ON UPDATE CASCADE;

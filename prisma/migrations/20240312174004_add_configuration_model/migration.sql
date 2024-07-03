-- CreateTable
CREATE TABLE "Configuration" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "description" TEXT,
    "icon" TEXT NOT NULL,
    "popupImg" TEXT NOT NULL,
    "sessionId" TEXT NOT NULL,
    "data" JSONB,

    CONSTRAINT "Configuration_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "Configuration" ADD CONSTRAINT "Configuration_sessionId_fkey" FOREIGN KEY ("sessionId") REFERENCES "Session"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

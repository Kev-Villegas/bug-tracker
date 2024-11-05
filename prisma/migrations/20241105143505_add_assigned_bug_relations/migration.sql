-- AlterTable
ALTER TABLE "Bug" ADD COLUMN     "assignedToUserId" VARCHAR(255);

-- AddForeignKey
ALTER TABLE "Bug" ADD CONSTRAINT "Bug_assignedToUserId_fkey" FOREIGN KEY ("assignedToUserId") REFERENCES "users"("id") ON DELETE SET NULL ON UPDATE CASCADE;

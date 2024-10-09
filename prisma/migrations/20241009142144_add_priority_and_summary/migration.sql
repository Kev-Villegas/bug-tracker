/*
  Warnings:

  - You are about to alter the column `description` on the `Bug` table. The data in that column could be lost. The data in that column will be cast from `Text` to `VarChar(1000)`.

*/
-- CreateEnum
CREATE TYPE "Priority" AS ENUM ('LOW', 'MEDIUM', 'HIGH');

-- AlterTable
ALTER TABLE "Bug" ADD COLUMN     "priority" "Priority" NOT NULL DEFAULT 'LOW',
ADD COLUMN     "summary" VARCHAR(255) NOT NULL DEFAULT '',
ALTER COLUMN "description" SET DATA TYPE VARCHAR(1000);

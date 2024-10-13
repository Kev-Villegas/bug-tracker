/*
  Warnings:

  - You are about to alter the column `title` on the `Bug` table. The data in that column could be lost. The data in that column will be cast from `VarChar(255)` to `VarChar(50)`.
  - You are about to alter the column `summary` on the `Bug` table. The data in that column could be lost. The data in that column will be cast from `VarChar(255)` to `VarChar(50)`.

*/
-- AlterTable
ALTER TABLE "Bug" ALTER COLUMN "title" SET DATA TYPE VARCHAR(50),
ALTER COLUMN "summary" SET DATA TYPE VARCHAR(50);

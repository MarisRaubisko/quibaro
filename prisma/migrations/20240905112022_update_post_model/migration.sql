/*
  Warnings:

  - You are about to drop the column `generationModel` on the `Post` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Post" DROP COLUMN "generationModel",
ADD COLUMN     "model" TEXT,
ADD COLUMN     "size" TEXT;

-- AlterTable
ALTER TABLE "Post" ADD COLUMN     "generationType" TEXT,
ALTER COLUMN "prompt" DROP NOT NULL;

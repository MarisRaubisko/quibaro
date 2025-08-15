-- AlterTable
ALTER TABLE "Post" ADD COLUMN     "generationModel" TEXT,
ADD COLUMN     "quality" TEXT,
ADD COLUMN     "shared" BOOLEAN NOT NULL DEFAULT false,
ADD COLUMN     "style" TEXT;

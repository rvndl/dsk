/*
  Warnings:

  - You are about to drop the column `shared` on the `Share` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Share" DROP COLUMN "shared",
ADD COLUMN     "active" BOOLEAN NOT NULL DEFAULT false,
ADD COLUMN     "permanent" BOOLEAN NOT NULL DEFAULT false;

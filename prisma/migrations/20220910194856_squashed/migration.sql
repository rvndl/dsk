/*
  Warnings:

  - You are about to drop the column `active` on the `Share` table. All the data in the column will be lost.
  - You are about to drop the column `shares` on the `Share` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Share" DROP COLUMN "active",
DROP COLUMN "shares",
ADD COLUMN     "downloadLimit" INTEGER NOT NULL DEFAULT -1;

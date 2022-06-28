/*
  Warnings:

  - The primary key for the `Share` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `id` on the `Share` table. All the data in the column will be lost.
  - You are about to drop the column `sharesRemaining` on the `Share` table. All the data in the column will be lost.
  - The required column `slug` was added to the `Share` table with a prisma-level default value. This is not possible if the table is not empty. Please add this column as optional, then populate it before making it required.

*/
-- AlterTable
ALTER TABLE "Share" DROP CONSTRAINT "Share_pkey",
DROP COLUMN "id",
DROP COLUMN "sharesRemaining",
ADD COLUMN     "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
ADD COLUMN     "shares" INTEGER NOT NULL DEFAULT 0,
ADD COLUMN     "slug" TEXT NOT NULL,
ADD CONSTRAINT "Share_pkey" PRIMARY KEY ("slug");

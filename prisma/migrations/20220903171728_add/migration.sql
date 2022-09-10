/*
  Warnings:

  - The primary key for the `Share` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `createdAt` on the `Share` table. All the data in the column will be lost.
  - You are about to drop the column `name` on the `Share` table. All the data in the column will be lost.
  - You are about to drop the column `path` on the `Share` table. All the data in the column will be lost.
  - You are about to drop the column `slug` on the `Share` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[fileInode]` on the table `Share` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `fileInode` to the `Share` table without a default value. This is not possible if the table is not empty.
  - The required column `id` was added to the `Share` table with a prisma-level default value. This is not possible if the table is not empty. Please add this column as optional, then populate it before making it required.

*/
-- AlterTable
ALTER TABLE "Share" DROP CONSTRAINT "Share_pkey",
DROP COLUMN "createdAt",
DROP COLUMN "name",
DROP COLUMN "path",
DROP COLUMN "slug",
ADD COLUMN     "fileInode" TEXT NOT NULL,
ADD COLUMN     "id" TEXT NOT NULL,
ADD CONSTRAINT "Share_pkey" PRIMARY KEY ("id");

-- CreateTable
CREATE TABLE "File" (
    "id" TEXT NOT NULL,
    "inode" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "size" INTEGER NOT NULL,
    "path" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "File_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "File_inode_key" ON "File"("inode");

-- CreateIndex
CREATE UNIQUE INDEX "Share_fileInode_key" ON "Share"("fileInode");

-- AddForeignKey
ALTER TABLE "Share" ADD CONSTRAINT "Share_fileInode_fkey" FOREIGN KEY ("fileInode") REFERENCES "File"("inode") ON DELETE RESTRICT ON UPDATE CASCADE;

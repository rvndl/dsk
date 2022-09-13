-- CreateTable
CREATE TABLE "File" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "inode" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "size" INTEGER NOT NULL,
    "path" TEXT NOT NULL,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP
);

-- CreateTable
CREATE TABLE "Share" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "downloads" INTEGER NOT NULL DEFAULT 0,
    "permanent" BOOLEAN NOT NULL DEFAULT false,
    "downloadLimit" INTEGER NOT NULL DEFAULT -1,
    "expires" DATETIME,
    "fileInode" TEXT NOT NULL,
    CONSTRAINT "Share_fileInode_fkey" FOREIGN KEY ("fileInode") REFERENCES "File" ("inode") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- CreateIndex
CREATE UNIQUE INDEX "File_inode_key" ON "File"("inode");

-- CreateIndex
CREATE UNIQUE INDEX "Share_fileInode_key" ON "Share"("fileInode");

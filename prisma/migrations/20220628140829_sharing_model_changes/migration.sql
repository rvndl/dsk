-- AlterTable
ALTER TABLE "Share" ADD COLUMN     "expires" TIMESTAMP(3),
ALTER COLUMN "shares" DROP NOT NULL;

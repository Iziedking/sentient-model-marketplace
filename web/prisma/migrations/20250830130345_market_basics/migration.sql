/*
  Warnings:

  - You are about to drop the `Usage` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `UserProfile` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the column `tags` on the `ModelListing` table. All the data in the column will be lost.
  - You are about to drop the column `credits` on the `Purchase` table. All the data in the column will be lost.
  - Added the required column `latencyMs` to the `ModelListing` table without a default value. This is not possible if the table is not empty.
  - Added the required column `updatedAt` to the `ModelListing` table without a default value. This is not possible if the table is not empty.
  - Made the column `short` on table `ModelListing` required. This step will fail if there are existing NULL values in that column.
  - Added the required column `priceCents` to the `Purchase` table without a default value. This is not possible if the table is not empty.

*/
-- DropIndex
DROP INDEX "Usage_createdAt_idx";

-- DropIndex
DROP INDEX "Usage_modelId_idx";

-- DropIndex
DROP INDEX "Usage_userId_idx";

-- DropIndex
DROP INDEX "UserProfile_userId_key";

-- DropTable
PRAGMA foreign_keys=off;
DROP TABLE "Usage";
PRAGMA foreign_keys=on;

-- DropTable
PRAGMA foreign_keys=off;
DROP TABLE "UserProfile";
PRAGMA foreign_keys=on;

-- CreateTable
CREATE TABLE "UsageCall" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "userId" TEXT NOT NULL,
    "modelId" TEXT NOT NULL,
    "tokens" INTEGER NOT NULL,
    "costCents" INTEGER NOT NULL,
    CONSTRAINT "UsageCall_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User" ("id") ON DELETE CASCADE ON UPDATE CASCADE,
    CONSTRAINT "UsageCall_modelId_fkey" FOREIGN KEY ("modelId") REFERENCES "ModelListing" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);

-- RedefineTables
PRAGMA defer_foreign_keys=ON;
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_ModelListing" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL,
    "ownerId" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "slug" TEXT NOT NULL,
    "ownerName" TEXT,
    "category" TEXT NOT NULL,
    "tagsCsv" TEXT NOT NULL DEFAULT '',
    "pricePer1k" REAL NOT NULL,
    "latencyMs" INTEGER NOT NULL,
    "rating" REAL NOT NULL DEFAULT 4.0,
    "short" TEXT NOT NULL,
    "storagePath" TEXT,
    "publicUrl" TEXT,
    "totalPurchases" INTEGER NOT NULL DEFAULT 0,
    "totalCalls" INTEGER NOT NULL DEFAULT 0,
    "revenueCents" INTEGER NOT NULL DEFAULT 0,
    CONSTRAINT "ModelListing_ownerId_fkey" FOREIGN KEY ("ownerId") REFERENCES "User" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);
INSERT INTO "new_ModelListing" ("category", "createdAt", "id", "name", "ownerId", "pricePer1k", "publicUrl", "rating", "short", "slug", "storagePath") SELECT "category", "createdAt", "id", "name", "ownerId", "pricePer1k", "publicUrl", "rating", "short", "slug", "storagePath" FROM "ModelListing";
DROP TABLE "ModelListing";
ALTER TABLE "new_ModelListing" RENAME TO "ModelListing";
CREATE UNIQUE INDEX "ModelListing_slug_key" ON "ModelListing"("slug");
CREATE TABLE "new_Purchase" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "userId" TEXT NOT NULL,
    "modelId" TEXT NOT NULL,
    "priceCents" INTEGER NOT NULL,
    CONSTRAINT "Purchase_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User" ("id") ON DELETE CASCADE ON UPDATE CASCADE,
    CONSTRAINT "Purchase_modelId_fkey" FOREIGN KEY ("modelId") REFERENCES "ModelListing" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);
INSERT INTO "new_Purchase" ("createdAt", "id", "modelId", "userId") SELECT "createdAt", "id", "modelId", "userId" FROM "Purchase";
DROP TABLE "Purchase";
ALTER TABLE "new_Purchase" RENAME TO "Purchase";
CREATE TABLE "new_User" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "name" TEXT,
    "email" TEXT,
    "emailVerified" DATETIME,
    "image" TEXT,
    "creditsCents" INTEGER NOT NULL DEFAULT 2500,
    "totalSpentCents" INTEGER NOT NULL DEFAULT 0,
    "totalCalls" INTEGER NOT NULL DEFAULT 0,
    "totalPurchases" INTEGER NOT NULL DEFAULT 0
);
INSERT INTO "new_User" ("email", "emailVerified", "id", "image", "name") SELECT "email", "emailVerified", "id", "image", "name" FROM "User";
DROP TABLE "User";
ALTER TABLE "new_User" RENAME TO "User";
CREATE UNIQUE INDEX "User_email_key" ON "User"("email");
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;

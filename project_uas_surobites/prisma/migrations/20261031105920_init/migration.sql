/*
  Warnings:

  - You are about to drop the `Price` table. If the table is not empty, all the data it contains will be lost.
  - The primary key for the `Faq` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `createdAt` on the `Faq` table. All the data in the column will be lost.
  - You are about to drop the column `sortOrder` on the `Faq` table. All the data in the column will be lost.
  - You are about to drop the column `updatedAt` on the `Faq` table. All the data in the column will be lost.
  - You are about to alter the column `id` on the `Faq` table. The data in that column could be lost. The data in that column will be cast from `String` to `Int`.
  - The primary key for the `Food` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `categories` on the `Food` table. All the data in the column will be lost.
  - You are about to drop the column `createdAt` on the `Food` table. All the data in the column will be lost.
  - You are about to drop the column `ingredients` on the `Food` table. All the data in the column will be lost.
  - You are about to drop the column `priceCategory` on the `Food` table. All the data in the column will be lost.
  - You are about to drop the column `sortOrder` on the `Food` table. All the data in the column will be lost.
  - You are about to drop the column `timeCategory` on the `Food` table. All the data in the column will be lost.
  - You are about to drop the column `updatedAt` on the `Food` table. All the data in the column will be lost.
  - You are about to alter the column `id` on the `Food` table. The data in that column could be lost. The data in that column will be cast from `String` to `Int`.
  - The primary key for the `Warung` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `createdAt` on the `Warung` table. All the data in the column will be lost.
  - You are about to drop the column `foodIds` on the `Warung` table. All the data in the column will be lost.
  - You are about to drop the column `otherMenu` on the `Warung` table. All the data in the column will be lost.
  - You are about to drop the column `sortOrder` on the `Warung` table. All the data in the column will be lost.
  - You are about to drop the column `updatedAt` on the `Warung` table. All the data in the column will be lost.
  - You are about to alter the column `id` on the `Warung` table. The data in that column could be lost. The data in that column will be cast from `String` to `Int`.
  - Added the required column `priceCategoryId` to the `Food` table without a default value. This is not possible if the table is not empty.
  - Added the required column `slug` to the `Food` table without a default value. This is not possible if the table is not empty.
  - Added the required column `slug` to the `Warung` table without a default value. This is not possible if the table is not empty.

*/
-- DropTable
PRAGMA foreign_keys=off;
DROP TABLE "Price";
PRAGMA foreign_keys=on;

-- CreateTable
CREATE TABLE "PriceCategory" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "label" TEXT NOT NULL,
    "hint" TEXT NOT NULL
);

-- CreateTable
CREATE TABLE "Ingredient" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "name" TEXT NOT NULL,
    "foodId" INTEGER NOT NULL,
    CONSTRAINT "Ingredient_foodId_fkey" FOREIGN KEY ("foodId") REFERENCES "Food" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "WarungMenu" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "name" TEXT NOT NULL,
    "warungId" INTEGER NOT NULL,
    CONSTRAINT "WarungMenu_warungId_fkey" FOREIGN KEY ("warungId") REFERENCES "Warung" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "Admin" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "username" TEXT NOT NULL,
    "passwordHash" TEXT NOT NULL
);

-- CreateTable
CREATE TABLE "_CategoryToFood" (
    "A" TEXT NOT NULL,
    "B" INTEGER NOT NULL,
    CONSTRAINT "_CategoryToFood_A_fkey" FOREIGN KEY ("A") REFERENCES "Category" ("id") ON DELETE CASCADE ON UPDATE CASCADE,
    CONSTRAINT "_CategoryToFood_B_fkey" FOREIGN KEY ("B") REFERENCES "Food" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "_FoodToTimeSlot" (
    "A" INTEGER NOT NULL,
    "B" TEXT NOT NULL,
    CONSTRAINT "_FoodToTimeSlot_A_fkey" FOREIGN KEY ("A") REFERENCES "Food" ("id") ON DELETE CASCADE ON UPDATE CASCADE,
    CONSTRAINT "_FoodToTimeSlot_B_fkey" FOREIGN KEY ("B") REFERENCES "TimeSlot" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "_FoodToWarung" (
    "A" INTEGER NOT NULL,
    "B" INTEGER NOT NULL,
    CONSTRAINT "_FoodToWarung_A_fkey" FOREIGN KEY ("A") REFERENCES "Food" ("id") ON DELETE CASCADE ON UPDATE CASCADE,
    CONSTRAINT "_FoodToWarung_B_fkey" FOREIGN KEY ("B") REFERENCES "Warung" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);

-- RedefineTables
PRAGMA defer_foreign_keys=ON;
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Faq" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "question" TEXT NOT NULL,
    "answer" TEXT NOT NULL
);
INSERT INTO "new_Faq" ("answer", "id", "question") SELECT "answer", "id", "question" FROM "Faq";
DROP TABLE "Faq";
ALTER TABLE "new_Faq" RENAME TO "Faq";
CREATE TABLE "new_Food" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "slug" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "image" TEXT NOT NULL,
    "shortDescription" TEXT NOT NULL,
    "story" TEXT NOT NULL,
    "taste" TEXT NOT NULL,
    "priceRange" TEXT NOT NULL,
    "featured" BOOLEAN NOT NULL DEFAULT false,
    "priceCategoryId" TEXT NOT NULL,
    CONSTRAINT "Food_priceCategoryId_fkey" FOREIGN KEY ("priceCategoryId") REFERENCES "PriceCategory" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);
INSERT INTO "new_Food" ("featured", "id", "image", "name", "priceRange", "shortDescription", "story", "taste") SELECT "featured", "id", "image", "name", "priceRange", "shortDescription", "story", "taste" FROM "Food";
DROP TABLE "Food";
ALTER TABLE "new_Food" RENAME TO "Food";
CREATE UNIQUE INDEX "Food_slug_key" ON "Food"("slug");
CREATE TABLE "new_Warung" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "slug" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "address" TEXT NOT NULL,
    "openDays" TEXT NOT NULL,
    "openTime" TEXT NOT NULL,
    "closeTime" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "image" TEXT NOT NULL,
    "mapsUrl" TEXT NOT NULL
);
INSERT INTO "new_Warung" ("address", "closeTime", "description", "id", "image", "mapsUrl", "name", "openDays", "openTime") SELECT "address", "closeTime", "description", "id", "image", "mapsUrl", "name", "openDays", "openTime" FROM "Warung";
DROP TABLE "Warung";
ALTER TABLE "new_Warung" RENAME TO "Warung";
CREATE UNIQUE INDEX "Warung_slug_key" ON "Warung"("slug");
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;

-- CreateIndex
CREATE UNIQUE INDEX "Admin_username_key" ON "Admin"("username");

-- CreateIndex
CREATE UNIQUE INDEX "_CategoryToFood_AB_unique" ON "_CategoryToFood"("A", "B");

-- CreateIndex
CREATE INDEX "_CategoryToFood_B_index" ON "_CategoryToFood"("B");

-- CreateIndex
CREATE UNIQUE INDEX "_FoodToTimeSlot_AB_unique" ON "_FoodToTimeSlot"("A", "B");

-- CreateIndex
CREATE INDEX "_FoodToTimeSlot_B_index" ON "_FoodToTimeSlot"("B");

-- CreateIndex
CREATE UNIQUE INDEX "_FoodToWarung_AB_unique" ON "_FoodToWarung"("A", "B");

-- CreateIndex
CREATE INDEX "_FoodToWarung_B_index" ON "_FoodToWarung"("B");

-- RedefineTables
PRAGMA defer_foreign_keys=ON;
PRAGMA foreign_keys=OFF;
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
    "favoriteCount" INTEGER NOT NULL DEFAULT 0,
    "priceCategoryId" TEXT NOT NULL,
    CONSTRAINT "Food_priceCategoryId_fkey" FOREIGN KEY ("priceCategoryId") REFERENCES "PriceCategory" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);
INSERT INTO "new_Food" ("featured", "id", "image", "name", "priceCategoryId", "priceRange", "shortDescription", "slug", "story", "taste") SELECT "featured", "id", "image", "name", "priceCategoryId", "priceRange", "shortDescription", "slug", "story", "taste" FROM "Food";
DROP TABLE "Food";
ALTER TABLE "new_Food" RENAME TO "Food";
CREATE UNIQUE INDEX "Food_slug_key" ON "Food"("slug");
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;

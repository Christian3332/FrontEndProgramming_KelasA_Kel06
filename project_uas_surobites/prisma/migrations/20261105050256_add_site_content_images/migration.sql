-- RedefineTables
PRAGMA defer_foreign_keys=ON;
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_SiteContent" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "heroTitle" TEXT NOT NULL,
    "heroDescription" TEXT NOT NULL,
    "heroImage" TEXT NOT NULL DEFAULT '/img/hero image.jpeg',
    "rekomendasiTitle" TEXT NOT NULL,
    "rekomendasiDescription" TEXT NOT NULL,
    "rekomendasiImage" TEXT NOT NULL DEFAULT '/img/hero image.jpeg',
    "contactEmail" TEXT NOT NULL,
    "contactPhone" TEXT NOT NULL,
    "instagram" TEXT NOT NULL,
    "facebook" TEXT NOT NULL
);
INSERT INTO "new_SiteContent" ("contactEmail", "contactPhone", "facebook", "heroDescription", "heroTitle", "id", "instagram", "rekomendasiDescription", "rekomendasiTitle") SELECT "contactEmail", "contactPhone", "facebook", "heroDescription", "heroTitle", "id", "instagram", "rekomendasiDescription", "rekomendasiTitle" FROM "SiteContent";
DROP TABLE "SiteContent";
ALTER TABLE "new_SiteContent" RENAME TO "SiteContent";
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;

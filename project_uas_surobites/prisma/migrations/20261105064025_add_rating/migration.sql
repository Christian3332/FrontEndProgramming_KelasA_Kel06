-- CreateTable
CREATE TABLE "Rating" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "score" INTEGER NOT NULL,
    "userId" INTEGER NOT NULL,
    "warungId" INTEGER NOT NULL,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL,
    CONSTRAINT "Rating_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User" ("id") ON DELETE CASCADE ON UPDATE CASCADE,
    CONSTRAINT "Rating_warungId_fkey" FOREIGN KEY ("warungId") REFERENCES "Warung" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);

-- CreateIndex
CREATE UNIQUE INDEX "Rating_userId_warungId_key" ON "Rating"("userId", "warungId");

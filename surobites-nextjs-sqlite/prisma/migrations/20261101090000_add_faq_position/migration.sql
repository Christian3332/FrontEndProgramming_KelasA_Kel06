ALTER TABLE "Faq" ADD COLUMN "position" INTEGER NOT NULL DEFAULT 0;

UPDATE "Faq" SET "position" = "id" - 1;

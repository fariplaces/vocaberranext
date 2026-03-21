-- AlterTable
ALTER TABLE "Category" ADD COLUMN "order" INTEGER;

-- AlterTable
ALTER TABLE "Lesson" ADD COLUMN "order" INTEGER;

-- AlterTable
ALTER TABLE "Topic" ADD COLUMN "order" INTEGER;

-- RedefineTables
PRAGMA defer_foreign_keys=ON;
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Skill" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "title" TEXT NOT NULL,
    "order" INTEGER
);
INSERT INTO "new_Skill" ("id", "order", "title") SELECT "id", "order", "title" FROM "Skill";
DROP TABLE "Skill";
ALTER TABLE "new_Skill" RENAME TO "Skill";
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;

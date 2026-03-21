-- RedefineTables
PRAGMA defer_foreign_keys=ON;
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Duration" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "duration" TEXT NOT NULL
);
INSERT INTO "new_Duration" ("duration", "id") SELECT "duration", "id" FROM "Duration";
DROP TABLE "Duration";
ALTER TABLE "new_Duration" RENAME TO "Duration";
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;

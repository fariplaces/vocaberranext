-- RedefineTables
PRAGMA defer_foreign_keys=ON;
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_UILibComponent" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "category" TEXT NOT NULL DEFAULT 'Uncategorized',
    "name" TEXT NOT NULL,
    "description" TEXT,
    "component" TEXT NOT NULL,
    "engine" TEXT NOT NULL DEFAULT 'css',
    "layout" TEXT NOT NULL DEFAULT 'boxed',
    "importStatement" TEXT,
    "props" TEXT NOT NULL DEFAULT '{}',
    "label" TEXT,
    "children" TEXT NOT NULL DEFAULT '[]',
    "implementation" TEXT,
    "detailDocs" TEXT,
    "order" INTEGER NOT NULL DEFAULT 0,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL
);
INSERT INTO "new_UILibComponent" ("category", "children", "component", "createdAt", "description", "detailDocs", "engine", "id", "implementation", "importStatement", "label", "name", "order", "props", "updatedAt") SELECT "category", "children", "component", "createdAt", "description", "detailDocs", "engine", "id", "implementation", "importStatement", "label", "name", "order", "props", "updatedAt" FROM "UILibComponent";
DROP TABLE "UILibComponent";
ALTER TABLE "new_UILibComponent" RENAME TO "UILibComponent";
CREATE INDEX "UILibComponent_category_idx" ON "UILibComponent"("category");
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;

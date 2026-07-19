-- CreateTable
CREATE TABLE "UILibComponent" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "category" TEXT NOT NULL DEFAULT 'Uncategorized',
    "name" TEXT NOT NULL,
    "description" TEXT,
    "component" TEXT NOT NULL,
    "engine" TEXT NOT NULL DEFAULT 'css',
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

-- CreateTable
CREATE TABLE "UILibDoc" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "key" TEXT NOT NULL DEFAULT 'main',
    "content" TEXT NOT NULL,
    "updatedAt" DATETIME NOT NULL
);

-- CreateIndex
CREATE INDEX "UILibComponent_category_idx" ON "UILibComponent"("category");

-- CreateIndex
CREATE UNIQUE INDEX "UILibDoc_key_key" ON "UILibDoc"("key");

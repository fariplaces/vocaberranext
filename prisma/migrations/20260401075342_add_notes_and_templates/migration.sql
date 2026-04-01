-- CreateTable
CREATE TABLE "Note" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "title" TEXT NOT NULL DEFAULT 'Untitled',
    "content" TEXT,
    "visibility" TEXT NOT NULL DEFAULT 'PERSONAL',
    "targetId" TEXT,
    "targetType" TEXT,
    "shareCode" TEXT,
    "userId" TEXT,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL,
    CONSTRAINT "Note_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User" ("id") ON DELETE SET NULL ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "NoteTemplate" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "name" TEXT NOT NULL,
    "pattern" TEXT NOT NULL,
    "content" TEXT NOT NULL,
    "userId" TEXT,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL,
    CONSTRAINT "NoteTemplate_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User" ("id") ON DELETE SET NULL ON UPDATE CASCADE
);

-- CreateIndex
CREATE UNIQUE INDEX "Note_shareCode_key" ON "Note"("shareCode");

-- CreateIndex
CREATE INDEX "Note_userId_idx" ON "Note"("userId");

-- CreateIndex
CREATE INDEX "Note_visibility_idx" ON "Note"("visibility");

-- CreateIndex
CREATE INDEX "Note_shareCode_idx" ON "Note"("shareCode");

-- CreateIndex
CREATE INDEX "Note_targetId_targetType_userId_idx" ON "Note"("targetId", "targetType", "userId");

-- CreateIndex
CREATE INDEX "NoteTemplate_userId_idx" ON "NoteTemplate"("userId");

-- CreateIndex
CREATE UNIQUE INDEX "NoteTemplate_pattern_userId_key" ON "NoteTemplate"("pattern", "userId");

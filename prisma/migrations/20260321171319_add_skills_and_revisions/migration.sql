/*
  Warnings:

  - A unique constraint covering the columns `[duration]` on the table `Duration` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[exerciseNo]` on the table `Exercise` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[type]` on the table `ExerciseType` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[lesson]` on the table `Lesson` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateTable
CREATE TABLE "Skill" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "title" TEXT NOT NULL,
    "order" INTEGER NOT NULL
);

-- CreateTable
CREATE TABLE "Category" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "title" TEXT NOT NULL,
    "parentId" TEXT,
    "skillId" TEXT,
    CONSTRAINT "Category_parentId_fkey" FOREIGN KEY ("parentId") REFERENCES "Category" ("id") ON DELETE SET NULL ON UPDATE CASCADE,
    CONSTRAINT "Category_skillId_fkey" FOREIGN KEY ("skillId") REFERENCES "Skill" ("id") ON DELETE SET NULL ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "Topic" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "title" TEXT NOT NULL,
    "categoryId" TEXT NOT NULL,
    CONSTRAINT "Topic_categoryId_fkey" FOREIGN KEY ("categoryId") REFERENCES "Category" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "Revision" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "topicId" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "scheduled" DATETIME NOT NULL,
    "practiced" DATETIME,
    "revision1" BOOLEAN NOT NULL DEFAULT false,
    "revision1date" DATETIME,
    "revision2" BOOLEAN NOT NULL DEFAULT false,
    "revision2date" DATETIME,
    "revision3" BOOLEAN NOT NULL DEFAULT false,
    "revision3date" DATETIME,
    "revision4" BOOLEAN NOT NULL DEFAULT false,
    "revision4date" DATETIME,
    "revision5" BOOLEAN NOT NULL DEFAULT false,
    "revision5date" DATETIME,
    CONSTRAINT "Revision_topicId_fkey" FOREIGN KEY ("topicId") REFERENCES "Topic" ("id") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "Revision_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- CreateIndex
CREATE INDEX "Category_skillId_idx" ON "Category"("skillId");

-- CreateIndex
CREATE INDEX "Category_parentId_idx" ON "Category"("parentId");

-- CreateIndex
CREATE INDEX "Topic_categoryId_idx" ON "Topic"("categoryId");

-- CreateIndex
CREATE INDEX "Revision_topicId_idx" ON "Revision"("topicId");

-- CreateIndex
CREATE INDEX "Revision_userId_idx" ON "Revision"("userId");

-- CreateIndex
CREATE UNIQUE INDEX "Duration_duration_key" ON "Duration"("duration");

-- CreateIndex
CREATE UNIQUE INDEX "Exercise_exerciseNo_key" ON "Exercise"("exerciseNo");

-- CreateIndex
CREATE UNIQUE INDEX "ExerciseType_type_key" ON "ExerciseType"("type");

-- CreateIndex
CREATE UNIQUE INDEX "Lesson_lesson_key" ON "Lesson"("lesson");

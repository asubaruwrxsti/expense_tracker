/*
  Warnings:

  - You are about to drop the column `todoistTaskId` on the `Expense` table. All the data in the column will be lost.

*/
-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Expense" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "name" TEXT NOT NULL,
    "amount" REAL NOT NULL,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "description" TEXT NOT NULL,
    "userId" INTEGER NOT NULL,
    "categoriesId" INTEGER,
    "taskId" TEXT,
    CONSTRAINT "Expense_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User" ("id") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "Expense_categoriesId_fkey" FOREIGN KEY ("categoriesId") REFERENCES "Categories" ("id") ON DELETE SET NULL ON UPDATE CASCADE
);
INSERT INTO "new_Expense" ("amount", "categoriesId", "createdAt", "description", "id", "name", "userId") SELECT "amount", "categoriesId", "createdAt", "description", "id", "name", "userId" FROM "Expense";
DROP TABLE "Expense";
ALTER TABLE "new_Expense" RENAME TO "Expense";
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;

-- CreateTable
CREATE TABLE "User" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "firstname" TEXT NOT NULL,
    "lastname" TEXT NOT NULL
);

-- CreateTable
CREATE TABLE "Categories" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "name" TEXT NOT NULL
);

-- CreateTable
CREATE TABLE "Expense" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "name" TEXT NOT NULL,
    "amount" REAL NOT NULL,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "description" TEXT NOT NULL,
    "userId" INTEGER NOT NULL,
    "categoriesId" INTEGER,
    "todoistTaskId" TEXT,
    CONSTRAINT "Expense_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User" ("id") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "Expense_categoriesId_fkey" FOREIGN KEY ("categoriesId") REFERENCES "Categories" ("id") ON DELETE SET NULL ON UPDATE CASCADE
);

-- CreateIndex
CREATE UNIQUE INDEX "User_firstname_key" ON "User"("firstname");

-- CreateIndex
CREATE UNIQUE INDEX "User_lastname_key" ON "User"("lastname");

-- CreateIndex
CREATE UNIQUE INDEX "Categories_name_key" ON "Categories"("name");

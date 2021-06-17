-- CreateEnum
CREATE TYPE "CommandCategory" AS ENUM ('CURRENCY', 'FUN', 'GAMES', 'MUSIC', 'UTILITY');

-- CreateTable
CREATE TABLE "Command" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "category" "CommandCategory" NOT NULL,
    "aliases" TEXT[],

    PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Argument" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "optional" BOOLEAN,
    "multi" BOOLEAN,
    "commandId" INTEGER NOT NULL,

    PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Guild" (
    "id" TEXT NOT NULL,
    "customPrefix" TEXT,

    PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "_CommandToGuild" (
    "A" INTEGER NOT NULL,
    "B" TEXT NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "Command.name_unique" ON "Command"("name");

-- CreateIndex
CREATE UNIQUE INDEX "_CommandToGuild_AB_unique" ON "_CommandToGuild"("A", "B");

-- CreateIndex
CREATE INDEX "_CommandToGuild_B_index" ON "_CommandToGuild"("B");

-- AddForeignKey
ALTER TABLE "Argument" ADD FOREIGN KEY ("commandId") REFERENCES "Command"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_CommandToGuild" ADD FOREIGN KEY ("A") REFERENCES "Command"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_CommandToGuild" ADD FOREIGN KEY ("B") REFERENCES "Guild"("id") ON DELETE CASCADE ON UPDATE CASCADE;

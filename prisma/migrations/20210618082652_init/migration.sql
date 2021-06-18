-- CreateTable
CREATE TABLE "User" (
    "id" TEXT NOT NULL,
    "tag" TEXT NOT NULL,
    "ribbons" INTEGER,

    PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "User.tag_unique" ON "User"("tag");

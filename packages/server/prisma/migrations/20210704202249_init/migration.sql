-- CreateEnum
CREATE TYPE "FileType" AS ENUM ('MP4', 'WAV');

-- CreateTable
CREATE TABLE "User" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "countryOfOrigin" TEXT NOT NULL,

    PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "File" (
    "uuid" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "type" "FileType" NOT NULL,
    "duration" INTEGER NOT NULL,
    "size" INTEGER NOT NULL,
    "userId" INTEGER NOT NULL,

    PRIMARY KEY ("uuid")
);

-- AddForeignKey
ALTER TABLE "File" ADD FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

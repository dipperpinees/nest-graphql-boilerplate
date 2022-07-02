/*
  Warnings:

  - Made the column `content` on table `comment` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE `comment` MODIFY `content` VARCHAR(191) NOT NULL;

-- AlterTable
ALTER TABLE `user` ADD COLUMN `address` VARCHAR(191) NULL,
    ADD COLUMN `birthday` DATETIME(3) NULL,
    ADD COLUMN `education` VARCHAR(191) NULL;

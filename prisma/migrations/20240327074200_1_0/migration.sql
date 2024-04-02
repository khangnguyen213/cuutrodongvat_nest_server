/*
  Warnings:

  - A unique constraint covering the columns `[email]` on the table `Foster` will be added. If there are existing duplicate values, this will fail.

*/
-- AlterTable
ALTER TABLE `pet` MODIFY `date` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3);

-- CreateTable
CREATE TABLE `Question` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `content` VARCHAR(191) NOT NULL,
    `petId` VARCHAR(191) NOT NULL,

    INDEX `Question_petId_fkey`(`petId`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `AdoptForm` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `name` VARCHAR(191) NOT NULL,
    `contact1` VARCHAR(191) NOT NULL,
    `contact2` VARCHAR(191) NOT NULL,
    `petId` VARCHAR(191) NOT NULL,

    INDEX `AdoptForm_petId_fkey`(`petId`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Answer` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `content` VARCHAR(191) NOT NULL,
    `adoptFormId` INTEGER NOT NULL,
    `questionId` INTEGER NOT NULL,

    INDEX `Answer_questionId_fkey`(`questionId`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateIndex
CREATE UNIQUE INDEX `Foster_email_key` ON `Foster`(`email`);

-- AddForeignKey
ALTER TABLE `Question` ADD CONSTRAINT `Question_petId_fkey` FOREIGN KEY (`petId`) REFERENCES `Pet`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `AdoptForm` ADD CONSTRAINT `AdoptForm_petId_fkey` FOREIGN KEY (`petId`) REFERENCES `Pet`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Answer` ADD CONSTRAINT `Answer_adoptFormId_fkey` FOREIGN KEY (`adoptFormId`) REFERENCES `AdoptForm`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Answer` ADD CONSTRAINT `Answer_questionId_fkey` FOREIGN KEY (`questionId`) REFERENCES `Question`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

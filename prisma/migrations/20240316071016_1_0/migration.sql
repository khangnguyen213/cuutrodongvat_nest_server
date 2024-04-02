-- CreateTable
CREATE TABLE `Foster` (
    `id` VARCHAR(191) NOT NULL,
    `name` VARCHAR(191) NOT NULL,
    `phone` VARCHAR(191) NOT NULL,
    `email` VARCHAR(191) NOT NULL,
    `address` VARCHAR(191) NOT NULL,
    `avatar` VARCHAR(1000) NOT NULL,
    `password` VARCHAR(191) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Pet` (
    `id` VARCHAR(191) NOT NULL,
    `name` VARCHAR(191) NOT NULL,
    `type` VARCHAR(191) NOT NULL,
    `species` VARCHAR(191) NOT NULL,
    `color` VARCHAR(191) NOT NULL,
    `gender` INTEGER NOT NULL,
    `age` VARCHAR(191) NOT NULL,
    `sterilization` BOOLEAN NOT NULL,
    `vacine` BOOLEAN NOT NULL,
    `date` DATETIME(3) NOT NULL,
    `adopted` BOOLEAN NOT NULL,
    `description` VARCHAR(191) NOT NULL,
    `image` VARCHAR(1000) NOT NULL,
    `fosterId` VARCHAR(191) NULL,

    INDEX `Pet_fosterId_fkey`(`fosterId`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `Pet` ADD CONSTRAINT `Pet_fosterId_fkey` FOREIGN KEY (`fosterId`) REFERENCES `Foster`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;

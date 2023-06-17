-- CreateTable
CREATE TABLE `User` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `email` VARCHAR(191) NOT NULL,
    `password` VARCHAR(191) NOT NULL,
    `fname` VARCHAR(64) NULL,
    `lname` VARCHAR(64) NULL,
    `role` ENUM('USER', 'EDITOR', 'OWNER', 'ADMIN', 'SUPER_ADMIN') NOT NULL DEFAULT 'USER',
    `plantLimit` INTEGER NOT NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL,

    UNIQUE INDEX `User_email_key`(`email`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Plant` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `plantType` VARCHAR(191) NOT NULL,
    `plantName` VARCHAR(191) NOT NULL,
    `waterFrequency` INTEGER NOT NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL,
    `userId` INTEGER NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `PlantImage` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `plantImageUrl` VARCHAR(191) NOT NULL,
    `plantId` INTEGER NOT NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `Plant` ADD CONSTRAINT `Plant_userId_fkey` FOREIGN KEY (`userId`) REFERENCES `User`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `PlantImage` ADD CONSTRAINT `PlantImage_plantId_fkey` FOREIGN KEY (`plantId`) REFERENCES `Plant`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

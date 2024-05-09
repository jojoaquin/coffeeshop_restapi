-- CreateTable
CREATE TABLE `users` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `email` VARCHAR(100) NOT NULL,
    `username` VARCHAR(100) NOT NULL,
    `password` VARCHAR(100) NOT NULL,
    `role` ENUM('USER', 'ADMIN') NOT NULL DEFAULT 'USER',
    `token` VARCHAR(100) NULL,
    `expired_at` BIGINT NULL,

    UNIQUE INDEX `users_email_key`(`email`),
    UNIQUE INDEX `users_username_key`(`username`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `coffees` (
    `id` VARCHAR(100) NOT NULL,
    `name` VARCHAR(100) NOT NULL,
    `image` VARCHAR(255) NOT NULL,
    `stock` INTEGER NOT NULL,
    `price` BIGINT NOT NULL,
    `categoryId` INTEGER NOT NULL,

    UNIQUE INDEX `coffees_name_key`(`name`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `coffee_categories` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `name` VARCHAR(100) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `coffees` ADD CONSTRAINT `coffees_categoryId_fkey` FOREIGN KEY (`categoryId`) REFERENCES `coffee_categories`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

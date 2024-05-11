/*
  Warnings:

  - You are about to alter the column `price` on the `coffees` table. The data in that column could be lost. The data in that column will be cast from `Decimal(10,0)` to `Decimal`.

*/
-- AlterTable
ALTER TABLE `coffees` MODIFY `price` DECIMAL NOT NULL;

-- CreateTable
CREATE TABLE `carts` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `userId` INTEGER NOT NULL,
    `coffeeId` VARCHAR(100) NOT NULL,
    `total` DECIMAL NOT NULL DEFAULT 0,
    `status` ENUM('PAID', 'UNPAID') NOT NULL DEFAULT 'UNPAID',

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `carts` ADD CONSTRAINT `carts_userId_fkey` FOREIGN KEY (`userId`) REFERENCES `users`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `carts` ADD CONSTRAINT `carts_coffeeId_fkey` FOREIGN KEY (`coffeeId`) REFERENCES `coffees`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

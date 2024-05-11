/*
  Warnings:

  - You are about to drop the column `total` on the `carts` table. All the data in the column will be lost.
  - You are about to alter the column `price` on the `coffees` table. The data in that column could be lost. The data in that column will be cast from `Decimal(10,0)` to `Decimal`.
  - Added the required column `qty` to the `carts` table without a default value. This is not possible if the table is not empty.
  - Added the required column `totalPrice` to the `carts` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `carts` DROP COLUMN `total`,
    ADD COLUMN `qty` INTEGER NOT NULL,
    ADD COLUMN `totalPrice` DECIMAL NOT NULL;

-- AlterTable
ALTER TABLE `coffees` MODIFY `price` DECIMAL NOT NULL;

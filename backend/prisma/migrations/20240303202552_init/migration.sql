/*
  Warnings:

  - Added the required column `product_used` to the `Products` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `Products` ADD COLUMN `product_used` BOOLEAN NOT NULL;

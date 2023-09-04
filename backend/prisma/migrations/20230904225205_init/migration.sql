-- CreateTable
CREATE TABLE `Region` (
    `region_id` VARCHAR(191) NOT NULL,
    `country` VARCHAR(191) NOT NULL,
    `city` VARCHAR(191) NOT NULL,
    `street` VARCHAR(191) NOT NULL,
    `user_id` VARCHAR(191) NOT NULL,

    UNIQUE INDEX `Region_user_id_key`(`user_id`),
    PRIMARY KEY (`region_id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Products_category` (
    `product_category_id` INTEGER NOT NULL AUTO_INCREMENT,
    `product_category_name` VARCHAR(191) NOT NULL,

    PRIMARY KEY (`product_category_id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Users` (
    `user_id` VARCHAR(191) NOT NULL,
    `user_name` VARCHAR(191) NOT NULL,
    `user_surname` VARCHAR(191) NOT NULL,
    `user_email` VARCHAR(191) NOT NULL,
    `user_date_of_birth` DATETIME(3) NOT NULL,
    `user_phone_number` VARCHAR(191) NOT NULL,
    `user_login` VARCHAR(191) NOT NULL,
    `user_password` VARCHAR(191) NOT NULL,
    `user_join_date` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `user_avatar_url` VARCHAR(191) NULL,
    `user_premium_tokens` DOUBLE NULL,

    PRIMARY KEY (`user_id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Products` (
    `product_id` VARCHAR(191) NOT NULL,
    `user_id` VARCHAR(191) NOT NULL,
    `products_category_id` INTEGER NOT NULL,
    `product_name` VARCHAR(191) NOT NULL,
    `product_description` VARCHAR(1000) NULL,
    `product_images` JSON NOT NULL,
    `product_dollar_price` DOUBLE NOT NULL,
    `product_quantity` INTEGER NOT NULL,
    `product_watched_by_id` VARCHAR(191) NOT NULL,
    `product_popularity` DOUBLE NULL,
    `product_added_time` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `product_promotion` DATETIME(3) NULL,

    PRIMARY KEY (`product_id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Crypto` (
    `crypto_id` VARCHAR(191) NOT NULL,
    `crypto_name` VARCHAR(191) NOT NULL,
    `crypto_usd_price` DOUBLE NOT NULL,

    UNIQUE INDEX `Crypto_crypto_name_key`(`crypto_name`),
    PRIMARY KEY (`crypto_id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `CryptoProductPrice` (
    `crypto_product_price_id` VARCHAR(191) NOT NULL,
    `product_Id` VARCHAR(191) NOT NULL,
    `crypto_Id` VARCHAR(191) NOT NULL,
    `crypto_price` DOUBLE NOT NULL,

    PRIMARY KEY (`crypto_product_price_id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Cart` (
    `cart_id` VARCHAR(191) NOT NULL,
    `user_id` VARCHAR(191) NOT NULL,

    UNIQUE INDEX `Cart_user_id_key`(`user_id`),
    PRIMARY KEY (`cart_id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `CartToItem` (
    `cart_item_id` VARCHAR(191) NOT NULL,
    `cart_id` VARCHAR(191) NOT NULL,
    `product_id` VARCHAR(191) NOT NULL,
    `quantity` INTEGER NOT NULL,

    PRIMARY KEY (`cart_item_id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `ProductsSold` (
    `product_sold_id` VARCHAR(191) NOT NULL,
    `user_id` VARCHAR(191) NOT NULL,
    `product_id` VARCHAR(191) NOT NULL,
    `sale_time` DATETIME(3) NOT NULL,

    PRIMARY KEY (`product_sold_id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `Region` ADD CONSTRAINT `Region_user_id_fkey` FOREIGN KEY (`user_id`) REFERENCES `Users`(`user_id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Products` ADD CONSTRAINT `Products_user_id_fkey` FOREIGN KEY (`user_id`) REFERENCES `Users`(`user_id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Products` ADD CONSTRAINT `Products_products_category_id_fkey` FOREIGN KEY (`products_category_id`) REFERENCES `Products_category`(`product_category_id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Products` ADD CONSTRAINT `Products_product_watched_by_id_fkey` FOREIGN KEY (`product_watched_by_id`) REFERENCES `Users`(`user_id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `CryptoProductPrice` ADD CONSTRAINT `CryptoProductPrice_product_Id_fkey` FOREIGN KEY (`product_Id`) REFERENCES `Products`(`product_id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `CryptoProductPrice` ADD CONSTRAINT `CryptoProductPrice_crypto_Id_fkey` FOREIGN KEY (`crypto_Id`) REFERENCES `Crypto`(`crypto_id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Cart` ADD CONSTRAINT `Cart_user_id_fkey` FOREIGN KEY (`user_id`) REFERENCES `Users`(`user_id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `CartToItem` ADD CONSTRAINT `CartToItem_product_id_fkey` FOREIGN KEY (`product_id`) REFERENCES `Products`(`product_id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `CartToItem` ADD CONSTRAINT `CartToItem_cart_id_fkey` FOREIGN KEY (`cart_id`) REFERENCES `Cart`(`cart_id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `ProductsSold` ADD CONSTRAINT `ProductsSold_product_id_fkey` FOREIGN KEY (`product_id`) REFERENCES `Products`(`product_id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `ProductsSold` ADD CONSTRAINT `ProductsSold_user_id_fkey` FOREIGN KEY (`user_id`) REFERENCES `Users`(`user_id`) ON DELETE RESTRICT ON UPDATE CASCADE;

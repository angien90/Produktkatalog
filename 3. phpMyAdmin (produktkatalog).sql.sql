-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Värd: 127.0.0.1
-- Tid vid skapande: 20 apr 2025 kl 22:13
-- Serverversion: 10.4.32-MariaDB
-- PHP-version: 8.2.12

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Databas: `produktkatalog`
--

-- --------------------------------------------------------

--
-- Tabellstruktur `categories`
--

CREATE TABLE `categories` (
  `categories_id` int(11) NOT NULL,
  `name` varchar(100) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumpning av Data i tabell `categories`
--

INSERT INTO `categories` (`categories_id`, `name`) VALUES
(1, 'Jackor'),
(2, 'Klänningar'),
(3, 'Skor'),
(4, 'Jeans och Byxor'),
(5, 'Tröjor '),
(6, 'Underkläder'),
(7, 'T-shirt');

-- --------------------------------------------------------

--
-- Tabellstruktur `genders`
--

CREATE TABLE `genders` (
  `genders_id` int(11) NOT NULL,
  `gender` varchar(50) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumpning av Data i tabell `genders`
--

INSERT INTO `genders` (`genders_id`, `gender`) VALUES
(1, 'Men'),
(2, 'Women'),
(3, 'Unisex');

-- --------------------------------------------------------

--
-- Tabellstruktur `products`
--

CREATE TABLE `products` (
  `products_id` int(11) NOT NULL,
  `title` varchar(100) NOT NULL,
  `description` text NOT NULL,
  `stock` int(11) NOT NULL,
  `price` decimal(10,2) NOT NULL,
  `image` varchar(255) NOT NULL,
  `created_date` timestamp NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumpning av Data i tabell `products`
--

INSERT INTO `products` (`products_id`, `title`, `description`, `stock`, `price`, `image`, `created_date`) VALUES
(5, 'Pelle', 'Begie chinos', 90, 199.00, 'images/chinos_pelle.jpg', '2025-04-19 13:48:33'),
(6, 'Adrian', 'Black skin jacket', 10, 299.00, 'images/jacket_adrian.jpg', '2025-04-19 13:48:33'),
(7, 'Linda', 'Brown jacket', 30, 150.00, 'images/jacket_linda.jpg', '2025-04-19 13:48:33'),
(8, 'Jasmine', 'Wide jeans', 150, 199.00, 'images/jeans_jasmine.jpg', '2025-04-19 13:48:33'),
(9, 'Stina', 'Cool jeans', 50, 199.00, 'images/jeans_stina.jpg', '2025-04-19 13:48:33'),
(10, 'David', 'Black pants', 50, 199.00, 'images/pants_david.jpg', '2025-04-19 13:48:33'),
(11, 'Bella', 'Colorfull shoes', 160, 160.00, 'images/shoe_bella.jpg', '2025-04-19 13:48:33'),
(12, 'Gustaf', 'White shoes', 80, 180.00, 'images/shoe_gustaf.jpg', '2025-04-19 13:48:33'),
(13, 'Kim', 'Unisex shoes', 60, 150.00, 'images/shoe_kim.jpg', '2025-04-19 13:48:33'),
(14, 'Zoe', 'White T-shirt with print', 85, 90.00, 'images/t-shirt_zoe.jpg', '2025-04-20 15:21:57'),
(15, 'Peter', 'Black t-shirt with white text', 30, 100.00, 'images/t-shirt_peter.jpg', '2025-04-20 15:26:34'),
(16, 'Marie', 'Black t-shirt with white text', 90, 100.00, 'images/t-shirt_marie.jpg', '2025-04-20 15:26:34');

-- --------------------------------------------------------

--
-- Tabellstruktur `product_categories`
--

CREATE TABLE `product_categories` (
  `product_id` int(11) NOT NULL,
  `category_id` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumpning av Data i tabell `product_categories`
--

INSERT INTO `product_categories` (`product_id`, `category_id`) VALUES
(6, 1),
(7, 1),
(11, 3),
(12, 3),
(13, 3),
(5, 4),
(8, 4),
(9, 4),
(10, 4),
(14, 7),
(15, 7),
(16, 7);

-- --------------------------------------------------------

--
-- Tabellstruktur `product_gender`
--

CREATE TABLE `product_gender` (
  `products_id` int(11) NOT NULL,
  `genders_id` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumpning av Data i tabell `product_gender`
--

INSERT INTO `product_gender` (`products_id`, `genders_id`) VALUES
(5, 1),
(6, 1),
(10, 1),
(12, 1),
(15, 1),
(7, 2),
(8, 2),
(9, 2),
(11, 2),
(14, 2),
(16, 2),
(13, 3);

--
-- Index för dumpade tabeller
--

--
-- Index för tabell `categories`
--
ALTER TABLE `categories`
  ADD PRIMARY KEY (`categories_id`);

--
-- Index för tabell `genders`
--
ALTER TABLE `genders`
  ADD PRIMARY KEY (`genders_id`);

--
-- Index för tabell `products`
--
ALTER TABLE `products`
  ADD PRIMARY KEY (`products_id`);

--
-- Index för tabell `product_categories`
--
ALTER TABLE `product_categories`
  ADD UNIQUE KEY `fk_product_categories_product` (`product_id`) USING BTREE,
  ADD KEY `fk_product_categories_category` (`category_id`) USING BTREE;

--
-- Index för tabell `product_gender`
--
ALTER TABLE `product_gender`
  ADD UNIQUE KEY `fk_product_gender_product` (`products_id`) USING BTREE,
  ADD KEY `fk_product_gender_gender` (`genders_id`);

--
-- AUTO_INCREMENT för dumpade tabeller
--

--
-- AUTO_INCREMENT för tabell `categories`
--
ALTER TABLE `categories`
  MODIFY `categories_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=10;

--
-- AUTO_INCREMENT för tabell `genders`
--
ALTER TABLE `genders`
  MODIFY `genders_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=7;

--
-- AUTO_INCREMENT för tabell `products`
--
ALTER TABLE `products`
  MODIFY `products_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=19;

--
-- Restriktioner för dumpade tabeller
--

--
-- Restriktioner för tabell `product_categories`
--
ALTER TABLE `product_categories`
  ADD CONSTRAINT `fk_product_categories_category` FOREIGN KEY (`category_id`) REFERENCES `categories` (`categories_id`),
  ADD CONSTRAINT `fk_product_categories_product` FOREIGN KEY (`product_id`) REFERENCES `products` (`products_id`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Restriktioner för tabell `product_gender`
--
ALTER TABLE `product_gender`
  ADD CONSTRAINT `fk_product_gender_gender` FOREIGN KEY (`genders_id`) REFERENCES `genders` (`genders_id`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `fk_product_gender_product` FOREIGN KEY (`products_id`) REFERENCES `products` (`products_id`) ON DELETE CASCADE ON UPDATE CASCADE;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;

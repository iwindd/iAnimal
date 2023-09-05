-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Host: localhost:3306
-- Generation Time: Sep 05, 2023 at 12:56 PM
-- Server version: 10.3.38-MariaDB-log
-- PHP Version: 8.2.8

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `ianimal`
--

-- --------------------------------------------------------

--
-- Table structure for table `animals`
--

CREATE TABLE `animals` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `categories` text DEFAULT NULL,
  `name` varchar(255) DEFAULT NULL,
  `detail` text DEFAULT NULL,
  `image` varchar(255) DEFAULT NULL,
  `found` datetime DEFAULT NULL,
  `extinction` timestamp NULL DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_general_ci;

--
-- Dumping data for table `animals`
--

INSERT INTO `animals` (`id`, `categories`, `name`, `detail`, `image`, `found`, `extinction`, `created_at`, `updated_at`) VALUES
(42, '[11]', 'เสือ', '<p>	<strong>เสือ</strong>&nbsp;เป็น<a href=\"https://th.wikipedia.org/wiki/%E0%B8%AA%E0%B8%B1%E0%B8%95%E0%B8%A7%E0%B9%8C%E0%B9%80%E0%B8%A5%E0%B8%B5%E0%B9%89%E0%B8%A2%E0%B8%87%E0%B8%A5%E0%B8%B9%E0%B8%81%E0%B8%94%E0%B9%89%E0%B8%A7%E0%B8%A2%E0%B8%99%E0%B8%A1\" rel=\"noopener noreferrer\" target=\"_blank\" style=\"background-color: initial; color: rgb(51, 102, 204);\">สัตว์เลี้ยงลูกด้วยนม</a>ในวงศ์<a href=\"https://th.wikipedia.org/wiki/%E0%B8%A7%E0%B8%87%E0%B8%A8%E0%B9%8C%E0%B9%80%E0%B8%AA%E0%B8%B7%E0%B8%AD%E0%B9%81%E0%B8%A5%E0%B8%B0%E0%B9%81%E0%B8%A1%E0%B8%A7\" rel=\"noopener noreferrer\" target=\"_blank\" style=\"background-color: initial; color: rgb(51, 102, 204);\">ฟิลิดี</a>ซึ่งเป็น<a href=\"https://th.wikipedia.org/wiki/%E0%B8%81%E0%B8%B2%E0%B8%A3%E0%B8%88%E0%B8%B3%E0%B9%81%E0%B8%99%E0%B8%81%E0%B8%8A%E0%B8%B1%E0%B9%89%E0%B8%99%E0%B8%97%E0%B8%B2%E0%B8%87%E0%B8%A7%E0%B8%B4%E0%B8%97%E0%B8%A2%E0%B8%B2%E0%B8%A8%E0%B8%B2%E0%B8%AA%E0%B8%95%E0%B8%A3%E0%B9%8C\" rel=\"noopener noreferrer\" target=\"_blank\" style=\"background-color: initial; color: rgb(51, 102, 204);\">วงศ์</a>เดียวกับ<a href=\"https://th.wikipedia.org/wiki/%E0%B9%81%E0%B8%A1%E0%B8%A7\" rel=\"noopener noreferrer\" target=\"_blank\" style=\"background-color: initial; color: rgb(51, 102, 204);\">แมว</a>โดยชนิดที่เรียกว่าเสือมักมีขนาดลำตัวค่อนข้างใหญ่กว่า<a href=\"https://th.wikipedia.org/wiki/%E0%B9%80%E0%B8%AA%E0%B8%B7%E0%B8%AD#cite_note-1\" rel=\"noopener noreferrer\" target=\"_blank\" style=\"background-color: initial; color: rgb(51, 102, 204);\"><sup>[1]</sup></a>และอาศัยอยู่ภายใน<a href=\"https://th.wikipedia.org/wiki/%E0%B8%9B%E0%B9%88%E0%B8%B2\" rel=\"noopener noreferrer\" target=\"_blank\" style=\"background-color: initial; color: rgb(51, 102, 204);\">ป่า</a>&nbsp;ขนาดของลำตัวประมาณ 168 - 227&nbsp;<a href=\"https://th.wikipedia.org/wiki/%E0%B9%80%E0%B8%8B%E0%B8%99%E0%B8%95%E0%B8%B4%E0%B9%80%E0%B8%A1%E0%B8%95%E0%B8%A3\" rel=\"noopener noreferrer\" target=\"_blank\" style=\"background-color: initial; color: rgb(51, 102, 204);\">เซนติเมตร</a>และหนักประมาณ 180 - 245&nbsp;<a href=\"https://th.wikipedia.org/wiki/%E0%B8%81%E0%B8%B4%E0%B9%82%E0%B8%A5%E0%B8%81%E0%B8%A3%E0%B8%B1%E0%B8%A1\" rel=\"noopener noreferrer\" target=\"_blank\" style=\"background-color: initial; color: rgb(51, 102, 204);\">กิโลกรัม</a><a href=\"https://th.wikipedia.org/wiki/%E0%B9%80%E0%B8%AA%E0%B8%B7%E0%B8%AD#cite_note-2\" rel=\"noopener noreferrer\" target=\"_blank\" style=\"background-color: initial; color: rgb(51, 102, 204);\"><sup>[2]</sup></a>&nbsp;<a href=\"https://th.wikipedia.org/wiki/%E0%B8%A3%E0%B8%B9%E0%B8%A1%E0%B9%88%E0%B8%B2%E0%B8%99%E0%B8%95%E0%B8%B2\" rel=\"noopener noreferrer\" target=\"_blank\" style=\"background-color: initial; color: rgb(51, 102, 204);\">รูม่านตา</a>กลม เป็น<a href=\"https://th.wikipedia.org/wiki/%E0%B8%AA%E0%B8%B1%E0%B8%95%E0%B8%A7%E0%B9%8C%E0%B8%81%E0%B8%B4%E0%B8%99%E0%B9%80%E0%B8%99%E0%B8%B7%E0%B9%89%E0%B8%AD\" rel=\"noopener noreferrer\" target=\"_blank\" style=\"background-color: initial; color: rgb(51, 102, 204);\">สัตว์กินเนื้อ</a>กลุ่มหนึ่ง มีลักษณะและรูปร่างรวมทั้ง<a href=\"https://th.wikipedia.org/wiki/%E0%B8%9E%E0%B8%A4%E0%B8%95%E0%B8%B4%E0%B8%81%E0%B8%A3%E0%B8%A3%E0%B8%A1\" rel=\"noopener noreferrer\" target=\"_blank\" style=\"background-color: initial; color: rgb(51, 102, 204);\">พฤติกรรม</a>ที่เป็น<a href=\"https://th.wikipedia.org/w/index.php?title=%E0%B9%80%E0%B8%AD%E0%B8%81%E0%B8%A5%E0%B8%B1%E0%B8%81%E0%B8%A9%E0%B8%93%E0%B9%8C&amp;action=edit&amp;redlink=1\" rel=\"noopener noreferrer\" target=\"_blank\" style=\"background-color: initial; color: rgb(215, 51, 51);\">เอกลักษณ์</a>&nbsp;แตกต่างจากสัตว์ในกลุ่มอื่น หากินเวลา<a href=\"https://th.wikipedia.org/wiki/%E0%B8%81%E0%B8%A5%E0%B8%B2%E0%B8%87%E0%B8%84%E0%B8%B7%E0%B8%99\" rel=\"noopener noreferrer\" target=\"_blank\" style=\"background-color: initial; color: rgb(51, 102, 204);\">กลางคืน</a>&nbsp;มีถิ่นกำเนิดในป่า เสือส่วนใหญ่ยังคงมีความสามารถในการปีนป่าย<a href=\"https://th.wikipedia.org/wiki/%E0%B8%95%E0%B9%89%E0%B8%99%E0%B9%84%E0%B8%A1%E0%B9%89\" rel=\"noopener noreferrer\" target=\"_blank\" style=\"background-color: initial; color: rgb(51, 102, 204);\">ต้นไม้</a>&nbsp;ซึ่งยกเว้นเสือชีต้า เสือทุกชนิดมี<a href=\"https://th.wikipedia.org/w/index.php?title=%E0%B8%81%E0%B8%A3%E0%B8%B2%E0%B8%A1&amp;action=edit&amp;redlink=1\" rel=\"noopener noreferrer\" target=\"_blank\" style=\"background-color: initial; color: rgb(215, 51, 51);\">กราม</a>ที่สั้นและแข็งแรง มี<a href=\"https://th.wikipedia.org/w/index.php?title=%E0%B9%80%E0%B8%82%E0%B8%B5%E0%B9%89%E0%B8%A2%E0%B8%A7&amp;action=edit&amp;redlink=1\" rel=\"noopener noreferrer\" target=\"_blank\" style=\"background-color: initial; color: rgb(215, 51, 51);\">เขี้ยว</a>&nbsp;2 คู่สำหรับกัดเหยื่อ ทั่วทั้ง<a href=\"https://th.wikipedia.org/wiki/%E0%B9%82%E0%B8%A5%E0%B8%81\" rel=\"noopener noreferrer\" target=\"_blank\" style=\"background-color: initial; color: rgb(51, 102, 204);\">โลก</a>มีสัตว์ที่อยู่ในวงศ์เสือและแมวประมาณ 37 ชนิด ซึ่งรวมทั้งแมวบ้านด้วย<a href=\"https://th.wikipedia.org/wiki/%E0%B9%80%E0%B8%AA%E0%B8%B7%E0%B8%AD#cite_note-3\" rel=\"noopener noreferrer\" target=\"_blank\" style=\"background-color: initial; color: rgb(51, 102, 204);\"><sup>[3]</sup></a></p><p>	เสือจัดเป็นสัตว์นักล่าที่มีความสง่างามในตัวเอง โดยเฉพาะเสือขนาดใหญ่ที่แลดูน่าเกรงขาม ไม่ว่าจะเป็นเสือโคร่งหรือ<a href=\"https://th.wikipedia.org/wiki/%E0%B9%80%E0%B8%AA%E0%B8%B7%E0%B8%AD%E0%B8%94%E0%B8%B2%E0%B8%A7\" rel=\"noopener noreferrer\" target=\"_blank\" style=\"background-color: initial; color: rgb(51, 102, 204);\">เสือดาว</a>&nbsp;ผู้ที่พบเห็นเสือในครั้งแรกย่อมเกิดความประทับใจในความสง่างาม แต่ในขณะเดียวกันก็เกิดความหวาดหวั่นเกรงขามในพละกำลังและอำนาจภายในตัวของพวกมัน เสือจึงได้รับการยกย่องให้เป็นราชาแห่งสัตว์ป่าเช่นเดียวกับสิงโต และเป็นราชานักล่าแห่งผืนป่าภูมิภาคเอเชียอย่างแท้จริง&nbsp;<a href=\"https://th.wikipedia.org/wiki/%E0%B9%80%E0%B8%AA%E0%B8%B7%E0%B8%AD#cite_note-%E0%B9%80%E0%B8%AA%E0%B8%B7%E0%B8%AD_%E0%B8%88%E0%B9%89%E0%B8%B2%E0%B8%A7%E0%B9%81%E0%B8%AB%E0%B9%88%E0%B8%87%E0%B8%99%E0%B8%B1%E0%B8%81%E0%B8%A5%E0%B9%88%E0%B8%B2-4\" rel=\"noopener noreferrer\" target=\"_blank\" style=\"background-color: initial; color: rgb(51, 102, 204);\"><sup>[4]</sup></a></p><p>	ปัจจุบันจำนวนของเสือในประเทศไทยลดจำนวนลงเป็นอย่างมาก ในระยะเวลาไม่ถึง 10 ปี เสือกลับถูกล่า ป่าภายในประเทศถูกทำลายเป็นอย่างมาก สภาพธรรมชาติในพื้นที่ต่าง ๆ ถูกเปลี่ยนแปลงไปอย่างมากมาย ส่งผลกระทบต่อสภาพแวดล้อมความเป็นอยู่ของมนุษย์เอง ทุกวันนี้ปริมาณของเสือที่จัดอยู่ในลำดับสุดท้ายของห่วงโซ่อาหารถือเป็นสิ่งจำเป็น เพราะการสูญสิ้นหรือลดจำนวนลงอย่างมากของเสือซึ่งเป็นสัตว์กินเนื้อ จะส่งผลกระทบต่อโครงสร้างและระบบนิเวศทั้งหมด การลดจำนวนอย่างรวดเร็วของเสือเพียงหนึ่งหรือสองชนิดในประเ</p>', 'zU8xDZ81ARIRN6zA.jpg', '1985-09-03 00:00:00', NULL, '2023-09-02 23:28:54', '2023-09-02 23:28:54');

-- --------------------------------------------------------

--
-- Table structure for table `categories`
--

CREATE TABLE `categories` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `title` varchar(255) NOT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_general_ci;

--
-- Dumping data for table `categories`
--

INSERT INTO `categories` (`id`, `title`, `created_at`, `updated_at`) VALUES
(11, 'กินเนื้อ', '2023-08-16 04:02:15', '2023-08-16 04:02:15'),
(12, 'กินพืช', '2023-08-15 06:50:35', '2023-08-15 06:50:35'),
(13, 'สัตว์มายา', '2023-08-22 05:42:51', '2023-08-22 05:42:51');

-- --------------------------------------------------------

--
-- Table structure for table `failed_jobs`
--

CREATE TABLE `failed_jobs` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `uuid` varchar(255) NOT NULL,
  `connection` text NOT NULL,
  `queue` text NOT NULL,
  `payload` longtext NOT NULL,
  `exception` longtext NOT NULL,
  `failed_at` timestamp NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_general_ci;

-- --------------------------------------------------------

--
-- Table structure for table `likes`
--

CREATE TABLE `likes` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `user_id` int(11) NOT NULL,
  `animal_id` int(11) NOT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_general_ci;

--
-- Dumping data for table `likes`
--

INSERT INTO `likes` (`id`, `user_id`, `animal_id`, `created_at`, `updated_at`) VALUES
(75, 2, 21, '2023-08-18 02:41:10', '2023-08-18 02:41:10'),
(79, 2, 24, '2023-08-18 03:16:32', '2023-08-18 03:16:32'),
(80, 2, 26, '2023-08-18 04:15:11', '2023-08-18 04:15:11'),
(82, 4, 28, '2023-08-18 10:22:15', '2023-08-18 10:22:15'),
(83, 19, 28, '2023-08-18 10:24:02', '2023-08-18 10:24:02'),
(84, 13, 28, '2023-08-18 10:30:56', '2023-08-18 10:30:56'),
(85, 13, 29, '2023-08-18 11:39:58', '2023-08-18 11:39:58'),
(86, 13, 35, '2023-08-22 05:43:31', '2023-08-22 05:43:31'),
(89, 13, 36, '2023-08-24 17:29:17', '2023-08-24 17:29:17'),
(90, 13, 37, '2023-08-24 17:29:19', '2023-08-24 17:29:19'),
(91, 13, 38, '2023-08-24 17:29:26', '2023-08-24 17:29:26'),
(92, 13, 39, '2023-08-24 17:29:28', '2023-08-24 17:29:28'),
(93, 13, 40, '2023-08-24 17:29:30', '2023-08-24 17:29:30'),
(94, 22, 35, '2023-08-28 19:36:06', '2023-08-28 19:36:06'),
(96, 20, 42, '2023-09-02 23:31:51', '2023-09-02 23:31:51');

-- --------------------------------------------------------

--
-- Table structure for table `migrations`
--

CREATE TABLE `migrations` (
  `id` int(10) UNSIGNED NOT NULL,
  `migration` varchar(255) NOT NULL,
  `batch` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_general_ci;

--
-- Dumping data for table `migrations`
--

INSERT INTO `migrations` (`id`, `migration`, `batch`) VALUES
(1, '2014_10_12_000000_create_users_table', 1),
(2, '2014_10_12_100000_create_password_resets_table', 1),
(3, '2019_08_19_000000_create_failed_jobs_table', 1),
(4, '2019_12_14_000001_create_personal_access_tokens_table', 1),
(5, '2023_08_15_122011_create_categories_table', 2),
(6, '2023_08_16_031837_create_animals_table', 3),
(7, '2023_08_17_095117_create_likes_table', 4);

-- --------------------------------------------------------

--
-- Table structure for table `password_resets`
--

CREATE TABLE `password_resets` (
  `email` varchar(255) NOT NULL,
  `token` varchar(255) NOT NULL,
  `created_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_general_ci;

-- --------------------------------------------------------

--
-- Table structure for table `personal_access_tokens`
--

CREATE TABLE `personal_access_tokens` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `tokenable_type` varchar(255) NOT NULL,
  `tokenable_id` bigint(20) UNSIGNED NOT NULL,
  `name` varchar(255) NOT NULL,
  `token` varchar(64) NOT NULL,
  `abilities` text DEFAULT NULL,
  `last_used_at` timestamp NULL DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_general_ci;

-- --------------------------------------------------------

--
-- Table structure for table `users`
--

CREATE TABLE `users` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `name` varchar(255) NOT NULL,
  `email` varchar(255) NOT NULL,
  `password` varchar(255) NOT NULL,
  `permission` int(11) NOT NULL DEFAULT 0,
  `email_verified_at` timestamp NULL DEFAULT NULL,
  `remember_token` varchar(100) DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_general_ci;

--
-- Dumping data for table `users`
--

INSERT INTO `users` (`id`, `name`, `email`, `password`, `permission`, `email_verified_at`, `remember_token`, `created_at`, `updated_at`) VALUES
(13, 'Achirawit', 'iwindd@gmail.com', '$2y$10$bngpK7heFUcPzLXuflnZdeciQLYTxvwFwijYWHDmUKCD1mu1R3pMq', 1, NULL, NULL, '2023-08-18 09:41:58', '2023-08-24 05:53:29'),
(20, 'admin', 'admin@example.com', '$2y$10$bYrW0Lndfi4WCMfAOyboRuKvJj3KTNAvIJFylYW6ytnS29sPPZ9N2', 1, NULL, NULL, '2023-08-22 06:01:51', '2023-08-27 07:16:56'),
(21, 'user', 'user@example.com', '$2y$10$e3LS8N29qzSiJUFZIMF6pufIwnWOYM8i5nZvE.bjDScTnooKxodlO', 0, NULL, NULL, '2023-08-27 07:13:31', '2023-08-27 07:16:17');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `animals`
--
ALTER TABLE `animals`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `categories`
--
ALTER TABLE `categories`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `failed_jobs`
--
ALTER TABLE `failed_jobs`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `failed_jobs_uuid_unique` (`uuid`);

--
-- Indexes for table `likes`
--
ALTER TABLE `likes`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `migrations`
--
ALTER TABLE `migrations`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `password_resets`
--
ALTER TABLE `password_resets`
  ADD KEY `password_resets_email_index` (`email`);

--
-- Indexes for table `personal_access_tokens`
--
ALTER TABLE `personal_access_tokens`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `personal_access_tokens_token_unique` (`token`),
  ADD KEY `personal_access_tokens_tokenable_type_tokenable_id_index` (`tokenable_type`,`tokenable_id`);

--
-- Indexes for table `users`
--
ALTER TABLE `users`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `users_email_unique` (`email`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `animals`
--
ALTER TABLE `animals`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=43;

--
-- AUTO_INCREMENT for table `categories`
--
ALTER TABLE `categories`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=16;

--
-- AUTO_INCREMENT for table `failed_jobs`
--
ALTER TABLE `failed_jobs`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `likes`
--
ALTER TABLE `likes`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=97;

--
-- AUTO_INCREMENT for table `migrations`
--
ALTER TABLE `migrations`
  MODIFY `id` int(10) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=8;

--
-- AUTO_INCREMENT for table `personal_access_tokens`
--
ALTER TABLE `personal_access_tokens`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `users`
--
ALTER TABLE `users`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=24;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;

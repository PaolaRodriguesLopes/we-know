-- phpMyAdmin SQL Dump
-- version 5.0.3
-- https://www.phpmyadmin.net/
--
-- Host: localhost
-- Generation Time: Nov 23, 2020 at 09:06 PM
-- Server version: 10.4.14-MariaDB
-- PHP Version: 7.2.34

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `weknow`
--

-- --------------------------------------------------------

--
-- Table structure for table `articles`
--

CREATE TABLE `articles` (
  `id` int(10) UNSIGNED NOT NULL,
  `title` varchar(100) DEFAULT NULL,
  `description` varchar(250) DEFAULT NULL,
  `text` mediumtext DEFAULT NULL,
  `category` int(11) DEFAULT NULL,
  `author` int(10) DEFAULT NULL,
  `subject` int(10) DEFAULT NULL,
  `published_date` datetime DEFAULT NULL,
  `last_changed` datetime DEFAULT NULL,
  `status_article` int(10) DEFAULT NULL,
  `comments` varchar(500) DEFAULT NULL,
  `approved_by` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `articles`
--

INSERT INTO `articles` (`id`, `title`, `description`, `text`, `category`, `author`, `subject`, `published_date`, `last_changed`, `status_article`, `comments`, `approved_by`) VALUES
(23, 'Teste', 'Teste', 'Teste', 15, 10, 11, '2020-11-17 11:59:16', '2020-11-18 15:44:07', 2, 'Teste', 10),
(30, 'aa', 'aa', 'aa', 11, 10, 11, '2020-11-18 15:09:04', '2020-11-18 15:09:04', 2, 'aaaaa', 10),
(31, 'nbbbb', 'bb', 'ccc', 11, 10, 11, '2020-11-18 15:09:39', '2020-11-18 15:09:39', 2, 'sdfsfsdf', 10),
(46, 'Testando', 'jkahsdkjasd', 'suadhuaisd', 17, 11, 19, '2020-11-22 12:53:20', '2020-11-22 12:53:20', 1, NULL, 10),
(47, 'Outro teste', 'aksdhuasid', 'iuashdiuasd', 15, 11, 18, '2020-11-22 13:00:51', '2020-11-22 13:00:51', 1, NULL, 19);

-- --------------------------------------------------------

--
-- Table structure for table `categories`
--

CREATE TABLE `categories` (
  `id` int(10) UNSIGNED NOT NULL,
  `description` varchar(50) DEFAULT '0'
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `categories`
--

INSERT INTO `categories` (`id`, `description`) VALUES
(11, 'Outro Teste Atulizado'),
(15, 'ACDC'),
(16, 'Teste'),
(17, 'Outra'),
(22, 'Nova Categoria');

-- --------------------------------------------------------

--
-- Table structure for table `courses`
--

CREATE TABLE `courses` (
  `id` int(10) UNSIGNED NOT NULL,
  `description` varchar(50) DEFAULT '0',
  `duration` varchar(150) NOT NULL DEFAULT '0'
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `courses`
--

INSERT INTO `courses` (`id`, `description`, `duration`) VALUES
(11, 'Engenharia Computação', '100 anos'),
(12, 'Engenharia Elétrica', '10 anos'),
(13, 'Engenharia Produção', 'Uma eternidade'),
(14, 'IoT', '10 dias'),
(15, 'Física', 'Até Isaac Newton ressuscitar'),
(17, 'A', '12');

-- --------------------------------------------------------

--
-- Table structure for table `passwordtokens`
--

CREATE TABLE `passwordtokens` (
  `id` int(10) UNSIGNED NOT NULL,
  `token` varchar(200) NOT NULL DEFAULT '0',
  `user_id` int(10) UNSIGNED NOT NULL DEFAULT 0,
  `used` tinyint(3) UNSIGNED NOT NULL DEFAULT 0
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- --------------------------------------------------------

--
-- Table structure for table `subjects`
--

CREATE TABLE `subjects` (
  `id` int(10) UNSIGNED NOT NULL,
  `description` varchar(50) DEFAULT '0'
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `subjects`
--

INSERT INTO `subjects` (`id`, `description`) VALUES
(10, 'Algebra Linear I'),
(11, 'Algebra Linear II'),
(12, 'Algebra Linear III'),
(13, 'Matemática Discreta'),
(15, 'Robótica'),
(17, 'Física'),
(18, 'Programação Web'),
(19, 'Programação Mobile'),
(20, 'Programação Desktop'),
(21, 'Banco de Dados');

-- --------------------------------------------------------

--
-- Table structure for table `users`
--

CREATE TABLE `users` (
  `id` int(10) UNSIGNED NOT NULL,
  `name` varchar(50) DEFAULT '0',
  `email` varchar(150) NOT NULL DEFAULT '0',
  `password` varchar(200) NOT NULL DEFAULT '0',
  `role` int(11) NOT NULL DEFAULT 0,
  `course` int(10) DEFAULT 0,
  `ra` varchar(10) DEFAULT '0'
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `users`
--

INSERT INTO `users` (`id`, `name`, `email`, `password`, `role`, `course`, `ra`) VALUES
(10, 'Root ABC', 'root@email.com', '$2b$10$YWwLnYMr3ddctmr5Vn2lHOViDEIhDii8dkOYEUxm7WZ.YsB/vtZUO', 1, 13, '90123'),
(11, 'Zé da Silva Saure', 'ze_up@email.com', '$2b$10$uwNnasJSGhLNhupG0yH8qO35mBbWRsA8LSRjlmoB.lmXQOcx84/7S', 0, 14, '123480'),
(12, 'Teste', 'teste@email.com', '$2b$10$LeQNO2lR0LfqwAWn5Wc0Uem8wwgWwhmNRSnxx5e3zziPHB5mAYP.W', 0, 11, '999999'),
(13, 'aa', 'aa@aa.com', '$2b$10$RSVLNIC9A4Ly3jjdtyrrRec/Vw0GIAlG1DN5RqRrCiz7FB66MRwoi', 2, 11, '111111'),
(14, 'bbb', 'bbb@bbb.com', '$2b$10$PO2HFM6aOmd40VEaks4OYu.zHHnjVY2x7ytXowVTzbaj7EkZ5mI8q', 0, 11, '111122'),
(15, 'ccc', 'ccc@ccc.com', '$2b$10$PXqJMpkc5aGcY6/0srGDTOOl1pigjuAM8pxOExTesGUHKZbkHpbYu', 0, 11, '123452'),
(16, 'Outro root', 'aroot@email.cm', '$2b$10$Hlk6pajMeoRT3lZNCnpiROfqRzLVptParuftA0h1j5EUydBbAAOMO', 1, 11, '123456'),
(17, 'Testeasd', 'a@am.com', '$2b$10$zDSAgZ2K3POMXV15LcRCsem9XB8h4m6zMdY2QBot.MBtr/oX0ip1O', 0, 14, '123657'),
(18, 'outro', 'outro@a.com', '$2b$10$QXiMeND8520I5KDruxF.s.FjmkbrwdiroOlKdHklvhctAhl7BlA/S', 0, 11, '456789'),
(19, 'Professor', 'prof@prof.edu', '$2b$10$0wm1mRJvdGum0CeW4Tt3R.B18RrPiiREE/qATp7zZqv1Nh9wDRgJS', 2, 11, '123856');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `articles`
--
ALTER TABLE `articles`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `categories`
--
ALTER TABLE `categories`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `courses`
--
ALTER TABLE `courses`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `passwordtokens`
--
ALTER TABLE `passwordtokens`
  ADD PRIMARY KEY (`id`),
  ADD KEY `FK_passwordtokens_users` (`user_id`);

--
-- Indexes for table `subjects`
--
ALTER TABLE `subjects`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `users`
--
ALTER TABLE `users`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `email` (`email`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `articles`
--
ALTER TABLE `articles`
  MODIFY `id` int(10) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=48;

--
-- AUTO_INCREMENT for table `categories`
--
ALTER TABLE `categories`
  MODIFY `id` int(10) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=23;

--
-- AUTO_INCREMENT for table `courses`
--
ALTER TABLE `courses`
  MODIFY `id` int(10) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=18;

--
-- AUTO_INCREMENT for table `passwordtokens`
--
ALTER TABLE `passwordtokens`
  MODIFY `id` int(10) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- AUTO_INCREMENT for table `subjects`
--
ALTER TABLE `subjects`
  MODIFY `id` int(10) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=22;

--
-- AUTO_INCREMENT for table `users`
--
ALTER TABLE `users`
  MODIFY `id` int(10) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=20;

--
-- Constraints for dumped tables
--

--
-- Constraints for table `passwordtokens`
--
ALTER TABLE `passwordtokens`
  ADD CONSTRAINT `FK_passwordtokens_users` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`) ON DELETE CASCADE ON UPDATE CASCADE;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;

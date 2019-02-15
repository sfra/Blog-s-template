-- phpMyAdmin SQL Dump
-- version 4.5.4.1deb2ubuntu2
-- http://www.phpmyadmin.net
--
-- Host: localhost
-- Czas generowania: 06 Sie 2018, 21:58
-- Wersja serwera: 5.7.22-0ubuntu0.16.04.1
-- Wersja PHP: 7.0.30-0ubuntu0.16.04.1

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Baza danych: `02`
--

-- --------------------------------------------------------

--
-- Struktura tabeli dla tabeli `categories`
--

CREATE TABLE `categories` (
  `id` int(10) NOT NULL,
  `name` varchar(50) COLLATE utf8_polish_ci NOT NULL,
`subname` varchar(30) COLLATE utf8_polish_ci NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_polish_ci;



--
-- Struktura tabeli dla tabeli `content`
--

CREATE TABLE `content` (
  `id` int(10) NOT NULL,
  `text` varchar(2000) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;



--
-- Struktura tabeli dla tabeli `forum`
--

CREATE TABLE `forum` (
  `id` int(10) NOT NULL,
  `content` varchar(600) COLLATE utf8_polish_ci NOT NULL,
  `date` datetime DEFAULT NULL,
  `users_id` int(10) NOT NULL,
  `posts_id` int(10) DEFAULT NULL,
  `prev_forum_id` int(10) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_polish_ci;


--
-- Wyzwalacze `forum`
--
DELIMITER $$
CREATE TRIGGER `setParent` AFTER INSERT ON `forum` FOR EACH ROW BEGIN
 set @prev_forum_id = new.prev_forum_id;
    SELECT 1
    INTO @prev_forum_id
       FROM forum_has_childrens
       WHERE forum_has_childrens.forum_id = @prev_forum_id;
 
 -- update forum_has_childrens set forum_has_childrens.has_childrens=1 where id =@prev_forum_id;
END
$$
DELIMITER ;

-- --------------------------------------------------------

--
-- Struktura tabeli dla tabeli `forum_has_childrens`
--

CREATE TABLE `forum_has_childrens` (
  `id` int(10) NOT NULL,
  `has_children` int(2) NOT NULL,
  `forum_id` int(10) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_polish_ci;



--
-- Struktura tabeli dla tabeli `nr`
--

CREATE TABLE `nr` (
  `id` int(10) NOT NULL,
  `name` varchar(30) NOT NULL,
  `id_content` int(10) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Zrzut danych tabeli `nr`
--

INSERT INTO `nr` (`id`, `name`, `id_content`) VALUES
(1, 'Welcome', 1),
(2, 'Clients', 2),
(3, 'News', 3),
(4, 'Contact', 4);

-- --------------------------------------------------------

--
-- Struktura tabeli dla tabeli `permissions`
--

CREATE TABLE `permissions` (
  `id` int(10) NOT NULL,
  `name` varchar(100) COLLATE utf8_polish_ci NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_polish_ci;

--
-- Zrzut danych tabeli `permissions`
--

INSERT INTO `permissions` (`id`, `name`) VALUES
(1, 'admin'),
(2, 'user');

-- --------------------------------------------------------

--
-- Struktura tabeli dla tabeli `permissions_users`
--

CREATE TABLE `permissions_users` (
  `id` int(10) NOT NULL,
  `permissions_id` int(10) NOT NULL,
  `users_id` int(10) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_polish_ci;



--
-- Struktura tabeli dla tabeli `posts`
--

CREATE TABLE `posts` (
  `id` int(30) NOT NULL,
  `title` varchar(50) COLLATE utf8_unicode_ci NOT NULL,
  `content` varchar(3000) CHARACTER SET utf16 COLLATE utf16_polish_ci NOT NULL,
  `shorter` varchar(200) COLLATE utf8_unicode_ci NOT NULL,
  `mainImage` varchar(1000) COLLATE utf8_unicode_ci DEFAULT NULL,
  `time` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `prev_id` int(30) DEFAULT NULL,
  `id_users` int(10) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;



--
-- Struktura tabeli dla tabeli `posts_categories`
--

CREATE TABLE `posts_categories` (
  `id` int(10) NOT NULL,
  `id_posts` int(10) NOT NULL,
  `id_categories` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_polish_ci;

--
-- Zrzut danych tabeli `posts_categories`
--

INSERT INTO `posts_categories` (`id`, `id_posts`, `id_categories`) VALUES
(10, 10, 2),
(22, 73, 2);

-- --------------------------------------------------------

--
-- Struktura tabeli dla tabeli `preregistered`
--

CREATE TABLE `preregistered` (
  `id` int(10) NOT NULL,
  `login` varchar(40) COLLATE utf8_polish_ci DEFAULT NULL,
  `hash_password` varchar(130) COLLATE utf8_polish_ci DEFAULT NULL,
  `salt` varchar(10) COLLATE utf8_polish_ci DEFAULT NULL,
  `email` varchar(70) COLLATE utf8_polish_ci DEFAULT NULL,
  `link` varchar(50) COLLATE utf8_polish_ci DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_polish_ci;

-- --------------------------------------------------------

--
-- Struktura tabeli dla tabeli `users`
--

CREATE TABLE `users` (
  `id` int(10) NOT NULL,
  `login` varchar(40) COLLATE utf8_polish_ci NOT NULL,
  `email` varchar(100) COLLATE utf8_polish_ci NOT NULL,
  `hash_password` varchar(130) COLLATE utf8_polish_ci DEFAULT NULL,
  `salt` varchar(10) COLLATE utf8_polish_ci DEFAULT NULL,
  `permissions_id` int(10) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_polish_ci;



--
-- Indeksy dla zrzutów tabel
--

--
-- Indexes for table `categories`
--
ALTER TABLE `categories`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `content`
--
ALTER TABLE `content`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `forum`
--
ALTER TABLE `forum`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `forum_has_childrens`
--
ALTER TABLE `forum_has_childrens`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `nr`
--
ALTER TABLE `nr`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `permissions`
--
ALTER TABLE `permissions`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `permissions_users`
--
ALTER TABLE `permissions_users`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `posts`
--
ALTER TABLE `posts`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `posts_categories`
--
ALTER TABLE `posts_categories`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `preregistered`
--
ALTER TABLE `preregistered`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `users`
--
ALTER TABLE `users`
  ADD PRIMARY KEY (`id`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT dla tabeli `categories`
--
ALTER TABLE `categories`
  MODIFY `id` int(10) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=10;
--
-- AUTO_INCREMENT dla tabeli `content`
--
ALTER TABLE `content`
  MODIFY `id` int(10) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5;
--
-- AUTO_INCREMENT dla tabeli `forum`
--
ALTER TABLE `forum`
  MODIFY `id` int(10) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=37;
--
-- AUTO_INCREMENT dla tabeli `forum_has_childrens`
--
ALTER TABLE `forum_has_childrens`
  MODIFY `id` int(10) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=20;
--
-- AUTO_INCREMENT dla tabeli `nr`
--
ALTER TABLE `nr`
  MODIFY `id` int(10) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5;
--
-- AUTO_INCREMENT dla tabeli `permissions`
--
ALTER TABLE `permissions`
  MODIFY `id` int(10) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;
--
-- AUTO_INCREMENT dla tabeli `permissions_users`
--
ALTER TABLE `permissions_users`
  MODIFY `id` int(10) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=8;
--
-- AUTO_INCREMENT dla tabeli `posts`
--
ALTER TABLE `posts`
  MODIFY `id` int(30) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=74;
--
-- AUTO_INCREMENT dla tabeli `posts_categories`
--
ALTER TABLE `posts_categories`
  MODIFY `id` int(10) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=23;
--
-- AUTO_INCREMENT dla tabeli `preregistered`
--
ALTER TABLE `preregistered`
  MODIFY `id` int(10) NOT NULL AUTO_INCREMENT;
--
-- AUTO_INCREMENT dla tabeli `users`
--
ALTER TABLE `users`
  MODIFY `id` int(10) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=111;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;

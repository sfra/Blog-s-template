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
  `name` varchar(50) COLLATE utf8_polish_ci NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_polish_ci;

--
-- Zrzut danych tabeli `categories`
--

INSERT INTO `categories` (`id`, `name`) VALUES
(1, 'przystawki'),
(2, 'zupy'),
(3, 'drugie dania'),
(4, 'desery'),
(5, 'salsas y salsas'),
(6, 'kolacje'),
(7, 'przekąski'),
(8, 'święta'),
(9, 'inne');

-- --------------------------------------------------------

--
-- Struktura tabeli dla tabeli `content`
--

CREATE TABLE `content` (
  `id` int(10) NOT NULL,
  `text` varchar(2000) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Zrzut danych tabeli `content`
--

INSERT INTO `content` (`id`, `text`) VALUES
(1, 'A US citizen, lobbyist and former Soviet military officer, Rinat Akhmetshin\'s presence at the closed-door meeting in Trump Tower has drawn fresh scrutiny on the purpose of the meeting, which was pitched to Donald Trump Jr. as an opportunity to receive incriminating information from the Russian government about Hillary Clinton.\r\nAccording to Trump Jr., the meeting quickly turned to the question of the Russian ban on Americans adopting children from Russia, a retaliatory measure Moscow put in place following the passage of the US Magnitsky Act, the 2012 law that blacklisted some Russians for alleged human rights violations.'),
(2, 'Did the former president pose for the photo just for the pun? It could be. Or maybe he just felt overlooked as he gazed up at the ginormous statues of the two former leaders of the free world looming over him.\r\nEither way, there\'s little doubt that this picture will go down as one of the top presidential memes.\r\n<form action=\\"run_form.php\\">\r\n<input type=\\"text\\" />\r\n<input type=\\"text\\" />\r\n<button>send</button>\r\n</form>'),
(3, 'Last month, Therese embarked on a challenge to read 100 nonfiction titles with the Blinkist app. Here\'s how she did. \r\n\r\n'),
(4, '102 to be exact. It might sound like a lot, but the Blinkist packs take only 10-15 minutes to read. I read roughly 3 titles a day, mostly during commutes.\r\n');

-- --------------------------------------------------------

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
-- Zrzut danych tabeli `forum`
--

INSERT INTO `forum` (`id`, `content`, `date`, `users_id`, `posts_id`, `prev_forum_id`) VALUES
(1, 'Zrobiłam tą zupę. Palce lizać.', '2018-07-26 14:52:35', 110, 10, NULL),
(2, 'Sam jesteś gówno. Bardzo dobra zupa.\r\n', '2018-07-26 14:57:54', 109, 10, 1),
(3, 'Mi nie smakowała. Zwykłe gówno.', '2018-07-26 14:57:24', 108, 10, 1),
(4, 'Zajebiście dobra zupa. Nigdy wcześniej nie żarłem czegoś takiego. Jeszcze chwilę i się posram na samą myśl o niej.', '2018-07-26 18:41:09', 93, 10, NULL),
(5, 'Zjedz je równo.', '2018-07-31 10:57:21', 93, 10, 3),
(35, 'Ma rację. Zwykłe gówno.', '2018-08-01 21:01:19', 90, 10, 2),
(36, 'Co lizać?', '2018-08-02 16:01:26', 90, 10, 1);

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
-- Zrzut danych tabeli `forum_has_childrens`
--

INSERT INTO `forum_has_childrens` (`id`, `has_children`, `forum_id`) VALUES
(1, 1, 1),
(2, 1, 2),
(3, 1, 3),
(4, 0, 4),
(5, 0, 5),
(18, 0, 35),
(19, 0, 36);

-- --------------------------------------------------------

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
-- Zrzut danych tabeli `permissions_users`
--

INSERT INTO `permissions_users` (`id`, `permissions_id`, `users_id`) VALUES
(1, 1, 93),
(2, 1, 90),
(3, 2, 106),
(5, 2, 108),
(6, 2, 109),
(7, 2, 110);

-- --------------------------------------------------------

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
-- Zrzut danych tabeli `posts`
--

INSERT INTO `posts` (`id`, `title`, `content`, `shorter`, `mainImage`, `time`, `prev_id`, `id_users`) VALUES
(10, 'Pikantna zupa meksykańska', 'Pyszna, wyjątkowa, sycąca, rozgrzewająca... To tylko nieliczne przymiotniki, jakich można użyć do opisania tej zupy. Połączenie prostych składników takich jak cebula, ziemniaki, fasola, papryka i mielone mięso wołowe sprawia, że jest ona niepowtarzalna w smaku. Po ugotowaniu zupa powinna "postać" jeszcze około 2-3 godzin przed podaniem, żeby się "ustała". Przed samym podaniem należy ją ponownie podgotować i podawać posypaną tartym serem. Takie podanie nadaje jej dodatkowego charakteru. Zupa idealnie nadaje się na małe przyjęcie ze znajomymi jako wstęp do "tequili" :)<br/>zupa meksykańska 1</br><br />Składniki zupy meksykańskiej:<br />3 średniej wielkości ziemniaki<br/ >1 mała cebula pokrojona w piórka<br />2 litry bulionu drobiowego lub wołowego (opcjonalnie 2 litry wody i dwie kostki rosołowe)<br />3-4 czubate łyżeczki koncentratu pomidorowego<br />1/3 papryki czerwonej pokrojonej w drobną kostkę<br />1/3 papryki zielonej pokrojonej w drobną kostkę<br />1/3 papryki żółtej pokrojonej w drobną kostkę<br />1 papryczka jalapeno (bez nasionek)<br />1 puszka czerwonej fasoli<br />1 puszka kukurydzy<br />400-500 gram mielonego mięsa wołowego<br />ser zółty tarty typu cheddar<br />pół łyżeczki kminu rzymskiego<br />pół łyżeczki słodkiej papryki w proszku<br />sól, pieprz do smaku', 'Pyszna, wyjątkowa, sycąca, rozgrzewająca... To tylko nieliczne przymiotniki, jakich można użyć do opisania tej zupy.', '', '2018-07-24 13:11:25', NULL, NULL),
(73, 'pomidorówka', 'Zupę pomidorową najczęściej przygotowuje się z ugotowanego dzień wcześniej rosołu. Do rosołu (może być zimny) dodajemy koncentrat pomidorowy i śmietanę i dokładnie mieszamy. Podgrzewamy na małym ogniu co chwilę mieszając. Poniżej przepis jak przygotować zupę pomidorową od samego początku.<br />SKŁADNIKI<br /><ul><li>ćwiartka kurczaka</li><li>2 litry wody</li><li>1/2 łyżeczki soli</li><li>włoszczyzna (marchewka, pietruszka, kawałeczek pora, plasterek selera)</li><li>200 g koncentratu pomidorowego w słoiczku*</li>v250 ml śmietany 18% z kartonika (do zup i sosów)</li> <li>szczypta zmielonego pieprzu</li></ul>', '', '', '2018-07-24 19:17:55', NULL, 90);

-- --------------------------------------------------------

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
-- Zrzut danych tabeli `users`
--

INSERT INTO `users` (`id`, `login`, `email`, `hash_password`, `salt`, `permissions_id`) VALUES
(90, 'root1', 'ad@wp.pl', '83ff18a83fc0629568981602033b600209a7d272b780673a8ce3bfdeed68f5148e5c719cb51c29dade84c4badaf2b358c8e9803b4374d21b679d40bf1ee48961', 'S9VPwT52Uw', 2),
(93, 'root', 'admin@wp.pl', '255cff8fe26fc6b62f12b4f11b532b4cc4eb4de1fb17afe38157b8057345d783e57f3077079cc7e6620bc8bcad9bc12dbd9bcf3f817421567a6c74c1840e4a15', 'QqvWKoEsT4', 2),
(106, 'szymon8', 'as@wp.pl', 'ca6ebdc7616a60fd4f1f92e294348672b81fc6bed7912f6598083292e7b7fcf0246a508662fe554ae849304d8e04f747cfb6771fbed64e1f757d0024fffec658', 'cK3nRZ2iay', 2),
(108, 'mariusz', 'mariusz@wp.pl', '4bba2107d7b050704a04f8078d310b4fdc5ca630321f0f429fe92ae91468c38ddded5ab858ea531960b213a7dd0406ab8f73c206005af943a66e1a9133b9f09f', 'MTNbjErkCv', 2),
(109, 'patryk', 'patryk@wp.pl', 'd7375182fae290c5c24267fb841eec3a3dda197fae61cda491740ae7c697845bbb07daa124dfed951959e7741bdcd1451737c845e013a1b4798da823131d733c', 'r4Oeg7THrv', 2),
(110, 'marta', 'marta@wp.pl', 'e66490e19845f7bfec265a7c359f5264381e48bad52c6221f5197db9c4af46427383ffcc6907568137fb9b7dab18d02ff22fde7230569b7a48e19d5207bf29e9', 'MCczw5xdUJ', 2);

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

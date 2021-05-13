-- phpMyAdmin SQL Dump
-- version 4.9.5
-- https://www.phpmyadmin.net/
--
-- Хост: localhost:3306
-- Время создания: Авг 24 2020 г., 16:59
-- Версия сервера: 5.7.31-cll-lve
-- Версия PHP: 7.3.6

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET AUTOCOMMIT = 0;
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- База данных: `hehmdetk_kvjew`
--

-- --------------------------------------------------------

--
-- Структура таблицы `Jewelery`
--

CREATE TABLE `Jewelery` (
  `Cringe` int(1) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- --------------------------------------------------------

--
-- Структура таблицы `rings`
--

CREATE TABLE `rings` (
  `newid` int(10) UNSIGNED NOT NULL,
  `vendorcode` smallint(6) NOT NULL,
  `name` varchar(100) NOT NULL,
  `price` double NOT NULL,
  `stock` double DEFAULT NULL,
  `availability` tinyint(1) NOT NULL DEFAULT '0',
  `weight` decimal(10,0) NOT NULL,
  `metal` varchar(20) NOT NULL,
  `image` text NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Дамп данных таблицы `rings`
--

INSERT INTO `rings` (`newid`, `vendorcode`, `name`, `price`, `stock`, `availability`, `weight`, `metal`, `image`) VALUES
(1, 12, 'Золотое обручальное кольцо', 1590, NULL, 0, 2, 'Золото', '12.jpg'),
(2, 111, 'Серебряное обручальное кольцо с фианитами', 1018, 673, 0, 1, 'Серебро', '111.jpg'),
(5, 417, 'Золотое обручальное кольцо в комбинированном цвете', 4750, NULL, 0, 5, 'Золото 585', '417.jpg'),
(6, 370, 'Узорное обручальное кольцо из золота и серебра с бриллиантами ', 23000, NULL, 0, 5, 'Золото, Серебро', '370.png'),
(9, 433, 'Золотое кольцо с дорожкой из бриллиантов', 23300, 21000, 0, 5, 'Белое золото', '433.jpg'),
(10, 488, 'Серебряное кольцо с бриллиантом ', 12700, NULL, 0, 4, 'Серебро', '488.jpg'),
(11, 710, 'Серебряное обручальное кольцо', 770, NULL, 0, 9, 'Серебро', '710.png');

--
-- Индексы сохранённых таблиц
--

--
-- Индексы таблицы `rings`
--
ALTER TABLE `rings`
  ADD PRIMARY KEY (`newid`);

--
-- AUTO_INCREMENT для сохранённых таблиц
--

--
-- AUTO_INCREMENT для таблицы `rings`
--
ALTER TABLE `rings`
  MODIFY `newid` int(10) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=12;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;

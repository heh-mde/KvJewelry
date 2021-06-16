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
-- Структура таблицы `jewelry`
--

CREATE TABLE `jewelry` (
  `newid` int(10) UNSIGNED NOT NULL PRIMARY KEY,
  `type` varchar(15) NOT NULL,
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
-- Дамп данных таблицы `jewelry`
--

INSERT INTO `jewelry` (`newid`, `type`, `vendorcode`, `name`, `price`, `stock`, `availability`, `weight`, `metal`, `image`) VALUES
(1, 'ring',  12, 'Золотое обручальное кольцо', 1590, NULL, 1, 2, 'yl_gold', '12.jpg'),
(2, 'ring', 111, 'Серебряное обручальное кольцо с фианитами', 1018, 673, 1, 1, 'silver', '111.jpg'),
(5, 'ring', 417, 'Золотое обручальное кольцо в комбинированном цвете', 4750, NULL, 1, 5, 'yl_gold', '417.jpg'),
(6, 'ring', 370, 'Узорное обручальное кольцо из золота и серебра с бриллиантами ', 23000, NULL, 1, 5, 'yl_gold, silver', '370.png'),
(9, 'ring', 433, 'Золотое кольцо с дорожкой из бриллиантов', 23300, 21000, 1, 5, 'wh_gold', '433.jpg'),
(10, 'ring', 488, 'Серебряное кольцо с бриллиантом ', 12700, NULL, 1, 4, 'silver', '488.jpg'),
(11, 'ring', 710, 'Серебряное обручальное кольцо', 770, NULL, 1, 9, 'silver', '710.png'),
(12, 'ring', 890, 'Платиновая срака', 1200, NULL, 1, 9, 'platin', '710.png');

--
-- Индексы сохранённых таблиц
--

--
-- Индексы таблицы `rings`
--
ALTER TABLE `jewelry`
  ADD PRIMARY KEY (`newid`);

--
-- AUTO_INCREMENT для сохранённых таблиц
--

--
-- AUTO_INCREMENT для таблицы `rings`
--
ALTER TABLE `jewelry`
  MODIFY `newid` int(10) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=1;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;

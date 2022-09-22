SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET time_zone = "+00:00";

--
-- Database: `url_shortener`
--
CREATE DATABASE IF NOT EXISTS `url_shortener` DEFAULT CHARACTER SET utf8 COLLATE utf8_general_ci;
USE `url_shortener`;

-- --------------------------------------------------------

DROP TABLE IF EXISTS `url`;

--
-- Table structure for table `url`
--

CREATE TABLE `url` (
  `url_code` varchar(21) NOT NULL PRIMARY KEY,
  `short_url` varchar(50) DEFAULT NULL,
  `long_url` varchar(100) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;
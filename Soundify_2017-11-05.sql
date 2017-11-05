# ************************************************************
# Sequel Pro SQL dump
# Version 4541
#
# http://www.sequelpro.com/
# https://github.com/sequelpro/sequelpro
#
# Host: 127.0.0.1 (MySQL 5.7.18)
# Database: Soundify
# Generation Time: 2017-11-05 20:13:13 +0000
# ************************************************************


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;


# Dump of table Album
# ------------------------------------------------------------

DROP TABLE IF EXISTS `Album`;

CREATE TABLE `Album` (
  `al_id` int(25) unsigned NOT NULL,
  `title` varchar(60) NOT NULL DEFAULT '',
  `ar_id` int(25) unsigned NOT NULL,
  `date` year(4) DEFAULT NULL,
  PRIMARY KEY (`al_id`),
  KEY `Album-Artist` (`ar_id`),
  CONSTRAINT `Album-Artist` FOREIGN KEY (`ar_id`) REFERENCES `Artist` (`ar_id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8;



# Dump of table Artist
# ------------------------------------------------------------

DROP TABLE IF EXISTS `Artist`;

CREATE TABLE `Artist` (
  `ar_id` int(25) unsigned NOT NULL,
  `name` varchar(60) NOT NULL DEFAULT '',
  `description` longtext,
  PRIMARY KEY (`ar_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;



# Dump of table Following
# ------------------------------------------------------------

DROP TABLE IF EXISTS `Following`;

CREATE TABLE `Following` (
  `follower` int(25) unsigned NOT NULL,
  `followed` int(25) unsigned NOT NULL,
  PRIMARY KEY (`follower`,`followed`),
  KEY `Followed-User` (`followed`),
  CONSTRAINT `Followed-User` FOREIGN KEY (`followed`) REFERENCES `User` (`us_id`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `Following-User` FOREIGN KEY (`follower`) REFERENCES `User` (`us_id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8;



# Dump of table Playlist
# ------------------------------------------------------------

DROP TABLE IF EXISTS `Playlist`;

CREATE TABLE `Playlist` (
  `pl_id` int(25) unsigned NOT NULL,
  `us_id` int(25) unsigned NOT NULL,
  `name` varchar(25) NOT NULL DEFAULT '',
  PRIMARY KEY (`pl_id`),
  KEY `Playlist-User` (`us_id`),
  CONSTRAINT `Playlist-User` FOREIGN KEY (`us_id`) REFERENCES `User` (`us_id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8;



# Dump of table PlaylistSong
# ------------------------------------------------------------

DROP TABLE IF EXISTS `PlaylistSong`;

CREATE TABLE `PlaylistSong` (
  `pl_id` int(25) unsigned NOT NULL,
  `so_id` int(25) unsigned NOT NULL,
  PRIMARY KEY (`pl_id`,`so_id`),
  KEY `PlaylistSong-Song` (`so_id`),
  CONSTRAINT `PlaylistSong-Playlist` FOREIGN KEY (`pl_id`) REFERENCES `Playlist` (`pl_id`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `PlaylistSong-Song` FOREIGN KEY (`so_id`) REFERENCES `Song` (`so_id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8;



# Dump of table Queue
# ------------------------------------------------------------

DROP TABLE IF EXISTS `Queue`;

CREATE TABLE `Queue` (
  `us_id` int(25) unsigned NOT NULL,
  `so_id` int(25) unsigned NOT NULL,
  `position` int(11) NOT NULL,
  PRIMARY KEY (`us_id`,`so_id`,`position`),
  KEY `Queue-Song` (`so_id`),
  CONSTRAINT `Queue-Song` FOREIGN KEY (`so_id`) REFERENCES `Song` (`so_id`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `Queue-User` FOREIGN KEY (`us_id`) REFERENCES `User` (`us_id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8;



# Dump of table Song
# ------------------------------------------------------------

DROP TABLE IF EXISTS `Song`;

CREATE TABLE `Song` (
  `so_id` int(25) unsigned NOT NULL,
  `title` varchar(60) NOT NULL DEFAULT '',
  `ar_id` int(25) unsigned NOT NULL,
  `al_id` int(25) unsigned NOT NULL,
  `popularity` float DEFAULT NULL,
  `link` text NOT NULL,
  `genre` varchar(25) NOT NULL DEFAULT 'Unknown',
  PRIMARY KEY (`so_id`),
  KEY `Song-Artist` (`ar_id`),
  CONSTRAINT `Song-Album` FOREIGN KEY (`so_id`) REFERENCES `Album` (`al_id`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `Song-Artist` FOREIGN KEY (`ar_id`) REFERENCES `Artist` (`ar_id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8;



# Dump of table User
# ------------------------------------------------------------

DROP TABLE IF EXISTS `User`;

CREATE TABLE `User` (
  `us_id` int(25) unsigned NOT NULL,
  `username` varchar(25) NOT NULL DEFAULT '',
  `password` varchar(25) NOT NULL DEFAULT '',
  PRIMARY KEY (`us_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;




/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;
/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;

CREATE TABLE `Artist` (
  `ar_id` varchar(36) unsigned NOT NULL,
  `name` varchar(60) NOT NULL DEFAULT '',
  `description` longtext,
  PRIMARY KEY (`ar_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

CREATE TABLE `Album` (
  `al_id` varchar(36) unsigned NOT NULL,
  `title` varchar(60) NOT NULL DEFAULT '',
  `ar_id` varchar(36) unsigned NOT NULL,
  `date` year(4) DEFAULT NULL,
  PRIMARY KEY (`al_id`),
  KEY `Album-Artist` (`ar_id`),
  CONSTRAINT `Album-Artist` FOREIGN KEY (`ar_id`) REFERENCES `Artist` (`ar_id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

CREATE TABLE `User` (
  `us_id` varchar(36) unsigned NOT NULL,
  `username` varchar(25) NOT NULL DEFAULT '',
  `password` varchar(25) NOT NULL DEFAULT '',
  PRIMARY KEY (`us_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

CREATE TABLE `Following` (
  `follower` varchar(36) unsigned NOT NULL,
  `followed` varchar(36) unsigned NOT NULL,
  PRIMARY KEY (`follower`,`followed`),
  KEY `Followed-User` (`followed`),
  CONSTRAINT `Followed-User` FOREIGN KEY (`followed`) REFERENCES `User` (`us_id`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `Following-User` FOREIGN KEY (`follower`) REFERENCES `User` (`us_id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

CREATE TABLE `Playlist` (
  `pl_id` varchar(36) unsigned NOT NULL,
  `us_id` varchar(36) unsigned NOT NULL,
  `name` varchar(25) NOT NULL DEFAULT '',
  PRIMARY KEY (`pl_id`),
  KEY `Playlist-User` (`us_id`),
  CONSTRAINT `Playlist-User` FOREIGN KEY (`us_id`) REFERENCES `User` (`us_id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

CREATE TABLE `Song` (
  `so_id` varchar(36) unsigned NOT NULL,
  `title` varchar(60) NOT NULL DEFAULT '',
  `ar_id` varchar(36) unsigned NOT NULL,
  `al_id` varchar(36) unsigned NOT NULL,
  `popularity` float DEFAULT NULL,
  `link` text NOT NULL,
  `genre` varchar(25) NOT NULL DEFAULT 'Unknown',
  PRIMARY KEY (`so_id`),
  KEY `Song-Artist` (`ar_id`),
  CONSTRAINT `Song-Album` FOREIGN KEY (`al_id`) REFERENCES `Album` (`al_id`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `Song-Artist` FOREIGN KEY (`ar_id`) REFERENCES `Artist` (`ar_id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

CREATE TABLE `PlaylistSong` (
  `pl_id` varchar(36) unsigned NOT NULL,
  `so_id` varchar(36) unsigned NOT NULL,
  PRIMARY KEY (`pl_id`,`so_id`),
  KEY `PlaylistSong-Song` (`so_id`),
  CONSTRAINT `PlaylistSong-Playlist` FOREIGN KEY (`pl_id`) REFERENCES `Playlist` (`pl_id`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `PlaylistSong-Song` FOREIGN KEY (`so_id`) REFERENCES `Song` (`so_id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

CREATE TABLE `Queue` (
  `us_id` varchar(36) unsigned NOT NULL,
  `so_id` varchar(36) unsigned NOT NULL,
  `position` int(11) NOT NULL,
  PRIMARY KEY (`us_id`,`so_id`,`position`),
  KEY `Queue-Song` (`so_id`),
  CONSTRAINT `Queue-Song` FOREIGN KEY (`so_id`) REFERENCES `Song` (`so_id`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `Queue-User` FOREIGN KEY (`us_id`) REFERENCES `User` (`us_id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

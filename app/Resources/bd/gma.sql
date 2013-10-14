/*
SQLyog Ultimate v10.5 
MySQL - 5.5.16 : Database - gma
*********************************************************************
*/

/*!40101 SET NAMES utf8 */;

/*!40101 SET SQL_MODE=''*/;

/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;
CREATE DATABASE /*!32312 IF NOT EXISTS*/`gma` /*!40100 DEFAULT CHARACTER SET utf8 */;

USE `gma`;

/*Table structure for table `city` */

DROP TABLE IF EXISTS `city`;

CREATE TABLE `city` (
  `id` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `city` varchar(255) NOT NULL,
  `country_id` int(10) unsigned NOT NULL,
  `created_at` datetime DEFAULT NULL,
  `modified_at` datetime DEFAULT NULL,
  PRIMARY KEY (`id`,`city`,`country_id`),
  KEY `FK_city__country_id` (`country_id`),
  CONSTRAINT `FK_city__country_id` FOREIGN KEY (`country_id`) REFERENCES `country` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

/*Data for the table `city` */

/*Table structure for table `country` */

DROP TABLE IF EXISTS `country`;

CREATE TABLE `country` (
  `id` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `country` varchar(150) DEFAULT NULL,
  `code` varchar(3) DEFAULT NULL,
  `created_at` datetime DEFAULT NULL,
  `modified_at` datetime DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=13 DEFAULT CHARSET=utf8;

/*Data for the table `country` */

insert  into `country`(`id`,`country`,`code`,`created_at`,`modified_at`) values (1,'Argentina','ARG','2013-10-14 01:14:07',NULL);
insert  into `country`(`id`,`country`,`code`,`created_at`,`modified_at`) values (2,'Bolivia','BOL','2013-10-14 01:14:07',NULL);
insert  into `country`(`id`,`country`,`code`,`created_at`,`modified_at`) values (3,'Brasil','BRA','2013-10-14 01:14:07',NULL);
insert  into `country`(`id`,`country`,`code`,`created_at`,`modified_at`) values (4,'Chile','CHL','2013-10-14 01:14:07',NULL);
insert  into `country`(`id`,`country`,`code`,`created_at`,`modified_at`) values (5,'Colombia','COL','2013-10-14 01:14:07',NULL);
insert  into `country`(`id`,`country`,`code`,`created_at`,`modified_at`) values (6,'Costa Rica','CRI','2013-10-14 01:14:07',NULL);
insert  into `country`(`id`,`country`,`code`,`created_at`,`modified_at`) values (7,'Ecuador','ECU','2013-10-14 01:14:07',NULL);
insert  into `country`(`id`,`country`,`code`,`created_at`,`modified_at`) values (8,'Guatemala','GTM','2013-10-14 01:14:07',NULL);
insert  into `country`(`id`,`country`,`code`,`created_at`,`modified_at`) values (9,'México','MEX','2013-10-14 01:14:07',NULL);
insert  into `country`(`id`,`country`,`code`,`created_at`,`modified_at`) values (10,'Paraguay','PRY','2013-10-14 01:14:07',NULL);
insert  into `country`(`id`,`country`,`code`,`created_at`,`modified_at`) values (11,'Perú','PER','2013-10-14 01:14:07',NULL);
insert  into `country`(`id`,`country`,`code`,`created_at`,`modified_at`) values (12,'Uruguay','URY','2013-10-14 01:14:07',NULL);

/*Table structure for table `tip` */

DROP TABLE IF EXISTS `tip`;

CREATE TABLE `tip` (
  `id` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `tip` varchar(250) DEFAULT NULL,
  `description` text,
  `tip_type_id` mediumint(8) unsigned NOT NULL,
  `created_at` datetime DEFAULT NULL,
  `modified_at` datetime DEFAULT NULL,
  PRIMARY KEY (`id`,`tip_type_id`),
  KEY `FK_tips__tips_type_id` (`tip_type_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

/*Data for the table `tip` */

/*Table structure for table `tip_type` */

DROP TABLE IF EXISTS `tip_type`;

CREATE TABLE `tip_type` (
  `id` mediumint(8) unsigned NOT NULL AUTO_INCREMENT,
  `tip_type` varchar(100) DEFAULT NULL,
  `created_at` datetime DEFAULT NULL,
  `modified_at` datetime DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

/*Data for the table `tip_type` */

/*Table structure for table `users` */

DROP TABLE IF EXISTS `users`;

CREATE TABLE `users` (
  `id` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `facebook_id` bigint(20) unsigned NOT NULL,
  `first_name` varchar(50) DEFAULT NULL,
  `last_name` varchar(50) DEFAULT NULL,
  `email` varchar(255) NOT NULL,
  `password` varchar(50) DEFAULT NULL,
  `available` tinyint(1) DEFAULT '1',
  `created_at` datetime DEFAULT NULL,
  `modified_at` datetime DEFAULT NULL,
  PRIMARY KEY (`id`,`facebook_id`,`email`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

/*Data for the table `users` */

/*Table structure for table `users_detail` */

DROP TABLE IF EXISTS `users_detail`;

CREATE TABLE `users_detail` (
  `user_id` int(10) unsigned NOT NULL,
  `sex` varchar(1) DEFAULT NULL,
  `birthdate` date DEFAULT NULL,
  `country_id` int(10) unsigned DEFAULT NULL,
  `city_id` int(10) unsigned DEFAULT NULL,
  `image` varchar(50) DEFAULT NULL,
  `created_at` datetime DEFAULT NULL,
  `modified_at` datetime DEFAULT NULL,
  PRIMARY KEY (`user_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

/*Data for the table `users_detail` */

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

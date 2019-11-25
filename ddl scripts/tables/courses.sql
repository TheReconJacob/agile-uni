CREATE TABLE `courses` (
  `course_id` int(11) NOT NULL AUTO_INCREMENT,
  `title` varchar(45) NOT NULL,
  `description` longtext NOT NULL,
  `start_date` datetime NOT NULL,
  `end_date` datetime DEFAULT NULL,
  `attendees_max` int(11) DEFAULT NULL,
  `attendees_booked` int(11) DEFAULT NULL,
  `location` varchar(45) NOT NULL,
  `site_id` int(11) DEFAULT NULL,
  `instructor_name` varchar(45) DEFAULT NULL,
  PRIMARY KEY (`course_id`),
  KEY `site_id_idx` (`site_id`),
  CONSTRAINT `site_id` FOREIGN KEY (`site_id`) REFERENCES `sites` (`id`) ON DELETE NO ACTION ON UPDATE NO ACTION
) ENGINE=InnoDB AUTO_INCREMENT=211 DEFAULT CHARSET=latin1;
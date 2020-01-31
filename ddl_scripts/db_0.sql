CREATE TABLE `sites` (
  `id` INT UNSIGNED NOT NULL AUTO_INCREMENT PRIMARY KEY, 
  `name` VARCHAR(45) NOT NULL,
  `address` VARCHAR(45) NOT NULL
) ENGINE=InnoDB CHARSET=latin1;

CREATE TABLE `courses` (
  `id` INT UNSIGNED NOT NULL AUTO_INCREMENT PRIMARY KEY,
  `title` VARCHAR(45) NOT NULL,
  `description` LONGTEXT NOT NULL,
  `start_date` DATETIME NOT NULL,
  `end_date` DATETIME DEFAULT NULL,
  `attendees_max` INT DEFAULT NULL,
  `location` VARCHAR(45) NOT NULL,
  `site_id` INT UNSIGNED NOT NULL,
  `instructor_name` VARCHAR(45) DEFAULT NULL,

  CONSTRAINT `site_id` FOREIGN KEY (`site_id`) REFERENCES `sites` (`id`) ON DELETE NO ACTION ON UPDATE NO ACTION
) ENGINE=InnoDB CHARSET=latin1;

CREATE TABLE `course_attendees` (
  `id` INT UNSIGNED NOT NULL AUTO_INCREMENT PRIMARY KEY,
  `course_id` INT UNSIGNED NOT NULL,
  `azure_oid` VARCHAR(45) NOT NULL,
  `attended` TINYINT NOT NULL DEFAULT '0',

  CONSTRAINT `course_id` FOREIGN KEY (`course_id`) REFERENCES `courses` (`id`) ON DELETE NO ACTION ON UPDATE NO ACTION
) ENGINE=InnoDB CHARSET=latin1;

SOURCE ddl_scripts/db_0.sql;

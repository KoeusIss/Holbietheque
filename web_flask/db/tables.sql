--
-- Create countries table
--
DROP TABLE IF EXISTS `holbietheque_dev_db`.`countries`;
CREATE TABLE `holbietheque_dev_db`.`countries`
(
 `id`         varchar(60) NOT NULL ,
 `iso`        varchar(16) NOT NULL ,
 `name`       varchar(128) NOT NULL ,
 `phone_code` varchar(16) DEFAULT NULL ,
 `created_at` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP ,
 `updated_at` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP ,

PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Create states table
--
DROP TABLE IF EXISTS `holbietheque_dev_db`.`states`;
CREATE TABLE `holbietheque_dev_db`.`states`
(
 `id`         varchar(60) NOT NULL ,
 `name`       varchar(128) NOT NULL ,
 `country_id` varchar(60) NOT NULL ,
 `created_at` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP ,
 `updated_at` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP ,

PRIMARY KEY (`id`),
KEY `state_country_idx` (`country_id`),
CONSTRAINT `state_country_fk` FOREIGN KEY `state_country_idx` (`country_id`) REFERENCES `holbietheque_dev_db`.`countries` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Create address table
--
DROP TABLE IF EXISTS `holbietheque_dev_db`.`adresses`;
CREATE TABLE `holbietheque_dev_db`.`addresses`
(
 `id`          varchar(60) NOT NULL ,
 `first_line`  varchar(128) NOT NULL ,
 `second_line` varchar(128) DEFAULT NULL ,
 `city`        varchar(128) NOT NULL ,
 `zip_code`    varchar(60) NOT NULL ,
 `state_id`    varchar(60) NOT NULL ,
 `created_at`  datetime NOT NULL DEFAULT CURRENT_TIMESTAMP ,
 `updated_at`  datetime NOT NULL DEFAULT CURRENT_TIMESTAMP ,

PRIMARY KEY (`id`),
KEY `address_state_idx` (`state_id`),
CONSTRAINT `address_state_fk` FOREIGN KEY `address_state_idx` (`state_id`) REFERENCES `holbietheque_dev_db`.`states` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Create users table
--
DROP TABLE IF EXISTS `holbietheque_dev_db`.`roles`;
CREATE TABLE `holbietheque_dev_db`.`roles`
(
 `id`         varchar(60) NOT NULL ,
 `name`       varchar(128) NOT NULL ,
 `created_at` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP ,
 `updated_at` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP ,

PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Create users table
--
DROP TABLE IF EXISTS `holbietheque_dev_db`.`users`;
CREATE TABLE `holbietheque_dev_db`.`users`
(
 `id`                    varchar(60) NOT NULL ,
 `email`                 varchar(128) NOT NULL ,
 `password`              varchar(128) NOT NULL ,
 `password_confirmation` varchar(128) NOT NULL ,
 `role_id`               varchar(60) NOT NULL ,
 `created_at`            datetime NOT NULL DEFAULT CURRENT_TIMESTAMP ,
 `updated_at`            datetime NOT NULL DEFAULT CURRENT_TIMESTAMP ,

PRIMARY KEY (`id`),
KEY `user_role_idx` (`role_id`),
CONSTRAINT `user_role_fk` FOREIGN KEY `user_role_idx` (`role_id`) REFERENCES `holbietheque_dev_db`.`roles` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Create genders table
--
DROP TABLE IF EXISTS `holbietheque_dev_db`.`genders`;
CREATE TABLE `holbietheque_dev_db`.`genders`
(
 `id`         int NOT NULL,
 `name`       varchar(45) NOT NULL ,
 `created_at`      datetime NOT NULL DEFAULT CURRENT_TIMESTAMP ,
 `updated_at`      datetime NOT NULL  DEFAULT CURRENT_TIMESTAMP,

PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Create users table
--
DROP TABLE IF EXISTS `holbietheque_dev_db`.`students`;
CREATE TABLE `holbietheque_dev_db`.`students`
(
 `id`              varchar(60) NOT NULL ,
 `first_name`      varchar(128) NOT NULL ,
 `last_name`       varchar(128) NOT NULL ,
 `middle_name`     varchar(128) DEFAULT NULL ,
 `id_number`       varchar(128) NOT NULL ,
 `passport_number` varchar(128) DEFAULT NULL ,
 `driver_licence`  bit(1) NOT NULL DEFAULT b'0' ,
 `married`         bit(1) NOT NULL DEFAULT b'0' ,
 `child`           bit(1) NOT NULL DEFAULT b'0' ,
 `address_id`      varchar(60) NOT NULL ,
 `gender_id`       int NOT NULL ,
 `user_id`         varchar(60) NOT NULL ,
 `created_at`      datetime NOT NULL DEFAULT CURRENT_TIMESTAMP ,
 `updated_at`      datetime NOT NULL  DEFAULT CURRENT_TIMESTAMP,

PRIMARY KEY (`id`),
KEY `student_address_idx` (`address_id`),
CONSTRAINT `student_address_fk` FOREIGN KEY `student_address_idx` (`address_id`) REFERENCES `holbietheque_dev_db`.`addresses` (`id`),
KEY `student_gender_idx` (`gender_id`),
CONSTRAINT `student_gender_fk` FOREIGN KEY `student_gender_idx` (`gender_id`) REFERENCES `holbietheque_dev_db`.`genders` (`id`),
KEY `student_user_idx` (`user_id`),
CONSTRAINT `student_user_fk` FOREIGN KEY `student_user_idx` (`user_id`) REFERENCES `holbietheque_dev_db`.`users` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Create certeficates table
--
DROP TABLE IF EXISTS `holbietheque_dev_db`.`certificates`;
CREATE TABLE `holbietheque_dev_db`.`certificates`
(
 `id`             varchar(60) NOT NULL ,
 `name`           varchar(128) NOT NULL ,
 `authority`      varchar(128) NOT NULL ,
 `expire`         bit(1) NOT NULL DEFAULT b'0' ,
 `issued_at`      date NOT NULL ,
 `expired_at`     date DEFAULT NULL ,
 `certeficate_id` varchar(60) DEFAULT NULL ,
 `description`    varchar(255) DEFAULT NULL ,
 `student_id`     varchar(60) NOT NULL ,
 `created_at`     datetime NOT NULL DEFAULT CURRENT_TIMESTAMP ,
 `updated_at`     datetime NOT NULL DEFAULT CURRENT_TIMESTAMP ,

PRIMARY KEY (`id`),
KEY `certeficate_student_idx` (`student_id`),
CONSTRAINT `certeficate_student_fk` FOREIGN KEY `certeficate_student_idx` (`student_id`) REFERENCES `holbietheque_dev_db`.`students` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Create educations table
--
DROP TABLE IF EXISTS `holbietheque_dev_db`.`education`;
CREATE TABLE `holbietheque_dev_db`.`education`
(
 `id`          varchar(60) NOT NULL ,
 `school`      varchar(128) NOT NULL ,
 `degree`      varchar(128) NOT NULL ,
 `major`       varchar(128) DEFAULT NULL ,
 `start_at`    date NOT NULL ,
 `end_at`      date DEFAULT NULL ,
 `grade`       varchar(30) DEFAULT NULL ,
 `description` varchar(255) DEFAULT NULL ,
 `student_id`  varchar(60) NOT NULL ,
 `finished`    bit(1) NOT NULL DEFAULT b'0' ,
 `created_at`  datetime NOT NULL DEFAULT CURRENT_TIMESTAMP ,
 `updated_at`  datetime NOT NULL DEFAULT CURRENT_TIMESTAMP ,

PRIMARY KEY (`id`),
KEY `education_student_idx` (`student_id`),
CONSTRAINT `education_student_fk` FOREIGN KEY `education_student_idx` (`student_id`) REFERENCES `holbietheque_dev_db`.`students` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Create job_types table
--
DROP TABLE IF EXISTS `holbietheque_dev_db`.`job_types`;
CREATE TABLE `holbietheque_dev_db`.`job_types`
(
 `id`   int NOT NULL ,
 `name` varchar(128) NOT NULL ,
 `created_at`  datetime NOT NULL DEFAULT CURRENT_TIMESTAMP ,
 `updated_at`  datetime NOT NULL DEFAULT CURRENT_TIMESTAMP ,

PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Create experience table
--
DROP TABLE IF EXISTS `holbietheque_dev_db`.`experience`;
CREATE TABLE `holbietheque_dev_db`.`experience`
(
 `id`          varchar(60) NOT NULL ,
 `title`       varchar(128) NOT NULL ,
 `job_type_id` int NOT NULL ,
 `company`     varchar(128) NOT NULL ,
 `start_at`    date NOT NULL ,
 `end_at`      date DEFAULT NULL ,
 `actual_job`  bit(1) NOT NULL DEFAULT b'0' ,
 `description` varchar(255) DEFAULT NULL ,
 `state_id`    varchar(60) NOT NULL ,
 `student_id`  varchar(60) NOT NULL ,
 `created_at`  datetime NOT NULL DEFAULT CURRENT_TIMESTAMP ,
 `updated_at`  datetime NOT NULL DEFAULT CURRENT_TIMESTAMP ,

PRIMARY KEY (`id`),
KEY `experience_job_type_idx` (`job_type_id`),
CONSTRAINT `experience_job_type_fk` FOREIGN KEY `experience_job_type_idx` (`job_type_id`) REFERENCES `holbietheque_dev_db`.`job_types` (`id`),
KEY `experience_state_idx` (`state_id`),
CONSTRAINT `experience_state_fk` FOREIGN KEY `experience_state_idx` (`state_id`) REFERENCES `holbietheque_dev_db`.`states` (`id`),
KEY `experience_student_idx` (`student_id`),
CONSTRAINT `experience_student_fk` FOREIGN KEY `experience_student_idx` (`student_id`) REFERENCES `holbietheque_dev_db`.`students` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Create social table
--
DROP TABLE IF EXISTS `holbietheque_dev_db`.`social`;
CREATE TABLE `holbietheque_dev_db`.`social`
(
 `id`            varchar(60) NOT NULL ,
 `info`          varchar(255) NOT NULL ,
 `github`        varchar(128) DEFAULT NULL ,
 `linkedin`      varchar(128) DEFAULT NULL ,
 `medium`        varchar(128) DEFAULT NULL ,
 `twitter`       varchar(128) DEFAULT NULL ,
 `stackoverflow` varchar(128) DEFAULT NULL ,
 `reddit`        varchar(128) DEFAULT NULL ,
 `facebook`      varchar(128) DEFAULT NULL ,
 `other`         varchar(128) DEFAULT NULL ,
 `student_id`    varchar(60) DEFAULT NULL ,
 `created_at`  datetime NOT NULL DEFAULT CURRENT_TIMESTAMP ,
 `updated_at`  datetime NOT NULL DEFAULT CURRENT_TIMESTAMP ,

PRIMARY KEY (`id`),
KEY `student_overview_idx` (`student_id`),
CONSTRAINT `student_overview_fk` FOREIGN KEY `student_overview_idx` (`student_id`) REFERENCES `holbietheque_dev_db`.`students` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Create projects table
--
DROP TABLE IF EXISTS `holbietheque_dev_db`.`projects`;
CREATE TABLE `holbietheque_dev_db`.`projects`
(
 `id`          varchar(60) NOT NULL ,
 `name`        varchar(128) NOT NULL ,
 `start_at`    date NOT NULL ,
 `end_at`      date DEFAULT NULL ,
 `status`      bit(1) NOT NULL DEFAULT b'0' ,
 `url`         varchar(128) DEFAULT NULL ,
 `github_link` varchar(128) DEFAULT NULL ,
 `description` varchar(255) DEFAULT NULL ,
 `student_id`  varchar(60) NOT NULL ,
 `created_at`  datetime NOT NULL DEFAULT CURRENT_TIMESTAMP ,
 `updated_at`  datetime NOT NULL DEFAULT CURRENT_TIMESTAMP ,

PRIMARY KEY (`id`),
KEY `project_student_idx` (`student_id`),
CONSTRAINT `project_student_fk` FOREIGN KEY `project_student_idx` (`student_id`) REFERENCES `holbietheque_dev_db`.`students` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

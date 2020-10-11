--
-- Create countries table
--

CREATE TABLE `holbietheque_dev_db`.`countries`
(
 `id`         varchar(60) NOT NULL ,
 `iso`        varchar(16) NOT NULL ,
 `name`       varchar(128) NOT NULL ,
 `phone_code` varchar(16) NULL ,
 `created_at` datetime NOT NULL ,
 `updated_at` datetime NOT NULL ,

PRIMARY KEY (`id`)
);

--
-- Create states table
--

CREATE TABLE `holbietheque_dev_db`.`states`
(
 `id`         varchar(60) NOT NULL ,
 `name`       varchar(128) NOT NULL ,
 `country_id` varchar(60) NOT NULL ,
 `created_at` datetime NOT NULL ,
 `updated_at` datetime NOT NULL ,

PRIMARY KEY (`id`),
KEY `state_country_idx` (`country_id`),
CONSTRAINT `state_country_fk` FOREIGN KEY `state_country_idx` (`country_id`) REFERENCES `holbietheque_dev_db`.`countries` (`id`)
);

--
-- Create address table
--

CREATE TABLE `holbietheque_dev_db`.`addresses`
(
 `id`          varchar(60) NOT NULL ,
 `first_line`  varchar(128) NOT NULL ,
 `second_line` varchar(128) NULL ,
 `city`        varchar(128) NOT NULL ,
 `zip_code`    varchar(60) NOT NULL ,
 `state_id`    varchar(60) NOT NULL ,
 `created_at`  datetime NOT NULL ,
 `updated_at`  datetime NOT NULL ,

PRIMARY KEY (`id`),
KEY `address_state_idx` (`state_id`),
CONSTRAINT `address_state_fk` FOREIGN KEY `address_state_idx` (`state_id`) REFERENCES `holbietheque_dev_db`.`states` (`id`)
);

--
-- Create users table
--

CREATE TABLE `holbietheque_dev_db`.`roles`
(
 `id`         varchar(60) NOT NULL ,
 `name`       varchar(128) NOT NULL ,
 `created_at` datetime NOT NULL ,
 `updated_at` datetime NOT NULL ,

PRIMARY KEY (`id`)
);

--
-- Create users table
--

CREATE TABLE `holbietheque_dev_db`.`users`
(
 `id`                    varchar(60) NOT NULL ,
 `email`                 varchar(128) NOT NULL ,
 `password`              varchar(128) NOT NULL ,
 `password_confirmation` varchar(128) NOT NULL ,
 `role_id`               varchar(60) NOT NULL ,
 `created_at`            datetime NOT NULL ,
 `updated_at`            datetime NOT NULL ,

PRIMARY KEY (`id`),
KEY `user_role_idx` (`role_id`),
CONSTRAINT `user_role_fk` FOREIGN KEY `user_role_idx` (`role_id`) REFERENCES `holbietheque_dev_db`.`roles` (`id`)
);

--
-- Create genders table
--

CREATE TABLE `holbietheque_dev_db`.`genders`
(
 `id`         int NOT NULL,
 `name`       varchar(45) NOT NULL ,

PRIMARY KEY (`id`)
);

--
-- Create users table
--

CREATE TABLE `holbietheque_dev_db`.`students`
(
 `id`              varchar(60) NOT NULL ,
 `first_name`      varchar(128) NOT NULL ,
 `last_name`       varchar(128) NOT NULL ,
 `middle_name`     varchar(128) NULL ,
 `id_number`       varchar(128) NOT NULL ,
 `passport_number` varchar(128) NOT NULL ,
 `driver_licence`  bit NOT NULL ,
 `married`         bit NOT NULL ,
 `child`           bit NOT NULL ,
 `address_id`      varchar(60) NOT NULL ,
 `gender_id`       int NOT NULL ,
 `user_id`         varchar(60) NOT NULL ,
 `created_at`      datetime NOT NULL ,
 `updated_at`      datetime NOT NULL ,

PRIMARY KEY (`id`),
KEY `student_address_idx` (`address_id`),
CONSTRAINT `student_address_fk` FOREIGN KEY `student_address_idx` (`address_id`) REFERENCES `holbietheque_dev_db`.`addresses` (`id`),
KEY `student_gender_idx` (`gender_id`),
CONSTRAINT `student_gender_fk` FOREIGN KEY `student_gender_idx` (`gender_id`) REFERENCES `holbietheque_dev_db`.`genders` (`id`),
KEY `student_user_idx` (`user_id`),
CONSTRAINT `student_user_fk` FOREIGN KEY `student_user_idx` (`user_id`) REFERENCES `holbietheque_dev_db`.`users` (`id`)
);

--
-- Create certeficates table
--

CREATE TABLE `holbietheque_dev_db`.`certificates`
(
 `id`             varchar(60) NOT NULL ,
 `name`           varchar(128) NOT NULL ,
 `authority`      varchar(128) NOT NULL ,
 `expire`         bit NOT NULL ,
 `issued_at`      date NOT NULL ,
 `expired_at`     date NULL ,
 `certeficate_id` varchar(60) NULL ,
 `description`    varchar(255) NULL ,
 `student_id`     varchar(60) NOT NULL ,
 `created_at`     datetime NOT NULL ,
 `updated_at`     datetime NOT NULL ,

PRIMARY KEY (`id`),
KEY `certeficate_student_idx` (`student_id`),
CONSTRAINT `certeficate_student_fk` FOREIGN KEY `certeficate_student_idx` (`student_id`) REFERENCES `holbietheque_dev_db`.`students` (`id`)
);

--
-- Create educations table
--

CREATE TABLE `holbietheque_dev_db`.`educations`
(
 `id`          varchar(60) NOT NULL ,
 `school`      varchar(128) NOT NULL ,
 `degree`      varchar(128) NOT NULL ,
 `major`       varchar(128) NULL ,
 `start_at`    date NOT NULL ,
 `end_at`      date NULL ,
 `grade`       varchar(60) NULL ,
 `description` varchar(255) NULL ,
 `student_id`  varchar(60) NOT NULL ,
 `finished`    bit NOT NULL ,
 `created_at`  datetime NOT NULL ,
 `updated_at`  datetime NOT NULL ,

PRIMARY KEY (`id`),
KEY `education_student_idx` (`student_id`),
CONSTRAINT `education_student_fk` FOREIGN KEY `education_student_idx` (`student_id`) REFERENCES `holbietheque_dev_db`.`students` (`id`)
);

--
-- Create job_types table
--

CREATE TABLE `holbietheque_dev_db`.`job_types`
(
 `id`   int NOT NULL ,
 `name` varchar(128) NOT NULL ,

PRIMARY KEY (`id`)
);

--
-- Create experiences table
--

CREATE TABLE `holbietheque_dev_db`.`experiences`
(
 `id`          varchar(60) NOT NULL ,
 `title`       varchar(45) NOT NULL ,
 `job_type_id` int NOT NULL ,
 `company`     varchar(45) NOT NULL ,
 `start_at`    date NOT NULL ,
 `end_at`      date NULL ,
 `actual_job`  bit NOT NULL ,
 `description` varchar(255) NULL ,
 `state_id`    varchar(60) NOT NULL ,
 `student_id`  varchar(60) NOT NULL ,
 `created_at`  datetime NOT NULL ,
 `updated_at`  datetime NOT NULL ,

PRIMARY KEY (`id`),
KEY `experience_job_type_idx` (`job_type_id`),
CONSTRAINT `experience_job_type_fk` FOREIGN KEY `experience_job_type_idx` (`job_type_id`) REFERENCES `holbietheque_dev_db`.`job_types` (`id`),
KEY `experience_state_idx` (`state_id`),
CONSTRAINT `experience_state_fk` FOREIGN KEY `experience_state_idx` (`state_id`) REFERENCES `holbietheque_dev_db`.`states` (`id`),
KEY `experience_student_idx` (`student_id`),
CONSTRAINT `experience_student_fk` FOREIGN KEY `experience_student_idx` (`student_id`) REFERENCES `holbietheque_dev_db`.`students` (`id`)
);

--
-- Create overviews table
--

CREATE TABLE `holbietheque_dev_db`.`overviews`
(
 `id`            varchar(60) NOT NULL ,
 `info`          varchar(255) NOT NULL ,
 `github`        varchar(128) NOT NULL ,
 `linkedin`      varchar(128) NOT NULL ,
 `medium`        varchar(128) NOT NULL ,
 `twitter`       varchar(128) NOT NULL ,
 `stackoverflow` varchar(128) NOT NULL ,
 `reddit`        varchar(128) NOT NULL ,
 `facebook`      varchar(45) NOT NULL ,
 `other`         varchar(45) NOT NULL ,
 `student_id`    varchar(60) NOT NULL ,

PRIMARY KEY (`id`),
KEY `student_overview_idx` (`student_id`),
CONSTRAINT `student_overview_fk` FOREIGN KEY `student_overview_idx` (`student_id`) REFERENCES `holbietheque_dev_db`.`students` (`id`)
);

--
-- Create projects table
--

CREATE TABLE `holbietheque_dev_db`.`projects`
(
 `id`          varchar(60) NOT NULL ,
 `name`        varchar(128) NOT NULL ,
 `start_at`    date NOT NULL ,
 `end_at`      date NOT NULL ,
 `url`         varchar(128) NOT NULL ,
 `github_link` varchar(128) NOT NULL ,
 `description` varchar(255) NOT NULL ,
 `student_id`  varchar(60) NOT NULL ,
 `created_at`  datetime NOT NULL ,
 `updated_at`  datetime NOT NULL ,

PRIMARY KEY (`id`),
KEY `project_student_idx` (`student_id`),
CONSTRAINT `project_student_fk` FOREIGN KEY `project_student_idx` (`student_id`) REFERENCES `holbietheque_dev_db`.`students` (`id`)
);

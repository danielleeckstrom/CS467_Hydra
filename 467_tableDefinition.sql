DROP TABLE IF EXISTS `Users`;

CREATE TABLE `Users` (
  `u_id` int(11) NOT NULL AUTO_INCREMENT,
  `fname` varchar(255) NOT NULL,
  `lname` varchar(255) NOT NULL,
  `user_email` varchar(255) DEFAULT NULL,
  `user_password` varchar(255) DEFAULT NULL,
  `created_timestamp` TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  `image_link` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`u_id`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

DROP TABLE IF EXISTS `Award_Type`;

CREATE TABLE `Award_Type` (
`at_id` int(11) NOT NULL AUTO_INCREMENT,
`award_name` varchar(255) NOT NULL,
PRIMARY KEY (`at_id`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

DROP TABLE IF EXISTS `Awards`;

CREATE TABLE `Awards` (
`award_id` int(11) NOT NULL AUTO_INCREMENT,
`award_type` int(11) NOT NULL,    -- fk to Award_Type table
`award_time` TIME DEFAULT NULL,   -- user specifies time of award (in the req's)
`award_date` date DEFAULT NULL,
`r_fname` varchar(40) NOT NULL,   -- recipient first name
`r_lname` varchar(40) NOT NULL,   -- recipient last name
`r_email` varchar(255)  DEFAULT NULL,
`user_id` int(11) NOT NULL,         -- fk to Users table
`sent` tinyint(1) NOT NULL DEFAULT '0',   --sent Yes/No, acts as a boolean
PRIMARY KEY (`award_id`),
FOREIGN KEY (`award_type`) REFERENCES `Award_Type` (`at_id`) ON UPDATE CASCADE ON DELETE CASCADE,
FOREIGN KEY (`user_id`) REFERENCES `Users` (`u_id`) ON UPDATE CASCADE ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

DROP TABLE IF EXISTS `Admins`;

CREATE TABLE `Admins` (
  `admin_id` int(11) NOT NULL AUTO_INCREMENT,
  `admin_email` varchar(255) DEFAULT NULL,
  `admin_password` varchar(255) DEFAULT NULL,
  `created_timestamp` DATETIME DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`admin_id`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `Users`
--
INSERT INTO Award_Type (award_name)
VALUES ('Employee of the Month'),
('Outstanding Service');



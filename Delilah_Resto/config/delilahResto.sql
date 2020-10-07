




CREATE TABLE `users`
(`id` INTEGER auto_increment ,
`admin` TINYINT
(1) DEFAULT false, 
`name` VARCHAR
(255), `lastname` VARCHAR
(255),
`email` VARCHAR
(255), `telephone` VARCHAR
(255), 
`address` VARCHAR
(255), `password` VARCHAR
(150),
`createdAt` DATETIME NOT null default CURRENT_TIMESTAMP,
`updatedAt` DATETIME NOT null default CURRENT_TIMESTAMP,
PRIMARY KEY
(`id`)
) ENGINE=InnoDB;



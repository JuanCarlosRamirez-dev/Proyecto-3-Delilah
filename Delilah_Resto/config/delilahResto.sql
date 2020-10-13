


CREATE DATABASE `delilah_resto` /*!40100 DEFAULT CHARACTER SET latin1 */;

-- delilah_resto.category definition

CREATE TABLE `category` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `category_name` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

-- delilah_resto.city definition

CREATE TABLE `city` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `city_name` varchar(255) DEFAULT NULL,
  `zp_code` varchar(10) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

-- delilah_resto.customers definition

CREATE TABLE `customers` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `admin` tinyint(1) DEFAULT 0,
  `customer_name` varchar(255) DEFAULT NULL,
  `customer_lastname` varchar(255) DEFAULT NULL,
  `email` varchar(255) DEFAULT NULL,
  `phone_number` varchar(255) DEFAULT NULL,
  `address` varchar(255) DEFAULT NULL,
  `city_id` int(11) DEFAULT NULL,
  `password` varchar(255) DEFAULT NULL,
  `createdAt` datetime NOT NULL DEFAULT current_timestamp(),
  `updatedAt` datetime NOT NULL DEFAULT current_timestamp(),
  PRIMARY KEY (`id`),
  CONSTRAINT `customers_FK` FOREIGN KEY (`id`) REFERENCES `city` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;


-- delilah_resto.in_order definition

CREATE TABLE `in_order` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `placed_order_id` int(11) DEFAULT NULL,
  `menu_item_id` int(11) DEFAULT NULL,
  `quantity` int(11) DEFAULT NULL,
  `item_price` decimal(8,2) DEFAULT NULL,
  `price` decimal(8,2) DEFAULT NULL,
  `comment` text DEFAULT NULL,
  PRIMARY KEY (`id`),
  CONSTRAINT `in_order_FK` FOREIGN KEY (`id`) REFERENCES `menu_item` (`id`),
  CONSTRAINT `in_order_FK_1` FOREIGN KEY (`id`) REFERENCES `placed_order` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

-- delilah_resto.menu_item definition

CREATE TABLE `menu_item` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `category_id` int(11) DEFAULT NULL,
  `item_name` varchar(255) DEFAULT NULL,
  `description` varchar(255) DEFAULT NULL,
  `price` decimal(8,2) DEFAULT NULL,
  `active` tinyint(1) DEFAULT 1,
  `createdAt` datetime NOT NULL DEFAULT current_timestamp(),
  `updatedAt` datetime NOT NULL DEFAULT current_timestamp(),
  PRIMARY KEY (`id`),
  CONSTRAINT `menu_item_FK` FOREIGN KEY (`id`) REFERENCES `category` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

-- delilah_resto.order_status definition

CREATE TABLE `order_status` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `placed_order_id` int(11) DEFAULT NULL,
  `status_catalog_id` int(11) DEFAULT NULL,
  PRIMARY KEY (`id`),
  CONSTRAINT `order_status_FK` FOREIGN KEY (`id`) REFERENCES `placed_order` (`id`),
  CONSTRAINT `order_status_FK_1` FOREIGN KEY (`id`) REFERENCES `status_catalog` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

-- delilah_resto.placed_order definition

CREATE TABLE `placed_order` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `customer_id` int(11) DEFAULT NULL,
  `delivery_address` varchar(255) DEFAULT NULL,
  `final_price` decimal(8,2) DEFAULT NULL,
  `date_placed` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp(),
  PRIMARY KEY (`id`),
  CONSTRAINT `placed_order_FK` FOREIGN KEY (`id`) REFERENCES `customers` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

-- delilah_resto.status_catalog definition

CREATE TABLE `status_catalog` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `status_name` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;
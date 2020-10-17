
--------------------------------------------------------------

-- delilah_resto.city definition

CREATE TABLE `city` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `city_name` varchar(255) DEFAULT NULL,
  `zp_code` varchar(10) DEFAULT NULL,
  `city_district` varchar(255) DEFAULT NULL,
  `district_type` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=1540 DEFAULT CHARSET=latin1;

-- data insertion for city table

INSERT INTO delilah_resto.city (city_name,zp_code,city_district,district_type) VALUES
	 ('Álvaro Obregón','1710','Ampliación Alpes','Colonia'),
	 ('Álvaro Obregón','1720','Lomas de Guadalupe','Colonia'),
	 ('Álvaro Obregón','1729','Alcantarilla','Colonia'),
	 ('Álvaro Obregón','1730','Lomas de las Águilas','Colonia'),
	 ('Álvaro Obregón','1730','Puente Colorado','Colonia'),
	 ('Álvaro Obregón','1740','San Clemente Norte','Colonia'),
	 ('Álvaro Obregón','1750','Las Águilas 1a Sección','Colonia'),
	 ('Álvaro Obregón','1759','Ampliación Las Águilas','Colonia'),
	 ('Álvaro Obregón','1760','Atlamaya','Colonia'),
	 ('Álvaro Obregón','1770','San José del Olivar','Colonia'),
	 ('Álvaro Obregón','1780','Tizampampano del Pueblo Tetelpan','Colonia'),
	 ('Álvaro Obregón','1789','Miguel Hidalgo','Colonia'),
	 ('Álvaro Obregón','1790','Lomas de los Ángeles del Pueblo Tetelpan','Colonia'),
	 ('Álvaro Obregón','1800','San Bartolo Ameyalco','Pueblo'),
	 ('Álvaro Obregón','1807','Rancho San Francisco Pueblo San Bartolo Ameyalco','Colonia'),
	 ('Álvaro Obregón','1810','Villa Verdún','Colonia'),
	 ('Álvaro Obregón','1820','Ejido San Mateo','Colonia'),
	 ('Álvaro Obregón','1830','Santa Rosa Xochiac','Pueblo'),
	 ('Álvaro Obregón','1840','Torres de Potrero','Colonia'),
	 ('Álvaro Obregón','1849','Rincón de la Bolsa','Colonia');

--------------------------------------------------------------

-- delilah_resto.category definition

CREATE TABLE `category` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `category_name` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=latin1;

-- data insertion for category table

insert into 
category (category_name)
values
("Drinks"),
("Burgers"),
("Pizza"),
("Salads"),
("Sandwiches"),
("Dessert"),
("Hot-dogs");

--------------------------------------------------------------

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
  KEY `customers_FK` (`city_id`),
  CONSTRAINT `customers_FK` FOREIGN KEY (`city_id`) REFERENCES `city` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

-- data insertion for customer table

insert into customers (customer_name,customer_lastname,email,phone_number,address,city_id,password)
values
("Felipe","Huerta","Felipe@gmail.com","5565969632","Av. Hidalgo #96","2","felipillo"),
("Enrique","Castillo","enrique@gmail.com","553639689","Tepopotla #85","3","enriquito12345"),
("Diego","Hernandez","diego@gmail.com","5545858578","Andadores #4","4","diego12345"),
("Gustavo","Ortega","gustavo@gmail.com","5545855812","Calle #9","5","gustavo54321"),
("Cesar","Duarte","cesar@gmail.com","5532639689","Av. Canalito #13","6","cesar12345");

--------------------------------------------------------------

-- delilah_resto.payment_catalog definition

CREATE TABLE `payment_catalog` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `payment_name` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

-- data insertion for payment_catalog table

insert into payment_catalog (payment_name)
values
("Tarjeta de crédito"),
("Tarjeta de débito"),
("Efectivo");

--------------------------------------------------------------

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
  KEY `menu_item_FK` (`category_id`),
  CONSTRAINT `menu_item_FK` FOREIGN KEY (`category_id`) REFERENCES `category` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=40 DEFAULT CHARSET=latin1;

--data insertion for menu_item table

insert into menu_item (category_id,item_name,description,price)
values
(1,"Coca-cola","Bebida gasificada","10"),
(1,"Jugo de Naranja","Bebida sabor naranja","15"),
(1,"Agua enbotellada","Botella de agua simple","5"),
(2,"Whopper Jr.","Hambuerguesa sencilla","20"),
(2,"Mc Burguer","Hamburguesa con tripe carne","50"),
(3,"Pepperoni pizza","Pizza de Pepperoni con queso","30"),
(3,"Three Meat Threat","Pizza de 3 carnes","60"),
(4,"Chicken salad","Ensalada de pollito","40"),
(5,"Club Sandwich","Deliciosos sandwiches preparados","50"),
(6,"Pay de queso","Exquisito pay de queso","20"),
(6,"Pastel de chocolate","Delicioso pastel de chocolate","30"),
(7,"Beacon hotdog","Hotdog preparado con tocino extra","25"),
(7,"Big Hotdog","Hotdog de tamaño extra grande","60");

--------------------------------------------------------------

-- delilah_resto.placed_order definition

CREATE TABLE `placed_order` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `customer_id` int(11) DEFAULT NULL,
  `date_placed` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp(),
  `comment` text DEFAULT NULL,
  `payment_id` int(11) NOT NULL,
  `in_order_id` int(11) DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `placed_order_FK` (`customer_id`),
  KEY `placed_order_FK_1` (`payment_id`),
  KEY `placed_order_FK_2` (`in_order_id`),
  CONSTRAINT `placed_order_FK` FOREIGN KEY (`customer_id`) REFERENCES `customers` (`id`),
  CONSTRAINT `placed_order_FK_1` FOREIGN KEY (`payment_id`) REFERENCES `payment_catalog` (`id`),
  CONSTRAINT `placed_order_FK_2` FOREIGN KEY (`in_order_id`) REFERENCES `in_order` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--data insertion for placed_order table

insert into placed_order (customer_id,comment,payment_id,in_order_id)
values
("1","none","1","1"),
("2","Deliver at the door","2","2"),
("4","none","1","3"),
("5","Deliver in the red car","3","4"),
("6","none","3","5");

--------------------------------------------------------------

-- delilah_resto.status_catalog definition

CREATE TABLE `status_catalog` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `status_name` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--data insertion for status_catalog table

insert into status_catalog (status_name)
values
("Nuevo"),
("En proceso"),
("Listo"),
("Enviado"),
("Entregado"),
("Cancelado");

--------------------------------------------------------------

-- delilah_resto.in_order definition

CREATE TABLE `in_order` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `menu_item_id` int(11) DEFAULT NULL,
  `quantity` int(11) DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `in_order_FK` (`menu_item_id`),
  CONSTRAINT `in_order_FK` FOREIGN KEY (`menu_item_id`) REFERENCES `menu_item` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=7 DEFAULT CHARSET=latin1;

--data insertion for in_order table

insert into in_order (menu_item_id,quantity)
values
(1,2),
(2,3),
(3,2),
(1,1),
(1,8),
(6,6);

--------------------------------------------------------------

-- delilah_resto.order_status definition

CREATE TABLE `order_status` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `placed_order_id` int(11) DEFAULT NULL,
  `status_catalog_id` int(11) DEFAULT NULL,
  PRIMARY KEY (`id`),
  CONSTRAINT `order_status_FK` FOREIGN KEY (`id`) REFERENCES `placed_order` (`id`),
  CONSTRAINT `order_status_FK_1` FOREIGN KEY (`id`) REFERENCES `status_catalog` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--data insertion for order_status table

insert into order_status (placed_order_id,status_catalog_id)
values
(1,2),
(2,1),
(3,3),
(4,6),
(5,5),
(5,4);

--------------------------------------------------------------
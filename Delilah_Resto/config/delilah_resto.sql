CREATE TABLE `city` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `city_name` varchar(255) DEFAULT NULL,
  `zp_code` varchar(10) DEFAULT NULL,
  `city_district` varchar(255) DEFAULT NULL,
  `district_type` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE = InnoDB DEFAULT CHARSET = latin1;

CREATE TABLE `category` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `category_name` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE = InnoDB DEFAULT CHARSET = latin1;

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
) ENGINE = InnoDB DEFAULT CHARSET = latin1;

CREATE TABLE `payment_catalog` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `payment_name` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE = InnoDB DEFAULT CHARSET = latin1;

CREATE TABLE `menu_item` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `category_id` int(11) DEFAULT NULL,
  `item_name` varchar(255) DEFAULT NULL,
  `description` varchar(255) DEFAULT NULL,
  `price` decimal(8, 2) DEFAULT NULL,
  `active` tinyint(1) DEFAULT 1,
  `createdAt` datetime NOT NULL DEFAULT current_timestamp(),
  `updatedAt` datetime NOT NULL DEFAULT current_timestamp(),
  PRIMARY KEY (`id`),
  KEY `menu_item_FK` (`category_id`),
  CONSTRAINT `menu_item_FK` FOREIGN KEY (`category_id`) REFERENCES `category` (`id`)
) ENGINE = InnoDB DEFAULT CHARSET = latin1;

CREATE TABLE `placed_order` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `customer_id` int(11) DEFAULT NULL,
  `date_placed` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp(),
  `comment` text DEFAULT NULL,
  `payment_id` int(11) NOT NULL,
  PRIMARY KEY (`id`),
  KEY `placed_order_FK` (`customer_id`),
  KEY `placed_order_FK_1` (`payment_id`),
  CONSTRAINT `placed_order_FK` FOREIGN KEY (`customer_id`) REFERENCES `customers` (`id`),
  CONSTRAINT `placed_order_FK_1` FOREIGN KEY (`payment_id`) REFERENCES `payment_catalog` (`id`)
) ENGINE = InnoDB DEFAULT CHARSET = latin1;

CREATE TABLE `status_catalog` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `status_name` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE = InnoDB DEFAULT CHARSET = latin1;

CREATE TABLE `in_order` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `menu_item_id` int(11) DEFAULT NULL,
  `quantity` int(11) DEFAULT NULL,
  `placed_order_id` int(11) DEFAULT NULL,
  UNIQUE KEY `in_order_un` (`id`),
  KEY `in_order_FK` (`menu_item_id`),
  KEY `in_order_FK_1` (`placed_order_id`),
  CONSTRAINT `in_order_FK` FOREIGN KEY (`menu_item_id`) REFERENCES `menu_item` (`id`),
  CONSTRAINT `in_order_FK_1` FOREIGN KEY (`placed_order_id`) REFERENCES `placed_order` (`id`)
) ENGINE = InnoDB DEFAULT CHARSET = latin1;

CREATE TABLE `order_status` (
  `id` int NOT NULL AUTO_INCREMENT,
  `placed_order_id` int DEFAULT NULL,
  `status_catalog_id` int DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `order_status_FK` (`placed_order_id`),
  KEY `order_status_FK_1` (`status_catalog_id`),
  CONSTRAINT `order_status_FK` FOREIGN KEY (`placed_order_id`) REFERENCES `placed_order` (`id`),
  CONSTRAINT `order_status_FK_1` FOREIGN KEY (`status_catalog_id`) REFERENCES `status_catalog` (`id`)
) ENGINE = InnoDB DEFAULT CHARSET = latin1;

INSERT INTO
  delilah_resto.city (city_name, zp_code, city_district, district_type)
VALUES
  (
    'Álvaro Obregón',
    '1710',
    'Ampliación Alpes',
    'Colonia'
  ),
  (
    'Álvaro Obregón',
    '1720',
    'Lomas de Guadalupe',
    'Colonia'
  ),
  ('Álvaro Obregón', '1729', 'Alcantarilla', 'Colonia'),
  (
    'Álvaro Obregón',
    '1730',
    'Lomas de las Águilas',
    'Colonia'
  ),
  (
    'Álvaro Obregón',
    '1730',
    'Puente Colorado',
    'Colonia'
  ),
  (
    'Álvaro Obregón',
    '1740',
    'San Clemente Norte',
    'Colonia'
  ),
  (
    'Álvaro Obregón',
    '1750',
    'Las Águilas 1a Sección',
    'Colonia'
  ),
  (
    'Álvaro Obregón',
    '1759',
    'Ampliación Las Águilas',
    'Colonia'
  ),
  ('Álvaro Obregón', '1760', 'Atlamaya', 'Colonia'),
  (
    'Álvaro Obregón',
    '1770',
    'San José del Olivar',
    'Colonia'
  ),
  (
    'Álvaro Obregón',
    '1780',
    'Tizampampano del Pueblo Tetelpan',
    'Colonia'
  ),
  (
    'Álvaro Obregón',
    '1789',
    'Miguel Hidalgo',
    'Colonia'
  ),
  (
    'Álvaro Obregón',
    '1790',
    'Lomas de los Ángeles del Pueblo Tetelpan',
    'Colonia'
  ),
  (
    'Álvaro Obregón',
    '1800',
    'San Bartolo Ameyalco',
    'Pueblo'
  ),
  (
    'Álvaro Obregón',
    '1807',
    'Rancho San Francisco Pueblo San Bartolo Ameyalco',
    'Colonia'
  ),
  ('Álvaro Obregón', '1810', 'Villa Verdún', 'Colonia'),
  (
    'Álvaro Obregón',
    '1820',
    'Ejido San Mateo',
    'Colonia'
  ),
  (
    'Álvaro Obregón',
    '1830',
    'Santa Rosa Xochiac',
    'Pueblo'
  ),
  (
    'Álvaro Obregón',
    '1840',
    'Torres de Potrero',
    'Colonia'
  ),
  (
    'Álvaro Obregón',
    '1849',
    'Rincón de la Bolsa',
    'Colonia'
  );

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

insert into
  customers (
    customer_name,
    customer_lastname,
    email,
    phone_number,
    address,
    city_id,
    password
  )
values
  (
    "Diego",
    "Hernandez",
    "diego@gmail.com",
    "5563639698",
    "Av. Tezontle #6",
    "1",
    "dieguito"
  ),
  (
    "Felipe",
    "Huerta",
    "Felipe@gmail.com",
    "5565969632",
    "Av. Hidalgo #96",
    "2",
    "felipillo"
  ),
  (
    "Enrique",
    "Castillo",
    "enrique@gmail.com",
    "553639689",
    "Tepopotla #85",
    "3",
    "enriquito12345"
  ),
  (
    "Juan Carlos",
    "Ramirez",
    "juan@gmail.com",
    "5545858578",
    "Andadores #4",
    "4",
    "juan12345"
  ),
  (
    "Gustavo",
    "Ortega",
    "gustavo@gmail.com",
    "5545855812",
    "Calle #9",
    "5",
    "gustavo54321"
  ),
  (
    "Cesar",
    "Duarte",
    "cesar@gmail.com",
    "5532639689",
    "Av. Canalito #13",
    "6",
    "cesar12345"
  );

insert into
  payment_catalog (payment_name)
values
  ("Tarjeta de crédito"),
  ("Tarjeta de débito"),
  ("Efectivo");

insert into
  menu_item (category_id, item_name, description, price)
values
  (1, "Coca-cola", "Bebida gasificada", "10"),
  (1, "Jugo de Naranja", "Bebida sabor naranja", "15"),
  (
    1,
    "Agua enbotellada",
    "Botella de agua simple",
    "5"
  ),
  (2, "Whopper Jr.", "Hambuerguesa sencilla", "20"),
  (
    2,
    "Mc Burguer",
    "Hamburguesa con tripe carne",
    "50"
  ),
  (
    3,
    "Pepperoni pizza",
    "Pizza de Pepperoni con queso",
    "30"
  ),
  (3, "Three Meat Threat", "Pizza de 3 carnes", "60"),
  (4, "Chicken salad", "Ensalada de pollito", "40"),
  (
    5,
    "Club Sandwich",
    "Deliciosos sandwiches preparados",
    "50"
  ),
  (6, "Pay de queso", "Exquisito pay de queso", "20"),
  (
    6,
    "Pastel de chocolate",
    "Delicioso pastel de chocolate",
    "30"
  ),
  (
    7,
    "Beacon hotdog",
    "Hotdog preparado con tocino extra",
    "25"
  ),
  (
    7,
    "Big Hotdog",
    "Hotdog de tamaño extra grande",
    "60"
  );

insert into
  placed_order (customer_id, comment, payment_id)
values
  ("1", "none", "1"),
  ("2", "Deliver at the door", "2"),
  ("3", "Deliver at the park", "2"),
  ("4", "none", "1"),
  ("5", "Deliver in the red car", "3");

insert into
  status_catalog (status_name)
values
  ("Nuevo"),
  ("En proceso"),
  ("Listo"),
  ("Enviado"),
  ("Entregado"),
  ("Cancelado");

insert into
  in_order (menu_item_id, quantity, placed_order_id)
values
  (1, 2, 1),
  (2, 3, 1),
  (3, 2, 2),
  (1, 1, 2),
  (7, 8, 3),
  (8, 5, 3),
  (9, 3, 4),
  (10, 7, 5),
  (11, 3, 5),
  (12, 2, 1),
  (13, 6, 4);

insert into
  order_status (placed_order_id, status_catalog_id)
values
  (1, 2),
  (2, 1),
  (3, 3),
  (4, 6),
  (5, 5),
  (5, 4);
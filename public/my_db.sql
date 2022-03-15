USE my_db;

CREATE TABLE `usuario` (
  `id` int PRIMARY KEY AUTO_INCREMENT,
  `nombre` varchar(255),
  `email` varchar(255),
  `password` varchar(255),
  `status` tinyint DEFAULT 1,
  `tipo` int DEFAULT 2
);

CREATE TABLE `puntos_visita_usuario` (
  `id` int PRIMARY KEY AUTO_INCREMENT,
  `usuarioId` int,
  `puntoVisitaId` int
);

CREATE TABLE `puntos_visita` (
  `id` int PRIMARY KEY AUTO_INCREMENT,
  `nombre` varchar(255),
  `descripcion` varchar(255),
  `imagen` varchar(255),
  `costo` double
);

CREATE TABLE `puntos` (
  `id` int PRIMARY KEY AUTO_INCREMENT,
  `puntoVisitaId` int,
  `lugaresId` int
);

CREATE TABLE `lugares` (
  `id` int PRIMARY KEY AUTO_INCREMENT,
  `nombre` varchar(255),
  `descripcion` varchar(255),
  `imagen` varchar(255),
  `lat` double,
  `lon` double,
  `status` tinyint DEFAULT 1
);

ALTER TABLE `puntos` ADD FOREIGN KEY (`puntoVisitaId`) REFERENCES `puntos_visita` (`id`);

ALTER TABLE `puntos` ADD FOREIGN KEY (`lugaresId`) REFERENCES `lugares` (`id`);

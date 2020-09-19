# we-know

-> Após clonar o projeto, rodar o comando:
npm i 

-> criar database com o nome "weknow"
Tabelas:

CREATE TABLE IF NOT EXISTS `passwordtokens` (
  `id` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `token` varchar(200) NOT NULL DEFAULT '0',
  `user_id` int(10) unsigned NOT NULL DEFAULT 0,
  `used` tinyint(3) unsigned NOT NULL DEFAULT 0,
  PRIMARY KEY (`id`),
  KEY `FK_passwordtokens_users` (`user_id`),
  CONSTRAINT `FK_passwordtokens_users` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=utf8mb4;

CREATE TABLE IF NOT EXISTS `users` (
  `id` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `name` varchar(50) DEFAULT '0',
  `email` varchar(150) NOT NULL DEFAULT '0',
  `password` varchar(200) NOT NULL DEFAULT '0',
  `role` int(11) NOT NULL DEFAULT 0,
  `course` int(10) DEFAULT '0',
  `ra` varchar(10) DEFAULT '0',
  PRIMARY KEY (`id`),
  UNIQUE KEY `email` (`email`)
) ENGINE=InnoDB AUTO_INCREMENT=10 DEFAULT CHARSET=UTF8MB4;

CREATE TABLE IF NOT EXISTS `courses` (
  `id` INT(10) unsigned NOT NULL AUTO_INCREMENT,
  `description` varchar(50) DEFAULT '0',
  `duration` varchar(150) NOT NULL DEFAULT '0', 
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=10 DEFAULT CHARSET=utf8mb4;


CREATE TABLE IF NOT EXISTS `categories` (
  `id` INT(10) unsigned NOT NULL AUTO_INCREMENT,
  `description` varchar(50) DEFAULT '0',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=10 DEFAULT CHARSET=utf8mb4;


CREATE TABLE IF NOT EXISTS `subjects` (
  `id` INT(10) unsigned NOT NULL AUTO_INCREMENT,
  `description` varchar(50) DEFAULT '0',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=10 DEFAULT CHARSET=utf8mb4;

CREATE TABLE IF NOT EXISTS `articles` (
  `id` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `title` varchar(100),
  `description` varchar(250),
  `text` MEDIUMTEXT,
  `category` int(11),
  `author` int(10),
  `subject` varchar(10),
  `published_date` datetime,
  `last_changed` datetime,
  `status_article` int(10),
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=10 DEFAULT CHARSET=UTF8MB4;

-----------------------------------------------

Após fazer o clone da pasta weKnow, executar o comando npm i

Para executar o projeto 
abrir dois terminais 
entrar na pasta de API e executar 
nodemon .\index.js

no outro terminal entrar na pasta do weKnow e executar 
npm run serve

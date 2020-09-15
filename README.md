# we-know

-> Após clonar o projeto, rodar o comando:
npm i 

-> criar database com o nome "weknow"
Tabelas:

CREATE TABLE users (
	id int(10) unsigned NOT NULL AUTO_INCREMENT,
   name varchar(50) DEFAULT '0',
   email varchar(150) NOT NULL DEFAULT '0',
   password varchar(200) NOT NULL DEFAULT '0',
   role int(11) NOT NULL DEFAULT 0,
   course int(10) DEFAULT '0',
   ra int(10) DEFAULT '0',
  PRIMARY KEY (id),
  UNIQUE KEY email (email)
)ENGINE=InnoDB AUTO_INCREMENT=10 DEFAULT CHARSET=UTF8MB4;

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



DROP TABLE IF EXISTS `Set`;

DROP TABLE IF EXISTS `Match`;

DROP TABLE IF EXISTS Poule;

DROP TABLE IF EXISTS Inscription;

DROP TABLE IF EXISTS Membre;

DROP TABLE IF EXISTS Tournoi;

DROP TABLE IF EXISTS Equipe;

DROP TABLE IF EXISTS Evenement;

CREATE TABLE `Equipe`(
  `id` int(10) NOT NULL AUTO_INCREMENT,
  `nom` char(20) NOT NULL,
  `niveau` int(10) NOT NULL,
  PRIMARY KEY (`id`)
);

CREATE TABLE `Evenement`(
  `id` int(10) NOT NULL AUTO_INCREMENT,
  `nom` char(20) NOT NULL,
  `type` char(255) NOT NULL,
  `lieu` char(255) NOT NULL,
  `date` date NOT NULL,
  `fini` int(1) DEFAULT 0 NOT NULL,
  PRIMARY KEY (`id`)
);

CREATE TABLE `Inscription`(
  `id` int(10) NOT NULL AUTO_INCREMENT,
  `idEquipe` int(10) NOT NULL,
  `idTournoi` int(10) NOT NULL,
  `idEvenement` int(10) NOT NULL,
  PRIMARY KEY (`id`)
);

CREATE TABLE `Match`(
 `idWin` int(10),
 `setganiant` int(10) NOT NULL,
 `equipeA` int(10) NOT NULL,
 `equipeB` int(10) NOT NULL,
 `idPoule` int(10) NOT NULL,
  CHECK(`equipeA`<>`equipeB`),
  PRIMARY KEY (`equipeA`,`equipeB`,`idPoule`)
);

CREATE TABLE `Membre`(
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `nom` char(11) NOT NULL,
  `prenom` char(11) NOT NULL,
  `niveau` int(11) NOT NULL,
  `idEqu` int(10) NOT NULL,
  PRIMARY KEY (`id`)
);

CREATE TABLE `Poule`(
  `id` int(10) NOT NULL AUTO_INCREMENT,
  `tour` int(10) NOT NULL,
  `idTournoi` int(10) NOT NULL,
  `idEvenement` int(10),
  PRIMARY KEY (`id`)
);

CREATE TABLE `Set`(
  `id` int(10) NOT NULL AUTO_INCREMENT,
  `numset` int(10) NOT NULL,
  `pointA` int(10) DEFAULT 0 NOT NULL,
  `pointB` int(10) DEFAULT 0 NOT NULL,
  `idWin` int(10),
  `pointganiant` int(10) NOT NULL,
  `matchequipeA` int(10) NOT NULL,
  `matchequipeB` int(10) NOT NULL,
  `idPoule` int(10) NOT NULL,
  PRIMARY KEY (`id`)
);

CREATE TABLE `Tournoi`(
  `id` int(10) NOT NULL AUTO_INCREMENT,
  `nom` char(20) NOT NULL,
  `idEvenement` int(10) NOT NULL,
  `fini` int(1) DEFAULT 0 NOT NULL,
  PRIMARY KEY (`id`,`idEvenement`)
);

ALTER TABLE
  `Set`
ADD
  CONSTRAINT `FKSet` FOREIGN KEY (`matchequipeA`,`matchequipeB`,`idPoule`) REFERENCES `Match`(`equipeA`,`equipeB`,`idPoule`);

ALTER TABLE
  `Set`
ADD
  CONSTRAINT `CHKSet` CHECK(
    (`idWin`=`matchequipeA`)
    OR (`idWin`=`matchequipeB`)
  );

ALTER TABLE
  `Membre`
ADD
  CONSTRAINT `FKMembre` FOREIGN KEY (`idEqu`) REFERENCES `Equipe`(`id`);
  
ALTER TABLE
  `Match`
ADD
  CONSTRAINT `FKMatch1`FOREIGN KEY (`idPoule`) REFERENCES `Poule`(`id`);

ALTER TABLE
  `Match`
ADD
  CONSTRAINT `FKMatch2`FOREIGN KEY (`equipeA`) REFERENCES `Inscription`(`id`);

ALTER TABLE
  `Match`
ADD
  CONSTRAINT `FKMatch3`FOREIGN KEY (`equipeB`) REFERENCES `Inscription`(`id`);

ALTER TABLE
`Match`
ADD
  CONSTRAINT `CHKMatch `CHECK (
`idWin`=`equipeA`
    OR `idWin`=`equipeB`
  );

ALTER TABLE
`Tournoi`
ADD
  CONSTRAINT `FKTournoi` FOREIGN KEY (`idEvenement`) REFERENCES `Evenement`(`id`);

ALTER TABLE
`Inscription`
ADD
  CONSTRAINT `FKInscriptio1`FOREIGN KEY (`idEquipe`) REFERENCES `Equipe`(`id`);

ALTER TABLE
`Inscription`
ADD
  CONSTRAINT `FKInscriptio2`FOREIGN KEY (`idTournoi`,`idEvenement`) REFERENCES `Tournoi`(`id`,`idEvenement`);

ALTER TABLE
`Inscription`
ADD
  CONSTRAINT `UCInscriptio` UNIQUE(`idEquipe`,`idEvenement`);

ALTER TABLE
`Poule`
ADD
  CONSTRAINT `FKPoule` FOREIGN KEY (`idTournoi`,`idEvenement`) REFERENCES `Tournoi`(`id`,`idEvenement`);
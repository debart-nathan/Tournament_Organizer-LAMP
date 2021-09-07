/*
Fichier : creation_GroupeC.sql
AUteurs :
DEBART Nathan 21600853
LOUATI Abdelhamid 22016508
Nom du groupe : C
*/
DROP DATABASE IF EXISTS Tournoi;
CREATE DATABASE Tournoi;
USE Tournoi;

DROP TABLE IF EXISTS `set`;
DROP TABLE IF EXISTS `match`;
DROP TABLE IF EXISTS poule;
DROP TABLE IF EXISTS Inscription;
DROP TABLE IF EXISTS membre;
DROP TABLE IF EXISTS tournoi;
DROP TABLE IF EXISTS equipe;
DROP TABLE IF EXISTS evenement;


CREATE TABLE `equipe` (
  `id`     int(10) NOT NULL AUTO_INCREMENT, 
  `nom`    char(20) NOT NULL, 
  `niveau` int(10) NOT NULL, 
  PRIMARY KEY (`id`));

CREATE TABLE `evenement` (
  `id`            int(10) NOT NULL AUTO_INCREMENT, 
  `nom`         char(20) NOT NULL, 
  `type de jeu`   char(255) NOT NULL, 
  `lieu`        char(255) NOT NULL, 
  `date`          date NOT NULL,
  `fini`        int(1)DEFAULT 0 NOT NULL,
  PRIMARY KEY (`id`));

CREATE TABLE `inscription` (
  `id`         	int(10) NOT NULL AUTO_INCREMENT, 
  `idEquipe`   	int(10) NOT NULL , 
  `idTournoi`  	int(10) NOT NULL, 
  `idEvenement` int(10) NOT NULL, 
  PRIMARY KEY (`id`));
 

CREATE TABLE `match` (
  `idWin`     	int(10),
	`setganiant` 	int(10) NOT NULL, 
  `equipeA` 		int(10) NOT NULL, 
  `equipeB` 		int(10) NOT NULL, 
  `idPoule` 		int(10) NOT NULL,
	CHECK(`equipeA` <> `equipeB`), 
  PRIMARY KEY (`equipeA`, 
 		`equipeB`, 
  	`idPoule`));

CREATE TABLE `membre` (
  `id`     int(11) NOT NULL AUTO_INCREMENT, 
  `nom`    char(11) NOT NULL, 
  `prénom` char(11) NOT NULL, 
  `niveau` int(11) NOT NULL, 
  `idEqu`  int(10) NOT NULL, 
  PRIMARY KEY (`id`));

CREATE TABLE `poule` (
  `id`          int(10) NOT NULL AUTO_INCREMENT, 
  `tour`       	int(10) NOT NULL,  
  `idTournoi`   int(10) NOT NULL, 
  `idEvenement` int(10) ,
  PRIMARY KEY (`id`));

CREATE TABLE `set` (
  `id`           int(10) NOT NULL AUTO_INCREMENT, 
  `numset`       int(10) NOT NULL, 
  `pointA`       int(10) DEFAULT 0 NOT NULL, 
  `pointB`       int(10) DEFAULT 0 NOT NULL, 
  `idWin`        int(10) , 
	`pointganiant` int(10) NOT NULL,
  `matchequipeA` int(10) NOT NULL, 
  `matchequipeB` int(10) NOT NULL, 
  `idPoule`      int(10) NOT NULL,  
  PRIMARY KEY (`id`));

CREATE TABLE `tournoi` (
  `id`          int(10) NOT NULL AUTO_INCREMENT, 
  `nom`         char(20) NOT NULL, 
  `idEvenement` int(10) NOT NULL,
  `fini`        int(1) DEFAULT 0 NOT NULL, 
  PRIMARY KEY (`id`, 
  `idEvenement`));

	

ALTER TABLE `set` ADD CONSTRAINT `FKSet` FOREIGN KEY (`matchequipeA`, `matchequipeB`, `idPoule`) 
	REFERENCES `match` (`equipeA`, `equipeB`, `idPoule`);
ALTER TABLE `set` ADD CONSTRAINT `CHKSet` CHECK((`idWin` =`matchequipeA`) OR (`idWin`=`matchequipeB`)); 

ALTER TABLE `membre` ADD CONSTRAINT `FKMembre` FOREIGN KEY (`idEqu`) REFERENCES `equipe` (`id`);

ALTER TABLE `match` ADD CONSTRAINT `FKMatch1` FOREIGN KEY (`idPoule`) REFERENCES `poule` (`id`);
ALTER TABLE `match` ADD CONSTRAINT `FKMatch2` FOREIGN KEY (`equipeA`) REFERENCES `inscription` (`id`);
ALTER TABLE `match` ADD CONSTRAINT `FKMatch3` FOREIGN KEY (`equipeB`) REFERENCES `inscription` (`id`);
ALTER TABLE `match` ADD CONSTRAINT `CHKMatch` CHECK (`idWin` =`equipeA` OR `idWin`=`equipeB`); 

ALTER TABLE `tournoi` ADD CONSTRAINT `FKTournoi` FOREIGN KEY (`idEvenement`) REFERENCES `evenement` (`id`);

ALTER TABLE `inscription` ADD CONSTRAINT `FKInscriptio1` FOREIGN KEY (`idEquipe`) REFERENCES `equipe` (`id`);
ALTER TABLE `inscription` ADD CONSTRAINT `FKInscriptio2` FOREIGN KEY (`idTournoi`, `idEvenement`) REFERENCES `tournoi` (`id`, `idEvenement`);
ALTER TABLE `inscription` ADD CONSTRAINT `UCInscriptio` UNIQUE(`idEquipe`,`idEvenement`) ;

ALTER TABLE `poule` ADD CONSTRAINT `FKPoule` FOREIGN KEY (`idTournoi`, `idEvenement`) REFERENCES `tournoi` (`id`, `idEvenement`);


/*
Insertion de tuples dans les relations
*/
INSERT INTO `equipe` (`id`, `nom`, `niveau`) VALUES (NULL, 'FRANCE', '1');

INSERT INTO `equipe` (`id`, `nom`, `niveau`) VALUES (NULL, 'DREAM TEAM', '1');


INSERT INTO `membre` (`id`, `nom`, `prénom`, `niveau`, `idEqu`) VALUES (NULL, 'WESTERMANN', 'Leo', '1', '1');
INSERT INTO `membre` (`id`, `nom`, `prénom`, `niveau`, `idEqu`) VALUES (NULL, 'BEAUBOIS', 'Rodrigue', '1', '1');
INSERT INTO `membre` (`id`, `nom`, `prénom`, `niveau`, `idEqu`) VALUES (NULL, 'ROBINSON', 'David', '1', '2');
INSERT INTO `membre` (`id`, `nom`, `prénom`, `niveau`, `idEqu`) VALUES (NULL, 'EWING', 'Patrick', '1', '2');


INSERT INTO `evenement` (`id`, `nom`, `type de jeu`, `lieu`, `date`, `fini`) VALUES (NULL, 'FIBA2014', '3x15', 'ESPAGNE', '2014-08-30', '1');


INSERT INTO `tournoi` (`id`, `nom`, `idEvenement`, `fini`) VALUES (NULL, 'FIBA', '1', '1');


INSERT INTO `inscription` (`id`, `idEquipe`, `idTournoi`, `idEvenement`) VALUES (NULL, '1', '1', '1');
INSERT INTO `inscription` (`id`, `idEquipe`, `idTournoi`, `idEvenement`) VALUES (NULL, '2', '1', '1');


INSERT INTO `poule` (`id`, `tour`, `idTournoi`, `idEvenement`) VALUES (NULL, '1', '1', NULL);
INSERT INTO `poule` (`id`, `tour`, `idTournoi`, `idEvenement`) VALUES (NULL, '2', '1', NULL);
INSERT INTO `poule` (`id`, `tour`, `idTournoi`, `idEvenement`) VALUES (NULL, '1', '1', NULL);


/*
trigger qui set le gagnant d'un set quand il est décidé
*/

DROP TRIGGER IF EXISTS trigger_idwinset;
DELIMITER $$
CREATE TRIGGER trigger_idwinset BEFORE UPDATE
	ON `set` 
  	FOR EACH ROW
  BEGIN 
		IF NEW.pointA>= NEW.pointganiant THEN
      SET NEW.idWin = NEW.matchequipeA;
    ELSEIF NEW.pointB>= NEW.pointganiant THEN
      SET NEW.idWin = NEW.matchequipeB;
		END IF;
	END $$
DELIMITER;


/*
trigger qui set le gagnant d'un match quand il est décidé
*/

DROP FUNCTION IF EXISTS trigger_idwinmatch;

DELIMITER $$
CREATE TRIGGER trigger_idwinmatch BEFORE UPDATE 
	ON `set` 
	FOR EACH ROW 
	BEGIN 
		IF (NEW.idWin IS NOT NULL) THEN
			IF ((SELECT COUNT(idWin) FROM `set` WHERE idWin=NEW.idWin AND idPoule=NEW.idPoule AND matchequipeA=NEW.matchequipeA AND matchequipeB=NEW.matchequipeB)+1>= (SELECT setganiant FROM `match` WHERE idPoule=NEW.idPoule AND equipeA=NEW.matchequipeA AND equipeB=NEW.matchequipeB)) THEN 
				UPDATE `match` SET idWin=New.idWin where idPoule=NEW.idPoule AND equipeA=NEW.matchequipeA AND equipeB=NEW.matchequipeB ; 
			END IF;
		END IF;
	END$$

DELIMITER ;

/*
frontion qui détermine la proportinalité entre le nombre de point/set/match gagné comparé a ceux perdu (+1 si aucun match perdu pour le diférentier du 1 match/set/point perdu)
*/

DROP FUNCTION IF EXISTS proportion;
DELIMITER $$
CREATE FUNCTION proportion(w int(100), l int(100))
	RETURNS FLOAT
	BEGIN 
		IF (l=0)THEN
			IF(w=0)THEN
				RETURN 0;
			ELSE
				RETURN w+1;
			END IF;
		ELSE
			RETURN w/l;
		END IF;
	END$$

DELIMITER;

/*
procedure qui génère un tableau des score global (tous tournoi confondu)
*/
DROP PROCEDURE IF EXISTS scoreEquipes;
DELIMITER $$

CREATE PROCEDURE
	scoreEquipes()
  BEGIN
		SELECT 	DISTINCT idEquipe,
						matchWin, 
						proportion(COUNT(CASE WHEN `set`.idWin=inscription.id THEN 1 END),COUNT(CASE WHEN `set`.idWin<>inscription.id AND (match.equipeA=inscription.id OR match.equipeB=inscription.id)THEN 1 END))AS setWin,
					 	proportion(SUM(CASE WHEN `match`.equipeA=inscription.id THEN pointA WHEN `match`.equipeB=inscription.id THEN pointB END),SUM(CASE WHEN `match`.equipeA=inscription.id THEN pointB WHEN `match`.equipeB=inscription.id THEN pointA END) )AS pointWin
		FROM inscription ,`match`,`set` ,
			(SELECT 
				DISTINCT inscription.id AS idinscr, 
				proportion(COUNT(CASE WHEN `match`.idWin=inscription.id THEN 1 END),COUNT(CASE WHEN `match`.idWin<>inscription.id AND (`match`.equipeA=inscription.id OR `match`.equipeB=inscription.id) THEN 1 END))AS matchWin 
				FROM inscription LEFT JOIN `match` 
				ON (inscription.id=equipeA OR inscription.id=equipeB) 
				GROUP BY idinscr)AS matchwintable
		WHERE inscription.id=idinscr
			AND  (inscription.id=equipeA OR inscription.id=equipeB)
			AND matchequipeA=equipeA 
			AND matchequipeB=equipeB 
			AND `match`.idPoule=`set`.idPoule 
		GROUP BY idEquipe,matchWin
		ORDER BY matchWin DESC,setWin DESC,pointWin DESC;
	END$$

DELIMITER ;

/*
procedure qui génère un tableau des scores du tour courant pour un tournoi
*/
DROP PROCEDURE IF EXISTS scoreTour;
DELIMITER $$

 CREATE PROCEDURE
	scoreTour(tournoiID INT(11), numTour INT(10))
   BEGIN 
    SELECT 
			DISTINCT idEquipe,
			matchWin, 
			proportion(COUNT(CASE WHEN `set`.idWin=inscription.id THEN 1 END),COUNT(CASE WHEN `set`.idWin<>inscription.id AND (`match`.equipeA=inscription.id OR `match`.equipeB=inscription.id)THEN 1 END))AS setWin,
      proportion(SUM(CASE WHEN `match`.equipeA=inscription.id THEN pointA WHEN `match`.equipeB=inscription.id THEN pointB END),SUM(CASE WHEN `match`.equipeA=inscription.id THEN pointB WHEN `match`.equipeB=inscription.id THEN pointA END) )AS pointWin
		FROM inscription ,`match`,`set` ,
			(SELECT 
				DISTINCT inscription.id AS idinscr, 
				proportion(COUNT(CASE WHEN `match`.idWin=inscription.id THEN 1 END),COUNT(CASE WHEN `match`.idWin<>inscription.id AND (`match`.equipeA=inscription.id OR `match`.equipeB=inscription.id) THEN 1 END))AS matchWin 
				FROM inscription,`match` 
				WHERE (inscription.id=equipeA OR inscription.id = equipeB )GROUP BY idinscr) AS matchwintable
		WHERE inscription.id=idinscr
			AND (inscription.id=equipeA OR inscription.id=equipeB)
			AND matchequipeA=equipeA 
			AND matchequipeB=equipeB 
			AND `match`.idPoule=`set`.idPoule 
    	AND `match`.idPoule IN (SELECT id FROM poule WHERE idTournoi=tournoiID AND tour = numTour)
		GROUP BY idEquipe,matchWin
		ORDER BY matchWin DESC,setWin DESC,pointWin DESC;				
  END $$

DELIMITER ;

/*
fonction pour créer un match ainsi que sont premier set
*/
DROP PROCEDURE IF EXISTS insertMatch;
DELIMITER $$

CREATE PROCEDURE
	insertMatch(setganiant 	int(10), pointganiant int(10), equipeA 		int(10), equipeB 		int(10), idPoule 		int(10) )
	BEGIN
		IF NOT EXISTS(SELECT * FROM `match`WHERE ((match.equipeA = equipeA AND `match`.equipeB=equipeB) OR (`match`.equipeA = equipeB AND match.equipeB=equipeA)  )AND match.idPoule =idPoule) THEN
			INSERT INTO `match` (`idWin`, `setganiant`, `equipeA`, `equipeB`, `idPoule`) 
				VALUES ( NULL, setganiant, equipeA, equipeB, idPoule);
			
			INSERT INTO `set` (`id`, `numset`, `pointA`, `pointB`, `idWin`, `pointganiant`, `matchequipeA`, `matchequipeB`, `idPoule`) 
				VALUES (NULL, 1 , '0', '0', NULL, pointganiant, equipeA, equipeB, idPoule);
		END IF;	
	END$$

DELIMITER ;

/*
fonction pour ajouter des points au dernier set d'un match si nécéssaire
*/
DROP PROCEDURE IF EXISTS addlastSet;
DELIMITER $$

CREATE PROCEDURE
	addlastSet(npointA int(10),npointB int(10), vEA int(10), vEB int(10), vidP int(10))
	BEGIN
		UPDATE `set`
			SET
				pointA=pointA+npointA,
				pointB=pointB+npointB
			WHERE
				id =(SELECT MAX(id) FROM `set`
					WHERE idPoule=vidP AND matchequipeA=vEA AND matchequipeB=vEB);
		INSERT INTO `set` (`id`, `numset`, `pointA`, `pointB`, `idWin`, `pointganiant`, `matchequipeA`, `matchequipeB`, `idPoule`) 
			SELECT 
				NULL, 
				(SELECT MAX(numset) FROM `set`
					WHERE idPoule=vidP AND matchequipeA=vEA AND matchequipeB=vEB)+1 , 
				'0', 
				'0', 
				NULL, 
				(SELECT MAX(pointganiant) FROM `set`
					WHERE idPoule=vidP AND matchequipeA=vEA AND matchequipeB=vEB), 
				vEA, 
				vEB, 
				vidP
			WHERE 
				(SELECT idWin FROM  `match` WHERE idPoule=vidP AND equipeA=vEA AND equipeB=vEB )IS NULL
				AND
				(SELECT idWin FROM `set` WHERE id= (SELECT MAX(id) FROM `set`
					WHERE idPoule=vidP AND matchequipeA=vEA AND matchequipeB=vEB))IS NOT NULL;
	END$$
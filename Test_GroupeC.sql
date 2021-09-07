/*
Fichier : Test_GroupeC.sql
Auteurs:
DEBART Nathan 21600853
LOUATI Abdelhamid 22016508
Nom du Groupe : C

*/




/*
test procedure 
*/
/*
match
*/
CALL insertmatch('2', '15', '1' ,'2','1');

/*
#set
*/
CALL addlastSet('12','13','1','2','1');
CALL addlastSet('2','0','1','2','1');

/*
test trigger idwinset
*/
CALL addlastSet('1','0','1','2','1');

/*
test trigger idwinmatch
*/
CALL addlastSet('14','15','1','2','1');
CALL addlastSet('15','10','1','2','1');

/*
test proportion
*/
SELECT proportion(1,0);
SELECT proportion(0,1);
SELECT proportion (0,0);
SELECT proportion (1,1);
SELECT proportion (3,2);

/*
test score
*/

CALL scoreEquipes();
CALL scoreTour(1,1);


CALL insertmatch('2', '10', '1' ,'2','2');
CALL insertmatch('3', '15', '2' ,'1','3');

CALL addlastSet('14','15','2','1','3');
CALL addlastSet('3','10','1','2','2');
CALL addlastSet('14','15','2','1','3');
CALL addlastSet('14','15','2','1','3');

CALL scoreEquipes();
CALL scoreTour(1,2);
CALL scoreTour(1,1);

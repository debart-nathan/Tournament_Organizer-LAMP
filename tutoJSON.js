function printjson(){
	var equipeJSON= '{"equipe": [{"nom": "equipe1"} , {"nom": "equipe2" , "niveau": 3}, {"nom":"equipe3"}, {"nom":"equipe5"}] , "match":[{"idmatch": 1 ,"set":[{ "numeroset":1},{"numeroset":2}]},{"idmatch": 2, "set":[{ "numeroset":1, "scoreA":3},{"numeroset":2}]}]}';
  
	var equipe= JSON.parse(equipeJSON)
	equipe.equipe.push({"nom":"equipe6", "niveau": 3})  //nouvel objet JSON dans tableau

	equipe.poule= 4                                     //nouvel clef+ value si clef non existante affectation sinon !!value obligatoire

	delete equipe["equipe"][1]["niveau"]								//delete un objet json aussi utile sur clef

	 var equipe.poule= new Array												//crée une clef contenant un tableau vide ou si clef existe affectation 

	if (("bidon" in equipe)==false){										//cherche si clef existe
		console.log("salut")
	}

	var objdelete=JSON.parse('{"nom":"equipe6"}')																								//
	for (var i=0; i<equipe["equipe"].length; i++){																							//
 		if (JSON.stringify(equipe["equipe"][i]) == JSON.stringify(objdelete)) {										//delete objet json spécifique dans tableau
  		equipe["equipe"].splice(i, 1);																													//
 		}																																													//
	}

	for(var i=0; i<equipe["equipe"].length; i++){
		console.log(equipe["equipe"][i]["nom"])
	}
}
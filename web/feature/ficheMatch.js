


function fResult(){										//entrer des donné a la fin d'un set
	

	document.getElementById("presult").disabled = false;
	document.getElementById("fresult").disabled = true;
	var entry=document.getElementById("entry")
	entry.innerHTML="";

	json= JSON.parse(document.getElementById("JSON").value);

	var currentTournoi= document.getElementById("currentTournoi").value
	var currentNiveau= document.getElementById("currentNiveau").value
	max =json.tournoi[currentTournoi].pouleTournoi[currentNiveau].pointganiant

	scoreA =document.createElement("input")
	scoreA.id="scoreA"
	scoreA.type="number"
	scoreA.min=0
	scoreA.max=max
	entry.appendChild(scoreA)

	scoreB =document.createElement("input")
	scoreB.id="scoreB"
	scoreB.type="number"
	scoreB.min=0
	scoreB.max=max
	entry.appendChild(scoreB)
	
	var valide =document.createElement("button")
	valide.id="valide"
	valide.type="button"
	valide.innerHTML="valide"
	entry.appendChild(valide)
	valide.setAttribute('onclick',"eScore()")
}

function pResult(){												//entré des donné  en dirrect

////////////////////////////////////////////////////////////////////ajouter test de connection
	document.getElementById("fresult").disabled = false;
	document.getElementById("presult").disabled = true;
	document.getElementById("entry").innerHTML="";

	json= JSON.parse(document.getElementById("JSON").value);

	var currentTournoi= document.getElementById("currentTournoi").value
	var currentPoule= document.getElementById("currentPoule").value
	max =json.tournoi[currentTournoi].pouleTournoi[currentPoule].pointganiant

	scoreA =document.createElement("input")
	scoreA.id="scoreA"
	scoreA.type="number"
	scoreA.min=0
	scoreA.max=max
	scoreA.value=0
	scoreA.readOnly=true
	entry.appendChild(scoreA)

	scoreB =document.createElement("input")
	scoreB.id="scoreB"
	scoreB.type="number"
	scoreB.min=0
	scoreB.max=max
	scoreB.value=0
	scoreB.readOnly=true
	entry.appendChild(scoreB)

	entry.appendChild(document.createElement("br"))


	var ajouter =document.createElement("input")
	ajouter.id="ajouter"
	ajouter.type="number"
	ajouter.value=0
	entry.appendChild(ajouter)

	entry.appendChild(document.createElement("br"))
	
	var addA =document.createElement("button")
	addA.id="addA"
	addA.type="button"
	addA.innerHTML="Ajoute a Team A"
	entry.appendChild(addA)

	var addB =document.createElement("button")
	addB.id="addB"
	addB.type="button"
	addB.innerHTML="Ajoute a Team B"
	entry.appendChild(addB)

}

function eScore(){
	var currentTournoi= document.getElementById("currentTournoi").value
	var currentPoule= document.getElementById("currentPoule").value
	var currentNiveau= document.getElementById("currentNiveau").value
	var currentMatch= document.getElementById("currentMatch").value
	var currentSet= document.getElementById("currentMatch").value



	if(setFini()){
		json.tournoi[currentTournoi].pouleTournoi[currentNiveau].poule[currentPoule].match[currentMatch].set= new Array
		json.tournoi[currentTournoi].pouleTournoi[currentNiveau].poule[currentPoule].match[currentMatch].set.push({"pointA": scoreA.value})
		json.tournoi[currentTournoi].pouleTournoi[currentNiveau].poule[currentPoule].match[currentMatch].set[currentSet].pointB=scoreB.value
		var gagnant
		if(scoreA.value > scoreB.value)
			gagnant= json.tournoi[currentTournoi].pouleTournoi[currentNiveau].poule[currentPoule].match[currentMatch].idequA
		else
			gagnant= json.tournoi[currentTournoi].pouleTournoi[currentNiveau].poule[currentPoule].match[currentMatch].idequB

		json.tournoi[currentTournoi].pouleTournoi[currentNiveau].poule[currentPoule].match[currentMatch].set[currentSet].idwin = gagnant

		if(matchFini(gagnant)){
			json.tournoi[currentTournoi].pouleTournoi[currentNiveau].poule[currentPoule].match[currentMatch].idwin 								///////////// manque mise a jour des constante ainsi que le message de la page php
		}
	}else{
		entry.innerHTML += "Set pas encore décidé veuillez entrer les valeurs une fois que le set est terminé"
	}
}

function setFini(){
	return (scoreA.value >= max || scoreB.value >=max)

}

function matchFini(idgan){
	var currentTournoi= document.getElementById("currentTournoi").value
	var currentPoule= document.getElementById("currentPoule").value
	var currentNiveau= document.getElementById("currentNiveau").value
	var currentNiveau= document.getElementById("currentNiveau").value
	var currentMatch= document.getElementById("currentMatch").value

	var count=0
	var set = json.tournoi[currentTournoi].pouleTournoi[currentNiveau].poule[currentPoule].match[currentMatch].set
	for(var i=0;i<set.length;i++){
		if(set.idwin==idgan){
			count++
		}
	}
	return count== json.tournoi[currentTournoi].pouleTournoi[currentNiveau].setganiant
}

function pouleFini(){

}

function nextpoule(){
	
}
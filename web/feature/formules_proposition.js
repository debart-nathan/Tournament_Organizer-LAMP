function allDiviser() {
	var json = JSON.parse(document.getElementById("JSON").value);
	var prop = document.getElementById("propositions");
	prop.innerHTML = "";
	
	if (("equipe" in json) == false) {
		prop.innerHTML = "aucune equipe";
	} else {
		var nb = json.equipe.length;
		
		if (nb == 1) {
			document.prop.innerHTML = "qu'un participant le gagnant par default est donc " + json.equipe
		} else {
			var ulpr=document.createElement("ul")
			ulpr.id="ulpr"
			prop.appendChild(ulpr)

			if (nb == 2) {
				var divise = createRadio(1 + "x" + 2);	
				ulpr.appendChild(divise);
			}
			for (let i = 1; i <= (nb / 2); i++) {						//Recherche de l'intégralité des diviseurs du nombre total d'équipes
				ulpr.innerHTML+="<br>"
				if (nb % i == 0) {												
					var divise = createRadio(i + "x" + nb / i);		
					ulpr.appendChild(divise);							//Récupération du diviseur et du quotion qui correspondent au nombre de poules ainsi qu'au 	nombre d'équipes par poule		
				} else {
					var rst = nb % i;									//recuperation du reste de la partie entière de la division du nbEquipe par l'iteratuer i
					var quot = Math.trunc(nb / i);						//recuperation de la partie entière de la division du nbEquipe par l'iterateur i
					strangePoule(quot, i, rst, ulpr);  					//on apel la fontion de création en cas de poule composé pour i poules de quot equipe
					strangePoule(i, quot, rst, ulpr);
				}
			}
			sortList(ulpr.id);


			prop.innerHTML += "<br>"
			var lsetganiant = document.createElement("label")
			lsetganiant.for = "setganiant"
			lsetganiant.innerHTML = "Nombre(s) de set(s) pour gagner un match  :"
			prop.appendChild(lsetganiant)

			prop.innerHTML += "<br>"
			var setganiant = document.createElement("input")
			setganiant.type = "number"
			setganiant.min = "1"
			setganiant.id = "setganiant"
			prop.appendChild(setganiant)

			prop.innerHTML += "<br>"
			prop.innerHTML += "<br>"
			var lpointganiant = document.createElement("label")
			lpointganiant.for = "pointganiant"
			lpointganiant.innerHTML = "Nombre(s) de point(s) pour gagner un set  :"
			prop.appendChild(lpointganiant)

			prop.innerHTML += "<br>"
			var pointganiant = document.createElement("input")
			pointganiant.type = "number"
			pointganiant.min = "1"
			pointganiant.id = "pointganiant"
			prop.appendChild(pointganiant)

	
			prop.innerHTML += "<br>"
			var erreur = document.createElement("p")
			erreur.type="ErrorText"
			erreur.id ="erreur"
			erreur.innerHTML=""
			prop.appendChild(erreur)


			prop.innerHTML += "<br>"
			var valide = document.createElement("button")
			valide.type = "button"
			valide.setAttribute('onclick', "createPoule()")
			valide.innerHTML = "validé"
			prop.appendChild(valide)
		}
	}
}


function strangePoule(nbp, nbq, rst, prop) {
	var opt = false;
	var j = 0;
	while (opt == false && nbp != 0) {
		if (rst % (nbq - 1) == 0 && (nbq - 1) != 1) {
			opt = true;
		}
		else {
			j++;
			nbp = nbp - 1;
			rst = rst + nbq;
		}
	}

	if (opt == true) {
		var radio = createRadio(nbp + "x" + nbq + "+" + (rst / (nbq - 1)) + "x" + (nbq - 1));
		if (prop.querySelector("[id='" + radio.id + "']") == null) {
			prop.appendChild(radio);

		}
	}
}

											
function createRadio(text) {																
	var li = document.createElement("le")							
	li.id = text+"-li"

	var radio = document.createElement("input")						
	radio.type = "radio"									
	radio.id = text											
	radio.name = "formule"
	li.appendChild(radio)

	var label = document.createElement("label")						
	label.id = text+"-lab"
	label.htmlFor=text
	var ltext = text.split(/[x+]+/)
	label.innerHTML = ltext[0] + " Poules de " + ltext[1] + " Equipes"
	if (ltext.length == 4) {
		
		label.innerHTML += " et " + ltext[2] + " Poules de " + ltext[3] + " Equipes"

	}								
							
	li.appendChild(label);												
	return li;														
}																	



function sortList(ulid) {
	var list, i, switching, b, shouldSwitch;
	list = document.getElementById(ulid);
	switching = true;
	while (switching) {
		switching = false;
		b = list.getElementsByTagName("LI");
		for (i = 0; i < (b.length - 1); i++) {
			shouldSwitch = false;
			var parsedId1 = b[i].id.split(/[x+]+/);
			var parsedId2 = b[i + 1].id.split(/[x+]+/);
			if (smaller(parsedId1, parsedId2)) {
				shouldSwitch = true;
				break;
			}
		}
		if (shouldSwitch) {
			b[i].parentNode.insertBefore(b[i + 1], b[i]);
			switching = true;
		}
	}
}

function smaller(a, b) {

	if (parseInt(a[1]) < parseInt(b[1])) {
		return true;
	}
	if (parseInt(a[1]) > parseInt(b[1])) {
		return false;
	}
	if (parseInt(a[3]) < parseInt(b[3])) {
		return true;
	}
	if (parseInt(a[3]) > parseInt(b[3])) {
		return false;
	}

}
function echange(node1_id, node2_id) {
	var node1 = document.getElementById(node1_id)
	var node2 = document.getElementById(node2_id)
	var tmp = document.createElement("span")
	node1.parentNode.insertBefore(tmp, node1); 					 	//inserré l'élément temporaire avant la position actuel de node1
	node2.parentNode.insertBefore(node1, node2);    				//place node1 juste avant node2
	tmp.replaceWith(node2)											//remplace l'élément temporaire par node2 et le supprime à son ancienne position

}




function createPoule() {
	var formule = document.querySelector('input[name="formule"]:checked')
	var currentNiveau = document.getElementById("currentNiveau").value
	var currentTournoi = parseInt(document.getElementById("currentTournoi").value)
	var setganiant = document.getElementById("setganiant").value
	var pointganiant = document.getElementById("pointganiant").value
	var json=document.getElementById("JSON")
	var jsonTab = JSON.parse(json.value)

	var erreurText = ""

	if (formule == null) {
		erreurText += "<br> sélectioner une formule "
	}
		

	if (setganiant == "") {
		erreurText += "<br> sélectioner un nombre de set gagnant"
	}


	if (pointganiant == "") {
		erreurText += "<br> sélectioner un nombre de point gagnant"
		
	}

	if (erreurText !="") {
		var erreur = document.getElementById("erreur")
		erreur.innerHTML=erreurText
	}else{
		var tabFormule = formule.id.split("+")
		if (!(jsonTab.tournoi[currentTournoi].hasOwnProperty("pouleTournoi")) ){
			jsonTab.tournoi[currentTournoi].pouleTournoi = new Array
		}
		jsonTab.tournoi[currentTournoi].pouleTournoi.push({ "niveau": currentNiveau })
		var currentPouleTournoi = jsonTab.tournoi[currentTournoi].pouleTournoi.length - 1
		jsonTab.tournoi[currentTournoi].pouleTournoi[currentPouleTournoi].setganiant = setganiant
		jsonTab.tournoi[currentTournoi].pouleTournoi[currentPouleTournoi].pointganiant = pointganiant
		if ( !(jsonTab.tournoi[currentTournoi].pouleTournoi[currentPouleTournoi].hasOwnProperty("poule"))) {
			jsonTab.tournoi[currentTournoi].pouleTournoi[currentPouleTournoi].poule = new Array
		}
		
		for (var i = 0; i < tabFormule.length; i++) {
			tabFormule[i] = tabFormule[i].split("x");
			for (var j = 0; j < tabFormule[i][0]; j++) {
	
				jsonTab.tournoi[currentTournoi].pouleTournoi[currentPouleTournoi].poule.push({ "nbequipe": tabFormule[i][1] })
			}
		}
		json.value = JSON.stringify(jsonTab)

	}

}
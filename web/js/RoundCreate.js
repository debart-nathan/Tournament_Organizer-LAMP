
/*
*Formule proposition
*
*
*/
let jsonLevel;


function allDiviser() {
	const prop = document.getElementById("propositions");

	prop.innerHTML="";

	if (!("teams" in jsonLevel)) {
		prop.innerHTML = "aucune equipe";
		return
	}
	const nb = jsonLevel.teams.length;

	if (nb == 1) {
		document.prop.innerHTML = `qu'un participant le gagnant par default est donc ${jsonLevel.teams.name}`
		return
	}
	const ulpr = document.createElement("ul")
	ulpr.id = "ulpr"
	prop.appendChild(ulpr)

	let divise

	if (nb == 2) {
		divise = createRadio(`1x2`);
		ulpr.appendChild(divise);
	}
	for (let i = 1; i <= (nb / 2); i++) {						//Recherche de l'intégralité des diviseurs du nombre total d'équipes
		ulpr.innerHTML += "<br>"
		if (nb % i == 0) {
			divise = createRadio(`${i}x${nb / i}`);
			ulpr.appendChild(divise);							//Récupération du diviseur et du quotion qui correspondent au nombre de poules ainsi qu'au 	nombre d'équipes par poule		
		} else {
			const rst = nb % i;									//recuperation du reste de la partie entière de la division du nbEquipe par l'iteratuer i
			const quot = Math.trunc(nb / i);						//recuperation de la partie entière de la division du nbEquipe par l'iterateur i
			strangePoule(quot, i, rst, ulpr);  					//on apel la fontion de création en cas de poule composé pour i poules de quot equipe
			strangePoule(i, quot, rst, ulpr);
		}
	}
	sortList(ulpr.id);


	prop.innerHTML += "<br>"
	const lsetganiant = document.createElement("label")
	lsetganiant.for = "setganiant"
	lsetganiant.innerHTML = "Nombre(s) de set(s) pour gagner un match  :"
	prop.appendChild(lsetganiant)

	prop.innerHTML += "<br>"
	const setganiant = document.createElement("input")
	setganiant.type = "number"
	setganiant.min = "1"
	setganiant.id = "setganiant"
	prop.appendChild(setganiant)

	prop.innerHTML += "<br>"
	prop.innerHTML += "<br>"
	const lpointganiant = document.createElement("label")
	lpointganiant.for = "pointganiant"
	lpointganiant.innerHTML = "Nombre(s) de point(s) pour gagner un set  :"
	prop.appendChild(lpointganiant)

	prop.innerHTML += "<br>"
	const pointganiant = document.createElement("input")
	pointganiant.type = "number"
	pointganiant.min = "1"
	pointganiant.id = "pointganiant"
	prop.appendChild(pointganiant)


	prop.innerHTML += "<br>"
	const erreur = document.createElement("p")
	erreur.type = "ErrorText"
	erreur.id = "erreur"
	erreur.innerHTML = ""
	prop.appendChild(erreur)


	prop.innerHTML += "<br>"
	const valide = document.createElement("button")
	valide.type = "button"
	valide.setAttribute('onclick', "createPoule()")
	valide.innerHTML = "validé"
	prop.appendChild(valide)
}


function strangePoule(nbp, nbq, rst, prop) {
	let opt = false;
	while (!(opt) && nbp != 0) {
		if (rst % (nbq - 1) == 0 && (nbq - 1) != 1) {
			opt = true;
		}
		else {
			nbp = nbp - 1;
			rst = rst + nbq;
		}
	}

	if (opt) {
		const radio = createRadio(`${nbp}x${nbq}+${rst / (nbq - 1)}x${nbq - 1}`);
		if (prop.querySelector(`[id='${radio.id}']`) == null) {
			prop.appendChild(radio);

		}
	}
}


function createRadio(text) {
	const li = document.createElement("le")
	li.id = `${text}-li`

	const radio = document.createElement("input")
	radio.type = "radio"
	radio.id = text
	radio.name = "formule"
	li.appendChild(radio)

	const label = document.createElement("label")
	label.id = `${text}-lab`
	label.htmlFor = text
	const ltext = text.split(/[x+]+/)
	label.innerHTML = `${ltext[0]}  Poules de  ${ltext[1]}  Equipes`
	if (ltext.length == 4) {

		label.innerHTML += ` et  ${ltext[2]} Poules de ${ltext[3]} Equipes`

	}

	li.appendChild(label);
	return li;
}



function sortList(ulid) {
	let list, i, switching, b, shouldSwitch;
	list = document.getElementById(ulid);
	switching = true;
	while (switching) {
		switching = false;
		b = list.getElementsByTagName("LI");
		for (i = 0; i < (b.length - 1); i++) {
			shouldSwitch = false;
			const parsedId1 = b[i].id.split(/[x+]+/);
			const parsedId2 = b[i + 1].id.split(/[x+]+/);
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
	const node1 = document.getElementById(node1_id)
	const node2 = document.getElementById(node2_id)
	const tmp = document.createElement("span")
	node1.parentNode.insertBefore(tmp, node1); 					 	//inserré l'élément temporaire avant la position actuel de node1
	node2.parentNode.insertBefore(node1, node2);    				//place node1 juste avant node2
	tmp.replaceWith(node2)											//remplace l'élément temporaire par node2 et le supprime à son ancienne position

}




function createPoule() {
	const formule = document.querySelector('input[name="formule"]:checked')
	const setganiant = document.getElementById("setganiant").value
	const pointganiant = document.getElementById("pointganiant").value


	const erreurText = ""

	if (formule == null) {
		erreurText += "<br> sélectioner une formule "
	}


	if (setganiant == "") {
		erreurText += "<br> sélectioner un nombre de set gagnant"
	}


	if (pointganiant == "") {
		erreurText += "<br> sélectioner un nombre de point gagnant"

	}

	if (erreurText != "") {
		const erreur = document.getElementById("erreur")
		erreur.innerHTML = erreurText
		return
	}
	let tabFormule = formule.id.split("+")


	jsonLevel.setganiant = setganiant
	jsonLevel.pointganiant = pointganiant
	if (!(jsonLevel.hasOwnProperty("poule"))) {
		jsonLevel.poule = new Array
	}

	for (let i = 0; i < tabFormule.length; i++) {
		tabFormule[i] = tabFormule[i].split("x");
		for (let j = 0; j < tabFormule[i][0]; j++) {

			jsonLevel.poule.push({ "nbequipe": tabFormule[i][1] })
		}
	}
	repartTeams()
}




 async function getJSON() {

	jsonLevel =await (await fetch("./data/Level.JSON")).json() //TODO : Replace by Get from server with arg {"tournoi": getElementById('tournoi').value,"Evenement": getElementById('round').value,"Event": getElementById('round').value}
		
	allDiviser()
}

getJSON()


/*
*
*				Teams Repartition
*
*/





function repartTeams() {

	repartSerpentin()
	const root = document.getElementById("dynamique")
	while (root.firstChild) {
		root.removeChild(root.firstChild);
	}

	const dynTools = document.createElement("div")
	dynTools.id = "dynTools"
	const poules = document.createElement("article")
	poules.id = "poules"
	const dynNavigation = document.createElement("div")
	dynNavigation.id = "dynNavigation"

	root.appendChild(dynTools)
	root.appendChild(poules)
	root.appendChild(dynNavigation)


	//[DYNTOOLS]
	const resetbutton = document.createElement('button')
	resetbutton.type = 'button'
	resetbutton.innerHTML = "Reset Teams distribution"
	resetbutton.onclick = resetTd

	resetbutton.id = "resetTd"

	dynTools.appendChild(resetbutton)

	//[POULES]
	setPoules()

	//[dynNavigation]


}

function repartSerpentin() {
	let team_index = 0
	for (const poule of jsonLevel.poule) {
		poule.teamIid= new Array()
		poule.teamIid.length=poule.nbequipe
		for (let i = 0; i < poule.nbequipe; i++) {
			poule.teamIid[i]=team_index
			team_index++
		}
	}
}

function setPoules() {
	const rootp = document.getElementById("poules")
	while (rootp.firstChild) {
		rootp.removeChild(rootp.firstChild);
	}
	for (let pi = 0; pi < jsonLevel.poule.length; pi++) {
		const poule = document.createElement('ul')
		poule.id = `p${pi}`
		
		
		poule.value = pi
		rootp.appendChild(poule)
		for (let id=0;id<jsonLevel.poule[pi].teamIid.length;id++ ) {
			const teamId=jsonLevel.poule[pi].teamIid[id];
			const team = jsonLevel.teams[teamId]
			const lit = document.createElement('li')
			lit.id = `t${team.inscrid}`
			lit.innerHTML = team.name
			lit.draggable=true;
			lit.addEventListener("dragstart" ,drag )
			lit.addEventListener("dragover",allowdrop)
			lit.addEventListener("drop",drop)
			
			lit.value = id
			poule.appendChild(lit)

		}


	}
}

function resetTd() {
	repartSerpentin() 
	setPoules()
}

/*
	Drag and Drop
*/
function drag(ev){
	ev.dataTransfer.setData("childID", ev.target.id);
}

function allowdrop(ev){
	ev.preventDefault()
	ev.dataTransfer.dropEffect = "move";
}

function drop(ev){
	ev.preventDefault()
	const node2 = document.getElementById( ev.dataTransfer.getData("childID"))
	const afterNode2 = node2.nextElementSibling;
	const parent = node2.parentNode;
    ev.target.replaceWith(node2);
    parent.insertBefore(ev.target, afterNode2);

}
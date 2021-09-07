function allDiviser(){
	var json= JSON.parse(document.getElementById("JSON").value);
	var prop= document.getElementById("propositions");
	if (("equipe" in json)==false){
		prop.innerHTML="aucune equipe";
	}else{
 		var nb=json.equipe.length;
		prop.innerHTML="";
		if(nb == 1){
			document.prop.innerHTML="qu'un participant le gagnant par default est donc "+json.equipe
		}else{
			if(nb== 2){
				var divise =createRadio(1+"x"+2);		//	
				prop.appendChild(divise);	
			}
			for(let i=1; i<=(nb/2);i++){									//Recherche de l'intégralité des diviseurs du nombre total d'équipes
				if(nb%i == 0){														//
					var divise =createRadio(i+"x"+nb/i);		//	
					prop.appendChild(divise);								//Récupération du diviseur et du quotion qui correspondent au nombre de poules ainsi qu'au 	nombre d'équipes par poule		
				}else{
					var rst= nb%i;									//recuperation du reste de la partie entière de la division du nbEquipe par l'iteratuer i
					var quot= Math.trunc(nb/i);			//recuperation de la partie entière de la division du nbEquipe par l'iterateur i
					strangePoule(quot,i,rst,prop);  //on apel la fontion de création en cas de poule composé pour i poules de quot equipe
				  strangePoule(i,quot,rst,prop);
				}
			}
			sortList(prop.id);


			document.body.innerHTML+= "<br>"
			var lsetganiant= document.createElement("label")
			lsetganiant.for="setganiant"
			lsetganiant.innerHTML="nombre de set pour gagner un match"
			document.body.appendChild(lsetganiant)

			var setganiant= document.createElement("input")
			setganiant.type="number"
			setganiant.min="1"
			setganiant.id="setganiant"
			document.body.appendChild(setganiant)


			document.body.innerHTML+= "<br>"
			var lpointganiant= document.createElement("label")
			lpointganiant.for="pointganiant"
			lpointganiant.innerHTML="nombre de point pour gagner un set"
			document.body.appendChild(lpointganiant)

			var pointganiant= document.createElement("input")
			pointganiant.type="number"
			pointganiant.min="1"
			pointganiant.id="pointganiant"
			document.body.appendChild(pointganiant)


			document.body.innerHTML+= "<br>"
			var valide= document.createElement("button")
			valide.type="button"
			valide.setAttribute('onclick',"createPoule()")
			valide.innerHTML="validé"
			document.body.appendChild(valide)
		}
	}
}


function strangePoule(nbp,nbq,rst, prop){
	var opt=false;
  var j=0;
  while(opt==false && nbp!=0){
    if(rst%(nbq-1)==0 && (nbq-1) != 1){
     opt=true;
    }
    else{
      j++;
      nbp=nbp-1;
      rst=rst+nbq;
    }
  }

  if(opt==true){
   var radio =createRadio(nbp+"x"+nbq+"+"+(rst/(nbq-1))+"x"+(nbq-1)); 
   if(prop.querySelector("[id='"+radio.id+"']")==null){
      prop.appendChild(radio);
			
  }
}}

function createRadioElem(text){														//
	var radio =document.createElement("input");							//
	radio.type="radio";																			//
	radio.id=text;																					//
	radio.name="formule";																		//
	return radio;																						//
}																													//crer des objet de type radio pour l'instant stoquer dans des liste
function createRadio(text){																// ayant pour id et pour label une string passer en paramêtre
	var li = document.createElement("li");									//
	li.id=text;																							//
	var label= document.createElement("label");							//
	label.id=text;
	var ltext=text.split(/[x+]+/)
	if(ltext[0]==1){
		label.innerHTML="Une Poule de "+ltext[1]+" Equipes" ;
	}else{
		label.innerHTML=ltext[0]+" Poules de "+ltext[1]+" Equipes" ;
	}
	if (ltext.length==4){
    if( ltext[2] != 1){
      label.innerHTML+=" et "+ ltext[2] +" Poules de "+ ltext[3]+" Equipes";
    }
    else{
      label.innerHTML+=" et Une Poule de "+ ltext[3]+" Equipes";
    }
		
	}	
  label.innerHTML+=".";															//
	label.appendChild(createRadioElem(text));								//
	li.appendChild(label);																	//
	return li;																							//
}																													//



function sortList(ulid) {
  var list, i, switching, b, shouldSwitch;
  list = document.getElementById(ulid);
  switching = true;
  while (switching) {
    switching = false;
    b = list.getElementsByTagName("LI");
    for (i = 0; i < (b.length-1); i++) {
      shouldSwitch = false;
			var parsedId1 =b[i].id.split(/[x+]+/);
			var parsedId2 =b[i+1].id.split(/[x+]+/);
      if (smaller(parsedId1,parsedId2)) {
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

function smaller(a,b){

	if(parseInt(a[1])<parseInt(b[1])){
    return true;
  }
  if(parseInt(a[1])>parseInt(b[1])){
    return false;
  }
  if(parseInt(a[3])<parseInt(b[3])){
    return true;
  }
  if(parseInt(a[3])>parseInt(b[3])){
    return false;
  }

}
function echange(node1_id,node2_id){
	var node1 = document.getElementById(node1_id)											
	var node2 = document.getElementById(node2_id)
	var tmp = document.createElement("span")
	node1.parentNode.insertBefore(tmp,node1); 					 	//inserré l'élément temporaire avant la position actuel de node1
	node2.parentNode.insertBefore(node1,node2);    				//place node1 juste avant node2
	tmp.replaceWith(node2)																//remplace l'élément temporaire par node2 et le supprime à son ancienne position

}




function createPoule(){
	var formule= document.querySelector('input[name="formule"]:checked')
	var currentNiveau= document.getElementById("currentNiveau").value
	var currentTournoi= parseInt(document.getElementById("currentTournoi").value)
	var setganiant= document.getElementById("setganiant").value
	var pointganiant= document.getElementById("pointganiant").value
	var json= JSON.parse(document.getElementById("JSON").value)

	var erreur = false

	if(formule == null ){
		document.body.innerHTML+= "<br> sélectioner une formule "
		erreur=true
	}else{
		formule=formule.id
	}

	if(setganiant == ""){
		document.body.innerHTML+= "<br> sélectioner un nombre de set gagnant"
		erreur=true
	}


	if(pointganiant == ""){
		document.body.innerHTML+= "<br> sélectioner un nombre de point gagnant"
		erreur=true
	}

	if(erreur==false){
		var formule= formule.split("+")
		if (("pouleTournoi" in json.tournoi[currentTournoi])==false){
			json.tournoi[currentTournoi].pouleTournoi= new Array
		}
		json.tournoi[currentTournoi].pouleTournoi.push({"niveau":currentNiveau})
		var currentPouleTournoi =json.tournoi[currentTournoi].pouleTournoi.length - 1
		json.tournoi[currentTournoi].pouleTournoi[currentPouleTournoi].setganiant=setganiant
		json.tournoi[currentTournoi].pouleTournoi[currentPouleTournoi].pointganiant=pointganiant
		for(var i=0; i<formule.length;i++){
			formule[i]=formule[i].split("x");
			for(var j=0; j<formule[i][0];j++){
				if (("poule" in json.tournoi[currentTournoi].pouleTournoi[currentPouleTournoi])==false){
			    json.tournoi[currentTournoi].pouleTournoi[currentPouleTournoi].poule= new Array
			  }
				json.tournoi[currentTournoi].pouleTournoi[currentPouleTournoi].poule.push({"nbequipe":formule[i][1]})
			}
		}
		document.body.innerHTML+=JSON.stringify(json)
		
	}
	
}
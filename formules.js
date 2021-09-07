function allDiviser(){
	var nb =document.getElementById("nbEquipe").value;
	var prop= document.getElementById("propositions");
	prop.innerHTML="";
	for(let i=1; i<=(nb/2);i++){									//Recherche de l'intégralité des diviseurs du nombre total d'équipes
		if(nb%i == 0){														//
			var divise =createRadio(i+"x"+nb/i);		//
			prop.appendChild(divise);								//Récupération du diviseur et du quotion qui correspondent au nombre de poules ainsi qu'au nombre d'équipes par poule		
		}else{
			var rst= nb%i;									//recuperation du reste de la partie entière de la division du nbEquipe par l'iteratuer i
			var quot= Math.trunc(nb/i);			//recuperation de la partie entière de la division du nbEquipe par l'iterateur i
			strangePoule(quot,i,rst,prop);  //on apel la fontion de création en cas de poule composé pour i poules de quot equipe
		  strangePoule(i,quot,rst,prop);
		}
	}
	sortList("propositions");
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
	label.id=text;																					//
	label.innerHTML=text;																		//
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
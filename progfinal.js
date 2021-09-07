function repartSerpentin(){
  	var nbp =document.getElementById("nbEquipeParPoule").value;

    	var equipeJSON= '{"equipe": [{"nom": "equipe1"} , {"nom": "equipe2"}, {"nom":"equipe3"}, {"nom":"equipe4"}, {"nom":"equipe5"}, {"nom":"equipe6"}, {"nom":"equipe7"}, {"nom":"equipe8"}, {"nom":"equipe9"}, {"nom":"equipe10"}, {"nom":"equipe11"}, {"nom":"equipe12"}, {"nom":"equipe13"}, {"nom":"equipe14"}, {"nom":"equipe15"}, {"nom":"equipe16"}, {"nom":"equipe17"}, {"nom":"equipe18"}, {"nom":"equipe19"}, {"nom":"equipe20"}, {"nom":"equipe21"}],"poule":[{ "id":0 ,"nbequipe":2, "equipe":[]},{ "id":1 ,"nbequipe":2, "equipe":[]},{ "id":1 ,"nbequipe":2, "equipe":[]},{ "id":1 ,"nbequipe":2, "equipe":[]}]}'

      equipes= JSON.parse(equipeJSON);
      var j=0;  
      nbrp= equipes["poule"].length;
      while(allFull(equipes["poule"]) == false){
        
        for(i=0;i<nbrp;i++){
          if(fullPoule(equipes["poule"][i])==false){
		        equipes.poule[i].equipe.push(equipes["equipe"][j] );
            j++;
	          
            
          }
        }
        for(i=nbrp-1;i>=0;i--){
          if(fullPoule(equipes["poule"][i])==false){
            equipes.poule[i].equipe.push(equipes["equipe"][j]);
            j++;
          }
        }
      }      

        switchEquipe("equipe1","equipe8")

      	for(var i=0; i<equipes["poule"].length; i++){
		      console.log(equipes["poule"][i])
	        }



}



function fullPoule(a){
  if(a["nbequipe"]>a["equipe"].length){
    return false;
  }
  return true;
}



function allFull(a){
  for(let i=0;i<a.length;i++){
    if (fullPoule(a[i]) == false) return false;
  }
  return true;
}

function switchEquipe(id1,id2){
  
  const t1=chercherEquipe(id1).slice();
  const t2=chercherEquipe(id2).slice();
  if(t1 != null && t2 != null){

  var ind1,ind2,ind3,ind4;
  ind1= t1[0];
  ind2= t1[1];
  ind3= t2[0];
  ind4= t2[1];

  var temp= JSON.stringify(equipes["poule"][ind1]["equipe"][ind2]);

  equipes["poule"][ind1]["equipe"][ind2]=equipes["poule"][ind3]["equipe"][ind4];

  equipes["poule"][ind3]["equipe"][ind4]=JSON.parse(temp);


  }

}

function nextTour(gg){
  var lvlmax= getlevel();
  var prec = lvl-1;
  var nbrp= equipes["poule"].length;
  var max = nbrp*gg;
  var t=[];
   t.push();
   t.push(max);
    return t;

  return max;

}

function chercherEquipe(id){
  	for (var i=0; i<equipes["poule"].length; i++){			   for(var j=0 ; j<equipes["poule"][i]["equipe"].length; j++){
          if (JSON.stringify(equipes["poule"][i]["equipe"][j]["nom"]) == JSON.stringify(id)) {	
            var t=[];
            t.push(i);
            t.push(j);
            return t;
          	}						 

          																										

    }																		
 						
}
 return null;
}

function getlevel(){
  max = 0;
  nbrp= equipes["poule"].length;
  for(i=0;i<nbrp;i++){
    if(equipes["poule"][i]["niveau"]>max){
      max = equipes["poule"][i]["niveau"];
    }
  }

  return max;

}
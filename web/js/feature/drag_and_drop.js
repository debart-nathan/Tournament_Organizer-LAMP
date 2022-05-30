function allowDrop(ev){
ev.preventDefault();      //prevent le traitement par default de l'évenement ondragover qui permet de droper un element sur celui ci
}

function drag(ev){
ev.dataTransfer.setData("target_id",ev.target.id); //set quelle data est transferé lors du glisser déposer
}



function drop(ev) {
  ev.preventDefault();  
  var drop_target = ev.target;																			//enregistre l'élément sur lequel on a déposé celui qu'on drag
  var drag_target_id = ev.dataTransfer.getData('target_id');				//recupéré l'id de l'élément drager via les data précédement enregistrer (voir function drag) 
  echangeDOM(drop_target.id,drag_target_id)			//echange de position l'élément a drag et l'élément a drop
}

function echangeDOM(node1_id,node2_id){
	var node1 = document.getElementById(node1_id)											
	var node2 = document.getElementById(node2_id)
	var tmp = document.createElement("span")
	node1.parentNode.insertBefore(tmp,node1); 					//inserré l'élément temporaire avant la position actuel de node1
	node2.parentNode.insertBefore(node1,node2);    				//place node1 juste avant node2
	tmp.replaceWith(node2)										//remplace l'élément temporaire par node2 et le supprime à son ancienne position
}
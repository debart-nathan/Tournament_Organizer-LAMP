function testjson(){

var obj= '{"match":[{"id":1,"eq":"eq1"},{"id":2,"eq":"eq2"},{"id":3,"eq":"eq3"},{"id":4 ,"eq":"eq4"}],"equipe":[{"id":"eq1","joueurs":[{"nom":"a","prenom":"b"},{"nom":"b","prenom":"c"}]},{"id":"eq1","joueurs":[{"nom":"a","prenom":"b"},{"nom":"d","prenom":"c"}]},{"id":"eq1","joueurs":[{"nom":"a","prenom":"b"},{"nom":"b","prenom":"x"}]},{"id":"eq1","joueurs":[{"nom":"a","prenom":"b"},{"nom":"b","prenom":"c"}]}]}'

  var objJson=JSON.parse(obj);
  objJson.equipe.push(JSON.parse('{"id":"eq8","joueurs":[{"nom":"x","prenom":"y"},{"nom":"x","prenom":"y"}]}'))

  for(let i=0; i<objJson["equipe"].length; i++){
    console.log(objJson["equipe"][i]["joueurs"][1]["prenom"]);
  }
}



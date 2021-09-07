<html>
  <head>
    <title>PHP Test</title>
  </head>
  <body>
    

    <p id="demo3"></p>  <!-- séparer par intermediaire d'un hiden -->
    <input type=hidden id=variableAPasser value=<?php echo json_encode("salut"); ?>/>
    <script>
      var variableRecuperee = document.getElementById("variableAPasser").value;
      document.getElementById("demo3").innerHTML = variableRecuperee;
    </script>
		
		
  </body>
</html>
<?php 
	$mysqli = new mysqli("localhost","root" , "", "tournoi");

	if ($mysqli->connect_errno) {
    	printf("Échec de la connexion : %s\n", $mysqli->connect_error);
   		exit();
	}

	/* "Create table" ne retournera aucun jeu de résultats */
	if ($mysqli->query("CREATE TABLE equipe (id     int(10) NOT NULL AUTO_INCREMENT, nom    char(11) NOT NULL, niveau int(11) NOT NULL, PRIMARY KEY (id));") === TRUE) {
   		printf("Table myCity créée avec succès.\n");
	} 
?>
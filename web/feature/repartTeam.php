<html>
 <head>
    <title>repartition en serpentin</title>
    <script type="text/javascript" src="progfinal.js"></script>
		<script src="https://ajax.googleapis.com/ajax/libs/jquery/3.5.1/jquery.min.js"></script>
  </head>
  <body>
		<form id="serpentin">
      <input type="number" id="nbEquipeParPoule" name="nbEquipeParPoule" min="1" placeholder="Nombre d'équipe dans la poule"></input>
			<button type="button" id="generate" name="generate" onclick="repartSerpentin()">Repartition</button>
		</form>
    
		<ul id="propositions">
		</ul>
  </body>
  </html>
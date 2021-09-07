<html>
 <head>
    <title>formules</title>
    <script type="text/javascript" src="formules.js"></script>
		<script src="https://ajax.googleapis.com/ajax/libs/jquery/3.5.1/jquery.min.js"></script>
  </head>
  <body>
		<form id="choixFormule">
			<input type="number" id="nbEquipe" name="nbEquipe" min="0" placeholder="nbEquipe"></input>
			<button type="button" id="generate" name="generate" onclick="allDiviser()">generate</button>
		</form>
		<ul id="propositions">
		</ul>
  </body>
  </html>
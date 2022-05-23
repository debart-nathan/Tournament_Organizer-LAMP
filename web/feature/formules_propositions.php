<html>
 <head>
    <title>formules_proposition</title>
    <script type="text/javascript" src="formules_proposition.js"></script>
		<script src="https://ajax.googleapis.com/ajax/libs/jquery/3.5.1/jquery.min.js"></script>
  </head>
  <body>
		<form id="choixFormule">
			<button type="button" id="generate" name="generate" onclick="allDiviser()">generate</button>

		</form>
		<ul id="propositions">
		</ul>
		<div name="donné">
			<input type="hidden" id="JSON" value='{"tournoi":[{"idevent":3 ,"nomTournoi":"litleCup"}],"equipe":[{"nom":"equipe1"},{"nom":"equipe2"},{"nom":"equipe3"},{"nom":"equipe4"},{"nom":"equipe5"},{"nom":"equipe6"},{"nom":"equipe7"},{"nom":"equipe8"},{"nom":"equipe9"},{"nom":"equipe10"}] }'>
			<input type="hidden" id="currentTournoi" value='0'>
			<input type="hidden" id="currentNiveau" value='0'>
		</div>
		
  </body>
  </html>
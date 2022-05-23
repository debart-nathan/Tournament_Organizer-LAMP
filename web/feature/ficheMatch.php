<html>
 <head>
    <title>fiche de match</title>
    <script type="text/javascript" src="ficheMatch.js"></script>
		<script src="https://ajax.googleapis.com/ajax/libs/jquery/3.5.1/jquery.min.js"></script>
  </head>
  <body>
		<div name="donné">
			<input type="hidden" id="JSON" value='{"tournoi":[{"idevent":3 ,"nomTournoi":"litleCup", "pouleTournoi":[{"niveau": 0, "setganiant": 3 ,"pointganiant":15 ,"poule":[ { "nbequipe":5 ,"idequipe":[1,2,3,4,5],"match":[ {"equipeA":1 ,"equipeB":2 }, {"equipeA":3 ,"equipeB":4 }]},{ "nbequipe":5 ,"equipe":[6,7,8,9,10],"match":[ {"equipeA":6 ,"equipeB":7 }, {"equipeA":8 ,"equipeB":9 }]}]}]}],"equipe":[{"id":1 ,"nom":"equipe1"},{"id":2,"nom":"equipe2"},{"id":3,"nom":"equipe3"},{"id":4,"nom":"equipe4"},{"id":5,"nom":"equipe5"},{"id":6,"nom":"equipe6"},{"id":7,"nom":"equipe7"},{"id":8,"nom":"equipe8"},{"id":9,"nom":"equipe9"},{"id":10,"nom":"equipe10"}] }'>
			
			<input type="hidden" id="currentTournoi" value='0'>
			<input type="hidden" id="currentNiveau" value='0'>
			<input type="hidden" id="currentPoule" value='0'>
			<input type="hidden" id="currentMatch" value='0'>
			<input type="hidden" id="currentSet" value='0'>
			
		</div>
		<form id="dynamique">
			<p id="text">tournoi: litleCup, tour: 1, poule: A, equipe1 VS equipe2 set:1</p>
			<button type="button" id="fresult" name="final result" onclick="fResult()">final result</button>
			<button type="button" id="presult" name="progressive result " onclick="pResult()">progressive result</button>
			<div id="entry">
			</div>

		</form>
		<div name="save and quit">
			<button type="button" name="save and quit " >save and quit</button>
		</div>
		
  </body>
  </html>
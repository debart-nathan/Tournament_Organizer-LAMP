 <html>
 <head>
    <title>drag_and_drop</title>
    <script type="text/javascript" src="drag_and_drop.js"></script>
		<link rel="stylesheet" href="drag_and_drop.css">
		<script src="https://ajax.googleapis.com/ajax/libs/jquery/3.5.1/jquery.min.js"></script>
  </head>
  <body>
		<ul id= "container1" class='dragContainer'>
  		<li id="item 1" draggable="true" ondragstart="drag(event)" ondragover="allowDrop(event)" ondrop="drop(event)">Item 1</li>
  		<li id="item 2" draggable="true" ondragstart="drag(event)" ondragover="allowDrop(event)" ondrop="drop(event)">Item 2</li>
  		<li id="item 3" draggable="true" ondragstart="drag(event)" ondragover="allowDrop(event)" ondrop="drop(event)">Item 3</li>
		</ul>
		<ul id= "container2" class='dragContainer'>
  		<li id="item 4" draggable="true" ondragstart="drag(event)" ondragover="allowDrop(event)" ondrop="drop(event)">Item 4</li>
  		<li id="item 5" draggable="true" ondragstart="drag(event)" ondragover="allowDrop(event)" ondrop="drop(event)">Item 5</li>
		</ul>
  </body>
  </html>
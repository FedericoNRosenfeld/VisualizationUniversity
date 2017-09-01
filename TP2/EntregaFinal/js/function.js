
var canvas = document.getElementById("canvas");
var ctx = canvas.getContext("2d");

 ///////////////CREACION DE UNA CLASE FICHA CON APLCIACION DE UN METODO

 function Ficha(paramPosX, paramPosY,color){

 		this.Color = color;
 		this.posX =paramPosX;
 		this.posY =paramPosY;
 		this.posfX = 50;
 		this.posfY =10;

 	}

  /////////////// DIBUJAR  UNA  FICHA EN EL CANVAS

function dibujarFicha(fichaX){
	ctx.fillStyle = fichaX.Color;
	ctx.beginPath();
	ctx.fillRect(fichaX.posX,fichaX.posY,fichaX.posfX,fichaX.posfY);
	ctx.fill();
	ctx.closePath();
	}


function mouseDown(e) {
  var cX = e.clientX;
  var cY = e.clientY;
  var color = '#'+Math.floor(Math.random()*16777215).toString(16);
  var fichaX = new Ficha(cX,cY,color);
  dibujarFicha(fichaX);
}

document.getElementById("canvas").addEventListener("click",mouseDown);

//document.getElementById("canvas").addEventListener("click",function(){cambiarColores("blue");});
//document.getElementById("canvas").addEventListener("mouseover", function(){cambiarColores("green");});
//document.getElementById("canvas").addEventListener("mouseout", function(){ cambiarColores('yellow'); });

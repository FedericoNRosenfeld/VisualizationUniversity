
var canvas = document.getElementById("canvas");
var ctx = canvas.getContext("2d");

 ///////////////CREACION DE UNA CLASE FICHA CON APLCIACION DE UN METODO

 function Ficha(id,paramPosX, paramPosY,color,tamanio){
    this.id = id;
 		this.Color = color;
 		this.posX =paramPosX;
 		this.posY =paramPosY;
 		this.largoX = tamanio;
 		this.altoY =10;

 	}

  function generadorFichas(cantidad,posX,posY){
    var cX = posX;
    var cY = posY;
    var color = "";
    var tamanio = cantidad*20;
    for (i = 0; i < cantidad ;i++){
      var color = '#'+Math.floor(Math.random()*16777215).toString(16);
      var fichaX = new Ficha(cantidad,cX,cY,color,tamanio);
      dibujarFicha(fichaX);
      cY-= 12;
      tamanio-= 10;
      cX+=5;
    }
  }

  /////////////// DIBUJAR  UNA  FICHA EN EL CANVAS

function dibujarFicha(fichaX){
	ctx.fillStyle = fichaX.Color;
	ctx.beginPath();
	ctx.fillRect(fichaX.posX,fichaX.posY,fichaX.largoX,fichaX.altoY);
	ctx.fill();
	ctx.closePath();
	}


function mouseDown(e) {
  var cX = e.clientX;
  var cY = e.clientY;
  generadorFichas(3,cX,cY);
}

document.getElementById("canvas").addEventListener("click",mouseDown);

//document.getElementById("canvas").addEventListener("click",function(){cambiarColores("blue");});
//document.getElementById("canvas").addEventListener("mouseover", function(){cambiarColores("green");});
//document.getElementById("canvas").addEventListener("mouseout", function(){ cambiarColores('yellow'); });

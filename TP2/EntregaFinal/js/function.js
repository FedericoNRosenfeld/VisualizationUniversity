
var canvas = document.getElementById("canvas");
var ctx = canvas.getContext("2d");

 ///////////////CREACION DE UNA CLASE FICHA CON APLCIACION DE UN METODO
 ////// Ficha
 function Ficha(id,paramPosX, paramPosY,color,tamanio){
    this.id = id;
 		this.Color = color;
 		this.posX =paramPosX;
 		this.posY = paramPosY ;
 		this.largoX = tamanio;
 		this.altoY =10;

 	}



  /////////////// CREACION DEL TABLERO CON APLCIACION DE UN METODO
var fichas = [];

  function Columna(id,posX, posY,alto){
     this.id = id;
     this.posicionX = posX;
     this.posicionY =posY;
     this.ancho = 15;
     this.alto = -alto;
     this.fichas = [];

   }

   function Piso(posX, posY,ancho){
      this.posicionX = posX;
      this.posicionY =posY;
      this.ancho = ancho;
      this.alto = 23;

    }



    function generadorFichas(cantidad,posX,posY,columna){
      var cX = posX;
      var cY = posY;
      var color = "";
      var tamanio = cantidad*20;
      for (i = 0; i < cantidad ;i++){
        var color = '#'+Math.floor(Math.random()*16777215).toString(16);
        var fichaX = new Ficha(i+1,cX,cY,color,tamanio);
        fichas[i] = fichaX;
        columna.fichas.push(fichaX);
        cY-= 12;
        tamanio-= 10;
        cX+=5;
      }
    }


    function Tablero(cantPiezas){
      var largo = cantPiezas * 70;
      var alto = cantPiezas * 20;
      canvas.width = largo + 50;
      canvas.height = alto + 50;
      var posX = 20;
      var posY = canvas.height - 22;
      this.piso = new Piso(posX,posY,largo);
      posX = posX + Math.floor(cantPiezas*10);
      this.columna1 = new Columna(1,posX,posY,alto);
      generadorFichas(cantPiezas,posX- Math.floor(cantPiezas*9), posY - this.piso.alto /2 ,this.columna1);
      posX = posX + largo/3 ;
      this.columna2 = new Columna(2,posX,posY,alto);
      posX = posX + largo/3 ;
      this.columna3 = new Columna(3,posX,posY,alto);
    }



  /////////////// DIBUJAR  UNA  FICHA EN EL CANVAS

  Ficha.prototype.dibujarFicha = function(){
    ctx.fillStyle = this.Color;
    ctx.beginPath();
    ctx.fillRect(this.posX,this.posY,this.largoX,this.altoY);
    ctx.fill();
    ctx.closePath();
    }

  Piso.prototype.dibujarPiso = function(color){
    ctx.fillStyle = color;
  	ctx.beginPath();
  	ctx.fillRect(this.posicionX,this.posicionY,this.ancho,this.alto);
  	ctx.fill();
  	ctx.closePath();
  	}


  Columna.prototype.dibujarColumna = function(color){
    ctx.fillStyle = color;
  	ctx.beginPath();
  	ctx.fillRect(this.posicionX,this.posicionY,this.ancho,this.alto);
  	ctx.fill();
  	ctx.closePath();
  	}



  Tablero.prototype.dibujartablero = function(){
    	color = "brown";
      this.piso.dibujarPiso(color);
      this.columna1.dibujarColumna(color);
      this.columna2.dibujarColumna(color);
      this.columna3.dibujarColumna(color);
      for (i = 0;i < fichas.length; i++){
          fichas[i].dibujarFicha();
      }
  	}

  /////////////// Llamado al tablero
  t = new Tablero(3);
  t.dibujartablero();

//document.getElementById("canvas").addEventListener("click",function(){cambiarColores("blue");});
//document.getElementById("canvas").addEventListener("mouseover", function(){cambiarColores("green");});
//document.getElementById("canvas").addEventListener("mouseout", function(){ cambiarColores('yellow'); });


var canvas = document.getElementById("canvas");
var ctx = canvas.getContext("2d");
var oldX,oldY; //almacena las coordenas X,Y antes de realizar un desplazamiento

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

  var fichas = []; // arreglo donde se guardarian las fichas que no estan en ninguna columna

  function Columna(id,posX, posY,alto){
     this.id = id;
     this.posicionX = posX;
     this.posicionY =posY;
     this.ancho = 10;
     this.alto = -alto;
     this.colFichas = [];
   }



   function Piso(posX, posY,ancho){
      this.posicionX = posX;
      this.posicionY = posY;
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
        columna.colFichas.push(fichaX);
        cY-= 12;
        tamanio-= 10;
        cX+=5;
      }
    }


    function Tablero(cantPiezas){
      this.columnas = [];         // un arreglo de columnas
      var largo = cantPiezas * 70;
      var alto = cantPiezas * 20;
      canvas.width = largo + 50;
      canvas.height = alto + 150;
      var posX = 20;
      var posY = canvas.height - 22;
      this.piso = new Piso(posX,posY,largo);
      posX = posX + Math.floor(cantPiezas*10);
      this.columnas.push(new Columna(1,posX,posY,alto));
      generadorFichas(cantPiezas,posX- Math.floor(cantPiezas*9), posY - this.piso.alto /2 ,this.columnas[0]);
      posX = posX + largo/3 ;
      this.columnas.push(new Columna(2,posX,posY,alto));
      posX = posX + largo/3 ;
      this.columnas.push(new Columna(3,posX,posY,alto));
    }

  /////////////// METODOS DE LA COLUMNA

    Columna.prototype.apilarFicha = function(){ // Retira la ficha tope de la pila auxiliar y la agrega en la columna
		this.colFichas.push(fichas.pop());
	}

	Columna.prototype.desapilarFicha = function(){ // Retira la ficha tope de la columna y la agrega en la pila auxiliar
		fichas.push(this.colFichas.pop());
	}


	Columna.prototype.validarFichaYLugar = function(){
	// Chequea si es valido el movimiento de apliar en la columna la ficha que s eencuentra en el arreglo aux
		var fichaMano = fichas[fichas.length-1];
		var fichaColumna = this.colFichas[colFichas.length-1];
		if (fichaMano.id > fichaColumna.id){ // el id mas chico hace la ficha mas grande
			return true;
		}
		else{
			return false;
		}
	}


	function levantarFicha(columna){
		columna.desapilarFicha();
	}


	function colocarFicha(columnaAnt,columnaSig){
		// Al tener ya la ficha en el Arreglo Aux , se le pregunta a la columna seleccionada si es valida la insercion
		if (columnaSig.validarFichaYLugar()){
			columnaSig.apilarFicha();
		}
		else{
			columnaAnt.apilarFicha();
		}

	}

  /////////////// DIBUJAR EN EL CANVAS

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
	 for (var i = 0; i < this.colFichas.length; i++){
		 this.colFichas[i].dibujarFicha();
	 }
  	}




  Tablero.prototype.dibujartablero = function(){
    	color = "#8B4513";
      this.piso.dibujarPiso(color);
      for (i = 0;i < this.columnas.length; i++){
      this.columnas[i].dibujarColumna(color);
      }
      for (i = 0;i < fichas.length; i++){
          fichas[i].dibujarFicha();
      }
  	}


  function paint() {
      ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height);
      t.dibujartablero();
    }


/////////////////////////////////////////// EVENTOS DE MOUSE


function getMousePos(canvas, evt) { // posicion del mouse en el canvas
    var rect = canvas.getBoundingClientRect();
    return {
      x: evt.clientX - rect.left,
      y: evt.clientY - rect.top
    };
}



    function mousedown(e) {
      pos = getMousePos(canvas, e); // para sacar la posicion exacta del mouse en el canvas
      //se capturan coordenas del mouse
      mouseX = pos.x;
      mouseY = pos.y;

      for (var i=0; i< t.columnas.length; i++){
          columnaActual = t.columnas[i]
      if ( (mouseX>columnaActual.posicionX-50) && (mouseX < (columnaActual.posicionX + columnaActual.ancho+50)) &&
           (mouseY<columnaActual.posicionY) && (mouseY > (columnaActual.posicionY + columnaActual.alto) )
         ){
            alert("pisaste columna "+ t.columnas[i].id);
            //se controla en todas las fichas de esa columna
            for (var j=0; j<columnaActual.colFichas.length; j++) {
            //se determina si se presiono el mouse encima de alguna ficha
            fichaj = columnaActual.colFichas[j]
            if ( (mouseX>fichaj.posX) &&
                 (mouseX < (fichaj.posX + fichaj.largoX)) &&
                 (mouseY>fichaj.posY) &&
                 (mouseY < (fichaj.posY + fichaj.altoY) ) && (fichaj == columnaActual.colFichas[columnaActual.colFichas.length-1] )
               ){
                  // coordenas X,Y donde se hizo clic
                  oldX = mouseX;
                  oldY = mouseY;
                  levantarFicha(columnaActual);
                  alert("id de la ficha = " + fichaj.id);
                  break;
                }
            }/// cierra el for de las fichas de la columna
        } // cierra el if de la columna seleccionada
      } // cierra el for que cicla entre las columnas existentes
  }// cierra el metodo

  function mousemove(e) {
    pos = getMousePos(canvas, e);
    mouseX = pos.x;
    mouseY = pos.y;
  //si existe una FIcha seleccionada
  fichaSelected = fichas.pop();
  if (fichaSelected != undefined) {
      //se calcula la distancia del dezplazamiento
      var dx =  mouseX - oldX ;
      var dy =  mouseY- oldY ;
      //se asignan nuevos valores
      oldX = mouseX;
      oldY = mouseY;
      //se actualiza coordenadas X,Y de la Ficha seleccionada
      fichaVal = fichaSelected
      fichas[0] = new Ficha( fichaVal.id, fichaVal.Color, fichaVal.posX + dx,  fichaVal.posY + dy,fichaVal.largoX,fichaVal.altoY );
      }
  }

  function mouseup(e) {
   selectedShape = undefined;
   //todo el lienzo se repinta cada 50 milisegundos
   setInterval(paint, 50);
   }

    document.getElementById("canvas").addEventListener("mousedown",mousedown);
    document.getElementById("canvas").addEventListener("mousemove",mousemove);
    document.getElementById("canvas").addEventListener("mouseup",mouseup);



  /////////////// Llamado al tablero inicial
  t = new Tablero(3);
  t.dibujartablero();



 // Clase personaje
 function Personaje(name,posicionX,posicionY,lives,points){
   this.name = name;
   this.posX = posicionX;
   this.posY = posicionY;
   this.alto = 114;
   this.ancho = 88;
   this.ojos = 1; // con 1 esta mirando para la derecha , con -1 esta mirando para la izquierda
   this.onJump = false; // boolean para verificar si esta en el aire
   this.lives = lives;
   this.points = points;
   this.elemento =document.getElementById("personajeX");
   this.elemento.className = "personaje";
   this.elemento.style.transform = "translate( "+(posicionX)+"px,"+ (posicionY) +"px)";
 }

 ///////////
 ///////////                    OPCION 1 = SALTO DEL PERSONAJE
 ///////////                          SE ACCIONA CON W
 ///////////

 // No posee la chance de saltar en el lugar, salvo que este en un borde


///////////////////////////////// Momento donde se presiona la tecla para saltar
Personaje.prototype.Jump = function(){
  if (this.onJump == false){
      this.onJump = true;
  }
}

///////////////////////////////////////////// MOVIMIENTO DEL SALTO

Personaje.prototype.moveOnJump = function(valorX){
  var valorY = valorX + 10;
  if (this.ojos < 0){ /// saltando para atras va mas rapido
    valorX *= this.ojos *2;
  }
  var imagen = "url('css/img/salto.png') left center";
  var animacion = "saltar 0.8s steps(1) infinite";

  valorX=tope_movimiento_x(valorX,this.posX);
  cambioSprite(this.elemento,imagen,animacion);
    if (tiempoAire > 0){
      if(desplazamientoAire <5 ){
          desplazarEnElAire(this,valorX,-valorY,this.ojos);
      }
      else {
          desplazarEnElAire(this,valorX,valorY,this.ojos);
      }
    }
    else {
      tiempoAire=10;
      desplazamientoAire=0;
      this.onJump = false;
      this.moverse(1);
    }
  }
//////////////////////////////////////// INICIADOR DEL SALTO
Personaje.prototype.empezarSaltar= function(){

  if (! this.onJump){
    this.Jump();
  }
  if (this.onJump) {
    var valor = 15;
    this.moveOnJump(valor);
  }

}

///////////
///////////                   OPCION 2 y 3 = MOVIMIENTO DEL PERSONAJE
///////////                          SE ACCIONA CON A y D
///////////

// Mientras este saltando tiene bloqueado la posiblidad de moverse
// para que tome un tono mas realista.
Personaje.prototype.moverse= function(valor){

  if (! this.onJump){
    var imagen = "url('css/img/corriendo.png') left center";
    var animacion = "correr 0.8s steps(7) infinite";
    cambioSprite(this.elemento,imagen,animacion);
    var moverse = tope_movimiento_x(5*valor,this.posX);
    this.ojos = valor;
    this.posX+=moverse;
    this.elemento.style.transform = " translate( "+(this.posX)+"px,"+(this.posY)+"px) ";// scale("+this.ojos+",1)
  }
}

///////////
///////////                        EVENTOS:ANIMACIONES DEL PERSONAJE
///////////                         QUIETO ,DANIO RECIBIDO Y MUERTE
///////////

Personaje.prototype.recibirGolpe= function(){
  this.lives--;
  if (this.lives == 0) {
    this.morirse();
  }
  else {
    var imagen = "url('css/img/muerte.png') left center";
    var animacion = "saltar 0.8s steps(1) infinite";
    cambioSprite(this.elemento,imagen,animacion);
  }
}


Personaje.prototype.morirse= function(){
  var imagen = "url('css/img/muerte.png') left center";
  var animacion = "saltar 0.8s steps(1) infinite";
  cambioSprite(this.elemento,imagen,animacion);
  Puntos_Juego(this.points);           /// esto le envia a la funcion que envia los puntos
}

///////////
///////////                       MENU DE ACCIONES DISPONIBLES
///////////                           PARA EL PERSONAJE
///////////

function crearPersonaje(){
  var personaje = new Personaje("Muddy",400,343,3,0);
  return personaje;
}

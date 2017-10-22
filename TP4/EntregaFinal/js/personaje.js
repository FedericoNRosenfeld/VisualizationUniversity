

 // Clase personaje
 function Personaje(name,posicionX,posicionY,lives,points){
   this.name = name;
   this.posX = posicionX;
   this.posY = posicionY;
   this.ojos = true; // con true esta mirando para la derecha , con false esta mirando para la izquierda
   this.onJump = false; // boolean para verificar si esta en el aire
   this.lives = lives;
   this.points = points;
   this.elemento =document.getElementById("personajeX");
   this.elemento.className = "personaje";
   this.elemento.style.transform = "translate( "+(posicionX)+"px,"+ (posicionY) +"px)";
 }

/// funciones que pueden ir fuera de personaje para ser reutilizadas

  function tope_movimiento_x(desplazamiento,posicion_actual){ /// evitar que se salga del cuadro de juego
    sum = desplazamiento + posicion_actual;
     if ((sum >= 50) && (sum <= 900)){
       return desplazamiento;
     }
     return 0;
  }

 function cambioSprite(entidad,imagen,animacion){
   entidad.style.background = imagen;
   entidad.style.animation = animacion;
 }

 function desplazarEnElAire(personaje,valorenX,valorenY,num){
   desplazamientoAire++;
   tiempoAire--;
   personaje.elemento.style.transform = "translate( "+(personaje.posX + valorenX)+"px,"+(personaje.posY + valorenY)+"px) scale("+num+",1)";
   personaje.posX+= valorenX;
   personaje.posY+= valorenY;
 }

 function Puntos_Juego(puntos){
    document.getElementById("puntuacion_final")= puntos;
 }


 ///////////
 ///////////                    OPCION 1 = SALTO DEL PERSONAJE
 ///////////                          SE ACCIONA CON W
 ///////////

 // No posee la chance de saltar en el lugar, salvo que este en un borde

 var desplazamientoAire = 0;
 var tiempoAire = 10;

///////////////////////////////// Momento donde se presiona la tecla para saltar
Personaje.prototype.Jump = function(){
  if (this.onJump == false){
      this.onJump = true;
  }
}

///////////////////////////////////////////// MOVIMIENTO DEL SALTO

Personaje.prototype.moveOnJump = function(valorX){
valorY = valorX;
  if (valorY < 0){
    valorY = -valorY;
  }
  var num = 1; /// es para ver la direccion en la cual esta mirando el personaje
  var imagen = "url('css/img/salto.png') left center";
  var animacion = "saltar 0.8s steps(1) infinite";
  if(! this.ojos){ /// por si el personaje esta mirando para la izquierda
    num = -1;
  }
  valorX=tope_movimiento_x(valorX,this.posX);
  cambioSprite(this.elemento,imagen,animacion);
    if (tiempoAire > 0){
      if(desplazamientoAire <5 ){
          desplazarEnElAire(this,valorX,-valorY,num);
      }
      else {
          desplazarEnElAire(this,valorX,valorY,num);
      }
    }
    else {
      tiempoAire=10;
      desplazamientoAire=0;
      this.onJump = false;
      this.estarQuieto();
    }
  }
//////////////////////////////////////// INICIADOR DEL SALTO
Personaje.prototype.empezarSaltar= function(){

  if (! this.onJump){
    this.Jump();
  }
  if (this.onJump) {
    if (this.ojos){ //// si mira a derecha
      var valor = 15;
    }
    else {  //// si mira a izquierda
      var valor = -15;

    }
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
    if ( valor == -1) {
        this.ojos = false;
        movimiento_fondo(-1);
    }
    else {
        this.ojos = true;
        movimiento_fondo(1);
    }
      this.posX+=moverse;
      this.elemento.style.transform = " translate( "+(this.posX)+"px,"+(this.posY)+"px)  scale("+valor+",1)";


  }
}

///////////
///////////                        EVENTOS:ANIMACIONES DEL PERSONAJE
///////////                         QUIETO ,DANIO RECIBIDO Y MUERTE
///////////


Personaje.prototype.estarQuieto= function(){
  var imagen = "url('css/img/quieto.png') left center";
  var animacion = "quieto 0.8s steps(1) infinite";
  cambioSprite(this.elemento,imagen,animacion);
  movimiento_fondo(0);
}

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

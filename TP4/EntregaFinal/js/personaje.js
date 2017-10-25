
var puntosX = 0; // puntos finales
 // Clase personaje
 function Personaje(name,posicionX,posicionY,lives,puntos){
   this.name = name;
   this.posX = posicionX;
   this.posY = posicionY;
   this.alto = 114;
   this.ancho = 88;
   this.ojos = 1; // con 1 esta mirando para la derecha , con -1 esta mirando para la izquierda
   this.onJump = false; // boolean para verificar si esta en el aire
   this.lives = lives;
   this.puntos = puntos;
   this.elemento =document.getElementById("personajeX");
   this.elemento.className = "personaje";
   this.elemento.classList.add("corriendo");
   this.elemento.style.transform = "translate( "+(posicionX)+"px,"+ (posicionY) +"px)";

 }


Personaje.prototype.sumarPuntos = function(puntosP){
  this.puntos += puntosP;
  puntosX = this.puntos;
//  document.getElementById("puntos").innerHTM = this.puntos;
}

Personaje.prototype.colicionar_moneda= function(moneda){
  if (this.onJump){
    cambioSprite(this.elemento,"agarrar_saltando","personaje");

  }
  else{
    cambioSprite(this.elemento,"agarrar_corriendo","personaje");
  }
  moneda.agarrarla(this);

  //console.log(this.puntos);
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
      cambioSprite(this.elemento,"saltando","personaje");

  }
}

///////////////////////////////////////////// MOVIMIENTO DEL SALTO


Personaje.prototype.moveOnJump = function(){


  var valorX = 15;
  var valorY = valorX + 10;
  if (this.ojos < 0){ /// saltando para atras va mas rapido
    valorX *= this.ojos *2;
  }

  valorX=tope_movimiento_x(valorX,this.posX);
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
      cambioSprite(this.elemento,"corriendo","personaje");
    }
}

//////////////////////////////////////// INICIADOR DEL SALTO
Personaje.prototype.empezarSaltar= function(){

  if (this.onJump) {
        this.moveOnJump();
      };

}

///////////
///////////                   OPCION 2 y 3 = MOVIMIENTO DEL PERSONAJE
///////////                          SE ACCIONA CON A y D
///////////

// Mientras este saltando tiene bloqueado la posiblidad de moverse
// para que tome un tono mas realista.
Personaje.prototype.moverse= function(valor){
    cambioSprite(this.elemento,"corriendo","personaje");
    var moverse = tope_movimiento_x(5*valor,this.posX);
    this.ojos = valor;
    this.posX+=moverse;
    this.elemento.style.transform = " translate( "+(this.posX)+"px,"+(this.posY)+"px) "; //scale("+this.ojos+",1)
}



///////////
///////////                        EVENTOS:ANIMACIONES DEL PERSONAJE
///////////                         QUIETO ,DANIO RECIBIDO Y MUERTE
///////////




Personaje.prototype.recibirGolpe= function(){
  this.lives--;
  if (this.estaMuerto()) {
    this.morirse();
  }
  else {
    cambioSprite(this.elemento,"golpeado","personaje");
  }
}

Personaje.prototype.morirse= function(){
  Puntos_Juego(this.puntos);
  cambioSprite(this.elemento,"morir","personaje");
  tiempoAire=10;
  desplazamientoAire=0;
  //DIE;
}

Personaje.prototype.estaMuerto = function(){
  if(this.lives == 0){
    return true;}
  return false;
}

Personaje.prototype.eliminarme = function(){
  clearInterval(intervalo_salto);
  delete this;
}

///////////
///////////                               CREAR EL
///////////                               PERSONAJE
///////////

var personaje = null;

function crearPersonaje(){
  personaje = null;
  var pj =new Personaje("Muddy",400,370,1,0);
  personaje = pj;
  return personaje;
}

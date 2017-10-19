

 // Clase personaje
 function Personaje(name,posicionX,posicionY,onJump,lives,points){
   this.name = name;
   this.posX = posicionX;
   this.posY = posicionY;
   this.ojos = true; // con true esta mirando para la derecha , con false esta mirando para la izquierda
   this.onJump = onJump; // boolean para verificar si esta en el aire
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

 var desplazamientoAire = 0;
 var tiempoAire = 10;

///////////////////////////////// Momento donde se presiona la tecla para saltar
Personaje.prototype.Jump = function(){
  if (this.onJump == false){
      this.onJump = true;
  }
}

///////////////////////////////////////////// MOVIMIENTO DEL SALTO
Personaje.prototype.moveOnJump = function(valorX,valorY){
  var num = 1;
  if(! this.ojos){ /// por si el personaje esta mirando para la izquierda
    num = -1;
  }
  if ((this.posX >= 800) || (this.posX  <= 100) ){
    valorX = 0;
  }
    if (tiempoAire > 0){
      if(desplazamientoAire <5 ){
        console.log("Posicion X = ",this.posX,"Posicion Y = ",this.posY);
          desplazamientoAire++;
          tiempoAire--;
          this.elemento.style.transform = "translate( "+(this.posX+valorX)+"px,"+(this.posY-valorY)+"px) scale("+num+",1)";
          this.posX+=valorX;
          this.posY-=valorY;

      }
      else {
        console.log("Posicion X = ",this.posX,"Posicion Y = ",this.posY);
        desplazamientoAire++;
        tiempoAire--;
        this.elemento.style.transform = "translate( "+(this.posX+valorX)+"px,"+(this.posY+valorY)+"px)  scale("+num+",1)";
        this.posX+=valorX;
        this.posY+=valorY;
      }
    }
    else {
      tiempoAire=10;
      desplazamientoAire=0;
      this.onJump = false;
    }
  }
//////////////////////////////////////// INICIADOR DEL SALTO
Personaje.prototype.empezarSaltar= function(){
  if (! personaje.onJump){
    personaje.Jump();
  }
  if (personaje.onJump) {
    if (personaje.ojos){
      var valorX = 20;
    }
    else {
      var valorX = -20;

    }
    var valorY = 20;
    personaje.moveOnJump(valorX,valorY);

  }

}

///////////
///////////                   OPCION 2 y 3 = MOVIMIENTO DEL PERSONAJE
///////////                          SE ACCIONA CON A y D
///////////

// Mientras este saltando tiene bloqueado la posiblidad de moverse
// para que tome un tono mas realista.
Personaje.prototype.moverse= function(valor){

  if (! personaje.onJump){
    var moverse = 10*valor;
    if ( valor == -1) {
        this.ojos = false;
    }
    else {
      this.ojos = true;
    }
      this.posX+=moverse;
      this.elemento.style.transform = " translate( "+(this.posX)+"px,"+(this.posY)+"px)  scale("+valor+",1)";

  }
}


///////////
///////////                       MENU DE ACCIONES DISPONIBLES
///////////                           PARA EL PERSONAJE
///////////

function realizarAccion(e){
  e = e || window.event;
  console.log(e.keyCode);
  switch(e.keyCode) {
        case 119:
            personaje.empezarSaltar();
            break;
        case 100:
            personaje.moverse(1);
            break;
        case 97:
            personaje.moverse(-1);
            break;
    }
}

  var personaje = new Personaje("Muddy",300,300,false,3,0);
  addEventListener("keypress",realizarAccion);

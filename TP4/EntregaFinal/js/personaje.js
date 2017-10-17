

var desplazamientoAire = 0;
var tiempoAire = 10;
 // Clase personaje
 function Personaje(name,posicionX,posicionY,onJump,lives,points){
   this.name = name;
   this.posx = posicionX;
   this.posy = posiciony;
   this.onJump = onJump; // boolean para verificar si esta en el aire
   this.lives = lives;
   this.points = points;
 }


// Momento donde se presiona la tecla para saltar
Personaje.prototype.Jump(){
  if (!this.onJump){
      this.onJump = true;
  }
}


// Moverse en el aire
Personaje.prototype.moveOnJump(){
    if (tiempoAire > 0){
      if(desplazamientoAire <5 ){
          desplazamientoAire++;
          tiempoAire--;
          elemento.style.transform = "translate( "+(this.posX+5)+"px,"+(this.posY-5)+"px)";
      }
      else {
        desplazamientoAire++;
        tiempoAire--;
        elemento.style.transform = "translate( "+(this.posX+5)+"px,"+(this.posY+5)+"px)";
      }
    else {
      tiempoAire=10;
      desplazamientoAire=0;
    }
  }

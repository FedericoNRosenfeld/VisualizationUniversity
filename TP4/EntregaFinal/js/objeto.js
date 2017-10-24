

 // Clase Enemigo
 function Objeto(x,y){
   this.posX = x;
   this.posY = y;
   this.velocidad = 10;
   this.alto = 20;
   this.ancho = 20;
   this.puntos = 10;
   this.elemento =document.getElementById("enemigo"+id);
   this.elemento.className = "enemigo";
   this.elemento.style.transform = " translate( "+x+"px,"+y+"px)";
 }


Objeto.prototype.moverse = function(){
     this.posX-=  this.velocidad ;
}

Objeto.prototype.setAnimation = function(){
  this.elemento.style.transform = "translate( "+(this.posX)+"px,"+ (this.posY) +"px) scale("+this.ojos+",1)";
}

Objeto.prototype.update = function(){
      juego.enemigos.moverseE();
}

Objeto.prototype.agarrarla = function(personaje){
    personaje.sumarPuntos(this.puntos);
    this.desaparecer();
}

Objeto.prototype.desaparecer = function(){
      DIE;
}

function crearObjeto(x,y){
  var moneda = new Objeto(x,y);
  return moneda;
}

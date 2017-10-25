

 // Clase Enemigo
 function Objeto(x,y){
   this.posX = x;
   this.posY = y;
   this.velocidad = 15;
   this.alto = 70;
   this.ancho = 55;
   this.puntos = 10;
   this.elemento =document.getElementById("moneda");
   this.elemento.className = "moneda";
   this.elemento.style.transform = " translate( "+x+"px,"+y+"px)";
 }

var sube = true;
var tope = 10;

function  picar_moneda (){
  if (tope == 0){
    sube = true;
  }
  if (tope == 10){
     sube= false;
  }
}


Objeto.prototype.moverse = function(){
     this.posX-=  this.velocidad ;
     picar_moneda();
     if (sube){
       this.posY-=10;
       tope++;
     }
     else {
        this.posY+=10;
          tope--;
     }
     if (this.posY >= piso){
       this.posY = piso;
       tope = 0;
     }
     if ( this.posX < 0){
       this.desaparecer();
     }
     this.setAnimation();
}

Objeto.prototype.setAnimation = function(){
  this.elemento.style.transform = "translate( "+(this.posX)+"px,"+ (this.posY) +"px)";
}

Objeto.prototype.update = function(){
      this.moverse();
}

Objeto.prototype.agarrarla = function(personaje){
    personaje.sumarPuntos(this.puntos);
    this.desaparecer();
}


Objeto.prototype.desaparecer = function(){
  this.posX = 1000;
  this.posY = piso;
}

Objeto.prototype.eliminarme = function(){
  delete this;
}

function crearObjeto(x,y){
  var moneda = new Objeto(x,y);
  return moneda;
}

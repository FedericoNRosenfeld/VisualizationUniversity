

 // Clase Enemigo
 function Enemigo(id,x,y,ojos){
   this.posX = x;
   this.posY = y;
   this.velocidad = 10;
   this.alto = 35;
   this.ancho = 35;
   this.ojos = ojos; // con 1 esta mirando para la derecha , con false esta mirando para la izquierda
   this.elemento =document.getElementById("enemigo"+id);
   this.elemento.className = "enemigo";
   this.elemento.style.transform = " translate( "+x+"px,"+y+"px)";
   this.altura = -1 * id;
 }


 ///////////
 ///////////                       MOVIMIENTO DE LA CRIATURA
 ///////////


Enemigo.prototype.moverseE = function(){
      if(this.posX <= 49 ){
        this.ojos*= -1;
        this.velocidad -= Math.floor(Math.random()*4)+1;
      }
      if (this.posX >= 901 ){
          this.velocidad += Math.floor(Math.random()*2)+1;
          this.ojos*= -1;
      }
      this.posX += this.velocidad * this.ojos;
      this.posY += this.velocidad * this.altura;
      this.altura *= -1;
      this.setAnimation();
      if ((this.velocidad <5) || (this.velocidad > 40)){
         this.velocidad = 10;
      }
  }


Enemigo.prototype.setAnimation = function(){
  this.elemento.style.transform = "translate( "+(this.posX)+"px,"+ (this.posY) +"px) scale("+this.ojos+",1)";
}

  ///////////
  ///////////                   ACCIONES DE CONCATCO Y DETECCION DE COLICION
  ///////////                       TANTO CON MONEDAS COMO CON JUGADOR
  ///////////

Enemigo.prototype.colicionar_personaje= function(personaje){
  personaje.recibirGolpe();
}

Enemigo.prototype.colicionar_moneda= function(moneda){
  moneda.desaparecer();
}

Enemigo.prototype.update = function(){
      this.moverseE();
}


function crearEnemigo(id,x,y,ojos){
  var enemigo = new Enemigo(id,x,y,ojos);
  return enemigo;
}

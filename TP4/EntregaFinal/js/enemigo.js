

 // Clase personaje
 function Enemigo(posicionX,posicionY,id){
   this.posX = posicionX;
   this.posY = posicionY;
   this.ojos = true; // con true esta mirando para la derecha , con false esta mirando para la izquierda
   this.elemento =document.getElementById("enemigo"+id);
   this.elemento.className = "enemigo";
   this.elemento.style.transform = "translate( "+(posicionX)+"px,"+ (posicionY) +"px)";
   this.patrones = [];
 }


 ///////////
 ///////////                       MOVIMIENTO DE LA CRIATURA
 ///////////


///////////////////////////////////////////// MOVIMIENTO DEL SALTO

Enemigo.prototype.moverse = function(valorX){
    valorY = valorX;
    if (valorY < 0){
      valorY = -valorY;
    }
    var num = 1; /// es para ver la direccion en la cual esta mirando la criatura
    if(! this.ojos){ /// por si el la criatura esta mirando para la izquierda
      num = -1;
    }
    cambioSprite(this.elemento,imagen,animacion);
    desplazarEnElAire(this,valorX,-valorY,num);
  }

  ///////////
  ///////////                   ACCIONES DE CONCATCO Y DETECCION DE COLICION
  ///////////                       TANTO CON MONEDAS COMO CON JUGADOR
  ///////////

Enemigo.prototype.colicionar_personaje= function(personaje){
  colicion_Efecto(personaje,recibirGolpe);
}

Enemigo.prototype.colicionar_personaje= function(moneda){
  //colicion_Efecto(moneda,desaparecer);
}

function crearEnemigo(x,y,id){
  var enemigo = new Enemigo(x,y,id);
  return enemigo;
}



 // Clase personaje
 function Enemigo(posicionX,posicionY,id){
   this.posX = posicionX;
   this.posY = posicionY;
   this.ojos = true; // con true esta mirando para la derecha , con false esta mirando para la izquierda
   this.elemento =document.getElementById("enemigo"+id);
   this.elemento.className = "enemigo";
   this.elemento.style.transform = "translate( "+(posicionX)+"px,"+ (posicionY) +"px)";
 }

/// funciones que pueden ir fuera de personaje para ser reutilizadas

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


function colicion_Efecto(objeto,accion){
  objeto.accion();
}

function detectar_colicion(objeto1,objeto2){
  // true si hay colicion entre 2 objetos
  var ancho_e =parseInt(objeto1.elemento.style.width);
  var alto_e = parseInt(objeto1.elemento.style.height);
  var ancho_o =parseInt(objeto2.elemento.style.width);
  var alto_o = parseInt(objeto2.elemento.style.height);

  if ( (( objeto2.posX +ancho_o)> objeto1.posX || (objeto2.posX <= (objeto1.posX + ancho_o)))&&
      (( objeto2.posY +alto_o)> objeto1.posY || (objeto2.posY<= (objeto1.posY + alto_e)))) {
          this.contacto(objeto_colicion,accion)
          return true;
      }
 return false;

}


Enemigo.prototype.colicionar_personaje= function(personaje){
  //colicion_Efecto(personaje,recibirGolpe);
  alert("coliciono ");
}

//// Crear un Enemigo
var enemigo1 = new Enemigo(100,400,1);
var enemigo2 = new Enemigo(300,200,2);

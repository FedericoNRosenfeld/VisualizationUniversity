
/*
--------------
--------------        FUNCIONALIDADES GENERALES DE MOVIMIENTO y Patron
--------------
*/

 var desplazamientoAire = 0;
 var tiempoAire = 10;

  function tope_movimiento_x(desplazamiento,posicion_actual){ /// evitar que se salga del cuadro de juego
    sum = desplazamiento + posicion_actual;
     if ((sum >= 50) && (sum <= 900)){ //// roto a proposito
       return desplazamiento;
     }
     return 0;
  }


 function desplazarEnElAire(personaje,valorenX,valorenY,num){
   desplazamientoAire++;
   tiempoAire--;
   personaje.elemento.style.transform = "translate( "+(personaje.posX + valorenX)+"px,"+(personaje.posY + valorenY)+"px) scale("+num+",1)";
   personaje.posX+= valorenX;
   personaje.posY+= valorenY;
 }


 /*
 --------------
 --------------        FUNCIONALIDADES GENERALES DE SPRITES
 --------------
 */

  function cambioSprite(entidad,imagen,animacion){
    entidad.style.background = imagen;
    entidad.style.animation = animacion;
  }

  function movimiento_fondo(opcion){ // -1 izquierda, 0 quieto, 1 derecha
  }

  /*
  --------------
  --------------        FUNCIONALIDADES GENERALES DE PUNTUACION
  --------------
  */

 function Puntos_Juego(puntos){
    document.getElementById("puntuacion_final")= puntos;
 }

 /*
 --------------
 --------------        FUNCIONALIDADES GENERALES DE COLICION
 --------------
 */

 function colicion_Efecto(objeto,accion){
   objeto.accion();
 }

 function detectar_colicion(objeto1,objeto2){
	// true si hay colicion entre 2 objetos

   if ( (( objeto2.posX +objeto2.ancho)> objeto1.posX || (objeto2.posX <= (objeto1.posX + objeto1.ancho)))&&
       (( objeto2.posY +objeto2.alto)> objeto1.posY || (objeto2.posY<= (objeto1.posY + objeto1.alto)))) {
           return true;
       }
  return false;

 }

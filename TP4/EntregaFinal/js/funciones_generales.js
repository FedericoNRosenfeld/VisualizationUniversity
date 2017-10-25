var piso = 420;
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


  function cambioSprite(entidad,clase,claseBase){
    entidad.className =claseBase;
    entidad.classList.add(clase);
  }


 function Puntos_Juego(puntos){
   //
 }


pos1 = 100 + 30
pos2 = 500 + 30


function dc(pos1,pos2,pos1A,pos2A){
  if( ((pos1 < pos2) && ((pos1+pos1A) >= pos2)) || ((pos2 < pos1) && ((pos2+pos2A) >= pos1)) ){
        return true;
      }
  return false;
}

 function detectar_colicion(objeto1,objeto2){
	// true si hay colicion entre 2 objetos
if   (( dc(objeto1.posX,objeto2.posX,objeto1.ancho,objeto2.ancho)) && ( dc(objeto1.posY,objeto2.posY,objeto1.alto,objeto2.alto))){
    //  console.log( "objeto 1 Y",objeto1.posY,objeto1.alto,"- objeto 2 ",objeto2.posY,objeto2.alto);
      return true;
       }
  return false;

 }

 function mostrarFin(){
   alert("fin");
 }

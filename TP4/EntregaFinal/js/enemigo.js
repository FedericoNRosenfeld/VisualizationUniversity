

 // Clase personaje
 function Enemigo(name,posicionX,posicionY){
   this.name = name;
   this.posX = posicionX;
   this.posY = posicionY;
   this.ojos = true; // con true esta mirando para la derecha , con false esta mirando para la izquierda
   this.elemento =document.getElementById("enemigoX");
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



Enemigo.prototype.contacto = function(objeto,accion){ /// posee tanto una accion contra monedas como contra personaje
  objeto.accion();
}

Enemigo.prototype.detectar_colicion = function(objeto_colicion){
  var ancho_e =parseInt(this.elemento.style.width);
  var alto_e = parseInt(this.elemento.style.height);
  var ancho_o =parseInt(objeto_colicion.elemento.style.width);
  var alto_o = parseInt(objeto_colicion.elemento.style.height);

  if ((((ancho_e <= ancho_o) && (this.posX  )                                                                               )))) {

  }


}

///////////
///////////                        EVENTOS:ANIMACIONES DEL PERSONAJE
///////////                         QUIETO ,DANIO RECIBIDO Y MUERTE
///////////


Personaje.prototype.estarQuieto= function(){
  var imagen = "url('css/img/quieto.png') left center";
  var animacion = "quieto 0.8s steps(1) infinite";
  cambioSprite(this.elemento,imagen,animacion);
}

Personaje.prototype.recibirGolpe= function(){
  this.lives--;
  if (this.lives == 0) {
    this.morirse();
  }
  else {
    var imagen = "url('css/img/muerte.png') left center";
    var animacion = "saltar 0.8s steps(1) infinite";
    cambioSprite(this.elemento,imagen,animacion);
  }
}


Personaje.prototype.morirse= function(){
  var imagen = "url('css/img/muerte.png') left center";
  var animacion = "saltar 0.8s steps(1) infinite";
  cambioSprite(this.elemento,imagen,animacion);
  Puntos_Juego(this.points);           /// esto le envia a la funcion que envia los puntos
}

///////////
///////////                       MENU DE ACCIONES DISPONIBLES
///////////                           PARA EL PERSONAJE
///////////

function realizarAccion(e){
  e = e || window.event;
  console.log(e.keyCode);
  switch(e.keyCode) {
        case 119:    ///////// Letra W de mi pc
            personaje.empezarSaltar();
            break;
        case 100:    ///////// Letra D de mi pc
            personaje.moverse(1);
            break;
        case 97:    ///////// Letra A de mi pc
            personaje.moverse(-1);
            break;
        case 115:   ///////// Letra S de mi pc, para probar la funcionalidad de los sprites con Acciones no cliqueables
            personaje.estarQuieto();
            break;
    }
}

  var personaje = new Personaje("Muddy",300,300,false,3,0);
  addEventListener("keypress",realizarAccion);




function Constructor() {
  this.objetos = [];
  this.personaje = null;
  this.enemigos = [];
  this.fondos =[];
}

function update(valor){
  if( personaje.onJump){

  }
  else {

  }
}

function realizarAccion(e){

  e = e || window.event;
//  console.log(e.keyCode);
 if ((detectar_colicion(juego.personaje,juego.enemigos[0])) || (detectar_colicion(juego.personaje,juego.enemigos[1]))){
   //colicion_Efecto(juego.personaje,recibirGolpe);

 }
  switch(e.keyCode) {
        case 119:    ///////// Letra W de mi pc
            juego.personaje.empezarSaltar();
            break;
        case 100:    ///////// Letra D de mi pc
            juego.personaje.moverse(1);
              juego.enemigos[1].moverseE();
              juego.enemigos[0].moverseE();
            break;
        case 97:    ///////// Letra A de mi pc
            juego.personaje.moverse(-1);
            break;
        case 112:
            juego.fondos[0].pausaYplay("running");
            break;
        case 111:   ///////// Letra S de mi pc, para probar la funcionalidad de los sprites con Acciones no cliqueables
            juego.fondos[0].pausaYplay("pausa");
            break;

    }
}



/*
--------------
--------------        CREACION DE OBJETOS DEL JUEGO
--------------
*/
  var juego = new Constructor();
  juego.personaje = crearPersonaje();
  juego.enemigos.push(crearEnemigo(1,900,440,-1));
  juego.enemigos.push(crearEnemigo(2,50,300,1));
  juego.fondos.push(crearFondo(1));
  juego.fondos.push(crearFondo(2));
  juego.fondos.push(crearFondo(3));
  juego.fondos.push(crearFondo(4));


  addEventListener("keypress",realizarAccion);

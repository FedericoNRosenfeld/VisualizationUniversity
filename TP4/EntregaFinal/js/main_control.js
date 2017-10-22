


function Constructor() {
  this.objetos = [];
  this.personaje = null;
  this.enemigos = [];
  this.fondos =[];
}

function update(){
  if( personaje.onJump){

  }
  else {

  }
}

function realizarAccion(e){

  e = e || window.event;
  console.log(e.keyCode);
  switch(e.keyCode) {
        case 119:    ///////// Letra W de mi pc
            juego.personaje.empezarSaltar();
            break;
        case 100:    ///////// Letra D de mi pc
            juego.personaje.moverse(1);
            break;
        case 97:    ///////// Letra A de mi pc
            juego.personaje.moverse(-1);
            break;
        case 112:   ///////// Letra S de mi pc, para probar la funcionalidad de los sprites con Acciones no cliqueables
            juego.fondos[0].pausaYplay("running");
            break;
        case 111:   ///////// Letra S de mi pc, para probar la funcionalidad de los sprites con Acciones no cliqueables
            juego.fondos[0].pausaYplay("pausa");
            break;
        case 107:   ///////// Letra S de mi pc, para probar la funcionalidad de los sprites con Acciones no cliqueables
            juego.fondos[0].invertir(-1);
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
  juego.enemigos.push(crearEnemigo(100,400,1));
  juego.enemigos.push(crearEnemigo(900,100,2));
  juego.fondos.push(crearFondo(1));
  juego.fondos.push(crearFondo(2));
  juego.fondos.push(crearFondo(3));
  juego.fondos.push(crearFondo(4));


  addEventListener("keypress",realizarAccion);

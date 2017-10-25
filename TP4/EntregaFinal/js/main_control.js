
var juego = null;
var intervalo = null;
var intervalo_salto = null;


function Juego() {
  this.objetos = [];
  this.personaje = null;
  this.enemigos = [];
  this.fondos =[];
}

Juego.prototype.update = function(){

          if (! this.personaje.lives == 0 ){
            for (var j = 0; j < this.enemigos.length; j++) {
              this.enemigos[j].update();
              for (var k = 0; k < this.objetos.length; k++) {
                this.objetos[k].update();
               if (detectar_colicion(this.personaje,this.enemigos[j])) {
                    this.enemigos[j].colicionar_personaje(this.personaje);
                }
                if (detectar_colicion(this.personaje,this.objetos[k])){
                    this.personaje.colicionar_moneda(this.objetos[k]);
                }
                if (detectar_colicion(this.enemigos[j],this.objetos[k])){
                   this.enemigos[j].colicionar_moneda(this.objetos[k]);
                }
              }
            }
          }
          else{

              for (var i = 0; i < this.fondos.length; i++) {
                this.fondos[i].pausaYplay("pausa");}
                cambioSprite(this.personaje.elemento,"golpeado","personaje");
                document.getElementById("puntos_finales").innerHTML = puntosX;
                setTimeout(function(){
                  borradoObjetos();
                  p_juego.hide();
                  p_puntos.show();
                },2000 );

          }
  }



Juego.prototype.eliminarme = function(){

  var juego = null;
  var intervalo = null;
  var intervalo_salto = null;
  this.delete;
}

function borradoObjetos(){
  clearInterval(intervalo);
  juego.personaje.eliminarme();
  juego.personaje = null;

  for (var j = 0; j < juego.enemigos.length; j++) {
    juego.enemigos[j].eliminarme();
    delete juego.enemigos[j];
  }
  juego.enemigos = [];
  for (var k = 0; k < juego.objetos.length; k++) {
    juego.objetos[k].eliminarme();
    delete  juego.objetos[k];
  }
  juego.objetos = [];

  for (var j = 0; j < juego.fondos.length; j++) {
    juego.fondos[j].eliminarme();
    delete  juego.fondos[j];
  }
  juego.fondos = [];

  //juego.eliminarme();
}



function realizarAccion(e){
  var pj = juego.personaje;
  if (! pj.lives == 0){
  e = e || window.event;

  switch(e.keyCode) {
        case 119:    ///////// Letra W de mi pc
            if (! pj.onJump){
            pj.Jump();
            }
            break;
        case 100:    ///////// Letra D de mi pc
            if (! pj.onJump){
            pj.moverse(1);
            }
            break;
        case 97:    ///////// Letra A de mi pc
            if (! pj.onJump){
            pj.moverse(-1);
            }
            break;

    }
  }
}


/*
--------------
--------------        CREACION DE OBJETOS DEL JUEGO
--------------
*/
var p_juego = $('#p_juego');
var p_inicio = $('#p_inicio');
var p_puntos = $('#p_puntos');
var p_rules = $('#p_rules');

var play_btn = $('.play-btn');
var rules_btn = $('#rules-btn');


play_btn.click(function(){
  p_juego.show();
  p_inicio.hide();
  p_puntos.hide();
  p_reglas.hide();
  empezarJuego();
});
p_puntos.hide();
p_juego.hide();
p_inicio.show();

/*
var jugando = false;
function empezarJuego(){
  jugando = true;
}
*/

addEventListener("keypress",realizarAccion);
function empezarJuego(){

  juego = new Juego();

  juego.personaje = crearPersonaje();
  intervalo_salto =  setInterval(function (){
  juego.personaje.empezarSaltar();},100);
  juego.enemigos.push(crearEnemigo(1,900,440,-1));
  juego.enemigos.push(crearEnemigo(2,50,300,1));
  juego.objetos.push(crearObjeto(1000,piso));
  juego.fondos.push(crearFondo(1));
  juego.fondos.push(crearFondo(2));
  juego.fondos.push(crearFondo(3));
  juego.fondos.push(crearFondo(4));

  intervalo =  setInterval(function (){
    juego.update();},80);
}

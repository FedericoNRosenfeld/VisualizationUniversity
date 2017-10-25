




function Juego() {
  this.objetos = [];
  this.personaje = null;
  this.enemigos = [];
  this.fondos =[];
}

function etereos(){
  setTimeout( function(){
  },2000);
}


Juego.prototype.update = function(){

          if (! this.personaje.lives == 0 ){
            for (var j = 0; j < this.enemigos.length; j++) {
              this.enemigos[j].update();
              for (var k = 0; k < this.objetos.length; k++) {
                this.objetos[k].update();
                //console.log(this.personaje.elemento.className);
                if (detectar_colicion(this.personaje,this.enemigos[j])) {
                    etereos();
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
              //mostrarFin();
          }
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


addEventListener("keypress",realizarAccion);
/*
--------------
--------------        CREACION DE OBJETOS DEL JUEGO
--------------
*/
var p_juego = $('#p_juego');
var p_inicio = $('#p_inicio');
var play_btn = $('#play-btn');

play_btn.click(function(){
  p_juego.show();
  p_inicio.hide();
  empezarJuego();
});
p_juego.hide();
p_inicio.show();

/*
var jugando = false;
function empezarJuego(){
  jugando = true;
}
*/
var juego = new Juego();

function empezarJuego(){


  setInterval(function(){
    juego.personaje.empezarSaltar();
  },100);
  juego.personaje = crearPersonaje();
  juego.enemigos.push(crearEnemigo(1,900,440,-1));
  juego.enemigos.push(crearEnemigo(2,50,300,1));
  juego.objetos.push(crearObjeto(1000,piso));
  juego.fondos.push(crearFondo(1));
  juego.fondos.push(crearFondo(2));
  juego.fondos.push(crearFondo(3));
  juego.fondos.push(crearFondo(4));
    setInterval(function (){
  juego.update();},80);
}

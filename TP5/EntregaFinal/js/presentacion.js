
var contador = 0;
var intervalo03;
var imagenV3;

function iniciandoVista3(){
  setTimeout(function(){ // le dejamos 2 segundos de inicio a la primera imagen
  intervalo03 = setInterval(function (){
    muestraAutomatica();},6000); // cada 6 segundos se reinicia el ciclo
  },2000 );

}
function terminandoIntervalo3(){ // destruye el intervalo03 para evitar que se repita (unir para cuando se salga de la vista3)
  clearInterval(intervalo03);
}

function  muestraAutomaticaV3(){
    imagen = document.getElementById("imagenPesentacion");
    imagen.classList.add("cambio_automatico_v1");
    if( contador < imagenes.length) {
        setTimeout(function(){
          imagen.classList.remove("cambio_automatico_v1");
          imagen.classList.add("cambio_automatico_v2");
          document.getElementById("imagenPesentacion").src = imagenes[contador].url;
          document.getElementById("like3").innerHTML = imagenes[contador].likes;
          document.getElementById("usuario3").innerHTML = imagenes[contador].usuario;
        },2000 );
      contador++;
    }
    else {
      contador = 0;
    }
}

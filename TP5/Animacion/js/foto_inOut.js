
var src_nuevo = "css/images/colage.png";

var imagen;

function cargar_foto(){
  imagen = document.getElementById("imagen_auto");
  imagen.classList.add("cambio_automatico_v1");
  setTimeout(function(){
    document.getElementById("imagen_auto").src = src_nuevo;
    imagen.classList.remove("cambio_automatico_v1");
    imagen.classList.add("cambio_automatico_v2");

  },2000 );

}



var btn = $('.btn-imagen');

btn.click(function(){
  cargar_foto();
});

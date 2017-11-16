$( document ).ready(function() {
/// --------------------------------------------    Authentication
//var Codebird = require('cd/codebird');
// or with leading "./", if the codebird.js file is in your main folder:
// var Codebird = require("./codebird");
//CONSUMER ALT "ZjATE7n0u6cve4juuPiyitw9O", "32DuRj57NXTKp7pOMCw4c7Ubsee57qffr2jrk8vAmjHwwwLg4b"
//TOKEN ALT "926493527856566272-DW8mbl8NYupY9WY4ce9pUuCqALoKpPL", "m2Anmygd0uJ1tjTlU5WC8JCVH6S6R9DlTugfEQbwb9z8v"
var vistaActiva = "grilla";
var cambio_tipo = true;
var imagenes = [];
/// --------------------------------------------    Authentication
//var Codebird = require("cd/codebird");
// or with leading "./", if the codebird.js file is in your main folder:
// var Codebird = require("./codebird");
var cb = new Codebird;
cb.setConsumerKey("8Vmq8hzhPIPjYc4EAfGQ3vlke", "8h2fSU4vYhLqeJJmpRQRv9JxwtUP6jkmBU4vgitWR6Gjt859Ov");
cb.setToken("163239019-rJLe5uULgm7ZVDO8yPVstjugvQRSqB6LzEtiakAV", "FnOHS2LkDQfICIBmlwia4oCsfGrSx4ohBQPOmViuToBTU");

//cb.setProxy("https://cb-proxy.herokuapp.com/"); // proxy que paso Axel


function consultar(busqueda,tipo){
  document.getElementById("paginaInicio").style.display = "none";
  document.getElementById("paginaGaleria").style.display = "block"
  document.getElementById("grilla").style.backgroundColor = "lightblue";
  document.getElementById("exposicion").style.backgroundColor = "white";
  document.getElementById("presentacion").style.backgroundColor = "white";
  var consulta; // para chequear si no arranca con un #
  consulta = busqueda.substring(0,1);
  if  (consulta != "#"){
    consulta = "#"+ busqueda;
  }
  else {
    consulta = busqueda;
  }
 var params = {
   //https://developer.twitter.com/en/docs/tweets/search/api-reference/get-search-tweets

      q: consulta, 			// busqueda a realizar , hacer un chequeo si lo que viene no posee ya un #
      result_type: tipo, 	// mixta era el dafault pero no traia todos, sino que traia los que tenia en comun
      count:50, 					// maximo de 50 twitters
  };
  console.log(params.q);
	cb.__call(
	"search_tweets",
	params,
	function (reply) {
	 for (var i = 0; i < reply.statuses.length; i++) {
	  // var pertenece = false;
	   var twitter = reply.statuses[i];
	   if(( twitter.extended_entities && twitter.extended_entities.media[0].type == "photo" )){
		   var paquete = {
			   // https://developer.twitter.com/en/docs/tweets/data-dictionary/overview/extended-entities-object
			   url: twitter.extended_entities.media[0].media_url_https,
			   //https://developer.twitter.com/en/docs/tweets/data-dictionary/overview/tweet-object
			   likes: twitter.favorite_count,
			   // Nombre del emisor del twit
			   usuario: twitter.user.name
		   }
		   // armar un contains para evitar imagenes repetidas (re-twitts)
      if (! existeImagen(paquete)){
        imagenes.push(paquete);

      }
		 }
	   }
	   if (cambio_tipo){
          cambio_tipo = false; //asi evita entrar en el if la segunda vuelta
          consultar(busqueda,"recent");
	   }
	   else{
        cambiar_tipo = true; // para que quede seteado en default otra vez
        cargarvista();
	   }
	}

);
}


function existeImagen(paquete){
  //Funcion encargada de determinar si una imagen de un Twitt ya esta en el arreglo iamgenes
  for (var i = 0; i < imagenes.length; i++) {
    if (imagenes[i].url == paquete.url){
      //usarMejorImagen(imagenes[i],paquete);
      return true;
    }
  }
  return false;

}

//-----------------------metodos de carga de galerias----------------------------//
function cargargrilla(){
  var img = document.getElementById("grill");
  while (img.hasChildNodes()) {
      img.removeChild(img.firstChild);
  }

  for (var i = 0; i < imagenes.length; i++) {
    console.log(imagenes[i]);
    var divtamano = document.createElement('div');
    divtamano.className = "col-sm-3 imagenesgrilla";
    var divImages = document.createElement('div');
    //divImages.className = "imagenesGaleria";
    var images = document.createElement('img');
    images.src = imagenes[i].url;
    images.id = i;
    images.className = "img-responsive";
    var divDatos = document.createElement('div');
    divDatos.className = "row";

    var likes = document.createElement('div');
    likes.className = "text-right col-sm-6 likes";
    var figura = document.createElement('i');
    figura.className = "fa fa-heart";
    var texto = document.createTextNode(imagenes[i].likes);
    var divUser = document.createElement('div');
    divUser.className = "text-left col-sm-6 user";
    var p = document.createElement('p');
    var nombre = document.createTextNode("@"+imagenes[i].usuario);

    p.appendChild(nombre);
    divUser.appendChild(p);


    figura.appendChild(texto);
    likes.appendChild(figura);

    divDatos.appendChild(divUser);
    divDatos.appendChild(likes);

    divImages.appendChild(images);
    divtamano.appendChild(divImages);
    divtamano.appendChild(divDatos);
    document.getElementById('grill').appendChild(divtamano);
  }
}


/// --------------------------------------- VISTA 3 - MOVIMIENTO AUTOMATICO CON GIRO
var contador = 1;
var intervalo03;
var imagenV3;
function iniciandoVista3(){
  imagenV3 = document.getElementById("imagenV3");
  document.getElementById("imagenV3").src = imagenes[0].url;
  document.getElementById("like3").innerHTML = imagenes[0].likes;
  document.getElementById("usuario3").innerHTML = imagenes[0].usuario;
  // setTimeout(function(){ // le dejamos 2 segundos de inicio a la primera imagen
  intervalo03 = setInterval(function (){
    muestraAutomaticaV3();},7000); // cada 6 segundos se reinicia el ciclo
  // },2000 );

}
function terminandoIntervalo3(){ // destruye el intervalo03 para evitar que se repita (unir para cuando se salga de la vista3)
  clearInterval(intervalo03);
  contador = 0;
}

function  muestraAutomaticaV3(){
    imagenV3.classList.remove("giroShow");
    imagenV3.classList.add("giroHide");
    setTimeout(function(){
      imagenV3.classList.remove("giroHide");
      document.getElementById("imagenV3").src = imagenes[contador].url;
      document.getElementById("like3").innerHTML = imagenes[contador].likes;
      document.getElementById("usuario3").innerHTML = imagenes[contador].usuario;
      imagenV3.classList.add("giroShow");
      console.log(document.getElementById("imagenV3").src);

    },2000 );
    if( contador < (imagenes.length -1)) {
        contador++
    }
    else {
      console.log("entro al cont 0");
      console.log(document.getElementById("imagenV3").src);
        contador = 0;
    }
}

//-------------------------Cargado de las vistas----------------------------------//

var cargarvista = function() {
  var pagina = "";
  switch (vistaActiva) {
    case "grilla":
      pagina = "vista1";
      break;
    case "exposicion":
      pagina = "vista2";
      break;
    case "presentacion":
      pagina = "vista3";
      break;
  }
  $.ajax({
    url: pagina+".html",
    method:"GET",
    dataType:"html",
    success: function(textoCargado, status){
      $("#contenido").html(textoCargado);
      switch (vistaActiva) {
        case "grilla":
          cargargrilla();
          break;
        case "exposicion":
          pagina = "vista2";
          break;
        case "presentacion":
          iniciandoVista3();
          // pagina = "vista3";
          break;
      }

    }
  });
};
//-------------------------pagina de inicio----------------------------------//


$(document).on("click", "#primeraBusqueda", function(e){
  e.preventDefault();
  document.body.style.background = "url('css/images/background_t.png')";
  var busqueda = document.getElementById("primerFormulario").buscar.value;
  console.log(busqueda);
  consultar(busqueda,"popular");
});


//-------------------------Busqueda--------------------------------------------//
$('#hash').submit(function(e){
  e.preventDefault();
  var busqueda = document.getElementById("hash").buscar.value;
  imagenes = [];
  consultar(busqueda,"popular");
  cargarvista();
  document.getElementById("grilla").style.backgroundColor = "lightblue";
});

//-------------------------Cambio de galerias--------------------------------------------//

$('#grilla').click(function(e){
  e.preventDefault();
  vistaActiva = "grilla";
  cargarvista();
  document.getElementById("grilla").style.backgroundColor = "lightblue";
  document.getElementById("exposicion").style.backgroundColor = "white";
  document.getElementById("presentacion").style.backgroundColor = "white";
});

$('#exposicion').click(function(e){
  e.preventDefault();
  vistaActiva = "exposicion";
  cargarvista();
  document.getElementById("grilla").style.backgroundColor = "white";
  document.getElementById("exposicion").style.backgroundColor = "lightblue";
  document.getElementById("presentacion").style.backgroundColor = "white";
});

$('#presentacion').click(function(e){
  e.preventDefault();
  vistaActiva = "presentacion";
  cargarvista();
  document.getElementById("grilla").style.backgroundColor = "white";
  document.getElementById("exposicion").style.backgroundColor = "white";
  document.getElementById("presentacion").style.backgroundColor = "lightblue";
});

});

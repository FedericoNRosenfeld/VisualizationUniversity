


// Definicion de una Caja base


var arrPosibilidades = [" rotar"," skewskew"];

function estilo_Aleatorio(){
  var estilo_elegido = Math.floor(Math.random()*2);
  var elemento = document.getElementById("estilo_1");
  elemento.className = arrPosibilidades[estilo_elegido];


  }

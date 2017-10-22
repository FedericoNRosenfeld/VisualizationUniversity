

function Fondo(id){
  this.id = id;
  this.elemento =document.getElementById("fondo"+id);
  this.elemento.className = "backg-"+id;
}


Fondo.prototype.pausaYplay = function(accion){
  if (accion == "pausa"){
    this.elemento.classList.add("pausa");
  }
  else{
    this.elemento.classList.remove("pausa");
    }
  }


function crearFondo(id){
   fondo = new Fondo(id);
   return fondo;
}

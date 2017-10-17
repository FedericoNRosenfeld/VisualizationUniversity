


function mousemove(e) {
  mouseX = e.clientX;
  mouseY = e.clientY;
  elemento = document.getElementById("personajeX");
  elemento.style.transform = "translate( "+(mouseX-150)+"px,"+ (mouseY-10) +"px)";
}

  addEventListener("mousemove",mousemove);


var image1 = new Image();
image1.src = "imagen1.jpg"; // asigna la direccion de donde cargar la imagen
var ctx = document.getElementById("canvas").getContext("2d");
var ctx2 = document.getElementById("canvas2").getContext("2d");

////////////////////////////////////////////////////////// PONER UNA IMAGEN AL CANVAS LUEGO DE QUE ESTA CARGO

image1.onload = function(){  // realiza la funcion despues de que cargo la imagen y con esto evita error
  myDrawImageMethod(this);
}
  function myDrawImageMethod(image){
    ctx.drawImage(image,0,0 ,canvas.width,canvas.height);
    imageData =  ctx.getImageData(0,0, canvas.width,canvas.width);
}

////////////////////////////////////////////////////////// CARGAR UNA IMAGEN AL CANVAS DESDE PC
$(function() {
    $('#file-input').change(function(e) {
        var file = e.target.files[0],
            imageType = /image.*/;

        if (!file.type.match(imageType))
            return;

        var reader = new FileReader();
        reader.onload = fileOnload;
        reader.readAsDataURL(file);

    });

    function fileOnload(e) {
        var $img = $('<img>', { src: e.target.result });
        $img.on('load', function() { // Te odio a vos y a esta linea que cambio en jquery-3
            myDrawImageMethod(this); // modifique esta parte porque no andaban los filtros mas adelante
        });
    }


});


////////////////////////////////////////////////////////// DESCARGAR LA IMAGEN DEL CANVAS A LA PC

var button = document.getElementById('btn-download');
button.addEventListener('click', function (e) {
    var dataURL = canvas2.toDataURL('image/png');
    button.href = dataURL;
});


////////////////////////////////////////////////////////// SELECCIONAR Y APLICAR UN FILTRO A LA IMAGEN DEL CANVAS


var buttonFiltros = document.getElementById('btn-download');
buttonFiltros.addEventListener('click', function (filtro_deseado) {
  // de aca para arriba hay que ver como hace ru ndesplegable
   imageDataX =  ctx.getImageData(0,0, canvas.width,canvas.width);
   realizarFiltro(imageDataX,filtro_deseado);
});

function realizarFiltro(imageDataX,filtro_deseado,valor_extra){

  switch(filtro_deseado) {
      case negativo:
          realizar_Negativo(imageDataX)
          break;

      case binarización:
          realizar_Binarizacion(imageDataX,valor_extra)
          break;
      case sepia:
          realizar_Sepia(imageDataX)
          break;
      case Gray_Scale:
          realizar_Gray_Scale(imageDataX)
          break;
      // de aca para abajo no tengo ninguno echo
      case brillo:
          realizar_brillo(imageDataX,valor_extra)
          break;
      case n:
          realizar_Saturacion(imageDataX)
          break;
      case n:
          realizar_Suavizacion(imageDataX)
          break;
      case n:
          realizar_DeteccionDeBordes(imageDataX)
          break;
     case n:
          realizar_Blur(imageDataX)
          break;


      default:
          code block
  }



}

////////////////////////////////////////////////////////// FILTROS

    // Aca podria poner un case que me de la opcion de que filtro ponerle
    
    // Negativo
			function realizar_Negativo(imageData1){
			 for (x=0; x<imageData1.width; x++){
			    for (y=0; y<imageData1.height; y++){
			      setPixel(imageData1, x, y, 255-getRed(imageData1,x,y),255-getGreen(imageData1,x,y),255-getBlue(imageData1,x,y), 255);
					}
			 }
       ctx2.putImageData(imageData1,0, 0);
		}

		// Gray Scale
			function realizar_Gray_Scale(imageData2){
				for (x=0; x<ctx.width; x++){
					 for (y=0; y<ctx.height; y++){
				      prom = (getRed(imageData2,x,y) + getGreen(imageData2,x,y) + getBlue(imageData2,x,y))/3;
				      setPixel(imageData2, x, y, prom ,prom ,prom , 255);
						}
				}
        ctx2.putImageData(imageData2,0, 0);
			 }
      // Sepia
			function realizar_Sepia(imageData3){
				for (x=0; x<ctx.width; x++){
		 	    for (y=0; y<ctx.height; y++){
				      red = getRed(imageData3,x,y);
				      green = getGreen(imageData3,x,y);
				      blue = getBlue(imageData3,x,y);

				      sepiaR = Math.floor(0.393*red + 0.769*green+ 0.189*blue);
				      sepiaG = Math.floor(0.349*red + 0.686*green + 0.168*blue);
				      sepiaB = Math.floor(0.272*red + 0.534*green + 0.131*blue);
				      setPixel(imageData3, x, y, sepiaR,sepiaG,sepiaB, 255);
					}
			 	}
        ctx2.putImageData(imageData3,0, 0);
			 }

	      // Binarizacion

			function realizar_Binarizacion(imageData4,valor_extra){
        for (x=0; x<ctx.width; x++){
           for (y=0; y<ctx.height; y++){
			      prom2 = (getRed(imageData4,x,y) + getGreen(imageData4,x,y) + getBlue(imageData4,x,y))/3;
			      if (prom2 < valor_extra){
			        prom2 = 0;
			      }
			      else {
			        prom2 = 255;
			      }
			      setPixel(imageData4, x, y, prom2 ,prom2 ,prom2 , 255);
			   }
	  		}
        ctx2.putImageData(imageData4,0, 0);
			}

	/*
	    // Brillo
	    red = getRed(imageData3,x,y);
	    green = getGreen(imageData3,x,y);
	    blue = getBlue(imageData3,x,y);

	    var  brillo = 40;
	      red+= brillo;
	      green+= brillo;
	      blue+= brillo;
	      if  ((red > 255) or (red < 0)){
	        if (red >255){
	          red=255;
	        }
	        else {
	          red=0;
	        }
	      }
	      if  ((green > 255) or (green < 0)){
	        if (green >255){
	          green=255;
	        }
	        else {
	          green=0;
	        }
	      }

	      if  ((blue > 255) or (blue < 0)){
	        if (blue >255){
	          blue=255;
	        }
	        else {
	          blue=0;
	        }
	      }
	*/
  ////////////////////////////////////////////////////////// GET DE LOS COLORES Y EL SETPIXEL
	function getRed(imagedata, x, y){
	  index = (x + y * imageData.width)*4;
	  return imageData.data[index+0];
	}

	function getGreen(imagedata, x, y){
	  index = (x + y * imageData.width)*4;
	  return imageData.data[index+1];
	}

	function getBlue(imagedata, x, y){
	  index = (x + y * imageData.width)*4;
	  return imageData.data[index+2];
	}


	function setPixel(imageData, x, y, r, g, b, a){
		index = (x + y * imageData.width) * 4;
		imageData.data[index+0] = r;
		imageData.data[index+1] = g;
		imageData.data[index+2] = b;
		imageData.data[index+3] = a;
	}

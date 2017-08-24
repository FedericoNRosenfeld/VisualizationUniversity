



var image1 = new Image();
image1.src = "imagen1.jpg"; // asigna la direccion de donde cargar la imagen
var ctx = document.getElementById("canvas").getContext("2d");
var ctx2 = document.getElementById("canvas2").getContext("2d");

image1.onload = function(){  // realiza la funcion despues de que cargo la imagen y con esto evita error
  myDrawImageMethod(this);
}
  function myDrawImageMethod(image){
    ctx.drawImage(image,0,0 ,canvas.width,canvas.height);
    imageData =  ctx.getImageData(0,0, canvas.width,canvas.width);
}


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

    $('#Aplicar_Filtro_X').on('click', function() {
       imageDataX =  ctx.getImageData(0,0, canvas.width,canvas.width);
       realizar_Negativo(imageDataX);
    });

});



		// Aca podria poner un case que me de la opcion de que filtro ponerle

			function realizar_Negativo(imageData1){
			 for (x=0; x<imageData1.width; x++){
			    for (y=0; y<imageData1.height; y++){
			      // Negativo
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

			function realizar_Binarizacion(imageData4){
        for (x=0; x<ctx.width; x++){
           for (y=0; y<ctx.height; y++){
			      prom2 = (getRed(imageData4,x,y) + getGreen(imageData4,x,y) + getBlue(imageData4,x,y))/3;
			      if (prom2 < 128){// el 128 deberia se una variable editable por el usuario el cual maneje el rango de cambio
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
	// Get de los colores
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

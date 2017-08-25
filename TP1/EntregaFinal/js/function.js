
var image1 = new Image();
image1.src = "imagen1.jpg"; // asigna la direccion de donde cargar la imagen
var ctx = document.getElementById("canvas").getContext("2d");
var ctx2 = document.getElementById("canvas2").getContext("2d");

////////////////////////////////////////////////////////// PONER UNA IMAGEN AL CANVAS LUEGO DE QUE ESTA CARGO

image1.onload = function(){  // realiza la funcion despues de que cargo la imagen y con esto evita error
  myDrawImageMethod(this);
}
  function myDrawImageMethod(image){

    $("canvas").attr("width",image.width);
    $("canvas").attr("height",image.height);
    ctx.drawImage(image,0,0 ,image.width,image.height);
    imageData =  ctx.getImageData(0,0, canvas.width,canvas.height);
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

////////////////////////////////////////////////////////// BARRA DE BRILLO QUE SE UPDATEA CON EL MOVIMIENTO

$(document).ready(function(){
		$('#barra_brillo').change(function() {
		Filtrar("brillo",$(this).val());
		});
	});

  ////////////////////////////////////////////////////////// BARRA DE binarizacion QUE SE UPDATEA CON EL MOVIMIENTO

  $(document).ready(function(){
  		$('#barra_binarizacion').change(function() {
  		Filtrar("binarizacion",$(this).val());
  		});
  	});

////////////////////////////////////////////////////////// SELECCIONAR Y APLICAR UN FILTRO A LA IMAGEN DEL CANVAS

function Filtrar(filtro_deseado,valor_extra){
  imageDataX =  ctx.getImageData(0,0, canvas.width,canvas.height);
   val = parseInt(valor_extra);
  realizarFiltro(imageDataX,filtro_deseado,val);
}

function realizarFiltro(imageDataX,filtro_deseado,valor_extra){

  switch(filtro_deseado) {
      case "negativo":
          realizar_Negativo(imageDataX);
          break;
      case "binarizacion":
          realizar_Binarizacion(imageDataX,valor_extra);
          break;
      case "sepia":
          realizar_Sepia(imageDataX);
          break;
      case "Gray_Scale":
          realizar_Gray_Scale(imageDataX);
          break;
      // de aca para abajo no tengo ninguno echo
      case "brillo":
          realizar_brillo(imageDataX,valor_extra);
          break;
      case "blur":
           realizar_Blur(imageDataX);
           break;
      case "saturacion":
          realizar_Saturacion(imageDataX);
          break;
      case "bordes":
          realizar_DeteccionDeBordes(imageDataX);
          break;

      case n:
          realizar_Suavizacion(imageDataX);
          break;

      default:
          alert('cai en alert');
  }

}

////////////////////////////////////////////////////////// FILTROS


//HORIZONTAL_GRADIENT_SOBEL: TTemplate = ((-1,0,1),(-2,0,2),(-1,0,1));
//VERTICAL_GRADIENT_SOBEL: TTemplate = ((-1,-2,-1),(0,0,0),(1,2,1));
    function  realizar_DeteccionDeBordes(imageDataAux){
      var valR =0;
      var valG =0;
      var valB =0;
      for (x=1; x<imageDataAux.width-1; x++){
         for (y=1; y<imageDataAux.height-1; y++){
           valRx = ( getRed(imageDataAux,x-1,y-1)*(-1) +  getRed(imageDataAux,x-1,y)*(-2) +  getRed(imageDataAux,x-1,y+1)*(-1) +
                    getRed(imageDataAux,x+1,y-1) +  getRed(imageDataAux,x+1,y)*(2) + getRed(imageDataAux,x+1,y+1));

           valGx = ( getGreen(imageDataAux,x-1,y-1)*(-1) +  getGreen(imageDataAux,x-1,y)*(-2) +  getGreen(imageDataAux,x-1,y+1)*(-1) +
                    getGreen(imageDataAux,x+1,y-1) +  getGreen(imageDataAux,x+1,y)*(2) +  getGreen(imageDataAux,x+1,y+1));

           valBx = ( getBlue(imageDataAux,x-1,y-1)*(-1) +  getBlue(imageDataAux,x-1,y)*(-2) +  getBlue(imageDataAux,x-1,y+1)*(-1) +
                    getBlue(imageDataAux,x+1,y-1) +  getBlue(imageDataAux,x+1,y)*(2) +  getBlue(imageDataAux,x+1,y+1));
          fila = (valRx + valGx + valBx)/3;
          columna = (valRy + valGy + valBy)/3;

          setPixel(imageDataAux, x, y, nana,nana,nana, 255);
         }
      }      alert('fin');

      putimagedataf(imageDataAux);
      }



    // Negativo
			function realizar_Negativo(imageData1){
			 for (x=0; x<imageData1.width; x++){
			    for (y=0; y<imageData1.height; y++){
			      setPixel(imageData1, x, y, 255-getRed(imageData1,x,y),255-getGreen(imageData1,x,y),255-getBlue(imageData1,x,y), 255);
					}
			 }
       putimagedataf(imageData1);
		}

		// Gray Scale
			function realizar_Gray_Scale(imageData2){
				for (x=0; x<imageData2.width; x++){
					 for (y=0; y<imageData2.height; y++){
				      prom = (getRed(imageData2,x,y) + getGreen(imageData2,x,y) + getBlue(imageData2,x,y))/3;
				      setPixel(imageData2, x, y, prom ,prom ,prom , 255);
						}
				}
        putimagedataf(imageData2);
			 }

       // Blur
   			function realizar_Blur(imageData1){
          var valR = 0;
          var valG = 0;
          var valB = 0;
          for (x=0; x<imageData1.width; x++){
   			    for (y=0; y<imageData1.height; y++){
              valR = ( getRed(imageData1,x-1,y-1) +  getRed(imageData1,x-1,y) +  getRed(imageData1,x-1,y+1) + getRed(imageData1,x,y-1) +
                      getRed(imageData1,x,y)  + getRed(imageData1,x,y+1) + getRed(imageData1,x+1,y-1) +  getRed(imageData1,x+1,y) +
                      getRed(imageData1,x+1,y+1))/9
              valG = ( getGreen(imageData1,x-1,y-1) +  getGreen(imageData1,x-1,y) +  getGreen(imageData1,x-1,y+1) + getGreen(imageData1,x,y-1) +
                      getGreen(imageData1,x,y)  + getGreen(imageData1,x,y+1) + getGreen(imageData1,x+1,y-1) +  getGreen(imageData1,x+1,y) +
                      getGreen(imageData1,x+1,y+1))/9
              valB = ( getBlue(imageData1,x-1,y-1) +  getBlue(imageData1,x-1,y) +  getBlue(imageData1,x-1,y+1) + getBlue(imageData1,x,y-1) +
                      getBlue(imageData1,x,y)  + getBlue(imageData1,x,y+1) + getBlue(imageData1,x+1,y-1) +  getBlue(imageData1,x+1,y) +
                      getBlue(imageData1,x+1,y+1))/9

   			      setPixel(imageData1, x, y, valR,valG,valB, 255);
   					}
   			 }
         putimagedataf(imageData1);
   		}


      // Sepia
			function realizar_Sepia(imageData3){
				for (x=0; x<imageData3.width; x++){
		 	    for (y=0; y<imageData3.height; y++){
				      red = getRed(imageData3,x,y);
				      green = getGreen(imageData3,x,y);
				      blue = getBlue(imageData3,x,y);

				      sepiaR = Math.floor(0.393*red + 0.769*green+ 0.189*blue);
				      sepiaG = Math.floor(0.349*red + 0.686*green + 0.168*blue);
				      sepiaB = Math.floor(0.272*red + 0.534*green + 0.131*blue);
				      setPixel(imageData3, x, y, sepiaR,sepiaG,sepiaB, 255);
					}
			 	}
        putimagedataf(imageData3);
			 }

	      // Binarizacion

			function realizar_Binarizacion(imageData4,valor_extra){
        for (x=0; x<imageData4.width; x++){
           for (y=0; y<imageData4.height; y++){
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
        putimagedataf(imageData4);
			}

      function realizar_brillo(imageData4,brillo){

      for (x=0; x<imageData4.width; x++){
         for (y=0; y<imageData4.height; y++){
          red = getRed(imageData4,x,y);
    	    green = getGreen(imageData4,x,y);
    	    blue = getBlue(imageData4,x,y);

          red+= brillo;
          if (red > 255){
              red = 255;
          }
          if (red < 0){
              red = 0;
          }

          green+= brillo;
          if (green > 255){
              green = 255;
          }
          if (green < 0){
              green = 0;
          }

          blue+= brillo;
          if (blue > 255){
            blue = 255;
          }
          if (blue < 0){
              blue = 0;
          }

               setPixel(imageData4, x, y, red ,green ,blue , 255);
           }
         }
          putimagedataf(imageData4);
    }


    ////////////////////////////////////////////////////////// putImageData

    function putimagedataf(imageData4){
        ctx2.putImageData(imageData4,0, 0);
    }



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

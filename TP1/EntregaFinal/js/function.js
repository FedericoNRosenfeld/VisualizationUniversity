
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

  ////////////////////////////////////////////////////////// BARRA DE SATURACION QUE SE UPDATEA CON EL MOVIMIENTO

     $(document).ready(function(){
     		$('#barra_saturacion').change(function() {
     		Filtrar("saturacion",$(this).val());
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
         realizar_Saturacion(imageDataX,valor_extra);
         break;
      case "bordes":
          realizar_DeteccionDeBordes(imageDataX);
          break;

      case "colores":
          realizar_coloresMezclados(imageDataX);
          break;

      default:
          alert('cai en alert');
  }

}

////////////////////////////////////////////////////////// FILTROS


// Estas funcion la utilizo para no repetir codigo


function multiplicarColor(imageData,arrPos,getColor){

  var valor = ( getColor(imageData,x-1,y-1)*arrPos[0] +  getColor(imageData,x-1,y)*arrPos[1] +  getColor(imageData,x-1,y+1)*arrPos[2] +
                getColor(imageData,x,y-1)*arrPos[3] + getColor(imageData,x,y)*arrPos[4]  + getColor(imageData,x,y+1)*arrPos[5] +
                getColor(imageData,x+1,y-1)*arrPos[6] +  getColor(imageData,x+1,y)*arrPos[7] +  getColor(imageData,x+1,y+1)*arrPos[8]);
  return valor;
}


    ////////////////////////////////////////////////////////// Deteccion De Bordes


    function  realizar_DeteccionDeBordes(imageData){
      var valRx =0;
      var valGx =0;
      var valBx =0;
      var valRy =0;
      var valGy =0;
      var valBy =0;

      var arrH = [-1,-2,-1,0,0,0,1,2,1];
      var arrV = [-1,0,1,-2,0,2,-1,0,1];
      //HORIZONTAL  = ((-1,0,1),(-2,0,2),(-1,0,1));
      //VERTICAL   = ((-1,-2,-1),(0,0,0),(1,2,1));
      for (x=1; x<imageData.width-1; x++){
         for (y=1; y<imageData.height-1; y++){
           valRx = multiplicarColor(imageData,arrH,getRed);
           valRy = multiplicarColor(imageData,arrV,getRed);
           valGx = multiplicarColor(imageData,arrH,getGreen);
           valGy = multiplicarColor(imageData,arrV,getGreen);
           valBx = multiplicarColor(imageData,arrH,getBlue);
           valBy = multiplicarColor(imageData,arrV,getBlue);
          fila = (valRx + valGx + valBx)/3;
          columna = (valRy + valGy + valBy)/3;
          setPixel(imageData, x, y,255-(fila+columna),255-(fila+columna),255-(fila+columna), 255);
         }
      }
      putimagedataf(imageData);
      }



  ////////////////////////////////////////////////////////// Negativo
			function realizar_Negativo(imageData){
			 for (x=0; x<imageData.width; x++){
			    for (y=0; y<imageData.height; y++){
			      setPixel(imageData, x, y, 255-getRed(imageData,x,y),255-getGreen(imageData,x,y),255-getBlue(imageData,x,y), 255);
					}
			 }
       putimagedataf(imageData);
		}

    ////////////////////////////////////////////////////////// COlores Mezclados

    function realizar_coloresMezclados(imageData){
     for (x=0; x<imageData.width; x++){
        for (y=0; y<imageData.height; y++){
          setPixel(imageData, x, y, getGreen(imageData,x,y),getBlue(imageData,x,y),getRed(imageData,x,y), 255);
        }
     }
     putimagedataf(imageData);
  }

////////////////////////////////////////////////////////// Gray Scale
			function realizar_Gray_Scale(imageData){
				for (x=0; x<imageData.width; x++){
					 for (y=0; y<imageData.height; y++){
				      prom = (getRed(imageData,x,y) + getGreen(imageData,x,y) + getBlue(imageData,x,y))/3;
				      setPixel(imageData, x, y, prom ,prom ,prom , 255);
						}
				}
        putimagedataf(imageData);
			 }

////////////////////////////////////////////////////////// Blur
   			function realizar_Blur(imageData){
          var valR = 0;
          var valG = 0;
          var valB = 0;
          var arr = [1,1,1,1,1,1,1,1,1];

          for (x=0; x<imageData.width; x++){
   			    for (y=0; y<imageData.height; y++){
              valR = multiplicarColor(imageData,arr,getRed)/9;
              valG = multiplicarColor(imageData,arr,getGreen)/9;
              valB = multiplicarColor(imageData,arr,getBlue)/9;
   			      setPixel(imageData, x, y, valR,valG,valB, 255);
   					}
   			 }
         putimagedataf(imageData);
   		}


////////////////////////////////////////////////////////// Sepia
			function realizar_Sepia(imageData){
				for (x=0; x<imageData.width; x++){
		 	    for (y=0; y<imageData.height; y++){
				      red = getRed(imageData,x,y);
				      green = getGreen(imageData,x,y);
				      blue = getBlue(imageData,x,y);

				      sepiaR = Math.floor(0.393*red + 0.769*green+ 0.189*blue);
				      sepiaG = Math.floor(0.349*red + 0.686*green + 0.168*blue);
				      sepiaB = Math.floor(0.272*red + 0.534*green + 0.131*blue);
				      setPixel(imageData, x, y, sepiaR,sepiaG,sepiaB, 255);
					}
			 	}
        putimagedataf(imageData);
			 }

////////////////////////////////////////////////////////// Binarizacion

			function realizar_Binarizacion(imageData,valor_extra){
        for (x=0; x<imageData.width; x++){
           for (y=0; y<imageData.height; y++){
			      prom2 = (getRed(imageData,x,y) + getGreen(imageData,x,y) + getBlue(imageData,x,y))/3;
			      if (prom2 < valor_extra){
			        prom2 = 0;
			      }
			      else {
			        prom2 = 255;
			      }
			      setPixel(imageData, x, y, prom2 ,prom2 ,prom2 , 255);
			   }
	  		}
        putimagedataf(imageData);
			}
////////////////////////////////////////////////////////// brillo
      function realizar_brillo(imageData,brillo){

      for (x=0; x<imageData.width; x++){
         for (y=0; y<imageData.height; y++){
          red = getRed(imageData,x,y);
    	    green = getGreen(imageData,x,y);
    	    blue = getBlue(imageData,x,y);

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

               setPixel(imageData, x, y, red ,green ,blue , 255);
           }
         }
          putimagedataf(imageData);
    }
    /////////////////////////////////////////////////////////// saturacion

        function RGB_to_HSV(r,g,b){
          var h,s,v;
          min = Math.min(r, g, b);
          max = Math.max(r, g, b);
          v = max;
          // value listo

          delta = max-min;

          if (max!=0)
            s = delta/max;
            // saturacion lista
          else {
            // si todo es 0, saturacion = 0 (negro)
            s = 0;
            h = 0;
            v = 0;
          return [h, s, v];
          }

          // miro cual fue el maximo

          if (r==max)
            h = (g-b)/delta;
          else if (g==max)
            h = 2+(b-r)/delta;
          else
            h = 4+(r-g)/delta;

          // multiplico por 60 porque son grados
          h = h*60;
          if (h<0)
              h += 360;

          // si da negativo lo convierto al angulo equivalente
          if (isNaN(h))
              h = 0;
          return [h,s,v];
        }

        function HSV_to_RGB(h,s,v){
          var pisoH, factorialH,p,q,t;
          var r,g,b;

          if (s==0) {
            //escala de grises
            r = g = b = v;
            return [r,g,b];
          }

          h = h / 60;
          pisoH = Math.floor(h);
          factorialH = h - pisoH;

          p = v * (1 - s);
          q = v * (1 - s * factorialH);
          t = v * (1 - s * (1 - factorialH));

          switch( pisoH ) {
              case 0:
                  r = v; g = t; b = p;
                  break;
              case 1:
                  r = q; g = v; b = p;
                  break;
              case 2:
                  r = p; g = v; b = t;
                  break;
              case 3:
                  r = p; g = q; b = v;
                  break;
              case 4:
                  r = t; g = p; b = v;
                  break;
              default:        // case 5:
                  r = v; g = p; b = q;
                  break;
          }
          return [r,g,b];
        }


        function realizar_Saturacion(imageData,saturacion){
          var hsv, rgb;
          for (x=0; x<imageData.width; x++){
            for (y=0; y<imageData.height; y++){
              hsv = RGB_to_HSV( getRed(imageData,x,y), getGreen(imageData,x,y), getBlue(imageData,x,y) );
              hsv[1] = (hsv[1] * saturacion);
              if (hsv[1] > 255){
                hsv[1] = 255;
              }
              else if (hsv[1] < 0) {
                hsv[1] = 0;
              }
              rgb = HSV_to_RGB(hsv[0],hsv[1],hsv[2]);
              setPixel(imageData, x, y, rgb[0], rgb[1], rgb[2], 255);
            }
          }
          putimagedataf(imageData);
        }

    ////////////////////////////////////////////////////////// putImageData

    function putimagedataf(imageData){
        ctx2.putImageData(imageData,0, 0);
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

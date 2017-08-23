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
        var canvas = $('#canvas')[0];
        var context = canvas.getContext('2d');

        $img.load(function() {
            context.drawImage(this, 0, 0);
        });
    }
});
var ctx = document.getElementById("canvas").getContext("2d");
  var width = 400;
  var height =300;

var image1 = new Image();
image1.src = "imagen1.jpg"; // asigna la direccion de donde cargar la imagen

image1.onload = function(){  // realiza la funcion despues de que cargo la imagen y con esto evita error
  myDrawImageMethod(this);
}

function myDrawImageMethod(image){
  ctx.drawImage(image,50,50,this.width,this.height);
  imageData =  ctx.getImageData(50,50, this.width,this.height);
  imageData2 = ctx.getImageData(50,50, this.width,this.height);
  imageData3 = ctx.getImageData(50,50, this.width,this.height);
  imageData4 = ctx.getImageData(50,50, this.width,this.height);

 for (x=0; x<width; x++){
    for (y=0; y<height; y++){
      // Negativo
      setPixel(imageData, x, y, 255-getRed(imageData,x,y),255-getGreen(imageData,x,y),255-getBlue(imageData,x,y), 255);
      // Gray Scale
      prom = (getRed(imageData2,x,y) + getGreen(imageData2,x,y) + getBlue(imageData2,x,y))/3;
      setPixel(imageData2, x, y, prom ,prom ,prom , 255);

      // Sepia
      red = getRed(imageData3,x,y);
      green = getGreen(imageData3,x,y);
      blue = getBlue(imageData3,x,y);

      sepiaR = Math.floor(0.393*red + 0.769*green+ 0.189*blue);
      sepiaG = Math.floor(0.349*red + 0.686*green + 0.168*blue);
      sepiaB = Math.floor(0.272*red + 0.534*green + 0.131*blue);
      setPixel(imageData3, x, y, sepiaR,sepiaG,sepiaB, 255);

      // Binarizacion
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

  ctx.putImageData(imageData,500, 50);
  ctx.putImageData(imageData2,50, 370);
  ctx.putImageData(imageData4,500, 370);

}


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




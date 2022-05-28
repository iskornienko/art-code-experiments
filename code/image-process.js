const canvasSketch = require('canvas-sketch');
const SimplexNoise = require('simplex-noise');
const math = require('mathjs');
const Alea = require('alea');
var tinycolor = require("tinycolor2");

const settings = {
  dimensions:[ 500, 500 ],
  animate: false,
  pixelsPerInch: 1,
  units: 'in'
};

var rr;

function random() {
	var simplex = new SimplexNoise(rr);
	var r = simplex.noise2D(6, .9);
	return r;
}


const sketch = () => {

  return ({ context, width, height, playhead }) => {


	base_image = new Image();
  base_image.src = 'pic2.png';
  base_image.onload = function(){

   context.drawImage(base_image, 0, 0); 


   var pxD = 12;
   
   var ar =[]

   for(var y = 0; y < height/pxD; y++) {

   	var br = []
  	for(var x = 0; x < width/pxD; x++) {
  		var pix = context.getImageData(x*pxD+pxD/2, y*pxD+ pxD/2, 1, 1).data;

  		br.push('rgb('+pix[0]+','+pix[1]+','+pix[2]+')');
	  	//context.fillStyle='rgb('+pix[0]+','+pix[1]+','+pix[2]+')';
	  	//context.fillRect(x*pxD+1,y*pxD+1,pxD-2,pxD-2)

  	}
  	ar.push(br)
   }


  	context.fillStyle='white';
  	context.fillRect(0,0,width,height)

  	for(var y = 0; y < ar.length; y++) {
  		for(var x = 0; x < ar[y].length; x++) {

  			var c = tinycolor(ar[y][x])

  			context.fillStyle=c.saturate(30).toString();

  			context.save();
  			context.translate(x*pxD+pxD/2,y*pxD+pxD/2)
  			context.rotate(Math.PI*(c.getBrightness()/255))
	  		context.fillRect(0-pxD/2+1,0-pxD/2+1,pxD-2,pxD-2)
	  		context.restore()

  		}
  	}


  	context.fillStyle='#3C3C3B';
  	context.fillRect(0,0,width,20)
  	context.fillRect(0,0,20,height)
  	context.fillRect(0,width-20,height,20)
  	context.fillRect(width-20,0,20,height)

}





  };
};

var cnvs = canvasSketch(sketch, settings);
setInterval(function () {
	cnvs.then(function (x) {x.render();})
}, 1000*60)


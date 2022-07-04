const canvasSketch = require('canvas-sketch');
const SimplexNoise = require('simplex-noise');
const math = require('mathjs');
const Alea = require('alea');
var tinycolor = require("tinycolor2");

const settings = {
  dimensions:[ 500, 500 ],
  animate: false,
  pixelsPerInch: 10,
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


	//base_image = new Image();
  //.src = 'pic2.png';
  //base_image.onload = function(){

   //context.drawImage(base_image, 0, 0); 

   context.save()
   context.translate(20,20)


   var pxD = 40;
   
   var ar =[]

   for(var y = 0; y < height/pxD; y++) {

   	var br = []
  	for(var x = 0; x < width/pxD; x++) {
  		var pix = [111,78,2]

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

        var xPos = x*pxD+pxD/2;
        var yPos = y*pxD+pxD/2;
        var padding = 0;

        var d = Math.sqrt(Math.pow(xPos+pxD-width/2,2)+Math.pow(yPos+pxD-width/2,2))

        var w = 200;
        var s = 25;

        if (d > w) {
          d = w
        }


        //padding = Math.ceil((150-d)/150*2)

  			var c = tinycolor('#000')
        console.log(d)
        ///console.log(d/50, c.lighten(d/50).toString())

  			context.fillStyle=c.lighten(((w-d)/w)*100).toString();

  			context.save();

  			context.translate(xPos + ((w-d)/w)*random()*s,yPos + ((w-d)/w)*random()*s)
  			
        
        if (d < w) {
          context.rotate(Math.PI*2+((w-d)/w)*Math.PI*random())
        }

	  		context.fillRect(0-pxD/2+padding,0-pxD/2+padding,pxD-padding*2,pxD-padding*2)
	  		context.restore()

  		}
  	}

    context.restore();

  	context.fillStyle='#3C3C3B';
  	context.fillRect(0,0,width,20)
  	context.fillRect(0,0,20,height)
  	context.fillRect(0,width-20,height,20)
  	context.fillRect(width-20,0,20,height)

//}





  };
};

var cnvs = canvasSketch(sketch, settings);
setInterval(function () {
	cnvs.then(function (x) {x.render();})
}, 1000*60)


const canvasSketch = require('canvas-sketch');
const SimplexNoise = require('simplex-noise');
const Alea = require('alea');
var tinycolor = require("tinycolor2");

const settings = {
  dimensions:[ 500, 500 ],
  animate: false,
  pixelsPerInch: 10,
  units: 'in'
};

var rr = new Alea(24);

function random() {
	var simplex = new SimplexNoise(rr);
	var r = simplex.noise2D(6, .9);
	return Math.abs(r);
}


const sketch = () => {

  return ({ context, width, height, playhead }) => {


  	var MIN_DIMENTION = 60;

  	function split(x) {
  		var r = x - (MIN_DIMENTION * 2);
		var s = r * .1;//random();

		var l1 = r < 0 ? x/2 : MIN_DIMENTION + s;
		var l2 = r < 0 ? x/2 : MIN_DIMENTION + (r-s)

		return [l1,l2];
  	}

  	function divide(context, w, h, cols) {

  		context.fillStyle = cols[Math.floor(random()*cols.length)];


  		if((Math.floor(Math.min(w,h)-MIN_DIMENTION))/MIN_DIMENTION < .1) {
  			context.fillRect(5,5,w-10, h-10);
  			console.log(w,h,context.fillStyle);

  			context.fillStyle = '#042A2B';
  			context.beginPath();
		    context.moveTo(w-4, h-4);
		    context.lineTo(w-19, h-4);
		    context.lineTo(w-4, h-19);
		    context.fill();	
  			

  		} else {

  			if(random() < .5) {
  				var sp = split(w);

	  			divide(context, sp[0], h, cols)

	  			context.save();
				context.translate(sp[0],0);
	  			divide(context, sp[1], h, cols);
	  			context.restore();

  			} else {
  				var sp = split(h);

	  			divide(context, w, sp[0], cols)

	  			context.save();
				context.translate(0,sp[0]);
	  			divide(context, w, sp[1], cols);
	  			context.restore();

  			}
  		}
  	}


  	context.fillStyle = '#042A2B';
  	context.fillRect(0,0,width,height)

  	context.translate(10,10);
  	divide(context, width-20,height-20,['#EF7B45','#5EB1BF','#CDEDF6','#D84727'])


  };
};

var cnvs = canvasSketch(sketch, settings);
setInterval(function () {
	cnvs.then(function (x) {x.render();})
}, 1000*60)
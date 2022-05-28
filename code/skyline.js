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


	function getRand(old, f) {
		var r = f();

		while (Math.abs(old - r) < 10) {
			r = f();
		}
		return r;
	}


  	context.fillStyle='black';
  	context.fillRect(0,0,width,width);

	var grd = context.createLinearGradient(0, 500, 0, 0);
	grd.addColorStop(0, "red");
	grd.addColorStop(1, "white");

  	context.fillStyle=grd;
  	context.strokeStyle='black';

	var cx = 0;
	var base = width*2/3;
	var bWidth = 30;
	var offset = 0;	

	context.beginPath();
	context.moveTo(cx, offset);

	while(cx < width) {

		var t = random() > .1 && offset < 0 ? 5 : 0;

		if (t == 0) {
			
			if(offset < -20) {

				var a = Math.floor(Math.abs(random())*6)+4
				var b = a+Math.floor(Math.abs(random())*4)+2
				var c = b+Math.floor(Math.abs(random())*10)+15

				if(Math.abs(random()) < .5) {
					context.lineTo(cx-bWidth/2-2, base + offset);
					context.lineTo(cx-bWidth/2, base + offset - c);
					context.lineTo(cx-bWidth/2+2, base + offset);
					context.lineTo(cx, base + offset);

				} else {
					context.lineTo(cx-bWidth/2-a, base + offset);
					context.lineTo(cx-bWidth/2-a, base + offset -b);
					context.lineTo(cx-bWidth/2-2, base + offset -b);
					context.lineTo(cx-bWidth/2, base + offset -c);
					context.lineTo(cx-bWidth/2+2, base + offset -b);
					context.lineTo(cx-bWidth/2+a, base + offset -b);
					context.lineTo(cx-bWidth/2+a, base + offset);
					context.lineTo(cx, base + offset);	

				}

			} else if(offset < 0) {
				context.lineTo(cx-bWidth/2-4, base + offset);
				context.lineTo(cx-bWidth/2-4, base + offset -4);
				context.lineTo(cx-bWidth/2+4, base + offset -4);
				context.lineTo(cx-bWidth/2+4, base + offset);
				context.lineTo(cx, base + offset);	
			} else {
				context.lineTo(cx, base + offset);
			}


		} else {
			context.lineTo(cx, base + offset + t);
		}
		
		



		offset = getRand(offset, function () {return random()*50} );

		context.lineTo(cx, base + offset);

		cx += bWidth;

	}
	context.lineTo(width, 0);
	context.fill();



  	context.fillStyle='#3C3C3B';
  	context.fillRect(0,0,width,20)
  	context.fillRect(0,0,20,height)
  	context.fillRect(0,width-20,height,20)
  	context.fillRect(width-20,0,20,height)





  };
};

var cnvs = canvasSketch(sketch, settings);
setInterval(function () {
	cnvs.then(function (x) {x.render();})
}, 1000*60)


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


  	context.fillStyle='white';
  	context.fillRect(0,0,width,width)

	var cx = 0;
	var base = width*2/3;
	var bWidth = 30;
	var offset = 200;	




	var hitOut = false;

	for(var y = 1; y < 20; y++) {

		var target = y*(width/20);

		var yLoc = target;

		context.beginPath();
		context.moveTo(0, yLoc);

		var first = true;
		context.strokeStyle='#666';
		for ( var x = 0; x < width; x++) {


				console.log(x)
				console.log()

			if ( Math.sqrt(Math.pow((x-(width/2)),2) + Math.pow((target-(width/2)),2)) > 155) {
  				
  				if(!first) {
					context.stroke();
					context.lineWidth = 1;
		  			context.strokeStyle='#666';
					context.beginPath();
					context.moveTo(x, yLoc);
					first = true;
  				}

				context.lineTo(x, target);
				continue;
			}

			if(first) {
				context.stroke();
	  			context.strokeStyle='red';
	  			context.lineWidth = 2;
				context.beginPath();
				context.moveTo(x, yLoc);

			}

			first = false;

			yLoc += random()*(((width-target)/width)*10);



			if (Math.abs((yLoc-target)/target) > .01) {
				yLoc += yLoc > target ? -1 : 1
			}

			if (x - width) {
				yLoc += yLoc > target ? -1 : 1
			}

			context.lineTo(x, yLoc);	
		}

		context.stroke();
	}


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


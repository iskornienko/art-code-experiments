const canvasSketch = require('canvas-sketch');
const SimplexNoise = require('simplex-noise');
const Alea = require('alea');
var tinycolor = require("tinycolor2");

const settings = {
  dimensions:[ 500, 500 ],
  animate: false,
};

  	var random = new Alea();

  	var lineLength = 20;

const sketch = () => {

  return ({ context, width, height, playhead }) => {


    context.translate(width/2, 0);

    context.strokeStyle = 'black';
    var d = lineLength/Math.sqrt(2)

  	context.moveTo(0, 0);

  	var lx, ly;

  	for( var z = 0; z < 100; z++) {
  		var simplex = new SimplexNoise(random);
		var r = simplex.noise2D(6, .9);
		console.log(r)

		var x, y;

		if((Math.abs(r) < .33 && ly !=0) || (lx!=0 && ly!=0)) {
			if(r > 0) x = lineLength;
			else x = -1*lineLength;
			y = 0;

		} else if (Math.abs(r) < .66 && lx != lineLength*Math.cos(Math.PI*2/3)) {

			if(lx < 0) {
				x = lineLength*Math.cos(Math.PI*2/3)
				y = lineLength*Math.sin(Math.PI*2/3)
			} else {
				console.log('greater');
				x = lineLength*Math.cos(Math.PI*2/6)
				y = lineLength*Math.sin(Math.PI*2/6)

			}

		} else {
			console.log('other')
			if(lx < 0) {
				x = lineLength*Math.cos(Math.PI*2/3*2)
				y = lineLength*Math.sin(Math.PI*2/3*2)
			} else {
				console.log('greater');
				x = lineLength*Math.cos(Math.PI*2/6 * -1)
				y = lineLength*Math.sin(Math.PI*2/6 * -1)
			}
		}

		lx = x;
		ly = y;

		context.lineTo(x, y);
		context.translate(x, y);

  	}

	context.stroke()

  };
};

var cnvs = canvasSketch(sketch, settings);
setInterval(function () {
	cnvs.then(function (x) {x.render();})
}, 1000*60)
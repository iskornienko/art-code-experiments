const canvasSketch = require('canvas-sketch');
const SimplexNoise = require('simplex-noise');
const Alea = require('alea');
var tinycolor = require("tinycolor2");

const settings = {
  dimensions:[ 500, 500 ],
  animate: false,
};

  	var random = new Alea();

function random() {
	var simplex = new SimplexNoise(random);
	var r = simplex.noise2D(6, .9);
	return r;
}

const sketch = () => {

  return ({ context, width, height, playhead }) => {

  	var radLow = 100;
  	var radHigh = 200;

  	context.fillStyle = 'white';
  	context.fillRect(0, 0, width, height);

  	function drawPuf(context, radHigh, radLow, originX, originY, repeat, color , callback) {
  		context.strokeStyle = color;

  		while(repeat > 0) {
		  	var rad = radLow+random()*(radHigh-radLow);
		  	var ang = random() * Math.PI*2;

		  	var x = rad * Math.cos(ang);
			var y = rad * Math.sin(ang);

			context.save()
		    context.translate(originX,originY)

			context.beginPath();
			context.moveTo(0, 0);
			context.lineTo(x, y);
			context.closePath();
			context.stroke();

			context.restore()

			console.log('DRAW', repeat)

			callback(x,y);

			repeat --;
  		}

  	}

  	drawPuf(context, radHigh, radLow, width/2, height/2, 110, '#ffc100',
  		function (x,y) {
  			drawPuf(context, radHigh/10, radLow/10, width/2+x, height/2+y, 10,'black',
		  		function (x,y) {
		  			drawPuf(context, radHigh/10, radLow/10, width/2+x, height/2+y, 3,'#ffc100',
				  		function (x,y) {
				  			
				  	});
		  			
		  	});
  	});

  };
};

var cnvs = canvasSketch(sketch, settings);
setInterval(function () {
	cnvs.then(function (x) {x.render();})
}, 1000*60)
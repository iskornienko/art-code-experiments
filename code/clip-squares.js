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
	return Math.abs(r);
}


const sketch = () => {

  return ({ context, width, height, playhead }) => {



	var clr = ['#7dabda', '#e4c2d0', '#2c7c4c', '#648cac', '#b4ccce','#315741'];

	var numSquares = 5;
	var border = 20;


	context.lineWidth = 4;

	var squareWidth = (width-border*2)/numSquares;


	for ( var x =0; x < numSquares; x++) {



		for ( var y = 0; y < numSquares; y++) {

			context.save();

			context.translate(x*squareWidth+border,y*squareWidth+border)
			
			let region = new Path2D();
			//region.beginPath();
			region.rect(0,0,squareWidth,squareWidth);
			context.clip(region);

			context.fillStyle=clr[Math.floor(clr.length*random())];

			var z = Math.floor(random()*6)+1


			if(z == 1) {
				context.beginPath();
				context.arc(squareWidth/2, squareWidth/2, squareWidth/2, 0, Math.PI * 2, false);
				context.fill();

			} else if (z == 2) {
				context.beginPath();
				context.fillRect(0,0,squareWidth,squareWidth)

			} else if (z == 3) {

				context.save()
				context.translate(squareWidth/2,squareWidth/2)
				context.rotate(Math.PI)

				context.moveTo(0, 1-squareWidth/2);
				context.lineTo(1-squareWidth/2, squareWidth/2);
				context.lineTo(squareWidth/2, squareWidth/2);
				context.fill();

				context.restore();

			} else if (z == 4) {

				context.save()
				context.translate(squareWidth/2,squareWidth/2)
				context.rotate(Math.PI)

				context.moveTo(0, 1-squareWidth/2);
				context.lineTo(1-squareWidth/2, squareWidth/2);
				context.lineTo(squareWidth/2, squareWidth/2);
				context.fill();

				context.restore();

			} else if (z == 5) {

				context.save()
				context.translate(squareWidth/2,squareWidth/2)
				context.rotate(Math.PI/2)

				context.moveTo(0, 1-squareWidth/2);
				context.lineTo(1-squareWidth/2, squareWidth/2);
				context.lineTo(squareWidth/2, squareWidth/2);
				context.fill();

				context.restore();

			}



			context.restore();

		}


	}



	


  	context.fillStyle='#3C3C3B';
  	context.fillRect(0,0,width,border)
  	context.fillRect(0,0,border,height)
  	context.fillRect(0,width-border,height,border)
  	context.fillRect(width-border,0,border,height)

  };
};

var cnvs = canvasSketch(sketch, settings);
setInterval(function () {
	cnvs.then(function (x) {x.render();})
}, 1000*60)



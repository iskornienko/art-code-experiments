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


	var maxRadius = 350;
	var minRadius = 52;


	context.save();
	context.translate(width/2+random()*50,height/2+random()*50);



	context.fillStyle=tinycolor('rgb(157,215,233)').lighten(10).toString();
	context.beginPath();
	context.arc(1, 1, minRadius, 0, 2*Math.PI);
	context.fill();

	context.fillStyle=tinycolor('rgb(0,99,126)').lighten(12).toString();
	context.beginPath();
	context.arc(1, 1, minRadius*.7, 0, 2*Math.PI);
	context.fill();

	context.fillStyle=tinycolor('rgb(157,215,233)').lighten(0).toString();
	context.beginPath();
	context.arc(1, 1, minRadius*.5, 0, 2*Math.PI);
	context.fill();

	for ( var x = 0; x < 10000; x++) {
		var a = Math.abs(Math.random()) * 2*Math.PI;
		var d = Math.abs(Math.random()) * maxRadius;

		if(d < minRadius+5) {
			d = minRadius + Math.abs(Math.random())*5+5;
		}

		if(d*random() <1) {
			context.fillStyle = "rgb(231,204,75)"
			context.fillRect(d*Math.cos(a),d*Math.sin(a),2,2)

		}

	}

	context.restore()


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


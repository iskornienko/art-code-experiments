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
	var border = 20;
	context.strokeStyle = '#000';


	context.fillStyle = 'rgba(198,225,229,.3)';
	context.fillRect(0,0,width,width)


	context.save();
	context.translate(width/2, width);

	var rr = [];
	var dd = [];

	var b = 20
	var x = b;

	while (x < width) {

		var r = 2+random()*30;
		rr.push(r);

		dd.push(rr.reduce((partialSum, a) => partialSum + a, 0)*2+b-r);

		x += r;

	}

	//console.out(rr)
	//console.out(dd)

	//var rr = [20,40,10,6];
	//var dd = [40,100,150,166]



	for (var a = 0; a < dd.length; a++) {
		var lx = 0;
		var ly = 1-dd[a];

			var z = ['rgba(248,193,111,','rgba(247,106,86,'];

			var c = z[Math.floor(random()*z.length)];

		for(var theta = 0; theta <= Math.PI*2+.1; theta += .01) {

			x = dd[a] * Math.sin(theta);
			y = dd[a] * Math.cos(theta);
			var d  = Math.sqrt(Math.pow(Math.max(lx,x) - Math.min(lx,x),2)+Math.pow(Math.max(ly,y) - Math.min(ly,y),2))



			if (d > rr[a] * 2) {
				context.save();
				context.beginPath();
				context.fillStyle = c+(width-dd[a]+30)/width+')';
				context.arc(x, y, rr[a], 0, Math.PI*2, false);
				context.fill();
				context.closePath();
				context.restore();

				lx = x;
				ly = y;
			}
		}

	}


	context.restore();

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



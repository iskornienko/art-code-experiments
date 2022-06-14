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

  	context.save();


  	//context.moveTo(width/2, width/2*3)
  	//context.lineTo()

  	context.strokeStyle='#fff';
  	context.fillStyle = '#000'
  	context.lineWidth=4;


  	var clr = ['#5c7d72', '#a6d2c5', '#74ab9e', '#37776d'];

  	var r = 20;
  	var border = 20;

  	var a = 0;
  	for (var z = width- border; z > 0; z -= r) {

	  	context.save();

	  	if(a%2 ==0) {
	  		context.translate(0,z);
	  	} else {
	  		context.translate(1-r,z);
	  	}


	  	for(var x = 0; x < width/r; x++) {
	  		context.beginPath();
	  		context.fillStyle = tinycolor(clr[Math.floor(random()*clr.length)]).lighten(5).toString()
	  		context.arc(x*r*2,0, r, 2 * Math.PI, false);
	  		context.stroke()
	  		context.fill()
	  	}

	  	context.restore();
	  	a++;
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



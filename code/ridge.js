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
  	context.fillStyle = '#84b9e4'
  	context.fillRect(0,0,width,height)

  	context.strokeStyle='#000';
  	var border = 20;

  	var x = width/2;
  	var y = border*2;
  	var df;

  	context.save();

  	while (y < width) {

	  	dy = border+random()*border*8;

	  	nx = x-dy+dy*2*random();
	  	ny = y+dy;

	  	//context.moveTo(nx, ny)
	  	//context.lineTo(x,y)
	  	//context.stroke();

	  	context.fillStyle = "#eee"
	  	context.beginPath()
	  	context.moveTo(x-500, y+500)
	  	context.lineTo(nx-500, ny+500)
	  	context.lineTo(nx,ny)
	  	context.lineTo(x,y)
	  	context.lineTo(x-500, y+500)
	  	context.closePath();
	  	context.fill();
	  	context.stroke();

	  	context.fillStyle = "#fff"
	  	context.beginPath()
	  	context.moveTo(x+500, y+500)
	  	context.lineTo(nx+500, ny+500)
	  	context.lineTo(nx,ny)
	  	context.lineTo(x,y)
	  	context.lineTo(x+500, y+500)
	  	context.closePath();
	  	context.fill();
	  	context.stroke();

	  	x = nx
	  	y = ny

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



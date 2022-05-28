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
	return Math.abs(r);
}


const sketch = () => {

  return ({ context, width, height, playhead }) => {

	var clr = ['#7dabda', '#e4c2d0', '#2c7c4c', '#648cac', '#b4ccce','#315741'];

	function drawEye(x,y,h,w) {

		var margin = h/8;

		context.save();
		context.translate(x+margin,y+margin)

		context.fillStyle='#fff'
		context.beginPath();
		context.rect(0,0,h-margin*2,w-margin*2);
		context.fill();
		context.stroke();

		context.save();

		var r = margin+margin*.7 //+ random()*margin*2;
		var c = margin+margin*.7 //+ random()*margin*2;

		context.translate(r,c)

		context.fillStyle=clr[Math.floor(clr.length*random())]
		context.beginPath();
		context.rect(0,0,h-margin*5.5,w-margin*5.5);
		context.fill();
		context.stroke();

		context.fillStyle='#000'
		context.beginPath();
		context.rect(margin-margin/4,margin-margin/4,margin,margin);
		context.fill();


		context.restore();

		context.restore();

	}

	
	

	var initSize = 180;

	context.fillStyle = '#E0AC69'
	context.strokeStyle = '#000';
	context.lineWidth = 2;

	context.beginPath();
	context.rect(0,0,width,height);
	context.fill();


	context.save();

	context.translate(width/2, width/2)

	drawEye(1-initSize/2, 1-initSize/2, initSize, initSize);

	initSize = initSize/2

	context.save()
	context.translate(1-initSize*2, 1-initSize*2)
	for(var x = 0; x < 4; x++) {
		drawEye(0,x*initSize, initSize, initSize);
		drawEye(x*initSize,0, initSize, initSize);

		drawEye(3*initSize,x*initSize, initSize, initSize);
		drawEye(x*initSize,3*initSize, initSize, initSize);
	}
	context.restore()

	initSize = initSize/2

	context.save()
	context.translate(1-initSize*5, 1-initSize*5)
	for(var x = 0; x < 10; x++) {
		drawEye(0,x*initSize, initSize, initSize);
		drawEye(x*initSize,0, initSize, initSize);

		drawEye(9*initSize,x*initSize, initSize, initSize);
		drawEye(x*initSize,9*initSize, initSize, initSize);
	}
	context.restore()




	context.restore();

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



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


	function drawLeaf() {
		context.beginPath();
		context.moveTo(0,0);
		context.lineTo(0,220);
		context.stroke();

		for (x = 0; x < 22; x ++) {
			context.save();
			context.translate(0, x*10);

			var len = 100-x*4-random()*8//leafMaxLen*(((30+random()*2)-x)/30);

			context.beginPath();
			context.moveTo(0,0);
			context.lineTo(Math.sin(leafAngle)*len,Math.cos(leafAngle)*len);
			context.stroke();

			context.beginPath();
			context.moveTo(0,0);
			context.lineTo(-1*Math.sin(leafAngle)*len,Math.cos(leafAngle)*len);
			context.stroke();

			context.restore();
		}

	}	

	var leafAngle = Math.PI/8;
	var leafMaxLen = 40;

	context.fillStyle = 'white'

	context.beginPath();
	context.rect(0,0,width,height);
	context.fill();

	context.save();
	context.translate(width/2, width/2);

	for(var i = 0; i < 15; i++) {

		console.log('hi',i)
		context.save();

		var ang = Math.PI*2*Math.random()//(15 * Math.PI / 180)+random()*(300 * Math.PI / 180);

		if(ang > (90 * Math.PI / 180) && ang < (270 * Math.PI / 180)) 
			context.strokeStyle = '#7cb06d';
		 else 
			context.strokeStyle = '#eed88b';

		context.rotate(ang)
		drawLeaf();

		context.restore()

	}
	
	context.rotate(ang)
	drawLeaf();


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



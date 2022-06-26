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

	

	context.fillStyle = 'white'
	context.strokeStyle = '#000';
	context.lineWidth = 2;

	context.fillRect(0, 0, width, width)

	context.save()

	var space = 40;

	var b = [0,9];

	for(var x = 0; x < width/space; x++) {
		for (var y =0; y < width/space; y++) {

			var d = Math.sqrt(Math.pow(x-0,2) + Math.pow(y-0,2));

			console.log(d)
			if(d > b[0] && d < b[1])
				context.fillStyle = ['#c2d2da','#7cb6d1'][Math.floor(random()*2)]
			else
				context.fillStyle = ['#4a624c','#36503b','#0f2c11'][Math.floor(random()*3)]

			context.save();
			context.translate(x*space,y*space);

			context.beginPath()	
			context.moveTo(0,0);
			context.lineTo(space/3, space/6);
			context.lineTo(space/2, space/2);
			context.lineTo(space/6, space/3);
			context.lineTo(0,0);
			context.fill();

			context.restore();
		}
	}

	//var a = Math.floor(1+random()*10);
	//var b = Math.floor(1+random()*10);

	for(var x = 0; x < width/space; x++) {
		for (var y =0; y < width/space; y++) {

			var d = Math.sqrt(Math.pow(x-0,2) + Math.pow(y-0,2));

			console.log(d)
			if(d > b[0] && d < b[1])
				context.fillStyle = ['#c2d2da','#7cb6d1'][Math.floor(random()*2)]
			else
				context.fillStyle = ['#4a624c','#36503b','#0f2c11'][Math.floor(random()*3)]

			context.save();
			context.translate(x*space-space/2,y*space-space/20);

			context.beginPath()	
			context.moveTo(0,0);
			context.lineTo(space/3, 1-space/6);
			context.lineTo(space/2, 1-space/2);
			context.lineTo(space/6, 1-space/3);
			context.lineTo(0,0);
			context.fill();

			context.restore();
		}
	}



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



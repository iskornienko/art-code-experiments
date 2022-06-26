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

var minD = 4;



function recDraw(context, sX, sY, tW, tH) {

	if(tW < minD || tH < minD) 
		return;

	var w = Math.max(minD,tW*random())
	var h = Math.max(minD,tH*random())

	

	console.log(0, 0, w, h,context.fillStyle)

	if(Math.abs(w-h)/w < .001 && Math.abs(w-h)/h <.001) {
		var clrs = ['#BDBF09', '#D96C06'];
		context.fillStyle = clrs[Math.floor(clrs.length*random())];
		context.beginPath()
		context.arc(sX+w/2,sY+h/2, h/2*.9,0,Math.PI*2)
		context.fill()

	}
	else {
		var clrs = ['#2292A4','#0F0A0A'];
		context.fillStyle = clrs[Math.floor(clrs.length*random())];
		context.fillRect(sX+2,sY+2, w-4, h-4);	
	}

	//ADD circle if it's almost a square 

	if(Math.random() > 0.5) {
		recDraw(context, sX+w, sY+0, tW-w, tH);
		recDraw(context, sX+0, sY+h, w, tH-h);
	} else {		
		recDraw(context, sX+w, sY+0, tW-w, h);
		recDraw(context, sX+0, sY+h, tW, tH-h);
	}

	return;
}


const sketch = () => {

  return ({ context, width, height, playhead }) => {


	context.fillStyle = '#F5EFED'
	context.strokeStyle = '#000';
	context.lineWidth = 2;

	context.fillRect(0, 0, width, width)

	context.save()


	var sX = 20;
	var sY = 20;

	var tW = width-40;
	var tH = width-40;

	recDraw(context, sX, sY, tW, tH);

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



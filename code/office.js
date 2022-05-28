const canvasSketch = require('canvas-sketch');
const SimplexNoise = require('simplex-noise');
const Alea = require('alea');
var tinycolor = require("tinycolor2");

const settings = {
  dimensions:[ 500, 500 ],
  animate: false,
};

  	var random = new Alea(35);

function random() {
	var simplex = new SimplexNoise(random);
	var r = simplex.noise2D(6, .9);
	return r;
}

function roundRect(ctx, x, y, width, height, radius, fill, stroke) {
  if (typeof stroke === 'undefined') {
    stroke = true;
  }
  if (typeof radius === 'undefined') {
    radius = 5;
  }
  if (typeof radius === 'number') {
    radius = {tl: radius, tr: radius, br: radius, bl: radius};
  } else {
    var defaultRadius = {tl: 0, tr: 0, br: 0, bl: 0};
    for (var side in defaultRadius) {
      radius[side] = radius[side] || defaultRadius[side];
    }
  }
  ctx.beginPath();
  ctx.moveTo(x + radius.tl, y);
  ctx.lineTo(x + width - radius.tr, y);
  ctx.quadraticCurveTo(x + width, y, x + width, y + radius.tr);
  ctx.lineTo(x + width, y + height - radius.br);
  ctx.quadraticCurveTo(x + width, y + height, x + width - radius.br, y + height);
  ctx.lineTo(x + radius.bl, y + height);
  ctx.quadraticCurveTo(x, y + height, x, y + height - radius.bl);
  ctx.lineTo(x, y + radius.tl);
  ctx.quadraticCurveTo(x, y, x + radius.tl, y);
  ctx.closePath();
  if (fill) {
    ctx.fill();
  }
  if (stroke) {
    ctx.stroke();
  }

}

const sketch = () => {

  return ({ context, width, height, playhead }) => {

  	var margin = 20;
  	var chairRadius = 10;

  	function drawChair(context, chairX, chairY, rotation) {

  		var cols = [ '#EE4266', '#3BCEAC', '#0EAD69'];

  		var tFill = '#333';
  		var bFill = '#888';

  		if(random() < .1) {
  			var c = cols[Math.floor(cols.length*random())];
  			rotation = Math.PI/8;
  			tFill = tinycolor(c).darken(10).toString();;
  			bFill = tinycolor(c).lighten(10).toString();
  		}

		context.save();

		context.translate(chairX,chairY)

	  	context.rotate(rotation);

	  	context.fillStyle = bFill;
	  	context.beginPath();
		context.arc(0, 0, chairRadius, 0, 2 * Math.PI);
		context.fill();

		context.fillStyle = tFill;
		context.beginPath();
		context.ellipse(0 , 0 - chairRadius*(1.3), chairRadius/3, chairRadius, Math.PI / 2, 0, 2 * Math.PI);
		context.fill();

		context.fillStyle = tFill;
		context.beginPath();
		context.ellipse(0 - chairRadius*(1), 0 , chairRadius/4, chairRadius/2, Math.PI, 0, 2 * Math.PI);
		context.fill();


		context.fillStyle = tFill;
		context.beginPath();
		context.ellipse(0 + chairRadius*(1), 0 , chairRadius/4, chairRadius/2, Math.PI, 0, 2 * Math.PI);
		context.fill();

		context.restore();

  	}

  	function drawTable(tableX, tableY, tableW, tableH) {
  		context.fillStyle = '#999';
	  	roundRect(context, tableX, tableY, tableW, tableH, 4, 'blue', false)

	  	var chairX = 100;
	  	var chairY = 50;
	  	var rotation = Math.PI / 2;

	  	var chairSpace = chairRadius*4;

	  	//top
	  	for(var x = 0; x < Math.floor(tableW/chairSpace); x++) {
	  		drawChair(context, tableX + x*chairSpace+chairSpace/2, tableY-chairSpace/2.5, 0)
	  	}

	  	//bottom
	  	for(var x = 0; x < Math.floor(tableW/chairSpace); x++) {
	  		drawChair(context, tableX + x*chairSpace+chairSpace/2, tableY+tableH+chairSpace/2.5, Math.PI)
	  	}

	  	//left
	  	for(var x = 0; x < Math.floor(tableH/chairSpace); x++) {
	  		drawChair(context,tableX-chairSpace/2.5 , tableY + x*chairSpace+chairSpace/2, Math.PI/2*3)
	  	}

	  	//right
	  	for(var x = 0; x < Math.floor(tableH/chairSpace); x++) {
	  		drawChair(context,tableX+tableW+chairSpace/2.5 , tableY + x*chairSpace+chairSpace/2, Math.PI/2)
	  	}

  	}

  	drawTable(50, 50, 80, 400)

  	drawTable(240, 50, 200, 80)

  	drawTable(240, 210, 200, 80)
  	
  	drawTable(240, 370, 200, 80)

  };
};

var cnvs = canvasSketch(sketch, settings);
setInterval(function () {
	cnvs.then(function (x) {x.render();})
}, 1000*60)
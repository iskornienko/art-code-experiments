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

	function line_intersect(x1, y1, x2, y2, x3, y3, x4, y4)
	{
	    var ua, ub, denom = (y4 - y3)*(x2 - x1) - (x4 - x3)*(y2 - y1);
	    if (denom == 0) {
	        return null;
	    }
	    ua = ((x4 - x3)*(y1 - y3) - (y4 - y3)*(x1 - x3))/denom;
	    ub = ((x2 - x1)*(y1 - y3) - (y2 - y1)*(x1 - x3))/denom;
	    return {
	        x: x1 + ua * (x2 - x1),
	        y: y1 + ua * (y2 - y1),
	        seg1: ua >= 0 && ua <= 1,
	        seg2: ub >= 0 && ub <= 1
	    };
	}

	function drawCrossStitch(lp, rightPole, leftPole) {
		var np;

		var x = 0;
		while (true) {
			console.log(lp.y,ht)

			var inL = x % 2 == 0 ? rightPole : leftPole;
			var inT = x % 2 == 0 ? [[lp.x,lp.y], [lp.x+bW, lp.y-bW]] : [[lp.x,lp.y], [lp.x-bW, lp.y-bW]];

			np = line_intersect(inL[0][0], inL[0][1], inL[1][0], inL[1][1], inT[0][0], inT[0][1], inT[1][0], inT[1][1])

			if(Math.abs(np.y) > ht)
				break;

			context.beginPath();
			context.moveTo(lp.x,lp.y);
			context.lineTo(np.x,np.y);
			context.stroke();

			lp = np;
			x = x+1;
		}
	}

	//fillStyle= '#ffffff';
	//context.fillRect(0,0,width,height);


  	var cut = height - height/3;

	var grd = context.createLinearGradient(0, cut, 0, 0);
	grd.addColorStop(0, "rgb(255,173, 34)"); 
	grd.addColorStop(1, "rgb(0,144,243)");

  	context.fillStyle=grd;

  	context.fillRect(0,0,width,height);


  	context.fillStyle = '#000';

	for(var z = 0; z < 5; z++) {
		context.save();
		context.translate(60+90*z,cut)

		var ht = 60 + Math.random()*160;
		var bW = 20;
		var tW = bW-bW*Math.random();
		var crossHeight = 2;

		var leftPole = [[0,0], [bW/2-tW/2,1-ht]];
		var rightPole = [[bW,0], [bW/2+tW/2,1-ht]];

		context.lineWidth = 2;

		context.beginPath();
		context.moveTo(leftPole[0][0],leftPole[0][1]);
		context.lineTo(leftPole[1][0],leftPole[1][1]);
		context.stroke();

		context.beginPath();
		context.moveTo(rightPole[0][0],rightPole[0][1]);
		context.lineTo(rightPole[1][0],rightPole[1][1]);
		context.stroke();

		context.beginPath();
		context.moveTo(leftPole[1][0],leftPole[1][1]);
		context.lineTo(rightPole[1][0],rightPole[1][1]);
		context.stroke();

		context.lineWidth = 1;
		drawCrossStitch({x: 0, y:0}, rightPole, leftPole)
		drawCrossStitch({x: rightPole[0][0], y:rightPole[0][1]}, rightPole, leftPole)


		var posi = .6+Math.random()*.3;
		var armLength = bW*.5+Math.random()*bW;

		var li = line_intersect(0, 1-ht*posi, bW, 1-ht*posi, leftPole[0][0],leftPole[0][1], leftPole[1][0],leftPole[1][1])

		context.beginPath();
		context.moveTo(li.x,li.y);
		context.lineTo(li.x-armLength,li.y);
		context.stroke();

		if (Math.random() < .5) {
			context.arc(li.x-bW,li.y, bW/3, 0, 2 * Math.PI, false);
		    context.fill()

		} else {
		    var rW = bW/3;
		    var rL = bW;
		    context.fillRect(li.x-armLength-rW, li.y-rL/2, rW, rL);
		}


		posi = .6+Math.random()*.3;
		armLength = bW*.5+Math.random()*bW;

		var li = line_intersect(0, 1-ht*posi, bW, 1-ht*posi, rightPole[0][0],rightPole[0][1], rightPole[1][0],rightPole[1][1])

		context.beginPath();
		context.moveTo(li.x,li.y);
		context.lineTo(li.x+armLength,li.y);
		context.stroke();

		if (Math.random() < .5) {
			context.arc(li.x+bW,li.y, bW/3, 0, 2 * Math.PI, false);
		    context.fill()

		} else {
		    var rW = bW/3;
		    var rL = bW;
		    context.fillRect(li.x+armLength-rW, li.y-rL/2, rW, rL);
		}


		context.restore();

	}

	context.fillRect(0,cut,width,height)

	

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



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


  	/*

  	var radLow = 100;
  	var radHigh = 200;

  	context.fillStyle = 'white';
  	context.fillRect(0, 0, width, height);

  	function drawPuf(context, radHigh, radLow, originX, originY, repeat, color , callback) {
  		context.strokeStyle = color;

  		while(repeat > 0) {
		  	var rad = radLow+random()*(radHigh-radLow);
		  	var ang = random() * Math.PI*2;

		  	var x = rad * Math.cos(ang);
			var y = rad * Math.sin(ang);

			context.save()
		    context.translate(originX,originY)

			context.beginPath();
			context.moveTo(0, 0);
			context.lineTo(x, y);
			context.closePath();
			context.stroke();

			context.restore()

			console.log('DRAW', repeat)

			callback(x,y);

			repeat --;
  		}

  	}

  	drawPuf(context, radHigh, radLow, width/2, height/2, 110, 'black',
  		function (x,y) {
  			drawPuf(context, radHigh/10, radLow/10, width/2+x, height/2+y, 10,'black',
		  		function (x,y) {
		  			drawPuf(context, radHigh/10, radLow/10, width/2+x, height/2+y, 3,'#ffc100',
				  		function (x,y) {
				  			
				  	});
		  			
		  	});
  	});
  	*/

  	function drawMount(h,l,variance,peakVar) {
  		context.beginPath();
	  	context.moveTo(0,100);
	  	context.lineTo(0, 0);
	  	for(var x = 0; x < 50; x++) {

	  		var v = -1*h+variance*random()*h;

			
			if(x % 2 == 0 && x !=0) {

				var p1 = [(x-1)*l, 0];
				var p2 = [x*l, v];
				var p3 = [(x+1)*l, 0];

				var u = math.divide(math.subtract(p1,p2),math.norm(math.subtract(p1,p2)))
				var np = math.add(p2,math.multiply(10+peakVar*Math.abs(random()),u))

				var u2 = math.divide(math.subtract(p3,p2),math.norm(math.subtract(p3,p2)))
				var np2 = math.add(p2,math.multiply(10+peakVar*Math.abs(random()),u2))

				context.lineTo(np[0], np[1]);
				context.lineTo(p2[0], p2[1]+10+peakVar*Math.abs(random()));
				context.lineTo(np2[0], np2[1]);


			} else {
				context.lineTo(x*l, (x % 2 == 0 ? v : 0));

			}



	  	}

		context.closePath();
		context.fill();
		context.stroke();

  	}

  	context.fillStyle='white';//'white';
  	context.strokeStyle='white';
  	context.fillRect(0,0,width,height);


	context.fillStyle='grey';
  	var h = 150;
  	var l = 150;
  	var variance = .3;
  	var peakVar = 30;

  	var c = ['#97F9F9', '#A4DEF9', '#C1E0F7', '#CFBAE1', '#C59FC9'];
  	c = ['#F2F6D0',
  	'#D0E1D4',
  	'#D9D2B6',
  	'#E4BE9E',
  	'#71697A'
  	]


  	for(var x = 9; x < 25; x++ ){
	  	context.save();
	  	var offset = (x %2 ? -1*l : 0)+Math.abs(random())*-1*100;
	  	context.translate(offset,x*25)

	  	z = (14-x)/20*100;
	  	z = z < 0 ? 0 : z

	  	context.fillStyle=
	  		tinycolor(c[Math.floor(Math.abs(random())*c.length)]).lighten(z).toString();

	  	drawMount(h-(x-9)*.04*h,l-(x-9)*.02*l,variance,peakVar)

		context.restore();

  	}

  	'#63D471',
  	'#63A46C',
  	'#6A7152',
  	'#233329'



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


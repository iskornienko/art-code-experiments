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



	var clr = ['#7dabda', '#e4c2d0', '#2c7c4c', '#648cac', '#b4ccce','#315741'];

	var numSquares = 20;
	var border = 20;


	context.lineWidth = 2;

	circleRad = 5;
	squareSize = 5;

	var squareWidth = (width-border*2)/numSquares;
	
	var hInt = random()*squareWidth;
	var vInt = random()*squareWidth;


	var squarz = [];

	for ( var x =0; x < numSquares; x++) {



		for ( var y = 0; y < numSquares; y++) {
			
			var xP = random()*squareWidth;
			var yP = random()*squareWidth;

			var offX = x*squareWidth+20
			var offY = y*squareWidth+20

			context.save();
			context.translate(offY,offX)
			

			//context.fillStyle=clr[Math.floor(clr.length*random())]
			//context.fillRect(0,0,squareWidth,squareWidth)


			color = clr[Math.floor(clr.length*random())]


			context.fillStyle = color
			context.strokeStyle = tinycolor(color).lighten(10).toString();



			context.beginPath();
			context.moveTo(vInt,0);
			context.lineTo(xP,yP);
			context.stroke();

			context.beginPath();
			context.moveTo(xP,yP);
			context.lineTo(vInt,squareWidth);
			context.stroke();

			context.beginPath();
			context.moveTo(0,hInt);
			context.lineTo(xP,yP);
			context.stroke();

			context.beginPath();
			context.moveTo(xP,yP);
			context.lineTo(squareWidth,hInt);
			context.stroke();


			context.beginPath();
			context.arc(xP,yP,circleRad,0,Math.PI*2)
			context.fill()

			squarz.push([offX+vInt, offY+0])
			squarz.push([offX+squareWidth, offY+hInt])

			context.restore();

		}


	}

	for (var x= 0; x < squarz.length; x++) {

		d = Math.sqrt(Math.pow(width/2-squarz[x][0]-squareSize/2,2)+Math.pow(width/2-squarz[x][1]-squareSize/2,2))

		context.fillStyle = tinycolor('#000').lighten(250*d/width/2).toString();

		context.fillRect(squarz[x][0]-squareSize/2, squarz[x][1]-squareSize/2, squareSize, squareSize)
	}
	*/

	function drawLilly(context, r1,r2,bh) {
		//bottom
		context.fillStyle = '#4AB54E'
		context.beginPath()
		context.ellipse(0, 0, r1, r2, 0, 0, Math.PI*2)
		context.fill();

		
		//back
		context.fillStyle = '#30843E'
		context.beginPath()
		context.ellipse(0, 0, r1, r2, 0, Math.PI,0, false)
		context.lineTo(r1,0-bh)
		context.ellipse(0, 0-bh, r1, r2, 0, 0, Math.PI, true)
		context.closePath();
		context.fill(); 

		//front 
		context.fillStyle = '#EFB0A1'
		context.beginPath()
		context.ellipse(0, 0, r1, r2, 0, Math.PI,0, true)
		context.lineTo(r1,0-bh)
		context.ellipse(0, 0-bh, r1, r2, 0, 0, Math.PI, false)
		context.closePath();
		context.fill();

	}

	function dT(context, w, h) {
		context.beginPath();
		context.moveTo(0,0-h/2)
		context.lineTo(w/2,0-h/2+w/2)
		context.lineTo(w/2,0+h/2-w/2)
		context.lineTo(0,0+h/2)
		context.lineTo(0-w/2,0+h/2-w/2)
		context.lineTo(0-w/2,0-h/2+w/2)
		context.closePath();

		if(random() > 1) {
			context.fillStyle = 'rgba(32, 45, 21,.2)'
			context.fill()
		} else {
			context.lineWidth = 10*Math.abs(random())
			if (context.lineWidth <= 1) context.lineWidth = 1;
			context.stroke()
		}
	}

	var border = 20;


	context.fillStyle = 'white'
	context.fillRect(0,0,width,width)

	context.save()
	context.translate(width/2, width/2)

	var w = 20;
	var h = 80;
	
	
	var c = ['rgb(188,11,45)','rgb(0,38,99)']

	w = 40 + random()*30; 
	h = 60 + random()*30;

	for(var x = 0; x < 50; x++) {

		wD = 1 + (.8) * x + random()*.9;
		hD = 1 + (.3) * x + random()*.9;

		context.strokeStyle = tinycolor(c[Math.floor(c.length*Math.abs(random()))]).lighten(x/35*100).toString();
		console.log(context.strokeStyle)

		dT(context,w * wD,h * hD)
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



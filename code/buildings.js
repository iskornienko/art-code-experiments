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

    var border = 20

  	context.save();


  	//context.moveTo(width/2, width/2*3)
  	//context.lineTo()
  	context.fillStyle = '#5c54a4'
  	context.fillRect(0,0,width,height)

  	context.strokeStyle='red';
  	context.fillStyle = '#aaa'

    function drawBuilding(v) {
      var h = border+Math.random()*(width-border*2);
      var w = 90+v/3

      var g = 30+v/6

      //console.log(v/height*100)
      context.fillStyle = tinycolor('#000').lighten(Math.min(80-v/height*100,30)).toString();
      context.beginPath();
      context.rect(h,v,w,height)
      context.fill();


      var wndws = 3+Math.floor(random()*5)

      for (var x = 0; x < height/g; x++) {

        context.save();

        context.translate(h+g/3,v+x*g+g/3);

        var bw = w-g/3*2;
        var bh = g/3*2;

        context.beginPath();

        var clw = ['#fddfdf', '#fcf7de', '#f0defd']

        for (var y = 0; y < wndws; y++) {
          context.fillStyle = clw[Math.floor(random()*clw.length)]
          context.beginPath();
          context.rect(y*bw/wndws+bw/40,0,bw/wndws-bw/20,bh)
          context.fill();

        }


        context.restore();
        
      }
    }

    //for (var x = 30; x < height; x+=70) {
      drawBuilding(30)
      drawBuilding(170)
      drawBuilding(300)
    //}


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



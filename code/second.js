const canvasSketch = require('canvas-sketch');
const SimplexNoise = require('simplex-noise');
const Alea = require('alea');
var tinycolor = require("tinycolor2");

const settings = {
  dimensions:[ 500, 500 ],
  animate: false,
};

  	var random = new Alea();

  	var lineLength = 20;

const sketch = () => {

  return ({ context, width, height, playhead }) => {
var tikiCol = [
  'rgb(172,180,188)',
  'rgb(133,134,130)',
  'rgb(112,107,107)',
  'rgb(129,126,123)',
  'rgb(155,145,125)'];
  
  context.fillStyle = tikiCol[0];
  context.fillRect(0, 0, height, height);

  var tikiWidth = 5;
  var tikiLength = 50;

  var grd = context.createLinearGradient(0,height, 0, 0);
  grd.addColorStop(1, "rgb(56,128,172)");
  grd.addColorStop(0, "rgb(34,130,130)");
  
  context.fillStyle = grd;
  context.fillRect(height/2,height/2, height/2, height/2);

  var grd1 = context.createLinearGradient(height/2,0, height/2, height/2);
  grd1.addColorStop(1, "rgb(115,210,246)");
  grd1.addColorStop(0, "rgb(49,150,239)");
  
  context.fillStyle = grd1;
  context.fillRect(height/2,0, height/2, height/2)
 

  for (var z = 0; z < height*2; z+=tikiLength/3 ){

    var ty = height - z;
    
    for (var x = -1; x < height/2/tikiWidth+1; x++) {
      context.save()
      context.translate(x*tikiWidth,ty)
      var a = 13 - Math.random()*26;
      var l = 5 - Math.random()*10;
      var c = tikiCol[Math.floor(Math.random()*tikiCol.length)];
      
      context.rotate(a * Math.PI / 180);
      context.fillStyle = c;
      context.fillRect(tikiWidth/2, 0, tikiWidth, tikiLength+l)
      context.restore()
    }
  }

  for (let index = 0; index < height/4; index+=10) {
    context.fillStyle = "rgb(255,255,255,"+Math.random()+")";
    context.beginPath();

    var r = 10-Math.random()*20
    var h = 10-Math.random()*20

    context.arc(height/3*2+index, height/4+h, 20+r, 0, 2 * Math.PI);
    context.fill();
  }


  };
};

var cnvs = canvasSketch(sketch, settings);
setInterval(function () {
	cnvs.then(function (x) {x.render();})
}, 1000*60)
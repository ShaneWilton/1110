var clamp = function(x, min, max) {
  return x>min?(x<max?x:max):min;
};

var ctx = $('canvas')[0].getContext("2d");
var name = "1n1w";
var url = 'http://imgs.xkcd.com/clickdrag/'+name+'.png';
var images = {};
images[name] = $('<img src="' + url + '" />');

var avatar = $('<img src="avatar01.png" />');

var x = 0;
var y = -800;

var pulling = false;
var mousepull = {x:0, y:0};

var draw = function() {
  ctx.drawImage(images[name][0],x,y);
  ctx.save();
  ctx.translate(325,325);
  ctx.rotate(-mousepull.x/500);
  ctx.translate(-13,-8);
  ctx.drawImage(avatar[0],0,0);
  ctx.restore();
};

// initial draw
images['1n1w'].load(draw);
avatar.load(draw);

var pull = function() {
  if(pulling) {
    x += clamp(mousepull.x / 20, -5, 5);
    y += clamp(mousepull.y / 20, -5, 5);
    draw();
    setTimeout(pull, 20);
  }
};

$('canvas').mousedown(function(e){
  pulling = true;
  mousepull = {x: 350-e.clientX, y: 350-e.clientY};
  pull();
}).mousemove(function(e){
  if(pulling) {
    mousepull = {x: 350-e.clientX, y: 350-e.clientY};
  }
});
$('body').mouseup(function(e){
  pulling = false;
  mousepull = {x:0, y:0};
});

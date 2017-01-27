function SunCircle(s) {
  this.x = 0;
  this.y = s.canvas.height/2;
  this.fill = 'red';
  this.radius = 50;
  this.xVel = 1;
  this.yVel = -1;
}

function Car(s) {
  this.width = 40;
  this.height = 50;
  this.wheelRadius = 5;
  this.x = 0;
  this.y = s.canvas.height/2 -this.height;
  this.fill = 'green';
  this.xVel = 1;
  this.yVel = 0;
}

function Building(s) {
  this.floor = s.canvas.width/2;
	this.x0 = Math.random()*s.canvas.width
	this.width = (windowWidth+windowSpacing) * Math.floor(Math.random()*10)
	this.height = Math.random()*s.canvas.height/2
  this.y0 = this.floor - this.height
	this.fill= blgColors[ Math.floor(Math.random()*blgColors.length)]
}

SunCircle.prototype.update = function(canvas) {

  this.x += this.xVel;
  this.y += this.yVel;

  if (this.x > canvas.width) {
    this.xVel = -1;
  } else if (this.x < 0) {
    this.xVel = 1;
  }
    if (this.y > canvas.height/2) {
    this.yVel = -1;
  } else if (this.y < 0) {
    this.yVel = 1;
  }
}

Car.prototype.update = function(canvas) {

  this.x += this.xVel;
  this.y += this.yVel;
  if (this.x > canvas.width) {
    this.x = 0;
  }
}
// Draws this sun to a given context
SunCircle.prototype.draw = function(ctx, canvas) {
  ctx.fillStyle = this.fill;
  // ctx.fillRect(this.x, this.y, this.radius, this.radius)
  ctx.beginPath();
  ctx.arc(this.x, this.y, this.radius, 0, 2 * Math.PI);
  ctx.fill();

}

// Draws this car to a given context
Car.prototype.draw = function(ctx, canvas) {
  ctx.fillStyle = this.fill;
  ctx.fillRect(this.x, this.y, this.width, this.height)
  ctx.fillStyle = 'yellow';
  ctx.beginPath();
  ctx.arc(this.x + this.width/4, this.y + this.height, this.wheelRadius, 0, 2 * Math.PI);
  ctx.fill();
  ctx.beginPath();
  ctx.arc(this.x + 3 * this.width/4, this.y + this.height, this.wheelRadius, 0, 2 * Math.PI);
  ctx.fill();
  ctx.fillStyle = 'red';
  ctx.fillRect(this.x + 3 * this.width/4, this.y + this.height / 4, this.width/7, this.height/3);
}

// Draws this building to a given context
Building.prototype.draw = function(ctx, canvas) {
  ctx.fillStyle = this.fill;
  ctx.fillRect(this.x0, this.floor - this.height, this.width, this.height)
  for (var y = this.floor - floorSpacing; y > this.floor - this.height; y -= floorSpacing + windowHeight) {
   for (var x = windowSpacing; x < this.width - windowWidth; x += windowSpacing + windowWidth) {
     ctx.fillStyle=litColors[ Math.floor(Math.random()*litColors.length)]
     ctx.fillRect(this.x0 + x, y - windowHeight, windowWidth, windowHeight)
   }
  }
}


function CanvasState(canvas) {
  this.canvas = canvas;
  this.width = canvas.width;
  this.height = canvas.height;
  this.ctx = canvas.getContext('2d');
  // This complicates things a little but but fixes mouse co-ordinate problems
  // when there's a border or padding. See getMouse for more detail
  var stylePaddingLeft, stylePaddingTop, styleBorderLeft, styleBorderTop;
  if (document.defaultView && document.defaultView.getComputedStyle) {
    this.stylePaddingLeft = parseInt(document.defaultView.getComputedStyle(canvas, null)['paddingLeft'], 10)      || 0;
    this.stylePaddingTop  = parseInt(document.defaultView.getComputedStyle(canvas, null)['paddingTop'], 10)       || 0;
    this.styleBorderLeft  = parseInt(document.defaultView.getComputedStyle(canvas, null)['borderLeftWidth'], 10)  || 0;
    this.styleBorderTop   = parseInt(document.defaultView.getComputedStyle(canvas, null)['borderTopWidth'], 10)   || 0;
  }
  // Some pages have fixed-position bars (like the stumbleupon bar) at the top or left of the page
  // They will mess up mouse coordinates and this fixes that
  var html = document.body.parentNode;
  this.htmlTop = html.offsetTop;
  this.htmlLeft = html.offsetLeft;

  
  this.buildings = [];  // the collection of buildings
  this.suns = [];
  this.cars = [];
  
  var myState = this;

  // click for adding the height of building

  canvas.addEventListener('click', function(e) {
    var l = myState.buildings.length;
    var mouse = myState.getMouse(e);
    for (var i = 0; i < l; i++) {

      var building = myState.buildings[i];
      if ((mouse.x > building.x0) && (mouse.x<(building.x0+building.width))
        && (mouse.y > building.y0) && (mouse.y<(building.floor+building.height))) {
        myState.buildings[i].height += 10;
      }

    }

  }, false);
  
  this.interval = 30;
  setInterval(function() { 
    myState.draw(); 
  }, myState.interval);
}




CanvasState.prototype.addCar = function(car) {
  this.cars.push(car);
  this.valid = false;
}

CanvasState.prototype.addBuilding = function(building) {
  this.buildings.push(building);
  this.valid = false;
}
CanvasState.prototype.addSun = function(_sun) {
  this.suns.push(_sun);
  this.valid = false;
}

CanvasState.prototype.clear = function() {
  this.ctx.clearRect(0, 0, this.width, this.height);
}

// While draw is called as often as the INTERVAL variable demands,
// It only ever does something if the canvas gets invalidated by our code
CanvasState.prototype.draw = function() {

  // if our state is invalid, redraw and validate!
  if (!this.valid) {
    var ctx = this.ctx;

    var buildings = this.buildings;
    var suns = this.suns;
    var cars = this.cars;
    this.clear();
    canvas = this;    
    this.interval = 1000;

    suns[0].update(canvas); 
    cars[0].update(canvas);
    // setInterval(function() { 
    //     suns[0].update(canvas); 
    //     cars[0].update(canvas);
    //   }, this.interval);    
    // draw all shapes
    
    suns[0].draw(ctx, this);
   
    var l = buildings.length;
    for (var i = 0; i < l; i++) {
      var building = buildings[i];
      buildings[i].draw(ctx, this);
    }
    cars[0].draw(ctx, this);
  }
}


// Creates an object with x and y defined, set to the mouse position relative to the state's canvas
CanvasState.prototype.getMouse = function(e) {
  var element = this.canvas, offsetX = 0, offsetY = 0;
  
  // Compute the total offset
  if (element.offsetParent !== undefined) {
    do {
      offsetX += element.offsetLeft;
      offsetY += element.offsetTop;
    } while ((element = element.offsetParent));
  }

  // Add padding and border style widths to offset
  // Also add the <html> offsets in case there's a position:fixed bar
  offsetX += this.stylePaddingLeft + this.styleBorderLeft + this.htmlLeft;
  offsetY += this.stylePaddingTop + this.styleBorderTop + this.htmlTop;

  mx = e.pageX - offsetX;
  my = e.pageY - offsetY;
  
  return {x: mx, y: my};
}

function build(s) {
	s.addBuilding(new Building(s));
}


var windowSpacing = 2, floorSpacing = 3
var windowHeight = 5, windowWidth = 3

// colors of buildings
var blgColors = [ 'red', 'blue', 'gray', 'orange'] 

// color of lights
var litColors = ['yellow', 'black']
function init() {
  var canvas = document.getElementById('canvas1');
  var s = new CanvasState(canvas);
  c = canvas.getContext('2d');
  var floor = canvas.height/2
  var grad = c.createLinearGradient(0,floor,0,s.height)

  s.addSun(new SunCircle(s));
  s.addCar(new Car(s));
  document.getElementById("build").onclick = function () {
    build(s)
  }
}

window.onload = function() {
  init()
}
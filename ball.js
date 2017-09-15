/* GENERAL FUNCTIONS     ------------------------------------------- */
function collision2Rects(x1, y1, w1, h1, x2, y2, w2, h2) {
  return !(
    ((y1 + h1) < (y2)) ||
    (y1 > (y2 + h2)) ||
    ((x1 + w1) < x2) ||
    (x1 > (x2 + w2))
  );
}

function collusionRectCircle(x1, y1, w1, h1, xp2, yp2, r2) {
  var w2 = r2 * 2;
  var h2 = r2 * 2;
  var x2 = xp2 - r2;
  var y2 = yp2 - r2;
  return !(
    ((y1 + h1) < (y2)) ||
    (y1 > (y2 + h2)) ||
    ((x1 + w1) < x2) ||
    (x1 > (x2 + w2))
  );
}

function collision2Circles(x1, y1, r1, x2, y2, r2) {
  return ((abs(x2 - x1) > (r2 + r1))) &&
    ((abs(y2 - y1) > (r2 + r1)));
}

// GET RADIUS DISTANCE
function radiusDistance(x1, y1, x2, y2) {
  var xdistance = x1 - x2;
  var ydistance = y1 - y2;
  var absolutedistance = Math.sqrt(xdistance * xdistance +
    ydistance * ydistance);
  return absolutedistance;
}

// SHUFFLE ARRAY
function shuffle(array) {
  var currentIndex = array.length,
    temporaryValue, randomIndex;
  // While there remain elements to shuffle...
  while (0 !== currentIndex) {
    // Pick a remaining element...
    randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex -= 1;
    // And swap it with the current element.
    temporaryValue = array[currentIndex];
    array[currentIndex] = array[randomIndex];
    array[randomIndex] = temporaryValue;
  }
  return array;
}

// GET RANDOM RGB
function getRandomColor() {
  var letters = '0123456789ABCDEF'.split('');
  var color = '#';
  for (var i = 0; i < 6; i++) {
    color += letters[Math.floor(Math.random() * 16)];
  }
  return color;
}

//GET RANDOM RGBA
function getRndmRGBA(alpha) {
  var colorcode = "rgba(";
  var red = Math.floor(Math.random() * 255);
  var green = Math.floor(Math.random() * 255);
  var blue = Math.floor(Math.random() * 255);

  colorcode += red + ", " +
    green + ", " +
    blue + ", " +
    alpha +
    ")";
  return colorcode;
}


/* HELPER FUNCTIONS     ------------------------------------------- */
/**
 * converts degree to radians
 * @param degree
 * @returns {number}
 */
var toRadians = function (degree) {
  return degree * (Math.PI / 180);
};

/**
 * Converts radian to degree
 * @param radians
 * @returns {number}
 */
var toDegree = function (radians) {
  return radians * (180 / Math.PI);
}

/**
 * Rounds a number mathematical correct to the number of decimals
 * @param number
 * @param decimals (optional, default: 5)
 * @returns {number}
 */
var roundNumber = function (number, decimals) {
  decimals = decimals || 5;
  return Math.round(number * Math.pow(10, decimals)) / Math.pow(10, decimals);
}
//the object
var MathD = {
  sin: function (number) {
    return roundNumber(Math.sin(toRadians(number)));
  },
  cos: function (number) {
    return roundNumber(Math.cos(toRadians(number)));
  },
  tan: function (number) {
    return roundNumber(Math.tan(toRadians(number)));
  },
  asin: function (number) {
    return roundNumber(toDegree(Math.asin(number)));
  },
  acos: function (number) {
    return roundNumber(toDegree(Math.acos(number)));
  },
  atan: function (number) {
    return roundNumber(toDegree(Math.atan(number)));
  }
};



// CLASS PIXEL    ------------------------------------------ */
function Pixel(x, y) {
  this.xpos = x;
  this.ypos = y;
}




/* CLASS BALL    ------------------------------------------- */
function Ball() {
  this.radius = 2;
  this.xpos = 4;
  this.ypos = 4;
  this.xforce = 0;
  this.yforce = 0;
  this.xdistance = 0;
  this.ydistance = 0;
  this.idNumber = 0;
  this.enabled = true;

  this.leader = new Pixel(400, 400);
  this.trackspeed = 0.4;
  this.frictionfactor = 0.9;
  this.follower = this;

  this.red = "250";
  this.green = "250";
  this.blue = "250";
  this.alpha = "1";
}


// COLOR (rgba)
Ball.prototype.getColor = function () {
  return "rgba(" + this.red + "," + this.green + "," + this.blue + "," + this.alpha + ")";
}
Ball.prototype.setColor = function (red, green, blue, alpha) {
  this.red = red;
  this.green = green;
  this.blue = blue;
  this.alpha = alpha;
}

Ball.prototype.setRndmColorRGBA = function (alpha) {
  var red = Math.floor(Math.random() * 255);
  var green = Math.floor(Math.random() * 255);
  var blue = Math.floor(Math.random() * 255);

  this.setColor(red, green, blue, alpha);
}

// DRAW
Ball.prototype.draw = function (ctx) {


  ctx.strokeStyle = this.getColor();
  ctx.lineWidth = 1;
  ctx.beginPath();
  ctx.moveTo(this.xpos, this.ypos);
  ctx.lineTo(this.follower.xpos, this.follower.ypos);
  ctx.stroke();

  ctx.fillStyle = this.getColor();
  ctx.beginPath();
  ctx.arc(this.xpos, this.ypos, this.radius, 0, 2 * Math.PI, true);
  ctx.closePath();
  ctx.fill();
}

// PROCESS
Ball.prototype.process = function () {
  this.xpos += this.xforce;
  this.ypos += this.yforce;
  var xf = this.xforce;
  var yf = this.yforce;
  this.xforce = this.xforce * this.frictionfactor;
  this.yforce = this.yforce * this.frictionfactor;
}

// TRACK OBJECT
Ball.prototype.trackObject = function (object) {
  this.xdistance = this.xpos - object.xpos;
  this.ydistance = this.ypos - object.ypos;
  var absolutedistance = (Math.abs(this.xdistance) +
    Math.abs(this.ydistance)) / 2;
  this.xforce += (this.xdistance / (absolutedistance)) * (-this.trackspeed) * absolutedistance / 100;
  this.yforce += (this.ydistance / (absolutedistance)) * (-this.trackspeed) * absolutedistance / 100;
  //this.radius = Math.min(5, 40/absolutedistance);
  this.alpha = Math.min(255, 50 / absolutedistance);
}

// FORCE TO XY
Ball.prototype.forceTo = function (x, y, factor) {
  this.xdistance = this.xpos - x;
  this.ydistance = this.ypos - y;

  this.xforce += this.xdistance * -factor / 100;
  this.yforce += this.ydistance * -factor / 100;
}

// RANDOMIZE FORCES
Ball.prototype.randomizeForces = function (factor) {
  this.xforce = (Math.random() - 0.5) * factor;
  this.yforce = (Math.random() - 0.5) * factor;
}

// FORCE TO DELAY
Ball.prototype.forceToDelay = function (pixel) {
  var xdistance = this.xpos - pixel.xpos;
  var ydistance = this.ypos - pixel.ypos;
  var absolutedistance = Math.sqrt(xdistance * xdistance +
    ydistance * ydistance);
  var delay = absolutedistance * 2;

  var self = this;
  var forceFactor = 1.0;

  setTimeout(function () {
    self.xforce += (xdistance / (absolutedistance)) * forceFactor;
    self.yforce += (ydistance / (absolutedistance)) * forceFactor;
  }, delay);
}






/* CLASS BALL COLLECTION    ------------------------------------------- */
function BallCollection() {
  this.ballArray = new Array();
}


BallCollection.prototype.getSize = function () {
  return this.ballArray.length;
}


// ADD EXISTING BALL
BallCollection.prototype.addBall = function (ball) {
  this.ballArray.push(ball);
}

// ADD NEW BALL
BallCollection.prototype.addNewBall = function (radius) {
  var ball = new Ball(radius);
  this.ballArray.push(ball);
}

// ADD MUTIPLE BALLS
BallCollection.prototype.addMutiple = function (amount) {
  for (var i = 0; i < amount; i += 1) {
    var ball = new Ball();
    this.ballArray.push(ball);
  }
}

// ADD MUTIPLE BALLS
BallCollection.prototype.addMutipleRndm = function (amount, c) {
  for (var i = 0; i < amount; i += 1) {
    this.addRndmBall(c);
  }
}

// ADD RANDOM BALL
BallCollection.prototype.addRndmBall = function (c) {
  var ball = new Ball();
  ball.xforce = Math.random() * 5;
  ball.yforce = Math.random() * 8;
  ball.xpos = Math.random() * c.height;
  ball.ypos = Math.random() * c.width;
  this.ballArray.push(ball);
}

// SET COLOR OF ALL
BallCollection.prototype.changeColor = function (red, green, blue, alpha) {
  for (var i = 0; i < this.getSize(); i += 1) {
    this.ballArray[i].setColor(red, green, blue, alpha);
  }
}

// SET COLOR OF ALL
BallCollection.prototype.changeSize = function (radius) {
  for (var i = 0; i < this.getSize(); i += 1) {
    this.ballArray[i].radius = radius;
  }
}

// TRANSLATE ALL BALLS (TO LEADER POS)
BallCollection.prototype.toLeaderPos = function () {
  for (var i = 0; i < this.getSize(); i += 1) {
    var ball = this.ballArray[i];
    ball.xpos = ball.leader.xpos;
    ball.ypos = ball.leader.ypos;
    ball.xforce = ball.xforce * 0.001;
    ball.yforce = ball.yforce * 0.001;
  }
}

// PROCESS ALL BALLS
BallCollection.prototype.process = function () {
  for (var i = 0; i < this.getSize(); i += 1) {
    var ball = this.ballArray[i];
    ball.process();
    ball.trackObject(ball.leader);
  }
}

// DRAW ALL
BallCollection.prototype.drawAll = function (ctx) {

  for (var i = 0; i < this.getSize(); i += 1) {
    this.ballArray[i].draw(ctx);
  }
}

// RANDOMIZE FORCES ALL
BallCollection.prototype.randomizeForces = function (factor) {
  for (var i = 0; i < this.getSize(); i += 1) {
    this.ballArray[i].randomizeForces(factor);
  }
}

// FORCE TO XY
BallCollection.prototype.forceTo = function (x, y, factor) {
  for (var i = 0; i < this.getSize(); i += 1) {
    this.ballArray[i].forceTo(x, y, factor);
  }
}

// SET LEADER FOR TRACKING
BallCollection.prototype.setLeader = function (leader) {
  for (var i = 0; i < this.getSize(); i += 1) {
    this.ballArray[i].leader = leader;
  }
}

// @Deprecated
// TRACK RENDER IMAGE PIXELS
BallCollection.prototype.drawRenderImage = function (renderimage) {
  var imagepixels = renderimage.pixelsum;
  for (var i = 0; i < this.getSize(); i += 1) {
    this.ballArray[i].leader = renderimage.pixelarray[i % imagepixels];
  }
}

// SET FRICTION FACTOR
BallCollection.prototype.setFrictionFactor = function (factor) {
  for (var i = 0; i < this.getSize(); i += 1) {
    this.ballArray[i].frictionfactor = factor;
  }
}

// SET SPEED
BallCollection.prototype.setSpeed = function (speed) {
  for (var i = 0; i < this.getSize(); i += 1) {
    this.ballArray[i].trackspeed = speed;
  }
}

// SET ALPHA
BallCollection.prototype.setAlpha = function (alpha) {
  for (var i = 0; i < this.getSize(); i += 1) {
    this.ballArray[i].alpha = alpha;
  }
}

// SET RANDOM RGB(A)
BallCollection.prototype.setRndmColor = function () {

  var red = Math.floor(Math.random() * 255);
  var green = Math.floor(Math.random() * 255);
  var blue = Math.floor(Math.random() * 255);

  for (var i = 0; i < this.getSize(); i += 1) {
    var ball = this.ballArray[i];
    ball.red = red;
    ball.green = green;
    ball.blue = blue;
  }

  return "" + red + "," + green + "," + blue;
}


// SET TRIANGLE
BallCollection.prototype.makeForm = function (edges, distance, rndmFactor) {

  // for lines
  for (var i = 0; i < this.getSize() && i + edges <= this.getSize(); i += edges) {
    var formCenter = new Pixel(Math.random() * canvas.width, Math.random() * canvas.height);

    for (var j = 0; j < edges; j += 1) {
      var ball = this.ballArray[i + j];
      var ballNext = this.ballArray[i + ((j + 1) % (edges))];
      ball.follower = ballNext;
      ball.leader = formCenter;
    }
  }

  // for distances
  var angle = 360 / edges;
  for (var i = 0; i < this.getSize() && i + edges <= this.getSize(); i += edges) {
    var distanceRNDM = distance + ((Math.random() - 0.5) * rndmFactor * distance * 2);
    for (var j = 0; j < edges; j += 1) {
      var ball = this.ballArray[i + j];

      var factorX = MathD.sin(angle * j);
      var factorY = MathD.cos(angle * j);

      var xplus = factorX * distanceRNDM;
      var yplus = factorY * distanceRNDM;
      ball.leader = new Pixel(ball.leader.xpos + xplus, ball.leader.ypos + yplus);

      //add friction
      ball.trackspeed = ball.trackspeed * (distanceRNDM / distance);
    }
  }
}



// MAKE WATER
BallCollection.prototype.makeWater = function (pixel) {
  for (var i = 0; i < this.getSize(); i += 1) {
    var ball = this.ballArray[i];
    ball.forceToDelay(pixel);
  }
}




// SET TRIANGLE
BallCollection.prototype.makeCircle = function (distance, canvas) {
  var edges = this.getSize();


  // for lines
  for (var i = 0; i < this.getSize() && i + edges <= this.getSize(); i += edges) {
    var formCenter = new Pixel(canvas.width / 2, canvas.height / 2);

    for (var j = 0; j < edges; j += 1) {
      var ball = this.ballArray[i + j];
      var ballNext = this.ballArray[i + ((j + 1) % (edges))];
      ball.follower = ballNext;
      ball.leader = formCenter;
    }
  }

  // for distances
  var angle = 360 / edges;
  for (var i = 0; i < this.getSize() && i + edges <= this.getSize(); i += edges) {
    for (var j = 0; j < edges; j += 1) {
      var ball = this.ballArray[i + j];

      var factorX = MathD.sin(angle * j);
      var factorY = MathD.cos(angle * j);

      var xplus = factorX * distance;
      var yplus = factorY * distance;
      ball.leader = new Pixel(ball.leader.xpos + xplus, ball.leader.ypos + yplus);
    }
  }
}

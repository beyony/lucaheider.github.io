// variables
var $wmCanvas1;
var canvas1;
var ctx1;
var canvas1Interval;

var $wmCanvas3;
var canvas3;
var ctx3;
var canvas3Interval;




$(document).ready(function () {

  $wmCanvas1 = $('#canvas1');
  canvas1 = document.getElementById("canvas1")
  ctx1 = canvas1.getContext("2d");

  ctx1.clearAll = function () {
    ctx1.clearRect(0, 0, canvas1.width, canvas1.height);
  }


  // canvas fullscreen resize
  $(window).resize(function () {
    canvas1.width = window.innerWidth;
    canvas1.height = window.innerHeight;
    ctx1.clearRect(0, 0, canvas1.width, canvas1.height);
  });
  $(window).resize();

  Canvas1(canvas1, ctx1, canvas1Interval);
});

/* Same procedure for canvas 3 */
$(document).ready(function () {

  $wmCanvas3 = $('#canvas3');
  canvas3 = document.getElementById("canvas3")
  ctx3 = canvas3.getContext("2d");

  ctx3.clearAll = function () {
    ctx3.clearRect(0, 0, canvas3.width, canvas3.height);
  }


  // canvas fullscreen resize
  $(window).resize(function () {
    canvas3.width = window.innerWidth;
    canvas3.height = window.innerHeight;
  });


  $(window).resize();
  Canvas3(canvas3, ctx3, canvas3Interval);
});






//.
//.
//.
//.

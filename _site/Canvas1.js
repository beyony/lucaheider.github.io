function Canvas1(c, ctx, interval) {

  var center = {
    x: c.width / 2,
    y: c.height / 2
  }

  var ballCollection = new BallCollection();



  ballCollection.addMutipleRndm(200, c);

  ballCollection.drawAll(ctx);

  interval = setInterval(
    function () {
      ctx.clearAll();
      ballCollection.process();
      ballCollection.drawAll(ctx);
    }, 30);



  ballCollection.setFrictionFactor(0.1);
  ballCollection.makeCircle(250, c);
  ballCollection.changeColor(55, 120, 156, 1);





  setTimeout(function () {
    var index = 0;
    ballCollection.setFrictionFactor(0.1);
    var foo = setInterval(function () {
      var ball = ballCollection.ballArray[index++ % ballCollection.getSize()];
      //ball.setRndmColorRGBA(1);
      var edges = ballCollection.getSize() / 3;
      if (index % Math.floor(ballCollection.getSize() / edges) == 0)
        ball.forceTo(center.x, center.y, 90);
    }, 40);
  }, 6000);





  $('#section1').click(function (event) {
    ballCollection.makeWater(new Pixel(event.pageX, event.pageY));
    console.log(ballCollection.setRndmColor());
  });

}

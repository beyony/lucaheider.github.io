function Canvas3(c, ctx, interval) {

  var center = {
    x: c.width / 2,
    y: c.height / 2
  }


  var textBuffer = " * * * Once* I was a kid* I started playing with building blocks.# Now I build websites,* apps,* and lots of other stuff!# On this site you can see, what I'm doing..* Enjoy!* # Now it's your turn.. * send me a wish!* ;)* # ";




  var counter = 0;

  function write() {
    $('#textSheet').text(textBuffer.substr(0, counter++) + (counter2 % 2 == 0 ? '_' : ' '));
    if (counter <= textBuffer.length) {
      if (textBuffer.charAt(counter - 1) == '*') {
        textBuffer = textBuffer.slice(0, counter - 1) + textBuffer.slice(counter, textBuffer.length);
        setTimeout(write, 1400);
      } else if (textBuffer.charAt(counter - 1) == '#') {
        textBuffer = textBuffer.slice(counter, textBuffer.length);
        console.log(textBuffer);
        counter = 0;
        setTimeout(write, 1400);
      } else {
        setTimeout(write, 100);
      }
    }
  }
  write();

  var counter2 = 0;
  setInterval(function () {
    $('#textSheet').text(textBuffer.substr(0, counter) + (counter2 % 2 == 0 ? '_' : ' '));
    counter2++;
  }, 700);









  /********************** CANVAS */

  var center = {
    x: c.width / 2,
    y: c.height / 2
  }

  var ballCollection = new BallCollection();



  ballCollection.addMutipleRndm(2002, c);
  ballCollection.changeSize(1);
  ballCollection.changeColor(55, 120, 156, 0.02);
  ballCollection.setFrictionFactor(1);
  ballCollection.setSpeed(0.004);

  ballCollection.drawAll(ctx);

  interval = setInterval(
    function () {
      ctx.fillStyle = 'rgba(10,15,16,0.15)';
      ctx.fillRect(0, 0, c.width, c.height);
      ballCollection.process();
      ballCollection.drawAll(ctx);
    }, 30);




  ballCollection.setLeader(new Pixel(center.x, center.y));


  //  var foo = setInterval(function () {
  //    ballCollection.setRndmColor();
  //  }, 1000);




  //  setTimeout(function () {
  //    var index = 0;
  //    ballCollection.setFrictionFactor(0.1);
  //    var foo = setInterval(function () {
  //      var ball = ballCollection.ballArray[index++ % ballCollection.getSize()];
  //      //ball.setRndmColorRGBA(1);
  //      var edges = ballCollection.getSize() / 3;
  //      if (index % Math.floor(ballCollection.getSize() / edges) == 0)
  //        ball.forceTo(center.x, center.y, 90);
  //    }, 40);
  //  }, 6000);




}

function rippleAnimation(container){
  let contHeight = $(container).height();
  console.log(contHeight)
  let contWidth = $(container).width();
  let smaller;
  if(contHeight > contWidth){
    smaller = contWidth;
  }
  else {
    smaller = contHeight;
  }
  let style ="";
  style +=  container + "{position: relative; text-align: center; display: flex; justify-content: center; align-items: center; overflow: hidden;} "
            + container + '::before,'+container+"::after {content: \'\'\; position: absolute; box-shadow: 0 0 10px 2px silver; border-radius: 50%; opacity: 0;}"
            + container +'::before {animation: ripple1 21s infinite;'
            + 'animation-delay: 1s; }'
            + container +'::after {right: ' + randomize() + '%;'
            + 'bottom: ' + randomize() +'%;'
            + 'animation: ripple2 21s infinite; }'
            + generateRipple({count: 1, randomColor: true, max: smaller})
            + generateRipple({count: 2, randomColor: false, max: smaller});


  console.log(style)
  $('<style>'+style+'</style>').appendTo('head');

  function randomize(max, min){
    minSize = min;
    if(!minSize)
    {
      minSize = 1;
    }
    if(!max){
      return Math.floor((Math.random() * 100) + minSize);
    }
    else{
      return Math.floor((Math.random() * max) + minSize);
    }
  }

  function generateRipple(rippleStats){
    let rippleCompleted = 0;
    let vertCurrent = 0;
    let horizCurrent = 0;
    let rippleStart = "% {height: 0px; width: 0px; opacity: 1;} ";
    let resetRipple = "% {height: 0px; width: 0px; opacity: 0;} ";
    let ripple ="@keyframes ripple"+rippleStats.count + " {";
    for(;rippleCompleted < 100;rippleCompleted+=10){
      let color;
      if(rippleStats.randomColor){
        color = getRandomColor();
      }
      else {
        color = "silver";
      }
      let rippleInfo = {start:rippleCompleted, number:rippleStats.count, color:color, max: rippleStats.max};
      ripple += startRipple(rippleInfo)
                + endRipple(rippleInfo)
                + (rippleCompleted + 9.9) + resetRipple;
    }
    ripple += " 100% {opacity: 0;} }";

    return ripple;

    function getRandomColor() {
      var chars = '0123456789ABCDEF';
      var colorCode = '#';
      for (var i = 0; i < 6; i++) {
        colorCode += chars[Math.floor(Math.random() * 16)];
      }
      return colorCode;
    }

    function startRipple(startRippleStats){
      let vert;
      let horiz;
      if(startRippleStats.count == 1){
        vert = "top";
        horiz = "left";
      }
      else {
        vert = "bottom";
        horiz = "right";
      }
      let rippleStart = parseInt(startRippleStats.start);
      vertCurrent = randomize(contHeight);
      horizCurrent = randomize(contWidth);
      return rippleStart + "% {" + horiz + ": " + horizCurrent + "px; " + vert + ": " +  vertCurrent + "px; height: " +  0 + "px; width: " +  0 + "px; opacity: 1; box-shadow: 0 0 10px 2px " + startRippleStats.color + ";}";

    }

    function endRipple(endRippleStats) {
      let vert;
      let horiz;
      let rippleEnd = parseInt(endRippleStats.start) + 9;
      let rippleSize = randomize(endRippleStats.max, 50);
      if(endRippleStats.count == 1){
        vert = "top";
        horiz = "left";
      }
      else {
        vert = "bottom";
        horiz = "right";
      }
      let vertMovement = vertCurrent - rippleSize/2;
      let horizMovement = horizCurrent - rippleSize/2;
      console.log(vertMovement)
      console.log(horizMovement)
      return rippleEnd + "% {" + horiz + ": " + horizMovement + "px; " + vert + ": " + vertMovement + "px; height: " +  rippleSize + "px; width: " +  rippleSize + "px; opacity: 0; }";
    }
  }
}

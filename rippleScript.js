function rippleAnimation(container, properties){
  let contHeight = $(container).height();
  let contWidth = $(container).width();
  let smaller;
  if(contHeight > contWidth){
    smaller = contWidth;
  }
  else {
    smaller = contHeight;
  }
  let duration = [21, 21];
  let interval = 10;
  let randomColors = [false,false];
  let padding = [0,0];
  let minRipple = 100;
  let rippleSpread = 2;
  let rippleBlur = 10;
  let defColor = 'silver';
  let maxRipple = smaller;

  if(properties){
    if(properties.duration){
      duration = properties.duration;
    }
    if(properties.interval){
      interval = properties.interval;
    }
    if(properties.randomColors){
      randomColors = properties.randomColors;
    }
    if(properties.padding){
      padding = properties.padding;
    }
    if(properties.minRipple){
      minRipple = properties.minRipple;
    }
    if(properties.rippleSpread){
      rippleSpread = properties.rippleSpread;
    }
    if(properties.rippleBlur){
      rippleBlur = properties.rippleBlur;
    }
    if(properties.defColor){
      defColor = properties.defColor;
    }
    if(properties.maxRipple){
      maxRipple = properties.maxRipple;
    }
  }
  let rippleDuration = parseInt(100/interval);



  let style ="";
  style +=  container + "{position: relative; text-align: center; display: flex; justify-content: center; align-items: center; overflow: hidden;} "
            + container + '::before,'+container+"::after {content: \'\'\; position: absolute; box-shadow: 0 0 " + rippleBlur + "px " + rippleSpread + "px " + defColor+ "; border-radius: 50%; opacity: 0;}"
            + container +"::before {animation: ripple1 " + duration[0] + "s infinite;"
            + 'animation-delay: 1s; }'
            + container +'::after {right: ' + randomize() + '%;'
            + 'bottom: ' + randomize() +'%;'
            + "animation: ripple2 " + duration[1] + "s infinite; }"
            + generateRipple({count: 1, randomColor: randomColors[0], max: maxRipple})
            + generateRipple({count: 2, randomColor: randomColors[1], max: maxRipple});


  // console.log(style)
  $('<style>'+style+'</style>').appendTo('head');

  function randomize(max, min){
    let minSize = min;
    if(!minSize)
    {
      minSize = 0;
    }
    if(!max){
      return Math.floor((Math.random() * (100-minSize+1)) + minSize);
    }
    else{
      return Math.floor((Math.random() * (max-minSize+1)) + minSize);
    }
  }

  function generateRipple(rippleStats){
    let rippleCompleted = 0;
    let vertCurrent = 0;
    let horizCurrent = 0;
    let rippleStart = "% {height: 0px; width: 0px; opacity: 1;} ";
    let resetRipple = "% {height: 0px; width: 0px; opacity: 0;} ";
    let ripple ="@keyframes ripple"+rippleStats.count + " {";
    for(;rippleCompleted < 100;rippleCompleted+=rippleDuration){
      let color;
      if(rippleStats.randomColor){
        color = getRandomColor();
      }
      else {
        color = defColor;
      }
      let rippleInfo = {start:rippleCompleted, number:rippleStats.count, color:color, max: rippleStats.max};
      ripple += startRipple(rippleInfo)
                + endRipple(rippleInfo)
                + (rippleCompleted + (.99*rippleDuration)) + resetRipple;
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
      if(startRippleStats.number == 1){
        vert = "top";
        horiz = "left";
      }
      else {
        vert = "bottom";
        horiz = "right";
      }
      let paddingElem = parseInt(startRippleStats.number)-1;
      let startPadding = parseInt(padding[paddingElem]);
      let rippleStart = parseInt(startRippleStats.start);
      vertCurrent = randomize(contHeight-startPadding,startPadding);
      horizCurrent = randomize(contWidth-startPadding,startPadding);
      return rippleStart + "% {" + horiz + ": " + horizCurrent + "px; " + vert + ": " +  vertCurrent + "px; height: " +  0 + "px; width: " +  0 + "px; opacity: 1; box-shadow: 0 0 " + rippleBlur + "px " + rippleSpread + "px " + startRippleStats.color + ";}";

    }

    function endRipple(endRippleStats) {
      let vert;
      let horiz;
      let rippleEnd = parseInt(endRippleStats.start) + (rippleDuration*.9);
      let rippleSize = randomize(endRippleStats.max, minRipple);
      if(endRippleStats.number == 1){
        vert = "top";
        horiz = "left";
      }
      else {
        vert = "bottom";
        horiz = "right";
      }
      let vertMovement = vertCurrent - rippleSize/2;
      let horizMovement = horizCurrent - rippleSize/2;
      return rippleEnd + "% {" + horiz + ": " + horizMovement + "px; " + vert + ": " + vertMovement + "px; height: " +  rippleSize + "px; width: " +  rippleSize + "px; opacity: 0; }";
    }
  }
}

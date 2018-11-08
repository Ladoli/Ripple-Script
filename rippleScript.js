function rippleAnimation(container, properties, identifier){

  if(document.getElementById('rippleAnimationAppend'+identifier)){
    document.getElementById('rippleAnimationAppend'+identifier).remove();
  }  
  let contHeight = document.querySelector(container).clientHeight;
  let contWidth = document.querySelector(container).clientWidth;
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
  let delay = 1;

  if(properties){
    if(properties.duration){
      duration = properties.duration;
    }
    if(properties.interval){
      interval = properties.interval;
      if(interval > 100){
        interval = 100;
      }
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
    if(properties.delay){
      delay = properties.delay;
    }
  }
  let rippleDuration = parseInt(100/interval);

  let style ="";
  style +=  container + "{position: relative; text-align: center; display: flex; justify-content: center; align-items: center; overflow: hidden;} "
            + container + '::before,'+container+"::after {content: \'\'\; position: absolute; box-shadow: 0 0 " + rippleBlur + "px " + rippleSpread + "px " + defColor+ "; border-radius: 50%; opacity: 0;}"
            + container +"::before {animation: ripple"+identifier+"1 " + duration[0] + "s infinite;"
            + "animation-delay: "+ delay +"s; }"
            + container +'::after {right: ' + randomize() + '%;'
            + 'bottom: ' + randomize() +'%;'
            + "animation: ripple"+identifier+"2 " + duration[1] + "s infinite; }"
            + generateRipple({count: 1, randomColor: randomColors[0], max: maxRipple})
            + generateRipple({count: 2, randomColor: randomColors[1], max: maxRipple});

    let implementedStyle = document.createElement('style');
    implementedStyle.setAttribute('type','text/css');
    if(implementedStyle.styleSheet){
      implementedStyle.styleSheet.cssText = style;
    }else{
      implementedStyle.appendChild(document.createTextNode(style));
    }
    document.head.appendChild(implementedStyle);

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
    let ripple ="@keyframes ripple"+identifier+rippleStats.count + " {";
    let rippleMax = parseInt(100/rippleDuration) * rippleDuration;

    for(;rippleCompleted < rippleMax;rippleCompleted+=rippleDuration){
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
      let rippleEnd = parseInt(endRippleStats.start) + (rippleDuration*.98);
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

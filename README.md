# Ripple-Script
A script to create random ripple effects on a target container


## Demo

You can see a demo of Ripplescript, along with being able to play with its properties, here: https://ladoli.github.io/rippleScript.html

## Adding Ripple-Script to your project

Simply add the following lines to your head tag.

        <script src="https://ajax.googleapis.com/ajax/libs/jquery/3.2.1/jquery.min.js"></script>
        <script src="JS/rippleScript.js"></script>

Then, to call RippleScript, simply use rippleAnimation(container, Properties(optional));


## Ripple-Script Configuration

Ripple-script takes an object for its properties

**duration** is an array of two numbers that determine the duration of each ripple group loop. Defaults to 21 seconds each

**interval** determines how many ripples per ripple loop before restarting the loop. An interval of 10 ripples means that there will be a total of 20 ripples if each animation runs once. Defaults to 10.

**randomColors** is an array of booleans that determines if ripples will have random colors. Defaults to false for both.

**minRipple** determines the minimum ripple size. Defaults to 100px.

**maxRipple** determines the maximum ripple size. Defaults to the smaller between width and height of the container.

**rippleSpread** determines the thickness of the ripple edges. Defaults to 2px.

**rippleBlur** determines the thickness of blur on the ripple edges. Defaults to 10px.

**padding** determines padding wherein ripples will not start from with regard to the container edges.

**defColor** determines default ripple color. Pass in strings that determine colors  css/html. Can use rgb or hexa or even strings that state the color such as 'gold'. Defaults to 'silver'.

**delay** Delay between first animation and second animation. Defaults to 1 second.

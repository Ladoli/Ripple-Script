# Ripple-Script
A script to create random ripple effects on a target container


## Demo

An example of how I myself used Ripplescript: https://react-ladoli.netlify.com/

You can see a demo of Ripplescript, along with being able to play with its properties, here: https://react-ladoli.netlify.com/RippleScript

## Adding Ripple-Script to your project

You can install Ripple-Script by going:

        npm install --save ripplescript

Then, to call RippleScript with es6 syntax, simply import it

        import rippleAnimation from 'ripplescript';

Feel free to call it using:

        rippleAnimation(containerQuery, Properties(optional),uniqueIdentifier(optional));

        rippleAnimation('#containerID', Properties(optional),uniqueIdentifier(optional));

To call it upon DOM load without jQuery's $( document ).ready(), you can add this code to the end of your body tag

        document.addEventListener('DOMContentLoaded', function(){ 
                rippleAnimation(containerQuery, 
                Properties(optional),
                uniqueIdentifier(optional))
        }, false);

In React it is even easier! Just stick it in ComponentDidMount like so

        componentDidMount() {
                rippleAnimation(containerQuery, 
                Properties(optional),
                uniqueIdentifier(optional))
        }

## Ripple-Script Properties Configuration

Ripple-script takes an object for its properties

**duration** is an array of two numbers that determine the duration of each ripple group loop. Defaults to 21 seconds each. **Final duration may change slightly based on intervals used**

**interval** determines how many ripples per ripple loop before restarting the loop. An interval of 10 ripples means that there will be a total of 20 ripples if each animation runs once. Defaults to 10.

**randomColors** is an array of booleans that determines if ripples will have random colors. Defaults to false for both.

**minRipple** determines the minimum ripple size. Defaults to 100px.

**maxRipple** determines the maximum ripple size. Defaults to the smaller between width and height of the container.

**rippleSpread** determines the thickness of the ripple edges. Defaults to 2px.

**rippleBlur** determines the thickness of blur on the ripple edges. Defaults to 10px.

**padding** determines padding wherein ripples will not start from with regard to the container edges.

**defColor** determines default ripple color. Pass in strings that determine colors  css/html. Can use rgb or hexa or even strings that state the color such as 'gold'. Defaults to 'silver'.

**delay** Delay between first animation and second animation. Defaults to 1 second.

## Using Ripple-script on multiple containers with different animations

Simply add an identifier. As seen below:

        rippleAnimation('#containerID', {});
        rippleAnimation('#othercontainerID', {},uniqueIdentifier);
        rippleAnimation('#othercontainerID2', {},'5235rrt4');

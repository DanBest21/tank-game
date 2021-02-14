// Learn more about this file at:
// https://victorzhou.com/blog/build-an-io-game-part-1/#6-client-input-%EF%B8%8F
// import { updateDirection } from './networking';

// TODO: Delete later.
const MAP_SIZE = 500;
const SPEED = 5;
const ROTATION_SPEED = 5;
var me = {"x": MAP_SIZE / 2, "y": MAP_SIZE / 2, "theta": 0};

function onKeyDown(e) {
  switch (e.keyCode) {
      case 37:
      case 65: 
        rotatePlayer(ROTATION_SPEED);
        console.log("Left"); 
        break; //Left key
      case 38:
      case 87: 
        movePlayer(SPEED);
        console.log("Up"); 
        break; //Up key
      case 39:
      case 68: 
        rotatePlayer(-ROTATION_SPEED);
        console.log("Right"); 
        break; //Right key
      case 40:
      case 83:
        movePlayer(-SPEED); 
        console.log("Down"); 
        break; //Down key
      // default: console.log("?"); //Everything else
  }
}

function rotatePlayer(dif) {
  me.theta += dif * Math.PI / 180;
}

function movePlayer(dif) {
  me.x = me.x - (dif * Math.sin(me.theta))
  me.y = me.y - (dif * Math.cos(me.theta))
}

export function getMe() {
  return me;
}

export function startCapturingInput() {
  window.addEventListener('keydown', onKeyDown);
}

export function stopCapturingInput() {
  window.removeEventListener('keydown', onKeyDown);
}

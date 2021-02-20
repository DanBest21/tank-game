import { MAP_WIDTH, MAP_HEIGHT, MAX_BULLETS, BULLET_SPEED, BULLET_TIMEOUT, BULLET_DELAY, UPDATE_FPS, ROTATION_SPEED, SPEED, PLAYER_HEIGHT } from "./constants.js";
import { 
  onFire, onLeftPressed, onRightPressed, onUpPressed, onDownPressed, 
  onLeftReleased, onRightReleased, onUpReleased, onDownReleased} from './game.js'

// todo - should theta be renamed? or otherwise, should speed be renamed to 'r' to be in mathematical notation?
// todo - possibly add lines showing coordinates on screen of every object (player) for debugging purposes

function onKeyDown(e) {
  switch (e.keyCode) {
    case 32:
      onFire();
      break;
    case 37:
    case 65: 
      onLeftPressed();
      // console.log("Left pressed"); 
      break; //Left key
    case 38:
    case 87: 
      onUpPressed();
      // console.log("Up pressed"); 
      break; //Up key
    case 39:
    case 68: 
      onRightPressed()
      // console.log("Right pressed"); 
      break; //Right key
    case 40:
    case 83:
      onDownPressed();
      // console.log("Down pressed"); 
      break; //Down key
    // default: console.log("?"); //Everything else
  }
}

function onKeyUp(e) {
  switch (e.keyCode) {
    case 37:
    case 65: 
      onLeftReleased();
      // console.log("Left released"); 
      break; //Left key
    case 38:
    case 87: 
      onUpReleased();
      // console.log("Up released"); 
      break; //Up key
    case 39:
    case 68: 
      onRightReleased();
      // console.log("Right released"); 
      break; //Right key
    case 40:
    case 83:
      onDownReleased();
      // console.log("Down released"); 
      break; //Down key
    // default: console.log("?"); //Everything else
  }
}

export function startCapturingInput() {
  window.addEventListener('keydown', onKeyDown);
  window.addEventListener('keyup', onKeyUp);
}

export function stopCapturingInput() {
  window.removeEventListener('keydown', onKeyDown);
  window.removeEventListener('keyup', onKeyUp);
}
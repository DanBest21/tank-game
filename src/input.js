// Learn more about this file at:
// https://victorzhou.com/blog/build-an-io-game-part-1/#6-client-input-%EF%B8%8F
// import { updateDirection } from './networking';

// TODO: Delete later.
const MAP_SIZE = 500;
const SPEED = 3;
const ROTATION_SPEED = 3;
var me = {"x": MAP_SIZE / 2, "y": MAP_SIZE / 2, "theta": 0, "speed": 0, "angular_velocity": 0};

// todo - should theta be renamed? or otherwise, should speed be renamed to 'r' to be in mathematical notation?

function onKeyDown(e) {
  switch (e.keyCode) {
      case 37:
      case 65: 
        // rotatePlayer(ROTATION_SPEED);
        me.angular_velocity = ROTATION_SPEED;
        console.log("Left pressed"); 
        break; //Left key
      case 38:
      case 87: 
        // movePlayer(SPEED);
        me.speed = SPEED;
        console.log("Up pressed"); 
        break; //Up key
      case 39:
      case 68: 
        // rotatePlayer(-ROTATION_SPEED);
        me.angular_velocity = -1*ROTATION_SPEED;
        console.log("Right pressed"); 
        break; //Right key
      case 40:
      case 83:
        // movePlayer(-SPEED); 
        me.speed = -SPEED;
        console.log("Down pressed"); 
        break; //Down key
      // default: console.log("?"); //Everything else
  }
}

function onKeyUp(e) {
  switch (e.keyCode) {
    case 37:
    case 65: 
      // rotatePlayer(ROTATION_SPEED);
      me.angular_velocity = 0;
      console.log("Left released"); 
      break; //Left key
    case 38:
    case 87: 
      // movePlayer(SPEED);
      me.speed = 0;
      console.log("Up released"); 
      break; //Up key
    case 39:
    case 68: 
      // rotatePlayer(-ROTATION_SPEED);
      me.angular_velocity = 0;
      console.log("Right released"); 
      break; //Right key
    case 40:
    case 83:
      // movePlayer(-SPEED); 
      me.speed = 0;
      console.log("Down released"); 
      break; //Down key
    // default: console.log("?"); //Everything else

}
}

function rotatePlayer(player) {
  player.theta += player.angular_velocity * Math.PI / 180;
}

function movePlayer(player) {
  player.x = player.x - (player.speed * Math.sin(player.theta))
  player.y = player.y - (player.speed * Math.cos(player.theta))
}

function update() {
  // todo - update position by d_pos=speed, angle by d_angle=angular_velocity

  rotatePlayer(me);
  movePlayer(me);
}

export function getMe() {
  return me;
}

export function startCapturingInput() {
  window.addEventListener('keydown', onKeyDown);
  window.addEventListener('keyup', onKeyUp);
}

export function stopCapturingInput() {
  window.removeEventListener('keydown', onKeyDown);
  window.removeEventListener('keyup', onKeyUp);
}

// let updateInterval = setInterval(update, 1000 / 60);
let updateInterval;

export function startEventLoop() { // todo - rename function?
  clearInterval(updateInterval);
  updateInterval = setInterval(update, 1000 / 60);
}
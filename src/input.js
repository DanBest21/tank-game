// TODO: Delete later.
const MAP_SIZE = 500;
const SPEED = 3;
const ROTATION_SPEED = 3;
var me = {"x": MAP_SIZE / 2, "y": MAP_SIZE / 2, "theta": 0, "speed": 0, "angular_velocity": 0};

var bullets = new Array(3);
bullets[0] = {"x": me.x, "y": me.y, "v_x": 1, "v_y": 1};
bullets[1] = {"x": me.x, "y": me.y, "v_x": 1, "v_y": -1};
bullets[2] = {"x": me.x, "y": me.y, "v_x": -1, "v_y": 1};

// var 


// todo - should theta be renamed? or otherwise, should speed be renamed to 'r' to be in mathematical notation?
// todo - possibly add lines showing coordinates on screen of every object (player) for debugging purposes

function onKeyDown(e) {
  switch (e.keyCode) {
    case 32:
      onFire();
      break;
    case 37:
    case 65: 
      me.angular_velocity = ROTATION_SPEED;
      // console.log("Left pressed"); 
      break; //Left key
    case 38:
    case 87: 
      me.speed = SPEED;
      // console.log("Up pressed"); 
      break; //Up key
    case 39:
    case 68: 
      me.angular_velocity = -1*ROTATION_SPEED;
      // console.log("Right pressed"); 
      break; //Right key
    case 40:
    case 83:
      me.speed = -SPEED;
      // console.log("Down pressed"); 
      break; //Down key
    // default: console.log("?"); //Everything else
  }
}

function onKeyUp(e) {
  switch (e.keyCode) {
    case 37:
    case 65: 
      me.angular_velocity = 0;
      // console.log("Left released"); 
      break; //Left key
    case 38:
    case 87: 
      me.speed = 0;
      // console.log("Up released"); 
      break; //Up key
    case 39:
    case 68: 
      me.angular_velocity = 0;
      // console.log("Right released"); 
      break; //Right key
    case 40:
    case 83:
      me.speed = 0;
      // console.log("Down released"); 
      break; //Down key
    // default: console.log("?"); //Everything else

}
}

function onFire() {
  // how to implement delay between bullets?
}

function rotatePlayer(player) {
  if (player.angular_velocity != 0) {
    player.theta += player.angular_velocity * Math.PI / 180;
  }
}

function movePlayer(player) {
  if (player.speed != 0) {
    player.x = player.x - (player.speed * Math.sin(player.theta))
    player.y = player.y - (player.speed * Math.cos(player.theta))
  }
}

function updateBullet(bullet) {
  if (bullet.v_y != 0 || bullet.v_x != 0) {  
    bullet.x += bullet.v_x;
    bullet.y += bullet.v_y;
  }
}

function update() {
  rotatePlayer(me);
  movePlayer(me);

  bullets.forEach(updateBullet);

  // todo - update all others
}

export function getMe() {
  return me;
}

export function getBullets() {
  return bullets;
}

export function startCapturingInput() {
  window.addEventListener('keydown', onKeyDown);
  window.addEventListener('keyup', onKeyUp);
}

export function stopCapturingInput() {
  window.removeEventListener('keydown', onKeyDown);
  window.removeEventListener('keyup', onKeyUp);
}

var initTime;

let updateInterval;
export function startEventLoop() {
  clearInterval(updateInterval);
  updateInterval = setInterval(update, 1000 / 60);

  // initTime = 
}
// TODO: Delete later.
const MAP_SIZE = 500;
const SPEED = 3;
const ROTATION_SPEED = 3;

const MAX_BULLETS = 5;
const BULLET_DELAY = 1000; // ms

const UPDATE_FPS = 60;

const me_id = 0;

var dummy_me = {"x": MAP_SIZE / 2, "y": MAP_SIZE / 2, "theta": 0, "speed": 0, "angular_velocity": 0};

var dummy_players = {0: dummy_me};

var dummy_bullets_0 = {
  0: {"x": dummy_me.x, "y": dummy_me.y, "v_x": 1, "v_y": 1},
  1: {"x": dummy_me.x, "y": dummy_me.y, "v_x": 1, "v_y": -1},
  2: {"x": dummy_me.x, "y": dummy_me.y, "v_x": -1, "v_y": 1}
};

var dummy_bullets = {0: dummy_bullets_0};

var dummy_state = [dummy_players, dummy_bullets];

var state = dummy_state;

var players = state[0];
var bullets = state[1];

var me = players[me_id];

var initTime;
var lastBulletTime;

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

  console.log("onFire");

  var num_bullets = Object.keys(bullets[me_id]).length;
  // console.log(Object.keys(bullets[me_id]));
  // console.log(Object.keys(bullets[me_id]).length);

  var elapsed;

  if (num_bullets <= MAX_BULLETS) {

    var d = new Date();
    var currentTime = d.getTime();
    console.log("current: ", currentTime);
    elapsed = currentTime - lastBulletTime;
    console.log("elapsed: ", elapsed)

    // console.log("lastBulletTime: ", lastBulletTime);

    if (elapsed >= BULLET_DELAY) {
      
      console.log("fire");
      lastBulletTime = currentTime;
      // console.log("lastBulletTime: ", lastBulletTime);
    } else {
      console.log("cannot fire: not enough time passed since last bullet")
    }

    // console.log("lastBulletTime: ", lastBulletTime);

  }

  // todo - check if bullet_delay surpassed

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
  console.log("Bullet updated.");

  if (bullet.v_y != 0 || bullet.v_x != 0) {  
    bullet.x += bullet.v_x;
    bullet.y += bullet.v_y;
  }
}

function update() {
  rotatePlayer(me);
  movePlayer(me);

  Object.values(bullets).forEach(player => Object.values(player).forEach(bullet => updateBullet(bullet)));

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


let updateInterval;
export function startEventLoop() {
  clearInterval(updateInterval);
  updateInterval = setInterval(update, 1000 / UPDATE_FPS);

  var d = new Date();
  initTime = d.getTime();

  lastBulletTime = 0;
}
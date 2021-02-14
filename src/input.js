import { MAP_SIZE, MAX_BULLETS, BULLET_SPEED, BULLET_TIMEOUT, BULLET_DELAY, UPDATE_FPS, ROTATION_SPEED, SPEED, PLAYER_HEIGHT } from "./constants.js";

const me_id = 0;

var dummy_me = {"x": MAP_SIZE / 2, "y": MAP_SIZE / 2, "theta": 0, "speed": 0, "angular_velocity": 0};

var dummy_other = {"x": 100, "y": 100, "theta": 3, "speed": 0, "angular_velocity": 0};

var dummy_players = {0: dummy_me, 1: dummy_other};

var dummy_walls = [
  [[1, 1], [1, 0], [0, 1]],
  [[0, 1], [0, 0], [0, 1]],
  [[1, 0], [1, 0], [0, 0]]
]

var dummy_bullets_0 = [
  // {"x": dummy_me.x, "y": dummy_me.y, "v_x": 1, "v_y": 1},
  // {"x": dummy_me.x, "y": dummy_me.y, "v_x": 1, "v_y": -1},
  // {"x": dummy_me.x, "y": dummy_me.y, "v_x": -1, "v_y": 1}
  ];

var dummy_bullets_1 = [];

var dummy_bullets = {0: dummy_bullets_0, 1: dummy_bullets_1};

var dummy_state = {"players": dummy_players,"bullets":  dummy_bullets,"walls": dummy_walls};

var state = dummy_state;

var players = state["players"];
var bullets = state["bullets"];
var walls = state["walls"];

var me = players[me_id];

var initTime;
var lastBulletTime;

var bulletIds = Array(MAX_BULLETS).fill(1).map((x, y) => x + y);

var d = new Date();

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

  var num_bullets = bullets[me_id].length;
  console.log(num_bullets);
  // console.log(Object.keys(bullets[me_id]));
  // console.log(Object.keys(bullets[me_id]).length);

  var elapsed;

  if (num_bullets < MAX_BULLETS) {

    var currentTime = d.getTime();
    console.log("current: ", currentTime);
    elapsed = currentTime - lastBulletTime;
    console.log("elapsed: ", elapsed)

    // console.log("lastBulletTime: ", lastBulletTime);

    if (elapsed >= BULLET_DELAY) {
      
      console.log("fire");

      createBullet(me_id, currentTime);

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

function createBullet(player_id, t) {
  var player_bullets = bullets[player_id];
  player_bullets.push({"id": bulletIds.shift(), "x": me.x /*+ ((PLAYER_HEIGHT / 2) * -Math.sin(theta))*/, "y": me.y /*+ ((PLAYER_HEIGHT / 2) * -Math.cos(theta))*/, "v_x": BULLET_SPEED * -Math.sin(me.theta), "v_y": BULLET_SPEED * -Math.cos(me.theta),
  "fire_time": t, "elapsed_time": 0});
}

function updateBullet(bullet) {
  console.log("Bullet updated.");

  bullet.elapsed_time = d.getTime() - bullet.fire_time;

  if (bullet.elapsed_time >= BULLET_TIMEOUT) {
    destroyBullet(bullet.id);
    return;
  }

  if (bullet.v_y != 0 || bullet.v_x != 0) {  
    bullet.x += bullet.v_x;
    bullet.y += bullet.v_y;
  }
}

function destroyBullet(bullet_id) {
  var player_bullets = bullets[me_id];

  for (let i = 0; i < player_bullets.length; i++) {
    if (player_bullets[i].id == bullet_id) {
      player_bullets.splice(i, 1);
      break;
    }
  }

  bulletIds.push(bullet_id);
}

function update() {
  rotatePlayer(me);
  movePlayer(me);

  Object.values(bullets).forEach(player_bullets => player_bullets.forEach(updateBullet));

  // todo - update all others
}

export function getMeId() {
  return me_id;
}

export function getBullets() {
  return bullets;
}

export function getPlayers() {
  return players;
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

  initTime = d.getTime();

  console.log("bullet ids" + bulletIds);

  lastBulletTime = 0;
}
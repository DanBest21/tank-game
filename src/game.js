import { MAP_WIDTH, MAP_HEIGHT, MAX_BULLETS, BULLET_SPEED, BULLET_TIMEOUT, BULLET_DELAY, UPDATE_FPS, ROTATION_SPEED, SPEED, PLAYER_HEIGHT } from "./constants.js";
import { rotatePlayer, movePlayer, processCollisions} from "./physics.js"
import { newMap } from "./map.js";

const me_id = 0;

var dummy_me = {"x": MAP_WIDTH / 2, "y": MAP_HEIGHT / 2, "theta": 0, "speed": 0, "angular_velocity": 0};

var dummy_other = {"x": 100, "y": 100, "theta": 3, "speed": 0, "angular_velocity": 0};

var dummy_players = {0: dummy_me, 1: dummy_other};

var dummy_walls = newMap(20,10);

var dummy_bullets_0 = [];

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

export function onFire() {
    // how to implement delay between bullets?
  
    // console.log("onFire");
  
    var num_bullets = bullets[me_id].length;
    // console.log(num_bullets);
    // console.log(Object.keys(bullets[me_id]));
    // console.log(Object.keys(bullets[me_id]).length);
  
    var elapsed;
  
    if (num_bullets < MAX_BULLETS) {
      var d = new Date();
      var currentTime = d.getTime();
      // console.log("current: ", currentTime);
      elapsed = currentTime - lastBulletTime;
      // console.log("elapsed: ", elapsed)
  
      // console.log("lastBulletTime: ", lastBulletTime);
  
      if (elapsed >= BULLET_DELAY) {
        
        // console.log("fire");
  
        createBullet(me_id, currentTime);
  
        lastBulletTime = currentTime;
        // console.log("lastBulletTime: ", lastBulletTime);
      } else {
        // console.log("cannot fire: not enough time passed since last bullet")
      }
  
      // console.log("lastBulletTime: ", lastBulletTime);
  
    }
  
    // todo - check if bullet_delay surpassed
  
  }
  
export function createBullet(player_id, t) {
    var player_bullets = bullets[player_id];
    player_bullets.push({"id": bulletIds.shift(), "x": me.x /*+ ((PLAYER_HEIGHT / 2) * -Math.sin(theta))*/, "y": me.y /*+ ((PLAYER_HEIGHT / 2) * -Math.cos(theta))*/, "v_x": BULLET_SPEED * -Math.sin(me.theta), "v_y": BULLET_SPEED * -Math.cos(me.theta),
    "fire_time": t, "elapsed_time": 0});
}

export function updateBullet(bullet) {
    // console.log("Bullet updated.");

    var d = new Date();
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

export function destroyBullet(bullet_id) {
    var player_bullets = bullets[me_id];

    for (let i = 0; i < player_bullets.length; i++) {
        if (player_bullets[i].id == bullet_id) {
        player_bullets.splice(i, 1);
        break;
        }
    }

    bulletIds.push(bullet_id);
}

export function update() {
    rotatePlayer(me);
    movePlayer(me);

    Object.values(bullets).forEach(player_bullets => player_bullets.forEach(updateBullet));
}

var updateInterval;
export function startEventLoop() {
    clearInterval(updateInterval);
    updateInterval = setInterval(update, 1000 / UPDATE_FPS);

    var d = new Date();
    initTime = d.getTime();

    // console.log("bullet ids" + bulletIds);

    lastBulletTime = 0;
}

export function stopEventLoop() {
    // console.log("stopped event loop");

    clearInterval(updateInterval);
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
  
export function getWalls() {
    return walls;
}
  
export function onLeftPressed() {
    me.angular_velocity = ROTATION_SPEED;
}

export function onLeftReleased() {
    me.angular_velocity = 0;
}

export function onRightPressed() {
    me.angular_velocity = -1*ROTATION_SPEED;
}

export function onRightReleased() {
    me.angular_velocity = 0;
}

export function onUpPressed() {
    me.speed = SPEED;
}

export function onUpReleased() {
    me.speed = 0;
}

export function onDownPressed() {
    me.speed = -SPEED;
}

export function onDownReleased() {
    me.speed = 0;
}
// import { debounce } from 'throttle-debounce';
// import { getAsset } from './assets';
// import { getCurrentState } from './state';

import { getMe } from "./input.js"

// const Constants = require('../shared/constants');
const MAP_SIZE = 500;
const PLAYER_WIDTH = 10;
const PLAYER_HEIGHT = 20;

//const { PLAYER_RADIUS, PLAYER_MAX_HP, BULLET_RADIUS, MAP_SIZE } = Constants;

// Get the canvas graphics context
const canvas = document.getElementById('game-canvas');
const context = canvas.getContext('2d');
setCanvasDimensions();

function setCanvasDimensions() {
  // On small screens (e.g. phones), we want to "zoom out" so players can still see at least
  // 800 in-game units of width.
  canvas.width = canvas.height = MAP_SIZE;
  // const scaleRatio = Math.max(1, 800 / window.innerWidth);
  // canvas.width = scaleRatio * window.innerWidth;
  // canvas.height = scaleRatio * window.innerHeight;
}

// window.addEventListener('resize', debounce(40, setCanvasDimensions));

function render() {
  // const { me, others, bullets } = getCurrentState();
  // if (!me) {
  //   return;
  // }

  // Draw background
  // renderBackground(me.x, me.y);
  // var me = {"x": MAP_SIZE / 2, "y": MAP_SIZE / 2};
  var me = getMe();
  renderBackground(0, 0);

  // Draw all bullets
  // bullets.forEach(renderBullet.bind(null, me));

  // Draw all players
  // renderPlayer(me, me)
  renderPlayer(me, me)
  // others.forEach(renderPlayer.bind(null, me));
}

function renderBackground(x, y) {
  const backgroundX = MAP_SIZE / 2 - x + canvas.width / 2;
  const backgroundY = MAP_SIZE / 2 - y + canvas.height / 2;
  context.fillStyle = 'white';
  context.fillRect(0, 0, canvas.width, canvas.height);
}

// Renders a ship at the given coordinates
function renderPlayer(me, player) {
  const { x, y, theta } = player;
  // const canvasX = canvas.width / 2 + x - me.x;
  // const canvasX = canvas.width / 2;
  // const canvasY = canvas.height / 2 + y - me.y;
  // const canvasY = canvas.height / 2;

  context.strokeStyle = 'black';
  context.lineWidth = 1;
  // context.strokeRect(canvas.width / 2 - me.x, canvas.height / 2 - me.y, MAP_SIZE, MAP_SIZE);
  context.strokeRect(0, 0, MAP_SIZE, MAP_SIZE);

  // Draw ship
  context.save();
  context.translate(me.x, me.y);
  context.rotate(-theta);
  context.fillStyle = 'red';
  context.fillRect(
    -0.5*PLAYER_WIDTH,
    -0.5*(PLAYER_HEIGHT),
    PLAYER_WIDTH,
    PLAYER_HEIGHT,
  );
  context.restore();

  // Draw health bar
  // context.fillStyle = 'white';
  // context.fillRect(
  //   canvasX - PLAYER_RADIUS,
  //   canvasY + PLAYER_RADIUS + 8,
  //   PLAYER_RADIUS * 2,
  //   2,
  // );
  // context.fillStyle = 'red';
  // context.fillRect(
  //   canvasX - PLAYER_RADIUS + PLAYER_RADIUS * 2 * player.hp / PLAYER_MAX_HP,
  //   canvasY + PLAYER_RADIUS + 8,
  //   PLAYER_RADIUS * 2 * (1 - player.hp / PLAYER_MAX_HP),
  //   2,
  // );
}

function renderBullet(me, bullet) {
  const { x, y } = bullet;
  context.drawImage(
    getAsset('bullet.svg'),
    canvas.width / 2 + x - me.x - BULLET_RADIUS,
    canvas.height / 2 + y - me.y - BULLET_RADIUS,
    BULLET_RADIUS * 2,
    BULLET_RADIUS * 2,
  );
}

function renderMainMenu() {
  const t = Date.now() / 7500;
  const x = MAP_SIZE / 2 + 800 * Math.cos(t);
  const y = MAP_SIZE / 2 + 800 * Math.sin(t);
  // renderBackground(x, y);
}

let renderInterval = setInterval(renderMainMenu, 1000 / 60);

// Replaces main menu rendering with game rendering.
export function startRendering() {
  // alert("hello");
  // Draw boundaries
  clearInterval(renderInterval);
  renderInterval = setInterval(render, 1000 / 60);
}

// Replaces game rendering with main menu rendering.
export function stopRendering() {
  clearInterval(renderInterval);
  renderInterval = setInterval(renderMainMenu, 1000 / 60);
}
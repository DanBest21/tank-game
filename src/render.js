import { getMeId, getBullets, getPlayers } from "./input.js"


// todo - move constants to some shared location (obtained from server?)
import { MAP_WIDTH, MAP_HEIGHT, RENDER_FPS, PLAYER_HEIGHT, PLAYER_WIDTH, BULLET_RADIUS } from "./constants.js";

// const WALL_RADIUS = 2;

const canvas = document.getElementById('game-canvas');
const context = canvas.getContext('2d');
setCanvasDimensions();

function setCanvasDimensions() {
  // todo - later remake this to be zoomed in on player
  canvas.width = MAP_WIDTH;
  canvas.height = MAP_HEIGHT;
}

// todo? - debouncing for resizing events: 
// window.addEventListener('resize', debounce(40, setCanvasDimensions));

function render() {
  // todo - get all objects in world (current state)
  // const { me, others, bullets } = getCurrentState();
  var players = getPlayers();
  var me = players[getMeId()]; // dummy me
  var bullets = getBullets(); // todo - get
  var others;  // todo - get
  var walls;   // todo - get

  if (!me) {
    return;
  }

  renderBackground(0, 0);

  // todo - render walls

  // render player
  // renderPlayer(me, me)

  Object.values(players).forEach((player) => {renderPlayer(me, player)});

  // render bullets
  // bullets.forEach(renderBullet);

  Object.values(bullets).forEach(player_bullets => player_bullets.forEach(renderBullet));
  
  // todo - render others
}

function renderBackground(x, y) {
  context.fillStyle = 'white';
  context.fillRect(x, y, canvas.width, canvas.height);
}

// Renders a ship at the given coordinates
function renderPlayer(me, player) {
  const { x, y, theta } = player;

  // draw borders:
  context.strokeStyle = 'black';
  context.lineWidth = 1;
  context.strokeRect(0, 0, MAP_WIDTH, MAP_HEIGHT);

  // Draw player
  context.save();
  context.translate(player.x, player.y);
  context.rotate(-theta);
  context.fillStyle = 'red';
  context.fillRect(
    -0.5*PLAYER_WIDTH,
    -0.5*(PLAYER_HEIGHT),
    PLAYER_WIDTH,
    PLAYER_HEIGHT,
  );
  context.restore();
}

function renderBullet(bullet) {
  context.beginPath();
  context.arc(bullet.x, bullet.y, BULLET_RADIUS, 0, 2 * Math.PI);
  // context.stroke(); 
  context.fillStyle = 'black';
  context.fill();
}

let renderInterval;
export function startRendering() {
  // alert("hello");
  // Draw boundaries
  clearInterval(renderInterval);
  renderInterval = setInterval(render, 1000 / RENDER_FPS);
}

export function stopRendering() {
  // clearInterval(renderInterval);
  // renderInterval = setInterval(renderMainMenu, 1000 / 60);
}
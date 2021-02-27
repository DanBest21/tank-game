import { getMeId, getBullets, getPlayers, getWalls } from "./game.js"
import { MAP_WIDTH, MAP_HEIGHT, WALL_THICKNESS, RENDER_FPS, BULLET_RADIUS, RENDER_BOUNDING_BOX } from "./constants.js";

const canvas = document.getElementById('game-canvas');
const context = canvas.getContext('2d');
setCanvasDimensions();

function setCanvasDimensions() {
  // todo - later remake this to be zoomed in on player
  canvas.width = MAP_WIDTH;
  canvas.height = MAP_HEIGHT;
}

function render() {
  var players = getPlayers();
  var me = players[getMeId()];
  var bullets = getBullets();
  var walls = getWalls();

  if (!me) {
    return;
  }

  renderBackground(0, 0);
  renderWalls(walls);

  Object.values(players).forEach((player) => {renderPlayer(me, player)});

  Object.values(bullets).forEach(player_bullets => player_bullets.forEach(renderBullet));
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
    -0.5*player.width,
    -0.5*(player.height),
    player.width,
    player.height,
  );
  context.restore();

  if (RENDER_BOUNDING_BOX) {
    renderBoundingBox(player);
  }

}

function renderBoundingBox(player) {
  context.fillStyle="rgba(0, 0, 255, 0.5)";
  context.fillRect(
    // todo - stop dividing here, better to store the value somehow
    player.x-player.bounding_box.width/2,
    player.y-player.bounding_box.height,
    player.bounding_box.width,
    player.bounding_box.height
  )
}

function renderBullet(bullet) {
  context.beginPath();
  context.arc(bullet.x, bullet.y, BULLET_RADIUS, 0, 2 * Math.PI);
  context.fillStyle = 'black';
  context.fill();
}

function renderWalls(walls) {
  let vertical_wall, horizontal_wall;
  let wall_x, wall_y;

  let num_block_cols = walls[0].length;
  let num_block_rows = walls.length;

  let block_width = (canvas.width - WALL_THICKNESS) / (num_block_cols-1);
  let block_height = (canvas.height - WALL_THICKNESS) / (num_block_rows-1);

  for (let row=0; row<walls.length; row++) {
    for (let col=0; col<walls[row].length; col++) {

      vertical_wall = walls[row][col][1];
      horizontal_wall = walls[row][col][0];
      
      wall_x = col * block_width;
      wall_y = row * block_height;

      context.fillStyle = 'black';

      if (vertical_wall) {
        context.fillRect(
          wall_x,
          wall_y,
          WALL_THICKNESS,
          block_height
        );
      }

      if (horizontal_wall) {
        context.fillRect(
          wall_x,
          wall_y,
          block_width,
          WALL_THICKNESS
        );
      }
    }
  }
}

let renderInterval;
export function startRendering() {
  clearInterval(renderInterval);
  renderInterval = setInterval(render, 1000 / RENDER_FPS);
}

export function stopRendering() {
  clearInterval(renderInterval);
}
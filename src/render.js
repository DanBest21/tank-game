import { getMeId, getBullets, getPlayers, getWalls } from "./input.js"


// todo - move constants to some shared location (obtained from server?)
import { MAP_WIDTH, MAP_HEIGHT, WALL_THICKNESS, RENDER_FPS, PLAYER_HEIGHT, PLAYER_WIDTH, BULLET_RADIUS } from "./constants.js";

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
  var walls = getWalls();   // todo - get

  if (!me) {
    return;
  }

  renderBackground(0, 0);

  // todo - render walls
  renderWalls(walls);

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

function renderWalls(walls) {

  let vertical_wall, horizontal_wall;
  let wall_x, wall_y;

  let num_block_cols = walls[0].length;
  let num_block_rows = walls.length;

  // console.log("block nums: ", walls.length, walls[0].length);

  // console.log("canvas size: ", canvas.width, canvas.height);

  // console.log("canvas size: ", (canvas.width - WALL_THICKNESS), (canvas.height - WALL_THICKNESS));

  let block_width = (canvas.width - WALL_THICKNESS) / (num_block_cols-1);
  let block_height = (canvas.height - WALL_THICKNESS) / (num_block_rows-1);

  // console.log("block size: ", block_height, block_width);

  for (let row=0; row<walls.length; row++) {
    for (let col=0; col<walls[row].length; col++) {

      vertical_wall = walls[row][col][1];
      horizontal_wall = walls[row][col][0];
      
      wall_x = col * block_width;
      wall_y = row * block_height;

      // console.log("  ");
      // console.log("row, col: ", row, col);
      // console.log("wall position: ", wall_x, wall_y);
      // console.log("wall bool: ", vertical_wall, horizontal_wall);

      context.fillStyle = 'black';
  

      if (vertical_wall) {
        // todo - draw wall
        context.fillRect(
          wall_x,
          wall_y,
          WALL_THICKNESS,
          block_height
        );
      }

      if (horizontal_wall) {
        // todo - draw wall
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
  // alert("hello");
  // Draw boundaries
  clearInterval(renderInterval);
  renderInterval = setInterval(render, 1000 / RENDER_FPS);
}

export function stopRendering() {
  clearInterval(renderInterval);
  // console.log("stopped rendering");
  // renderInterval = setInterval(renderMainMenu, 1000 / 60);
}
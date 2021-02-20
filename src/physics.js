

export function processCollisions(state) {
    // todo - player and bullet collisions
    // todo - bullet and wall collisions
    // todo - player and player collisions
    
    // player and wall collisions:

}

export function rotatePlayer(player) {
    if (player.angular_velocity != 0) {
      player.theta += player.angular_velocity * Math.PI / 180;
    }
  }
  
export function movePlayer(player) {
    // todo - process collisions, and only update if conditions passed

    rotatePlayer(player);

    if (player.speed != 0) {
      player.x = player.x - (player.speed * Math.sin(player.theta))
      player.y = player.y - (player.speed * Math.cos(player.theta))
    }
}
  
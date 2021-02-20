

export function processCollisions() {

}

export function rotatePlayer(player) {
    if (player.angular_velocity != 0) {
      player.theta += player.angular_velocity * Math.PI / 180;
    }
  }
  
export function movePlayer(player) {
    if (player.speed != 0) {
      player.x = player.x - (player.speed * Math.sin(player.theta))
      player.y = player.y - (player.speed * Math.cos(player.theta))
    }
}
  
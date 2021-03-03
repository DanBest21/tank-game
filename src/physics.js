// todo - player and bullet collisions
// todo - bullet and wall collisions
// todo - player and player collisions

function isPlayerCollidingWithWall(player, walls) {
    // todo - somehow restrict which walls to search through (e.g. only those within given radius of player)


}

export function rotatePlayer(player) {
    console.log("new angle: " + player.theta)
    if (player.angular_velocity != 0) {
        player.theta += player.angular_velocity * Math.PI / 180;
    }
    if (player.theta > 2*Math.PI) {
        player.theta -= 2*Math.PI;
    } else if (player.theta < 0) {
        player.theta += 2*Math.PI;
    }
}
  
export function movePlayer(player) {
    // todo - process collisions, and only update if conditions passed
    rotatePlayer(player);

    if (player.speed != 0) {
        
        // get block
        // get coordinates relative to block origin
        // get bounding box width and height
        
        player.x = player.x - (player.speed * Math.sin(player.theta))
        player.y = player.y - (player.speed * Math.cos(player.theta))
    }
}
  
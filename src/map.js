export function newMap(width, height) {
    const map = [];
  
    const horizontalBorder = [[true, true]];
    for (let i = 1; i < width-1; i++) {
        horizontalBorder.push([true, false]);
    }
    horizontalBorder.push([false, true]);
  
    map.push(horizontalBorder);
  
    for (let i = 1; i < height-1; i++) {
        const row = [[false, true]];
        for (let j = 1; j < width-1; j++) {
            // row.push([Math.random() < 0.125, Math.random() < 0.125]);
            let a = Math.random() < 0.5
            row.push([a, !a]);
            // todo - replace with maze generation algorithm
        }
        row.push([false, true]);
        map.push(row);
    }
  
    map.push(horizontalBorder);
  
    return map;
  }
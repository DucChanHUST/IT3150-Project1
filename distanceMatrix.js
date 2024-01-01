const calculateDistance = (x1, y1, x2, y2) => {
  return Math.sqrt(Math.pow(x1 - x2, 2) + Math.pow(y1 - y2, 2));
}

const generateDistanceMatrix = (NODE_COORD_SECTION) => {
  const distanceMatrix = new Array(NODE_COORD_SECTION.length-1);

  for (let i = 1; i < NODE_COORD_SECTION.length-1; i++) {
    distanceMatrix[i] = new Array(i).fill(0);
    for (let j = 0; j < i; j++) {
      const { x: x1, y: y1 } = NODE_COORD_SECTION[i];
      const { x: x2, y: y2 } = NODE_COORD_SECTION[j];
      distanceMatrix[i][j] = calculateDistance(x1, y1, x2, y2);
    }
  }

  return distanceMatrix;
  // note that distanceMatrix[i][j] with i > j
}

module.exports = { generateDistanceMatrix };

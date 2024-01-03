const calculateCost = (distanceMatrix, route) => {
  let cost = 0;
  for (let i = 0; i < route.length; i++) {
    for (let j = 0; j < route[i].length - 1; j++) {
      route[i][j] > route[i][j + 1]
        ? (cost += distanceMatrix[route[i][j]][route[i][j + 1]])
        : (cost += distanceMatrix[route[i][j + 1]][route[i][j]]);
    }
  }
  return cost;
};

module.exports = { calculateCost };
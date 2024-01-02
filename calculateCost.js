const calculateCost = (distanceMatrix, route) => {
  let costs = [];
  for (let i = 0; i < route.length; i++) {
    let cost = 0;
    for (let j = 0; j < route[i].length - 1; j++) {
      route[i][j] > route[i][j + 1]
        ? (cost += distanceMatrix[route[i][j]][route[i][j + 1]])
        : (cost += distanceMatrix[route[i][j + 1]][route[i][j]]);
    }
    costs.push(cost);
  }
  // return cost;
  console.log(costs);
  const sum = costs.reduce((a, b) => a + b);
  console.log("total cost:", sum);
};

module.exports = { calculateCost };

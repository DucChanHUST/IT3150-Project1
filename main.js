// main.js
const { solution } = require("./solution");
const { readFile } = require("./readFile");
const { writeFile } = require("./writeFile");
const { calculateCost } = require("./calculateCost");
const { generateSavingListVigo } = require("./savingListVigo");
const { generateDistanceMatrix } = require("./distanceMatrix");

const filePath = "./dataset/A-n32-k5.vrp";

const CVRP = async () => {
  const { CAPACITY, trucks, DIMENSION, NODE_COORD_SECTION, DEMAND_SECTION } =
    await readFile(filePath);

  const distanceMatrix = generateDistanceMatrix(NODE_COORD_SECTION);

  let route;
  let cost = 9999;

  // lambda in [0; 3], mu in [0; 1], step size = 0.1
  for (let lambda = 0; lambda < 30; lambda++) {
    for (let mu = 0; mu < 10; mu++) {
      const newSavingList = generateSavingListVigo(distanceMatrix, lambda, mu);

      const newRoute = solution(
        newSavingList,
        trucks,
        CAPACITY,
        DEMAND_SECTION
      );

      try {
        const newCost = calculateCost(distanceMatrix, newRoute);
        if (newCost < cost) {
          route = newRoute;
          cost = newCost;
          console.log(lambda, mu, cost);
        }
      } catch (error) {}
    }
  }

  console.log(cost);
  writeFile(NODE_COORD_SECTION, route, cost);
};

CVRP();

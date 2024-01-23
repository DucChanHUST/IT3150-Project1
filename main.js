// main.js
const { solution } = require("./solution");
const { readFile } = require("./readFile");
const { writeFile } = require("./writeFile");
const { calculateCost } = require("./calculateCost");
const { generateSavingList } = require("./savingList");
const { generateSavingListGA } = require("./savingListGA");
const { generateDistanceMatrix } = require("./distanceMatrix");

const filePath = "./dataset/A-n32-k5.vrp";

const CVRP = async () => {
  const { CAPACITY, trucks, DIMENSION, NODE_COORD_SECTION, DEMAND_SECTION } =
    await readFile(filePath);

  const distanceMatrix = generateDistanceMatrix(NODE_COORD_SECTION);

  let route, cost, savingList, notImprovement;

  savingList = generateSavingList(distanceMatrix);
  route = solution(savingList, trucks, CAPACITY, DEMAND_SECTION);
  cost = calculateCost(distanceMatrix, route);

  const iteration = 10000;

  for (let index = 0; index < iteration; index++) {
    const newSavingList = generateSavingListGA(savingList);
    if (newSavingList.length) {
      const newRoute = solution(
        newSavingList,
        trucks,
        CAPACITY,
        DEMAND_SECTION
      );

      if (newRoute.length === 0) continue;

      try {
        const newCost = calculateCost(distanceMatrix, newRoute);
        if (newCost < cost) {
          route = newRoute;
          cost = newCost;
          savingList = newSavingList;
          notImprovement = 0;
          console.log(index, cost);
        } else {
          notImprovement++;
        }
      } catch (error) {}
    }

    if (notImprovement > 1000) {
      break;
    }
  }

  console.log(cost);
  writeFile(NODE_COORD_SECTION, route, cost);
};

CVRP();

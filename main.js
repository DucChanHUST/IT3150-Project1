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

  let route, cost, savingList;

  savingList = generateSavingList(distanceMatrix);
  route = solution(savingList, trucks, CAPACITY, DEMAND_SECTION);
  cost = calculateCost(distanceMatrix, route);

  const iteration = savingList.length * 1000;

  for (let index = 0; index < iteration; index++) {
    const newSavingList = generateSavingListGA(savingList);
    if (newSavingList.length) {
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
          savingList = newSavingList;
          console.log(index, cost);
        }
      } catch (error) {}
    }
  }

  console.log(cost);
  writeFile(NODE_COORD_SECTION, route, cost);
};

CVRP();

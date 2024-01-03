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

  const savingList = generateSavingList(distanceMatrix);
  let route, cost;
  let i =0;

  route = solution(savingList, trucks, CAPACITY, DEMAND_SECTION);
  cost = calculateCost(distanceMatrix, route);

  for (let index = 0; index < 100000; index++) {
    const newSavingList = generateSavingListGA(savingList);
    if (newSavingList.length) {
      i++;
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
          console.log("***");
        }
      } catch (error) {
        console.log("huhuu");
      }
    }
  }

  // console.log(route);
  console.log(cost);
  console.log(i);
  writeFile(NODE_COORD_SECTION, route, cost);
};

CVRP();

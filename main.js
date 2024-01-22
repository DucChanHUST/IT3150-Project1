// main.js
const { solution } = require("./solution");
const { readFile } = require("./readFile");
const { writeFile } = require("./writeFile");
const { calculateCost } = require("./calculateCost");
const { generateSavingList } = require("./savingList");
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

  console.log(cost);
  writeFile(NODE_COORD_SECTION, route, cost);
};

CVRP();

// main.js
const { readFile } = require("./readFile");
const { generateDistanceMatrix } = require("./distanceMatrix")
const { generateSavingList } = require("./savingList");

const filePath = "./dataset/A-n32-k5.vrp";

const CVRP = async () => {
  const { CAPACITY, trucks, DIMENSION, NODE_COORD_SECTION, DEMAND_SECTION } =
    await readFile(filePath);

  const distanceMatrix = generateDistanceMatrix(NODE_COORD_SECTION);

  const savingList = generateSavingList(distanceMatrix);

  console.log(savingList);

};

CVRP();

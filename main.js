// main.js
const { readFile } = require("./readFile");

const filePath = "./dataset/A-n32-k5.vrp";

const CVRP = async () => {
  const { CAPACITY, trucks, DIMENSION, NODE_COORD_SECTION, DEMAND_SECTION } =
    await readFile(filePath);

  console.log(DEMAND_SECTION);
};

CVRP();

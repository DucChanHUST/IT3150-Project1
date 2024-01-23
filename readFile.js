const fs = require("fs").promises;

const readFile = async (filePath) => {
  const data = await fs.readFile(filePath, "utf8");

  const lines = data.split("\n").map((line) => line.trim());

  const vrpData = {
    CAPACITY: 0,
    trucks: 5,
    DIMENSION: 0,
    NODE_COORD_SECTION: [],
    DEMAND_SECTION: [],
  };

  for (let i = 0; i < lines.length; i++) {
    const line = lines[i];

    if (line.includes("trucks")) {
      const noOfTrucksMatch = line.match(/No of trucks: (\d+)/);
      vrpData.trucks = noOfTrucksMatch ? parseInt(noOfTrucksMatch[1]) : null;
    }

    const [key, value] = line.split(/\s*:\s*/);

    switch (key) {
      case "CAPACITY":
        vrpData.CAPACITY = parseInt(value);
        break;
      case "DIMENSION":
        vrpData.DIMENSION = parseInt(value);
        break;
      case "NODE_COORD_SECTION":
        const nodeCoordSection = [];
        for (let j = i + 1; j < i + 1 + vrpData.DIMENSION; j++) {
          const [node, x, y] = lines[j].split(/\s+/);
          nodeCoordSection.push({
            node: parseInt(node),
            x: parseInt(x),
            y: parseInt(y),
          });
        }
        vrpData.NODE_COORD_SECTION = nodeCoordSection;
        i += vrpData.DIMENSION;
        break;
      case "DEMAND_SECTION":
        const demandSection = [];
        for (let j = i + 1; j < i + 1 + vrpData.DIMENSION; j++) {
          const [node, demand] = lines[j].split(/\s+/);
          demandSection.push({
            node: parseInt(node),
            demand: parseInt(demand),
          });
        }
        vrpData.DEMAND_SECTION = demandSection;
        i += vrpData.DIMENSION;
        break;
      default:
        break;
    }
  }

  return vrpData;
};

module.exports = { readFile };

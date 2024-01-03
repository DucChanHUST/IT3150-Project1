const fs = require("fs");

const writeFile = (node, route, cost) => {
  const jsonDataNode = JSON.stringify(node, null, 2);
  const jsonDataRoute = JSON.stringify(route, null, 2);
  const jsonDataCost = JSON.stringify(cost, null, 2);

  const filePathNode = "node-coord.json";
  const filePathRoute = "route-list.json";
  const filePathCost = "total-cost.json";

  fs.writeFile(filePathNode, jsonDataNode, "utf-8", (err) => {
    if (err) {
      console.error("Error writing to file:", err);
    } else {
      console.log(`node has been written to ${filePathNode}`);
    }
  });

  fs.writeFile(filePathRoute, jsonDataRoute, "utf-8", (err) => {
    if (err) {
      console.error("Error writing to file:", err);
    } else {
      console.log(`route has been written to ${filePathRoute}`);
    }
  });

  fs.writeFile(filePathCost, jsonDataCost, "utf-8", (err) => {
    if (err) {
      console.error("Error writing to file:", err);
    } else {
      console.log(`cost has been written to ${filePathCost}`);
    }
  });
};

module.exports = { writeFile };
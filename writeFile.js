const fs = require("fs");

const writeFile = (node, route) => {
  const jsonDataNode = JSON.stringify(node, null, 2);
  const jsonDataRoute = JSON.stringify(route, null, 2);

  const filePathNode = "node-coord.json";
  const filePathRoute = "route-list.json";

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
};

module.exports = { writeFile };
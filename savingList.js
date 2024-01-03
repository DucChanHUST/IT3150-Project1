const generateSavingList = (distanceMatrix) => {
  const savingList = [];
  for (let i = 1; i < distanceMatrix.length; i++) {
    for (let j = i + 1; j < distanceMatrix.length; j++) {
      savingList.push({
        i,
        j,
        saving:
          distanceMatrix[i][0] + distanceMatrix[j][0] - distanceMatrix[j][i],
      });
    }
  }

  savingList.sort((a, b) => b.saving - a.saving);

  return savingList;
};

module.exports = { generateSavingList };

const generateSavingListVigo = (distanceMatrix, lambda, mu) => {
  const savingList = [];
  for (let i = 1; i < distanceMatrix.length; i++) {
    for (let j = i + 1; j < distanceMatrix.length; j++) {
      savingList.push({
        i,
        j,
        saving:
          distanceMatrix[i][0] +
          distanceMatrix[j][0] -
          lambda * distanceMatrix[j][i] * 0.1 +
          mu * Math.abs(distanceMatrix[i][0] - distanceMatrix[j][0]) * 0.1, // 0.1 is the step size
      });
    }
  }

  savingList.sort((a, b) => b.saving - a.saving);

  return savingList;
};

module.exports = { generateSavingListVigo };

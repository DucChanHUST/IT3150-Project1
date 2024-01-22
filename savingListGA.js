const generateSavingListGA = (descSavingList) => {
  let newSavingList = [];
  const savingList = descSavingList.slice();

  const tournamentSize = Math.floor(Math.random() * 5) + 2;

  while (savingList.length) {
    const roulette =
      savingList.length >= tournamentSize
        ? savingList.slice(0, tournamentSize)
        : savingList;

    const sum = roulette.reduce(
      (accumulator, currentValue) => accumulator + currentValue.saving,
      0
    );

    const rouletteWheel = roulette.reduce((accumulator, currentValue) => {
      const probability = currentValue.saving / sum;
      accumulator.push(
        accumulator.length > 0
          ? accumulator[accumulator.length - 1] + probability
          : probability
      );
      return accumulator;
    }, []);

    const randomSpin = Math.random();

    let selectedIndex = -1;

    for (let i = 0; i < roulette.length; i++) {
      if (randomSpin < rouletteWheel[i]) {
        selectedIndex = i;
        break;
      }
    }

    if (selectedIndex !== -1) {
      newSavingList.push(savingList.splice(selectedIndex, 1)[0]);
    }
  }

  return newSavingList;
}

module.exports = {generateSavingListGA}
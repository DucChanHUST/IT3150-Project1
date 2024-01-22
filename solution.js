const solution = (savingList, trucks, CAPACITY, DEMAND_SECTION) => {
  let capacity = Array(trucks).fill(CAPACITY);
  let route = [];
  for (let i = 0; i < trucks; i++) {
    route.push([]);
  }

  let usedRoute = 0;

  savingList.map((item) => {
    // console.log(item);
    // merge
    for (let k = 0; k < usedRoute - 1; k++) {
      for (let l = k + 1; l < usedRoute; l++) {
        if (
          (route[k][0] === item.i && route[l][0] === item.j) ||
          (route[k][0] === item.j && route[l][0] === item.i)
        ) {
          if (capacity[k] >= CAPACITY - capacity[l]) {
            route[k] = route[l].reverse().concat(route[k]);
            capacity[k] -= CAPACITY - capacity[l];
            route.splice(l, 1);
            capacity.splice(l, 1);
            route.push([]);
            capacity.push(CAPACITY);
            usedRoute--;
            // console.log(route, "m1");
            // console.log(capacity);
            return;
          } else {
            return;
          }
        }

        if (
          (route[k][0] === item.i &&
            route[l][route[l].length - 1] === item.j) ||
          (route[k][0] === item.j && route[l][route[l].length - 1] === item.i)
        ) {
          if (capacity[k] >= CAPACITY - capacity[l]) {
            route[k] = route[l].concat(route[k]);
            capacity[k] -= CAPACITY - capacity[l];
            route.splice(l, 1);
            capacity.splice(l, 1);
            route.push([]);
            capacity.push(CAPACITY);
            usedRoute--;
            // console.log(route, "m2");
            // console.log(capacity);
            return;
          } else {
            return;
          }
        }

        if (
          (route[k][route[k].length - 1] === item.i &&
            route[l][0] === item.j) ||
          (route[k][route[k].length - 1] === item.j && route[l][0] === item.i)
        ) {
          if (capacity[k] >= CAPACITY - capacity[l]) {
            route[k] = route[k].concat(route[l]);
            capacity[k] -= CAPACITY - capacity[l];
            route.splice(l, 1);
            capacity.splice(l, 1);
            route.push([]);
            capacity.push(CAPACITY);
            usedRoute--;
            // console.log(route, "m3");
            // console.log(capacity);
            return;
          } else {
            return;
          }
        }

        if (
          (route[k][route[k].length - 1] === item.i &&
            route[l][route[l].length - 1] === item.j) ||
          (route[k][route[k].length - 1] === item.j &&
            route[l][route[l].length - 1] === item.i)
        ) {
          if (capacity[k] >= CAPACITY - capacity[l]) {
            route[k] = route[k].concat(route[l].reverse());
            capacity[k] -= CAPACITY - capacity[l];
            route.splice(l, 1);
            capacity.splice(l, 1);
            route.push([]);
            capacity.push(CAPACITY);
            usedRoute--;
            // console.log(route, "m4");
            // console.log(capacity);
            return;
          } else {
            return;
          }
        }
      }
    }

    // a. neither i nor j have already been assigned to a route,
    // in which case a new route is initiated including both i and j.

    if (usedRoute < trucks) {
      let check = true;
      for (let k = 0; k < usedRoute; k++) {
        if (route[k].includes(item.i) || route[k].includes(item.j)) {
          check = false;
          break;
        }
      }

      if (check) {
        route[usedRoute].push(item.i);
        route[usedRoute].push(item.j);
        capacity[usedRoute] -= DEMAND_SECTION[item.i].demand;
        capacity[usedRoute] -= DEMAND_SECTION[item.j].demand;
        usedRoute++;
        // console.log(route, "*");
        // console.log(capacity);
        return;
      }
    }

    // b. exactly one of the two points (i or j) has already been included
    // in an existing route and that point is not interior to that route
    // in which case the link (i, j) is added to that same route.

    for (let k = 0; k < usedRoute; k++) {
      if (checkExist(route, item.i, item.j)) {
        return;
      }

      if (
        route[k][0] === item.i &&
        capacity[k] >= DEMAND_SECTION[item.j].demand
      ) {
        route[k].unshift(item.j);
        capacity[k] -= DEMAND_SECTION[item.j].demand;
        // console.log(route, "a");
        // console.log(capacity);
        return;
      }

      if (
        route[k][0] === item.j &&
        capacity[k] >= DEMAND_SECTION[item.i].demand
      ) {
        route[k].unshift(item.i);
        capacity[k] -= DEMAND_SECTION[item.i].demand;
        // console.log(route, "b");
        // console.log(capacity);
        return;
      }

      if (
        route[k][route[k].length - 1] === item.i &&
        capacity[k] >= DEMAND_SECTION[item.j].demand
      ) {
        route[k].push(item.j);
        capacity[k] -= DEMAND_SECTION[item.j].demand;
        // console.log(route, "c");
        // console.log(capacity);
        return;
      }

      if (
        route[k][route[k].length - 1] === item.j &&
        capacity[k] >= DEMAND_SECTION[item.i].demand
      ) {
        route[k].push(item.i);
        capacity[k] -= DEMAND_SECTION[item.i].demand;
        // console.log(route, "d");
        // console.log(capacity);
        return;
      }
    }
  });

  route = route.map((item) => [0, ...item, 0]);

  return route;
};

module.exports = { solution };

const checkExist = (route, i, j) => {
  for (let k = 0; k < route.length; k++) {
    if (
      route[k].slice(1, -1).includes(i) ||
      route[k].slice(1, -1).includes(j) ||
      (route[k].includes(i) && route[k].includes(j))
    ) {
      return true;
    }
  }
  return false;
};


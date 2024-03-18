import read_file
import numpy as np
import random

trucks, dimension, capacity, node = read_file.read_file("dataset/A-n32-k5.vrp")

# các route ở đây không bao gồm depot
def create_routes(trucks, dimension):
    routes = np.zeros((trucks, dimension-1), dtype=int)
    for i in range(0, dimension-1):
        rand = np.random.randint(0, trucks)
        routes[rand][i] = 1
    return routes

def initialize_population(popSize, trucks, dimension, capacity, node):
    population = []
    i = 0
    demand = [row[2] for row in node[1:]]

    while i < popSize:
        routes = create_routes(trucks, dimension)
        payload = np.matmul(routes, demand)
        if all(payload <= capacity):
            population.append(routes)
            i += 1

    return population

print(initialize_population(10, trucks, dimension, capacity, node))
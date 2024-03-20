import random
import read_file
import numpy as np
import matplotlib.pyplot as plt

trucks, dimension, capacity, node_coord, demand = read_file.read_file("dataset/A-n32-k5.vrp")

def calculate_route_distance(route):
    distance = 0
    for i in range(0, len(route)-2):
        distance += np.sqrt((node_coord[route[i]][0] - node_coord[route[i+1]][0])**2 + (node_coord[route[i]][1] - node_coord[route[i+1]][1])**2)
    return distance

# các route ở đây không bao gồm depot
def initialize_population(dimension, popSize):
    population = []
    while len(population) < popSize:
        chromosome = random.sample(range(1, dimension), dimension-1)
        if chromosome not in population:
            population.append(chromosome)
    return population

def chromosome_to_route(chromosome):
    route = [0]
    load = 0
    truck = 0
    for i in chromosome:
        if load + demand[i] <= capacity:
            route.append(i)
            load += demand[i]
        else:
            # print(load)
            route.append(0)
            route.append(i)
            load = demand[i]
            truck += 1
    route.append(0)
    return route

def chromosome_to_route_fitness(chromosome):
    route = [0]
    load = 0
    truck = 0

    for i in chromosome:
        if load + demand[i] <= capacity:
            route.append(i)
            load += demand[i]
        else:
            # print(load)
            route.append(0)
            route.append(i)
            load = demand[i]
            truck += 1
    # print(load)
    route.append(0)
    # print(route)
    if truck > trucks:
        return 999999
    return calculate_route_distance(route)

def rank_population(population):
    population = np.array(population)
    fitness = []
    for chromosome in population:
        fitness.append(chromosome_to_route_fitness(chromosome))
    sorted_population = population[np.argsort(fitness)]
    # print(fitness)
    return sorted_population

def ordered_cross_over(parent1, parent2):
    size = len(parent1) #will be replace by dimension
    child1 = [] * size
    child2 = [] * size
    start, end = random.sample(range(size), 2)
    if start > end:
        start, end = end, start
    child1[start:end+1] = parent1[start:end+1]
    child2[start:end+1] = parent2[start:end+1]
    k1 = end+1
    k2 = end+1
    for i in range(0, size):
        if parent2[i] not in child1:
            child1.insert((k1) % size, parent2[i])
            k1+=1
        if parent1[i] not in child2:
            child2.insert((k2) % size, parent1[i])
            k2+=1
    return child1, child2

def mutation(chromosome):
    size = len(chromosome)
    i, j = random.sample(range(size), 2)
    chromosome[i], chromosome[j] = chromosome[j], chromosome[i]
    return chromosome


# select parents
# roulette wheel selection
def select_parents(population):
    fitness = np.array([chromosome_to_route_fitness(chromosome) for chromosome in population])
    total_fitness = np.sum(1/fitness)
    probability = 1/(fitness*total_fitness)
    probability = np.cumsum(probability)
    parents = []
    while len(parents) < 2:
        r = random.random()
        for i in range(len(population)):
            if r < probability[i]:
                parents.append(population[i])
                break
    return parents

def get_best_from_groups(population):
  size = len(population)
  group_sizes = [int(0.5*size), int(0.4*size), int(0.1*size)]
  group_starts = [0, group_sizes[0], group_sizes[0] + group_sizes[1]]

  best_chromosome = []
  for i in range(3):
    group = population[group_starts[i]:group_starts[i] + group_sizes[i]]
    best_chromosome.extend(group[:int(0.5 * len(group))])

  return best_chromosome

def genetic_algorithm(dimension, popSize, maxGen, mutationRate):
    progress = []
    population = initialize_population(dimension, popSize)
    rank_population(population)
    for _ in range(maxGen):
        for _ in range(popSize//2):
            parent1, parent2 = select_parents(population)
            child1, child2 = ordered_cross_over(parent1, parent2)
            if random.random() < mutationRate:
                child1 = mutation(child1)
            if random.random() < mutationRate:
                child2 = mutation(child2)
            population = np.append(population, [child1], axis=0)
            population = np.append(population, [child2], axis=0)

        population = rank_population(population)
        progress.append(chromosome_to_route_fitness(population[0]))
        print(chromosome_to_route_fitness(population[0]))
        # Đấu tranh sinh tồn
        # 1. Lấy ra n cá thể có fitness tốt nhất
        # population = population[:popSize]

        # 2. Chia làm 3 nhóm và lấy 50% tốt nhất của mỗi nhóm
        population = get_best_from_groups(population)

    plt.plot(progress)
    plt.ylabel('Distance')
    plt.xlabel('Generation')
    plt.show()

    return population[0]



best_chromosome = genetic_algorithm(dimension, 100, 500, 0.3)
print(chromosome_to_route(best_chromosome))

#TODO:
    # thử các phép lai ghép khác nhau
    # kết hợp GA và CW
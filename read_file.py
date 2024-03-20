def read_file(file_path):
    f = open(file_path, "r")
    lines = f.readlines()
    parts = lines[1].split("No of trucks: ")
    trucks = int(parts[1].split(",")[0])
    dimension = int(lines[3][12:].strip())
    capacity = int(lines[5][10:].strip())
    node_coord = []
    node_demand = []
    for i in range(dimension):
        [index, x, y] = lines[7 + i].split()
        [index, demand] = lines[8 + i + dimension].split()
        node_coord.append([int(x), int(y)])
        node_demand.append(int(demand))
    return trucks, dimension, capacity, node_coord, node_demand

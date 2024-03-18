def read_file(file_path):
    f = open(file_path, "r")
    lines = f.readlines()
    parts = lines[1].split("No of trucks: ")
    trucks = int(parts[1].split(",")[0])
    dimension = int(lines[3][12:].strip())
    capacity = int(lines[5][10:].strip())
    node = []
    for i in range(dimension):
        [index, x, y] = lines[7 + i].split()
        [index, demand] = lines[8 + i + dimension].split()
        node.append([int(x), int(y), int(demand)])
    return trucks, dimension, capacity, node

# node = [[x1, y1, demand1], [x2, y2, demand2], ...]
# node[0] ~ depot

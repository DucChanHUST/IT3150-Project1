import json
import matplotlib.pyplot as plt

with open('./node-coord.json', 'r') as file:
    coordinates = json.load(file)

with open('./route-list.json', 'r') as file:
    routes = json.load(file)

with open('./total-cost.json', 'r') as file:
    cost = json.load(file)

x_values = [node["x"] for node in coordinates]
y_values = [node["y"] for node in coordinates]

for i, node in enumerate(coordinates):
    color = 'red' if i == 0 else 'blue'
    plt.scatter(node["x"], node["y"], color=color)
    plt.annotate(f'{node["node"]}', (node["x"], node["y"]), textcoords="offset points", xytext=(0, 5), ha='center')

for route in routes:
    x_values = [coordinates[node]["x"] for node in route]
    y_values = [coordinates[node]["y"] for node in route]
    plt.plot(x_values, y_values, marker='o')

plt.xlabel('X-axis')
plt.ylabel('Y-axis')
plt.title('total cost: ' + str(cost))

plt.show()

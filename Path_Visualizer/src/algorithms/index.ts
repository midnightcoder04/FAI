interface NodeType {
  row: number;
  col: number;
  isStart: boolean;
  isEnd: boolean;
  isWall: boolean;
  isVisited: boolean;
  isPath: boolean;
  distance: number;
  previousNode: NodeType | null;
}

// --- BREADTH-FIRST SEARCH ---
// Explores all neighbors at the present depth prior to moving on to the nodes at the next depth level.
// Guarantees the shortest path in an unweighted grid.
export function bfs(grid: NodeType[][], startNode: NodeType, endNode: NodeType): NodeType[] {
    const visitedNodesInOrder: NodeType[] = [];
    const queue: NodeType[] = [startNode];
    startNode.isVisited = true;

    while (queue.length > 0) {
        const currentNode = queue.shift()!; // ! assumes queue is not empty
        visitedNodesInOrder.push(currentNode);

        if (currentNode === endNode) return visitedNodesInOrder;

        const neighbors = getUnvisitedNeighbors(currentNode, grid);
        for (const neighbor of neighbors) {
            neighbor.isVisited = true;
            neighbor.previousNode = currentNode;
            queue.push(neighbor);
        }
    }

    return visitedNodesInOrder; // Return visited nodes if path not found
}

// --- DEPTH-FIRST SEARCH ---
// Explores as far as possible along each branch before backtracking.
// Does NOT guarantee the shortest path.
export function dfs(grid: NodeType[][], startNode: NodeType, endNode: NodeType): NodeType[] {
    const visitedNodesInOrder: NodeType[] = [];
    const stack: NodeType[] = [startNode];

    while (stack.length > 0) {
        const currentNode = stack.pop()!;

        if (currentNode.isVisited) continue;
        
        currentNode.isVisited = true;
        visitedNodesInOrder.push(currentNode);

        if (currentNode === endNode) return visitedNodesInOrder;

        const neighbors = getUnvisitedNeighbors(currentNode, grid);
        for (const neighbor of neighbors.reverse()) { // Reverse to explore in a more "natural" order
            neighbor.previousNode = currentNode;
            stack.push(neighbor);
        }
    }

    return visitedNodesInOrder;
}

// --- Helper function to get neighbors ---
function getUnvisitedNeighbors(node: NodeType, grid: NodeType[][]): NodeType[] {
    const neighbors: NodeType[] = [];
    const { col, row } = node;
    if (row > 0) neighbors.push(grid[row - 1][col]);
    if (row < grid.length - 1) neighbors.push(grid[row + 1][col]);
    if (col > 0) neighbors.push(grid[row][col - 1]);
    if (col < grid[0].length - 1) neighbors.push(grid[row][col + 1]);
    return neighbors.filter(neighbor => !neighbor.isVisited && !neighbor.isWall);
}
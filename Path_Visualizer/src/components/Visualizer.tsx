import React, { useState, useEffect } from 'react';
import Node from './Node';
import Toolbar from './Toolbar';

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

type AlgorithmType = 'BFS' | 'DFS' | 'UCS' | 'A*';


// --- Placeholder for algorithm implementations ---
import { bfs, dfs /*, ucs, astar */ } from '../algorithms'; 

// --- Grid Configuration ---
const GRID_ROWS = 20;
const GRID_COLS = 50;
const START_NODE_ROW = 10;
const START_NODE_COL = 15;
const END_NODE_ROW = 10;
const END_NODE_COL = 35;

// --- Helper function to create the initial grid ---
const createInitialGrid = (): NodeType[][] => {
  const grid: NodeType[][] = [];
  for (let row = 0; row < GRID_ROWS; row++) {
    const currentRow: NodeType[] = [];
    for (let col = 0; col < GRID_COLS; col++) {
      currentRow.push(createNode(row, col));
    }
    grid.push(currentRow);
  }
  return grid;
};

// --- Helper function to create a single node ---
const createNode = (row: number, col: number): NodeType => {
  return {
    row,
    col,
    isStart: row === START_NODE_ROW && col === START_NODE_COL,
    isEnd: row === END_NODE_ROW && col === END_NODE_COL,
    isWall: false,
    isVisited: false,
    isPath: false,
    distance: Infinity,
    previousNode: null,
  };
};

// --- Helper to update a node's wall status immutably ---
const getNewGridWithWallToggled = (grid: NodeType[][], row: number, col: number): NodeType[][] => {
  const newGrid = grid.slice();
  const node = newGrid[row][col];
  if (node.isStart || node.isEnd) return newGrid; // Can't make start/end a wall
  const newNode = { ...node, isWall: !node.isWall };
  newGrid[row][col] = newNode;
  return newGrid;
};

const PathfindingVisualizer: React.FC = () => {
  const [grid, setGrid] = useState<NodeType[][]>([]);
  const [selectedAlgorithm, setSelectedAlgorithm] = useState<AlgorithmType>('BFS');
  const [isMousePressed, setIsMousePressed] = useState(false);
  const [isVisualizing, setIsVisualizing] = useState(false);

  useEffect(() => {
    setGrid(createInitialGrid());
  }, []);

  // --- Mouse Event Handlers for drawing walls ---
  const handleMouseDown = (row: number, col: number) => {
    if (isVisualizing) return;
    const newGrid = getNewGridWithWallToggled(grid, row, col);
    setGrid(newGrid);
    setIsMousePressed(true);
  };

  const handleMouseEnter = (row: number, col: number) => {
    if (!isMousePressed || isVisualizing) return;
    const newGrid = getNewGridWithWallToggled(grid, row, col);
    setGrid(newGrid);
  };

  const handleMouseUp = () => {
    setIsMousePressed(false);
  };

  // --- Clear Functions ---
  const clearBoard = () => {
    if (isVisualizing) return;
    setGrid(createInitialGrid());
  }

  const clearPath = () => {
    if (isVisualizing) return;
    const newGrid = grid.map(row => 
      row.map(node => {
        // Reset path/visited status, but keep walls, start, and end
        if(node.isVisited || node.isPath) {
          return {...node, isVisited: false, isPath: false, distance: Infinity, previousNode: null};
        }
        return node;
      })
    );
    setGrid(newGrid);
  }

  // --- Visualization Logic ---
  const animateSearch = (visitedNodesInOrder: NodeType[], nodesInShortestPathOrder: NodeType[]) => {
    for (let i = 0; i <= visitedNodesInOrder.length; i++) {
      // Animate the shortest path after the search is complete
      if (i === visitedNodesInOrder.length) {
        setTimeout(() => {
          animateShortestPath(nodesInShortestPathOrder);
        }, 10 * i);
        return;
      }
      // Animate the visited nodes
      setTimeout(() => {
        const node = visitedNodesInOrder[i];
        document.getElementById(`node-${node.row}-${node.col}`)!.className = 
          'w-6 h-6 border border-gray-400 inline-block animate-visited';
      }, 10 * i);
    }
  };

  const animateShortestPath = (nodesInShortestPathOrder: NodeType[]) => {
    for (let i = 0; i < nodesInShortestPathOrder.length; i++) {
      setTimeout(() => {
        const node = nodesInShortestPathOrder[i];
        document.getElementById(`node-${node.row}-${node.col}`)!.className = 
          'w-6 h-6 border border-gray-400 inline-block animate-path';
      }, 50 * i);
    }
    // Re-enable controls after animation is done
    setTimeout(() => setIsVisualizing(false), 50 * nodesInShortestPathOrder.length);
  };


  const visualizeAlgorithm = () => {
    if (isVisualizing) return;
    setIsVisualizing(true);
    clearPath(); // Clear previous path before new visualization

    // We have to use a timeout to allow the state update from clearPath() to render
    setTimeout(() => {
      const startNode = grid[START_NODE_ROW][START_NODE_COL];
      const endNode = grid[END_NODE_ROW][END_NODE_COL];

      let visitedNodesInOrder: NodeType[] = [];
      // This is where you would call your chosen algorithm
      switch (selectedAlgorithm) {
        case 'BFS':
          visitedNodesInOrder = bfs(grid, startNode, endNode);
          break;
        case 'DFS':
          visitedNodesInOrder = dfs(grid, startNode, endNode);
          break;
        // Add cases for Dijkstra and A* here
        default:
          break;
      }

      // Reconstruct the shortest path from the 'previousNode' pointers
      const nodesInShortestPathOrder: NodeType[] = [];
      let currentNode: NodeType | null = grid[endNode.row][endNode.col];
      while (currentNode !== null) {
        nodesInShortestPathOrder.unshift(currentNode);
        currentNode = currentNode.previousNode;
      }

      animateSearch(visitedNodesInOrder, nodesInShortestPathOrder);
    }, 50); // Small delay to ensure UI updates before heavy computation
  };
  
  return (
    <div className="flex flex-col items-center">
      <Toolbar 
        selectedAlgorithm={selectedAlgorithm}
        onAlgorithmChange={setSelectedAlgorithm}
        onVisualize={visualizeAlgorithm}
        onClearBoard={clearBoard}
        onClearPath={clearPath}
        isVisualizing={isVisualizing}
      />
      <div className="flex flex-col border border-gray-500">
        {grid.map((row, rowIndex) => (
          <div key={rowIndex} className="flex">
            {row.map((node, nodeIndex) => (
              <Node
                key={nodeIndex}
                {...node}
                onMouseDown={handleMouseDown}
                onMouseEnter={handleMouseEnter}
                onMouseUp={handleMouseUp}
              />
            ))}
          </div>
        ))}
      </div>
    </div>
  );
};

export default PathfindingVisualizer;
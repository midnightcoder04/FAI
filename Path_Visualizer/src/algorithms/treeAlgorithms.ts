import type { TreeNode, SearchResult } from '../types/TreeNode';

// Breadth-First Search for trees
export function treeBFS(root: TreeNode, goalNode: TreeNode): SearchResult {
  const visitedNodes: TreeNode[] = [];
  const queue: TreeNode[] = [root];
  const visited = new Set<string>();
  let visitOrder = 0;

  while (queue.length > 0) {
    const current = queue.shift()!;
    
    if (visited.has(current.id)) continue;
    
    visited.add(current.id);
    current.isVisited = true;
    current.visitOrder = visitOrder++;
    visitedNodes.push(current);

    // Found the goal
    if (current.id === goalNode.id) {
      const path = reconstructPath(current);
      return {
        visitedNodes,
        path,
        edges: [],
        found: true
      };
    }

    // Add children to queue
    for (const child of current.children) {
      if (!visited.has(child.id) && !child.isBlocked) {
        queue.push(child);
      }
    }
  }

  return {
    visitedNodes,
    path: [],
    edges: [],
    found: false
  };
}

// Depth-First Search for trees
export function treeDFS(root: TreeNode, goalNode: TreeNode): SearchResult {
  const visitedNodes: TreeNode[] = [];
  const visited = new Set<string>();
  let visitOrder = 0;

  function dfsRecursive(node: TreeNode): boolean {
    if (visited.has(node.id) || node.isBlocked) return false;
    
    visited.add(node.id);
    node.isVisited = true;
    node.visitOrder = visitOrder++;
    visitedNodes.push(node);

    // Found the goal
    if (node.id === goalNode.id) {
      return true;
    }

    // Recursively visit children
    for (const child of node.children) {
      if (dfsRecursive(child)) {
        return true;
      }
    }

    return false;
  }

  const found = dfsRecursive(root);
  const path = found ? reconstructPath(goalNode) : [];

  return {
    visitedNodes,
    path,
    edges: [],
    found
  };
}

// Iterative Deepening Search
export function iterativeDeepening(root: TreeNode, goalNode: TreeNode): SearchResult {
  const allVisitedNodes: TreeNode[] = [];
  let maxDepth = 0;
  
  // Find maximum depth in tree
  const findMaxDepth = (node: TreeNode, depth: number = 0): number => {
    let max = depth;
    for (const child of node.children) {
      max = Math.max(max, findMaxDepth(child, depth + 1));
    }
    return max;
  };
  
  maxDepth = findMaxDepth(root);
  
  for (let depth = 0; depth <= maxDepth; depth++) {
    const result = depthLimitedDFS(root, goalNode, depth);
    allVisitedNodes.push(...result.visitedNodes);
    
    if (result.found) {
      return {
        visitedNodes: allVisitedNodes,
        path: result.path,
        edges: [],
        found: true
      };
    }
  }

  return {
    visitedNodes: allVisitedNodes,
    path: [],
    edges: [],
    found: false
  };
}

// Depth-Limited DFS helper
function depthLimitedDFS(root: TreeNode, goalNode: TreeNode, maxDepth: number): SearchResult {
  const visitedNodes: TreeNode[] = [];
  const visited = new Set<string>();
  let visitOrder = 0;

  function dfsLimited(node: TreeNode, depth: number): boolean {
    if (depth > maxDepth || visited.has(node.id) || node.isBlocked) return false;
    
    visited.add(node.id);
    node.isVisited = true;
    node.visitOrder = visitOrder++;
    visitedNodes.push(node);

    if (node.id === goalNode.id) {
      return true;
    }

    for (const child of node.children) {
      if (dfsLimited(child, depth + 1)) {
        return true;
      }
    }

    return false;
  }

  const found = dfsLimited(root, 0);
  const path = found ? reconstructPath(goalNode) : [];

  return {
    visitedNodes,
    path,
    edges: [],
    found
  };
}

// Best-First Search (Greedy)
export function bestFirstSearch(root: TreeNode, goalNode: TreeNode): SearchResult {
  const visitedNodes: TreeNode[] = [];
  const visited = new Set<string>();
  let visitOrder = 0;

  // Simple heuristic: prefer nodes closer to goal alphabetically/numerically
  const heuristic = (node: TreeNode): number => {
    return Math.abs(parseInt(node.value.toString()) - parseInt(goalNode.value.toString()));
  };

  const priorityQueue: TreeNode[] = [root];

  while (priorityQueue.length > 0) {
    // Sort by heuristic (greedy approach)
    priorityQueue.sort((a, b) => heuristic(a) - heuristic(b));
    const current = priorityQueue.shift()!;

    if (visited.has(current.id)) continue;

    visited.add(current.id);
    current.isVisited = true;
    current.visitOrder = visitOrder++;
    visitedNodes.push(current);

    if (current.id === goalNode.id) {
      const path = reconstructPath(current);
      return {
        visitedNodes,
        path,
        edges: [],
        found: true
      };
    }

    for (const child of current.children) {
      if (!visited.has(child.id) && !child.isBlocked) {
        priorityQueue.push(child);
      }
    }
  }

  return {
    visitedNodes,
    path: [],
    edges: [],
    found: false
  };
}

// Helper function to reconstruct path from goal to root
function reconstructPath(goalNode: TreeNode): TreeNode[] {
  const path: TreeNode[] = [];
  let current: TreeNode | null = goalNode;

  while (current) {
    current.isPath = true;
    path.unshift(current);
    current = current.parent;
  }

  return path;
}

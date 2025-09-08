// Tree Node structure for visualization
export interface TreeNode {
  id: string;
  value: string | number;
  children: TreeNode[];
  parent: TreeNode | null;
  x: number;  // Position for rendering
  y: number;
  isStart: boolean;
  isGoal: boolean;
  isVisited: boolean;
  isPath: boolean;
  isBlocked: boolean;
  level: number;
  visitOrder?: number;
}

// Edge between nodes for visualization
export interface TreeEdge {
  from: TreeNode;
  to: TreeNode;
  isPath: boolean;
  isTraversed: boolean;
}

// Search result containing the path and visited nodes
export interface SearchResult {
  visitedNodes: TreeNode[];
  path: TreeNode[];
  edges: TreeEdge[];
  found: boolean;
}

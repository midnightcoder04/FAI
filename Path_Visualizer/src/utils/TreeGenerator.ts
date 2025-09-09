import type { TreeNode } from '../types/TreeNode';

// Single randomized tree generation with 2-4 depth and configurable max nodes
export function createRandomTree(maxNodes: number = 10): TreeNode {
  // Randomize depth between 2-4
  const maxDepth = Math.floor(Math.random() * 3) + 2; // 2, 3, or 4
  const maxBranching = 3;

  const root: TreeNode = {
    id: 'Start',
    value: 'Start',
    children: [],
    parent: null,
    x: 400,
    y: 50,
    isStart: true,
    isGoal: false,
    isVisited: false,
    isPath: false,
    isBlocked: false,
    level: 0
  };

  let nodeCounter = 1;
  const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';

  const buildTree = (node: TreeNode, remainingDepth: number, centerX: number, width: number) => {
    // Stop if we've reached max nodes or max depth
    if (remainingDepth <= 0 || getAllNodes(root).length >= maxNodes) return;

    // Dynamically adjust child count based on remaining nodes and depth
    const currentNodeCount = getAllNodes(root).length;
    const remainingNodes = maxNodes - currentNodeCount;
    
    // Reduce branching factor as we approach the limit
    let maxChildren = maxBranching;
    if (remainingNodes <= 5) {
      maxChildren = Math.min(2, remainingNodes - 1);
    } else if (remainingNodes <= 10) {
      maxChildren = Math.min(maxBranching, Math.floor(remainingNodes / 2));
    }

    if (maxChildren <= 0) return;

    // Randomize number of children (1 to maxChildren)
    const childCount = Math.floor(Math.random() * maxChildren) + 1;
    const childSpacing = width / (childCount + 1);

    for (let i = 0; i < childCount && getAllNodes(root).length < maxNodes; i++) {
      const childX = centerX - width/2 + childSpacing * (i + 1);
      const childY = node.y + 100;
      
      const child: TreeNode = {
        id: chars[nodeCounter % chars.length] + (Math.floor(nodeCounter / chars.length) || ''),
        value: chars[nodeCounter % chars.length],
        children: [],
        parent: node,
        x: Math.max(50, Math.min(750, childX)), // Keep within bounds
        y: childY,
        isStart: false,
        isGoal: false,
        isVisited: false,
        isPath: false,
        isBlocked: false,
        level: node.level + 1
      };

      nodeCounter++;
      node.children.push(child);
      
      // Recursively build children, but reduce width for next level
      buildTree(child, remainingDepth - 1, childX, width * 0.7);
    }
  };

  buildTree(root, maxDepth, 400, 600);

  // Set one random leaf node as goal (marked with 'A')
  const allNodes = getAllNodes(root);
  const leafNodes = allNodes.filter(n => n.children.length === 0 && n.level >= 1);
  if (leafNodes.length > 0) {
    // Randomly select just one leaf node as the goal
    const goalIndex = Math.floor(Math.random() * leafNodes.length);
    leafNodes[goalIndex].isGoal = true;
    leafNodes[goalIndex].value = 'A'; // Goal node is marked with 'A'
  }

  return root;
}

// Helper function to get all nodes in the tree
export function getAllNodes(root: TreeNode): TreeNode[] {
  const nodes: TreeNode[] = [];
  
  const traverse = (node: TreeNode) => {
    nodes.push(node);
    node.children.forEach(child => traverse(child));
  };
  
  traverse(root);
  return nodes;
}

// Add weights to tree edges for weighted algorithms
export function addWeightsToTree(root: TreeNode): TreeNode {
  const allNodes = getAllNodes(root);
  allNodes.forEach(node => {
    // Add random weight between 1 and 10 for each node (represents edge cost to this node)
    if (node.parent) {
      node.weight = Math.floor(Math.random() * 9) + 1;
    }
  });
  return root;
}

// Remove weights from tree edges
export function removeWeightsFromTree(root: TreeNode): TreeNode {
  const allNodes = getAllNodes(root);
  allNodes.forEach(node => {
    node.weight = undefined;
  });
  return root;
}

// Reset tree state for new search
export function resetTree(root: TreeNode): void {
  const allNodes = getAllNodes(root);
  allNodes.forEach(node => {
    node.isVisited = false;
    node.isPath = false;
  });
}
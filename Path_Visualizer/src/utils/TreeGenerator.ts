import type { TreeNode } from '../types/TreeNode';

// Create a sample binary tree for demonstration
export function createSampleTree(): TreeNode {
  const root: TreeNode = {
    id: 'A',
    value: 'A',
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

  // Level 1
  const nodeB: TreeNode = {
    id: 'B',
    value: 'B',
    children: [],
    parent: root,
    x: 200,
    y: 150,
    isStart: false,
    isGoal: false,
    isVisited: false,
    isPath: false,
    isBlocked: false,
    level: 1
  };

  const nodeC: TreeNode = {
    id: 'C',
    value: 'C',
    children: [],
    parent: root,
    x: 600,
    y: 150,
    isStart: false,
    isGoal: false,
    isVisited: false,
    isPath: false,
    isBlocked: false,
    level: 1
  };

  root.children = [nodeB, nodeC];

  // Level 2
  const nodeD: TreeNode = {
    id: 'D',
    value: 'D',
    children: [],
    parent: nodeB,
    x: 100,
    y: 250,
    isStart: false,
    isGoal: false,
    isVisited: false,
    isPath: false,
    isBlocked: false,
    level: 2
  };

  const nodeE: TreeNode = {
    id: 'E',
    value: 'E',
    children: [],
    parent: nodeB,
    x: 300,
    y: 250,
    isStart: false,
    isGoal: false,
    isVisited: false,
    isPath: false,
    isBlocked: false,
    level: 2
  };

  const nodeF: TreeNode = {
    id: 'F',
    value: 'F',
    children: [],
    parent: nodeC,
    x: 500,
    y: 250,
    isStart: false,
    isGoal: true,
    isVisited: false,
    isPath: false,
    isBlocked: false,
    level: 2
  };

  const nodeG: TreeNode = {
    id: 'G',
    value: 'G',
    children: [],
    parent: nodeC,
    x: 700,
    y: 250,
    isStart: false,
    isGoal: false,
    isVisited: false,
    isPath: false,
    isBlocked: false,
    level: 2
  };

  nodeB.children = [nodeD, nodeE];
  nodeC.children = [nodeF, nodeG];

  // Level 3
  const nodeH: TreeNode = {
    id: 'H',
    value: 'H',
    children: [],
    parent: nodeD,
    x: 50,
    y: 350,
    isStart: false,
    isGoal: false,
    isVisited: false,
    isPath: false,
    isBlocked: false,
    level: 3
  };

  const nodeI: TreeNode = {
    id: 'I',
    value: 'I',
    children: [],
    parent: nodeD,
    x: 150,
    y: 350,
    isStart: false,
    isGoal: false,
    isVisited: false,
    isPath: false,
    isBlocked: false,
    level: 3
  };

  const nodeJ: TreeNode = {
    id: 'J',
    value: 'J',
    children: [],
    parent: nodeE,
    x: 250,
    y: 350,
    isStart: false,
    isGoal: false,
    isVisited: false,
    isPath: false,
    isBlocked: false,
    level: 3
  };

  const nodeK: TreeNode = {
    id: 'K',
    value: 'K',
    children: [],
    parent: nodeE,
    x: 350,
    y: 350,
    isStart: false,
    isGoal: false,
    isVisited: false,
    isPath: false,
    isBlocked: false,
    level: 3
  };

  nodeD.children = [nodeH, nodeI];
  nodeE.children = [nodeJ, nodeK];

  return root;
}

// Create a more complex tree for better visualization
export function createLargeTree(): TreeNode {
  const root: TreeNode = {
    id: 'Root',
    value: 'Root',
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

  // Helper to create nodes
  let nodeId = 1;
  const createNode = (parentNode: TreeNode, x: number, y: number, value?: string): TreeNode => {
    const node: TreeNode = {
      id: value || nodeId.toString(),
      value: value || nodeId.toString(),
      children: [],
      parent: parentNode,
      x,
      y,
      isStart: false,
      isGoal: false,
      isVisited: false,
      isPath: false,
      isBlocked: false,
      level: parentNode.level + 1
    };
    nodeId++;
    parentNode.children.push(node);
    return node;
  };

  // Build a more balanced and interesting tree structure
  // Level 1 - 3 main branches
  const level1Nodes = [
    createNode(root, 200, 120, 'A'),
    createNode(root, 400, 120, 'B'), 
    createNode(root, 600, 120, 'C')
  ];

  // Level 2 - Each branch splits differently
  const level2Nodes: TreeNode[] = [];
  
  // Branch A - binary split
  level2Nodes.push(createNode(level1Nodes[0], 150, 200, 'D'));
  level2Nodes.push(createNode(level1Nodes[0], 250, 200, 'E'));

  // Branch B - ternary split
  level2Nodes.push(createNode(level1Nodes[1], 320, 200, 'F'));
  level2Nodes.push(createNode(level1Nodes[1], 400, 200, 'G'));
  level2Nodes.push(createNode(level1Nodes[1], 480, 200, 'H'));

  // Branch C - single child
  level2Nodes.push(createNode(level1Nodes[2], 600, 200, 'I'));

  // Level 3 - Add some more depth
  createNode(level2Nodes[0], 100, 280, 'J'); // D's child
  createNode(level2Nodes[0], 200, 280, 'K'); // D's child

  createNode(level2Nodes[1], 250, 280, 'L'); // E's child

  createNode(level2Nodes[2], 320, 280, 'M'); // F's child

  createNode(level2Nodes[3], 380, 280, 'N'); // G's child
  createNode(level2Nodes[3], 420, 280, 'O'); // G's child

  // I has multiple children
  createNode(level2Nodes[5], 560, 280, 'P'); // I's child
  createNode(level2Nodes[5], 640, 280, 'Q'); // I's child

  // Level 4 - Some leaf nodes
  const allNodes = getAllNodes(root);
  const someLevel3Nodes = allNodes.filter(n => n.level === 3);
  
  if (someLevel3Nodes.length > 2) {
    createNode(someLevel3Nodes[1], 230, 360, 'R');
    createNode(someLevel3Nodes[4], 400, 360, 'S');
    createNode(someLevel3Nodes[6], 620, 360, 'T');
  }

  // Mark one of the deeper leaf nodes as goal
  const leafNodes = getAllNodes(root).filter(n => n.children.length === 0);
  if (leafNodes.length > 0) {
    // Choose a goal that's reasonably deep but not the deepest
    const targetIndex = Math.floor(leafNodes.length * 0.6);
    leafNodes[targetIndex].isGoal = true;
  }

  return root;
}

// Create a random tree with specified depth and branching
export function createRandomTree(maxDepth: number = 4, maxBranching: number = 3): TreeNode {
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
    if (remainingDepth <= 0) return;

    const childCount = Math.floor(Math.random() * maxBranching) + 1;
    const childSpacing = width / (childCount + 1);

    for (let i = 0; i < childCount; i++) {
      const childX = centerX - width/2 + childSpacing * (i + 1);
      const childY = node.y + 100;
      
      const child: TreeNode = {
        id: chars[nodeCounter % chars.length] + Math.floor(nodeCounter / chars.length),
        value: chars[nodeCounter % chars.length] + (Math.floor(nodeCounter / chars.length) || ''),
        children: [],
        parent: node,
        x: childX,
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

  // Set a random leaf as goal
  const allNodes = getAllNodes(root);
  const leafNodes = allNodes.filter(n => n.children.length === 0 && n.level >= 2);
  if (leafNodes.length > 0) {
    const goalIndex = Math.floor(Math.random() * leafNodes.length);
    leafNodes[goalIndex].isGoal = true;
  }

  return root;
}

// Helper function to get all nodes in the tree
export function getAllNodes(root: TreeNode): TreeNode[] {
  const nodes: TreeNode[] = [];
  const queue = [root];
  
  while (queue.length > 0) {
    const current = queue.shift()!;
    nodes.push(current);
    queue.push(...current.children);
  }
  
  return nodes;
}

// Reset tree state for new search
export function resetTree(root: TreeNode): void {
  const allNodes = getAllNodes(root);
  allNodes.forEach(node => {
    node.isVisited = false;
    node.isPath = false;
    node.visitOrder = undefined;
  });
}

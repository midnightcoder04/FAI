import React from 'react';
import type { TreeNode } from '../types/TreeNode';

interface TreeNodeComponentProps {
  node: TreeNode;
  onNodeClick: (node: TreeNode) => void;
  animationDelay?: number;
}

const TreeNodeComponent: React.FC<TreeNodeComponentProps> = ({
  node,
  onNodeClick,
  animationDelay = 0,
}) => {
  // Determine node appearance based on its state
  const getNodeClass = () => {
    const baseClass = "absolute w-12 h-12 rounded-full border-2 flex items-center justify-center text-sm font-bold cursor-pointer transition-all duration-300 transform hover:scale-110 animate-node-entrance";
    
    if (node.isStart) {
      return `${baseClass} bg-green-500 border-green-600 text-white shadow-lg animate-start-glow`;
    }
    if (node.isGoal) {
      return `${baseClass} bg-red-500 border-red-600 text-white shadow-lg animate-goal-pulse`;
    }
    if (node.isBlocked) {
      return `${baseClass} bg-gray-800 border-gray-900 text-gray-400 cursor-not-allowed`;
    }
    if (node.isPath) {
      return `${baseClass} bg-yellow-400 border-yellow-500 text-black shadow-lg animate-tree-path`;
    }
    if (node.isVisited) {
      return `${baseClass} bg-blue-400 border-blue-500 text-white shadow-md animate-tree-visited`;
    }
    
    // Default unvisited node
    return `${baseClass} bg-white border-gray-300 text-gray-800 hover:border-blue-400 hover:shadow-lg`;
  };

  const style: React.CSSProperties = {
    left: `${node.x - 24}px`, // Center the node (24px = half of 48px width)
    top: `${node.y - 24}px`,  // Center the node (24px = half of 48px height)
    animationDelay: `${animationDelay}ms`,
  };

  return (
    <div
      className={getNodeClass()}
      style={style}
      onClick={() => onNodeClick(node)}
      title={`Node ${node.value}${node.visitOrder !== undefined ? ` (visited: ${node.visitOrder + 1})` : ''}`}
    >
      {node.value}
      {node.visitOrder !== undefined && (
        <span className="absolute -top-2 -right-2 bg-purple-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
          {node.visitOrder + 1}
        </span>
      )}
    </div>
  );
};

export default TreeNodeComponent;

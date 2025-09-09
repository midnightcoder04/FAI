import React from 'react';
import type { TreeNode } from '../types/TreeNode';

interface TreeEdgeProps {
  from: TreeNode;
  to: TreeNode;
  isPath?: boolean;
  isTraversed?: boolean;
  animationDelay?: number;
  showWeights?: boolean;
}

const TreeEdge: React.FC<TreeEdgeProps> = ({
  from,
  to,
  isPath = false,
  isTraversed = false,
  animationDelay = 0,
  showWeights = false,
}) => {
  // Calculate the line position and angle
  const dx = to.x - from.x;
  const dy = to.y - from.y;
  const length = Math.sqrt(dx * dx + dy * dy);
  const angle = Math.atan2(dy, dx) * (180 / Math.PI);

  // Position the line at the center of the 'from' node
  const style: React.CSSProperties = {
    position: 'absolute',
    left: `${from.x}px`,
    top: `${from.y}px`,
    width: `${length}px`,
    height: '2px',
    transformOrigin: '0 50%',
    transform: `rotate(${angle}deg)`,
    animationDelay: `${animationDelay}ms`,
  };

  // Determine edge appearance
  const getEdgeClass = () => {
    const baseClass = "transition-all duration-500 animate-edge-entrance";
    
    if (isPath) {
      return `${baseClass} bg-gradient-to-r from-yellow-400 to-yellow-500 shadow-lg animate-pulse`;
    }
    if (isTraversed) {
      return `${baseClass} bg-gradient-to-r from-blue-400 to-blue-500 animate-edge-draw`;
    }
    
    // Default edge
    return `${baseClass} bg-gray-400 opacity-60`;
  };

  return (
    <>
      <div
        className={getEdgeClass()}
        style={style}
      />
      {/* Weight label */}
      {showWeights && to.weight && (
        <div
          className="absolute bg-gray-700 text-white text-xs px-1 py-0.5 rounded border border-gray-500 pointer-events-none"
          style={{
            left: `${from.x + (to.x - from.x) * 0.5 - 8}px`,
            top: `${from.y + (to.y - from.y) * 0.5 - 12}px`,
            zIndex: 10,
          }}
        >
          {to.weight}
        </div>
      )}
    </>
  );
};

export default TreeEdge;

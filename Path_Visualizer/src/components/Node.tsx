import React from 'react';

// Define the structure of a single node
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

interface NodeProps extends NodeType {
  onMouseDown: (row: number, col: number) => void;
  onMouseEnter: (row: number, col: number) => void;
  onMouseUp: () => void;
}

const Node: React.FC<NodeProps> = ({
  row,
  col,
  isStart,
  isEnd,
  isWall,
  isVisited,
  isPath,
  onMouseDown,
  onMouseEnter,
  onMouseUp,
}) => {
  // Determine the node's appearance with Tailwind CSS classes
  const extraClassName = isEnd
    ? 'bg-red-500'
    : isStart
    ? 'bg-green-500'
    : isPath
    ? 'bg-yellow-400 animate-path' // Custom animation for path
    : isWall
    ? 'bg-gray-700 animate-wall'   // Custom animation for walls
    : isVisited
    ? 'bg-cyan-500 animate-visited' // Custom animation for visited nodes
    : 'bg-white';

  return (
    <div
      id={`node-${row}-${col}`}
      className={`w-6 h-6 border border-gray-400 inline-block ${extraClassName}`}
      onMouseDown={() => onMouseDown(row, col)}
      onMouseEnter={() => onMouseEnter(row, col)}
      onMouseUp={() => onMouseUp()}
    ></div>
  );
};

export default Node;
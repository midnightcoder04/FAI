import React from 'react';
type AlgorithmType = 'BFS' | 'DFS' | 'UCS' | 'A*';

interface ToolbarProps {
  selectedAlgorithm: AlgorithmType;
  onAlgorithmChange: (algorithm: AlgorithmType) => void;
  onVisualize: () => void;
  onClearBoard: () => void;
  onClearPath: () => void;
  isVisualizing: boolean;
}

const ALGORITHMS: AlgorithmType[] = ['BFS', 'DFS', 'UCS', 'A*'];

const Toolbar: React.FC<ToolbarProps> = ({
  selectedAlgorithm,
  onAlgorithmChange,
  onVisualize,
  onClearBoard,
  onClearPath,
  isVisualizing,
}) => {
  const baseButtonClass = "px-4 py-2 rounded-md text-sm font-medium transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-800";
  const primaryButtonClass = `${baseButtonClass} text-white bg-indigo-600 hover:bg-indigo-700 disabled:bg-indigo-400 disabled:cursor-not-allowed`;
  const secondaryButtonClass = `${baseButtonClass} text-gray-300 bg-gray-700 hover:bg-gray-600 disabled:bg-gray-500 disabled:cursor-not-allowed`;
  const selectClass = "bg-gray-700 border border-gray-600 text-white text-sm rounded-lg focus:ring-indigo-500 focus:border-indigo-500 block w-full p-2.5";

  return (
    <div className="w-full bg-gray-800 p-4 mb-4 rounded-lg shadow-lg flex flex-col md:flex-row items-center justify-center gap-4">
      <div className="flex items-center gap-2">
        <label htmlFor="algorithm-select" className="font-medium">Algorithm:</label>
        <select
          id="algorithm-select"
          value={selectedAlgorithm}
          onChange={(e) => onAlgorithmChange(e.target.value as AlgorithmType)}
          disabled={isVisualizing}
          className={selectClass}
        >
          {ALGORITHMS.map(algo => (
            <option key={algo} value={algo}>{algo}</option>
          ))}
        </select>
      </div>

      <button
        onClick={onVisualize}
        disabled={isVisualizing}
        className={primaryButtonClass}
      >
        Visualize {selectedAlgorithm}!
      </button>

      <div className="flex gap-2">
        <button
          onClick={onClearPath}
          disabled={isVisualizing}
          className={secondaryButtonClass}
        >
          Clear Path
        </button>
        <button
          onClick={onClearBoard}
          disabled={isVisualizing}
          className={secondaryButtonClass}
        >
          Clear Board & Walls
        </button>
      </div>
    </div>
  );
};

export default Toolbar;
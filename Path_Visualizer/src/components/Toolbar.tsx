import React from 'react';
type AlgorithmType = 'BFS' | 'DFS' | 'Iterative Deepening' | 'Best-First Search';

interface ToolbarProps {
  selectedAlgorithm: AlgorithmType;
  onAlgorithmChange: (algorithm: AlgorithmType) => void;
  onVisualize: () => void;
  onClearBoard: () => void;
  onClearPath: () => void;
  onGenerateTree: () => void;
  isVisualizing: boolean;
}

const ALGORITHMS: AlgorithmType[] = ['BFS', 'DFS', 'Iterative Deepening', 'Best-First Search'];

const Toolbar: React.FC<ToolbarProps> = ({
  selectedAlgorithm,
  onAlgorithmChange,
  onVisualize,
  onClearBoard,
  onClearPath,
  onGenerateTree,
  isVisualizing,
}) => {
  return (
    <div className="w-full bg-gray-800 p-3 mb-4 rounded-lg shadow-lg">
      <div className="flex flex-wrap items-center gap-3">
        {/* Algorithm Selection */}
        <div className="flex items-center gap-2">
          <label htmlFor="algorithm-select" className="font-medium text-xs whitespace-nowrap">Algorithm:</label>
          <select
            id="algorithm-select"
            value={selectedAlgorithm}
            onChange={(e) => onAlgorithmChange(e.target.value as AlgorithmType)}
            disabled={isVisualizing}
            className="bg-gray-700 border border-gray-600 text-white text-xs rounded-lg focus:ring-indigo-500 focus:border-indigo-500 p-1.5 min-w-[120px]"
          >
            {ALGORITHMS.map(algo => (
              <option key={algo} value={algo}>{algo}</option>
            ))}
          </select>
        </div>

        {/* Main Action Button */}
        <button
          onClick={onVisualize}
          disabled={isVisualizing}
          className="px-3 py-1.5 rounded-md text-xs font-medium bg-indigo-600 hover:bg-indigo-700 disabled:bg-indigo-400 disabled:cursor-not-allowed text-white transition-colors"
        >
          {isVisualizing ? 'Visualizing...' : `Visualize!`}
        </button>

        {/* Control Buttons */}
        <div className="flex gap-1">
          <button
            onClick={onGenerateTree}
            disabled={isVisualizing}
            className="px-2 py-1.5 rounded-md text-xs font-medium bg-gray-700 hover:bg-gray-600 disabled:bg-gray-500 disabled:cursor-not-allowed text-gray-300 transition-colors"
          >
            New Tree
          </button>
          <button
            onClick={onClearPath}
            disabled={isVisualizing}
            className="px-2 py-1.5 rounded-md text-xs font-medium bg-gray-700 hover:bg-gray-600 disabled:bg-gray-500 disabled:cursor-not-allowed text-gray-300 transition-colors"
          >
            Clear Path
          </button>
          <button
            onClick={onClearBoard}
            disabled={isVisualizing}
            className="px-2 py-1.5 rounded-md text-xs font-medium bg-gray-700 hover:bg-gray-600 disabled:bg-gray-500 disabled:cursor-not-allowed text-gray-300 transition-colors"
          >
            Reset
          </button>
        </div>
      </div>
    </div>
  );
};

export default Toolbar;
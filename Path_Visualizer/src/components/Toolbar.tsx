import React from 'react';
type AlgorithmType = 'BFS' | 'DFS' | 'UCS' | 'A*';

interface ToolbarProps {
  selectedAlgorithm: AlgorithmType;
  onAlgorithmChange: (algorithm: AlgorithmType) => void;
  onVisualize: () => void;
  onClearBoard: () => void;
  onClearPath: () => void;
  onGenerateTree: () => void;
  isVisualizing: boolean;
  isWeighted: boolean;
  onWeightedToggle: (weighted: boolean) => void;
  maxNodes: number;
  onMaxNodesChange: (maxNodes: number) => void;
}

const ALGORITHMS: AlgorithmType[] = ['BFS', 'DFS', 'UCS', 'A*'];

const Toolbar: React.FC<ToolbarProps> = ({
  selectedAlgorithm,
  onAlgorithmChange,
  onVisualize,
  onClearBoard,
  onClearPath,
  onGenerateTree,
  isVisualizing,
  isWeighted,
  onWeightedToggle,
  maxNodes,
  onMaxNodesChange,
}) => {
  return (
    <div className="w-full bg-gray-800 p-3 rounded-lg shadow-lg min-w-0">
      <div className="flex flex-col gap-3 min-w-0">
        {/* Algorithm Selection */}
        <div className="flex flex-col gap-1">
          <label htmlFor="algorithm-select" className="font-medium text-xs text-gray-300">Algorithm:</label>
          <select
            id="algorithm-select"
            value={selectedAlgorithm}
            onChange={(e) => onAlgorithmChange(e.target.value as AlgorithmType)}
            disabled={isVisualizing}
            className="bg-gray-700 border border-gray-600 text-white text-xs rounded-lg focus:ring-indigo-500 focus:border-indigo-500 p-1.5 w-full"
          >
            {ALGORITHMS.map(algo => (
              <option key={algo} value={algo}>{algo}</option>
            ))}
          </select>
        </div>

        {/* Settings Row */}
        <div className="flex flex-col gap-2">
          {/* Weighted Toggle */}
          <label className="flex items-center gap-2 text-xs font-medium cursor-pointer">
            <input
              type="checkbox"
              checked={isWeighted}
              onChange={(e) => onWeightedToggle(e.target.checked)}
              disabled={isVisualizing}
              className="w-3 h-3 text-indigo-600 bg-gray-700 border-gray-600 rounded focus:ring-indigo-500"
            />
            <span className="text-gray-300">Weighted</span>
          </label>

          {/* Max Nodes Input */}
          <div className="flex flex-col gap-1">
            <label htmlFor="max-nodes-input" className="font-medium text-xs text-gray-300">Max Nodes:</label>
            <input
              id="max-nodes-input"
              type="number"
              value={maxNodes}
              onChange={(e) => onMaxNodesChange(Math.max(3, Math.min(30, parseInt(e.target.value) || 10)))}
              disabled={isVisualizing}
              min="3"
              max="30"
              className="bg-gray-700 border border-gray-600 text-white text-xs rounded-lg focus:ring-indigo-500 focus:border-indigo-500 p-1.5 w-full text-center"
            />
          </div>
        </div>

        {/* Main Action Button */}
        <button
          onClick={onVisualize}
          disabled={isVisualizing}
          className="w-full px-3 py-2 rounded-md text-xs font-medium bg-indigo-600 hover:bg-indigo-700 disabled:bg-indigo-400 disabled:cursor-not-allowed text-white transition-colors min-h-[32px] flex items-center justify-center"
        >
          <span className="whitespace-nowrap">
            {isVisualizing ? 'Visualizing...' : `Visualize ${selectedAlgorithm}!`}
          </span>
        </button>

        {/* Control Buttons */}
        <div className="flex flex-col gap-1">
          <button
            onClick={onGenerateTree}
            disabled={isVisualizing}
            className="w-full px-2 py-1.5 rounded-md text-xs font-medium bg-gray-700 hover:bg-gray-600 disabled:bg-gray-500 disabled:cursor-not-allowed text-gray-300 transition-colors"
          >
            New Tree
          </button>
          <button
            onClick={onClearPath}
            disabled={isVisualizing}
            className="w-full px-2 py-1.5 rounded-md text-xs font-medium bg-gray-700 hover:bg-gray-600 disabled:bg-gray-500 disabled:cursor-not-allowed text-gray-300 transition-colors"
          >
            Clear Path
          </button>
          <button
            onClick={onClearBoard}
            disabled={isVisualizing}
            className="w-full px-2 py-1.5 rounded-md text-xs font-medium bg-gray-700 hover:bg-gray-600 disabled:bg-gray-500 disabled:cursor-not-allowed text-gray-300 transition-colors"
          >
            Reset
          </button>
        </div>
      </div>
    </div>
  );
};

export default Toolbar;
import React from 'react';

interface StatisticsProps {
  visitedNodesCount: number;
  pathLength: number;
  totalNodes: number;
  found: boolean;
}

const Statistics: React.FC<StatisticsProps> = ({
  visitedNodesCount,
  pathLength,
  totalNodes,
  found
}) => {
  if (visitedNodesCount === 0) {
    return (
      <div className="bg-gray-800 rounded-lg p-3 border border-gray-600 min-w-0 w-full flex items-center justify-center min-h-[120px]">
        <div className="text-xs text-gray-500 text-center">
          Run a search to see results
        </div>
      </div>
    );
  }

  const explorationPercentage = ((visitedNodesCount / totalNodes) * 100).toFixed(1);

  return (
    <div className="bg-gray-800 rounded-lg p-3 border border-gray-600 min-w-0 w-full">
      <h3 className="text-sm font-semibold mb-2 text-center text-cyan-400">Results</h3>
      
      <div className="flex justify-between items-center text-xs gap-2 min-w-0">
        <div className="flex items-center gap-1">
          <div className={`text-base font-bold ${found ? 'text-green-400' : 'text-red-400'}`}>
            {found ? '✓' : '✗'}
          </div>
          <div className="text-gray-400">
            {found ? 'Found' : 'Failed'}
          </div>
        </div>
        
        <div className="text-center">
          <div className="text-sm font-bold text-blue-400">{visitedNodesCount}</div>
          <div className="text-gray-400 text-xs">Visited</div>
        </div>
        
        <div className="text-center">
          <div className="text-sm font-bold text-yellow-400">{pathLength}</div>
          <div className="text-gray-400 text-xs">Steps</div>
        </div>
        
        <div className="text-center">
          <div className="text-sm font-bold text-purple-400">{explorationPercentage}%</div>
          <div className="text-gray-400 text-xs">Explored</div>
        </div>
      </div>
      
      <div className="mt-2 text-center">
        <div className="text-xs text-gray-400">
          {visitedNodesCount}/{totalNodes} nodes
        </div>
      </div>
    </div>
  );
};

export default Statistics;

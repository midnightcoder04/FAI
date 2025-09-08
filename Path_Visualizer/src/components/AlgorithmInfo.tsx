import React from 'react';

type AlgorithmType = 'BFS' | 'DFS' | 'Iterative Deepening' | 'Best-First Search';

interface AlgorithmInfoProps {
  selectedAlgorithm: AlgorithmType;
}

const algorithmInfo: Record<AlgorithmType, {
  description: string;
  properties: string[];
  timeComplexity: string;
  spaceComplexity: string;
  optimal: boolean;
  complete: boolean;
}> = {
  'BFS': {
    description: 'Explores all nodes at the current depth before moving to the next depth level. Uses a queue (FIFO).',
    properties: ['Systematic level-by-level exploration', 'Guarantees shortest path in unweighted graphs', 'Uses queue data structure'],
    timeComplexity: 'O(V + E)',
    spaceComplexity: 'O(V)',
    optimal: true,
    complete: true
  },
  'DFS': {
    description: 'Explores as far as possible along each branch before backtracking. Uses a stack (LIFO).',
    properties: ['Goes deep into one path before trying others', 'May not find shortest path', 'Uses stack data structure'],
    timeComplexity: 'O(V + E)',
    spaceComplexity: 'O(h)',
    optimal: false,
    complete: true
  },
  'Iterative Deepening': {
    description: 'Combines benefits of BFS and DFS by performing depth-limited DFS with increasing depth limits.',
    properties: ['Memory efficient like DFS', 'Complete like BFS', 'Finds optimal solution'],
    timeComplexity: 'O(b^d)',
    spaceComplexity: 'O(d)',
    optimal: true,
    complete: true
  },
  'Best-First Search': {
    description: 'Uses a heuristic function to guide the search towards the most promising nodes first.',
    properties: ['Uses heuristic to guide search', 'Can be faster than uninformed search', 'May not find optimal path'],
    timeComplexity: 'O(b^m)',
    spaceComplexity: 'O(b^m)',
    optimal: false,
    complete: false
  }
};

const AlgorithmInfo: React.FC<AlgorithmInfoProps> = ({ selectedAlgorithm }) => {
  const info = algorithmInfo[selectedAlgorithm];

  return (
    <div className="bg-gray-800 rounded-lg p-3 border border-gray-600">
      <h3 className="text-md font-semibold mb-2 text-blue-400">{selectedAlgorithm}</h3>
      <p className="text-xs text-gray-300 mb-3 leading-relaxed">{info.description}</p>
      
      <div className="space-y-3 text-xs">
        <div>
          <h4 className="font-semibold text-green-400 mb-1">Properties:</h4>
          <ul className="list-disc list-inside text-gray-300 space-y-1">
            {info.properties.map((prop, index) => (
              <li key={index} className="text-xs">{prop}</li>
            ))}
          </ul>
        </div>
        
        <div>
          <h4 className="font-semibold text-yellow-400 mb-1">Complexity:</h4>
          <div className="text-gray-300 space-y-1">
            <p><span className="text-purple-400">Time:</span> {info.timeComplexity}</p>
            <p><span className="text-purple-400">Space:</span> {info.spaceComplexity}</p>
            <div className="flex flex-col gap-1 mt-2">
              <span className={`px-2 py-1 rounded text-xs text-center ${info.optimal ? 'bg-green-600' : 'bg-red-600'}`}>
                {info.optimal ? '✓ Optimal' : '✗ Not Optimal'}
              </span>
              <span className={`px-2 py-1 rounded text-xs text-center ${info.complete ? 'bg-green-600' : 'bg-red-600'}`}>
                {info.complete ? '✓ Complete' : '✗ Not Complete'}
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AlgorithmInfo;

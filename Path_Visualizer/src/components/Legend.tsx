import React from 'react';

const Legend: React.FC = () => {
  return (
    <div className="bg-gray-800 rounded-lg p-3 border border-gray-600">
      <h3 className="text-md font-semibold mb-3 text-center text-cyan-400">Legend</h3>
      <div className="grid grid-cols-1 gap-2 text-xs">
        <div className="flex items-center gap-2">
          <div className="w-4 h-4 bg-green-500 rounded-full border border-green-600 animate-start-glow flex-shrink-0"></div>
          <span>Start Node</span>
        </div>
        
        <div className="flex items-center gap-2">
          <div className="w-4 h-4 bg-red-500 rounded-full border border-red-600 animate-goal-pulse flex-shrink-0"></div>
          <span>Goal Node</span>
        </div>
        
        <div className="flex items-center gap-2">
          <div className="w-4 h-4 bg-blue-400 rounded-full border border-blue-500 flex-shrink-0"></div>
          <span>Visited Node</span>
        </div>
        
        <div className="flex items-center gap-2">
          <div className="w-4 h-4 bg-yellow-400 rounded-full border border-yellow-500 flex-shrink-0"></div>
          <span>Path Node</span>
        </div>
        
        <div className="flex items-center gap-2">
          <div className="w-4 h-4 bg-white rounded-full border border-gray-300 flex-shrink-0"></div>
          <span>Unvisited Node</span>
        </div>
        
        <div className="flex items-center gap-2">
          <div className="w-3 h-0.5 bg-gray-400 flex-shrink-0"></div>
          <span>Tree Edge</span>
        </div>
        
        <div className="flex items-center gap-2">
          <div className="w-3 h-0.5 bg-yellow-400 flex-shrink-0"></div>
          <span>Path Edge</span>
        </div>
      </div>
      
      <div className="mt-3 text-xs text-gray-400 text-center">
        <p>Numbers show visit order</p>
      </div>
    </div>
  );
};

export default Legend;

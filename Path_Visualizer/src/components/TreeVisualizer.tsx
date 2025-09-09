import React, { useState, useEffect, useCallback } from 'react';
import TreeNodeComponent from './TreeNodeComponent';
import TreeEdge from './TreeEdge';
import Toolbar from './Toolbar';
import Legend from './Legend';
import AlgorithmInfo from './AlgorithmInfo';
import Statistics from './Statistics';
import type { TreeNode } from '../types/TreeNode';
import { createRandomTree, getAllNodes, resetTree, addWeightsToTree, removeWeightsFromTree } from '../utils/TreeGenerator';
import { treeBFS, treeDFS, uniformCostSearch, aStar } from '../algorithms/treeAlgorithms';

type AlgorithmType = 'BFS' | 'DFS' | 'UCS' | 'A*';

const TreeVisualizer: React.FC = () => {
  const [tree, setTree] = useState<TreeNode | null>(null);
  const [selectedAlgorithm, setSelectedAlgorithm] = useState<AlgorithmType>('BFS');
  const [isVisualizing, setIsVisualizing] = useState(false);
  const [selectedGoal, setSelectedGoal] = useState<TreeNode | null>(null);
  const [isWeighted, setIsWeighted] = useState(false);
  const [searchResults, setSearchResults] = useState<{
    visitedCount: number;
    pathLength: number;
    found: boolean;
  }>({ visitedCount: 0, pathLength: 0, found: false });
  const [isTransitioning, setIsTransitioning] = useState(false);
  const [maxNodes, setMaxNodes] = useState(10);

  // Initialize with random tree
  useEffect(() => {
    const initialTree = createRandomTree(maxNodes);
    setTree(initialTree);
    // Find and set the initial goal node
    const goalNode = getAllNodes(initialTree).find(node => node.isGoal);
    if (goalNode) {
      setSelectedGoal(goalNode);
    }
  }, [maxNodes]);

  // Generate a new tree with smooth transition
  const generateNewTree = useCallback(() => {
    if (isVisualizing || isTransitioning) return;
    
    setIsTransitioning(true);
    
    // Clear search results immediately
    setSearchResults({ visitedCount: 0, pathLength: 0, found: false });
    
    // Start fade-out transition
    setTimeout(() => {
      const newTree = createRandomTree(maxNodes);
      
      // Reset weighted state when generating new tree
      setIsWeighted(false);
      
      // Set the new tree
      setTree(newTree);
      
      // Set new goal
      const goalNode = getAllNodes(newTree).find(node => node.isGoal);
      if (goalNode) {
        setSelectedGoal(goalNode);
      }
      
      // End transition after tree is set
      setTimeout(() => {
        setIsTransitioning(false);
      }, 150);
    }, 150);
  }, [isVisualizing, isTransitioning]);

  // Clear all paths and visited states
  const clearPath = useCallback(() => {
    if (isVisualizing || !tree) return;
    
    resetTree(tree);
    setTree({ ...tree }); // Force re-render
    setSearchResults({ visitedCount: 0, pathLength: 0, found: false });
  }, [isVisualizing, tree]);

  // Reset entire tree (same as clear path for now)
  const resetBoard = useCallback(() => {
    clearPath();
  }, [clearPath]);

  // Handle weighted toggle
  const handleWeightedToggle = useCallback((weighted: boolean) => {
    if (isVisualizing || !tree) return;
    
    setIsWeighted(weighted);
    if (weighted) {
      addWeightsToTree(tree);
    } else {
      removeWeightsFromTree(tree);
    }
    setTree({ ...tree }); // Force re-render
  }, [isVisualizing, tree]);

  // Handle node clicks for setting goal or toggling blocked state
  const handleNodeClick = useCallback((node: TreeNode) => {
    if (isVisualizing || !tree) return;
    
    if (node.isStart) return; // Can't modify start node
    
    // If clicking on current goal, don't change it
    if (node.isGoal) return;
    
    // Clear previous goal
    if (selectedGoal) {
      selectedGoal.isGoal = false;
    }
    
    // Set new goal
    node.isGoal = true;
    node.isBlocked = false; // Can't be blocked and goal at same time
    setSelectedGoal(node);
    setTree({ ...tree }); // Force re-render
  }, [isVisualizing, tree, selectedGoal]);

  // Animation functions
  const animateSearch = useCallback((visitedNodes: TreeNode[], pathNodes: TreeNode[]) => {
    // First animate the search process (faster timing)
    visitedNodes.forEach((node, index) => {
      setTimeout(() => {
        node.isVisited = true;
        setTree(prevTree => ({ ...prevTree! }));
      }, index * 1); // Reduced from 200ms to 100ms
    });

    // Then animate the path
    setTimeout(() => {
      pathNodes.forEach((node, index) => {
        setTimeout(() => {
          node.isPath = true;
          setTree(prevTree => ({ ...prevTree! }));
        }, index * 1); // Reduced from 100ms to 50ms
      });
      
      // Re-enable controls after animation (much shorter delay)
      setTimeout(() => {
        setIsVisualizing(false);
      }, pathNodes.length * 1 ); // Reduced from pathNodes.length * 100 + 500
    }, visitedNodes.length * 1); // Reduced from 200ms to 100ms
  }, []);

  // Main visualization function
  const visualizeAlgorithm = useCallback(() => {
    if (!tree || !selectedGoal || isVisualizing) return;
    
    setIsVisualizing(true);
    clearPath();
    
    setTimeout(() => {
      const startNode = getAllNodes(tree).find(node => node.isStart);
      if (!startNode) return;
      
      let result;
      
      switch (selectedAlgorithm) {
        case 'BFS':
          result = treeBFS(startNode, selectedGoal);
          break;
        case 'DFS':
          result = treeDFS(startNode, selectedGoal);
          break;
        case 'UCS':
          result = uniformCostSearch(startNode, selectedGoal, isWeighted);
          break;
        case 'A*':
          result = aStar(startNode, selectedGoal, isWeighted);
          break;
        default:
          result = treeBFS(startNode, selectedGoal);
      }
      
      // Update search results
      setSearchResults({
        visitedCount: result.visitedNodes.length,
        pathLength: result.path.length,
        found: result.found
      });

      if (result.found) {
        animateSearch(result.visitedNodes, result.path);
      } else {
        animateSearch(result.visitedNodes, []);
      }
    }, 100);
  }, [tree, selectedGoal, selectedAlgorithm, isVisualizing, clearPath, animateSearch]);

  // Render all edges in the tree
  const renderEdges = () => {
    if (!tree) return null;
    
    const edges: React.ReactElement[] = [];
    const allNodes = getAllNodes(tree);
    
    allNodes.forEach(node => {
      node.children.forEach(child => {
        const isPathEdge = node.isPath && child.isPath;
        const isTraversedEdge = (node.isVisited || node.isPath) && (child.isVisited || child.isPath);
        
        edges.push(
          <TreeEdge
            key={`edge-${node.id}-${child.id}`}
            from={node}
            to={child}
            isPath={isPathEdge}
            isTraversed={isTraversedEdge}
            showWeights={isWeighted}
          />
        );
      });
    });
    
    return edges;
  };

  // Render all nodes in the tree
  const renderNodes = () => {
    if (!tree) return null;
    
    const allNodes = getAllNodes(tree);
    
    return allNodes.map(node => (
      <TreeNodeComponent
        key={node.id}
        node={node}
        onNodeClick={handleNodeClick}
      />
    ));
  };

  if (!tree) {
    return <div className="text-white">Loading...</div>;
  }

  return (
    <div className="flex w-full h-full">
      {/* Left Panel - Tree Visualization (70%) */}
      <div className="flex-grow" style={{ flexBasis: '70%' }}>
        <div className="flex flex-col p-4 h-full">
          <div className="text-sm text-gray-300 mb-4 text-center">
            <p>Click on any node (except start) to set it as the goal.</p>
            {selectedGoal && (
              <p className="text-cyan-400">Current goal: Node {selectedGoal.value}</p>
            )}
          </div>
          
          {/* Tree Visualization Container */}
          <div className="flex-1 flex items-center justify-center min-h-0">
            <div 
              className={`relative bg-gray-800 rounded-lg border-2 border-gray-600 overflow-hidden transition-opacity duration-300 ${
                isTransitioning ? 'opacity-20' : 'opacity-100'
              }`}
              style={{ 
                width: '100%', 
                height: '100%',
                maxWidth: '800px',
                maxHeight: '600px'
              }}
            >
              {/* Render edges first (behind nodes) */}
              {renderEdges()}
              
              {/* Render nodes */}
              {renderNodes()}
              
              {/* Transition overlay */}
              {isTransitioning && (
                <div className="absolute inset-0 bg-gray-900 bg-opacity-50 flex items-center justify-center">
                  <div className="text-white text-sm animate-pulse">
                    Generating new tree...
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Middle Panel - Toolbar and Results (10%) */}
      <div className="border-l border-gray-700 bg-gray-900 flex-shrink-0 min-w-0" style={{ flexBasis: '18%' }}>
        <div className="flex flex-col p-4 h-full space-y-4 min-w-0">
          <Toolbar
            selectedAlgorithm={selectedAlgorithm}
            onAlgorithmChange={setSelectedAlgorithm}
            onVisualize={visualizeAlgorithm}
            onClearBoard={resetBoard}
            onClearPath={clearPath}
            onGenerateTree={generateNewTree}
            isVisualizing={isVisualizing}
            isWeighted={isWeighted}
            onWeightedToggle={handleWeightedToggle}
            maxNodes={maxNodes}
            onMaxNodesChange={setMaxNodes}
          />
          
          <Statistics 
            visitedNodesCount={searchResults.visitedCount}
            pathLength={searchResults.pathLength}
            totalNodes={getAllNodes(tree).length}
            found={searchResults.found}
          />
        </div>
      </div>
      
      {/* Right Panel - Information Sidebar (20%) */}
      <div className="border-l border-gray-700 bg-gray-900 overflow-y-auto flex-shrink-0" style={{ flexBasis: '18%' }}>
        <div className="flex flex-col p-4 space-y-4">
          <Legend />
          
          <AlgorithmInfo selectedAlgorithm={selectedAlgorithm} />
        </div>
      </div>
    </div>
  );
};

export default TreeVisualizer;

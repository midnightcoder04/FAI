import React, { useState, useEffect, useCallback } from 'react';
import TreeNodeComponent from './TreeNodeComponent';
import TreeEdge from './TreeEdge';
import Toolbar from './Toolbar';
import Legend from './Legend';
import AlgorithmInfo from './AlgorithmInfo';
import Statistics from './Statistics';
import type { TreeNode } from '../types/TreeNode';
import { createSampleTree, createLargeTree, createRandomTree, getAllNodes, resetTree } from '../utils/TreeGenerator';
import { treeBFS, treeDFS, iterativeDeepening, bestFirstSearch } from '../algorithms/treeAlgorithms';

type AlgorithmType = 'BFS' | 'DFS' | 'Iterative Deepening' | 'Best-First Search';

const TreeVisualizer: React.FC = () => {
  const [tree, setTree] = useState<TreeNode | null>(null);
  const [selectedAlgorithm, setSelectedAlgorithm] = useState<AlgorithmType>('BFS');
  const [isVisualizing, setIsVisualizing] = useState(false);
  const [selectedGoal, setSelectedGoal] = useState<TreeNode | null>(null);
  const [searchResults, setSearchResults] = useState<{
    visitedCount: number;
    pathLength: number;
    found: boolean;
  }>({ visitedCount: 0, pathLength: 0, found: false });

  // Initialize with sample tree
  useEffect(() => {
    const initialTree = createSampleTree();
    setTree(initialTree);
    // Find and set the initial goal node
    const goalNode = getAllNodes(initialTree).find(node => node.isGoal);
    if (goalNode) {
      setSelectedGoal(goalNode);
    }
  }, []);

  // Generate a new tree
  const generateNewTree = useCallback(() => {
    if (isVisualizing) return;
    
    const rand = Math.random();
    const newTree = rand > 0.6 ? createRandomTree(4, 3) : 
                    rand > 0.3 ? createLargeTree() : 
                    createSampleTree();
    setTree(newTree);
    
    // Set new goal
    const goalNode = getAllNodes(newTree).find(node => node.isGoal);
    if (goalNode) {
      setSelectedGoal(goalNode);
    }
  }, [isVisualizing]);

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
    // First animate the search process
    visitedNodes.forEach((node, index) => {
      setTimeout(() => {
        node.isVisited = true;
        setTree(prevTree => ({ ...prevTree! }));
      }, index * 200);
    });

    // Then animate the path
    setTimeout(() => {
      pathNodes.forEach((node, index) => {
        setTimeout(() => {
          node.isPath = true;
          setTree(prevTree => ({ ...prevTree! }));
        }, index * 100);
      });
      
      // Re-enable controls after animation
      setTimeout(() => {
        setIsVisualizing(false);
      }, pathNodes.length * 100 + 500);
    }, visitedNodes.length * 200);
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
        case 'Iterative Deepening':
          result = iterativeDeepening(startNode, selectedGoal);
          break;
        case 'Best-First Search':
          result = bestFirstSearch(startNode, selectedGoal);
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
      {/* Left Panel - Simulation */}
      <div className="flex-1 flex flex-col p-4 min-h-0">
        {/* Toolbar and Results Row */}
        <div className="flex gap-4 mb-4">
          <div className="flex-1">
            <Toolbar
              selectedAlgorithm={selectedAlgorithm}
              onAlgorithmChange={setSelectedAlgorithm}
              onVisualize={visualizeAlgorithm}
              onClearBoard={resetBoard}
              onClearPath={clearPath}
              onGenerateTree={generateNewTree}
              isVisualizing={isVisualizing}
            />
          </div>
          
          {/* Results Display - Right of Toolbar */}
          <div className="w-64">
            <Statistics 
              visitedNodesCount={searchResults.visitedCount}
              pathLength={searchResults.pathLength}
              totalNodes={getAllNodes(tree).length}
              found={searchResults.found}
            />
          </div>
        </div>
        
        <div className="text-sm text-gray-300 mb-4 text-center">
          <p>Click on any node (except start) to set it as the goal.</p>
          {selectedGoal && (
            <p className="text-cyan-400">Current goal: Node {selectedGoal.value}</p>
          )}
        </div>
        
        {/* Tree Visualization Container */}
        <div className="flex-1 flex items-center justify-center min-h-0">
          <div className="relative bg-gray-800 rounded-lg border-2 border-gray-600 overflow-hidden"
               style={{ 
                 width: 'min(70vw, 800px)', 
                 height: 'min(70vh, 500px)',
               }}>
            {/* Render edges first (behind nodes) */}
            {renderEdges()}
            
            {/* Render nodes */}
            {renderNodes()}
          </div>
        </div>
      </div>
      
      {/* Right Panel - Information */}
      <div className="w-80 flex flex-col p-4 border-l border-gray-700 bg-gray-900 overflow-y-auto">
        <div className="space-y-4">
          <Legend />
          
          <AlgorithmInfo selectedAlgorithm={selectedAlgorithm} />
        </div>
      </div>
    </div>
  );
};

export default TreeVisualizer;

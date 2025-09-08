import React from 'react';
import PathfindingVisualizer from './components/Visualizer';

function App() {
  return (
    <div className="bg-gray-900 min-h-screen flex flex-col items-center text-white font-sans">
      <header className="py-4">
        <h1 className="text-3xl md:text-4xl font-bold tracking-wider">
          Pathfinding Algorithm Visualizer
        </h1>
      </header>
      <main className="flex-grow flex items-center justify-center w-full">
        <PathfindingVisualizer />
      </main>
      <footer className="py-2 text-sm text-gray-500">
        Built with React, TypeScript, and Tailwind CSS.
      </footer>
    </div>
  );
}

export default App;

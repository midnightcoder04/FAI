import TreeVisualizer from './components/TreeVisualizer';

function App() {
  return (
    <div className="bg-gray-900 min-h-screen flex flex-col text-white font-sans">
      <header className="py-4 px-6 border-b border-gray-700">
        <h1 className="text-2xl md:text-3xl font-bold tracking-wider text-center">
          Tree Search Algorithm Visualizer
        </h1>
      </header>
      <main className="flex-grow flex w-full">
        <TreeVisualizer />
      </main>
      <footer className="py-2 px-6 text-xs text-gray-500 border-t border-gray-700 text-center">
        Built with React, TypeScript, and Tailwind CSS. Click nodes to set goals!
      </footer>
    </div>
  );
}

export default App;

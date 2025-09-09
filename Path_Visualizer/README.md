# Path Visualizer (Tree Edition)

A modern React + TypeScript web app for visualizing search algorithms on randomly generated trees. Compare BFS, DFS, UCS, and A* in real time with interactive controls and beautiful animations.

## Features

- 🌳 **Tree-Based Visualization**: See search algorithms in action on randomly generated trees
- 🔄 **Random Tree Generation**: Control max nodes (3-30), tree depth, and weighted/unweighted edges
- 🧭 **Algorithms Supported**: BFS, DFS, Uniform Cost Search (Dijkstra), and A* (with heuristic based on alphabet closeness)
- 🎛️ **Interactive Toolbar**: Select algorithm, toggle weights, set max nodes, generate new trees, reset, and clear paths
- 📊 **Live Statistics**: See visited nodes, path length, exploration %, and success/failure for each run
- ✨ **Smooth Animations**: Node/edge transitions, search and path highlighting, and fade effects
- 🖥️ **Responsive Layout**: 3-column split (Visualization | Controls/Results | Sidebar Info)
- 🧩 **Sidebar Info**: Algorithm explanations, legend, and color coding

## Usage

1. **Install dependencies**
   ```bash
   npm install
   ```
2. **Start the development server**
   ```bash
   npm run dev
   ```
3. **Open in browser**
   - Visit [http://localhost:5173](http://localhost:5173) (or the port shown in terminal)

## How It Works

- **Tree Generation**: Click "New Tree" to generate a random tree with your chosen max nodes. Each tree has a single start node and one goal node (marked 'A').
- **Algorithm Selection**: Choose BFS, DFS, UCS, or A* from the dropdown. Toggle weighted edges for UCS/A*.
- **Visualization**: Click "Visualize" to watch the algorithm search for the goal. Animations show visited nodes and the final path.
- **Statistics**: See how many nodes were visited, path length, and whether the goal was found.
- **Sidebar**: Learn about each algorithm and see a legend for node/edge colors.

## Project Structure

```
src/
  components/
    TreeVisualizer.tsx   # Main layout and orchestration
    Toolbar.tsx          # Controls for algorithm, weights, max nodes, etc.
    Statistics.tsx       # Results and metrics display
    Node.tsx, TreeEdge.tsx # Visualization primitives
    Legend.tsx, AlgorithmInfo.tsx # Sidebar info
  utils/
    TreeGenerator.ts     # Random tree generation logic
    treeAlgorithms.ts    # BFS, DFS, UCS, A* implementations
  types/
    TreeNode.ts          # Core tree node type
public/
  index.html, assets
```

## Customization
- Change max nodes in the toolbar to see larger/smaller trees
- Toggle weighted edges for cost-based algorithms
- Click any node (except start) to set it as the goal

## Tech Stack
- React + TypeScript
- Tailwind CSS
- Vite

## License
MIT

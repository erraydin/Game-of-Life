import Canvas from "./components/Canvas";
import defineSketch from "./p5/sketch";


function App() {
  const sketch = defineSketch(false, 20, 30, 30);
  return (
    <Canvas sketch={sketch} />
  );
}

export default App;

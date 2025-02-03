/** DOCS for react-three-fiber an easier way to use Three.js in react apps *
 * https://r3f.docs.pmnd.rs/getting-started/introduction
 * **/
import { Canvas } from '@react-three/fiber'; // Auto setups a three.js scene, camera, and renderer
import { OrbitControls } from '@react-three/drei'; // Allow users to rotate, zoom, and pan the 

function App() {
  return (
   <main>
    <h1>Cool Cube</h1>
<div className='canvas-container'>
    <Canvas>
    <ambientLight intensity={0.5} /> {/* Soft, even light */}
    <mesh>
    <boxGeometry args={[1, 1, 1]} /> {/* Width, height, depth */}
    <meshStandardMaterial color="orange" />
  </mesh>
  <OrbitControls /> 
    </Canvas>
    </div>
   </main>
  )
}

export default App


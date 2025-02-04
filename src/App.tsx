/** DOCS for react-three-fiber an easier way to use Three.js in react apps *
 * https://r3f.docs.pmnd.rs/getting-started/introduction
 * **/
import { Canvas } from "@react-three/fiber"; // Auto setups a three.js scene, camera, and renderer
import { OrbitControls, useGLTF } from "@react-three/drei"; // Allow users to rotate, zoom, and pan the
import ProductSidebar from "./components/ProuductSidebar";

function Model() {
    const counter = useGLTF("./src/assets/counters/straightCounter.glb");
    return (
        <primitive object={counter.scene} scale={0.1} position={[1, 0, 0]} />
    );
}

function App() {
    return (
        <main>
            <ProductSidebar />
            <Canvas
                camera={{
                    position: [0, 2.5, 10], // x, y, zs
                }}
            >
                <ambientLight intensity={1} /> {/* Soft, even light */}
                <Model />
                <OrbitControls />
            </Canvas>
        </main>
    );
}

export default App;

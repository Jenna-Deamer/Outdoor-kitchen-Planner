import { Canvas } from "@react-three/fiber";
import { OrbitControls, useGLTF } from "@react-three/drei";
import ProductSidebar from "./components/ProductsSidebar";
import { useState } from "react";

function Cabinet({ position }: { position: [number, number, number] }) {
    const cabinet = useGLTF("./src/assets/cabinet.glb");
    return <primitive object={cabinet.scene} scale={0.1} position={position} />;
}

function Fridge({ position }: { position: [number, number, number] }) {
    const fridge = useGLTF("./src/assets/fridge.glb");
    return <primitive object={fridge.scene} scale={0.1} position={position} />;
}

function Counter({ children }: { children?: React.ReactNode }) {
    const counter = useGLTF("./src/assets/counters/straightCounter.glb");
    return (
        <group position={[0, 0, 0]}>
            <primitive object={counter.scene} scale={0.1} />
            {children}
        </group>
    );
}

function App() {
    const [models, setModels] = useState<{ type: string; position: [number, number, number] }[]>([]);

    const handleAddCabinet = () => {
        setModels([...models, { type: "cabinet", position: [0, 0, 1.2] }]); // Positioned to the left front
    };

    const handleAddFridge = () => {
        setModels([...models, { type: "fridge", position: [0, 0, 1.2] }]); // Positioned to the right front
    };

    return (
        <main>
            <ProductSidebar onAddCabinet={handleAddCabinet} onAddFridge={handleAddFridge} />
            <Canvas camera={{ position: [0, 2.5, 10] }}>
                <ambientLight intensity={1} />
                <Counter>
                    {models.map((model, index) => {
                        if (model.type === "cabinet") return <Cabinet key={index} position={model.position} />;
                        if (model.type === "fridge") return <Fridge key={index} position={model.position} />;
                        return null;
                    })}
                </Counter>
                <OrbitControls />
            </Canvas>
        </main>
    );
}

export default App;

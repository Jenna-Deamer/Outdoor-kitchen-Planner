import { Canvas } from "@react-three/fiber";
import { OrbitControls, useGLTF } from "@react-three/drei";
import ProductSidebar from "./components/ProductsSidebar";
import { useState, useRef, useEffect } from "react";
import * as THREE from "three";
import { Box3, Vector3 } from "three";

function Cabinet({ position, onClick, isSelected }: { position: [number, number, number]; onClick: () => void; isSelected: boolean }) {
    const cabinet = useGLTF("./src/assets/cabinet.glb");
    const ref = useRef<THREE.Group>(null);
    const [size, setSize] = useState<[number, number, number]>([1, 1, 1]);
    const [center, setCenter] = useState<[number, number, number]>([0, 0, 0]);

    useEffect(() => {
        if (ref.current) {
            const box = new Box3().setFromObject(ref.current);
            const dimensions = new Vector3();
            box.getSize(dimensions);
            const center = new Vector3();
            box.getCenter(center);
            setSize([dimensions.x, dimensions.y, dimensions.z]);
            setCenter([center.x, center.y, center.z]);
        }
    }, []);

    return (
        <group ref={ref} position={position} onClick={onClick}>
            <primitive object={cabinet.scene} scale={0.1} />
            {isSelected && (
                <mesh position={center}>
                    <boxGeometry args={size} />
                    <meshBasicMaterial color="yellow" wireframe />
                </mesh>
            )}
        </group>
    );
}

function Fridge({ position, onClick, isSelected }: { position: [number, number, number]; onClick: () => void; isSelected: boolean }) {
    const fridge = useGLTF("./src/assets/fridge.glb");
    const ref = useRef<THREE.Group>(null);
    const [size, setSize] = useState<[number, number, number]>([1, 1, 1]);
    const [center, setCenter] = useState<[number, number, number]>([0, 0, 0]);

    useEffect(() => {
        if (ref.current) {
            const box = new Box3().setFromObject(ref.current);
            const dimensions = new Vector3();
            box.getSize(dimensions);
            const center = new Vector3();
            box.getCenter(center);
            setSize([dimensions.x, dimensions.y, dimensions.z]);
            setCenter([center.x, center.y, center.z]);
        }
    }, []);

    return (
        <group ref={ref} position={position} onClick={onClick}>
            <primitive object={fridge.scene} scale={0.1} />
            {isSelected && (
                <mesh position={center}>
                    <boxGeometry args={size} />
                    <meshBasicMaterial color="yellow" wireframe />
                </mesh>
            )}
        </group>
    );
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
    const [selectedModelIndex, setSelectedModelIndex] = useState<number | null>(null);

    const handleAddCabinet = () => {
        setModels([...models, { type: "cabinet", position: [0, 0, 0] }]);
    };

    const handleAddFridge = () => {
        setModels([...models, { type: "fridge", position: [0, 0, 0] }]); 
    };

    const handleModelClick = (index: number) => {
        setSelectedModelIndex(index);
        console.log("Selected model index: ", index);
    };

    return (
        <main>
            <ProductSidebar onAddCabinet={handleAddCabinet} onAddFridge={handleAddFridge} />
            <Canvas camera={{ position: [0, 2.5, 10] }}>
                <ambientLight intensity={1} />
                <Counter>
                    {models.map((model, index) => {
                        const isSelected = index === selectedModelIndex;
                        if (model.type === "cabinet") {
                            return (
                                <Cabinet
                                    key={index}
                                    position={model.position}
                                    onClick={() => handleModelClick(index)}
                                    isSelected={isSelected}
                                />
                            );
                        }
                        if (model.type === "fridge") {
                            return (
                                <Fridge
                                    key={index}
                                    position={model.position}
                                    onClick={() => handleModelClick(index)}
                                    isSelected={isSelected}
                                />
                            );
                        }
                        return null;
                    })}
                </Counter>
                <OrbitControls />
            </Canvas>
        </main>
    );
}

export default App;

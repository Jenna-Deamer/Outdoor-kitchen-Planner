import { Canvas } from "@react-three/fiber";
import { OrbitControls } from "@react-three/drei";
import ProductSidebar from "./components/ProductsSidebar";
import { useState } from "react";

// models
import Counter from "./components/models/Counter";
import Cabinet from "./components/models/Cabinet";
import Fridge from "./components/models/Fridge";

function App() {
    const [models, setModels] = useState<
        { type: string; position: [number, number, number] }[]
    >([]);
    const [selectedModelIndex, setSelectedModelIndex] = useState<number | null>(
        null
    );

    const handleAddCabinet = () => {
        setModels([...models, { type: "cabinet", position: [0, 0.2, 0] }]);
    };

    const handleAddFridge = () => {
        setModels([...models, { type: "fridge", position: [0, 0.2, 0] }]);
    };

    const handleModelClick = (index: number) => {
        setSelectedModelIndex(index);
        console.log("Selected model index: ", index);
    };

    return (
        <main>
            <ProductSidebar
                onAddCabinet={handleAddCabinet}
                onAddFridge={handleAddFridge}
            />
            <Canvas camera={{ position: [0, 2, 4] }}>
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

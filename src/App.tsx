import { Canvas } from "@react-three/fiber";
import { OrbitControls } from "@react-three/drei";
import ProductSidebar from "./components/ProductsSidebar";
import { useState, useEffect, useCallback } from "react";

// Models
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

    const handleMoveModel = useCallback(
        (direction: "left" | "right") => {
            if (selectedModelIndex !== null) {
                // Create a new array with the updated model
                const updatedModels = models.map((model, index) => {
                    if (index === selectedModelIndex) {
                        // Create a new object for the updated model
                        const newPosition: [number, number, number] = [
                            ...model.position,
                        ] as [number, number, number]; // Copy the position array so react detects the change and rerenders instread of mutating the original array
                        const moveDistance = 0.1; // How much the unit moves by each click
                        if (direction === "left") {
                            newPosition[0] -= moveDistance;
                        } else if (direction === "right") {
                            newPosition[0] += moveDistance;
                        }
                        return { ...model, position: newPosition }; // create new object with updated position
                    }
                    return model;
                });

                // Update the models state with the new array
                setModels(updatedModels);
            }
        },
        [selectedModelIndex, models]
    );

    useEffect(() => {
        const handleKeyDown = (e: KeyboardEvent) => {
            // Check what key is pressed
            if (e.key === "ArrowLeft") {
                handleMoveModel("left");
            } else if (e.key === "ArrowRight") {
                handleMoveModel("right");
            }
        };
        // Add event listener
        window.addEventListener("keydown", handleKeyDown);
        return () => {
            // Cleanup function to remove the event listener when the component is unmounted or dependencies change
            window.removeEventListener("keydown", handleKeyDown);
        };
    }, [selectedModelIndex, models, handleMoveModel]); // Rerun effect whenever selectedModelIndex or models changes

    return (
        <main>
            <ProductSidebar
                onAddCabinet={handleAddCabinet}
                onAddFridge={handleAddFridge}
            />
            <Canvas camera={{ position: [0, 2, 4] }} className="canvas">
                <ambientLight intensity={1} />
                <Counter>
                    {models.map((model, index) => {
                        const isSelected = index === selectedModelIndex;
                        if (model.type === "cabinet") {
                            return (
                                <Cabinet
                                    key={index}
                                    position={model.position} // New position will trigger re-render
                                    onClick={() => handleModelClick(index)}
                                    isSelected={isSelected}
                                />
                            );
                        }
                        if (model.type === "fridge") {
                            return (
                                <Fridge
                                    key={index}
                                    position={model.position} // New position will trigger re-render
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

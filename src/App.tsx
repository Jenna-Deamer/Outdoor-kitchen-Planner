import { Canvas } from "@react-three/fiber";
import { OrbitControls } from "@react-three/drei";
import { useState, useEffect, useCallback } from "react";
import { createXRStore, XR, XROrigin } from "@react-three/xr";

// Components
import ModelSidebar from "./components/ModelSidebar";
import CounterSelection from "./components/CounterSelection";
// Models
import Ground from "./components/models/Ground";
import StraightCounter from "./components/models/StraightCounter";
import LShapedCounter from "./components/models/L-ShapedCounter";
import Cabinet from "./components/models/Cabinet";
import Fridge from "./components/models/Fridge";

type Model = { type: string; position: [number, number, number] };

function App() {
    const [models, setModels] = useState<Model[]>([]);
    const XRStore = createXRStore();
    const [isARMode, setIsARMode] = useState(false);

    const [selectedModelIndex, setSelectedModelIndex] = useState<number | null>(null);
    const [selectedCounterType, setSelectedCounterType] = useState<string | null>(null);

    const handleSelectCounter = (counterType: string) => {
        setSelectedCounterType(counterType);
    };

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

    const handleDeleteModel = (index: number) => {
        if (!window.confirm("Are you sure you want to delete this model?")) {
            return;
        }
        setModels(models.filter((_, i) => i !== index));
        setSelectedModelIndex(null);
    };

    const handleMoveModel = useCallback(
        (direction: "left" | "right") => {
            if (selectedModelIndex !== null) {
                const updatedModels = models.map((model, index) => {
                    if (index === selectedModelIndex) {
                        const newPosition: [number, number, number] = [...model.position];
                        const moveDistance = 0.1;
                        if (direction === "left") {
                            newPosition[0] -= moveDistance;
                        } else if (direction === "right") {
                            newPosition[0] += moveDistance;
                        }
                        return { ...model, position: newPosition };
                    }
                    return model;
                });
                setModels(updatedModels);
            }
        },
        [selectedModelIndex, models]
    );

    useEffect(() => {
        const handleKeyDown = (e: KeyboardEvent) => {
            if (e.key === "ArrowLeft") {
                handleMoveModel("left");
            } else if (e.key === "ArrowRight") {
                handleMoveModel("right");
            }
        };
        window.addEventListener("keydown", handleKeyDown);
        return () => {
            window.removeEventListener("keydown", handleKeyDown);
        };
    }, [selectedModelIndex, models, handleMoveModel]);

    if (!selectedCounterType) {
        return <CounterSelection onSelectCounter={handleSelectCounter} />;
    }

    return (
        <main>
            <ModelSidebar
                onAddCabinet={handleAddCabinet}
                onAddFridge={handleAddFridge}
                models={models}
                onSelectModel={handleModelClick}
                onDeleteModel={handleDeleteModel}
            />

            <button
                id="ar-button"
                onClick={() => {
                    console.log("AR button clicked");
                    XRStore.enterAR();
                    setIsARMode(true);
                }}
            >
                View AR
            </button>

            <Canvas camera={{ position: [0, 2, 4] }} className="canvas">
                <XR store={XRStore}>
                    <ambientLight intensity={1} />

                    {!isARMode && <Ground />}

                    {/* Render the counter relative to the user in AR mode */}
                    {isARMode ? (
                        <group position={[0, 0, -4]}> 
                            {selectedCounterType === "straight" ? (
                                <StraightCounter>
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
                                </StraightCounter>
                            ) : (
                                <LShapedCounter>
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
                                </LShapedCounter>
                            )}
                        </group>
                    ) : (
                        // Render the counter in its default position when not in AR mode
                        <>
                            {selectedCounterType === "straight" ? (
                                <StraightCounter>
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
                                </StraightCounter>
                            ) : (
                                <LShapedCounter>
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
                                </LShapedCounter>
                            )}
                        </>
                    )}

                    {!isARMode && <OrbitControls />}
                    <XROrigin />
                </XR>
            </Canvas>
        </main>
    );
}

export default App;
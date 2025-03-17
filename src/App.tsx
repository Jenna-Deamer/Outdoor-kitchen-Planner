import { Canvas } from "@react-three/fiber";
import { OrbitControls } from "@react-three/drei";
import { useState, useEffect, useCallback } from "react";
import { createXRStore, XR, XROrigin } from "@react-three/xr";

// Components
import ModelSidebar from "./components/ModelSidebar";
import CounterSelection from "./components/CounterSelection";
// import SkyBox from "./components/SkyBox";
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

    const [selectedModelIndex, setSelectedModelIndex] = useState<number | null>(
        null
    );
    const [selectedCounterType, setSelectedCounterType] = useState<
        string | null
    >(null);

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
        // Confirm deletion
        if (!window.confirm("Are you sure you want to delete this model?")) {
            return;
        }
        // Filter out the model at the selected index and update the models state
        setModels(models.filter((_, i) => i !== index));
        // Reset selectedModelIndex
        setSelectedModelIndex(null);
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

    // if counterSelection is null display selection screen
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


                    <Ground />

                    {selectedCounterType === "straight" ? (
                        <StraightCounter>
                            {models.map((model, index) => {
                                const isSelected = index === selectedModelIndex;
                                if (model.type === "cabinet") {
                                    return (
                                        <Cabinet
                                            key={index}
                                            position={model.position} // New position will trigger re-render
                                            onClick={() =>
                                                handleModelClick(index)
                                            }
                                            isSelected={isSelected}
                                        />
                                    );
                                }
                                if (model.type === "fridge") {
                                    return (
                                        <Fridge
                                            key={index}
                                            position={model.position} // New position will trigger re-render
                                            onClick={() =>
                                                handleModelClick(index)
                                            }
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
                                            position={model.position} // New position will trigger re-render
                                            onClick={() =>
                                                handleModelClick(index)
                                            }
                                            isSelected={isSelected}
                                        />
                                    );
                                }
                                if (model.type === "fridge") {
                                    return (
                                        <Fridge
                                            key={index}
                                            position={model.position} // New position will trigger re-render
                                            onClick={() =>
                                                handleModelClick(index)
                                            }
                                            isSelected={isSelected}
                                        />
                                    );
                                }
                                return null;
                            })}
                        </LShapedCounter>
                    )}
                    <OrbitControls />
                    {!isARMode && <OrbitControls />}
                    <XROrigin position={[0, 0, 4.5]} />
                </XR>
            </Canvas>
        </main>
    );
}

export default App;

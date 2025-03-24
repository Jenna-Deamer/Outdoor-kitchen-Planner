import { Canvas } from "@react-three/fiber";
import { OrbitControls } from "@react-three/drei";
import { useState, useEffect, useCallback } from "react";
import { createXRStore, XR, XROrigin } from "@react-three/xr";

// Components
import ModelSidebar from "./components/ModelSidebar";
import CounterSelection from "./components/CounterSelection";
import ARUIElement from "./components/ARUIElement";
// Models
import Ground from "./components/models/Ground";
import StraightCounter from "./components/models/StraightCounter";
import LShapedCounter from "./components/models/L-ShapedCounter";
import Cabinet from "./components/models/Cabinet";
import Fridge from "./components/models/Fridge";
import SkyComponent from "./components/SkyBox";

type Model = { type: string; position: [number, number, number] };

function App() {
    const [models, setModels] = useState<Model[]>([]);
    const [session, setSession] = useState<XRSession | null>(null);
    const XRStore = createXRStore({});

    const handleARSession = async () => {
        try {
            const newSession = await XRStore.enterAR();
            if (newSession) {
                setSession(newSession);
                newSession.addEventListener("end", () => {
                    // Reset when session ends (including back button press)
                    setSession(null);
                });
            }
        } catch (error) {
            console.error("AR session error:", error);
        }
    };

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
                        const newPosition: [number, number, number] = [
                            ...model.position,
                        ];
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

    // Render models helper function to avoid code duplication
    const renderModels = () => {
        return models.map((model, index) => {
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
        });
    };

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

            {!session && (
                <button className="ar-button" onClick={handleARSession}>
                    View AR
                </button>
            )}

            <Canvas camera={{ position: [0, 2, 4] }} className="canvas">
                <XR store={XRStore}>
                    <ambientLight intensity={1} />

                    {!session && <Ground />}
                    {!session && <SkyComponent />}

                    {session ? (
                        <>
                            <group position={[0, 0, -4]}>
                                {selectedCounterType === "straight" ? (
                                    <StraightCounter>
                                        {renderModels()}
                                    </StraightCounter>
                                ) : (
                                    <LShapedCounter>
                                        {renderModels()}
                                    </LShapedCounter>
                                )}
                            </group>
                            <ARUIElement onExitAR={() => session?.end()} />
                        </>
                    ) : (
                        <>
                            {selectedCounterType === "straight" ? (
                                <StraightCounter>
                                    {renderModels()}
                                </StraightCounter>
                            ) : (
                                <LShapedCounter>
                                    {renderModels()}
                                </LShapedCounter>
                            )}
                        </>
                    )}

                    {!session && <OrbitControls />}
                    <XROrigin />
                </XR>
            </Canvas>
        </main>
    );
}

export default App;

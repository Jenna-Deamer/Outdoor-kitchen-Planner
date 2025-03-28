import { Canvas } from "@react-three/fiber";
import { OrbitControls } from "@react-three/drei";
import { useState, useEffect, useCallback } from "react";
import { createXRStore, XR, XROrigin } from "@react-three/xr";

// Components
import ModelSidebar from "./components/ModelSidebar";
import CounterSelection from "./components/CounterSelection";
import ARUIElement from "./components/ARUIElement";
import CustomNotification from "./components/CustomNotification";
import ModelControlButtons from "./components/ModelControlButtons";

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
    const [selectedModelIndex, setSelectedModelIndex] = useState<number | null>(
        null
    );
    const [selectedCounterType, setSelectedCounterType] = useState<
        string | null
    >(null);
    const AR_NOT_SUPPORTED_MSG = "AR is not supported on this device or browser. Please try on an AR-compatible device.";
    const [arSessionId, setArSessionId] = useState<number>(0);
    const [notification, setNotification] = useState({
        visible: false,
        message: ""
    });

    const handleSelectCounter = (counterType: string) => {
        setSelectedCounterType(counterType);
    };

    const showNotification = (message: string) => {
        setNotification({ visible: true, message });
    };

    const handleARSession = async () => {
        try {
            // Clear any existing session first
            if (session) {
                await handleExitARSession();
            }

            const newSession = await XRStore.enterAR();
            if (newSession) {
                setSession(newSession);
                setArSessionId((prevId) => prevId + 1);

                const onSessionEnd = () => {
                    console.log("Session ended");
                    setSession(null);
                    newSession.removeEventListener("end", onSessionEnd);
                };

                newSession.addEventListener("end", onSessionEnd);
            } else {
                // If newSession is null/undefined but no error was thrown
                showNotification(AR_NOT_SUPPORTED_MSG);
            }
        } catch (error) {
            console.error("AR session error:", error);
            showNotification(AR_NOT_SUPPORTED_MSG);
        }
    };

    const handleExitARSession = async () => {
        if (session) {
            try {
                // Clear session
                console.log("Ending AR session...");
                await session.end();
                setSession(null);
            } catch (error) {
                console.error("Error ending AR session:", error);
                setSession(null);
            }
        }
    };

    const handleAddCabinet = () => {
        setModels([...models, { type: "cabinet", position: [0, 0.2, 0] }]);
    };

    const handleAddFridge = () => {
        setModels([...models, { type: "fridge", position: [0, 0.2, 0] }]);
    };

    const handleModelClick = (index: number) => {
        setSelectedModelIndex(index);
    };

    const handleDeleteModel = (index: number) => {
        if (!window.confirm("Are you sure you want to delete this model?"))
            return;
        setModels(models.filter((_, i) => i !== index));
        setSelectedModelIndex(null);
    };

    const handleMoveModel = useCallback(
        (direction: "left" | "right") => {
            if (selectedModelIndex === null) return;

            setModels(
                models.map((model, index) => {
                    if (index === selectedModelIndex) {
                        const moveDistance = 0.1;
                        const newPosition: [number, number, number] = [
                            ...model.position,
                        ];
                        newPosition[0] +=
                            direction === "left" ? -moveDistance : moveDistance;
                        return { ...model, position: newPosition };
                    }
                    return model;
                })
            );
        },
        [selectedModelIndex, models]
    );

    useEffect(() => {
        const handleKeyDown = (e: KeyboardEvent) => {
            if (e.key === "ArrowLeft") handleMoveModel("left");
            else if (e.key === "ArrowRight") handleMoveModel("right");
        };
        window.addEventListener("keydown", handleKeyDown);
        return () => window.removeEventListener("keydown", handleKeyDown);
    }, [handleMoveModel]);

    if (!selectedCounterType) {
        return <CounterSelection onSelectCounter={handleSelectCounter} />;
    }

    return (
        <main>
            <CustomNotification
                message={notification.message}
                visible={notification.visible}
                onClose={() => setNotification({ ...notification, visible: false })}
                duration={5000}
            />

            {!session && (
                <button className="ar-button" onClick={handleARSession}>
                    View AR
                </button>

            )}
            <ModelSidebar
                onAddCabinet={handleAddCabinet}
                onAddFridge={handleAddFridge}
                models={models}
                onSelectModel={handleModelClick}
                onDeleteModel={handleDeleteModel}
                selectedModelIndex={selectedModelIndex} 
            />

            <Canvas camera={{ position: [0, 2, 4] }} className="canvas">
                <XR store={XRStore}>
                    <ambientLight intensity={1} />

                    {!session && <Ground />}
                    {!session && <SkyComponent />}

                    <group position={session ? [0, 0, -4] : [0, 0, 0]}>
                        {selectedCounterType === "straight" ? (
                            <StraightCounter>
                                {models.map((model, index) => {
                                    const isSelected =
                                        index === selectedModelIndex;
                                    return model.type === "cabinet" ? (
                                        <Cabinet
                                            key={index}
                                            position={model.position}
                                            onClick={() =>
                                                handleModelClick(index)
                                            }
                                            isSelected={isSelected}
                                        />
                                    ) : model.type === "fridge" ? (
                                        <Fridge
                                            key={index}
                                            position={model.position}
                                            onClick={() =>
                                                handleModelClick(index)
                                            }
                                            isSelected={isSelected}
                                        />
                                    ) : null;
                                })}
                            </StraightCounter>
                        ) : (
                            <LShapedCounter>
                                {models.map((model, index) => {
                                    const isSelected =
                                        index === selectedModelIndex;
                                    return model.type === "cabinet" ? (
                                        <Cabinet
                                            key={index}
                                            position={model.position}
                                            onClick={() =>
                                                handleModelClick(index)
                                            }
                                            isSelected={isSelected}
                                        />
                                    ) : model.type === "fridge" ? (
                                        <Fridge
                                            key={index}
                                            position={model.position}
                                            onClick={() =>
                                                handleModelClick(index)
                                            }
                                            isSelected={isSelected}
                                        />
                                    ) : null;
                                })}
                            </LShapedCounter>
                        )}
                    </group>
                    {session && (
                        <ARUIElement
                            key={`ar-ui-${arSessionId}`}
                            onButtonClick={handleExitARSession}
                        />
                    )}
                    {!session && <OrbitControls />}
                    <XROrigin />
                </XR>
            </Canvas>
        <ModelControlButtons 
            onMoveLeft={() => handleMoveModel("left")} 
            onMoveRight={() => handleMoveModel("right")} 
            disabled={selectedModelIndex === null} // Set to true if no model is selected
       />
        </main>
    );
}

export default App;

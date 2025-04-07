import { useGLTF } from "@react-three/drei";
import { useState, useRef, useEffect, useMemo } from "react";
import * as THREE from "three";
import { Box3, Vector3 } from "three";
import fridgeModel from "/src/assets/fridge.glb";

function Fridge({
    position,
    onClick,
    isSelected,
}: {
    position: [number, number, number];
    onClick: () => void;
    isSelected: boolean;
}) {
    const { scene } = useGLTF(fridgeModel);
    // Creates a memoized clone of the scene UseMemo ensures it only gets cloned when dependency changes
    const clonedScene = useMemo(() => scene.clone(), [scene]); // without cloning the scene would create a new model and dispose of the old one (Preventing multiple of the same model)
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
            // Adjust for the group's position
            center.sub(new Vector3(...position));
            setSize([dimensions.x, dimensions.y, dimensions.z]);
            setCenter([center.x, center.y, center.z]);
        }
    }, [position]);

    return (
        <group ref={ref} position={position} onClick={onClick}>
            <primitive object={clonedScene} scale={0.1} />
            {isSelected && (
                <mesh position={center}>
                    <boxGeometry args={size} />
                    <meshBasicMaterial color="#d94559" wireframe />
                </mesh>
            )}
        </group>
    );
}

export default Fridge;

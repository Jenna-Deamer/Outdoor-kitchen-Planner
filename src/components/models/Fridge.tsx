import { useGLTF } from "@react-three/drei";
import { useState, useRef, useEffect } from "react";
import * as THREE from "three";
import { Box3, Vector3 } from "three";

function Fridge({
    position,
    onClick,
    isSelected,
}: {
    position: [number, number, number];
    onClick: () => void;
    isSelected: boolean;
}) {
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

export default Fridge;

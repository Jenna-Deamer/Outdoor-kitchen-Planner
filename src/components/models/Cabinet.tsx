import { useGLTF } from "@react-three/drei";
import { useState, useRef, useEffect } from "react";
import * as THREE from "three";
import { Box3, Vector3 } from "three";

function Cabinet({
    position,
    onClick,
    isSelected,
}: {
    position: [number, number, number];
    onClick: () => void;
    isSelected: boolean;
}) {
    const cabinet = useGLTF("./src/assets/cabinet.glb");
    const ref = useRef<THREE.Group>(null); // Reference to the 3D object group
    const [size, setSize] = useState<[number, number, number]>([1, 1, 1]); // Store object dimensions
    const [center, setCenter] = useState<[number, number, number]>([0, 0, 0]); // Store object center point

    // calculate bounding box and center of the 3D model
    useEffect(() => {
        if (ref.current) {
            const box = new Box3().setFromObject(ref.current); // create box that encapsulates the object
            // calc demensions of bounding box
            const dimensions = new Vector3();
            box.getSize(dimensions);
            // calc center of bounding box
            const center = new Vector3();
            box.getCenter(center);
            // Update state with calculated dimensions and center
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

export default Cabinet;

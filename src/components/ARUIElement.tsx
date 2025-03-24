/* eslint-disable @typescript-eslint/ban-ts-comment */
// @ts-nocheck
import { useThree, useFrame } from "@react-three/fiber";
import { useState, useRef, useEffect } from "react";
import * as THREE from "three";

interface ARUIElementProps {
    onButtonClick?: () => void;
}

function ARUIElement({ onButtonClick }: ARUIElementProps) {
    const { camera } = useThree();
    const groupRef = useRef<THREE.Group>(null);
    const [isClicked, setIsClicked] = useState(false);
    const [colors, setColors] = useState({
        action: "#872341",
        hover: "#BE3144",
    });

    // Reset clicked state whenever component mounts
    useEffect(() => {
        setIsClicked(false);
        console.log("ARUIElement mounted/reset");

        // Cleanup
        return () => {
            console.log("ARUIElement unmounted");
        };
    }, []);

    // Get CSS variables
    useEffect(() => {
        const computedStyle = getComputedStyle(document.documentElement);
        setColors({
            action: computedStyle.getPropertyValue("--action-color").trim(),
            hover: computedStyle.getPropertyValue("--hover-color").trim(),
        });
    }, []);

    // Use useFrame for smoother updates
    useFrame(() => {
        if (!groupRef.current) return;

        // Position the element directly in front of the camera
        const distance = 0.8;

        // Create position vector - in front of camera, offset to top right
        const position = new THREE.Vector3(0, 0, -distance);

        // Add offsets for top-right positioning
        const rightOffset = 0.15;
        const upOffset = 0.45;

        // Create vectors for right and up directions
        const right = new THREE.Vector3(1, 0, 0);
        right.applyQuaternion(camera.quaternion);

        const up = new THREE.Vector3(0, 1, 0);
        up.applyQuaternion(camera.quaternion);

        // Apply camera's world matrix to get position in front of camera
        position.applyMatrix4(camera.matrixWorld);

        // Add offsets in the right and up directions
        position.add(right.multiplyScalar(rightOffset));
        position.add(up.multiplyScalar(upOffset));

        // Update position
        groupRef.current.position.copy(position);

        // Always face the camera (billboarding technique)
        groupRef.current.quaternion.copy(camera.quaternion);
    });

    const handleClick = (event) => {
        event.stopPropagation();
        event.preventDefault();

        console.log("AR UI Element clicked!");
        setIsClicked(true);

        setTimeout(() => {
            if (onButtonClick) onButtonClick();
        }, 100);
    };

    // Common material for both bars of the X
    const material = {
        color: isClicked ? colors.hover : colors.action,
        opacity: 0.8,
        transparent: true,
        emissive: isClicked ? colors.hover : colors.action,
        emissiveIntensity: 0.5,
    };

    // Size parameters for the X
    const length = 0.06;
    const thickness = 0.01;
    const depth = 0.01;

    return (
        <group
            ref={groupRef}
            onClick={handleClick}
            // Add pointer events to make it more interactive
            onPointerDown={(e) => {
                e.stopPropagation();
                setIsClicked(true);
            }}
            onPointerUp={(e) => {
                e.stopPropagation();
                if (onButtonClick) onButtonClick();
            }}
        >
            {/* First bar of the X (bottom-left to top-right) */}
            <mesh rotation={[0, 0, Math.PI / 4]}>
                <boxGeometry args={[length, thickness, depth]} />
                <meshStandardMaterial {...material} />
            </mesh>

            {/* Second bar of the X (top-left to bottom-right) */}
            <mesh rotation={[0, 0, -Math.PI / 4]}>
                <boxGeometry args={[length, thickness, depth]} />
                <meshStandardMaterial {...material} />
            </mesh>

            {/* Invisible hit area to make clicking easier */}
            <mesh visible={false} scale={[1.2, 1.2, 1.2]}>
                <sphereGeometry args={[length / 2, 16, 16]} />
                <meshBasicMaterial transparent opacity={0} />
            </mesh>
        </group>
    );
}

export default ARUIElement;

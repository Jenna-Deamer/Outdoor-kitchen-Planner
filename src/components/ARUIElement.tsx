/* eslint-disable @typescript-eslint/ban-ts-comment */
// @ts-nocheck
import { useThree, useFrame } from "@react-three/fiber";
import { useState, useRef, useEffect } from "react";
import * as THREE from "three";

interface ARUIElementProps {
    onButtonClick?: () => void;
    key?: string | number; //  key prop to help with remounting
}

function ARUIElement({ onButtonClick, key }: ARUIElementProps) {
    const { camera } = useThree();
    const groupRef = useRef<THREE.Group>(null);
    const [isHovered, setIsHovered] = useState(false);
    const [isActive, setIsActive] = useState(false);
    const clickTimeoutRef = useRef<NodeJS.Timeout>();

    const colors = {
        action: "#872341",
        hover: "#BE3144",
        active: "#F05941",
    };

    // Clean up any pending timeouts when component unmounts
    useEffect(() => {
        const timeoutId = clickTimeoutRef.current;
        return () => {
            if (timeoutId) {
                clearTimeout(timeoutId);
            }
        };
    }, []);

    // Position and orient the element relative to the camera
    useFrame(() => {
        if (!groupRef.current || !camera) return;

        // Position 0.8m in front of camera top right
        const distance = 0.8;
        const rightOffset = 0.15;
        const upOffset = 0.45;

        // Calculate position in world space
        const position = new THREE.Vector3(
            rightOffset,
            upOffset,
            -distance
        ).applyMatrix4(camera.matrixWorld);

        groupRef.current.position.copy(position);

        // Make the element always face the camera (billboarding)
        groupRef.current.quaternion.copy(camera.quaternion);
    });

    const handlePointerDown = (e: THREE.Event) => {
        e.stopPropagation();
        setIsActive(true);
    };

    const handlePointerUp = (e: THREE.Event) => {
        e.stopPropagation();

        if (isActive && onButtonClick) {
            onButtonClick();
        }

        setIsActive(false);
        setIsHovered(false);
    };

    const handlePointerOver = () => {
        setIsHovered(true);
    };

    const handlePointerOut = () => {
        setIsHovered(false);
        setIsActive(false);
    };

    // Determine the current color based on state
    const currentColor = isActive
        ? colors.active
        : isHovered
        ? colors.hover
        : colors.action;

    // Size parameters for the X
    const length = 0.06;
    const thickness = 0.01;
    const depth = 0.01;

    // Material configuration
    const material = {
        color: currentColor,
        emissive: currentColor,
        emissiveIntensity: 0.5,
        transparent: true,
        opacity: 0.9,
    };

    return (
        <group
            ref={groupRef}
            key={key} // Use key to ensure proper remounting
            onPointerOver={handlePointerOver}
            onPointerOut={handlePointerOut}
            onPointerDown={handlePointerDown}
            onPointerUp={handlePointerUp}
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

            {/* Invisible hit area (larger than visual for better UX) */}
            <mesh visible={false}>
                <sphereGeometry args={[length, 16, 16]} />
                <meshBasicMaterial transparent opacity={0} />
            </mesh>
        </group>
    );
}

export default ARUIElement;

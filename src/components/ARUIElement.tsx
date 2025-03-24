/* eslint-disable @typescript-eslint/ban-ts-comment */
// @ts-nocheck
import { useThree, useFrame } from "@react-three/fiber";
import { useState, useRef, useEffect } from "react";
import * as THREE from "three";

interface ARUIElementProps {
    onButtonClick?: () => void;
    sessionId?: string | number;
}

function ARUIElement({ onButtonClick, sessionId }: ARUIElementProps) {
    const { camera, gl } = useThree(); // Add gl for raycaster
    const groupRef = useRef<THREE.Group>(null);
    const [isHovered, setIsHovered] = useState(false);
    const [isActive, setIsActive] = useState(false);
    const raycaster = useRef(new THREE.Raycaster());
    const mouse = useRef(new THREE.Vector2());

    // Clean up function for manual event listeners
    useEffect(() => {
        const canvas = gl.domElement;

        // Manually handle touch/click events
        const handleTouchStart = (event) => {
            event.preventDefault();
            if (!groupRef.current) return;

            // Calculate normalized device coordinates
            const touch = event.touches[0];
            const rect = canvas.getBoundingClientRect();
            mouse.current.x =
                ((touch.clientX - rect.left) / rect.width) * 2 - 1;
            mouse.current.y =
                -((touch.clientY - rect.top) / rect.height) * 2 + 1;

            // Check if our X button is hit
            raycaster.current.setFromCamera(mouse.current, camera);
            const intersects = raycaster.current.intersectObject(
                groupRef.current,
                true
            );

            if (intersects.length > 0) {
                setIsActive(true);
            }
        };

        const handleTouchEnd = (event) => {
            event.preventDefault();
            if (isActive && onButtonClick) {
                onButtonClick();
            }
            setIsActive(false);
            setIsHovered(false);
        };

        // Add event listeners to the canvas
        canvas.addEventListener("touchstart", handleTouchStart, {
            passive: false,
        });
        canvas.addEventListener("touchend", handleTouchEnd, { passive: false });

        // Cleanup
        return () => {
            canvas.removeEventListener("touchstart", handleTouchStart);
            canvas.removeEventListener("touchend", handleTouchEnd);
        };
    }, [camera, gl, isActive, onButtonClick, sessionId]);

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

    // Determine the current color based on state
    const currentColor = isActive
        ? colors.active
        : isHovered
        ? colors.hover
        : colors.action;

    const colors = {
        action: "#872341",
        hover: "#BE3144",
        active: "#F05941",
    };

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
            key={sessionId} // Use sessionId to ensure proper remounting
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
                <sphereGeometry args={[0.1, 16, 16]} />{" "}
                {/* Increased hit area size */}
                <meshBasicMaterial transparent opacity={0} />
            </mesh>
        </group>
    );
}

export default ARUIElement;

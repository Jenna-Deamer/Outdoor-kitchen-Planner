import { useGLTF } from "@react-three/drei";
import counterModel from "/src/assets/counters/straightCounter.glb";
import { GroupProps } from "@react-three/fiber";

interface StraightCounterProps extends GroupProps {
    children?: React.ReactNode;
}

function StraightCounter({ position = [0, 0, 0], children }: StraightCounterProps) {
    const counter = useGLTF(counterModel);
    return (
        <group position={position}>
            <primitive object={counter.scene} scale={0.1} />
            {children}
        </group>
    );
}

export default StraightCounter;
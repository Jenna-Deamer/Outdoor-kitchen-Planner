import { useGLTF } from "@react-three/drei";
import counterModel from "/src/assets/counters/L-shapedCounter.glb";

function LShapedCounter({ children }: { children?: React.ReactNode }) {
    const counter = useGLTF(counterModel);
    return (
        <group position={[0, 0, 0]}>
            <primitive object={counter.scene} scale={0.1} />
            {children}
        </group>
    );
}

export default LShapedCounter;

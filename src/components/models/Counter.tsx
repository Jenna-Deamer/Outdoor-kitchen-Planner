import { useGLTF } from "@react-three/drei";

function Counter({ children }: { children?: React.ReactNode }) {
    const counter = useGLTF("/src/assets/counters/straightCounter.glb");
    return (
        <group position={[0, 0, 0]}>
            <primitive object={counter.scene} scale={0.1} />
            {children}
        </group>
    );
}

export default Counter;

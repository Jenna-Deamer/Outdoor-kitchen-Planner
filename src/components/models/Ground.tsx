function Ground() {
    return (
        <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, 0, 0]}>
            <planeGeometry args={[20, 15]} />
            {/* Width and height of the ground */}
            <meshStandardMaterial color="green" />
        </mesh>
    );
}

export default Ground;

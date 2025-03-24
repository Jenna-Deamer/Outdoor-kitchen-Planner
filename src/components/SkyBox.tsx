import { Sky } from "three/addons/objects/Sky.js";
import { MathUtils, Vector3 } from "three";
import { useThree } from "@react-three/fiber";
import { useEffect } from "react";

function SkyComponent() {
    const { scene } = useThree();

    useEffect(() => {
        const sky = new Sky();
        sky.scale.setScalar(450000);

        const phi = MathUtils.degToRad(90);
        const theta = MathUtils.degToRad(180);
        const sunPosition = new Vector3().setFromSphericalCoords(1, phi, theta);

        sky.material.uniforms.sunPosition.value = sunPosition;
        scene.add(sky);

        // Cleanup function to remove the sky when component unmounts
        return () => {
            scene.remove(sky);
        };
    }, [scene]);

    return null;
}

export default SkyComponent;

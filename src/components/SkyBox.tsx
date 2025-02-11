import { Sky } from 'three/addons/objects/Sky.js';
import { MathUtils, Vector3 } from 'three';
import {useThree} from '@react-three/fiber';
import { useEffect } from 'react';

   function SkyComponent () {
        const {scene} = useThree();
        // Skybox from //https://threejs.org/docs/#examples/en/objects/Sky
        useEffect(() => {
            const sky = new Sky();
            sky.scale.setScalar(450000);
    
            const phi = MathUtils.degToRad(90);
            const theta = MathUtils.degToRad(180);
            const sunPosition = new Vector3().setFromSphericalCoords(1, phi, theta);
    
            sky.material.uniforms.sunPosition.value = sunPosition;

            // add sky to scene
            scene.add(sky);
        }, [scene]); 

        return null; //All react components must return something to render JSX. Return null to force the component to render nothing.
     }

    export default SkyComponent;
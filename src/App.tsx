import React, { useState } from "react";

import useEventListener from "use-typed-event-listener";

import { Global } from "@emotion/react";
import { Physics, useBox } from "@react-three/cannon";
import { Canvas } from "@react-three/fiber";

const Ground: React.FC<{ position: number[]; }> = ({ position }) => {
    const [meshRef] = useBox(() => ({ type: "Static", position, mass: 1 }));

    return <mesh ref={meshRef}>
        <boxGeometry args={[500, 10]} attach="geometry" />
        <meshStandardMaterial color="red" />
    </mesh>;
};

function App() {
    const [inFly, setInFly] = useState(false);
    const [gravity, setGravity] = useState(true);

    useEventListener(window, "keydown", () => {
        // if (inFly) return;
        // setInFly(true);
        // setTimeout(() => setInFly(false), 2000);
        setGravity(s => !s);
    });

    return <>
        <Global styles={{
            body: {
                margin: 0
            }
        }} />
        <Canvas camera={{
            position: [0, 10, 0],
            // rotation: [0, Math.PI / 6, , "YXZ"]
        }}>
            <ambientLight />
            <Physics
                gravity={gravity ? [0, 30, 0] : [0, -30, 0]}
            >
                <Ground position={[0, 100, 0]} />
                <Ground position={[0, -50, 0]} />
            </Physics>
        </Canvas>
    </>;
}

export default App;

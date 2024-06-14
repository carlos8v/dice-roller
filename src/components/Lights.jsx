import { useHelper } from "@react-three/drei";
import { DirectionalLightHelper, SpotLightHelper } from "three";
import { useRef } from "react";

import { useDebugger } from "./Debugger";

export function Lights() {
  const debuggerEnabled = useDebugger();
  const spotLight = useRef(null);
  const directionLight = useRef(null);

  useHelper(spotLight, debuggerEnabled ? SpotLightHelper : null, {
    color: 0xff0000,
  });
  useHelper(directionLight, debuggerEnabled ? DirectionalLightHelper : null);

  return (
    <>
      <ambientLight color={0xffffff} />
      <directionalLight
        ref={directionLight}
        color={0xffffff}
        intensity={1}
        position={[-10, 10, 10]}
      />
      <spotLight
        castShadow
        ref={spotLight}
        color={0xffffff}
        position={[0, 20, 0]}
        intensity={1500}
        angle={Math.PI / 3}
      />
    </>
  );
}

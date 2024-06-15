import { Canvas as ThreeCanvas } from "@react-three/fiber";
import { FogExp2 } from "three";

import { Camera } from "./Camera";
import { Lights } from "./Lights";
import { Sky } from "./Sky";
import { DiceManager } from "./DiceManager";
import { Ground } from "./Ground";
import { Debugger } from "./Debugger";

export default function Canvas() {
  return (
    <div id="canvas-container" className="overflow-hidden">
      <ThreeCanvas scene={{ fog: new FogExp2(0x444444, 0.00025) }} shadows>
        <Debugger>
          <Camera />
          <Lights />
          <Sky />
          <DiceManager />
          <Ground />
        </Debugger>
      </ThreeCanvas>
    </div>
  );
}

import { Canvas } from "@react-three/fiber";
import * as THREE from "three";

import { WorldProvider } from "./contexts/WorldContext";
import { DiceProvider } from "./contexts/DiceContext";

import { ValueDisplay } from "./components/ValueDisplay";
import { DiceDrawer } from "./components/DiceDrawer";

import { Camera } from "./components/Camera";
import { Lights } from "./components/Lights";
import { Sky } from "./components/Sky";
import { DiceManager } from "./components/DiceManager";
import { Ground } from "./components/Ground";
import { Debugger } from "./components/Debugger";

function App() {
  return (
    <WorldProvider>
      <DiceProvider>
        <ValueDisplay />
        <DiceDrawer />
        <div id="canvas-container" className="overflow-hidden">
          <Canvas scene={{ fog: new THREE.FogExp2(0x444444, 0.00025) }} shadows>
            <Debugger>
              <Camera />
              <Lights />
              <Sky />
              <DiceManager />
              <Ground />
            </Debugger>
          </Canvas>
        </div>
      </DiceProvider>
    </WorldProvider>
  );
}

export default App;

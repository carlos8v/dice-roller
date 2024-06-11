import { Canvas } from '@react-three/fiber'
import * as THREE from 'three'

import { WorldProvider } from './contexts/WorldContext'
import { DiceProvider } from './contexts/DiceContext'

import { Lights } from './components/Lights'
import { Camera } from './components/Camera'
import { Sky } from './components/Sky'
import { Ground } from './components/Ground'
import { DiceManager } from './components/DiceManager'
import { Controls } from './components/Controls'
import { Debugger } from './components/Debugger'

function App() {
  return (
    <WorldProvider>
      <DiceProvider>
        <Controls />
        <div id="canvas-container">
          <Canvas scene={{ fog: new THREE.FogExp2(0x444444, 0.00025) }}>
            <Camera />
            <Lights />
            <Sky />
            <DiceManager />
            <Ground />
            <Debugger />
          </Canvas>
        </div>
      </DiceProvider>
    </WorldProvider>
  )
}

export default App

import { PerspectiveCamera, OrbitControls } from '@react-three/drei'

export function Camera() {
  return (
    <>
      <PerspectiveCamera
        makeDefault
        position={[0, 30, 30]}
        rotation={[-Math.PI / 4, 0, 0]}
        fov={75}
        near={0.01}
        far={20000}
      />
      <OrbitControls />
    </>
  )
}

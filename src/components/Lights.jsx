import { useHelper } from '@react-three/drei'
import { useRef } from 'react'
import { DirectionalLightHelper, SpotLightHelper } from 'three'

export function Lights() {
  const spotLight = useRef(null)
  const directionLight = useRef(null)

  // useHelper(spotLight, SpotLightHelper)
  // useHelper(directionLight, DirectionalLightHelper)

  return (
    <>
      <ambientLight color={0xffffff} />
      <directionalLight
        ref={directionLight}
        color={0xffffff}
        intensity={1}
        position={[-10, 10, 10]}
      />
      {/* <spotLight
        ref={spotLight}
        color={0xffffff}
        position={[0, 20, 0]}
        angle={Math.PI / 4}
        penumbra={1}
        decay={2}
        distance={20}
        castShadow={true}
      /> */}
    </>
  )
}

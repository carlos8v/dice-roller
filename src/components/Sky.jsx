import * as THREE from 'three'

export function Sky() {
  return (
    <mesh>
      <boxGeometry args={[10000, 10000, 10000]} />
      <meshPhongMaterial color={0x111111} side={THREE.BackSide} />
    </mesh>
  )
}

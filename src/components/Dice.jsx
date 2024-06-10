import { useTexture } from '@react-three/drei'
import React, { Suspense, forwardRef, useEffect } from 'react'

import { useWorld } from '../contexts/WorldContext'

/**
 * @typedef {Object} DiceProps
 * @property {number} idx
 * @property {import('cannon').Body} body
 * @property {[number, number, number]} [position]
 */

/**
 * @param {DiceProps} props
 * @param {import('../stores/dice').Dice} ref
 */
function _Dice(props, ref) {
  const { world } = useWorld()

  const materials = useTexture([
    '/D6/D6_1.png',
    '/D6/D6_2.png',
    '/D6/D6_3.png',
    '/D6/D6_4.png',
    '/D6/D6_5.png',
    '/D6/D6_6.png',
    '/D6/normal.png',
  ])

  useEffect(() => {
    return () => {
      world.current.remove(props.body)
    }
  }, [])

  function populateRef(mesh) {
    if (!mesh) return

    const yRand = Math.random() * 20
    mesh.position.x = -15 - (props.idx % 3) * 1.5
    mesh.position.y = 2 + Math.floor(props.idx / 3) * 1.5
    mesh.position.z = -15 + (props.idx % 3) * 1.5
    mesh.quaternion.x = ((Math.random() * 90 - 45) * Math.PI) / 180
    mesh.quaternion.z = ((Math.random() * 90 - 45) * Math.PI) / 180

    // Update by mesh position
    props.body.position.copy(mesh.position)
    props.body.quaternion.copy(mesh.quaternion)

    const rand = Math.random() * 5
    props.body.velocity.set(25 + rand, 40 + yRand, 15 + rand)
    props.body.angularVelocity.set(
      20 * Math.random() - 10,
      20 * Math.random() - 10,
      20 * Math.random() - 10
    )

    if (world.current) {
      world.current.addBody(props.body)
    }

    ref(mesh)
  }

  return (
    <Suspense fallback={null}>
      <mesh ref={populateRef} position={props.position}>
        <boxGeometry args={[1.5, 1.5, 1.5]} />
        <pointLight color={0xffffff} />
        <meshPhongMaterial
          attach="material-0"
          map={materials[0]}
          normalMap={materials[6]}
        />
        <meshPhongMaterial
          attach="material-1"
          map={materials[1]}
          normalMap={materials[6]}
        />
        <meshPhongMaterial
          attach="material-2"
          map={materials[2]}
          normalMap={materials[6]}
        />
        <meshPhongMaterial
          attach="material-3"
          map={materials[3]}
          normalMap={materials[6]}
        />
        <meshPhongMaterial
          attach="material-4"
          map={materials[4]}
          normalMap={materials[6]}
        />
        <meshPhongMaterial
          attach="material-5"
          map={materials[5]}
          normalMap={materials[6]}
        />
      </mesh>
    </Suspense>
  )
}

export const Dice = forwardRef(_Dice)

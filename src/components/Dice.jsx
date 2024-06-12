import { useTexture } from "@react-three/drei";
import React, { Suspense, forwardRef, useEffect } from "react";

import { useWorld } from "../contexts/WorldContext";

/**
 * @typedef {Object} DiceProps
 * @property {import('cannon').Body} body
 * @property {[number, number, number]} [position]
 */

/**
 * @param {DiceProps} props
 * @param {(mesh: import('three').Mesh) => void} ref
 */
function _Dice(props, ref) {
  const { world } = useWorld();

  const materials = useTexture([
    "/D6/D6_1.png",
    "/D6/D6_2.png",
    "/D6/D6_3.png",
    "/D6/D6_4.png",
    "/D6/D6_5.png",
    "/D6/D6_6.png",
    "/D6/normal.png",
  ]);

  useEffect(() => {
    return () => {
      world.current.remove(props.body);
    };
  }, []);

  /**
   * @param {import('three').Mesh} mesh
   */
  function handleRef(mesh) {
    if (!mesh) return;

    if (world.current) {
      world.current.addBody(props.body);
    }

    ref(mesh);
  }

  return (
    <Suspense fallback={null}>
      <mesh ref={handleRef} position={props.position}>
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
  );
}

export const Dice = forwardRef(_Dice);

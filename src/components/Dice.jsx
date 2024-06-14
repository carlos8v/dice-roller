import { useTexture } from "@react-three/drei";
import * as CANNON from "cannon-es";
import React, {
  Suspense,
  forwardRef,
  useEffect,
  useImperativeHandle,
  useRef,
} from "react";

import { useWorld } from "../contexts/WorldContext";

/**
 * @typedef {Object} DiceProps
 * @property {import('cannon-es').Body} body
 * @property {[number, number, number]} [position]
 */

/**
 * @typedef {Object} DiceRef
 * @property {import('three').Mesh} mesh
 * @property {(e: React.ChangeEvent<CANNON.Body>) => number} getTopsideValue
 */

/**
 * @param {DiceProps} props
 * @param {(diceRef: DiceRef) => void} ref
 */
function _Dice(props, ref) {
  const { world } = useWorld();

  /**
   * @type {React.MutableRefObject<import('three').Mesh>}
   */
  const meshRef = useRef(null);

  const materials = useTexture([
    "/D6/D6_2.png", // xPlus
    "/D6/D6_5.png", // xMinus
    "/D6/D6_1.png", // yPlus
    "/D6/D6_6.png", // yMinus
    "/D6/D6_3.png", // zPlus
    "/D6/D6_4.png", // zMinus
    "/D6/normal.png",
  ]);

  useEffect(() => {
    if (!world || !props.body) return;

    world.current.addBody(props.body);

    return () => {
      world.current.removeBody(props.body);
    };
  }, [world, props.body]);

  useImperativeHandle(
    ref,
    () => ({
      mesh: meshRef.current,
      /**
       * @param {React.ChangeEvent<import('cannon-es').Body>} e
       */
      getTopsideValue(e) {
        if (!props.body) {
          throw new Error("Dice cannot be without Body");
        }

        props.body.allowSleep = false;

        const euler = new CANNON.Vec3();
        e.target.quaternion.toEuler(euler);

        const eps = 0.1;
        let isZero = (angle) => Math.abs(angle) < eps;
        let isHalfPi = (angle) => Math.abs(angle - 0.5 * Math.PI) < eps;
        let isMinusHalfPi = (angle) => Math.abs(0.5 * Math.PI + angle) < eps;
        let isPiOrMinusPi = (angle) =>
          Math.abs(Math.PI - angle) < eps || Math.abs(Math.PI + angle) < eps;

        if (isZero(euler.z)) {
          if (isZero(euler.x)) {
            return 1;
          } else if (isHalfPi(euler.x)) {
            return 4;
          } else if (isMinusHalfPi(euler.x)) {
            return 3;
          } else if (isPiOrMinusPi(euler.x)) {
            return 6;
          } else {
            throw new Error(
              "Cannot determine correct topside value due to dice landing on edge",
            );
          }
        } else if (isHalfPi(euler.z)) {
          return 2;
        } else if (isMinusHalfPi(euler.z)) {
          return 5;
        }

        throw new Error(
          "Cannot determine correct topside value due to dice landing on edge",
        );
      },
    }),
    [props.body],
  );

  return (
    <Suspense fallback={null}>
      <mesh ref={meshRef} position={props.position} castShadow receiveShadow>
        <boxGeometry args={[1.5, 1.5, 1.5]} />
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

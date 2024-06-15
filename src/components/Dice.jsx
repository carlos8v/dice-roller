import { useTexture } from "@react-three/drei";
import { useFrame } from "@react-three/fiber";
import { Vec3 } from "cannon-es";
import React, { useEffect, useRef } from "react";

import { useWorld } from "../contexts/WorldContext";
import { useDiceContext } from "../contexts/DiceContext";
import { getRandomDirection } from "../stores/dice";

/**
 * @typedef {Object} DiceProps
 * @property {number} idx
 * @property {import('cannon-es').Body} body
 * @property {[number, number, number]} [position]
 */

const euler = new Vec3();

/**
 * @param {DiceProps} props
 */
export function Dice(props) {
  const { world } = useWorld();
  const { addValue } = useDiceContext();

  const materials = useTexture([
    "/d6/2.png", // xPlus
    "/d6/5.png", // xMinus
    "/d6/1.png", // yPlus
    "/d6/6.png", // yMinus
    "/d6/3.png", // zPlus
    "/d6/4.png", // zMinus
    "/d6/normal.png",
  ]);

  /**
   * @type {React.MutableRefObject<import('three').Mesh>}
   */
  const meshRef = useRef(null);

  useEffect(() => {
    if (!meshRef.current || !props.body) return;

    getRandomDirection(props.body, meshRef.current, props.idx);
  }, [meshRef, props.body]);

  useEffect(() => {
    if (!world.current || !props.body) return;

    world.current.addBody(props.body);

    props.body.addEventListener("sleep", getTopsideValue);

    return () => {
      props.body.removeEventListener("sleep", getTopsideValue);

      if (world.current) {
        world.current.removeBody(props.body);
      }
    };
  }, [world, props.body]);

  useFrame(() => {
    if (!meshRef.current) return;

    meshRef.current.position.copy(props.body.position);
    meshRef.current.quaternion.copy(props.body.quaternion);
  });

  /**
   * @param {React.ChangeEvent<import('cannon-es').Body>} e
   */
  function getTopsideValue(e) {
    if (!props.body) {
      throw new Error("Dice cannot be without Body");
    }

    props.body.allowSleep = false;

    e.target.quaternion.toEuler(euler);

    const eps = 0.1;
    let isZero = (angle) => Math.abs(angle) < eps;
    let isHalfPi = (angle) => Math.abs(angle - 0.5 * Math.PI) < eps;
    let isMinusHalfPi = (angle) => Math.abs(0.5 * Math.PI + angle) < eps;
    let isPiOrMinusPi = (angle) =>
      Math.abs(Math.PI - angle) < eps || Math.abs(Math.PI + angle) < eps;

    if (isZero(euler.z)) {
      if (isZero(euler.x)) {
        return addValue(1);
      } else if (isHalfPi(euler.x)) {
        return addValue(4);
      } else if (isMinusHalfPi(euler.x)) {
        return addValue(3);
      } else if (isPiOrMinusPi(euler.x)) {
        return addValue(6);
      } else {
        throw new Error(
          "Cannot determine correct topside value due to dice landing on edge",
        );
      }
    } else if (isHalfPi(euler.z)) {
      return addValue(2);
    } else if (isMinusHalfPi(euler.z)) {
      return addValue(5);
    }

    throw new Error(
      "Cannot determine correct topside value due to dice landing on edge",
    );
  }

  return (
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
  );
}

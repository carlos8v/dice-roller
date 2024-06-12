import { useEffect, useRef } from "react";
import { useFrame } from "@react-three/fiber";

import { Dice } from "./Dice";
import { useDiceContext } from "../contexts/DiceContext";
import { useWorld } from "../contexts/WorldContext";

/**
 * @typedef {Object} DiceRef
 * @property {import('three').Mesh} mesh
 * @property {import('cannon').Body} body
 */

export function DiceManager() {
  const { world } = useWorld();
  const { dices } = useDiceContext();

  /**
   * @type {React.MutableRefObject<Array<DiceRef>>}
   */
  const dicesRef = useRef([]);

  useEffect(() => {
    dicesRef.current = dicesRef.current.slice(0, dices.length);
    dicesRef.current.forEach(getRandomDirection);
  }, [dices]);

  useFrame(() => {
    if (!world.current) return;
    world.current.step(1.0 / 60.0);

    if (!dicesRef.current) return;

    for (let i = 0; i < dicesRef.current.length; i += 1) {
      if (!dicesRef.current[i]) continue;

      dicesRef.current[i].mesh.position.copy(dicesRef.current[i].body.position);
      dicesRef.current[i].mesh.quaternion.copy(
        dicesRef.current[i].body.quaternion,
      );
    }
  });

  /**
   * @param {import('three').Mesh} mesh
   * @param {import('cannon').Body} body
   * @param {number} idx
   */
  function handleRef(mesh, body, idx) {
    dicesRef.current[idx] = { mesh, body };
  }

  /**
   * @param {DiceRef} dice
   * @param {number} idx
   */
  function getRandomDirection({ body, mesh }, idx) {
    const yRand = Math.random() * 20;
    mesh.position.x = -15 - (idx % 3) * 1.5;
    mesh.position.y = 2 + Math.floor(idx / 3) * 1.5;
    mesh.position.z = -15 + (idx % 3) * 1.5;
    mesh.quaternion.x = ((Math.random() * 90 - 45) * Math.PI) / 180;
    mesh.quaternion.z = ((Math.random() * 90 - 45) * Math.PI) / 180;

    // Update by mesh position
    body.position.copy(mesh.position);
    body.quaternion.copy(mesh.quaternion);

    const rand = Math.random() * 5;
    body.velocity.set(25 + rand, 40 + yRand, 15 + rand);
    body.angularVelocity.set(
      20 * Math.random() - 10,
      20 * Math.random() - 10,
      20 * Math.random() - 10,
    );
  }

  return (
    <>
      {dices.map((dice, idx) => (
        <Dice
          key={dice.id}
          ref={(mesh) => handleRef(mesh, dice.body, idx)}
          body={dice.body}
        />
      ))}
    </>
  );
}

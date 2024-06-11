import { useEffect, useRef } from "react";
import { useFrame } from "@react-three/fiber";

import { Dice } from "./Dice";
import { useDiceContext } from "../contexts/DiceContext";
import { useWorld } from "../contexts/WorldContext";

export function DiceManager() {
  const { world } = useWorld();
  const { dices } = useDiceContext();

  /**
   * @type {React.MutableRefObject<Array<import('../stores/dice').Dice>>}
   */
  const dicesRef = useRef([]);

  useEffect(() => {
    dicesRef.current = dicesRef.current.slice(0, dices.length);
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

  return (
    <>
      {dices.map((dice, idx) => (
        <Dice
          key={dice.id}
          idx={idx}
          ref={(mesh) => handleRef(mesh, dice.body, idx)}
          body={dice.body}
        />
      ))}
    </>
  );
}

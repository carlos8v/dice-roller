import { Suspense } from "react";
import { useFrame } from "@react-three/fiber";

import { Dice } from "./Dice";

import { useDiceContext } from "../contexts/DiceContext";
import { useWorld } from "../contexts/WorldContext";

export function DiceManager() {
  const { world } = useWorld();
  const { dices } = useDiceContext();

  useFrame(() => {
    if (!world.current) return;
    world.current.step(1.0 / 60.0);
  });

  return (
    <>
      <Suspense fallback={null}>
        {dices.map((dice, idx) => (
          <Dice key={dice.id} idx={idx} body={dice.body} />
        ))}
      </Suspense>
    </>
  );
}

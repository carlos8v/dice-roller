import { World, NaiveBroadphase, ContactMaterial } from "cannon-es";
import { createContext, useContext, useEffect, useRef } from "react";

import { diceBodyMaterial, floorBodyMaterial } from "../constants/body";

const worldContext = createContext({});

/**
 * @typedef {Object} WorldContext
 * @property {React.MutableRefObject<World>} world
 */

/**
 * @returns {WorldContext}
 */
export const useWorld = () => useContext(worldContext);

export const WorldProvider = ({ children }) => {
  const world = useRef(
    new World({
      allowSleep: true,
    }),
  );

  useEffect(() => {
    if (!world.current) return;

    world.current.gravity.set(0, -9.82 * 20, 0);
    world.current.broadphase = new NaiveBroadphase();
    world.current.solver.iterations = 16;

    world.current.addContactMaterial(
      new ContactMaterial(floorBodyMaterial, diceBodyMaterial, {
        friction: 0.01,
        restitution: 0.5,
      }),
    );
    world.current.addContactMaterial(
      new ContactMaterial(diceBodyMaterial, diceBodyMaterial, {
        friction: 0,
        restitution: 0.5,
      }),
    );
  }, [world]);

  return (
    <worldContext.Provider value={{ world }}>{children}</worldContext.Provider>
  );
};

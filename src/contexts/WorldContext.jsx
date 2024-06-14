import { createContext, useContext, useEffect, useRef } from "react";
import * as CANNON from "cannon-es";

import { diceBodyMaterial, floorBodyMaterial } from "../constants/body";

const worldContext = createContext({});

/**
 * @typedef {Object} WorldContext
 * @property {React.MutableRefObject<CANNON.World>} world
 */

/**
 * @returns {WorldContext}
 */
export const useWorld = () => useContext(worldContext);

export const WorldProvider = ({ children }) => {
  const world = useRef(
    new CANNON.World({
      allowSleep: true,
    }),
  );

  useEffect(() => {
    if (!world.current) return;

    world.current.gravity.set(0, -9.82 * 20, 0);
    world.current.broadphase = new CANNON.NaiveBroadphase();
    world.current.solver.iterations = 16;

    world.current.addContactMaterial(
      new CANNON.ContactMaterial(floorBodyMaterial, diceBodyMaterial, {
        friction: 0.01,
        restitution: 0.5,
      }),
    );
    world.current.addContactMaterial(
      new CANNON.ContactMaterial(diceBodyMaterial, diceBodyMaterial, {
        friction: 0,
        restitution: 0.5,
      }),
    );
  }, [world]);

  return (
    <worldContext.Provider value={{ world }}>{children}</worldContext.Provider>
  );
};

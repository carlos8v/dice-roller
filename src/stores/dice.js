import { create } from "zustand";
import * as CANNON from "cannon";
import { diceBodyMaterial } from "../constants/body";

/**
 * @typedef {Object} Dice
 * @property {string} id
 * @property {import('cannon').Body} body
 */

/**
 * @typedef {Object} useDiceStore
 * @property {Array<Dice>} dices
 * @property {number} preparedDices
 * @property {(preparedDices: number) => void} setPreparedDices
 * @property {() => void} rollDices
 * @property {() => void} clearDices
 */

/**
 * @type {import('zustand').UseBoundStore<import('zustand').StoreApi<useDiceStore>}
 */
export const useDiceStore = create((set, get) => ({
  dices: [],
  preparedDices: 0,
  setPreparedDices: (preparedDices) => set({ preparedDices }),
  rollDices: () => {
    set(({ preparedDices }) => ({
      dices: [...new Array(preparedDices).keys()].map(createDice),
    }));
  },
  clearDices: () => set({ dices: [] }),
}));

function createDice(idx) {
  return {
    id: `${Date.now().toString()}-${idx}`,
    body: new CANNON.Body({
      mass: 0.3,
      shape: new CANNON.Box(new CANNON.Vec3(0.75, 0.75, 0.75)),
      material: diceBodyMaterial,
      sleepTimeLimit: 0.02,
    }),
  };
}

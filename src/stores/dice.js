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
 * @property {() => void} addDice
 * @property {() => void} removeDice
 * @property {() => void} rollDices
 * @property {() => void} clearDices
 */

const MAX_DICES = 12;
const MIN_DICES = 0;

/**
 * @type {import('zustand').UseBoundStore<import('zustand').StoreApi<useDiceStore>}
 */
export const useDiceStore = create((set) => ({
  dices: [],
  preparedDices: 0,
  addDice: () =>
    set(({ preparedDices }) => ({
      preparedDices: Math.min(preparedDices + 1, MAX_DICES),
    })),
  removeDice: () =>
    set(({ preparedDices }) => ({
      preparedDices: Math.max(preparedDices - 1, MIN_DICES),
    })),
  rollDices: () => {
    set(({ preparedDices }) => ({
      dices: [...new Array(preparedDices).keys()].map(createDice),
    }));
  },
  clearDices: () => set({ dices: [], preparedDices: 0 }),
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

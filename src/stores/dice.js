import { create } from "zustand";
import { Body, Box, Vec3 } from "cannon-es";
import { diceBodyMaterial } from "../constants/body";

/**
 * @typedef {Object} Dice
 * @property {string} id
 * @property {import('cannon-es').Body} body
 */

/**
 * @typedef {Object} useDiceStore
 * @property {number} totalValue
 * @property {(value: number) => void} addValue
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
  totalValue: 0,
  addValue: (value) =>
    set(({ totalValue }) => ({ totalValue: totalValue + value })),
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
      totalValue: 0,
      dices: [...new Array(preparedDices).keys()].map(createDice),
    }));
  },
  clearDices: () => set({ dices: [], preparedDices: 0 }),
}));

const boxVector = new Vec3(0.75, 0.75, 0.75);

function createDice(idx) {
  return {
    id: `${Date.now().toString()}-${idx}`,
    body: new Body({
      mass: 0.3,
      allowSleep: true,
      shape: new Box(boxVector),
      material: diceBodyMaterial,
      sleepTimeLimit: 0.1,
    }),
  };
}

/**
 * @param {Body} body
 * @param {import('three').Mesh} mesh
 * @param {number} idx
 */
export function getRandomDirection(body, mesh, idx) {
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

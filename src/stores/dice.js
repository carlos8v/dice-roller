import { create } from 'zustand'

/**
 * @typedef {Object} Dice
 * @property {string} id
 * @property {import('cannon').Body} body
 */

/**
 * @typedef {Object} useDiceStore
 * @property {Array<Dice>} dices
 * @property {(dice: Dice) => void} addDice
 * @property {() => void} clearDices
 */

/**
 * @type {import('zustand').UseBoundStore<import('zustand').StoreApi<useDiceStore>}
 */
export const useDiceStore = create((set, get) => ({
  dices: [],
  addDice: (newDice) => {
    if (get().dices.find(({ id }) => id === newDice.id)) return
    set(({ dices }) => ({ dices: [...dices, newDice] }))
  },
  clearDices: () => set({ dices: [] }),
}))

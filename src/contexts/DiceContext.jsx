import { createContext, useContext } from "react";
import { useDiceStore } from "../stores/dice";

/**
 * @typedef {Object} DiceContext
 * @property {Array<import('../stores/dice').Dice>} dices
 * @property {number} preparedDices
 * @property {() => void} addDice
 * @property {() => void} removeDice
 * @property {() => void} rollDices
 * @property {() => void} clearDices
 */

const diceContext = createContext({
  dices: [],
  preparedDices: 0,
  setPreparedDices: () => {},
  rollDices: () => {},
  clearDices: () => {},
});

/**
 * @returns {DiceContext}
 */
export const useDiceContext = () => useContext(diceContext);

export function DiceProvider({ children }) {
  const dices = useDiceStore((state) => state.dices);
  const rollDices = useDiceStore((state) => state.rollDices);
  const clearDices = useDiceStore((state) => state.clearDices);

  const preparedDices = useDiceStore((state) => state.preparedDices);
  const addDice = useDiceStore((state) => state.addDice);
  const removeDice = useDiceStore((state) => state.removeDice);

  return (
    <diceContext.Provider
      value={{
        dices,
        preparedDices,
        addDice,
        removeDice,
        rollDices,
        clearDices,
      }}
    >
      {children}
    </diceContext.Provider>
  );
}

import { createContext, useContext } from 'react'
import { useDiceStore } from '../stores/dice'

/**
 * @typedef {Object} DiceContext
 * @property {Array<import('../stores/dice').Dice>} dices
 * @property {(dice: import('../stores/dice').Dice) => void} addDice
 * @property {() => void} clearDices
 */

const diceContext = createContext({})

/**
 * @returns {DiceContext}
 */
export const useDiceContext = () => useContext(diceContext)

export function DiceProvider({ children }) {
  const { dices, addDice, clearDices } = useDiceStore()

  return (
    <diceContext.Provider value={{ dices, addDice, clearDices }}>
      {children}
    </diceContext.Provider>
  )
}

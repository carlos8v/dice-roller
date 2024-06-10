import * as CANNON from 'cannon'
import { useDiceContext } from '../contexts/DiceContext'
import { diceBodyMaterial } from '../constants/body'

export function Controls() {
  const { clearDices, addDice } = useDiceContext()

  function handleRoll() {
    addDice({
      id: new Date().toISOString(),
      body: new CANNON.Body({
        mass: 0.3,
        shape: new CANNON.Box(new CANNON.Vec3(0.75, 0.75, 0.75)),
        material: diceBodyMaterial,
        sleepTimeLimit: 0.02,
      }),
    })
  }

  return (
    <div>
      <button onClick={handleRoll}>Rolar dados</button>
      <button onClick={clearDices}>Limpar</button>
    </div>
  )
}

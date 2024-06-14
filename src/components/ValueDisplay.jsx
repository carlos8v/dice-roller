import { useDiceContext } from "../contexts/DiceContext";

export const ValueDisplay = () => {
  const { totalValue, dices } = useDiceContext();

  if (!dices.length || !totalValue) return null;

  return (
    <div className="fixed top-0 z-10 w-full pt-12 text-center">
      <h1 className="text-7xl font-bold text-white">{totalValue}</h1>
    </div>
  );
};

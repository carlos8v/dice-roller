import { useEffect, useState } from "react";

import { useDiceContext } from "../contexts/DiceContext";
import { classnames } from "../utils/classnames";

export const ValueDisplay = () => {
  const [canReroll, setCanReroll] = useState(false);
  const { totalValue, dices, rollDices } = useDiceContext();

  useEffect(() => {
    if (totalValue) {
      const timeout = setTimeout(() => setCanReroll(true), 800);
      return () => clearTimeout(timeout);
    }

    setCanReroll(false);
  }, [totalValue]);

  function handleReroll() {
    if (!canReroll) return;

    setCanReroll(false);
    rollDices();
  }

  if (!dices.length || !totalValue) return null;

  return (
    <div className="fixed top-0 z-10 w-full pt-12 text-center">
      <h1 className="text-7xl font-bold text-white">{totalValue}</h1>
      <button
        className={classnames({
          "mt-4 rounded bg-zinc-900 px-5 py-2 text-lg font-medium text-white transition hover:bg-zinc-950": true,
          "opacity-100": canReroll,
          "pointer-events-none opacity-0": !canReroll,
        })}
        onClick={handleReroll}
      >
        Rolar novamente
      </button>
    </div>
  );
};

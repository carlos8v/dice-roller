import { useState } from "react";

const texts = [
  "Apontando os lápis...",
  "Preenchendo a ficha de personagem...",
  "Montando a masmorra...",
];

let times = 0;
const MAX_TIMES = 2;

const firstDisplay = Math.ceil(Math.random() * texts.length) - 1;

export const CanvasLoader = () => {
  const [displayingIdx, setDisplayingIdx] = useState(firstDisplay);

  function updateText() {
    times++;

    if (times >= MAX_TIMES) {
      times = 0;
      setDisplayingIdx((prev) => {
        return prev + 1 >= texts.length ? 0 : prev + 1;
      });
    }
  }

  return (
    <div className="fixed inset-0 flex items-center justify-center text-white">
      <p
        className="animate-pulse text-4xl font-medium opacity-0 transition"
        onAnimationIteration={updateText}
      >
        {texts[displayingIdx]}
      </p>
    </div>
  );
};

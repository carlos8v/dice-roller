import { useEffect, useState } from "react";
import { Minus, Plus } from "lucide-react";
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "./UI/Drawer";
import { useDiceContext } from "../contexts/DiceContext";
import { classnames } from "../utils/classnames";
import { shortcuts } from "../utils/shortcuts";

export function DiceDrawer() {
  const [open, setOpen] = useState(false);

  const { clearDices, rollDices, preparedDices, addDice, removeDice } =
    useDiceContext();

  useEffect(() => {
    const unsubscribe = shortcuts([
      {
        key: ["i", "space"],
        callback: toggleOpen,
      },
      {
        key: "r",
        callback: rollDices,
      },
      {
        key: "c",
        callback: clearDices,
      },
    ]);

    return unsubscribe;
  }, []);

  useEffect(() => {
    if (open) {
      const unsubscribe = shortcuts([
        {
          key: "enter",
          callback: handleRoll,
        },
        {
          key: ["up", "w"],
          callback: addDice,
        },
        {
          key: ["down", "s"],
          callback: removeDice,
        },
      ]);

      return unsubscribe;
    }
  }, [open]);

  function toggleOpen() {
    setOpen((prev) => !prev);
  }

  function handleRoll() {
    setOpen(false);
    rollDices();
  }

  return (
    <Drawer open={open} onOpenChange={setOpen}>
      <DrawerTrigger asChild>
        <button className="fixed bottom-0 left-1/2 z-10 -translate-x-1/2 select-none rounded-t-lg border border-zinc-800 bg-zinc-900 px-4 py-3 text-base font-medium text-white outline-none transition hover:bg-zinc-950">
          Escolher dados
        </button>
      </DrawerTrigger>
      <DrawerContent className="border-zinc-800 bg-zinc-900 outline-none">
        <div className="mx-auto w-full max-w-sm text-white">
          <DrawerHeader>
            <DrawerTitle>Escolher dados</DrawerTitle>
            <DrawerDescription>
              Escolha a quantidade de dados que deseja jogar
            </DrawerDescription>
          </DrawerHeader>
          <div className="my-2 flex flex-col items-center px-4">
            <button
              className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full border border-zinc-400 text-lg font-medium"
              onClick={addDice}
            >
              <Plus className="h-4 w-4" />
            </button>
            <p className="my-2 text-lg font-medium">{preparedDices}</p>
            <button
              className={classnames({
                "flex h-8 w-8 items-center justify-center rounded-full border border-zinc-400 text-lg font-medium transition": true,
                "cursor-not-allowed border-zinc-600 text-zinc-600":
                  preparedDices === 0,
              })}
              onClick={removeDice}
            >
              <Minus className="h-4 w-4" />
            </button>
            <button
              className="self-end font-thin text-zinc-300"
              onClick={clearDices}
            >
              Limpar
            </button>
          </div>
          <DrawerFooter>
            <button
              className="rounded bg-white px-4 py-2 text-center font-medium text-black"
              onClick={handleRoll}
            >
              Rolar dados
            </button>
            <DrawerClose asChild>
              <button className="rounded border border-zinc-700 bg-transparent px-4 py-2 text-center font-medium text-white transition hover:bg-zinc-700">
                Voltar
              </button>
            </DrawerClose>
          </DrawerFooter>
        </div>
      </DrawerContent>
    </Drawer>
  );
}

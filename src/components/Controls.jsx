import { useState } from "react";
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
import { classnames } from "../utils";

export function Controls() {
  const [open, setOpen] = useState(false);

  const { clearDices, rollDices, preparedDices, setPreparedDices } =
    useDiceContext();

  function handleRoll() {
    setOpen(false);
    clearDices();
    rollDices();
  }

  function handleClear() {
    clearDices();
    setPreparedDices(0);
  }

  return (
    <Drawer open={open} onOpenChange={setOpen}>
      <DrawerTrigger asChild>
        <div className="fixed bottom-0 left-1/2 z-10 -translate-x-1/2 rounded-t-lg border border-zinc-800 bg-zinc-900 px-4 py-3">
          <button className="text-base font-medium text-white">
            Escolher dados
          </button>
        </div>
      </DrawerTrigger>
      <DrawerContent className="border-zinc-800 bg-zinc-900">
        <div className="mx-auto w-full max-w-sm text-white">
          <DrawerHeader>
            <DrawerTitle>Escolher dados</DrawerTitle>
            <DrawerDescription>
              Escolha a quantidade de dados que deseja jogar
            </DrawerDescription>
          </DrawerHeader>
          <div className="my-2 flex flex-col items-center px-4">
            <button
              className="flex h-8 w-8 w-fit shrink-0 items-center justify-center rounded-full border border-zinc-400 text-lg font-medium"
              onClick={() => setPreparedDices(preparedDices + 1)}
            >
              <Plus />
            </button>
            <p className="my-2 text-lg font-medium">{preparedDices}</p>
            <button
              className={classnames({
                "flex h-8 w-8 w-fit items-center justify-center rounded-full border border-zinc-400 text-lg font-medium transition": true,
                "cursor-not-allowed border-zinc-600 text-zinc-600":
                  preparedDices === 0,
              })}
              onClick={() => setPreparedDices(Math.max(preparedDices - 1, 0))}
            >
              <Minus />
            </button>
            <button
              className="self-end font-thin text-zinc-300"
              onClick={handleClear}
            >
              Limpar
            </button>
          </div>
          <DrawerFooter>
            <button
              className="rounded bg-white px-4 py-2 text-center font-medium text-black"
              onClick={handleRoll}
            >
              Jogar
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

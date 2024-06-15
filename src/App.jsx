import { Suspense, lazy } from "react";

import { WorldProvider } from "./contexts/WorldContext";
import { DiceProvider } from "./contexts/DiceContext";

import { ValueDisplay } from "./components/ValueDisplay";
import { DiceDrawer } from "./components/DiceDrawer";

const Canvas = lazy(() => import("./components/Canvas"));

function App() {
  return (
    <WorldProvider>
      <DiceProvider>
        <ValueDisplay />
        <DiceDrawer />
        <Suspense fallback={null}>
          <Canvas />
        </Suspense>
      </DiceProvider>
    </WorldProvider>
  );
}

export default App;

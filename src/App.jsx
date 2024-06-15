import { Suspense, lazy } from "react";

import { WorldProvider } from "./contexts/WorldContext";
import { DiceProvider } from "./contexts/DiceContext";

import { ValueDisplay } from "./components/ValueDisplay";
import { DiceDrawer } from "./components/DiceDrawer";
import { CanvasLoader } from "./components/CanvasLoader";

const Canvas = lazy(() => import("./components/Canvas"));

function App() {
  return (
    <WorldProvider>
      <DiceProvider>
        <ValueDisplay />
        <DiceDrawer />
        <Suspense fallback={<CanvasLoader />}>
          <Canvas />
        </Suspense>
      </DiceProvider>
    </WorldProvider>
  );
}

export default App;

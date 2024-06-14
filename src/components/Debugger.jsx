import { createContext, useContext, useEffect, useRef, useState } from "react";
import CannonDebugger from "cannon-es-debugger";
import Mousetrap from "mousetrap";
import { useFrame, useThree } from "@react-three/fiber";
import { useWorld } from "../contexts/WorldContext";

const MeshVisibilityChangedEventName = "meshvisibilitychanged";

const debuggerContext = createContext(false);

/**
 * @returns {boolean}
 */
export const useDebugger = () => useContext(debuggerContext);

export function Debugger({ children }) {
  const { scene } = useThree();
  const { world } = useWorld();
  const [debuggerEnabled, setDebuggerEnabled] = useState(false);

  /**
   * @type {React.MutableRefObject<ReturnType<CannonDebugger>>}
   */
  const worldDebugger = useRef(null);

  useEffect(() => {
    Mousetrap.bind("d", toggleDebugger);
    return () => Mousetrap.unbind("d");
  }, []);

  useEffect(() => {
    const meshEvent = new CustomEvent(MeshVisibilityChangedEventName, {
      detail: debuggerEnabled,
    });

    document.dispatchEvent(meshEvent);
  }, [debuggerEnabled]);

  useEffect(() => {
    if (!world.current) return;

    let handlers = [];

    worldDebugger.current = new CannonDebugger(scene, world.current, {
      onInit: (_body, mesh) => {
        /**
         * @param {Event} e
         */
        function handler(e) {
          mesh.visible = e.detail ?? false;
        }

        handlers.push(handler);

        document.addEventListener(MeshVisibilityChangedEventName, handler);
      },
    });

    return () => {
      handlers.forEach((handler) =>
        document.removeEventListener(MeshVisibilityChangedEventName, handler),
      );
    };
  }, [world]);

  useFrame(() => {
    if (!worldDebugger.current || !debuggerEnabled) return;
    worldDebugger.current.update();
  });

  function toggleDebugger() {
    setDebuggerEnabled((prev) => !prev);
  }

  return (
    <debuggerContext.Provider value={debuggerEnabled}>
      {children}
    </debuggerContext.Provider>
  );
}

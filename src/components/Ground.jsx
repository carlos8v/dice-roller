import { DoubleSide } from "three";
import { Body, Plane, Vec3 } from "cannon-es";
import { useEffect } from "react";

import { useWorld } from "../contexts/WorldContext";
import { floorBodyMaterial } from "../constants/body";

const vector = new Vec3(1, 0, 0);

export function Ground() {
  const { world } = useWorld();

  useEffect(() => {
    if (!world.current) return;

    const floorBody = new Body({
      mass: 0,
      shape: new Plane(),
      material: floorBodyMaterial,
    });

    floorBody.quaternion.setFromAxisAngle(vector, -Math.PI / 2);

    world.current.addBody(floorBody);

    return () => {
      if (world.current) {
        world.current.removeBody(floorBody);
      }
    };
  }, [world]);

  return (
    <mesh receiveShadow position={[0, 0, 0]} rotation={[Math.PI / 2, 0, 0]}>
      <planeGeometry args={[30, 30, 10, 10]} />
      <meshPhongMaterial color={0xbababa} side={DoubleSide} />
    </mesh>
  );
}

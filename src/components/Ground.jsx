import * as THREE from "three";
import { useEffect } from "react";
import * as CANNON from "cannon-es";
import { floorBodyMaterial } from "../constants/body";
import { useWorld } from "../contexts/WorldContext";

export function Ground() {
  const { world } = useWorld();

  useEffect(() => {
    if (!world.current) return;

    const floorBody = new CANNON.Body({
      mass: 0,
      shape: new CANNON.Plane(),
      material: floorBodyMaterial,
    });

    floorBody.quaternion.setFromAxisAngle(
      new CANNON.Vec3(1, 0, 0),
      -Math.PI / 2,
    );

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
      <meshPhongMaterial color={0xbababa} side={THREE.DoubleSide} />
    </mesh>
  );
}

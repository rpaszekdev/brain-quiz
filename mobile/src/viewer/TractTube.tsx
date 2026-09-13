import { useEffect, useMemo } from "react";
import * as THREE from "three";
import type { NeuralPathway } from "@/lib/types";

/** Millimetres; real tracts are wider, but a thin tube reads better on a phone. */
const TUBE_RADIUS = 1.4;
const TUBE_SEGMENTS = 64;
const TUBE_SIDES = 8;

/** A white-matter tract as a smooth tube through its RAS waypoints. */
export function TractTube({ tract }: { tract: NeuralPathway }) {
  const geometry = useMemo(() => {
    const curve = new THREE.CatmullRomCurve3(
      tract.waypoints.map(([x, y, z]) => new THREE.Vector3(x, y, z)),
    );
    return new THREE.TubeGeometry(curve, TUBE_SEGMENTS, TUBE_RADIUS, TUBE_SIDES, false);
  }, [tract]);
  useEffect(() => () => geometry.dispose(), [geometry]);
  const color = useMemo(
    () => new THREE.Color(tract.color[0] / 255, tract.color[1] / 255, tract.color[2] / 255),
    [tract],
  );
  return (
    <mesh geometry={geometry}>
      <meshLambertMaterial color={color} emissive={color} emissiveIntensity={0.5} />
    </mesh>
  );
}

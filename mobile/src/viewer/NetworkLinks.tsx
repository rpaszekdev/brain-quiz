import { useEffect, useMemo } from "react";
import * as THREE from "three";
import type { FunctionalNetwork } from "@/lib/types";

interface NetworkLinksProps {
  network: FunctionalNetwork;
  /** Centre of each region's meshes; members without a mesh are skipped. */
  centres: ReadonlyMap<string, THREE.Vector3>;
}

/** A functional network as straight links between its connected members. */
export function NetworkLinks({ network, centres }: NetworkLinksProps) {
  const geometry = useMemo(() => {
    const points: number[] = [];
    for (const [a, b] of network.connections) {
      const from = centres.get(a);
      const to = centres.get(b);
      if (from && to) points.push(from.x, from.y, from.z, to.x, to.y, to.z);
    }
    const geo = new THREE.BufferGeometry();
    geo.setAttribute("position", new THREE.Float32BufferAttribute(points, 3));
    return geo;
  }, [network, centres]);
  useEffect(() => () => geometry.dispose(), [geometry]);
  const color = useMemo(
    () => new THREE.Color(network.color[0] / 255, network.color[1] / 255, network.color[2] / 255),
    [network],
  );
  return (
    <lineSegments geometry={geometry}>
      <lineBasicMaterial color={color} />
    </lineSegments>
  );
}

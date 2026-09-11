import { useEffect, useMemo } from "react";
import { Platform } from "react-native";
import { Asset } from "expo-asset";
import * as THREE from "three";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader.js";
import { useLoader, type ThreeEvent } from "@react-three/fiber/native";
import { BRAIN_REGIONS, buildMeshToRegionMap, type BrainRegion } from "@/lib/brain-regions";
import brainGlb from "../../assets/brain.glb";
import { lookFor, type FocusMode } from "./highlight";

const UNASSIGNED_COLOR = new THREE.Color(0.88, 0.87, 0.85);

interface TaggedMesh {
  readonly mesh: THREE.Mesh;
  readonly region: BrainRegion | null;
  readonly material: THREE.MeshStandardMaterial;
}

/**
 * Give every mesh its own material coloured by region, the way the website's
 * OBJ loop does. The GLB carries userData.meshFile from the conversion script,
 * which is the key BRAIN_REGIONS uses — node names are not trusted because
 * GLTFLoader strips dots and slashes out of them.
 */
function tagMeshes(root: THREE.Object3D): readonly TaggedMesh[] {
  const fileToRegion = buildMeshToRegionMap();
  const tagged: TaggedMesh[] = [];
  root.traverse((child) => {
    if (!(child instanceof THREE.Mesh)) return;
    const file = child.userData.meshFile;
    const regionId = typeof file === "string" ? fileToRegion.get(file) ?? null : null;
    const region = BRAIN_REGIONS.find((r) => r.id === regionId) ?? null;
    const color = region
      ? new THREE.Color(region.color[0] / 255, region.color[1] / 255, region.color[2] / 255)
      : UNASSIGNED_COLOR;
    const material = new THREE.MeshStandardMaterial({
      color,
      emissive: color,
      emissiveIntensity: region ? 0.05 : 0,
      transparent: true,
      opacity: region ? 0.85 : 0.6,
      side: THREE.DoubleSide,
      depthWrite: true,
    });
    child.material = material;
    child.userData.regionId = region?.id ?? null;
    tagged.push({ mesh: child, region, material });
  });
  return tagged;
}

export interface BrainModelProps {
  focusId: string | null;
  mode: FocusMode;
  categoryFilter: BrainRegion["category"] | null;
  onTapRegion?: (region: BrainRegion) => void;
  /** Fires once the meshes are tagged, with the model's bounding-box centre. */
  onReady?: (center: THREE.Vector3) => void;
}

export function BrainModel({ focusId, mode, categoryFilter, onTapRegion, onReady }: BrainModelProps) {
  // On the phone R3F native accepts a Metro asset id and resolves it through
  // expo-asset (its type only admits strings, hence the cast). In a browser
  // that polyfill is skipped, so hand Three a plain URL instead.
  const source =
    Platform.OS === "web" ? Asset.fromModule(brainGlb).uri : (brainGlb as unknown as string);
  const gltf = useLoader(GLTFLoader, source);
  // useLoader caches one scene per asset. Two viewers alive at once (Play over
  // Explore) must not fight over the same materials, so each gets a clone;
  // geometry is shared, only the 102 materials are per-instance.
  const root = useMemo(() => gltf.scene.clone(true), [gltf.scene]);
  const tagged = useMemo(() => tagMeshes(root), [root]);

  useEffect(() => {
    const center = new THREE.Box3().setFromObject(root).getCenter(new THREE.Vector3());
    onReady?.(center);
  }, [root, tagged, onReady]);

  // Three materials are mutable by design; this effect is the one place that
  // writes to them, and it derives every value from props.
  useEffect(() => {
    for (const { region, material } of tagged) {
      const look = lookFor({ region, focusId, mode, categoryFilter });
      material.opacity = look.opacity;
      material.emissiveIntensity = look.emissive;
    }
  }, [tagged, focusId, mode, categoryFilter]);

  const handleClick = (event: ThreeEvent<MouseEvent>) => {
    event.stopPropagation();
    // The nearest hit is often an unassigned sliver — paracentral lobule,
    // corpus callosum, a ventricle — so walk the ray to the first mesh that
    // names a region rather than dropping the tap.
    for (const hit of event.intersections) {
      const region = BRAIN_REGIONS.find((r) => r.id === hit.object.userData.regionId);
      if (region) {
        onTapRegion?.(region);
        return;
      }
    }
  };

  return <primitive object={root} onClick={handleClick} />;
}

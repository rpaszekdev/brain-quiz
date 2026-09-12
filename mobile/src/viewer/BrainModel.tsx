import { useEffect, useMemo, type RefObject } from "react";
import { Platform } from "react-native";
import { Asset } from "expo-asset";
import * as THREE from "three";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader.js";
import { useLoader, useThree } from "@react-three/fiber/native";
import { BRAIN_REGIONS, type BrainRegion } from "@/lib/brain-regions";
import brainGlb from "../../assets/brain.glb";
import { lookFor, type FocusMode } from "./highlight";

const UNASSIGNED_COLOR = new THREE.Color(0.88, 0.87, 0.85);

/** Region under a canvas point (in layout pixels), or null. */
export type PickRegion = (x: number, y: number) => BrainRegion | null;

interface TaggedMesh {
  readonly mesh: THREE.Mesh;
  readonly region: BrainRegion | null;
  readonly material: THREE.MeshLambertMaterial;
}

/**
 * One mesh per region, coloured like the website. The GLB carries
 * userData.regionId from the conversion script — node names are not trusted
 * because GLTFLoader strips dots and slashes out of them.
 */
function tagMeshes(root: THREE.Object3D): readonly TaggedMesh[] {
  const tagged: TaggedMesh[] = [];
  root.traverse((child) => {
    if (!(child instanceof THREE.Mesh)) return;
    const region = BRAIN_REGIONS.find((r) => r.id === child.userData.regionId) ?? null;
    const color = region
      ? new THREE.Color(region.color[0] / 255, region.color[1] / 255, region.color[2] / 255)
      : UNASSIGNED_COLOR;
    // ponytail: Lambert, front faces only. Standard + DoubleSide + transparent
    // cost the phone GPU ~4× and looked the same at phone size.
    const material = new THREE.MeshLambertMaterial({
      color,
      emissive: color,
      emissiveIntensity: 0,
      side: THREE.FrontSide,
    });
    child.material = material;
    tagged.push({ mesh: child, region, material });
  });
  return tagged;
}

export interface BrainModelProps {
  focusId: string | null;
  mode: FocusMode;
  categoryFilter: BrainRegion["category"] | null;
  /** Filled once the model is loaded; the canvas calls it on a confirmed tap. */
  pickRef: RefObject<PickRegion | null>;
  /** Fires once the meshes are tagged, with the model's bounding-box centre. */
  onReady?: (center: THREE.Vector3) => void;
}

export function BrainModel({ focusId, mode, categoryFilter, pickRef, onReady }: BrainModelProps) {
  // On the phone R3F native accepts a Metro asset id and resolves it through
  // expo-asset (its type only admits strings, hence the cast). In a browser
  // that polyfill is skipped, so hand Three a plain URL instead.
  const source =
    Platform.OS === "web" ? Asset.fromModule(brainGlb).uri : (brainGlb as unknown as string);
  const gltf = useLoader(GLTFLoader, source);
  // useLoader caches one scene per asset. Two viewers alive at once (Play over
  // Explore) must not fight over the same materials, so each gets a clone;
  // geometry is shared, only the 50 materials are per-instance.
  const root = useMemo(() => gltf.scene.clone(true), [gltf.scene]);
  const tagged = useMemo(() => tagMeshes(root), [root]);
  const get = useThree((state) => state.get);
  const invalidate = useThree((state) => state.invalidate);

  useEffect(() => {
    const center = new THREE.Box3().setFromObject(root).getCenter(new THREE.Vector3());
    onReady?.(center);
  }, [root, tagged, onReady]);

  // Picking is done here rather than with R3F's onClick: R3F raycasts every
  // handler-bearing object on touch down AND up, which is the whole brain in
  // the Hermes interpreter at every drag start. This raycast runs once, and
  // only after the canvas has confirmed a tap.
  useEffect(() => {
    pickRef.current = (x, y) => {
      const { camera, raycaster, size } = get();
      const ndc = new THREE.Vector2((x / size.width) * 2 - 1, -(y / size.height) * 2 + 1);
      raycaster.setFromCamera(ndc, camera);
      // The nearest hit is often an unassigned sliver — corpus callosum, a
      // ventricle — so walk the ray to the first mesh that names a region.
      for (const hit of raycaster.intersectObject(root, true)) {
        const region = BRAIN_REGIONS.find((r) => r.id === hit.object.userData.regionId);
        if (region) return region;
      }
      return null;
    };
    return () => {
      pickRef.current = null;
    };
  }, [get, root, pickRef]);

  // Three materials are mutable by design; this effect is the one place that
  // writes to them, and it derives every value from props.
  useEffect(() => {
    for (const { region, material } of tagged) {
      const look = lookFor({ region, focusId, mode, categoryFilter });
      const transparent = look.opacity < 1;
      if (material.transparent !== transparent) {
        // Opaque programs are compiled with alpha pinned to 1, so flipping
        // needs a recompile — once per program key, two keys in total.
        material.transparent = transparent;
        material.depthWrite = !transparent;
        material.needsUpdate = true;
      }
      material.opacity = look.opacity;
      material.emissiveIntensity = look.emissive;
    }
    invalidate();
  }, [tagged, focusId, mode, categoryFilter, invalidate]);

  return <primitive object={root} />;
}

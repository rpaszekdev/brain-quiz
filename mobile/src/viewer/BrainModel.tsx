import { useEffect, useMemo, type RefObject } from "react";
import { Platform } from "react-native";
import { Asset } from "expo-asset";
import * as THREE from "three";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader.js";
import { useLoader, useThree } from "@react-three/fiber/native";
import { BRAIN_REGIONS, type BrainRegion } from "@/lib/brain-regions";
import brainGlb from "../../assets/brain.glb";
import { clipPlaneFor, isWholeBrain } from "./clip";
import { lookFor } from "./highlight";
import { NetworkLinks } from "./NetworkLinks";
import type { BrainScene } from "./scene";
import { TractTube } from "./TractTube";

const UNASSIGNED_COLOR = new THREE.Color(0.88, 0.87, 0.85);
/** Below this cortex opacity a tap passes through the cortex to what is under it. */
const CORTEX_TAPPABLE_ABOVE = 0.5;

/** Region under a canvas point (in layout pixels), or null. */
export type PickRegion = (x: number, y: number) => BrainRegion | null;

interface TaggedMesh {
  readonly mesh: THREE.Mesh;
  /** Primary owner (first in declaration order) — drives colour. */
  readonly region: BrainRegion | null;
  /** Every owning region id. Empty for unassigned slivers. */
  readonly regionIds: readonly string[];
  readonly material: THREE.MeshLambertMaterial;
}

function regionById(id: string): BrainRegion | null {
  return BRAIN_REGIONS.find((r) => r.id === id) ?? null;
}

/**
 * The GLB carries extras.regionIds (all owners) into userData — node names
 * are not trusted because GLTFLoader strips dots and slashes out of them.
 */
function ownerIds(userData: unknown): readonly string[] {
  const data = userData as { regionId?: unknown; regionIds?: unknown };
  if (Array.isArray(data.regionIds)) {
    return data.regionIds.filter((id): id is string => typeof id === "string");
  }
  return typeof data.regionId === "string" ? [data.regionId] : [];
}

/** One mesh per atlas owner-set, coloured by its primary owner. */
function tagMeshes(root: THREE.Object3D): readonly TaggedMesh[] {
  const tagged: TaggedMesh[] = [];
  root.traverse((child) => {
    if (!(child instanceof THREE.Mesh)) return;
    const ids = ownerIds(child.userData);
    const region = ids.length > 0 ? regionById(ids[0]) : null;
    const color = region
      ? new THREE.Color(region.color[0] / 255, region.color[1] / 255, region.color[2] / 255)
      : UNASSIGNED_COLOR;
    // A near-white region (corpus callosum) glows invisibly on the washi
    // background, so its glow is a shade darker than its fill.
    const emissive = color.getHSL({ h: 0, s: 0, l: 0 }).l > 0.8 ? color.clone().offsetHSL(0, 0, -0.35) : color;
    // ponytail: Lambert, front faces only. Standard + DoubleSide + transparent
    // cost the phone GPU ~4× and looked the same at phone size.
    const material = new THREE.MeshLambertMaterial({
      color,
      emissive,
      emissiveIntensity: 0,
      side: THREE.FrontSide,
    });
    child.material = material;
    tagged.push({ mesh: child, region, regionIds: ids, material });
  });
  return tagged;
}

/** Centre of every region's meshes, where network links attach. */
function regionCentres(tagged: readonly TaggedMesh[]): Map<string, THREE.Vector3> {
  const boxes = new Map<string, THREE.Box3>();
  for (const { mesh, regionIds } of tagged) {
    const box = new THREE.Box3().setFromObject(mesh);
    for (const id of regionIds) {
      const seen = boxes.get(id);
      boxes.set(id, seen ? seen.clone().union(box) : box.clone());
    }
  }
  return new Map([...boxes].map(([id, box]) => [id, box.getCenter(new THREE.Vector3())]));
}

export interface BrainModelProps {
  scene: BrainScene;
  /** Filled once the model is loaded; the canvas calls it on a confirmed tap. */
  pickRef: RefObject<PickRegion | null>;
  /** Fires once the meshes are tagged, with the model's bounding-box centre. */
  onReady?: (center: THREE.Vector3) => void;
}

export function BrainModel({ scene, pickRef, onReady }: BrainModelProps) {
  // On the phone R3F native accepts a Metro asset id and resolves it through
  // expo-asset (its type only admits strings, hence the cast). In a browser
  // that polyfill is skipped, so hand Three a plain URL instead.
  const source =
    Platform.OS === "web" ? Asset.fromModule(brainGlb).uri : (brainGlb as unknown as string);
  const gltf = useLoader(GLTFLoader, source);
  // useLoader caches one scene per asset. Two viewers alive at once (Play over
  // Explore) must not fight over the same materials, so each gets a clone;
  // geometry is shared, only the materials are per-instance.
  const root = useMemo(() => {
    const clone = gltf.scene.clone(true);
    clone.updateMatrixWorld(true);
    return clone;
  }, [gltf.scene]);
  const tagged = useMemo(() => tagMeshes(root), [root]);
  const centres = useMemo(() => regionCentres(tagged), [tagged]);
  const bounds = useMemo(() => new THREE.Box3().setFromObject(root), [root]);
  const get = useThree((state) => state.get);
  const invalidate = useThree((state) => state.invalidate);

  useEffect(() => {
    onReady?.(bounds.getCenter(new THREE.Vector3()));
  }, [bounds, tagged, onReady]);

  // Picking is done here rather than with R3F's onClick: R3F raycasts every
  // handler-bearing object on touch down AND up, which is the whole brain in
  // the Hermes interpreter at every drag start. This raycast runs once, and
  // only after the canvas has confirmed a tap.
  useEffect(() => {
    const clip = clipPlaneFor(scene.slice, bounds);
    // The depth slider decides which layer a finger lands on: a faded cortex
    // is glass, and the tap reaches the structure beneath it.
    const throughCortex = scene.cortexOpacity < CORTEX_TAPPABLE_ABOVE;
    pickRef.current = (x, y) => {
      const { camera, raycaster, size } = get();
      const ndc = new THREE.Vector2((x / size.width) * 2 - 1, -(y / size.height) * 2 + 1);
      raycaster.setFromCamera(ndc, camera);
      // The nearest hit is often an unassigned sliver — corpus callosum, a
      // ventricle — so walk the ray to the first mesh that names a region.
      for (const hit of raycaster.intersectObject(root, true)) {
        // What the slice cut away is not there to be tapped.
        if (clip && clip.distanceToPoint(hit.point) < 0) continue;
        const ids = ownerIds(hit.object.userData);
        if (ids.length === 0) continue;
        // On a shared mesh prefer the region the viewer is focused on, so a
        // tap on inferiorparietal while exploring the angular gyrus picks it.
        const focused = ids.find((id) => scene.focusIds.includes(id));
        const region = regionById(focused ?? ids[0]);
        if (throughCortex && region?.category === "cortical") continue;
        return region;
      }
      return null;
    };
    return () => {
      pickRef.current = null;
    };
  }, [get, root, pickRef, scene, bounds]);

  // Three materials are mutable by design; this effect is the one place that
  // writes to them, and it derives every value from the scene.
  useEffect(() => {
    const clip = clipPlaneFor(scene.slice, bounds);
    const planes = clip ? [clip] : null;
    // A cut mesh is a hollow shell seen from inside, so show its back faces
    // while a cut is open; front faces alone are cheaper the rest of the time.
    const side = isWholeBrain(scene.slice) ? THREE.FrontSide : THREE.DoubleSide;
    for (const { region, regionIds, material } of tagged) {
      if (material.side !== side) {
        material.side = side;
        material.needsUpdate = true;
      }
      material.clippingPlanes = planes;
      const look = lookFor({ region, regionIds, scene });
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
  }, [tagged, scene, bounds, invalidate]);

  return (
    <>
      <primitive object={root} />
      {scene.tract && <TractTube tract={scene.tract} />}
      {scene.network && <NetworkLinks network={scene.network} centres={centres} />}
    </>
  );
}

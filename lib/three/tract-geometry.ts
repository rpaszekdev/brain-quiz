/**
 * TractOverlay — Three.js white matter tract visualization.
 *
 * Renders neural pathways as smooth tube meshes from CatmullRomCurve3 splines.
 * Each tract pulses with a subtle emissive highlight that travels along its length.
 */

import * as THREE from "three";
import type { NeuralPathway } from "../types";
import type { VisualizationOverlay } from "../types";

interface TractMeshEntry {
  readonly mesh: THREE.Mesh;
  readonly material: THREE.MeshStandardMaterial;
  readonly pathway: NeuralPathway;
  visible: boolean;
  /** Phase offset for staggered pulse animation (radians) */
  readonly phaseOffset: number;
}

const TUBE_SEGMENTS = 64;
const TUBE_RADIUS = 3.0;
const TUBE_RADIAL_SEGMENTS = 8;
const BASE_OPACITY = 0.9;
const BASE_EMISSIVE_INTENSITY = 0.4;
const PULSE_EMISSIVE_PEAK = 0.8;
const PULSE_SPEED = 1.8; // radians per second

export class TractOverlay implements VisualizationOverlay {
  readonly id = "tract-overlay";
  readonly group = "tracts";

  private readonly scene: THREE.Scene;
  private readonly tracts = new Map<string, TractMeshEntry>();
  private enabled = false;
  private elapsed = 0;

  /** External brain materials — used to toggle X-ray cortex mode */
  private regionMaterials: Map<string, THREE.MeshStandardMaterial[]> | null =
    null;
  private unassignedMeshes: Map<string, THREE.Object3D> | null = null;
  private meshToRegion: Map<string, string> | null = null;

  constructor(scene: THREE.Scene, pathways: ReadonlyArray<NeuralPathway>) {
    this.scene = scene;
    this.buildTracts(pathways);
  }

  /** Call after construction to enable X-ray cortex mode when overlay is active */
  setRegionMaterials(
    regionMaterials: Map<string, THREE.MeshStandardMaterial[]>,
    meshByFile: Map<string, THREE.Object3D>,
    meshToRegion: Map<string, string>,
  ): void {
    this.regionMaterials = regionMaterials;
    this.unassignedMeshes = meshByFile;
    this.meshToRegion = meshToRegion;
  }

  // ── Lifecycle ──────────────────────────────────

  enable(): void {
    if (this.enabled) return;
    this.enabled = true;
    for (const entry of this.tracts.values()) {
      if (entry.visible) {
        this.scene.add(entry.mesh);
      }
    }
    this.setCortexXray(true);
  }

  disable(): void {
    if (!this.enabled) return;
    this.enabled = false;
    for (const entry of this.tracts.values()) {
      this.scene.remove(entry.mesh);
    }
    this.setCortexXray(false);
  }

  /** Toggle cortex transparency so internal tracts are visible */
  private setCortexXray(xray: boolean): void {
    if (!this.regionMaterials || this.regionMaterials.size === 0) {
      console.warn(
        "[TractOverlay] No region materials available for X-ray mode",
      );
      return;
    }

    const targetOpacity = xray ? 0.12 : 0.85;
    const targetEmissive = xray ? 0.0 : 0.05;

    for (const mats of this.regionMaterials.values()) {
      for (const mat of mats) {
        mat.opacity = targetOpacity;
        mat.emissiveIntensity = targetEmissive;
        mat.depthWrite = !xray;
        mat.needsUpdate = true;
      }
    }

    // Also handle unassigned meshes
    if (this.unassignedMeshes && this.meshToRegion) {
      for (const [file, mesh] of this.unassignedMeshes) {
        if (this.meshToRegion.get(file)) continue;
        mesh.traverse((child) => {
          if (child instanceof THREE.Mesh) {
            const m = child.material as THREE.MeshStandardMaterial;
            m.opacity = xray ? 0.05 : 0.6;
            m.needsUpdate = true;
          }
        });
      }
    }
  }

  update(deltaTime: number): void {
    if (!this.enabled) return;
    this.elapsed += deltaTime;

    for (const entry of this.tracts.values()) {
      if (!entry.visible) continue;
      // Oscillate emissive intensity with per-tract phase offset
      const wave = Math.sin(this.elapsed * PULSE_SPEED + entry.phaseOffset);
      const t = (wave + 1) / 2; // normalize 0..1
      entry.material.emissiveIntensity =
        BASE_EMISSIVE_INTENSITY +
        t * (PULSE_EMISSIVE_PEAK - BASE_EMISSIVE_INTENSITY);
    }
  }

  dispose(): void {
    this.disable();
    for (const entry of this.tracts.values()) {
      entry.mesh.geometry.dispose();
      entry.material.dispose();
    }
    this.tracts.clear();
  }

  // ── Visibility controls ────────────────────────

  showTract(tractId: string): void {
    const entry = this.tracts.get(tractId);
    if (!entry || entry.visible) return;
    entry.visible = true;
    if (this.enabled) {
      this.scene.add(entry.mesh);
    }
  }

  hideTract(tractId: string): void {
    const entry = this.tracts.get(tractId);
    if (!entry || !entry.visible) return;
    entry.visible = false;
    if (this.enabled) {
      this.scene.remove(entry.mesh);
    }
  }

  showAll(): void {
    for (const [id] of this.tracts) {
      this.showTract(id);
    }
  }

  hideAll(): void {
    for (const [id] of this.tracts) {
      this.hideTract(id);
    }
  }

  showByType(type: "association" | "commissural" | "projection"): void {
    for (const [id, entry] of this.tracts) {
      if (entry.pathway.type === type) {
        this.showTract(id);
      } else {
        this.hideTract(id);
      }
    }
  }

  isTractVisible(tractId: string): boolean {
    return this.tracts.get(tractId)?.visible ?? false;
  }

  isEnabled(): boolean {
    return this.enabled;
  }

  // ── Internal ───────────────────────────────────

  private buildTracts(pathways: ReadonlyArray<NeuralPathway>): void {
    let index = 0;
    for (const pathway of pathways) {
      if (pathway.waypoints.length < 2) continue;

      const points = pathway.waypoints.map(
        ([x, y, z]) => new THREE.Vector3(x, y, z),
      );
      const curve = new THREE.CatmullRomCurve3(
        points,
        false,
        "catmullrom",
        0.5,
      );
      const geometry = new THREE.TubeGeometry(
        curve,
        TUBE_SEGMENTS,
        TUBE_RADIUS,
        TUBE_RADIAL_SEGMENTS,
        false,
      );

      const [r, g, b] = pathway.color;
      const color = new THREE.Color(r / 255, g / 255, b / 255);

      const material = new THREE.MeshStandardMaterial({
        color,
        emissive: color,
        emissiveIntensity: BASE_EMISSIVE_INTENSITY,
        transparent: true,
        opacity: BASE_OPACITY,
        depthWrite: false,
        depthTest: false,
        side: THREE.DoubleSide,
        roughness: 0.3,
        metalness: 0.2,
      });

      const mesh = new THREE.Mesh(geometry, material);
      mesh.renderOrder = 10; // Render after opaque brain
      mesh.name = `tract-${pathway.id}`;

      this.tracts.set(pathway.id, {
        mesh,
        material,
        pathway,
        visible: true,
        phaseOffset: (index / pathways.length) * Math.PI * 2,
      });

      index++;
    }
  }
}

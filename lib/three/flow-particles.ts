/**
 * NeurotransmitterOverlay — Animated particle flow along NT pathways.
 *
 * Creates spline paths from source nuclei to target regions using waypoints,
 * animates instanced-mesh particles along each curve, and highlights
 * the origin nucleus with an emissive glow.
 * group = "neurotransmitters" (triggers X-ray cortex mode via OverlayManager).
 */

import * as THREE from "three";
import type { VisualizationOverlay, NeurotransmitterSystem } from "../types";
import { NEUROTRANSMITTER_SYSTEMS } from "../data/neurotransmitters";

const PARTICLES_PER_PATHWAY = 20;
const PARTICLE_RADIUS = 0.5;

interface PathwayInstance {
  curve: THREE.CatmullRomCurve3;
  instancedMesh: THREE.InstancedMesh;
  offsets: number[];
}

interface SystemVisual {
  system: NeurotransmitterSystem;
  pathways: PathwayInstance[];
  originGlow: THREE.Mesh | null;
  visible: boolean;
}

export class NeurotransmitterOverlay implements VisualizationOverlay {
  readonly id = "neurotransmitter-overlay";
  readonly group = "neurotransmitters";

  private scene: THREE.Scene;
  private regionMaterials: Map<string, THREE.MeshStandardMaterial[]>;
  private meshByFile: Map<string, THREE.Object3D>;
  private meshToRegion: Map<string, string>;

  private systems = new Map<string, SystemVisual>();
  private elapsedTime = 0;
  private enabled = false;
  private sharedGeometry: THREE.SphereGeometry | null = null;

  constructor(
    scene: THREE.Scene,
    regionMaterials: Map<string, THREE.MeshStandardMaterial[]>,
    meshByFile: Map<string, THREE.Object3D>,
    meshToRegion: Map<string, string>,
  ) {
    this.scene = scene;
    this.regionMaterials = regionMaterials;
    this.meshByFile = meshByFile;
    this.meshToRegion = meshToRegion;
  }

  enable(): void {
    if (this.enabled) return;
    this.enabled = true;
    this.sharedGeometry = new THREE.SphereGeometry(PARTICLE_RADIUS, 6, 4);
    this.buildAllSystems();
  }

  disable(): void {
    if (!this.enabled) return;
    this.hideAll();
    this.disposeAllSystems();
    this.sharedGeometry?.dispose();
    this.sharedGeometry = null;
    this.enabled = false;
  }

  update(deltaTime: number): void {
    if (!this.enabled) return;
    this.elapsedTime += deltaTime;

    const dummy = new THREE.Object3D();

    for (const visual of this.systems.values()) {
      if (!visual.visible) continue;

      for (const pw of visual.pathways) {
        for (let i = 0; i < pw.offsets.length; i++) {
          const t = (this.elapsedTime * 0.15 + pw.offsets[i]) % 1;
          const point = pw.curve.getPointAt(t);
          dummy.position.copy(point);
          dummy.updateMatrix();
          pw.instancedMesh.setMatrixAt(i, dummy.matrix);
        }
        pw.instancedMesh.instanceMatrix.needsUpdate = true;
      }
    }
  }

  dispose(): void {
    this.disable();
  }

  // ─── Public API ──────────────────────────────────

  showSystem(ntId: string): void {
    const visual = this.systems.get(ntId);
    if (!visual || visual.visible) return;

    visual.visible = true;
    for (const pw of visual.pathways) {
      pw.instancedMesh.visible = true;
    }
    if (visual.originGlow) {
      visual.originGlow.visible = true;
    }
    this.updateCortexXray();
  }

  hideSystem(ntId: string): void {
    const visual = this.systems.get(ntId);
    if (!visual || !visual.visible) return;

    visual.visible = false;
    for (const pw of visual.pathways) {
      pw.instancedMesh.visible = false;
    }
    if (visual.originGlow) {
      visual.originGlow.visible = false;
    }
    this.updateCortexXray();
  }

  showAll(): void {
    for (const id of this.systems.keys()) {
      this.showSystem(id);
    }
  }

  hideAll(): void {
    for (const id of this.systems.keys()) {
      this.hideSystem(id);
    }
  }

  getVisibleSystems(): string[] {
    const result: string[] = [];
    for (const [id, visual] of this.systems) {
      if (visual.visible) result.push(id);
    }
    return result;
  }

  /** Set cortex to X-ray when any system is visible, restore when none are */
  private updateCortexXray(): void {
    const anyVisible = this.getVisibleSystems().length > 0;
    const targetOpacity = anyVisible ? 0.12 : 0.85;
    const targetEmissive = anyVisible ? 0.0 : 0.05;

    for (const mats of this.regionMaterials.values()) {
      for (const mat of mats) {
        mat.opacity = targetOpacity;
        mat.emissiveIntensity = targetEmissive;
      }
    }

    for (const [file, mesh] of this.meshByFile) {
      if (this.meshToRegion.get(file)) continue;
      mesh.traverse((child) => {
        if (child instanceof THREE.Mesh) {
          (child.material as THREE.MeshStandardMaterial).opacity = anyVisible
            ? 0.05
            : 0.6;
        }
      });
    }
  }

  // ─── Internal helpers ────────────────────────────

  private buildAllSystems(): void {
    for (const system of NEUROTRANSMITTER_SYSTEMS) {
      const visual = this.buildSystemVisual(system);
      this.systems.set(system.id, visual);
    }
  }

  private buildSystemVisual(system: NeurotransmitterSystem): SystemVisual {
    const color = new THREE.Color(
      system.color[0] / 255,
      system.color[1] / 255,
      system.color[2] / 255,
    );

    const pathways: PathwayInstance[] = [];

    for (const pathway of system.pathways) {
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

      const material = new THREE.MeshBasicMaterial({
        color,
        transparent: true,
        opacity: 0.85,
      });

      const instancedMesh = new THREE.InstancedMesh(
        this.sharedGeometry!,
        material,
        PARTICLES_PER_PATHWAY,
      );
      instancedMesh.visible = false;

      const offsets: number[] = [];
      for (let i = 0; i < PARTICLES_PER_PATHWAY; i++) {
        offsets.push(i / PARTICLES_PER_PATHWAY);
      }

      this.scene.add(instancedMesh);
      pathways.push({ curve, instancedMesh, offsets });
    }

    // Origin nucleus glow
    const originGlow = this.createOriginGlow(system, color);

    return {
      system,
      pathways,
      originGlow,
      visible: false,
    };
  }

  private createOriginGlow(
    system: NeurotransmitterSystem,
    color: THREE.Color,
  ): THREE.Mesh | null {
    // Use the first waypoint of the first pathway as the origin position
    const firstPathway = system.pathways[0];
    if (!firstPathway || firstPathway.waypoints.length === 0) return null;

    const [x, y, z] = firstPathway.waypoints[0];
    const geometry = new THREE.SphereGeometry(2.5, 12, 8);
    const material = new THREE.MeshStandardMaterial({
      color,
      emissive: color,
      emissiveIntensity: 0.8,
      transparent: true,
      opacity: 0.7,
    });

    const mesh = new THREE.Mesh(geometry, material);
    mesh.position.set(x, y, z);
    mesh.visible = false;
    this.scene.add(mesh);

    return mesh;
  }

  private disposeAllSystems(): void {
    for (const visual of this.systems.values()) {
      for (const pw of visual.pathways) {
        this.scene.remove(pw.instancedMesh);
        pw.instancedMesh.dispose();
        (pw.instancedMesh.material as THREE.Material).dispose();
      }
      if (visual.originGlow) {
        this.scene.remove(visual.originGlow);
        visual.originGlow.geometry.dispose();
        (visual.originGlow.material as THREE.Material).dispose();
      }
    }
    this.systems.clear();
  }
}

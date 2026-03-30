/**
 * NetworkOverlay — Functional network visualization on the 3D brain.
 *
 * Recolors member-region meshes with the network's color, dims non-members,
 * and draws dashed connection lines between network nodes.
 * Only one network is visible at a time (mutually exclusive within the overlay).
 * group = "surface-color" (mutually exclusive with vascular overlay).
 */

import * as THREE from "three";
import type { VisualizationOverlay } from "../types";
import type { FunctionalNetwork } from "../types";
import { FUNCTIONAL_NETWORKS } from "../data/networks";

interface StoredMaterial {
  color: THREE.Color;
  emissiveIntensity: number;
  opacity: number;
}

export class NetworkOverlay implements VisualizationOverlay {
  readonly id = "network-overlay";
  readonly group = "surface-color";

  private scene: THREE.Scene;
  private regionMaterials: Map<string, THREE.MeshStandardMaterial[]>;
  private meshByFile: Map<string, THREE.Object3D>;
  private meshToRegion: Map<string, string>;

  private originalMaterials = new Map<string, StoredMaterial[]>();
  private connectionGroup: THREE.Group | null = null;
  private currentNetworkId: string | null = null;
  private enabled = false;

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
    this.storeOriginalMaterials();

    const firstNetwork = FUNCTIONAL_NETWORKS[0];
    if (firstNetwork) {
      this.showNetwork(firstNetwork.id);
    }
  }

  disable(): void {
    if (!this.enabled) return;
    this.hideNetwork();
    this.restoreOriginalMaterials();
    this.enabled = false;
  }

  update(_deltaTime: number): void {
    // Network overlay is static — no per-frame animation needed
  }

  dispose(): void {
    this.disable();
    this.originalMaterials.clear();
  }

  // ─── Public API ──────────────────────────────────

  showNetwork(networkId: string): void {
    const network = FUNCTIONAL_NETWORKS.find((n) => n.id === networkId);
    if (!network) return;

    // Remove previous connection lines
    this.removeConnectionLines();

    this.currentNetworkId = networkId;
    const memberSet = new Set(network.memberRegions);

    // Recolor all region materials
    for (const [regionId, mats] of this.regionMaterials) {
      const isMember = memberSet.has(regionId);
      for (const mat of mats) {
        if (isMember) {
          mat.color.setRGB(
            network.color[0] / 255,
            network.color[1] / 255,
            network.color[2] / 255,
          );
          mat.emissiveIntensity = 0.4;
          mat.opacity = 1.0;
        } else {
          mat.opacity = 0.1;
          mat.emissiveIntensity = 0.0;
        }
      }
    }

    // Dim unassigned meshes
    for (const [file, mesh] of this.meshByFile) {
      if (this.meshToRegion.get(file)) continue;
      mesh.traverse((child) => {
        if (child instanceof THREE.Mesh) {
          const mat = child.material as THREE.MeshStandardMaterial;
          mat.opacity = 0.04;
        }
      });
    }

    // Draw connection lines
    this.drawConnectionLines(network);
  }

  hideNetwork(): void {
    this.removeConnectionLines();
    this.currentNetworkId = null;
  }

  getCurrentNetworkId(): string | null {
    return this.currentNetworkId;
  }

  // ─── Internal helpers ────────────────────────────

  private storeOriginalMaterials(): void {
    this.originalMaterials.clear();
    for (const [regionId, mats] of this.regionMaterials) {
      const stored: StoredMaterial[] = mats.map((m) => ({
        color: m.color.clone(),
        emissiveIntensity: m.emissiveIntensity,
        opacity: m.opacity,
      }));
      this.originalMaterials.set(regionId, stored);
    }
  }

  private restoreOriginalMaterials(): void {
    for (const [regionId, mats] of this.regionMaterials) {
      const stored = this.originalMaterials.get(regionId);
      if (!stored) continue;
      for (let i = 0; i < mats.length; i++) {
        const original = stored[i];
        if (!original) continue;
        mats[i].color.copy(original.color);
        mats[i].emissiveIntensity = original.emissiveIntensity;
        mats[i].opacity = original.opacity;
      }
    }

    // Restore unassigned meshes
    for (const [file, mesh] of this.meshByFile) {
      if (this.meshToRegion.get(file)) continue;
      mesh.traverse((child) => {
        if (child instanceof THREE.Mesh) {
          const mat = child.material as THREE.MeshStandardMaterial;
          mat.opacity = 0.6;
        }
      });
    }
  }

  private drawConnectionLines(network: FunctionalNetwork): void {
    const group = new THREE.Group();
    group.name = "network-connections";

    const material = new THREE.LineDashedMaterial({
      color: new THREE.Color(
        network.color[0] / 255,
        network.color[1] / 255,
        network.color[2] / 255,
      ),
      dashSize: 3,
      gapSize: 2,
      linewidth: 1,
      transparent: true,
      opacity: 0.7,
    });

    for (const [sourceId, targetId] of network.connections) {
      const sourcePos = this.getRegionCenter(sourceId);
      const targetPos = this.getRegionCenter(targetId);
      if (!sourcePos || !targetPos) continue;

      const geometry = new THREE.BufferGeometry().setFromPoints([sourcePos, targetPos]);
      const line = new THREE.LineSegments(geometry, material.clone());
      line.computeLineDistances();
      group.add(line);
    }

    this.scene.add(group);
    this.connectionGroup = group;
  }

  private removeConnectionLines(): void {
    if (!this.connectionGroup) return;
    this.connectionGroup.traverse((child) => {
      if (child instanceof THREE.LineSegments) {
        child.geometry.dispose();
        (child.material as THREE.Material).dispose();
      }
    });
    this.scene.remove(this.connectionGroup);
    this.connectionGroup = null;
  }

  private getRegionCenter(regionId: string): THREE.Vector3 | null {
    // Find meshes belonging to this region and compute their bounding box center
    for (const [file, mesh] of this.meshByFile) {
      const mappedRegion = this.meshToRegion.get(file);
      if (mappedRegion !== regionId) continue;

      const box = new THREE.Box3();
      mesh.traverse((child) => {
        if (child instanceof THREE.Mesh) {
          child.geometry.computeBoundingBox();
          if (child.geometry.boundingBox) {
            const worldBox = child.geometry.boundingBox.clone();
            worldBox.applyMatrix4(child.matrixWorld);
            box.union(worldBox);
          }
        }
      });

      if (!box.isEmpty()) {
        const center = new THREE.Vector3();
        box.getCenter(center);
        return center;
      }
    }
    return null;
  }
}

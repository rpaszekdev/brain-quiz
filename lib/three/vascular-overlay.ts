/**
 * VascularOverlay — Recolors brain regions by arterial vascular territory.
 *
 * MCA = red, ACA = blue, PCA = green (plus basilar/PICA).
 * No new geometry — only recolors existing region materials.
 * group = "surface-color" (mutually exclusive with network overlay).
 */

import * as THREE from "three";
import type { VisualizationOverlay } from "../types";
import { VASCULAR_TERRITORIES } from "../data/clinical";

interface StoredMaterial {
  color: THREE.Color;
  emissiveIntensity: number;
  opacity: number;
}

export class VascularOverlay implements VisualizationOverlay {
  readonly id = "vascular-overlay";
  readonly group = "surface-color";

  private regionMaterials: Map<string, THREE.MeshStandardMaterial[]>;
  private meshByFile: Map<string, THREE.Object3D>;
  private meshToRegion: Map<string, string>;

  private originalMaterials = new Map<string, StoredMaterial[]>();
  private enabled = false;
  private currentTerritoryId: string | null = null;

  constructor(
    regionMaterials: Map<string, THREE.MeshStandardMaterial[]>,
    meshByFile: Map<string, THREE.Object3D>,
    meshToRegion: Map<string, string>,
  ) {
    this.regionMaterials = regionMaterials;
    this.meshByFile = meshByFile;
    this.meshToRegion = meshToRegion;
  }

  enable(): void {
    if (this.enabled) return;
    this.enabled = true;
    this.storeOriginalMaterials();
    this.showAll();
  }

  disable(): void {
    if (!this.enabled) return;
    this.hide();
    this.restoreOriginalMaterials();
    this.enabled = false;
  }

  update(_deltaTime: number): void {
    // Vascular overlay is static — no per-frame animation needed
  }

  dispose(): void {
    this.disable();
    this.originalMaterials.clear();
  }

  // ─── Public API ──────────────────────────────────

  showTerritory(territoryId: string): void {
    const territory = VASCULAR_TERRITORIES.find((t) => t.id === territoryId);
    if (!territory) return;

    this.currentTerritoryId = territoryId;
    const memberSet = new Set(territory.regionIds);

    for (const [regionId, mats] of this.regionMaterials) {
      const isMember = memberSet.has(regionId);
      for (const mat of mats) {
        if (isMember) {
          mat.color.setRGB(
            territory.color[0] / 255,
            territory.color[1] / 255,
            territory.color[2] / 255,
          );
          mat.emissiveIntensity = 0.3;
          mat.opacity = 1.0;
        } else {
          mat.opacity = 0.1;
          mat.emissiveIntensity = 0.0;
        }
      }
    }

    this.dimUnassignedMeshes(0.04);
  }

  showAll(): void {
    this.currentTerritoryId = null;

    // Build region-to-territory lookup
    const regionToTerritory = new Map<string, [number, number, number]>();
    for (const territory of VASCULAR_TERRITORIES) {
      for (const regionId of territory.regionIds) {
        regionToTerritory.set(regionId, territory.color);
      }
    }

    for (const [regionId, mats] of this.regionMaterials) {
      const color = regionToTerritory.get(regionId);
      for (const mat of mats) {
        if (color) {
          mat.color.setRGB(color[0] / 255, color[1] / 255, color[2] / 255);
          mat.emissiveIntensity = 0.25;
          mat.opacity = 0.9;
        } else {
          mat.opacity = 0.15;
          mat.emissiveIntensity = 0.0;
        }
      }
    }

    this.dimUnassignedMeshes(0.06);
  }

  hide(): void {
    this.currentTerritoryId = null;
  }

  getCurrentTerritoryId(): string | null {
    return this.currentTerritoryId;
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

  private dimUnassignedMeshes(opacity: number): void {
    for (const [file, mesh] of this.meshByFile) {
      if (this.meshToRegion.get(file)) continue;
      mesh.traverse((child) => {
        if (child instanceof THREE.Mesh) {
          const mat = child.material as THREE.MeshStandardMaterial;
          mat.opacity = opacity;
        }
      });
    }
  }
}

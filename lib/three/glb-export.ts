/**
 * GLB export — produces a .glb binary suitable for PowerPoint's
 * "Insert > 3D Models" feature.
 *
 * Exports the current scene as-is, so whichever highlight state
 * the brain is in (e.g. selected pathway with connected regions
 * boosted and others ghosted) is what ends up in the file.
 */

import * as THREE from "three";
import { GLTFExporter } from "three/addons/exporters/GLTFExporter.js";

export interface ExportOptions {
  readonly filename: string;
  /** Skip lights (PowerPoint applies its own). Default: true */
  readonly stripLights?: boolean;
}

export async function exportSceneAsGlb(
  scene: THREE.Scene,
  options: ExportOptions,
): Promise<void> {
  const { filename, stripLights = true } = options;

  const exportInput = stripLights
    ? scene.children.filter((c) => !(c instanceof THREE.Light))
    : scene;

  const exporter = new GLTFExporter();
  const result = (await exporter.parseAsync(exportInput, {
    binary: true,
    onlyVisible: true,
    embedImages: true,
  })) as ArrayBuffer;

  triggerDownload(result, filename);
}

function triggerDownload(buffer: ArrayBuffer, filename: string): void {
  const blob = new Blob([buffer], { type: "model/gltf-binary" });
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  a.download = filename.endsWith(".glb") ? filename : `${filename}.glb`;
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
  setTimeout(() => URL.revokeObjectURL(url), 1000);
}

export function slugify(text: string): string {
  return text
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");
}

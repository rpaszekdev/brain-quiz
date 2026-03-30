/**
 * OverlayManager — manages visualization overlays on the 3D brain.
 * Handles mutual exclusion within groups, cortex transparency modes, and lifecycle.
 */

import type { VisualizationOverlay } from "./types";

export type CortexMode = "opaque" | "xray" | "hidden";

export class OverlayManager {
  private overlays = new Map<string, VisualizationOverlay>();
  private activeOverlays = new Set<string>();
  private cortexMode: CortexMode = "opaque";
  private cortexTransitionTarget: CortexMode = "opaque";
  private cortexOpacity = 0.85;
  private onCortexOpacityChange: ((opacity: number) => void) | null = null;

  constructor(onCortexOpacityChange?: (opacity: number) => void) {
    this.onCortexOpacityChange = onCortexOpacityChange || null;
  }

  register(overlay: VisualizationOverlay): void {
    this.overlays.set(overlay.id, overlay);
  }

  unregister(id: string): void {
    this.disable(id);
    const overlay = this.overlays.get(id);
    overlay?.dispose();
    this.overlays.delete(id);
  }

  enable(id: string): void {
    const overlay = this.overlays.get(id);
    if (!overlay) return;

    // Disable other overlays in the same group (mutual exclusion)
    for (const [otherId, other] of this.overlays) {
      if (otherId !== id && other.group === overlay.group && this.activeOverlays.has(otherId)) {
        other.disable();
        this.activeOverlays.delete(otherId);
      }
    }

    overlay.enable();
    this.activeOverlays.add(id);

    // Auto-enable X-ray mode for internal overlays
    const internalGroups = ["tracts", "neurotransmitters"];
    if (internalGroups.includes(overlay.group)) {
      this.setCortexMode("xray");
    }
  }

  disable(id: string): void {
    const overlay = this.overlays.get(id);
    if (!overlay) return;

    overlay.disable();
    this.activeOverlays.delete(id);

    // Restore opaque cortex if no internal overlays are active
    const internalGroups = ["tracts", "neurotransmitters"];
    const hasInternalActive = Array.from(this.activeOverlays).some((activeId) => {
      const o = this.overlays.get(activeId);
      return o && internalGroups.includes(o.group);
    });
    if (!hasInternalActive) {
      this.setCortexMode("opaque");
    }
  }

  toggle(id: string): void {
    if (this.activeOverlays.has(id)) {
      this.disable(id);
    } else {
      this.enable(id);
    }
  }

  isActive(id: string): boolean {
    return this.activeOverlays.has(id);
  }

  getActiveInGroup(group: string): string | null {
    for (const id of this.activeOverlays) {
      const overlay = this.overlays.get(id);
      if (overlay?.group === group) return id;
    }
    return null;
  }

  setCortexMode(mode: CortexMode): void {
    this.cortexTransitionTarget = mode;
    this.cortexMode = mode;
  }

  getCortexMode(): CortexMode {
    return this.cortexMode;
  }

  /** Called every frame — handles smooth transitions and overlay updates */
  update(deltaTime: number): void {
    // Smooth cortex opacity transition (400ms)
    const targetOpacity =
      this.cortexTransitionTarget === "opaque"
        ? 0.85
        : this.cortexTransitionTarget === "xray"
          ? 0.12
          : 0.0;

    const speed = 2.5 * deltaTime; // ~400ms to complete
    if (Math.abs(this.cortexOpacity - targetOpacity) > 0.001) {
      this.cortexOpacity += (targetOpacity - this.cortexOpacity) * Math.min(speed, 1);
      this.onCortexOpacityChange?.(this.cortexOpacity);
    }

    // Update all active overlays
    for (const id of this.activeOverlays) {
      const overlay = this.overlays.get(id);
      overlay?.update(deltaTime);
    }
  }

  disableAll(): void {
    for (const id of Array.from(this.activeOverlays)) {
      this.disable(id);
    }
  }

  dispose(): void {
    for (const overlay of this.overlays.values()) {
      overlay.dispose();
    }
    this.overlays.clear();
    this.activeOverlays.clear();
  }
}

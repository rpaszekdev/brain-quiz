import { useSyncExternalStore } from "react";
import { NO_SLICE, type Slice } from "../viewer/clip";
import { ALL_VIEW, BARE_OPACITY, SOLID_OPACITY, type ExploreView } from "./view";

/**
 * Explore's selection lives outside React: the search hub and the article
 * page are separate routes that set it, then return to the Explore tab.
 */
export interface ExploreState {
  readonly view: ExploreView;
  readonly selectedId: string | null;
  /** Cortex opacity held by the tools panel, 1 solid → BARE_OPACITY bare. */
  readonly opacity: number;
  /** Where the brain is cut open. */
  readonly slice: Slice;
}

const INITIAL: ExploreState = {
  view: ALL_VIEW,
  selectedId: null,
  opacity: SOLID_OPACITY,
  slice: NO_SLICE,
};

let state: ExploreState = INITIAL;
const listeners = new Set<() => void>();

function publish(next: ExploreState): void {
  state = next;
  for (const listener of listeners) listener();
}

export const explore = {
  /**
   * Switch view; a fresh view starts with nothing selected unless given.
   * Asking for deep structures also pulls the cortex out of the way — that
   * is the whole reason for going there.
   */
  setView(view: ExploreView, selectedId: string | null = null): void {
    publish({
      ...state,
      view,
      selectedId,
      opacity: view.kind === "deep" ? BARE_OPACITY : state.opacity,
    });
  },
  select(selectedId: string | null): void {
    publish({ ...state, selectedId });
  },
  setOpacity(opacity: number): void {
    if (opacity === state.opacity) return;
    publish({ ...state, opacity });
  },
  setSlice(slice: Slice): void {
    publish({ ...state, slice });
  },
  reset(): void {
    publish(INITIAL);
  },
};

function subscribe(listener: () => void): () => void {
  listeners.add(listener);
  return () => {
    listeners.delete(listener);
  };
}

export function useExplore(): ExploreState {
  return useSyncExternalStore(subscribe, () => state, () => state);
}

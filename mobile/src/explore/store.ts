import { useSyncExternalStore } from "react";
import { ALL_VIEW, type ExploreView } from "./view";

/**
 * Explore's selection lives outside React: the search hub and the article
 * page are separate routes that set it, then return to the Explore tab.
 */
export interface ExploreState {
  readonly view: ExploreView;
  readonly selectedId: string | null;
}

let state: ExploreState = { view: ALL_VIEW, selectedId: null };
const listeners = new Set<() => void>();

function publish(next: ExploreState): void {
  state = next;
  for (const listener of listeners) listener();
}

export const explore = {
  /** Switch view; a fresh view starts with nothing selected unless given. */
  setView(view: ExploreView, selectedId: string | null = null): void {
    publish({ view, selectedId });
  },
  select(selectedId: string | null): void {
    publish({ ...state, selectedId });
  },
  reset(): void {
    publish({ view: ALL_VIEW, selectedId: null });
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

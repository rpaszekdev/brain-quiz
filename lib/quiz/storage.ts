/**
 * Where quiz history and unfinished sessions are kept.
 *
 * The web reads window.localStorage. The Expo app has no localStorage, so it
 * injects a store with the same three methods at startup. Everything above
 * this file stays synchronous and never learns which one it got.
 */
export interface KeyValueStore {
  getItem(key: string): string | null;
  setItem(key: string, value: string): void;
  removeItem(key: string): void;
}

let injected: KeyValueStore | null = null;

export function configureStorage(store: KeyValueStore): void {
  injected = store;
}

/** null during SSR and in any runtime that has not injected a store. */
export function getStorage(): KeyValueStore | null {
  if (injected) return injected;
  if (typeof window !== "undefined" && window.localStorage) {
    return window.localStorage;
  }
  return null;
}

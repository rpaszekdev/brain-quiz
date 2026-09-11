import { Platform } from "react-native";
import { configureStorage } from "@/lib/quiz/storage";

/**
 * Hands lib/quiz the phone's key-value store.
 *
 * expo-sqlite's kv-store has a synchronous API, so history.ts and session.ts
 * keep their shape and every caller stays synchronous. MMKV would do the same
 * but needs a native build; this one runs in Expo Go.
 *
 * On web (used for headless testing) nothing is injected: lib/quiz/storage.ts
 * already falls back to window.localStorage, and expo-sqlite has no sync open
 * in a browser. The require is deferred for the same reason — the module
 * opens its database the moment it is evaluated.
 */
export function installStorage(): void {
  if (Platform.OS === "web") return;
  // eslint-disable-next-line @typescript-eslint/no-require-imports
  const Storage = require("expo-sqlite/kv-store").default as {
    getItemSync(key: string): string | null;
    setItemSync(key: string, value: string): void;
    removeItemSync(key: string): boolean;
  };
  configureStorage({
    getItem: (key) => Storage.getItemSync(key),
    setItem: (key, value) => Storage.setItemSync(key, value),
    removeItem: (key) => {
      Storage.removeItemSync(key);
    },
  });
}

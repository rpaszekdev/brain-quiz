import Storage from "expo-sqlite/kv-store";
import { configureStorage } from "@/lib/quiz/storage";

/**
 * Hands lib/quiz the phone's key-value store.
 *
 * expo-sqlite's kv-store has a synchronous API, so history.ts and session.ts
 * keep their shape and every caller stays synchronous. MMKV would do the same
 * but needs a native build; this one runs in Expo Go.
 */
export function installStorage(): void {
  configureStorage({
    getItem: (key) => Storage.getItemSync(key),
    setItem: (key, value) => Storage.setItemSync(key, value),
    removeItem: (key) => {
      Storage.removeItemSync(key);
    },
  });
}

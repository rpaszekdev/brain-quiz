import * as Haptics from "expo-haptics";

/**
 * Fire-and-forget haptics. Expo Go and the web build both resolve the module;
 * a platform without a motor just rejects, which nobody needs to hear about.
 */
function fire(run: () => Promise<void>) {
  run().catch(() => {});
}

/** A light tick for picking an option or grabbing a handle. */
export function tick() {
  fire(() => Haptics.selectionAsync());
}

export function success() {
  fire(() => Haptics.notificationAsync(Haptics.NotificationFeedbackType.Success));
}

export function error() {
  fire(() => Haptics.notificationAsync(Haptics.NotificationFeedbackType.Error));
}

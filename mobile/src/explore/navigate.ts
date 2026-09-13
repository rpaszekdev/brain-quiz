import type { useRouter } from "expo-router";

type Router = ReturnType<typeof useRouter>;

/**
 * Search, browse and article screens sit on the root stack above the tabs.
 * Selecting something there should land the user back on the brain.
 */
export function returnToExplore(router: Router): void {
  if (router.canDismiss()) router.dismissAll();
  router.navigate("/explore");
}

import { Platform, Dimensions } from "react-native";
import Constants from "expo-constants";
import { recentErrors } from "./errors";

/**
 * Loaded on use, never on import. react-native-view-shot is a third-party
 * native module that Expo Go does not ship, and its spec calls
 * TurboModuleRegistry.getEnforcing at module scope — a static import throws
 * while app/_layout.tsx is still evaluating, so "main" never registers and
 * the whole app dies on the phone. A dev tool must not be able to do that.
 */
function viewShot(): { captureScreen: (options: object) => Promise<string> } {
  // eslint-disable-next-line @typescript-eslint/no-require-imports
  return require("react-native-view-shot");
}

/** Where `npm run bugs` listens. Metro holds 8081; this sits beside it. */
export const BUG_PORT = 8788;

const MAX_NOTE = 2000;

export interface Shot {
  readonly uri: string | null;
  /** Why there is no picture, for the form to show. Never thrown away. */
  readonly error: string | null;
}

/**
 * The laptop running Metro is the laptop running the sink, so the phone can
 * derive the address it already loaded the bundle from — no IP to type in,
 * nothing to keep in sync when the router hands out a new lease.
 */
export function sinkUrl(): string | null {
  const host =
    Constants.expoConfig?.hostUri?.split(":")[0] ??
    (Platform.OS === "web" ? globalThis.location?.hostname : undefined);
  return host ? `http://${host}:${BUG_PORT}/report` : null;
}

/**
 * A JPEG of whatever is on screen right now.
 *
 * ponytail: the whole screen, no drag-to-select. The note says where to look
 * and the screen says where the reporter was; cropping adds a gesture layer
 * and removes the context that makes a shot readable.
 *
 * The 3D brain lives in a GLView, which iOS composites outside the React view
 * tree — captureScreen goes through the OS snapshot so it usually survives,
 * but a blank brain in a shot is the capture's fault, not the app's.
 */
export async function captureShot(): Promise<Shot> {
  try {
    const uri = await viewShot().captureScreen({
      format: "jpg",
      quality: 0.8,
      result: "data-uri",
    });
    return { uri, error: null };
  } catch (error) {
    return {
      uri: null,
      error: error instanceof Error ? error.message : String(error),
    };
  }
}

export interface ReportInput {
  readonly note: string;
  readonly screen: string;
  readonly shot: string | null;
}

/** Posts one report. Throws with a message worth showing when it does not land. */
export async function sendReport({
  note,
  screen,
  shot,
}: ReportInput): Promise<void> {
  const text = note.trim();
  if (!text) throw new Error("Write what went wrong first.");

  const url = sinkUrl();
  if (!url) {
    throw new Error("No dev server host — reports only work on a dev build.");
  }

  const { width, height } = Dimensions.get("window");
  const payload = {
    note: text.slice(0, MAX_NOTE),
    screen,
    shot,
    meta: {
      platform: `${Platform.OS} ${String(Platform.Version)}`,
      app: Constants.expoConfig?.version ?? "?",
      viewport: `${Math.round(width)}x${Math.round(height)}`,
      errors: recentErrors(),
    },
  };

  let response: Response;
  try {
    response = await fetch(url, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    });
  } catch {
    // Almost always the same cause, so say that instead of "Network request
    // failed" — which sends people looking at their wifi.
    throw new Error(`Cannot reach ${url} — is \`npm run bugs\` running?`);
  }

  const body = (await response.json().catch(() => ({}))) as { error?: string };
  if (!response.ok) {
    throw new Error(body.error ?? `Report rejected (${response.status})`);
  }
}

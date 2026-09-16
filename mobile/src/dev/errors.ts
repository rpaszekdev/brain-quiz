/**
 * A rolling buffer of the last things that went wrong, attached to every bug
 * report. A report that says "it broke" plus the stack that broke is one file
 * to read; the same report without it is an afternoon of reproducing.
 */

const LIMIT = 12;
const MAX_LENGTH = 1200;

let recent: readonly string[] = [];
let watching = false;

type GlobalHandler = (error: unknown, isFatal?: boolean) => void;

function remember(value: unknown): void {
  const text =
    value instanceof Error ? (value.stack ?? value.message) : String(value ?? "");
  if (!text) return;
  recent = [...recent, text.slice(0, MAX_LENGTH)].slice(-LIMIT);
}

export function recentErrors(): readonly string[] {
  return recent;
}

/**
 * Listen for crashes and console.error. Idempotent — Fast Refresh re-runs the
 * module, and a second wrap would report every error twice.
 */
export function watchErrors(): void {
  if (watching) return;
  watching = true;

  // React Native's equivalent of window.onerror. Absent on web, where the
  // window events below are the ones that fire.
  const utils = (
    globalThis as {
      ErrorUtils?: {
        getGlobalHandler(): GlobalHandler;
        setGlobalHandler(handler: GlobalHandler): void;
      };
    }
  ).ErrorUtils;
  if (utils) {
    const previous = utils.getGlobalHandler();
    utils.setGlobalHandler((error, isFatal) => {
      remember(error);
      previous?.(error, isFatal);
    });
  }

  // Most React and RN warnings never reach the global handler — LogBox shows
  // them through console.error and they are exactly what a tester just saw.
  const previousConsoleError = console.error;
  console.error = (...args: unknown[]) => {
    remember(args.map((arg) => String(arg)).join(" "));
    previousConsoleError(...args);
  };
}

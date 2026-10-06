import PostHog from "posthog-react-native";

// Public project token (phc_ is ingest-only, safe to ship). Same EU project as the website.
const POSTHOG_KEY = "phc_o8UhsemaWnU9QTAiK3FdQfedUWKbj3iLULgDYbNDmGBJ";

export const posthog = new PostHog(POSTHOG_KEY, {
  host: "https://eu.i.posthog.com",
  // Dev runs would pollute real numbers.
  disabled: __DEV__,
});

/** Fire-and-forget: analytics must never break a lesson. */
export function track(event: string, properties?: Record<string, string | number | boolean>) {
  try {
    posthog.capture(event, properties);
  } catch {
    // ponytail: dropped event is fine, a crash is not
  }
}

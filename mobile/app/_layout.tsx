import { Stack } from "expo-router";
import { StatusBar } from "expo-status-bar";
import { installStorage } from "../src/storage";
import { colors } from "../src/theme";
import { BugReporter } from "../src/dev/BugReporter";

// Module scope, once: history and sessions are read as soon as Home mounts.
installStorage();

export default function RootLayout() {
  return (
    <>
      <StatusBar style="dark" />
      <Stack
        screenOptions={{
          headerShown: false,
          contentStyle: { backgroundColor: colors.washiWhite },
        }}
      >
        <Stack.Screen name="(tabs)" />
        <Stack.Screen
          name="play/[quizTypeId]"
          options={{ presentation: "fullScreenModal", animation: "slide_from_bottom" }}
        />
        <Stack.Screen name="find" options={{ presentation: "modal" }} />
      </Stack>
      {/* Dev only: Metro strips a __DEV__ branch, so nothing renders and
          nothing hooks console.error in a release build. */}
      {__DEV__ ? <BugReporter /> : null}
    </>
  );
}

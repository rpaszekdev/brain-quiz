import { Stack } from "expo-router";
import { StatusBar } from "expo-status-bar";
import { installStorage } from "../src/storage";
import { colors } from "../src/theme";

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
    </>
  );
}

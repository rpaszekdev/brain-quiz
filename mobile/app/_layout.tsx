import { Stack, usePathname } from "expo-router";
import { PostHogProvider } from "posthog-react-native";
import { useEffect } from "react";
import { posthog } from "../src/analytics";
import { StatusBar } from "expo-status-bar";
import { installStorage } from "../src/storage";
import { colors } from "../src/theme";

// Module scope, once: history and sessions are read as soon as Home mounts.
installStorage();

export default function RootLayout() {
  // expo-router hides the NavigationContainer, so screens are captured by path.
  const pathname = usePathname();
  useEffect(() => {
    posthog.screen(pathname);
  }, [pathname]);

  return (
    <PostHogProvider client={posthog} autocapture={{ captureScreens: false }}>
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
    </PostHogProvider>
  );
}

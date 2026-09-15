import { Tabs } from "expo-router";
import type { ColorValue } from "react-native";
import Ionicons from "@expo/vector-icons/Ionicons";
import { colors } from "../../src/theme";

type IconName = React.ComponentProps<typeof Ionicons>["name"];

function icon(name: IconName) {
  return ({ color, size }: { color: ColorValue; size: number }) => (
    <Ionicons name={name} size={size} color={color} />
  );
}

export default function TabsLayout() {
  return (
    <Tabs
      screenOptions={{
        headerShown: false,
        animation: "shift",
        tabBarActiveTintColor: colors.ai,
        tabBarInactiveTintColor: colors.sumiLight,
        tabBarStyle: { backgroundColor: colors.washiWhite, borderTopColor: colors.washiWarm },
        sceneStyle: { backgroundColor: colors.washiWhite },
      }}
    >
      <Tabs.Screen name="index" options={{ title: "Quiz", tabBarIcon: icon("grid-outline") }} />
      <Tabs.Screen name="explore" options={{ title: "Explore", tabBarIcon: icon("planet-outline") }} />
      <Tabs.Screen name="stats" options={{ title: "Stats", tabBarIcon: icon("stats-chart-outline") }} />
    </Tabs>
  );
}

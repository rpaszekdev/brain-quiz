import { Pressable, StyleSheet, Text, View } from "react-native";
import Ionicons from "@expo/vector-icons/Ionicons";
import { colors, space } from "../theme";
import { ProgressBar } from "../ui/ProgressBar";

/** m:ss, the way a lesson clock reads. */
export function formatElapsed(ms: number): string {
  const total = Math.floor(ms / 1000);
  const mm = Math.floor(total / 60);
  const ss = String(total % 60).padStart(2, "0");
  return `${mm}:${ss}`;
}

interface LessonHeaderProps {
  /** 0–1 share of steps checked. */
  progress: number;
  /** Fix-it phase: the bar turns orange. */
  fixing: boolean;
  elapsed: number;
  onClose: () => void;
}

/** One row: leave, progress, clock. */
export function LessonHeader({ progress, fixing, elapsed, onClose }: LessonHeaderProps) {
  return (
    <View style={styles.row}>
      <Pressable
        onPress={onClose}
        hitSlop={12}
        accessibilityRole="button"
        accessibilityLabel="Leave lesson"
        style={({ pressed }) => pressed && styles.pressed}
      >
        <Ionicons name="close" size={26} color={colors.sumiLight} />
      </Pressable>
      <View style={styles.bar}>
        <ProgressBar value={progress} color={fixing ? colors.kitsune : colors.ai} />
      </View>
      <Text style={styles.clock}>{formatElapsed(elapsed)}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  row: {
    flexDirection: "row",
    alignItems: "center",
    gap: space.md,
    paddingHorizontal: space.lg,
    paddingVertical: space.sm,
  },
  bar: { flex: 1 },
  clock: { fontSize: 14, color: colors.sumiLight, fontVariant: ["tabular-nums"], minWidth: 40, textAlign: "right" },
  pressed: { opacity: 0.5 },
});

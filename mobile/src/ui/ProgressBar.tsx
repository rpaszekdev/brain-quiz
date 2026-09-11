import { StyleSheet, View } from "react-native";
import { colors } from "../theme";

interface ProgressBarProps {
  /** 0–1 */
  value: number;
  color?: string;
}

export function ProgressBar({ value, color = colors.ai }: ProgressBarProps) {
  const pct = Math.round(Math.min(1, Math.max(0, value)) * 100);
  return (
    <View style={styles.track} accessibilityRole="progressbar" accessibilityValue={{ now: pct, min: 0, max: 100 }}>
      <View style={[styles.fill, { width: `${pct}%`, backgroundColor: color }]} />
    </View>
  );
}

const styles = StyleSheet.create({
  track: { height: 4, borderRadius: 2, backgroundColor: colors.washiWarm, overflow: "hidden" },
  fill: { height: "100%", borderRadius: 2 },
});

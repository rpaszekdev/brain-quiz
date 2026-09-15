import { useEffect } from "react";
import { StyleSheet, View } from "react-native";
import Animated, { useAnimatedStyle, useSharedValue, withTiming } from "react-native-reanimated";
import { colors, motion } from "../theme";

interface ProgressBarProps {
  /** 0–1 */
  value: number;
  color?: string;
}

/** Thin bar whose fill eases to each new value instead of jumping. */
export function ProgressBar({ value, color = colors.ai }: ProgressBarProps) {
  const pct = Math.round(Math.min(1, Math.max(0, value)) * 100);
  const width = useSharedValue(pct);
  useEffect(() => {
    width.value = withTiming(pct, { duration: motion.slow });
  }, [pct, width]);
  const fill = useAnimatedStyle(() => ({ width: `${width.value}%` }));
  return (
    <View style={styles.track} accessibilityRole="progressbar" accessibilityValue={{ now: pct, min: 0, max: 100 }}>
      <Animated.View style={[styles.fill, fill, { backgroundColor: color }]} />
    </View>
  );
}

const styles = StyleSheet.create({
  track: { height: 6, borderRadius: 3, backgroundColor: colors.washiWarm, overflow: "hidden" },
  fill: { height: "100%", borderRadius: 3 },
});

import { Pressable, StyleSheet, Text } from "react-native";
import { colors, space } from "../theme";

interface ChipProps {
  label: string;
  active: boolean;
  onPress: () => void;
}

export function Chip({ label, active, onPress }: ChipProps) {
  return (
    <Pressable
      onPress={onPress}
      accessibilityRole="button"
      accessibilityState={{ selected: active }}
      style={[styles.chip, active && styles.chipActive]}
    >
      <Text style={[styles.label, active && styles.labelActive]}>{label}</Text>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  chip: {
    paddingVertical: 7,
    paddingHorizontal: 14,
    borderRadius: 999,
    borderWidth: 1,
    borderColor: colors.washiWarm,
    backgroundColor: colors.white,
  },
  chipActive: { borderColor: colors.ai, backgroundColor: colors.ai },
  label: { fontSize: 13, fontWeight: "600", color: colors.sumiMedium },
  labelActive: { color: colors.white },
});

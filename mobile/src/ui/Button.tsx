import { Pressable, StyleSheet, Text, type StyleProp, type ViewStyle } from "react-native";
import { colors, radius, space } from "../theme";

interface ButtonProps {
  label: string;
  onPress: () => void;
  variant?: "primary" | "quiet";
  disabled?: boolean;
  style?: StyleProp<ViewStyle>;
}

export function Button({ label, onPress, variant = "primary", disabled = false, style }: ButtonProps) {
  const primary = variant === "primary";
  return (
    <Pressable
      onPress={onPress}
      disabled={disabled}
      accessibilityRole="button"
      accessibilityState={{ disabled }}
      style={({ pressed }) => [
        styles.base,
        primary ? styles.primary : styles.quiet,
        disabled && styles.disabled,
        pressed && !disabled && styles.pressed,
        style,
      ]}
    >
      <Text style={[styles.label, primary ? styles.labelPrimary : styles.labelQuiet]}>{label}</Text>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  base: {
    paddingVertical: 14,
    paddingHorizontal: space.xl,
    borderRadius: radius.sm,
    alignItems: "center",
    justifyContent: "center",
    borderWidth: 1,
    borderColor: "transparent",
  },
  primary: { backgroundColor: colors.ai },
  quiet: { backgroundColor: "transparent", borderColor: colors.washiWarm },
  disabled: { opacity: 0.4 },
  pressed: { opacity: 0.85 },
  label: { fontSize: 16, fontWeight: "600" },
  labelPrimary: { color: colors.white },
  labelQuiet: { color: colors.ai },
});

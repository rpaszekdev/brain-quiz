import { Pressable, StyleSheet, Text, type StyleProp, type ViewStyle } from "react-native";
import { colors, radius, space } from "../theme";

interface ButtonProps {
  label: string;
  onPress: () => void;
  variant?: "primary" | "quiet";
  disabled?: boolean;
  /** Primary fill override, e.g. the green / red continue button. */
  color?: string;
  style?: StyleProp<ViewStyle>;
}

/** Pill button. Primary is loud and uppercase; quiet is an outlined text button. */
export function Button({ label, onPress, variant = "primary", disabled = false, color, style }: ButtonProps) {
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
        primary && color !== undefined && { backgroundColor: color },
        disabled && (primary ? styles.primaryDisabled : styles.quietDisabled),
        pressed && !disabled && styles.pressed,
        style,
      ]}
    >
      <Text
        style={[
          styles.label,
          primary ? styles.labelPrimary : styles.labelQuiet,
          primary && disabled && styles.labelPrimaryDisabled,
        ]}
      >
        {label}
      </Text>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  base: {
    paddingVertical: 14,
    paddingHorizontal: space.xl,
    borderRadius: radius.pill,
    alignItems: "center",
    justifyContent: "center",
    borderWidth: 1,
    borderColor: "transparent",
  },
  primary: { backgroundColor: colors.ai },
  quiet: { backgroundColor: "transparent", borderColor: colors.washiWarm },
  primaryDisabled: { backgroundColor: colors.washiWarm },
  quietDisabled: { opacity: 0.4 },
  pressed: { transform: [{ scale: 0.97 }], opacity: 0.9 },
  label: { fontSize: 16, fontWeight: "700" },
  labelPrimary: { color: colors.white, textTransform: "uppercase", letterSpacing: 0.6 },
  labelPrimaryDisabled: { color: colors.sumiLight },
  labelQuiet: { color: colors.ai, fontWeight: "600" },
});

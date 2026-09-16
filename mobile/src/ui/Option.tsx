import { Pressable, StyleSheet, Text, View } from "react-native";
import Ionicons from "@expo/vector-icons/Ionicons";
import { colors, radius, space } from "../theme";

/** Answered rows show a verdict; unanswered rows show selection only. */
export type OptionState = "idle" | "selected" | "correct" | "wrong";

export function optionState(
  optionId: string,
  selectedId: string | null,
  correctId: string,
  answered: boolean,
): OptionState {
  if (!answered) return optionId === selectedId ? "selected" : "idle";
  if (optionId === correctId) return "correct";
  if (optionId === selectedId) return "wrong";
  return "idle";
}

interface OptionProps {
  letter: string;
  label: string;
  state: OptionState;
  disabled: boolean;
  onPress: () => void;
}

export function Option({ letter, label, state, disabled, onPress }: OptionProps) {
  return (
    <Pressable
      onPress={onPress}
      disabled={disabled}
      accessibilityRole="radio"
      accessibilityState={{ selected: state === "selected", disabled }}
      style={({ pressed }) => [
        styles.row,
        state === "selected" && styles.rowSelected,
        state === "correct" && styles.rowCorrect,
        state === "wrong" && styles.rowWrong,
        pressed && !disabled && styles.rowPressed,
      ]}
    >
      <View style={[styles.marker, state !== "idle" && styles.markerActive]}>
        {state === "correct" ? (
          <Ionicons name="checkmark" size={14} color={colors.white} />
        ) : state === "wrong" ? (
          <Ionicons name="close" size={14} color={colors.white} />
        ) : (
          <Text style={[styles.letter, state === "selected" && styles.letterSelected]}>{letter}</Text>
        )}
      </View>
      <Text style={styles.label}>{label}</Text>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  row: {
    flexDirection: "row",
    alignItems: "center",
    gap: space.md,
    paddingVertical: 12,
    paddingHorizontal: space.md,
    borderRadius: radius.lg,
    borderWidth: 2,
    borderColor: colors.washiWarm,
    backgroundColor: colors.white,
  },
  rowSelected: { borderColor: colors.ai, backgroundColor: colors.aiLight },
  rowCorrect: { borderColor: colors.correct, backgroundColor: colors.correctLight },
  rowWrong: { borderColor: colors.wrong, backgroundColor: colors.wrongLight },
  rowPressed: { transform: [{ scale: 0.98 }], opacity: 0.9 },
  marker: {
    width: 26,
    height: 26,
    borderRadius: 13,
    alignItems: "center",
    justifyContent: "center",
    borderWidth: 1,
    borderColor: colors.washiWarm,
  },
  markerActive: { borderColor: "transparent", backgroundColor: colors.sumiDeep },
  letter: { fontSize: 12, fontWeight: "700", color: colors.sumiLight },
  letterSelected: { color: colors.white },
  label: { flex: 1, fontSize: 16, color: colors.sumiDeep, lineHeight: 22 },
});

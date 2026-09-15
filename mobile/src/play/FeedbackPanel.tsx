import { useEffect } from "react";
import { StyleSheet, Text, View } from "react-native";
import Ionicons from "@expo/vector-icons/Ionicons";
import Animated, { SlideInDown } from "react-native-reanimated";
import { error, success } from "../haptics";
import { colors, radius, serif, space } from "../theme";
import { Button } from "../ui/Button";

/** Opaque tints (the panel covers the options, so no alpha). */
const TINT = { correct: "#E1EDE3", wrong: "#F3E1DD" } as const;

interface FeedbackPanelProps {
  correct: boolean;
  /** Name of the right answer. */
  answerLabel: string;
  explanation: string;
  /** Last step of the lesson: the button says so. */
  last: boolean;
  onContinue: () => void;
}

/** Springs up over the answers after CHECK, the way a language app does it. */
export function FeedbackPanel({ correct, answerLabel, explanation, last, onContinue }: FeedbackPanelProps) {
  const tone = correct ? colors.correct : colors.wrong;
  useEffect(() => {
    if (correct) success();
    else error();
  }, [correct]);

  return (
    <Animated.View
      entering={SlideInDown.springify().damping(18).stiffness(180)}
      style={[styles.panel, { backgroundColor: correct ? TINT.correct : TINT.wrong, borderColor: tone }]}
      accessibilityLiveRegion="polite"
    >
      <View style={styles.head}>
        <Ionicons name={correct ? "checkmark-circle" : "close-circle"} size={28} color={tone} />
        <Text style={[styles.title, { color: tone }]}>{correct ? "Nicely done!" : "Not quite"}</Text>
      </View>
      <Text style={styles.answer}>{correct ? answerLabel : `Correct answer: ${answerLabel}`}</Text>
      {explanation.length > 0 && (
        <Text style={styles.explanation} numberOfLines={3}>
          {explanation}
        </Text>
      )}
      <Button
        label={correct ? (last ? "Finish" : "Continue") : "Got it"}
        color={tone}
        onPress={onContinue}
        style={styles.button}
      />
    </Animated.View>
  );
}

const styles = StyleSheet.create({
  panel: {
    position: "absolute",
    left: 0,
    right: 0,
    bottom: 0,
    padding: space.lg,
    paddingBottom: space.xl,
    gap: space.sm,
    borderTopWidth: 2,
    borderTopLeftRadius: radius.lg,
    borderTopRightRadius: radius.lg,
  },
  head: { flexDirection: "row", alignItems: "center", gap: space.sm },
  title: { fontSize: 20, fontWeight: "800" },
  answer: { fontFamily: serif, fontSize: 18, color: colors.sumiDeep },
  explanation: { fontSize: 14, lineHeight: 20, color: colors.sumiMedium },
  button: { marginTop: space.sm },
});

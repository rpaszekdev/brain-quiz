import { ScrollView, StyleSheet, Text, View } from "react-native";
import Animated, { FadeInRight, FadeOutLeft } from "react-native-reanimated";
import { getRegion } from "@/lib/brain-regions";
import { tick } from "../haptics";
import type { Play } from "../quiz/use-play";
import { colors, motion, radius, serif, space } from "../theme";
import { Option, optionState } from "../ui/Option";

const OPTION_LETTERS = ["A", "B", "C", "D", "E", "F"] as const;

interface StepBodyProps {
  play: Play;
  /** Small caps line above the prompt, e.g. "Identify Region · 2 of 10". */
  label: string;
}

/**
 * Prompt plus the answer control for one step. Mount it with the question id
 * as key: the old step slides out left while the new one slides in.
 */
export function StepBody({ play, label }: StepBodyProps) {
  const { question, answer } = play;
  if (!question || !answer) return null;
  const tapped = play.selectedId ? getRegion(play.selectedId) : undefined;

  return (
    <Animated.View
      entering={FadeInRight.duration(motion.base)}
      exiting={FadeOutLeft.duration(motion.fast)}
      style={StyleSheet.absoluteFill}
    >
      <ScrollView contentContainerStyle={styles.body} keyboardShouldPersistTaps="handled">
        <Text style={styles.label}>{label}</Text>
        <Text style={styles.prompt}>{question.prompt}</Text>
        {answer.type === "multiple-choice" ? (
          <View style={styles.options}>
            {answer.options.map((option, i) => (
              <Option
                key={option.id}
                letter={OPTION_LETTERS[i] ?? String(i + 1)}
                label={option.label}
                state={optionState(option.id, play.selectedId, answer.correctId, play.answered)}
                disabled={play.answered}
                onPress={() => {
                  tick();
                  play.setSelectedId(option.id);
                }}
              />
            ))}
          </View>
        ) : (
          <View style={[styles.tapHint, tapped && styles.tapHintActive]}>
            <Text style={[styles.tapHintText, tapped && styles.tapHintTextActive]}>
              {tapped ? `Tapped: ${tapped.name}` : "Rotate the brain, then tap the region."}
            </Text>
          </View>
        )}
      </ScrollView>
    </Animated.View>
  );
}

const styles = StyleSheet.create({
  body: { padding: space.lg, gap: space.sm, paddingBottom: space.lg },
  label: { fontSize: 12, fontWeight: "700", letterSpacing: 0.8, textTransform: "uppercase", color: colors.kitsune },
  prompt: { fontFamily: serif, fontSize: 20, lineHeight: 27, color: colors.sumiDeep },
  options: { gap: 6, marginTop: space.xs },
  tapHint: {
    marginTop: space.xs,
    paddingVertical: 14,
    paddingHorizontal: space.lg,
    borderRadius: radius.lg,
    borderWidth: 2,
    borderStyle: "dashed",
    borderColor: colors.washiWarm,
  },
  tapHintActive: { borderStyle: "solid", borderColor: colors.ai, backgroundColor: colors.aiLight },
  tapHintText: { fontSize: 16, color: colors.sumiLight, textAlign: "center" },
  tapHintTextActive: { color: colors.sumiDeep, fontWeight: "600" },
});

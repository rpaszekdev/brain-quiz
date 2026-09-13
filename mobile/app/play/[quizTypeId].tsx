import { Pressable, ScrollView, StyleSheet, Text, View, useWindowDimensions } from "react-native";
import { useLocalSearchParams, useRouter } from "expo-router";
import { SafeAreaView } from "react-native-safe-area-context";
import Ionicons from "@expo/vector-icons/Ionicons";
import { usePlay } from "../../src/quiz/use-play";
import { colors, radius, serif, space } from "../../src/theme";
import { Button } from "../../src/ui/Button";
import { Option, optionState } from "../../src/ui/Option";
import { ProgressBar } from "../../src/ui/ProgressBar";
import { BrainCanvas } from "../../src/viewer/BrainCanvas";

const OPTION_LETTERS = ["A", "B", "C", "D", "E", "F"] as const;
/** Share of the screen the model gets when a question highlights a region. */
const BRAIN_HEIGHT_RATIO = 0.4;

function formatElapsed(ms: number): string {
  const total = Math.floor(ms / 1000);
  const mm = String(Math.floor(total / 60)).padStart(2, "0");
  const ss = String(total % 60).padStart(2, "0");
  return `${mm}:${ss}`;
}

export default function PlayScreen() {
  const router = useRouter();
  const { quizTypeId, resume, region } = useLocalSearchParams<{
    quizTypeId: string;
    resume?: string;
    region?: string;
  }>();
  const { height } = useWindowDimensions();
  const play = usePlay({
    quizTypeId: quizTypeId ?? "identify",
    resume: resume === "1",
    drillRegionId: quizTypeId === "drill" ? region : undefined,
  });

  const close = () => (router.canGoBack() ? router.back() : router.replace("/"));

  if (play.error) {
    return (
      <SafeAreaView style={styles.screen}>
        <View style={styles.centered}>
          <Text style={styles.resultLabel}>{play.error}</Text>
          <Button label="Back" variant="quiet" onPress={close} />
        </View>
      </SafeAreaView>
    );
  }

  const { state, question, answer } = play;
  const total = state.questions.length;

  if (state.phase === "result") {
    return (
      <SafeAreaView style={styles.screen}>
        <View style={styles.centered}>
          <Text style={styles.resultScore}>
            {state.score}/{total}
          </Text>
          <Text style={styles.resultLabel}>
            {state.score === total ? "Every answer right." : `${total - state.score} to review.`}
          </Text>
          <Button label="Play again" onPress={play.restart} style={styles.wide} />
          <Button label="Done" variant="quiet" onPress={close} style={styles.wide} />
        </View>
      </SafeAreaView>
    );
  }

  if (!question || !answer) {
    return (
      <SafeAreaView style={styles.screen}>
        <View style={styles.centered}>
          <Text style={styles.resultLabel}>Building your quiz…</Text>
        </View>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={styles.screen}>
      <View style={styles.status}>
        <Pressable onPress={close} hitSlop={12} accessibilityLabel="Leave quiz">
          <Ionicons name="close" size={24} color={colors.sumiDeep} />
        </Pressable>
        <Text style={styles.statusText}>
          {state.currentIndex + 1} / {total}
        </Text>
        <Text style={styles.statusClock}>{formatElapsed(play.elapsed)}</Text>
      </View>
      <View style={styles.bar}>
        <ProgressBar value={(state.currentIndex + (play.answered ? 1 : 0)) / total} />
      </View>

      {play.showsBrain && (
        <BrainCanvas
          focus={play.focusRegion}
          highlightIds={play.highlightIds}
          style={{ height: height * BRAIN_HEIGHT_RATIO }}
        />
      )}

      <ScrollView contentContainerStyle={styles.body} keyboardShouldPersistTaps="handled">
        <Text style={styles.prompt}>{question.prompt}</Text>
        <View style={styles.options}>
          {answer.options.map((option, i) => (
            <Option
              key={option.id}
              letter={OPTION_LETTERS[i] ?? String(i + 1)}
              label={option.label}
              state={optionState(option.id, play.selectedId, answer.correctId, play.answered)}
              disabled={play.answered}
              onPress={() => play.setSelectedId(option.id)}
            />
          ))}
        </View>

        {play.answered && (
          <View style={[styles.feedback, play.isCorrect ? styles.feedbackRight : styles.feedbackWrong]}>
            <Text style={[styles.verdict, { color: play.isCorrect ? colors.correct : colors.wrong }]}>
              {play.isCorrect ? "Correct" : "Not quite"}
            </Text>
            <Text style={styles.answerName}>{play.correctLabel}</Text>
            <Text style={styles.explanation}>{question.explanation}</Text>
          </View>
        )}
      </ScrollView>

      <View style={styles.actions}>
        {play.answered ? (
          <Button label={play.isLast ? "See your score" : "Next question"} onPress={play.next} />
        ) : (
          <Button label="Submit answer" onPress={play.submit} disabled={play.selectedId === null} />
        )}
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  screen: { flex: 1, backgroundColor: colors.washiWhite },
  centered: { flex: 1, alignItems: "center", justifyContent: "center", padding: space.xl, gap: space.md },
  wide: { alignSelf: "stretch" },
  status: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: space.lg,
    paddingVertical: space.sm,
  },
  statusText: { fontSize: 14, fontWeight: "600", color: colors.sumiMedium, fontVariant: ["tabular-nums"] },
  statusClock: { fontSize: 14, color: colors.sumiLight, fontVariant: ["tabular-nums"], minWidth: 44, textAlign: "right" },
  bar: { paddingHorizontal: space.lg, paddingBottom: space.sm },
  body: { padding: space.lg, gap: space.lg, paddingBottom: space.xl },
  prompt: { fontFamily: serif, fontSize: 21, lineHeight: 28, color: colors.sumiDeep },
  options: { gap: space.sm },
  feedback: { padding: space.lg, borderRadius: radius.md, borderWidth: 1, gap: 4 },
  feedbackRight: { borderColor: colors.correct, backgroundColor: colors.correctLight },
  feedbackWrong: { borderColor: colors.wrong, backgroundColor: colors.wrongLight },
  verdict: { fontSize: 13, fontWeight: "700", letterSpacing: 0.5, textTransform: "uppercase" },
  answerName: { fontFamily: serif, fontSize: 18, color: colors.sumiDeep },
  explanation: { fontSize: 14, lineHeight: 20, color: colors.sumiMedium },
  actions: { padding: space.lg, paddingTop: space.sm, borderTopWidth: 1, borderTopColor: colors.washiWarm },
  resultScore: { fontFamily: serif, fontSize: 64, color: colors.sumiDeep },
  resultLabel: { fontSize: 16, color: colors.sumiLight, textAlign: "center", marginBottom: space.lg },
});

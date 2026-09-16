import { StyleSheet, Text, View, useWindowDimensions } from "react-native";
import { useLocalSearchParams, useRouter } from "expo-router";
import { SafeAreaProvider, SafeAreaView } from "react-native-safe-area-context";
import { press, tick } from "../../src/haptics";
import { FeedbackPanel } from "../../src/play/FeedbackPanel";
import { LessonHeader } from "../../src/play/LessonHeader";
import { ResultScreen } from "../../src/play/ResultScreen";
import { StepBody } from "../../src/play/StepBody";
import { usePlay, type Play } from "../../src/quiz/use-play";
import { colors, space } from "../../src/theme";
import { Button } from "../../src/ui/Button";
import { BrainCanvas } from "../../src/viewer/BrainCanvas";
import { lessonHeroHeight } from "../../src/viewer/hero";

function stepLabel(play: Play): string {
  const total = play.state.questions.length;
  if (play.fixing) return `Fix it · ${play.retryIndex} of ${play.retryTotal}`;
  const n = `${play.state.currentIndex + 1} of ${total}`;
  return play.kind === "tap" ? `Tap the region · ${n}` : `${play.meta?.quizType.name ?? "Question"} · ${n}`;
}

function Lesson({ play, onClose }: { play: Play; onClose: () => void }) {
  const { height } = useWindowDimensions();
  const { state, question, answer } = play;

  if (play.error) {
    return (
      <View style={styles.centered}>
        <Text style={styles.note}>{play.error}</Text>
        <Button label="Back" variant="quiet" onPress={onClose} />
      </View>
    );
  }
  if (state.phase === "result") return <ResultScreen play={play} onClose={onClose} />;
  if (!question || !answer) {
    return (
      <View style={styles.centered}>
        <Text style={styles.note}>Building your lesson…</Text>
      </View>
    );
  }

  const total = state.questions.length;
  const tapping = play.kind === "tap" && !play.answered;
  return (
    <>
      <LessonHeader
        progress={state.answers.length / total}
        fixing={play.fixing}
        elapsed={play.elapsed}
        onClose={onClose}
      />
      {play.showsBrain && (
        <BrainCanvas
          focus={play.focusRegion}
          highlightIds={play.highlightIds}
          mode={play.mode}
          onTapRegion={
            tapping
              ? (region) => {
                  tick();
                  play.setSelectedId(region.id);
                }
              : undefined
          }
          // ponytail: one canvas height per lesson; it never resizes.
          style={{ height: lessonHeroHeight(height) }}
        />
      )}
      <View style={styles.lower}>
        <View style={styles.stage}>
          <StepBody key={question.id} play={play} label={stepLabel(play)} />
        </View>
        <View style={styles.actions}>
          <Button
            label="Check"
            onPress={() => {
              press();
              play.submit();
            }}
            disabled={play.selectedId === null || play.answered}
          />
        </View>
        {play.answered && (
          <FeedbackPanel
            correct={play.isCorrect}
            answerLabel={play.correctLabel}
            explanation={question.explanation}
            last={play.isLast}
            onContinue={play.next}
          />
        )}
      </View>
    </>
  );
}

export default function PlayScreen() {
  const router = useRouter();
  const { quizTypeId, resume, region } = useLocalSearchParams<{
    quizTypeId: string;
    resume?: string;
    region?: string;
  }>();
  const play = usePlay({
    quizTypeId: quizTypeId ?? "identify",
    resume: resume === "1",
    drillRegionId: quizTypeId === "drill" ? region : undefined,
  });
  const close = () => (router.canGoBack() ? router.back() : router.replace("/"));

  // A fullScreenModal is presented outside the root view hierarchy, where the
  // app's SafeAreaProvider no longer reaches; this one lives inside the modal.
  return (
    <SafeAreaProvider>
      <SafeAreaView style={styles.screen} edges={["top", "bottom"]}>
        <Lesson play={play} onClose={close} />
      </SafeAreaView>
    </SafeAreaProvider>
  );
}

const styles = StyleSheet.create({
  screen: { flex: 1, backgroundColor: colors.washiWhite },
  centered: { flex: 1, alignItems: "center", justifyContent: "center", padding: space.xl, gap: space.md },
  note: { fontSize: 16, color: colors.sumiLight, textAlign: "center" },
  lower: { flex: 1 },
  stage: { flex: 1 },
  actions: { paddingHorizontal: space.lg, paddingTop: space.sm, paddingBottom: space.sm },
});

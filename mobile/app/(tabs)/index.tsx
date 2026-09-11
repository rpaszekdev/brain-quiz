import { useCallback, useState } from "react";
import { Pressable, ScrollView, StyleSheet, Text, View } from "react-native";
import { useFocusEffect, useRouter } from "expo-router";
import { SafeAreaView } from "react-native-safe-area-context";
import { loadHistory } from "@/lib/quiz/history";
import { loadSession, type QuizSession } from "@/lib/quiz/session";
import { QUIZ_GROUPS, findQuizType } from "../../src/quiz/catalog";
import { loadRegionStats, weakestRegions, type WeakRegion } from "../../src/quiz/region-stats";
import { streakDays } from "../../src/quiz/streak";
import { colors, radius, serif, space } from "../../src/theme";
import { ProgressBar } from "../../src/ui/ProgressBar";
import { SectionTitle } from "../../src/ui/SectionTitle";

const STREAK_DOTS = 7;

export default function Home() {
  const router = useRouter();
  const [session, setSession] = useState<QuizSession | null>(null);
  const [streak, setStreak] = useState(0);
  const [weak, setWeak] = useState<WeakRegion | null>(null);

  // Re-read on every visit: a quiz just finished in the modal above us.
  useFocusEffect(
    useCallback(() => {
      setSession(loadSession());
      setStreak(streakDays(loadHistory()));
      setWeak(weakestRegions(loadRegionStats(), 1)[0] ?? null);
    }, []),
  );

  const resumeMeta = session ? findQuizType(session.quizTypeId) : null;

  return (
    <SafeAreaView style={styles.screen} edges={["top"]}>
      <ScrollView contentContainerStyle={styles.content}>
        <View style={styles.streakRow}>
          <View style={styles.dots}>
            {Array.from({ length: STREAK_DOTS }, (_, i) => (
              <View key={i} style={[styles.dot, i < streak && styles.dotLit]} />
            ))}
          </View>
          <Text style={styles.streakLabel}>
            {streak === 0 ? "No streak yet" : `${streak}-day streak`}
          </Text>
        </View>

        {session && resumeMeta && (
          <>
            <Text style={styles.lead}>Pick up where you left off</Text>
            <Pressable
              style={styles.resume}
              onPress={() => router.push(`/play/${session.quizTypeId}?resume=1`)}
            >
              <View style={styles.resumeHead}>
                <Text style={styles.resumeTitle}>{resumeMeta.quizType.name}</Text>
                <Text style={styles.resumeCount}>
                  {session.answers.length} / {session.questions.length}
                </Text>
              </View>
              <ProgressBar value={session.answers.length / session.questions.length} color={colors.white} />
            </Pressable>
          </>
        )}

        {weak && (
          <Pressable style={styles.weak} onPress={() => router.push("/play/identify")}>
            <Text style={styles.weakLabel}>Weak spot: {weak.region.name}</Text>
            <Text style={styles.weakCta}>
              {Math.round(weak.accuracy * 100)}% right · practice regions ›
            </Text>
          </Pressable>
        )}

        {QUIZ_GROUPS.map((group) => (
          <View key={group.dimension.id}>
            <SectionTitle label={group.dimension.shortName} />
            <View style={styles.grid}>
              {group.quizTypes.map((quizType) => (
                <Pressable
                  key={quizType.id}
                  style={styles.tile}
                  onPress={() => router.push(`/play/${quizType.id}`)}
                >
                  <Text style={styles.tileTitle}>{quizType.name}</Text>
                  <Text style={styles.tileBlurb} numberOfLines={2}>
                    {quizType.description}
                  </Text>
                  <Text style={styles.tileMeta}>
                    {quizType.questionCount} q · {quizType.difficulty}
                  </Text>
                </Pressable>
              ))}
            </View>
          </View>
        ))}
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  screen: { flex: 1, backgroundColor: colors.washiWhite },
  content: { padding: space.lg, paddingBottom: space.xxl },
  streakRow: { flexDirection: "row", alignItems: "center", gap: space.md, marginBottom: space.xl },
  dots: { flexDirection: "row", gap: 6 },
  dot: { width: 10, height: 10, borderRadius: 5, backgroundColor: colors.washiWarm },
  dotLit: { backgroundColor: colors.kitsune },
  streakLabel: { fontSize: 13, fontWeight: "600", color: colors.sumiLight },
  lead: { fontFamily: serif, fontSize: 22, color: colors.sumiDeep, marginBottom: space.md },
  resume: { backgroundColor: colors.ai, borderRadius: radius.md, padding: space.lg, gap: space.md },
  resumeHead: { flexDirection: "row", justifyContent: "space-between", alignItems: "baseline" },
  resumeTitle: { color: colors.white, fontSize: 16, fontWeight: "600" },
  resumeCount: { color: colors.white, fontSize: 14, fontVariant: ["tabular-nums"] },
  weak: {
    marginTop: space.lg,
    padding: space.lg,
    borderRadius: radius.md,
    borderWidth: 1,
    borderColor: colors.washiWarm,
    backgroundColor: colors.white,
    gap: 4,
  },
  weakLabel: { fontSize: 15, fontWeight: "600", color: colors.sumiDeep },
  weakCta: { fontSize: 13, color: colors.kitsune, fontWeight: "600" },
  grid: { flexDirection: "row", flexWrap: "wrap", gap: space.md },
  tile: {
    width: "48%",
    flexGrow: 1,
    padding: space.lg,
    borderRadius: radius.md,
    borderWidth: 1,
    borderColor: colors.washiWarm,
    backgroundColor: colors.white,
    gap: 6,
  },
  tileTitle: { fontFamily: serif, fontSize: 17, color: colors.sumiDeep },
  tileBlurb: { fontSize: 13, lineHeight: 18, color: colors.sumiLight },
  tileMeta: { fontSize: 11, fontWeight: "600", color: colors.sumiLight, marginTop: 2 },
});

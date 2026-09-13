import { useCallback, useState } from "react";
import { Pressable, ScrollView, StyleSheet, Text, View } from "react-native";
import { useFocusEffect, useRouter } from "expo-router";
import { SafeAreaView } from "react-native-safe-area-context";
import { loadHistory } from "@/lib/quiz/history";
import { loadSession, type QuizSession } from "@/lib/quiz/session";
import type { QuizTypeDefinition } from "@/lib/types";
import { QUIZ_GROUPS, findQuizType } from "../../src/quiz/catalog";
import { loadRegionStats, weakestRegions, type WeakRegion } from "../../src/quiz/region-stats";
import { streakDays } from "../../src/quiz/streak";
import { colors, radius, serif, space } from "../../src/theme";
import { Chip } from "../../src/ui/Chip";
import { ProgressBar } from "../../src/ui/ProgressBar";
import { SectionTitle } from "../../src/ui/SectionTitle";

const STREAK_DOTS = 7;

type DifficultyFilter = "all" | QuizTypeDefinition["difficulty"];

/**
 * Three lanes, ordered from "look" to "reason". Quiz types are curated by id;
 * anything the catalog gains later falls into "More practice" automatically.
 */
const LANES: readonly {
  id: string;
  title: string;
  blurb: string;
  quizTypeIds: readonly string[];
}[] = [
  {
    id: "learn",
    title: "1 · Learn the brain",
    blurb: "See it in 3D, name it",
    quizTypeIds: [
      "identify",
      "function-to-region",
      "identify-deep",
      "name-tract",
      "tract-endpoints",
      "region-to-network",
    ],
  },
  {
    id: "connect",
    title: "2 · Connect",
    blurb: "How it works",
    quizTypeIds: [
      "network-disruption",
      "network-scenario",
      "cell-to-region",
      "cell-type",
      "brodmann-to-region",
      "brodmann-match",
      "nt-affected",
      "pharma-bridge",
      "cortical-layer",
      "receptor-distribution",
      "hippocampal-circuit",
      "modality-selection",
      "vesicle-origin",
    ],
  },
  {
    id: "apply",
    title: "3 · Apply",
    blurb: "Clinics, cases, nerves",
    quizTypeIds: [
      "localize-deficit",
      "deficit-from-region",
      "which-artery",
      "name-syndrome",
      "case-vignette",
      "visual-field",
      "nerve-number",
      "nerve-function",
      "nerve-lesion",
      "nerve-type",
    ],
  },
];

const FILTERS: readonly { id: DifficultyFilter; label: string }[] = [
  { id: "all", label: "All levels" },
  { id: "beginner", label: "Beginner" },
  { id: "intermediate", label: "Intermediate" },
  { id: "advanced", label: "Advanced" },
];

export default function Home() {
  const router = useRouter();
  const [session, setSession] = useState<QuizSession | null>(null);
  const [streak, setStreak] = useState(0);
  const [weak, setWeak] = useState<WeakRegion | null>(null);
  const [filter, setFilter] = useState<DifficultyFilter>("all");

  // Re-read on every visit: a quiz just finished in the modal above us.
  useFocusEffect(
    useCallback(() => {
      setSession(loadSession());
      setStreak(streakDays(loadHistory()));
      setWeak(weakestRegions(loadRegionStats(), 1)[0] ?? null);
    }, []),
  );

  const resumeMeta = session ? findQuizType(session.quizTypeId) : null;

  const laneTiles = LANES.map((lane) => ({
    ...lane,
    quizTypes: lane.quizTypeIds.flatMap((id) => {
      const meta = findQuizType(id);
      if (!meta) return [];
      if (filter !== "all" && meta.quizType.difficulty !== filter) return [];
      return [meta.quizType];
    }),
  })).filter((lane) => lane.quizTypes.length > 0);

  // Catalog types nobody curated yet — they still show up instead of vanishing.
  const curated = new Set(LANES.flatMap((lane) => lane.quizTypeIds));
  const extra = QUIZ_GROUPS.flatMap((group) =>
    group.quizTypes.filter((q) => !curated.has(q.id)),
  ).filter((q) => filter === "all" || q.difficulty === filter);

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
          <Pressable
            style={styles.weak}
            onPress={() => router.push(`/play/drill?region=${weak.region.id}`)}
          >
            <Text style={styles.weakLabel}>Weak spot: {weak.region.name}</Text>
            <Text style={styles.weakCta}>
              {Math.round(weak.accuracy * 100)}% right · drill it ›
            </Text>
          </Pressable>
        )}

        <View style={styles.filters}>
          {FILTERS.map((f) => (
            <Chip
              key={f.id}
              label={f.label}
              active={filter === f.id}
              onPress={() => setFilter(f.id)}
            />
          ))}
        </View>

        {laneTiles.map((lane) => (
          <View key={lane.id}>
            <SectionTitle label={lane.title} />
            <Text style={styles.laneBlurb}>{lane.blurb}</Text>
            <View style={styles.grid}>
              {lane.quizTypes.map((quizType) => (
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

        {extra.length > 0 && (
          <View>
            <SectionTitle label="More practice" />
            <View style={styles.grid}>
              {extra.map((quizType) => (
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
        )}
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
  filters: { flexDirection: "row", flexWrap: "wrap", gap: space.sm, marginTop: space.lg },
  laneBlurb: { fontSize: 13, color: colors.sumiLight, marginBottom: space.md, marginTop: -4 },
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

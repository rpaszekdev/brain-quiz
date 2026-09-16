import { useCallback, useState } from "react";
import { Pressable, ScrollView, StyleSheet, Text, View } from "react-native";
import { useFocusEffect, useRouter } from "expo-router";
import { SafeAreaView } from "react-native-safe-area-context";
import Animated, { FadeIn } from "react-native-reanimated";
import { loadHistory } from "@/lib/quiz/history";
import { loadSession, type QuizSession } from "@/lib/quiz/session";
import { press, tick } from "../../src/haptics";
import { findQuizType } from "../../src/quiz/catalog";
import { loadRegionStats, weakestRegions, type WeakRegion } from "../../src/quiz/region-stats";
import { shelves, type Shelf } from "../../src/quiz/shelves";
import { streakDays } from "../../src/quiz/streak";
import { colors, motion, radius, serif, space } from "../../src/theme";
import { ProgressBar } from "../../src/ui/ProgressBar";

const STREAK_DOTS = 7;

/** One row on a shelf: the quiz, its length and level, nothing else. */
function QuizRow({ name, meta, onPress }: { name: string; meta: string; onPress: () => void }) {
  return (
    <Pressable
      onPress={onPress}
      accessibilityRole="button"
      style={({ pressed }) => [styles.quizRow, pressed && styles.pressed]}
    >
      <Text style={styles.quizName}>{name}</Text>
      <Text style={styles.quizMeta}>{meta}</Text>
    </Pressable>
  );
}

export default function Home() {
  const router = useRouter();
  const [session, setSession] = useState<QuizSession | null>(null);
  const [streak, setStreak] = useState(0);
  const [weak, setWeak] = useState<WeakRegion | null>(null);
  const [open, setOpen] = useState<string | null>(null);

  // Re-read on every visit: a lesson just finished in the modal above us.
  useFocusEffect(
    useCallback(() => {
      setSession(loadSession());
      setStreak(streakDays(loadHistory()));
      setWeak(weakestRegions(loadRegionStats(), 1)[0] ?? null);
    }, []),
  );

  const resumeMeta = session ? findQuizType(session.quizTypeId) : null;
  const shelf: readonly Shelf[] = shelves();

  const start = (href: string) => {
    press();
    router.push(href);
  };

  return (
    <SafeAreaView style={styles.screen} edges={["top"]}>
      <ScrollView contentContainerStyle={styles.content}>
        <Text style={styles.kanji}>今日</Text>
        <Text style={styles.heading}>Today</Text>

        {session && resumeMeta && (
          <Pressable
            style={({ pressed }) => [styles.resume, pressed && styles.pressed]}
            onPress={() => start(`/play/${session.quizTypeId}?resume=1`)}
            accessibilityRole="button"
          >
            <Text style={styles.resumeKicker}>Continue</Text>
            <View style={styles.resumeHead}>
              <Text style={styles.resumeTitle}>{resumeMeta.quizType.name}</Text>
              <Text style={styles.resumeCount}>
                {session.answers.length} / {session.questions.length}
              </Text>
            </View>
            <ProgressBar value={session.answers.length / session.questions.length} color={colors.white} />
          </Pressable>
        )}

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

        {weak && (
          <Pressable
            style={({ pressed }) => [styles.weak, pressed && styles.pressed]}
            onPress={() => start(`/play/drill?region=${weak.region.id}`)}
            accessibilityRole="button"
          >
            <View style={styles.weakText}>
              <Text style={styles.weakLabel}>Weak spot · {weak.region.name}</Text>
              <Text style={styles.weakMeta}>{Math.round(weak.accuracy * 100)}% right</Text>
            </View>
            <Text style={styles.chevron}>›</Text>
          </Pressable>
        )}

        <Text style={styles.shelfHeading}>Practice</Text>
        {shelf.map((s) => {
          const isOpen = open === s.id;
          return (
            <View key={s.id}>
              <Pressable
                onPress={() => {
                  tick();
                  setOpen(isOpen ? null : s.id);
                }}
                accessibilityRole="button"
                accessibilityState={{ expanded: isOpen }}
                style={({ pressed }) => [styles.shelfRow, pressed && styles.pressed]}
              >
                <View style={styles.shelfText}>
                  <Text style={styles.shelfTitle}>{s.title}</Text>
                  <Text style={styles.shelfBlurb}>{s.blurb}</Text>
                </View>
                <Text style={styles.shelfCount}>{s.quizTypes.length}</Text>
                <Text style={[styles.chevron, isOpen && styles.chevronOpen]}>›</Text>
              </Pressable>
              {isOpen && (
                <Animated.View entering={FadeIn.duration(motion.fast)} style={styles.quizList}>
                  {s.quizTypes.map((quizType) => (
                    <QuizRow
                      key={quizType.id}
                      name={quizType.name}
                      meta={`${quizType.questionCount} · ${quizType.difficulty}`}
                      onPress={() => start(`/play/${quizType.id}`)}
                    />
                  ))}
                </Animated.View>
              )}
            </View>
          );
        })}
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  screen: { flex: 1, backgroundColor: colors.washiWhite },
  content: { paddingHorizontal: space.lg, paddingTop: space.sm, paddingBottom: space.xxl },
  kanji: { fontSize: 13, color: colors.kitsune, letterSpacing: 2 },
  heading: { fontFamily: serif, fontSize: 30, color: colors.sumiDeep, marginBottom: space.xl },
  pressed: { opacity: 0.6 },

  resume: { backgroundColor: colors.ai, borderRadius: radius.lg, padding: space.lg, gap: space.sm },
  resumeKicker: { fontSize: 11, fontWeight: "700", letterSpacing: 1, textTransform: "uppercase", color: colors.washiWarm },
  resumeHead: { flexDirection: "row", justifyContent: "space-between", alignItems: "baseline", gap: space.md },
  resumeTitle: { fontFamily: serif, fontSize: 20, color: colors.white, flexShrink: 1 },
  resumeCount: { color: colors.white, fontSize: 14, fontVariant: ["tabular-nums"] },

  streakRow: { flexDirection: "row", alignItems: "center", gap: space.md, marginTop: space.xl },
  dots: { flexDirection: "row", gap: 6 },
  dot: { width: 8, height: 8, borderRadius: 4, backgroundColor: colors.washiWarm },
  dotLit: { backgroundColor: colors.kitsune },
  streakLabel: { fontSize: 13, color: colors.sumiLight },

  weak: {
    flexDirection: "row",
    alignItems: "center",
    gap: space.md,
    paddingVertical: space.md,
    marginTop: space.md,
    borderTopWidth: 1,
    borderTopColor: colors.washiWarm,
  },
  weakText: { flex: 1, gap: 2 },
  weakLabel: { fontSize: 15, color: colors.sumiDeep },
  weakMeta: { fontSize: 12, color: colors.kitsune },

  shelfHeading: {
    fontSize: 11,
    fontWeight: "700",
    letterSpacing: 1,
    textTransform: "uppercase",
    color: colors.sumiLight,
    marginTop: space.xxl,
    marginBottom: space.xs,
  },
  shelfRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: space.md,
    paddingVertical: space.lg,
    borderTopWidth: 1,
    borderTopColor: colors.washiWarm,
  },
  shelfText: { flex: 1, gap: 2 },
  shelfTitle: { fontFamily: serif, fontSize: 20, color: colors.sumiDeep },
  shelfBlurb: { fontSize: 13, color: colors.sumiLight },
  shelfCount: { fontSize: 13, color: colors.sumiLight, fontVariant: ["tabular-nums"] },
  chevron: { fontSize: 20, color: colors.sumiLight },
  chevronOpen: { transform: [{ rotate: "90deg" }] },

  quizList: { paddingLeft: space.md, paddingBottom: space.sm },
  quizRow: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    gap: space.md,
    paddingVertical: space.md,
  },
  quizName: { fontSize: 16, color: colors.sumiDeep, flexShrink: 1 },
  quizMeta: { fontSize: 12, color: colors.sumiLight, textTransform: "capitalize" },
});

import { useCallback, useState } from "react";
import { ScrollView, StyleSheet, Text, View } from "react-native";
import { useFocusEffect } from "expo-router";
import { SafeAreaView } from "react-native-safe-area-context";
import { loadHistory, relativeTime, type QuizResultRecord } from "@/lib/quiz/history";
import { loadRegionStats, weakestRegions, type WeakRegion } from "../../src/quiz/region-stats";
import { streakDays } from "../../src/quiz/streak";
import { colors, radius, serif, space } from "../../src/theme";
import { SectionTitle } from "../../src/ui/SectionTitle";

const WEAK_LIMIT = 5;

function accuracy(history: readonly QuizResultRecord[]): number | null {
  const total = history.reduce((sum, h) => sum + h.total, 0);
  if (total === 0) return null;
  const score = history.reduce((sum, h) => sum + h.score, 0);
  return Math.round((score / total) * 100);
}

export default function Stats() {
  const [history, setHistory] = useState<readonly QuizResultRecord[]>([]);
  const [weak, setWeak] = useState<readonly WeakRegion[]>([]);

  useFocusEffect(
    useCallback(() => {
      setHistory(loadHistory());
      setWeak(weakestRegions(loadRegionStats(), WEAK_LIMIT));
    }, []),
  );

  const pct = accuracy(history);

  return (
    <SafeAreaView style={styles.screen} edges={["top"]}>
      <ScrollView contentContainerStyle={styles.content}>
        <Text style={styles.title}>Stats</Text>

        <View style={styles.tiles}>
          <Stat label="Streak" value={`${streakDays(history)}d`} />
          <Stat label="Quizzes" value={String(history.length)} />
          <Stat label="Accuracy" value={pct === null ? "—" : `${pct}%`} />
        </View>

        <SectionTitle label="Weak regions" />
        {weak.length === 0 ? (
          <Text style={styles.empty}>Answer a few region questions and the misses show up here.</Text>
        ) : (
          weak.map(({ region, stat, accuracy: acc }) => (
            <View key={region.id} style={styles.row}>
              <Text style={styles.rowTitle}>{region.name}</Text>
              <Text style={styles.rowMeta}>
                {stat.correct}/{stat.seen} · {Math.round(acc * 100)}%
              </Text>
            </View>
          ))
        )}

        <SectionTitle label="Recent" />
        {history.length === 0 ? (
          <Text style={styles.empty}>No quizzes finished yet.</Text>
        ) : (
          history.map((h) => (
            <View key={`${h.quizTypeId}-${h.completedAt}`} style={styles.row}>
              <View style={styles.grow}>
                <Text style={styles.rowTitle}>{h.quizTypeName}</Text>
                <Text style={styles.rowSub}>{relativeTime(h.completedAt)}</Text>
              </View>
              <Text style={styles.rowScore}>
                {h.score}/{h.total}
              </Text>
            </View>
          ))
        )}
      </ScrollView>
    </SafeAreaView>
  );
}

function Stat({ label, value }: { label: string; value: string }) {
  return (
    <View style={styles.stat}>
      <Text style={styles.statValue}>{value}</Text>
      <Text style={styles.statLabel}>{label}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  screen: { flex: 1, backgroundColor: colors.washiWhite },
  content: { padding: space.lg, paddingBottom: space.xxl },
  title: { fontFamily: serif, fontSize: 28, color: colors.sumiDeep, marginBottom: space.lg },
  tiles: { flexDirection: "row", gap: space.md },
  stat: {
    flex: 1,
    padding: space.lg,
    borderRadius: radius.md,
    borderWidth: 1,
    borderColor: colors.washiWarm,
    backgroundColor: colors.white,
    alignItems: "center",
    gap: 2,
  },
  statValue: { fontFamily: serif, fontSize: 24, color: colors.sumiDeep },
  statLabel: { fontSize: 11, fontWeight: "700", letterSpacing: 0.5, textTransform: "uppercase", color: colors.sumiLight },
  empty: { fontSize: 14, lineHeight: 20, color: colors.sumiLight },
  row: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingVertical: space.md,
    borderBottomWidth: 1,
    borderBottomColor: colors.washiWarm,
  },
  grow: { flex: 1 },
  rowTitle: { fontSize: 15, color: colors.sumiDeep },
  rowSub: { fontSize: 12, color: colors.sumiLight, marginTop: 2 },
  rowMeta: { fontSize: 13, color: colors.kitsune, fontWeight: "600", fontVariant: ["tabular-nums"] },
  rowScore: { fontFamily: serif, fontSize: 18, color: colors.sumiDeep, fontVariant: ["tabular-nums"] },
});

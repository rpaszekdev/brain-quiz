import { useEffect } from "react";
import { StyleSheet, Text, View } from "react-native";
import Animated, { FadeInDown } from "react-native-reanimated";
import { success } from "../haptics";
import type { Play } from "../quiz/use-play";
import { colors, motion, radius, serif, space } from "../theme";
import { Button } from "../ui/Button";
import { CountUp } from "./CountUp";
import { formatElapsed } from "./LessonHeader";

const STAGGER_MS = 120;

interface StatCardProps {
  index: number;
  label: string;
  to: number;
  format: (value: number) => string;
  note?: string;
}

function StatCard({ index, label, to, format, note }: StatCardProps) {
  return (
    <Animated.View entering={FadeInDown.delay(index * STAGGER_MS).duration(motion.base)} style={styles.card}>
      <Text style={styles.cardLabel}>{label}</Text>
      <CountUp to={to} format={format} delay={index * STAGGER_MS} style={styles.cardValue} />
      {note !== undefined && <Text style={styles.cardNote}>{note}</Text>}
    </Animated.View>
  );
}

interface ResultScreenProps {
  play: Play;
  onClose: () => void;
}

/** Lesson done: four numbers roll up, then continue or go again. */
export function ResultScreen({ play, onClose }: ResultScreenProps) {
  const { summary } = play;
  const perfect = summary.misses === 0;
  useEffect(() => {
    success();
  }, []);

  return (
    <View style={styles.screen}>
      <View style={styles.top}>
        <Text style={styles.title}>{perfect ? "Perfect!" : "Lesson complete"}</Text>
        <Text style={styles.subtitle}>{play.meta?.quizType.name ?? ""}</Text>
      </View>
      <View style={styles.grid}>
        <StatCard index={0} label="Accuracy" to={summary.accuracy * 100} format={(v) => `${Math.round(v)}%`} />
        <StatCard index={1} label="Time" to={summary.totalMs} format={(v) => formatElapsed(v)} />
        <StatCard
          index={2}
          label="Best streak"
          to={summary.bestStreak}
          format={(v) => String(Math.round(v))}
          note="in a row"
        />
        <StatCard
          index={3}
          label={summary.misses === 0 ? "Misses" : "Fixed"}
          to={summary.misses === 0 ? 0 : summary.fixed}
          format={(v) => (summary.misses === 0 ? "0" : `${Math.round(v)}/${summary.misses}`)}
          note={summary.misses === 0 ? "clean run" : "asked again"}
        />
      </View>
      <View style={styles.actions}>
        <Button label="Continue" onPress={onClose} />
        <Button label="Play again" variant="quiet" onPress={play.restart} />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  screen: { flex: 1, padding: space.xl, justifyContent: "space-between" },
  top: { alignItems: "center", gap: space.xs, marginTop: space.xxl },
  title: { fontFamily: serif, fontSize: 32, color: colors.sumiDeep },
  subtitle: { fontSize: 15, color: colors.sumiLight },
  grid: { flexDirection: "row", flexWrap: "wrap", gap: space.md },
  card: {
    width: "47%",
    flexGrow: 1,
    padding: space.lg,
    gap: space.xs,
    borderRadius: radius.lg,
    borderWidth: 1,
    borderColor: colors.washiWarm,
    backgroundColor: colors.white,
    alignItems: "center",
  },
  cardLabel: { fontSize: 11, fontWeight: "700", letterSpacing: 0.8, textTransform: "uppercase", color: colors.sumiLight },
  cardValue: { fontFamily: serif, fontSize: 34, color: colors.sumiDeep, fontVariant: ["tabular-nums"] },
  cardNote: { fontSize: 12, color: colors.sumiLight },
  actions: { gap: space.sm },
});

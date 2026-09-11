import { useState } from "react";
import { ScrollView, StyleSheet, Text, View } from "react-native";
import { useRouter } from "expo-router";
import { SafeAreaView } from "react-native-safe-area-context";
import { BRAIN_DETAILS } from "@/lib/brain-details";
import type { BrainRegion } from "@/lib/brain-regions";
import { colors, radius, serif, space } from "../../src/theme";
import { Button } from "../../src/ui/Button";
import { Chip } from "../../src/ui/Chip";
import { BrainCanvas } from "../../src/viewer/BrainCanvas";

type Category = BrainRegion["category"];

const CATEGORIES: readonly { id: Category; label: string }[] = [
  { id: "cortical", label: "Cortical" },
  { id: "subcortical", label: "Subcortical" },
  { id: "brainstem", label: "Brainstem" },
  { id: "cerebellum", label: "Cerebellum" },
];

export default function Explore() {
  const router = useRouter();
  const [category, setCategory] = useState<Category | null>(null);
  const [selected, setSelected] = useState<BrainRegion | null>(null);
  const details = selected ? BRAIN_DETAILS[selected.id] : undefined;

  return (
    <SafeAreaView style={styles.screen} edges={["top"]}>
      <View style={styles.header}>
        <Text style={styles.title}>Explore</Text>
      </View>
      {/* ScrollView defaults to flexGrow: 1, which would let a one-line chip strip
          claim half the screen from the canvas below it. */}
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        style={styles.chipStrip}
        contentContainerStyle={styles.chips}
      >
        {CATEGORIES.map((c) => (
          <Chip
            key={c.id}
            label={c.label}
            active={category === c.id}
            onPress={() => setCategory(category === c.id ? null : c.id)}
          />
        ))}
      </ScrollView>

      <BrainCanvas
        focus={selected}
        mode="accent"
        flyToFocus={false}
        categoryFilter={category}
        onTapRegion={setSelected}
        style={styles.canvas}
      />

      {selected && (
        <View style={styles.sheet}>
          <View style={styles.grabber} />
          <View style={styles.sheetHead}>
            <Text style={styles.sheetTitle}>{selected.name}</Text>
            <Text style={styles.sheetMeta}>{selected.category}</Text>
          </View>
          <Text style={styles.body}>{selected.description}</Text>
          {details?.functions.slice(0, 2).map((fn) => (
            <Text key={fn} style={styles.bullet}>• {fn}</Text>
          ))}
          {details?.clinical[0] && (
            <Text style={styles.clinical}>Clinical: {details.clinical[0]}</Text>
          )}
          <View style={styles.row}>
            <Button label="Practice regions" onPress={() => router.push("/play/identify")} style={styles.grow} />
            <Button label="Close" variant="quiet" onPress={() => setSelected(null)} />
          </View>
        </View>
      )}
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  screen: { flex: 1, backgroundColor: colors.washiWhite },
  header: { paddingHorizontal: space.lg, paddingTop: space.sm },
  title: { fontFamily: serif, fontSize: 28, color: colors.sumiDeep },
  chipStrip: { flexGrow: 0, flexShrink: 0 },
  chips: { paddingHorizontal: space.lg, paddingVertical: space.md, gap: space.sm, alignItems: "center" },
  canvas: { flex: 1 },
  sheet: {
    position: "absolute",
    left: 0,
    right: 0,
    bottom: 0,
    padding: space.lg,
    paddingTop: space.sm,
    gap: space.sm,
    backgroundColor: colors.white,
    borderTopLeftRadius: radius.lg,
    borderTopRightRadius: radius.lg,
    borderWidth: 1,
    borderColor: colors.washiWarm,
  },
  grabber: { alignSelf: "center", width: 36, height: 4, borderRadius: 2, backgroundColor: colors.washiWarm, marginBottom: space.sm },
  sheetHead: { flexDirection: "row", justifyContent: "space-between", alignItems: "baseline" },
  sheetTitle: { fontFamily: serif, fontSize: 22, color: colors.sumiDeep },
  sheetMeta: { fontSize: 12, fontWeight: "600", color: colors.kitsune, textTransform: "capitalize" },
  body: { fontSize: 14, lineHeight: 20, color: colors.sumiMedium },
  bullet: { fontSize: 13, lineHeight: 19, color: colors.sumiMedium },
  clinical: { fontSize: 13, lineHeight: 19, color: colors.sumiLight, fontStyle: "italic" },
  row: { flexDirection: "row", gap: space.sm, marginTop: space.sm },
  grow: { flex: 1 },
});

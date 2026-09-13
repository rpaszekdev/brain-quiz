import { useEffect, useMemo, useRef, useState } from "react";
import {
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  View,
  type GestureResponderEvent,
} from "react-native";
import { useRouter } from "expo-router";
import { SafeAreaView } from "react-native-safe-area-context";
import { BRAIN_DETAILS } from "@/lib/brain-details";
import { BRAIN_REGIONS, getRegion, regionLabel } from "@/lib/brain-regions";
import { NEURAL_PATHWAYS } from "@/lib/data/pathways";
import type { BrainRegion } from "@/lib/brain-regions";
import type { NeuralPathway } from "@/lib/types";
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

/** Collapsed peek height: title + two lines + actions, brain stays visible. */
const PEEK_LINES = 2;
/** Description lines shown while collapsed; the handle expands the rest. */
const PEEK_BODY_LINES = 3;
/** Finger travel on the handle that closes (down) or expands (up) the sheet. */
const SWIPE_CLOSE = 60;
const SWIPE_EXPAND = 40;

/** Page-space Y of a touch; react-native-web hands over the raw DOM TouchEvent. */
function touchY(event: GestureResponderEvent): number {
  const native = event.nativeEvent;
  if (typeof native.pageY === "number") return native.pageY;
  return (native as unknown as TouchEvent).changedTouches[0]?.pageY ?? 0;
}
const MAX_REGION_HITS = 6;
const MAX_TRACT_HITS = 3;

function searchRegions(query: string): BrainRegion[] {
  const q = query.trim().toLowerCase();
  if (q.length === 0) return [];
  return BRAIN_REGIONS.filter(
    (r) =>
      r.name.toLowerCase().includes(q) ||
      r.aliases.some((a) => a.toLowerCase().includes(q)),
  ).slice(0, MAX_REGION_HITS);
}

function searchTracts(query: string): NeuralPathway[] {
  const q = query.trim().toLowerCase();
  if (q.length === 0) return [];
  return NEURAL_PATHWAYS.filter((t) => t.name.toLowerCase().includes(q)).slice(
    0,
    MAX_TRACT_HITS,
  );
}

function tractEndpointIds(tract: NeuralPathway): string[] {
  return [...new Set([...tract.sourceRegions, ...tract.targetRegions])].filter(
    (id) => getRegion(id),
  );
}

export default function Explore() {
  const router = useRouter();
  const [category, setCategory] = useState<Category | null>(null);
  const [query, setQuery] = useState("");
  const [selected, setSelected] = useState<BrainRegion | null>(null);
  const [selectedTract, setSelectedTract] = useState<NeuralPathway | null>(null);
  const [expanded, setExpanded] = useState(false);
  const details = selected ? BRAIN_DETAILS[selected.id] : undefined;

  const regionHits = useMemo(() => searchRegions(query), [query]);
  const tractHits = useMemo(() => searchTracts(query), [query]);
  const searching = query.trim().length > 0;

  // Tract endpoints to glow: every endpoint that names a real region.
  const tractEndpointIds_ = useMemo(
    () => (selectedTract ? tractEndpointIds(selectedTract) : []),
    [selectedTract],
  );
  const tractFocus = useMemo(
    () => (tractEndpointIds_.length > 0 ? getRegion(tractEndpointIds_[0]) : null),
    [tractEndpointIds_],
  );

  const clearSelection = () => {
    setSelected(null);
    setSelectedTract(null);
  };

  const pickRegion = (region: BrainRegion) => {
    setSelectedTract(null);
    setSelected(region);
    setQuery("");
  };

  const pickTract = (tract: NeuralPathway) => {
    setSelected(null);
    setSelectedTract(tract);
    setQuery("");
  };

  // A new selection always opens as a peek; the sheet never inherits expansion.
  useEffect(() => {
    setExpanded(false);
  }, [selected?.id, selectedTract?.id]);

  // Swipe the handle down to close, up to expand; a tap toggles (Pressable).
  // Touch events, not PanResponder: they fire regardless of who owns the
  // responder and behave the same on iOS, Android and the web test surface.
  const swipeStart = useRef<number | null>(null);
  const onSwipeStart = (event: GestureResponderEvent) => {
    swipeStart.current = touchY(event);
  };
  const onSwipeEnd = (event: GestureResponderEvent) => {
    if (swipeStart.current === null) return;
    const dy = touchY(event) - swipeStart.current;
    swipeStart.current = null;
    if (dy > SWIPE_CLOSE) clearSelection();
    else if (dy < -SWIPE_EXPAND) setExpanded(true);
  };

  const sheetOpen = selected !== null || selectedTract !== null;

  return (
    <SafeAreaView style={styles.screen} edges={["top"]}>
      <View style={styles.header}>
        <Text style={styles.title}>Explore</Text>
      </View>
      <View style={styles.searchWrap}>
        <TextInput
          value={query}
          onChangeText={setQuery}
          placeholder="Search regions or pathways…"
          placeholderTextColor={colors.sumiLight}
          autoCorrect={false}
          autoCapitalize="none"
          clearButtonMode="while-editing"
          style={styles.search}
        />
      </View>
      {/* The canvas stays mounted while searching: unmounting it would tear down
          the GL context and re-upload 230K triangles on every keystroke. */}
      <View style={styles.stage}>
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

        {/* In-flow (not absolute): when the sheet opens the canvas shrinks and
            the brain re-fits above it instead of hiding underneath it. Tapping
            empty canvas closes the sheet; orbit still works as usual. */}
        <BrainCanvas
          focus={selected ?? tractFocus ?? null}
          highlightIds={selectedTract ? tractEndpointIds_ : null}
          mode="accent"
          flyToFocus={false}
          categoryFilter={category}
          onTapRegion={pickRegion}
          onTapEmpty={clearSelection}
          style={styles.canvas}
        />

        {searching && (
          <ScrollView
            keyboardShouldPersistTaps="handled"
            style={styles.results}
            contentContainerStyle={styles.resultsContent}
          >
            {tractHits.map((t) => (
              <Pressable key={t.id} onPress={() => pickTract(t)} style={styles.result}>
                <Text style={styles.resultKind}>Pathway</Text>
                <Text style={styles.resultLabel}>{t.name}</Text>
              </Pressable>
            ))}
            {regionHits.map((r) => (
              <Pressable key={r.id} onPress={() => pickRegion(r)} style={styles.result}>
                <Text style={styles.resultKind}>Region</Text>
                <Text style={styles.resultLabel}>{r.name}</Text>
              </Pressable>
            ))}
            {tractHits.length === 0 && regionHits.length === 0 && (
              <Text style={styles.noResults}>Nothing found for “{query.trim()}”.</Text>
            )}
          </ScrollView>
        )}
      </View>

      {sheetOpen && !searching && (
        <View style={[styles.sheet, expanded && styles.sheetExpanded]}>
          <Pressable
            onPress={() => setExpanded((e) => !e)}
            onTouchStart={onSwipeStart}
            onTouchEnd={onSwipeEnd}
            accessibilityRole="button"
            accessibilityLabel={expanded ? "Collapse details" : "Expand details"}
            style={styles.handle}
          >
            <View style={styles.grabber} />
          </Pressable>
          {selected && (
            <>
              <View style={styles.sheetHead}>
                <Text style={styles.sheetTitle}>{selected.name}</Text>
                <Text style={styles.sheetMeta}>{selected.category}</Text>
              </View>
              <ScrollView
                scrollEnabled={expanded}
                showsVerticalScrollIndicator={expanded}
                style={expanded ? styles.sheetScrollExpanded : styles.sheetScrollPeek}
              >
                <Text style={styles.body} numberOfLines={expanded ? undefined : PEEK_BODY_LINES}>
                  {selected.description}
                </Text>
                {(
                  expanded ? details?.functions : details?.functions.slice(0, PEEK_LINES)
                )?.map((fn) => (
                  <Text key={fn} style={styles.bullet}>
                    • {fn}
                  </Text>
                ))}
                {details?.clinical[0] && (
                  <Text style={styles.clinical}>Clinical: {details.clinical[0]}</Text>
                )}
              </ScrollView>
              <View style={styles.row}>
                <Button
                  label="Practice regions"
                  onPress={() => router.push("/play/identify")}
                  style={styles.grow}
                />
                <Button label="Close" variant="quiet" onPress={clearSelection} />
              </View>
            </>
          )}
          {selectedTract && (
            <>
              <View style={styles.sheetHead}>
                <Text style={styles.sheetTitle}>{selectedTract.name}</Text>
                <Text style={styles.sheetMeta}>{selectedTract.type}</Text>
              </View>
              <ScrollView
                scrollEnabled={expanded}
                showsVerticalScrollIndicator={expanded}
                style={expanded ? styles.sheetScrollExpanded : styles.sheetScrollPeek}
              >
                <Text style={styles.body} numberOfLines={expanded ? undefined : PEEK_BODY_LINES}>
                  {selectedTract.description}
                </Text>
                <Text style={styles.bullet}>
                  ↔{" "}
                  {tractEndpointIds_
                    .map((id) => regionLabel(id))
                    .join(" · ")}
                </Text>
                {expanded && (
                  <Text style={styles.clinical}>Clinical: {selectedTract.clinical}</Text>
                )}
              </ScrollView>
              <View style={styles.row}>
                <Button
                  label="Practice pathways"
                  onPress={() => router.push("/play/name-tract")}
                  style={styles.grow}
                />
                <Button label="Close" variant="quiet" onPress={clearSelection} />
              </View>
            </>
          )}
        </View>
      )}
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  screen: { flex: 1, backgroundColor: colors.washiWhite },
  header: { paddingHorizontal: space.lg, paddingTop: space.sm },
  title: { fontFamily: serif, fontSize: 28, color: colors.sumiDeep },
  searchWrap: { paddingHorizontal: space.lg, paddingTop: space.sm },
  search: {
    backgroundColor: colors.white,
    borderWidth: 1,
    borderColor: colors.washiWarm,
    borderRadius: radius.md,
    paddingHorizontal: space.md,
    paddingVertical: space.sm,
    fontSize: 15,
    color: colors.sumiDeep,
  },
  stage: { flex: 1 },
  results: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: colors.washiWhite,
  },
  resultsContent: { padding: space.lg, gap: space.sm },
  result: {
    flexDirection: "row",
    alignItems: "baseline",
    gap: space.md,
    padding: space.md,
    backgroundColor: colors.white,
    borderWidth: 1,
    borderColor: colors.washiWarm,
    borderRadius: radius.md,
  },
  resultKind: {
    fontSize: 11,
    fontWeight: "700",
    letterSpacing: 0.5,
    textTransform: "uppercase",
    color: colors.kitsune,
    minWidth: 52,
  },
  resultLabel: { fontSize: 15, color: colors.sumiDeep, flexShrink: 1 },
  noResults: { fontSize: 14, color: colors.sumiLight, textAlign: "center" },
  chipStrip: { flexGrow: 0, flexShrink: 0 },
  chips: {
    paddingHorizontal: space.lg,
    paddingVertical: space.md,
    gap: space.sm,
    alignItems: "center",
  },
  canvas: { flex: 1 },
  sheet: {
    flexShrink: 0,
    maxHeight: "45%",
    padding: space.lg,
    paddingTop: 0,
    gap: space.sm,
    backgroundColor: colors.white,
    borderTopLeftRadius: radius.lg,
    borderTopRightRadius: radius.lg,
    borderWidth: 1,
    borderColor: colors.washiWarm,
  },
  sheetExpanded: { maxHeight: "70%" },
  handle: { paddingTop: space.sm, paddingBottom: space.sm, alignItems: "center" },
  grabber: {
    width: 36,
    height: 4,
    borderRadius: 2,
    backgroundColor: colors.washiWarm,
  },
  sheetHead: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "baseline",
  },
  sheetTitle: { fontFamily: serif, fontSize: 22, color: colors.sumiDeep },
  sheetMeta: {
    fontSize: 12,
    fontWeight: "600",
    color: colors.kitsune,
    textTransform: "capitalize",
  },
  sheetScrollPeek: { flexGrow: 0, flexShrink: 1 },
  sheetScrollExpanded: { flexGrow: 1, flexShrink: 1 },
  body: { fontSize: 14, lineHeight: 20, color: colors.sumiMedium },
  bullet: { fontSize: 13, lineHeight: 19, color: colors.sumiMedium },
  clinical: {
    fontSize: 13,
    lineHeight: 19,
    color: colors.sumiLight,
    fontStyle: "italic",
  },
  row: { flexDirection: "row", gap: space.sm, marginTop: space.sm },
  grow: { flex: 1 },
});

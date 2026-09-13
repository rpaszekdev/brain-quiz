import { useCallback, useEffect, useMemo, useState } from "react";
import { Pressable, StyleSheet, Text, View } from "react-native";
import { useRouter } from "expo-router";
import { SafeAreaView } from "react-native-safe-area-context";
import { Ionicons } from "@expo/vector-icons";
import { getRegion, type BrainRegion } from "@/lib/brain-regions";
import { RegionActions, RegionBody, ViewActions, ViewBody } from "../../src/explore/cards";
import { PeekSheet } from "../../src/explore/PeekSheet";
import { explore, useExplore } from "../../src/explore/store";
import { getNetwork, getTract, sceneFor, viewChip, viewMembers, type ExploreView } from "../../src/explore/view";
import { colors, radius, serif, space } from "../../src/theme";
import { BrainCanvas } from "../../src/viewer/BrainCanvas";

function viewSubtitle(view: ExploreView, members: readonly BrainRegion[]): string {
  switch (view.kind) {
    case "all":
      return "";
    case "lobe":
      return `${members.length} regions`;
    case "deep":
      return `${members.length} structures`;
    case "tract":
      return getTract(view.tractId)?.type ?? "";
    case "network":
      return getNetwork(view.networkId)?.abbreviation ?? "";
  }
}

/**
 * Nothing but the brain and one search button. Everything else — lobes, deep
 * structures, pathways, networks — is chosen in the search hub and comes back
 * as a view: one chip over the brain says what is cut, × clears it.
 */
export default function Explore() {
  const router = useRouter();
  const { view, selectedId } = useExplore();
  const [expanded, setExpanded] = useState(false);
  const selected = useMemo(() => (selectedId ? getRegion(selectedId) ?? null : null), [selectedId]);
  const scene = useMemo(() => sceneFor(view, selectedId), [view, selectedId]);
  const members = useMemo(() => viewMembers(view), [view]);
  const chip = viewChip(view);

  // A new selection or view always opens as a peek.
  useEffect(() => {
    setExpanded(false);
  }, [view, selectedId]);

  const onTapRegion = useCallback((region: BrainRegion) => explore.select(region.id), []);
  const onTapEmpty = useCallback(() => {
    if (selectedId) explore.select(null);
  }, [selectedId]);

  const sheet = selected
    ? {
        title: selected.name,
        subtitle: selected.category,
        body: <RegionBody region={selected} expanded={expanded} />,
        actions: <RegionActions region={selected} />,
        onClose: () => explore.select(null),
      }
    : chip
      ? {
          title: chip.label,
          subtitle: viewSubtitle(view, members),
          body: <ViewBody view={view} members={members} expanded={expanded} />,
          actions: <ViewActions view={view} />,
          onClose: () => explore.reset(),
        }
      : null;

  return (
    <SafeAreaView style={styles.screen} edges={["top"]}>
      <View style={styles.header}>
        <Text style={styles.title}>Explore</Text>
      </View>
      <View style={styles.stage}>
        {/* In-flow (not absolute): when the sheet opens the canvas shrinks and
            the brain re-fits above it instead of hiding underneath it. */}
        <BrainCanvas
          scene={scene}
          focus={selected}
          flyToFocus={false}
          onTapRegion={onTapRegion}
          onTapEmpty={onTapEmpty}
          style={styles.canvas}
        />
        {chip && (
          <Pressable
            style={styles.chip}
            onPress={() => explore.reset()}
            accessibilityRole="button"
            accessibilityLabel={`Clear ${chip.label}`}
          >
            <Text style={styles.chipText}>
              {chip.icon} {chip.label}
            </Text>
            <Text style={styles.chipClose}>×</Text>
          </Pressable>
        )}
        <Pressable
          style={styles.fab}
          onPress={() => router.push("/find")}
          accessibilityRole="button"
          accessibilityLabel="Search the brain"
        >
          <Ionicons name="search" size={24} color={colors.white} />
        </Pressable>
      </View>
      {sheet && (
        <PeekSheet
          title={sheet.title}
          subtitle={sheet.subtitle}
          expanded={expanded}
          onToggle={() => setExpanded((e) => !e)}
          onExpand={() => setExpanded(true)}
          onClose={sheet.onClose}
          actions={sheet.actions}
        >
          {sheet.body}
        </PeekSheet>
      )}
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  screen: { flex: 1, backgroundColor: colors.washiWhite },
  header: { paddingHorizontal: space.lg, paddingTop: space.sm, paddingBottom: space.sm },
  title: { fontFamily: serif, fontSize: 28, color: colors.sumiDeep },
  stage: { flex: 1 },
  canvas: { flex: 1 },
  chip: {
    position: "absolute",
    top: space.sm,
    left: space.lg,
    flexDirection: "row",
    alignItems: "center",
    gap: space.sm,
    paddingVertical: space.sm,
    paddingHorizontal: space.md,
    borderRadius: radius.lg,
    backgroundColor: colors.white,
    borderWidth: 1,
    borderColor: colors.washiWarm,
  },
  chipText: { fontSize: 14, fontWeight: "600", color: colors.sumiDeep },
  chipClose: { fontSize: 16, color: colors.sumiLight },
  fab: {
    position: "absolute",
    right: space.lg,
    bottom: space.lg,
    width: 56,
    height: 56,
    borderRadius: 28,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: colors.ai,
    shadowColor: colors.sumiDeep,
    shadowOpacity: 0.2,
    shadowRadius: 8,
    shadowOffset: { width: 0, height: 4 },
    elevation: 4,
  },
});

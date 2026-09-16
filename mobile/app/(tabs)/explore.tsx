import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { Pressable, StyleSheet, Text, View, useWindowDimensions, type LayoutChangeEvent } from "react-native";
import { useRouter } from "expo-router";
import { SafeAreaView } from "react-native-safe-area-context";
import { Ionicons } from "@expo/vector-icons";
import Animated, { FadeIn, FadeOut } from "react-native-reanimated";
import { getRegion, type BrainRegion } from "@/lib/brain-regions";
import { press, tick } from "../../src/haptics";
import { RegionActions, RegionBody, ViewActions, ViewBody } from "../../src/explore/cards";
import { articleFor } from "../../src/explore/content";
import { OpacityRail, RAIL_HEIGHT } from "../../src/explore/OpacityRail";
import { PeekSheet } from "../../src/explore/PeekSheet";
import { sheetGeometry } from "../../src/explore/sheet-geometry";
import { explore, useExplore } from "../../src/explore/store";
import { getNetwork, getTract, sceneFor, viewChip, viewMembers, type ExploreView } from "../../src/explore/view";
import { colors, motion, radius, serif, space } from "../../src/theme";
import { BrainCanvas } from "../../src/viewer/BrainCanvas";
import { heroHeight } from "../../src/viewer/hero";

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

interface SheetContent {
  readonly title: string;
  readonly subtitle: string;
  readonly body: React.ReactNode;
  readonly actions: React.ReactNode;
  readonly onClose: () => void;
}

/**
 * Nothing but the brain, a layer rail and one search button. Everything else
 * — lobes, deep structures, pathways, networks — is chosen in the search hub
 * and comes back as a view: one chip over the brain says what is cut.
 *
 * The sheet lies over the canvas; the brain is framed into the band above it
 * (the same hero framing as a lesson), so nothing resizes and nothing hides.
 */
export default function Explore() {
  const router = useRouter();
  const { height: windowHeight } = useWindowDimensions();
  const { view, selectedId, opacity } = useExplore();
  const [expanded, setExpanded] = useState(false);
  const [stageHeight, setStageHeight] = useState(0);
  const selected = useMemo(() => (selectedId ? (getRegion(selectedId) ?? null) : null), [selectedId]);
  const scene = useMemo(() => sceneFor(view, selectedId, opacity), [view, selectedId, opacity]);
  const members = useMemo(() => viewMembers(view), [view]);
  const chip = viewChip(view);

  // A new selection or view always opens as a peek.
  useEffect(() => {
    setExpanded(false);
  }, [view, selectedId]);

  const onTapRegion = useCallback((region: BrainRegion) => {
    tick();
    explore.select(region.id);
  }, []);
  const onTapEmpty = useCallback(() => {
    if (selectedId) explore.select(null);
  }, [selectedId]);
  const onStageLayout = useCallback((event: LayoutChangeEvent) => {
    setStageHeight(Math.round(event.nativeEvent.layout.height));
  }, []);

  const sheet: SheetContent | null = selected
    ? {
        title: selected.name,
        subtitle: articleFor("region", selected.id)?.subtitle ?? selected.category,
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
  // Keep the last content while the sheet slides away, so it does not blank.
  const lastSheet = useRef<SheetContent | null>(null);
  if (sheet) lastSheet.current = sheet;
  const shown = sheet ?? lastSheet.current;
  const open = sheet !== null && stageHeight > 0;

  const geometry = useMemo(() => sheetGeometry(stageHeight, heroHeight(windowHeight)), [stageHeight, windowHeight]);
  const hero = !open ? undefined : expanded ? geometry.fullTop : geometry.peekTop;
  // Everything that floats over the brain lives in the band the brain is in,
  // so the sheet never buries it.
  const band = hero ?? stageHeight;

  return (
    <SafeAreaView style={styles.screen} edges={["top"]}>
      <View style={styles.header}>
        <Text style={styles.title}>Explore</Text>
      </View>
      <View style={styles.stage} onLayout={onStageLayout}>
        <BrainCanvas
          scene={scene}
          focus={selected}
          heroHeight={hero}
          onTapRegion={onTapRegion}
          onTapEmpty={onTapEmpty}
          style={styles.canvas}
        />
        <View style={[styles.band, { height: band }]} pointerEvents="box-none">
          {chip && (
            <Animated.View
              entering={FadeIn.duration(motion.fast)}
              exiting={FadeOut.duration(motion.fast)}
              style={styles.chipWrap}
            >
              <Pressable
                style={({ pressed }) => [styles.chip, pressed && styles.pressed]}
                onPress={() => {
                  press();
                  explore.reset();
                }}
                accessibilityRole="button"
                accessibilityLabel={`Clear ${chip.label}`}
              >
                <Text style={styles.chipText}>
                  {chip.icon} {chip.label}
                </Text>
              </Pressable>
            </Animated.View>
          )}
          {band > RAIL_HEIGHT + space.xxl && (
            <View style={styles.railWrap} pointerEvents="box-none">
              <OpacityRail value={opacity} onChange={explore.setOpacity} />
            </View>
          )}
          <Pressable
            style={({ pressed }) => [styles.fab, pressed && styles.fabPressed]}
            onPress={() => {
              press();
              router.push("/find");
            }}
            accessibilityRole="button"
            accessibilityLabel="Search the brain"
          >
            <Ionicons name="search" size={22} color={colors.white} />
          </Pressable>
        </View>
        {shown && (
          <PeekSheet
            open={open}
            expanded={expanded}
            geometry={geometry}
            title={shown.title}
            subtitle={shown.subtitle}
            onToggle={() => setExpanded((e) => !e)}
            onExpand={() => setExpanded(true)}
            onCollapse={() => setExpanded(false)}
            onClose={shown.onClose}
            actions={shown.actions}
          >
            {shown.body}
          </PeekSheet>
        )}
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  screen: { flex: 1, backgroundColor: colors.washiWhite },
  header: { paddingHorizontal: space.lg, paddingTop: space.sm, paddingBottom: space.sm },
  title: { fontFamily: serif, fontSize: 28, color: colors.sumiDeep },
  stage: { flex: 1, overflow: "hidden" },
  canvas: { flex: 1 },
  band: { position: "absolute", top: 0, left: 0, right: 0 },
  chipWrap: { position: "absolute", top: space.sm, left: space.lg },
  chip: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: space.xs,
    paddingHorizontal: space.md,
    borderRadius: radius.pill,
    borderWidth: 1,
    borderColor: colors.washiWarm,
    backgroundColor: colors.washiWhite,
  },
  pressed: { opacity: 0.6 },
  chipText: { fontSize: 13, color: colors.sumiMedium },
  railWrap: {
    position: "absolute",
    right: space.xs,
    top: "50%",
    marginTop: -RAIL_HEIGHT / 2,
  },
  fab: {
    position: "absolute",
    right: space.lg,
    bottom: space.lg,
    width: 52,
    height: 52,
    borderRadius: 26,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: colors.ai,
    shadowColor: colors.sumiDeep,
    shadowOpacity: 0.18,
    shadowRadius: 10,
    shadowOffset: { width: 0, height: 4 },
    elevation: 4,
  },
  fabPressed: { transform: [{ scale: 0.94 }] },
});

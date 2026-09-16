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
import { PeekSheet } from "../../src/explore/PeekSheet";
import { sheetGeometry } from "../../src/explore/sheet-geometry";
import { explore, useExplore } from "../../src/explore/store";
import { ToolsPanel } from "../../src/explore/ToolsPanel";
import { getNetwork, getTract, sceneFor, viewChip, viewMembers, type ExploreView } from "../../src/explore/view";
import { colors, motion, radius, serif, space } from "../../src/theme";
import { isWholeBrain } from "../../src/viewer/clip";
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
 * A search field, the brain and a tools button. Search is the front door:
 * lobes, deep structures, pathways, networks and single regions are chosen
 * in the search hub and come back as a view — one chip over the brain says
 * what is cut. Tapping the brain picks whatever layer the depth slider has
 * made solid.
 *
 * The sheet lies over the canvas; the brain is framed into the band above it
 * (the same hero framing as a lesson), so nothing resizes and nothing hides.
 */
export default function Explore() {
  const router = useRouter();
  const { height: windowHeight } = useWindowDimensions();
  const { view, selectedId, opacity, slice } = useExplore();
  const [expanded, setExpanded] = useState(false);
  const [tools, setTools] = useState(false);
  const [toolsHeight, setToolsHeight] = useState(0);
  const [stageHeight, setStageHeight] = useState(0);
  const selected = useMemo(() => (selectedId ? (getRegion(selectedId) ?? null) : null), [selectedId]);
  const scene = useMemo(
    () => sceneFor(view, selectedId, opacity, slice),
    [view, selectedId, opacity, slice],
  );
  const members = useMemo(() => viewMembers(view), [view]);
  const chip = viewChip(view);
  const cutting = !isWholeBrain(slice) || opacity < 1;

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
        body: <RegionBody region={selected} />,
        actions: <RegionActions region={selected} />,
        onClose: () => explore.select(null),
      }
    : chip
      ? {
          title: chip.label,
          subtitle: viewSubtitle(view, members),
          body: <ViewBody view={view} members={members} />,
          actions: <ViewActions view={view} />,
          onClose: () => explore.reset(),
        }
      : null;
  // Keep the last content while the sheet slides away, so it does not blank.
  const lastSheet = useRef<SheetContent | null>(null);
  if (sheet) lastSheet.current = sheet;
  const shown = sheet ?? lastSheet.current;
  const open = sheet !== null && stageHeight > 0 && !tools;

  const geometry = useMemo(() => sheetGeometry(stageHeight, heroHeight(windowHeight)), [stageHeight, windowHeight]);
  // How much of the stage is covered from the bottom: the tools panel wins,
  // then the sheet. The brain is framed into whatever is left above it and
  // the floating buttons sit just on top of it, so nothing is ever buried.
  const covered = tools && toolsHeight > 0 ? toolsHeight : open ? stageHeight - (expanded ? geometry.fullTop : geometry.peekTop) : 0;
  const hero = covered > 0 ? stageHeight - covered : undefined;
  // Positioned one by one — a full-width wrapper over the canvas, however
  // transparent, is one more thing between a finger and the brain it is
  // trying to rotate.
  const floor = covered + space.lg;

  return (
    <SafeAreaView style={styles.screen} edges={["top"]}>
      <View style={styles.header}>
        <Text style={styles.title}>Explore</Text>
        <Pressable
          style={({ pressed }) => [styles.search, pressed && styles.pressed]}
          onPress={() => {
            press();
            router.push("/find");
          }}
          accessibilityRole="search"
          accessibilityLabel="Search the brain"
        >
          <Ionicons name="search" size={20} color={colors.sumiLight} />
          <Text style={styles.searchHint}>Region, lobe, pathway, network</Text>
        </Pressable>
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
        <Pressable
          style={({ pressed }) => [styles.round, styles.tools, { bottom: floor }, cutting && styles.toolsOn, pressed && styles.roundPressed]}
          onPress={() => {
            press();
            setTools((t) => !t);
          }}
          accessibilityRole="button"
          accessibilityState={{ expanded: tools }}
          accessibilityLabel="Slice and transparency"
        >
          <Ionicons name="options-outline" size={20} color={cutting ? colors.white : colors.sumiMedium} />
        </Pressable>
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
        {tools && (
          <ToolsPanel
            opacity={opacity}
            slice={slice}
            onOpacity={explore.setOpacity}
            onSlice={explore.setSlice}
            onHeight={setToolsHeight}
          />
        )}
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  screen: { flex: 1, backgroundColor: colors.washiWhite },
  header: { paddingHorizontal: space.lg, paddingTop: space.sm, paddingBottom: space.md, gap: space.sm },
  title: { fontFamily: serif, fontSize: 28, color: colors.sumiDeep },
  search: {
    flexDirection: "row",
    alignItems: "center",
    gap: space.sm,
    height: 52,
    paddingHorizontal: space.md,
    backgroundColor: colors.white,
    borderWidth: 1,
    borderColor: colors.washiWarm,
    borderRadius: radius.lg,
  },
  searchHint: { flex: 1, fontSize: 17, color: colors.sumiLight },
  stage: { flex: 1, overflow: "hidden" },
  canvas: { flex: 1 },
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
  round: {
    position: "absolute",
    width: 48,
    height: 48,
    borderRadius: 24,
    alignItems: "center",
    justifyContent: "center",
    shadowColor: colors.sumiDeep,
    shadowOpacity: 0.16,
    shadowRadius: 10,
    shadowOffset: { width: 0, height: 4 },
    elevation: 4,
  },
  roundPressed: { transform: [{ scale: 0.94 }] },
  tools: {
    right: space.lg,
    backgroundColor: colors.white,
    borderWidth: 1,
    borderColor: colors.washiWarm,
  },
  toolsOn: { backgroundColor: colors.kitsune, borderColor: colors.kitsune },
});

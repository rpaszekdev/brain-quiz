import { Pressable, StyleSheet, Text, View } from "react-native";
import Animated, { SlideInDown, SlideOutDown } from "react-native-reanimated";
import { tick } from "../haptics";
import { colors, motion, radius, space } from "../theme";
import { SLICE_PLANES, type Slice, type SlicePlane } from "../viewer/clip";
import { Slider } from "../ui/Slider";
import { BARE_OPACITY, SOLID_OPACITY } from "./view";

const SPAN = SOLID_OPACITY - BARE_OPACITY;

/** Slider travel (0 left, 1 right) ↔ cortex opacity (bare left, solid right). */
const toOpacity = (t: number) => BARE_OPACITY + t * SPAN;
const fromOpacity = (o: number) => (o - BARE_OPACITY) / SPAN;
/** Slider travel ↔ slice position (-1 fully cut, 1 whole). */
const toSlice = (t: number) => t * 2 - 1;
const fromSlice = (p: number) => (p + 1) / 2;

interface ToolsPanelProps {
  opacity: number;
  slice: Slice;
  onOpacity: (opacity: number) => void;
  onSlice: (slice: Slice) => void;
  /** Reports how much of the stage the panel covers, so the brain can move up. */
  onHeight: (height: number) => void;
}

/**
 * Cut the brain open and fade what is left, the way an atlas does it: one
 * plane to cut along, one handle for how deep, one for how solid.
 */
export function ToolsPanel({ opacity, slice, onOpacity, onSlice, onHeight }: ToolsPanelProps) {
  const setPlane = (plane: SlicePlane) => {
    tick();
    // Picking a plane with nothing cut yet opens the cut halfway, otherwise
    // tapping it looks like it did nothing.
    onSlice({ plane, position: slice.position >= 1 ? 0 : slice.position });
  };

  return (
    <Animated.View
      entering={SlideInDown.duration(motion.base)}
      exiting={SlideOutDown.duration(motion.fast)}
      style={styles.panel}
      onLayout={(event) => onHeight(Math.round(event.nativeEvent.layout.height))}
    >
      <View style={styles.row}>
        <Text style={styles.icon}>◈</Text>
        <Slider
          value={fromSlice(slice.position)}
          onChange={(t) => onSlice({ ...slice, position: toSlice(t) })}
          accessibilityLabel="Slice depth"
        />
      </View>
      <View style={styles.row}>
        <Text style={styles.icon}>◐</Text>
        <Slider
          value={fromOpacity(opacity)}
          onChange={(t) => onOpacity(toOpacity(t))}
          accessibilityLabel="Cortex opacity"
        />
      </View>
      <View style={styles.planes}>
        {SLICE_PLANES.map((plane) => {
          const active = slice.plane === plane.id && slice.position < 1;
          return (
            <Pressable
              key={plane.id}
              onPress={() => setPlane(plane.id)}
              accessibilityRole="button"
              accessibilityState={{ selected: active }}
              style={({ pressed }) => [styles.plane, active && styles.planeOn, pressed && styles.pressed]}
            >
              <Text style={[styles.planeText, active && styles.planeTextOn]}>{plane.label}</Text>
            </Pressable>
          );
        })}
        <Pressable
          onPress={() => {
            tick();
            onSlice({ ...slice, position: 1 });
            onOpacity(SOLID_OPACITY);
          }}
          accessibilityRole="button"
          accessibilityLabel="Whole brain"
          style={({ pressed }) => [styles.plane, pressed && styles.pressed]}
        >
          <Text style={styles.planeText}>Whole</Text>
        </Pressable>
      </View>
    </Animated.View>
  );
}

const styles = StyleSheet.create({
  panel: {
    position: "absolute",
    left: 0,
    right: 0,
    bottom: 0,
    paddingHorizontal: space.lg,
    paddingTop: space.md,
    paddingBottom: space.lg,
    gap: space.xs,
    backgroundColor: colors.white,
    borderTopLeftRadius: radius.lg,
    borderTopRightRadius: radius.lg,
    borderTopWidth: 1,
    borderTopColor: colors.washiWarm,
    shadowColor: colors.sumiDeep,
    shadowOpacity: 0.08,
    shadowRadius: 16,
    shadowOffset: { width: 0, height: -6 },
    elevation: 8,
  },
  row: { flexDirection: "row", alignItems: "center", gap: space.md },
  icon: { width: 20, textAlign: "center", fontSize: 15, color: colors.sumiLight },
  planes: { flexDirection: "row", gap: space.sm, marginTop: space.sm },
  plane: {
    flex: 1,
    paddingVertical: space.sm,
    borderRadius: radius.pill,
    borderWidth: 1,
    borderColor: colors.washiWarm,
    alignItems: "center",
  },
  planeOn: { backgroundColor: colors.sumiDeep, borderColor: colors.sumiDeep },
  pressed: { opacity: 0.6 },
  planeText: { fontSize: 13, color: colors.sumiMedium },
  planeTextOn: { color: colors.white, fontWeight: "600" },
});

import type { ReactNode } from "react";
import { useEffect, useRef } from "react";
import {
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  View,
  type GestureResponderEvent,
} from "react-native";
import Animated, { useAnimatedStyle, useSharedValue, withSpring } from "react-native-reanimated";
import { tick } from "../haptics";
import type { SheetGeometry } from "./sheet-geometry";
import { colors, radius, serif, space } from "../theme";

/** Finger travel on the handle that closes/collapses (down) or expands (up). */
const SWIPE_CLOSE = 60;
const SWIPE_EXPAND = 40;
const SPRING = { damping: 22, stiffness: 220, mass: 0.8 } as const;

/** Page-space Y of a touch; react-native-web hands over the raw DOM TouchEvent. */
function touchY(event: GestureResponderEvent): number {
  const native = event.nativeEvent;
  if (typeof native.pageY === "number") return native.pageY;
  return (native as unknown as TouchEvent).changedTouches[0]?.pageY ?? 0;
}

export interface PeekSheetProps {
  open: boolean;
  expanded: boolean;
  geometry: SheetGeometry;
  title: string;
  subtitle: string;
  onToggle: () => void;
  onExpand: () => void;
  onCollapse: () => void;
  onClose: () => void;
  /** Buttons row under the title; stays visible while peeking. */
  actions: ReactNode;
  children: ReactNode;
}

/**
 * Bottom sheet laid over the stage (the canvas underneath keeps its size and
 * frames the brain into the band above the sheet). Springs between closed,
 * peek and full; the handle follows the finger and snaps on release.
 *
 * Touch events, not PanResponder: they fire regardless of who owns the
 * responder and behave the same on iOS, Android and the web test surface.
 * ponytail: JS-thread drag; gesture-handler on the UI thread if it stutters.
 */
export function PeekSheet({
  open,
  expanded,
  geometry,
  title,
  subtitle,
  onToggle,
  onExpand,
  onCollapse,
  onClose,
  actions,
  children,
}: PeekSheetProps) {
  const { fullHeight, peekHeight } = geometry;
  const offscreen = fullHeight + 2;
  const restY = !open ? offscreen : expanded ? 0 : fullHeight - peekHeight;
  const y = useSharedValue(restY);
  const drag = useRef<{ startY: number; startValue: number } | null>(null);

  useEffect(() => {
    y.value = withSpring(restY, SPRING);
  }, [restY, y]);

  const onDragStart = (event: GestureResponderEvent) => {
    drag.current = { startY: touchY(event), startValue: restY };
  };
  const onDragMove = (event: GestureResponderEvent) => {
    if (!drag.current) return;
    const dy = touchY(event) - drag.current.startY;
    y.value = Math.min(offscreen, Math.max(0, drag.current.startValue + dy));
  };
  const onDragEnd = (event: GestureResponderEvent) => {
    const start = drag.current;
    drag.current = null;
    if (!start) return;
    const dy = touchY(event) - start.startY;
    if (dy > SWIPE_CLOSE) {
      tick();
      if (expanded) onCollapse();
      else onClose();
      return;
    }
    if (dy < -SWIPE_EXPAND && !expanded) {
      tick();
      onExpand();
      return;
    }
    y.value = withSpring(restY, SPRING);
  };

  const slide = useAnimatedStyle(() => ({ transform: [{ translateY: y.value }] }));

  return (
    <Animated.View
      style={[styles.sheet, { height: fullHeight, pointerEvents: open ? "auto" : "none" }, slide]}
    >
      <Pressable
        onPress={onToggle}
        onTouchStart={onDragStart}
        onTouchMove={onDragMove}
        onTouchEnd={onDragEnd}
        accessibilityRole="button"
        accessibilityLabel={expanded ? "Collapse details" : "Expand details"}
        style={styles.handle}
      >
        <View style={styles.grabber} />
      </Pressable>
      <View style={styles.head}>
        <Text style={styles.title} numberOfLines={expanded ? undefined : 1}>
          {title}
        </Text>
        <Text style={styles.meta}>{subtitle}</Text>
      </View>
      <View style={styles.actions}>{actions}</View>
      <ScrollView
        scrollEnabled={expanded}
        showsVerticalScrollIndicator={expanded}
        style={styles.body}
        contentContainerStyle={styles.bodyContent}
      >
        {children}
      </ScrollView>
    </Animated.View>
  );
}

const styles = StyleSheet.create({
  sheet: {
    position: "absolute",
    left: 0,
    right: 0,
    bottom: 0,
    paddingHorizontal: space.lg,
    gap: space.sm,
    backgroundColor: colors.white,
    borderTopLeftRadius: radius.lg,
    borderTopRightRadius: radius.lg,
    borderWidth: 1,
    borderColor: colors.washiWarm,
    shadowColor: colors.sumiDeep,
    shadowOpacity: 0.12,
    shadowRadius: 12,
    shadowOffset: { width: 0, height: -4 },
    elevation: 8,
  },
  handle: { paddingTop: space.sm, paddingBottom: space.sm, alignItems: "center" },
  grabber: { width: 36, height: 4, borderRadius: 2, backgroundColor: colors.washiWarm },
  head: { flexDirection: "row", justifyContent: "space-between", alignItems: "baseline", gap: space.md },
  title: { fontFamily: serif, fontSize: 22, color: colors.sumiDeep, flexShrink: 1 },
  meta: { fontSize: 12, fontWeight: "600", color: colors.kitsune, textTransform: "capitalize" },
  actions: { flexDirection: "row", gap: space.sm, flexWrap: "wrap" },
  body: { flex: 1 },
  bodyContent: { gap: space.xs, paddingBottom: space.lg },
});

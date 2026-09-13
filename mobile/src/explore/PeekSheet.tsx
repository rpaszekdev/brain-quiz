import type { ReactNode } from "react";
import { useRef } from "react";
import {
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  View,
  type GestureResponderEvent,
} from "react-native";
import { colors, radius, serif, space } from "../theme";

/** Finger travel on the handle that closes (down) or expands (up) the sheet. */
const SWIPE_CLOSE = 60;
const SWIPE_EXPAND = 40;

/** Page-space Y of a touch; react-native-web hands over the raw DOM TouchEvent. */
function touchY(event: GestureResponderEvent): number {
  const native = event.nativeEvent;
  if (typeof native.pageY === "number") return native.pageY;
  return (native as unknown as TouchEvent).changedTouches[0]?.pageY ?? 0;
}

export interface PeekSheetProps {
  title: string;
  subtitle: string;
  expanded: boolean;
  onToggle: () => void;
  onExpand: () => void;
  onClose: () => void;
  /** Buttons row under the body. */
  actions: ReactNode;
  children: ReactNode;
}

/**
 * Bottom sheet that sits in the layout flow (the canvas above shrinks, so the
 * brain never hides under it). Peek shows a few lines; the handle expands.
 *
 * Touch events, not PanResponder: they fire regardless of who owns the
 * responder and behave the same on iOS, Android and the web test surface.
 */
export function PeekSheet({ title, subtitle, expanded, onToggle, onExpand, onClose, actions, children }: PeekSheetProps) {
  const swipeStart = useRef<number | null>(null);
  const onSwipeStart = (event: GestureResponderEvent) => {
    swipeStart.current = touchY(event);
  };
  const onSwipeEnd = (event: GestureResponderEvent) => {
    if (swipeStart.current === null) return;
    const dy = touchY(event) - swipeStart.current;
    swipeStart.current = null;
    if (dy > SWIPE_CLOSE) onClose();
    else if (dy < -SWIPE_EXPAND) onExpand();
  };

  return (
    <View style={[styles.sheet, expanded && styles.sheetExpanded]}>
      <Pressable
        onPress={onToggle}
        onTouchStart={onSwipeStart}
        onTouchEnd={onSwipeEnd}
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
      <ScrollView
        scrollEnabled={expanded}
        showsVerticalScrollIndicator={expanded}
        style={expanded ? styles.bodyExpanded : styles.bodyPeek}
        contentContainerStyle={styles.bodyContent}
      >
        {children}
      </ScrollView>
      <View style={styles.actions}>{actions}</View>
    </View>
  );
}

const styles = StyleSheet.create({
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
  grabber: { width: 36, height: 4, borderRadius: 2, backgroundColor: colors.washiWarm },
  head: { flexDirection: "row", justifyContent: "space-between", alignItems: "baseline", gap: space.md },
  title: { fontFamily: serif, fontSize: 22, color: colors.sumiDeep, flexShrink: 1 },
  meta: { fontSize: 12, fontWeight: "600", color: colors.kitsune, textTransform: "capitalize" },
  bodyPeek: { flexGrow: 0, flexShrink: 1 },
  bodyExpanded: { flexGrow: 1, flexShrink: 1 },
  bodyContent: { gap: space.xs },
  actions: { flexDirection: "row", gap: space.sm, marginTop: space.sm, flexWrap: "wrap" },
});

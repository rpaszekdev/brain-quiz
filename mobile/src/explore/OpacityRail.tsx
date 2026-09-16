import { useRef, useState } from "react";
import { StyleSheet, View, type GestureResponderEvent } from "react-native";
import { tick } from "../haptics";
import { colors } from "../theme";
import { localPoint } from "../ui/touch";
import { BARE_OPACITY, OPACITY_DETENTS, SOLID_OPACITY } from "./view";

export const RAIL_HEIGHT = 176;
/** Wide enough for a thumb; the drawn rail is a hairline inside it. */
const TOUCH_WIDTH = 44;
const DOT = 14;
const LINE_X = 14;
const SPAN = SOLID_OPACITY - BARE_OPACITY;

/** Top of the rail is a whole cortex, the bottom is none of it. */
function opacityAt(y: number, height: number): number {
  const t = Math.min(1, Math.max(0, y / height));
  return SOLID_OPACITY - t * SPAN;
}

function offsetFor(opacity: number, height: number): number {
  return ((SOLID_OPACITY - opacity) / SPAN) * height;
}

/** Which detent an opacity is nearest, so the finger can be told when it passes one. */
function nearestDetent(opacity: number): number {
  let best = 0;
  for (let i = 1; i < OPACITY_DETENTS.length; i++) {
    if (Math.abs(OPACITY_DETENTS[i] - opacity) < Math.abs(OPACITY_DETENTS[best] - opacity)) best = i;
  }
  return best;
}

interface OpacityRailProps {
  value: number;
  onChange: (opacity: number) => void;
}

/**
 * Peels the cortex away so the deep structures underneath come into view.
 * A hairline and a dot: the brain is the picture, this is only a handle.
 *
 * Touch events rather than PanResponder — they fire whoever owns the
 * responder, and the 3D canvas next door is greedy about it.
 */
export function OpacityRail({ value, onChange }: OpacityRailProps) {
  const [height, setHeight] = useState(RAIL_HEIGHT);
  const lastDetent = useRef(nearestDetent(value));

  const moveTo = (event: GestureResponderEvent) => {
    const next = opacityAt(localPoint(event).y, height);
    const detent = nearestDetent(next);
    if (detent !== lastDetent.current) {
      lastDetent.current = detent;
      tick();
    }
    onChange(next);
  };

  return (
    <View
      style={styles.touch}
      onLayout={(event) => setHeight(event.nativeEvent.layout.height)}
      onTouchStart={moveTo}
      onTouchMove={moveTo}
      accessibilityRole="adjustable"
      accessibilityLabel="Cortex opacity"
      accessibilityValue={{ min: 0, max: 100, now: Math.round(value * 100) }}
    >
      <View style={styles.line} pointerEvents="none" />
      {OPACITY_DETENTS.map((detent) => (
        <View
          key={detent}
          style={[styles.notch, { top: offsetFor(detent, height) - 0.5 }]}
          pointerEvents="none"
        />
      ))}
      <View style={[styles.dot, { top: offsetFor(value, height) - DOT / 2 }]} pointerEvents="none" />
    </View>
  );
}

const styles = StyleSheet.create({
  touch: { height: RAIL_HEIGHT, width: TOUCH_WIDTH },
  line: { position: "absolute", left: LINE_X, top: 0, bottom: 0, width: 1, backgroundColor: colors.washiWarm },
  notch: { position: "absolute", left: LINE_X, width: 7, height: 1, backgroundColor: colors.washiWarm },
  dot: {
    position: "absolute",
    left: LINE_X - DOT / 2 + 0.5,
    width: DOT,
    height: DOT,
    borderRadius: DOT / 2,
    backgroundColor: colors.washiWhite,
    borderWidth: 1.5,
    borderColor: colors.kitsune,
  },
});

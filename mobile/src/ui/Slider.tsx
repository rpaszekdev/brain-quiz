import { useRef, useState } from "react";
import { StyleSheet, View, type GestureResponderEvent } from "react-native";
import { tick } from "../haptics";
import { colors } from "../theme";
import { localPoint } from "./touch";

const TRACK = 3;
const KNOB = 18;
const HEIGHT = 40;
/** Ticks per sweep, so a drag feels like it has notches without snapping. */
const DETENTS = 10;

interface SliderProps {
  /** 0 … 1 along the track. */
  value: number;
  onChange: (value: number) => void;
  accessibilityLabel: string;
}

/**
 * A plain horizontal slider. Touch events rather than PanResponder: the 3D
 * canvas next door claims the responder, and these fire anyway.
 */
export function Slider({ value, onChange, accessibilityLabel }: SliderProps) {
  const [width, setWidth] = useState(1);
  const lastDetent = useRef(Math.round(value * DETENTS));

  const moveTo = (event: GestureResponderEvent) => {
    const next = Math.min(1, Math.max(0, localPoint(event).x / width));
    const detent = Math.round(next * DETENTS);
    if (detent !== lastDetent.current) {
      lastDetent.current = detent;
      tick();
    }
    onChange(next);
  };

  return (
    <View
      style={styles.touch}
      onLayout={(event) => setWidth(Math.max(1, event.nativeEvent.layout.width))}
      onTouchStart={moveTo}
      onTouchMove={moveTo}
      accessibilityRole="adjustable"
      accessibilityLabel={accessibilityLabel}
      accessibilityValue={{ min: 0, max: 100, now: Math.round(value * 100) }}
    >
      <View style={styles.track} pointerEvents="none" />
      <View style={[styles.fill, { width: value * width }]} pointerEvents="none" />
      <View style={[styles.knob, { left: value * width - KNOB / 2 }]} pointerEvents="none" />
    </View>
  );
}

const styles = StyleSheet.create({
  touch: { flex: 1, height: HEIGHT, justifyContent: "center" },
  track: {
    position: "absolute",
    left: 0,
    right: 0,
    height: TRACK,
    borderRadius: TRACK / 2,
    backgroundColor: colors.washiWarm,
  },
  fill: { position: "absolute", left: 0, height: TRACK, borderRadius: TRACK / 2, backgroundColor: colors.kitsune },
  knob: {
    position: "absolute",
    width: KNOB,
    height: KNOB,
    borderRadius: KNOB / 2,
    backgroundColor: colors.washiWhite,
    borderWidth: 1.5,
    borderColor: colors.kitsune,
  },
});

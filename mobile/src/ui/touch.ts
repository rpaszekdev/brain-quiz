import type { GestureResponderEvent } from "react-native";

/**
 * Where a touch landed inside the element that handled it.
 *
 * react-native-web forwards the raw DOM TouchEvent, which carries no
 * locationX/Y, so fall back to the element's own box there.
 */
export function localPoint(event: GestureResponderEvent): { x: number; y: number } {
  const native = event.nativeEvent;
  if (typeof native.locationY === "number") return { x: native.locationX, y: native.locationY };
  const touch = (native as unknown as TouchEvent).changedTouches?.[0];
  const target = event.currentTarget as unknown as HTMLElement | undefined;
  if (!touch || !target?.getBoundingClientRect) return { x: 0, y: 0 };
  const rect = target.getBoundingClientRect();
  return { x: touch.clientX - rect.left, y: touch.clientY - rect.top };
}

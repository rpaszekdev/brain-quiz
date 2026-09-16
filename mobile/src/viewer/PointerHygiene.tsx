import { useEffect } from "react";
import { Platform } from "react-native";
import { useThree } from "@react-three/fiber/native";

interface PointerLike {
  readonly pointerId: number;
}
interface EventTargetLike {
  addEventListener(type: string, listener: (event: PointerLike) => void): void;
  removeEventListener(type: string, listener: (event: PointerLike) => void): void;
  dispatchEvent(event: object): void;
}

/**
 * Keeps the orbit controls' idea of "fingers down" honest on the phone.
 *
 * R3F's native bridge sends pointerup only when a touch ends normally. When
 * iOS cancels the gesture (a system swipe, a banner, another view taking the
 * touch) it sends lostpointercapture, which the controls ignore, so that
 * finger stays registered: the next one-finger drag counts as two fingers and
 * pinches instead of rotating. Every lost or finished gesture here cancels
 * whatever pointers the controls still hold.
 */
export function PointerHygiene() {
  const element = useThree((state) => state.gl.domElement) as unknown as EventTargetLike;
  useEffect(() => {
    // The browser fires pointercancel itself.
    if (Platform.OS === "web") return;
    const down = new Set<number>();
    const add = (event: PointerLike) => down.add(event.pointerId);
    const remove = (event: PointerLike) => down.delete(event.pointerId);
    const cancelAll = () => {
      for (const pointerId of [...down]) {
        element.dispatchEvent({ type: "pointercancel", pointerId, pointerType: "touch", offsetX: 0, offsetY: 0 });
      }
      down.clear();
    };
    element.addEventListener("pointerdown", add);
    element.addEventListener("pointerup", remove);
    element.addEventListener("pointercancel", remove);
    element.addEventListener("lostpointercapture", cancelAll);
    element.addEventListener("pointerleave", cancelAll);
    return () => {
      element.removeEventListener("pointerdown", add);
      element.removeEventListener("pointerup", remove);
      element.removeEventListener("pointercancel", remove);
      element.removeEventListener("lostpointercapture", cancelAll);
      element.removeEventListener("pointerleave", cancelAll);
    };
  }, [element]);
  return null;
}

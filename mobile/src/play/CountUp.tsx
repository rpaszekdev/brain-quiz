import { useEffect, useState } from "react";
import { Text, type StyleProp, type TextStyle } from "react-native";

const DURATION_MS = 800;

/** Ease-out cubic: fast start, gentle landing. */
function ease(t: number): number {
  return 1 - Math.pow(1 - t, 3);
}

interface CountUpProps {
  to: number;
  format: (value: number) => string;
  delay?: number;
  style?: StyleProp<TextStyle>;
}

/** A number that rolls from 0 to its value. ponytail: rAF, no animation lib. */
export function CountUp({ to, format, delay = 0, style }: CountUpProps) {
  const [value, setValue] = useState(0);
  useEffect(() => {
    let frame = 0;
    const start = performance.now() + delay;
    const step = (now: number) => {
      const t = Math.min(1, Math.max(0, (now - start) / DURATION_MS));
      setValue(to * ease(t));
      if (t < 1) frame = requestAnimationFrame(step);
    };
    frame = requestAnimationFrame(step);
    return () => cancelAnimationFrame(frame);
  }, [to, delay]);
  return <Text style={style}>{format(value)}</Text>;
}

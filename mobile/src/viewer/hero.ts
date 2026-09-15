/**
 * Share of the window the brain gets as a "hero": the lesson canvas, and the
 * band Explore frames the brain into while a sheet is up. One number so a
 * region looks the same in both places.
 */
export const HERO_RATIO = 0.4;

export function heroHeight(windowHeight: number): number {
  return Math.round(windowHeight * HERO_RATIO);
}

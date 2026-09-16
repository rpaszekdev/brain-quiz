/**
 * Share of the window the brain gets as a "hero": the lesson canvas, and the
 * band Explore frames the brain into while a sheet is up. One number so a
 * region looks the same in both places.
 */
export const HERO_RATIO = 0.4;

export function heroHeight(windowHeight: number): number {
  return Math.round(windowHeight * HERO_RATIO);
}

/**
 * Room the answer half of a lesson needs: prompt, four options, the button
 * and the header above them. Whatever is left over goes to the brain, so all
 * four answers are on screen on a small phone without scrolling.
 */
const LESSON_CONTENT = 450;
const LESSON_MIN_HERO = 170;

export function lessonHeroHeight(windowHeight: number): number {
  return Math.round(Math.max(LESSON_MIN_HERO, Math.min(heroHeight(windowHeight), windowHeight - LESSON_CONTENT)));
}

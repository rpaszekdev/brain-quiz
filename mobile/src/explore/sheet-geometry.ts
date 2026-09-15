/** Share of the stage the sheet covers when expanded. */
export const SHEET_FULL_RATIO = 0.75;
const MIN_PEEK = 160;

export interface SheetGeometry {
  readonly fullHeight: number;
  readonly peekHeight: number;
  /** Stage y of the sheet's top edge when peeking: the hero band ends here. */
  readonly peekTop: number;
  readonly fullTop: number;
}

/** The sheet's two resting heights for a stage, leaving the hero band above. */
export function sheetGeometry(stageHeight: number, heroHeight: number): SheetGeometry {
  const fullHeight = Math.round(stageHeight * SHEET_FULL_RATIO);
  const peekHeight = Math.min(Math.max(stageHeight - heroHeight, MIN_PEEK), fullHeight);
  return { fullHeight, peekHeight, peekTop: stageHeight - peekHeight, fullTop: stageHeight - fullHeight };
}

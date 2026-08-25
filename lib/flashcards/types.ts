/** Card shape ported from md-reader/flashcards.html. */
export interface Flashcard {
  /** Front of the card — one question. */
  q: string;
  /** Back of the card. */
  a: string;
  /** Deck this card belongs to (region category, or "clinical"). */
  module: string;
  /** Optional memory hook, shown under the answer. */
  m?: string;
}

export type CardStatus = "new" | "learning" | "known";

export type Rating = "again" | "hard" | "good" | "easy";

export interface CardProgress {
  score: number;
  reviews: number;
}

export type ProgressMap = Readonly<Record<string, CardProgress>>;

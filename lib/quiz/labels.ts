/**
 * Label formatting for quiz question text.
 *
 * Generators used to hand-roll `${field} (${otherField})` templates. When a
 * data record's name already carried the qualifier the template was about to
 * add, the result doubled words and nested parentheses — e.g. "Pedunculopontine
 * Cholinergic System (Ch5/Ch6) (Acetylcholine (ACh)) system?".
 *
 * These helpers only de-duplicate one data field against another. When the
 * collision is between a data field and a fixed word in the template (a
 * trailing " system?", " regions?"), delete the literal instead — a helper
 * should not paper over a redundant word the sentence itself supplies.
 */

/** "Cortex (BA 9)" -> "cortex ba 9" */
function normalize(text: string): string {
  return text
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, " ")
    .trim();
}

/** Whole-phrase containment, so "Layer" does not match inside "Multilayer". */
export function hasQualifier(base: string, qualifier: string): boolean {
  const haystack = ` ${normalize(base)} `;
  const needle = ` ${normalize(qualifier)} `;
  return needle.trim().length > 0 && haystack.includes(needle);
}

/**
 * Append a qualifier only when it adds something, and never nest parentheses.
 * Falls back to an em dash when either side already carries parens.
 */
export function withQualifier(
  base: string,
  qualifier: string | number | null | undefined,
): string {
  if (qualifier === null || qualifier === undefined) return base;

  const text = String(qualifier).trim();
  if (text.length === 0) return base;
  if (hasQualifier(base, text)) return base;

  const wouldNest = text.includes("(") || /\)\s*$/.test(base.trim());
  return wouldNest ? `${base} — ${text}` : `${base} (${text})`;
}

/** Drop a trailing noun the surrounding sentence already provides. */
export function withoutTrailingWord(base: string, word: string): string {
  const pattern = new RegExp(`\\s*\\b${word}\\s*$`, "i");
  const stripped = base.replace(pattern, "").trim();
  return stripped.length > 0 ? stripped : base;
}

// ─── Domain builders ────────────────────────────────────────────────
// One per site that had a collision, so generators and the validator agree
// on exactly one rendering.

export function neurotransmitterLabel(system: {
  name: string;
  molecule: string;
}): string {
  return withQualifier(system.name, system.molecule);
}

export function brodmannLabel(area: {
  number: number | string;
  name: string;
}): string {
  // Names such as "Dorsolateral Prefrontal Cortex (BA 9)" already state the
  // number the template is about to prepend.
  const stripped = area.name.replace(/\s*\(BA\s*\d+\)\s*$/i, "").trim();
  return withQualifier(`Brodmann Area ${area.number}`, stripped);
}

export function corticalLayerLabel(layer: {
  romanNumeral: string;
  name: string;
}): string {
  return withQualifier(
    `Layer ${layer.romanNumeral}`,
    withoutTrailingWord(layer.name, "Layer"),
  );
}

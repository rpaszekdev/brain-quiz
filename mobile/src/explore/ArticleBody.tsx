import { StyleSheet, Text, View } from "react-native";
import { colors, serif, space } from "../theme";
import type { Article } from "./content";

/**
 * The whole write-up, laid out for reading inside the sheet: overview, then
 * one titled list per section, then the exam tip. Drag the sheet up and this
 * is what appears under the brain — no separate page to go to.
 */
export function ArticleBody({ article }: { article: Article }) {
  return (
    <>
      <Text style={styles.overview}>{article.overview}</Text>
      {article.sections.map((section) => (
        <View key={section.title} style={styles.section}>
          <Text style={styles.sectionTitle}>{section.title}</Text>
          {section.items.map((item) => (
            <View key={item} style={styles.item}>
              <Text style={styles.marker}>—</Text>
              <Text style={styles.itemText}>{item}</Text>
            </View>
          ))}
        </View>
      ))}
      {article.quote && (
        <View style={styles.quote}>
          <Text style={styles.quoteText}>{article.quote}</Text>
        </View>
      )}
    </>
  );
}

const styles = StyleSheet.create({
  overview: { fontSize: 15, lineHeight: 23, color: colors.sumiMedium },
  section: { marginTop: space.lg, gap: space.xs },
  sectionTitle: {
    fontSize: 11,
    fontWeight: "700",
    letterSpacing: 1,
    textTransform: "uppercase",
    color: colors.sumiLight,
    marginBottom: space.xs,
  },
  item: { flexDirection: "row", gap: space.sm },
  marker: { fontSize: 14, lineHeight: 21, color: colors.washiWarm },
  itemText: { flex: 1, fontSize: 14, lineHeight: 21, color: colors.sumiMedium },
  quote: {
    marginTop: space.lg,
    paddingLeft: space.md,
    borderLeftWidth: 2,
    borderLeftColor: colors.kitsune,
  },
  quoteText: { fontFamily: serif, fontSize: 15, lineHeight: 23, color: colors.sumiDeep, fontStyle: "italic" },
});

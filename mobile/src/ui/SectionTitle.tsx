import { StyleSheet, Text, View } from "react-native";
import { colors, space } from "../theme";

/** "── Anatomy ───────" rule-with-label, as on the Home sketch. */
export function SectionTitle({ label }: { label: string }) {
  return (
    <View style={styles.row}>
      <Text style={styles.label}>{label}</Text>
      <View style={styles.rule} />
    </View>
  );
}

const styles = StyleSheet.create({
  row: { flexDirection: "row", alignItems: "center", gap: space.md, marginTop: space.xl, marginBottom: space.md },
  label: { fontSize: 12, fontWeight: "700", letterSpacing: 1, textTransform: "uppercase", color: colors.sumiLight },
  rule: { flex: 1, height: 1, backgroundColor: colors.washiWarm },
});

import { useMemo, useState } from "react";
import { Pressable, ScrollView, StyleSheet, Text, TextInput, View } from "react-native";
import { useLocalSearchParams, useRouter } from "expo-router";
import { SafeAreaView } from "react-native-safe-area-context";
import { Ionicons } from "@expo/vector-icons";
import { regionLabel } from "@/lib/brain-regions";
import type { LobeId } from "@/lib/lobes";
import { returnToExplore } from "../src/explore/navigate";
import { loadRecent, pushRecent } from "../src/explore/recent";
import { BROWSE_CATEGORIES, browseRows, isBrowseCategory, searchAll, type Hit } from "../src/explore/search";
import { explore } from "../src/explore/store";
import { ALL_VIEW } from "../src/explore/view";
import { colors, radius, serif, space } from "../src/theme";
import { SectionTitle } from "../src/ui/SectionTitle";

const KIND_ICON: Readonly<Record<Hit["kind"], string>> = { region: "▓", lobe: "◐", tract: "━", network: "●" };

function Row({ hit, onPress }: { hit: Hit; onPress: () => void }) {
  return (
    <Pressable onPress={onPress} style={styles.row} accessibilityRole="button">
      <Text style={styles.rowIcon}>{KIND_ICON[hit.kind]}</Text>
      <View style={styles.rowText}>
        <Text style={styles.rowLabel}>{hit.label}</Text>
        <Text style={styles.rowDetail} numberOfLines={1}>
          {hit.detail}
        </Text>
      </View>
      <Text style={styles.rowChevron}>›</Text>
    </Pressable>
  );
}

/**
 * The search hub: type to search everything, or browse by category. Picking
 * anything sets Explore's view and returns to the brain. `?category=` shows
 * one category's list; `?region=` narrows pathways to one region.
 */
export default function Find() {
  const router = useRouter();
  const { category, region } = useLocalSearchParams<{ category?: string; region?: string }>();
  const browsing = isBrowseCategory(category) ? category : null;
  const [query, setQuery] = useState("");
  const [recent, setRecent] = useState<Hit[]>(() => loadRecent());
  const results = useMemo(() => searchAll(query), [query]);
  const rows = useMemo(() => (browsing ? browseRows(browsing, region) : []), [browsing, region]);

  const pick = (hit: Hit) => {
    setRecent(pushRecent(hit));
    switch (hit.kind) {
      case "region":
        explore.setView(browsing === "deep" ? { kind: "deep", peel: "peeled" } : ALL_VIEW, hit.id);
        break;
      case "lobe":
        explore.setView({ kind: "lobe", lobeId: hit.id as LobeId });
        break;
      case "tract":
        explore.setView({ kind: "tract", tractId: hit.id });
        break;
      case "network":
        explore.setView({ kind: "network", networkId: hit.id });
        break;
    }
    returnToExplore(router);
  };

  const browseTitle = browsing
    ? [BROWSE_CATEGORIES.find((c) => c.id === browsing)?.label, region ? regionLabel(region) : null]
        .filter(Boolean)
        .join(" · ")
    : null;
  const searching = query.trim().length > 0;
  const groups: readonly [string, readonly Hit[]][] = [
    ["Regions", results.regions],
    ["Lobes", results.lobes],
    ["Pathways", results.tracts],
    ["Networks", results.networks],
  ];

  return (
    <SafeAreaView style={styles.screen} edges={["top"]}>
      <View style={styles.bar}>
        <Pressable onPress={() => router.back()} accessibilityRole="button" accessibilityLabel="Back" style={styles.back}>
          <Ionicons name="chevron-back" size={26} color={colors.sumiDeep} />
        </Pressable>
        {browseTitle ? (
          <Text style={styles.barTitle}>{browseTitle}</Text>
        ) : (
          <TextInput
            autoFocus
            value={query}
            onChangeText={setQuery}
            placeholder="Search regions, lobes, pathways, networks"
            placeholderTextColor={colors.sumiLight}
            autoCorrect={false}
            autoCapitalize="none"
            clearButtonMode="while-editing"
            returnKeyType="search"
            style={styles.input}
          />
        )}
      </View>
      <ScrollView keyboardShouldPersistTaps="handled" contentContainerStyle={styles.content}>
        {browsing ? (
          rows.length === 0 ? (
            <Text style={styles.empty}>Nothing recorded here yet.</Text>
          ) : (
            rows.map((group, i) => (
              <View key={group.title ?? i} style={styles.group}>
                {group.title && <SectionTitle label={group.title} />}
                {group.hits.map((hit) => (
                  <Row key={hit.id} hit={hit} onPress={() => pick(hit)} />
                ))}
              </View>
            ))
          )
        ) : searching ? (
          results.total === 0 ? (
            <Text style={styles.empty}>Nothing found for “{query.trim()}”.</Text>
          ) : (
            groups
              .filter(([, hits]) => hits.length > 0)
              .map(([title, hits]) => (
                <View key={title} style={styles.group}>
                  <SectionTitle label={title} />
                  {hits.map((hit) => (
                    <Row key={hit.id} hit={hit} onPress={() => pick(hit)} />
                  ))}
                </View>
              ))
          )
        ) : (
          <>
            <SectionTitle label="Browse" />
            <View style={styles.tiles}>
              {BROWSE_CATEGORIES.map((c) => (
                <Pressable
                  key={c.id}
                  style={styles.tile}
                  onPress={() => router.push(`/find?category=${c.id}`)}
                  accessibilityRole="button"
                >
                  <Text style={styles.tileIcon}>{c.icon}</Text>
                  <Text style={styles.tileLabel}>{c.label}</Text>
                  <Text style={styles.tileCount}>{c.count}</Text>
                </Pressable>
              ))}
            </View>
            {recent.length > 0 && (
              <View style={styles.group}>
                <SectionTitle label="Recent" />
                {recent.map((hit) => (
                  <Row key={`${hit.kind}-${hit.id}`} hit={hit} onPress={() => pick(hit)} />
                ))}
              </View>
            )}
          </>
        )}
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  screen: { flex: 1, backgroundColor: colors.washiWhite },
  bar: { flexDirection: "row", alignItems: "center", gap: space.sm, paddingHorizontal: space.md, paddingVertical: space.sm },
  back: { padding: space.xs },
  barTitle: { fontFamily: serif, fontSize: 22, color: colors.sumiDeep, flexShrink: 1 },
  input: {
    flex: 1,
    backgroundColor: colors.white,
    borderWidth: 1,
    borderColor: colors.washiWarm,
    borderRadius: radius.md,
    paddingHorizontal: space.md,
    paddingVertical: space.sm,
    fontSize: 16,
    color: colors.sumiDeep,
  },
  content: { padding: space.lg, gap: space.lg, paddingBottom: space.xxl },
  group: { gap: space.sm },
  tiles: { flexDirection: "row", flexWrap: "wrap", gap: space.md },
  tile: {
    width: "47%",
    flexGrow: 1,
    padding: space.lg,
    borderRadius: radius.md,
    borderWidth: 1,
    borderColor: colors.washiWarm,
    backgroundColor: colors.white,
    gap: space.xs,
  },
  tileIcon: { fontSize: 20, color: colors.kitsune },
  tileLabel: { fontFamily: serif, fontSize: 17, color: colors.sumiDeep },
  tileCount: { fontSize: 12, fontWeight: "600", color: colors.sumiLight },
  row: {
    flexDirection: "row",
    alignItems: "center",
    gap: space.md,
    padding: space.md,
    borderRadius: radius.md,
    borderWidth: 1,
    borderColor: colors.washiWarm,
    backgroundColor: colors.white,
  },
  rowIcon: { width: 20, textAlign: "center", color: colors.kitsune, fontSize: 14 },
  rowText: { flex: 1, gap: 2 },
  rowLabel: { fontSize: 15, color: colors.sumiDeep },
  rowDetail: { fontSize: 12, color: colors.sumiLight, textTransform: "capitalize" },
  rowChevron: { fontSize: 18, color: colors.sumiLight },
  empty: { fontSize: 14, color: colors.sumiLight, textAlign: "center", marginTop: space.xl },
});

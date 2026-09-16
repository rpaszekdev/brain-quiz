import { useMemo, useState } from "react";
import { Pressable, ScrollView, StyleSheet, Text, TextInput, View } from "react-native";
import { useLocalSearchParams, useRouter } from "expo-router";
import { SafeAreaView } from "react-native-safe-area-context";
import { Ionicons } from "@expo/vector-icons";
import { regionLabel } from "@/lib/brain-regions";
import type { LobeId } from "@/lib/lobes";
import { press, tick } from "../src/haptics";
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
    <Pressable
      onPress={onPress}
      accessibilityRole="button"
      style={({ pressed }) => [styles.row, pressed && styles.rowPressed]}
    >
      <Text style={styles.rowIcon}>{KIND_ICON[hit.kind]}</Text>
      <View style={styles.rowText}>
        <Text style={styles.rowLabel}>{hit.label}</Text>
        <Text style={styles.rowDetail} numberOfLines={1}>
          {hit.detail}
        </Text>
      </View>
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
    tick();
    setRecent(pushRecent(hit));
    switch (hit.kind) {
      case "region":
        explore.setView(browsing === "deep" ? { kind: "deep" } : ALL_VIEW, hit.id);
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
      <View style={styles.head}>
        <View style={styles.headRow}>
          <Text style={styles.heading}>{browseTitle ?? "Search"}</Text>
          <Pressable
            onPress={() => {
              press();
              router.back();
            }}
            hitSlop={14}
            accessibilityRole="button"
            accessibilityLabel="Close search"
            style={({ pressed }) => [styles.close, pressed && styles.closePressed]}
          >
            <Ionicons name="close" size={22} color={colors.sumiMedium} />
          </Pressable>
        </View>
        {!browsing && (
          <View style={styles.field}>
            <Ionicons name="search" size={20} color={colors.sumiLight} />
            <TextInput
              autoFocus
              value={query}
              onChangeText={setQuery}
              placeholder="Region, lobe, pathway, network"
              placeholderTextColor={colors.sumiLight}
              autoCorrect={false}
              autoCapitalize="none"
              clearButtonMode="while-editing"
              returnKeyType="search"
              style={styles.input}
            />
          </View>
        )}
      </View>
      <ScrollView
        keyboardShouldPersistTaps="handled"
        keyboardDismissMode="on-drag"
        contentContainerStyle={styles.content}
      >
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
            <View style={styles.group}>
              <SectionTitle label="Browse" />
              {BROWSE_CATEGORIES.map((c) => (
                <Pressable
                  key={c.id}
                  onPress={() => {
                    tick();
                    router.push(`/find?category=${c.id}`);
                  }}
                  accessibilityRole="button"
                  style={({ pressed }) => [styles.row, pressed && styles.rowPressed]}
                >
                  <Text style={styles.rowIcon}>{c.icon}</Text>
                  <Text style={styles.browseLabel}>{c.label}</Text>
                  <Text style={styles.rowCount}>{c.count}</Text>
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
  head: { paddingHorizontal: space.lg, paddingTop: space.md, gap: space.md },
  headRow: { flexDirection: "row", alignItems: "center", justifyContent: "space-between", gap: space.md },
  heading: { fontFamily: serif, fontSize: 30, color: colors.sumiDeep, flexShrink: 1 },
  close: {
    width: 36,
    height: 36,
    borderRadius: 18,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: colors.white,
    borderWidth: 1,
    borderColor: colors.washiWarm,
  },
  closePressed: { opacity: 0.6, transform: [{ scale: 0.94 }] },
  field: {
    flexDirection: "row",
    alignItems: "center",
    gap: space.sm,
    height: 56,
    paddingHorizontal: space.md,
    backgroundColor: colors.white,
    borderWidth: 1,
    borderColor: colors.washiWarm,
    borderRadius: radius.lg,
  },
  input: { flex: 1, fontSize: 17, color: colors.sumiDeep },
  content: { padding: space.lg, gap: space.xl, paddingBottom: space.xxl },
  group: { gap: 0 },
  row: {
    flexDirection: "row",
    alignItems: "center",
    gap: space.md,
    paddingVertical: space.md,
    borderBottomWidth: 1,
    borderBottomColor: colors.washiWarm,
  },
  rowPressed: { opacity: 0.5 },
  rowIcon: { width: 18, textAlign: "center", color: colors.kitsune, fontSize: 13 },
  rowText: { flex: 1, gap: 2 },
  rowLabel: { fontSize: 16, color: colors.sumiDeep },
  rowDetail: { fontSize: 12, color: colors.sumiLight, textTransform: "capitalize" },
  rowCount: { fontSize: 13, color: colors.sumiLight, fontVariant: ["tabular-nums"] },
  browseLabel: { flex: 1, fontFamily: serif, fontSize: 18, color: colors.sumiDeep },
  empty: { fontSize: 14, color: colors.sumiLight, textAlign: "center", marginTop: space.xl },
});

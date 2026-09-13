import { useMemo } from "react";
import { Pressable, ScrollView, StyleSheet, Text, View } from "react-native";
import { useLocalSearchParams, useRouter } from "expo-router";
import { SafeAreaView } from "react-native-safe-area-context";
import { Ionicons } from "@expo/vector-icons";
import { getRegion } from "@/lib/brain-regions";
import { articleFor } from "../../../src/explore/content";
import { returnToExplore } from "../../../src/explore/navigate";
import { explore } from "../../../src/explore/store";
import { ALL_VIEW, sceneFor, type ExploreView } from "../../../src/explore/view";
import { colors, radius, serif, space } from "../../../src/theme";
import { Button } from "../../../src/ui/Button";
import { BrainCanvas } from "../../../src/viewer/BrainCanvas";
import { PLAIN_SCENE } from "../../../src/viewer/scene";

const HERO_HEIGHT = 220;

/** The full read on a region, tract or network. Only reachable when content exists. */
export default function Info() {
  const router = useRouter();
  const { kind, id } = useLocalSearchParams<{ kind: string; id: string }>();
  const article = useMemo(() => articleFor(kind, id), [kind, id]);
  const view = useMemo<ExploreView | null>(() => {
    if (!article) return null;
    if (article.kind === "tract") return { kind: "tract", tractId: article.id };
    if (article.kind === "network") return { kind: "network", networkId: article.id };
    return null;
  }, [article]);
  const scene = useMemo(
    () => (view ? sceneFor(view, null) : { ...PLAIN_SCENE, focusIds: article?.focusIds ?? [] }),
    [view, article],
  );
  const focus = getRegion(article?.focusIds[0] ?? "") ?? null;

  const back = () => (router.canGoBack() ? router.back() : router.replace("/explore"));

  if (!article) {
    return (
      <SafeAreaView style={styles.screen} edges={["top"]}>
        <Pressable onPress={back} style={styles.back} accessibilityRole="button" accessibilityLabel="Back">
          <Ionicons name="chevron-back" size={26} color={colors.sumiDeep} />
        </Pressable>
        <Text style={styles.empty}>Nothing written about this yet.</Text>
      </SafeAreaView>
    );
  }

  const showOnBrain = () => {
    if (view) explore.setView(view);
    else explore.setView(ALL_VIEW, article.id);
    returnToExplore(router);
  };

  return (
    <SafeAreaView style={styles.screen} edges={["top"]}>
      <ScrollView contentContainerStyle={styles.content}>
        <Pressable onPress={back} style={styles.back} accessibilityRole="button" accessibilityLabel="Back">
          <Ionicons name="chevron-back" size={26} color={colors.sumiDeep} />
        </Pressable>
        <BrainCanvas scene={scene} focus={focus} flyToFocus style={styles.hero} />
        <View style={styles.body}>
          <Text style={styles.title}>{article.title}</Text>
          <Text style={styles.subtitle}>{article.subtitle}</Text>
          <Text style={styles.overview}>{article.overview}</Text>
          {article.sections.map((section) => (
            <View key={section.title} style={styles.section}>
              <Text style={styles.h2}>{section.title}</Text>
              {section.items.map((item) => (
                <Text key={item} style={styles.item}>
                  • {item}
                </Text>
              ))}
            </View>
          ))}
          {article.quote && (
            <View style={styles.quote}>
              <Text style={styles.quoteLabel}>Exam tip</Text>
              <Text style={styles.quoteText}>{article.quote}</Text>
            </View>
          )}
          <View style={styles.actions}>
            <Button label="Show on the brain" variant="quiet" onPress={showOnBrain} />
            <Button label={article.practice.label} onPress={() => router.push(article.practice.href)} />
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  screen: { flex: 1, backgroundColor: colors.washiWhite },
  content: { paddingBottom: space.xxl },
  back: { padding: space.md, alignSelf: "flex-start" },
  hero: { height: HERO_HEIGHT },
  body: { padding: space.lg, gap: space.md },
  title: { fontFamily: serif, fontSize: 30, color: colors.sumiDeep },
  subtitle: { fontSize: 13, fontWeight: "600", color: colors.kitsune, textTransform: "capitalize", marginTop: -space.sm },
  overview: { fontSize: 16, lineHeight: 24, color: colors.sumiMedium },
  section: { gap: space.xs, marginTop: space.sm },
  h2: { fontFamily: serif, fontSize: 20, color: colors.sumiDeep, marginBottom: space.xs },
  item: { fontSize: 15, lineHeight: 22, color: colors.sumiMedium },
  quote: {
    marginTop: space.sm,
    padding: space.lg,
    borderLeftWidth: 3,
    borderLeftColor: colors.kitsune,
    backgroundColor: colors.white,
    borderRadius: radius.sm,
    gap: space.xs,
  },
  quoteLabel: { fontSize: 11, fontWeight: "700", letterSpacing: 1, textTransform: "uppercase", color: colors.kitsune },
  quoteText: { fontSize: 15, lineHeight: 22, color: colors.sumiDeep, fontStyle: "italic" },
  actions: { gap: space.sm, marginTop: space.lg },
  empty: { padding: space.lg, fontSize: 15, color: colors.sumiLight },
});

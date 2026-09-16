import type { ReactNode } from "react";
import { useRouter } from "expo-router";
import { Pressable, StyleSheet, Text, View } from "react-native";
import type { BrainRegion } from "@/lib/brain-regions";
import { regionLabel } from "@/lib/brain-regions";
import { getLobe } from "@/lib/lobes";
import { press, tick } from "../haptics";
import { colors, space } from "../theme";
import { ArticleBody } from "./ArticleBody";
import { articleFor } from "./content";
import { tractsTouching } from "./search";
import { explore } from "./store";
import { getNetwork, getTract, tractEndpointIds, type ExploreView } from "./view";

/** A word you can press. The sheet's only actions — nothing shouts here. */
function Link({ label, onPress }: { label: string; onPress: () => void }) {
  return (
    <Pressable
      onPress={() => {
        press();
        onPress();
      }}
      hitSlop={10}
      accessibilityRole="button"
      style={({ pressed }) => pressed && styles.linkPressed}
    >
      <Text style={styles.link}>{label}</Text>
    </Pressable>
  );
}

function Links({ children }: { children: ReactNode }) {
  return <View style={styles.links}>{children}</View>;
}

export function RegionBody({ region }: { region: BrainRegion }) {
  const article = articleFor("region", region.id);
  // One body, always the full one: the peek is a shorter window onto the
  // same text, not a different, smaller card.
  if (article) return <ArticleBody article={article} />;
  return <Text style={styles.body}>{region.description}</Text>;
}

export function RegionActions({ region }: { region: BrainRegion }) {
  const router = useRouter();
  const hasPaths = tractsTouching(region.id).length > 0;
  return (
    <Links>
      <Link label="Practice" onPress={() => router.push(`/play/drill?region=${region.id}`)} />
      {hasPaths && (
        <Link
          label="Pathways"
          onPress={() => router.push(`/find?category=pathways&region=${region.id}`)}
        />
      )}
    </Links>
  );
}

function MemberLinks({ members }: { members: readonly BrainRegion[] }) {
  return (
    <View style={styles.members}>
      {members.map((member) => (
        <Pressable
          key={member.id}
          onPress={() => {
            tick();
            explore.select(member.id);
          }}
          hitSlop={6}
          accessibilityRole="button"
          style={({ pressed }) => [styles.member, pressed && styles.linkPressed]}
        >
          <Text style={styles.memberText}>{member.name}</Text>
        </Pressable>
      ))}
    </View>
  );
}

export function ViewBody({ view, members }: { view: ExploreView; members: readonly BrainRegion[] }) {
  switch (view.kind) {
    case "all":
      return null;
    case "lobe":
      return (
        <>
          <Text style={styles.body}>{getLobe(view.lobeId)?.blurb}</Text>
          <MemberLinks members={members} />
        </>
      );
    case "deep":
      return <MemberLinks members={members} />;
    case "tract": {
      const tract = getTract(view.tractId);
      if (!tract) return null;
      const article = articleFor("tract", view.tractId);
      if (article) return <ArticleBody article={article} />;
      return (
        <>
          <Text style={styles.body}>{tract.description}</Text>
          <Text style={styles.bullet}>↔ {tractEndpointIds(tract).map(regionLabel).join(" · ")}</Text>
        </>
      );
    }
    case "network": {
      const network = getNetwork(view.networkId);
      if (!network) return null;
      const article = articleFor("network", view.networkId);
      if (article) {
        return (
          <>
            <ArticleBody article={article} />
            <MemberLinks members={members} />
          </>
        );
      }
      return (
        <>
          <Text style={styles.body}>{network.description}</Text>
          <MemberLinks members={members} />
        </>
      );
    }
  }
}

export function ViewActions({ view }: { view: ExploreView }) {
  const router = useRouter();
  const practice =
    view.kind === "tract"
      ? { label: "Practice pathways", href: "/play/name-tract" }
      : view.kind === "network"
        ? { label: "Practice networks", href: "/play/region-to-network" }
        : view.kind === "deep"
          ? { label: "Practice deep structures", href: "/play/identify-deep" }
          : { label: "Practice regions", href: "/play/identify" };
  return (
    <Links>
      <Link label={practice.label} onPress={() => router.push(practice.href)} />
    </Links>
  );
}

const styles = StyleSheet.create({
  body: { fontSize: 14, lineHeight: 21, color: colors.sumiMedium },
  bullet: { fontSize: 13, lineHeight: 20, color: colors.sumiLight },
  links: { flexDirection: "row", alignItems: "center", gap: space.lg, flexWrap: "wrap" },
  link: { fontSize: 14, fontWeight: "600", color: colors.kitsune },
  linkPressed: { opacity: 0.5 },
  members: { flexDirection: "row", flexWrap: "wrap", columnGap: space.lg, rowGap: space.sm, marginTop: space.xs },
  member: { paddingVertical: 2 },
  memberText: { fontSize: 14, color: colors.ai },
});

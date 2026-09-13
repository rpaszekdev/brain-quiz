import { useRouter } from "expo-router";
import { StyleSheet, Text, View } from "react-native";
import { BRAIN_DETAILS } from "@/lib/brain-details";
import type { BrainRegion } from "@/lib/brain-regions";
import { getLobe } from "@/lib/lobes";
import { colors, space } from "../theme";
import { Button } from "../ui/Button";
import { Chip } from "../ui/Chip";
import { articleFor } from "./content";
import { tractsTouching } from "./search";
import { explore } from "./store";
import { PEELS, getNetwork, getTract, tractEndpointIds, type ExploreView } from "./view";
import { regionLabel } from "@/lib/brain-regions";

/** Lines shown while the sheet is collapsed; the handle expands the rest. */
const PEEK_BODY_LINES = 3;
const PEEK_BULLETS = 2;

interface BodyProps {
  expanded: boolean;
}

export function RegionBody({ region, expanded }: BodyProps & { region: BrainRegion }) {
  const details = BRAIN_DETAILS[region.id];
  const functions = expanded ? details?.functions : details?.functions.slice(0, PEEK_BULLETS);
  return (
    <>
      <Text style={styles.body} numberOfLines={expanded ? undefined : PEEK_BODY_LINES}>
        {region.description}
      </Text>
      {functions?.map((fn) => (
        <Text key={fn} style={styles.bullet}>
          • {fn}
        </Text>
      ))}
      {details?.clinical[0] && <Text style={styles.clinical}>Clinical: {details.clinical[0]}</Text>}
    </>
  );
}

export function RegionActions({ region }: { region: BrainRegion }) {
  const router = useRouter();
  const hasPaths = tractsTouching(region.id).length > 0;
  const hasArticle = articleFor("region", region.id) !== null;
  return (
    <>
      <Button label="Practice" onPress={() => router.push(`/play/drill?region=${region.id}`)} style={styles.grow} />
      {hasPaths && (
        <Button label="Paths ↗" variant="quiet" onPress={() => router.push(`/find?category=pathways&region=${region.id}`)} />
      )}
      {hasArticle && <Button label="ⓘ" variant="quiet" onPress={() => router.push(`/info/region/${region.id}`)} />}
      <Button label="×" variant="quiet" onPress={() => explore.select(null)} />
    </>
  );
}

function MemberChips({ members }: { members: readonly BrainRegion[] }) {
  return (
    <View style={styles.chips}>
      {members.map((member) => (
        <Chip key={member.id} label={member.name} active={false} onPress={() => explore.select(member.id)} />
      ))}
    </View>
  );
}

export function ViewBody({ view, members, expanded }: BodyProps & { view: ExploreView; members: readonly BrainRegion[] }) {
  switch (view.kind) {
    case "all":
      return null;
    case "lobe":
      return (
        <>
          <Text style={styles.body}>{getLobe(view.lobeId)?.blurb}</Text>
          <MemberChips members={members} />
        </>
      );
    case "deep":
      return (
        <>
          <View style={styles.chips}>
            {PEELS.map((peel) => (
              <Chip
                key={peel.id}
                label={peel.label}
                active={view.peel === peel.id}
                onPress={() => explore.setView({ kind: "deep", peel: peel.id })}
              />
            ))}
          </View>
          <MemberChips members={members} />
        </>
      );
    case "tract": {
      const tract = getTract(view.tractId);
      if (!tract) return null;
      return (
        <>
          <Text style={styles.body} numberOfLines={expanded ? undefined : PEEK_BODY_LINES}>
            {tract.description}
          </Text>
          <Text style={styles.bullet}>↔ {tractEndpointIds(tract).map(regionLabel).join(" · ")}</Text>
          {expanded && <Text style={styles.clinical}>Clinical: {tract.clinical}</Text>}
        </>
      );
    }
    case "network": {
      const network = getNetwork(view.networkId);
      if (!network) return null;
      return (
        <>
          <Text style={styles.body} numberOfLines={expanded ? undefined : PEEK_BODY_LINES}>
            {network.description}
          </Text>
          <MemberChips members={members} />
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
  const infoHref =
    view.kind === "tract" && articleFor("tract", view.tractId)
      ? `/info/tract/${view.tractId}`
      : view.kind === "network" && articleFor("network", view.networkId)
        ? `/info/network/${view.networkId}`
        : null;
  return (
    <>
      <Button label={practice.label} onPress={() => router.push(practice.href)} style={styles.grow} />
      {infoHref && <Button label="ⓘ" variant="quiet" onPress={() => router.push(infoHref)} />}
      <Button label="×" variant="quiet" onPress={() => explore.reset()} />
    </>
  );
}

const styles = StyleSheet.create({
  body: { fontSize: 14, lineHeight: 20, color: colors.sumiMedium },
  bullet: { fontSize: 13, lineHeight: 19, color: colors.sumiMedium },
  clinical: { fontSize: 13, lineHeight: 19, color: colors.sumiLight, fontStyle: "italic" },
  chips: { flexDirection: "row", flexWrap: "wrap", gap: space.sm, marginTop: space.xs },
  grow: { flex: 1 },
});

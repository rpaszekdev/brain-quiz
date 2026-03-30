// @ts-nocheck
/**
 * Network quiz generators — region-to-network, network-disruption, network-scenario
 */

/* eslint-disable @typescript-eslint/no-require-imports, @typescript-eslint/no-explicit-any */
import type { QuizQuestion, MultipleChoiceAnswer } from "../../types";
import { registerGenerator } from "./index";

function shuffle(arr: any[]): any[] {
  const result = [...arr];
  for (let i = result.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [result[i], result[j]] = [result[j], result[i]];
  }
  return result;
}

// Network disruption scenarios (hard-coded for accuracy)
const DISRUPTION_SCENARIOS = [
  { condition: "Alzheimer's disease (early stage)", networkId: "dmn", explanation: "Early AD preferentially disrupts the Default Mode Network, with amyloid deposits concentrating in DMN hubs like posterior cingulate and medial prefrontal cortex." },
  { condition: "ADHD (inattentive type)", networkId: "cen", explanation: "ADHD involves hypoactivation of the Central Executive Network, particularly dorsolateral prefrontal cortex, impairing sustained attention and working memory." },
  { condition: "Schizophrenia (positive symptoms)", networkId: "sn", explanation: "The Salience Network, especially anterior insula and dACC, shows aberrant activity in schizophrenia, leading to misattribution of salience to internal experiences." },
  { condition: "Hemispatial neglect (right parietal stroke)", networkId: "van", explanation: "Right-lateralized Ventral Attention Network damage causes hemispatial neglect — failure to attend to left-sided stimuli." },
  { condition: "Autism spectrum disorder", networkId: "dmn", explanation: "ASD involves reduced functional connectivity within the DMN, contributing to difficulties with self-referential processing and theory of mind." },
  { condition: "Depression (rumination)", networkId: "dmn", explanation: "Major depression involves hyperconnectivity within the DMN, particularly the subgenual cingulate, driving persistent rumination and self-focused thought." },
  { condition: "Parkinson's disease (akinesia)", networkId: "sensorimotor", explanation: "PD disrupts the sensorimotor network via basal ganglia dysfunction, impairing motor initiation and execution." },
  { condition: "Frontotemporal dementia (behavioral variant)", networkId: "sn", explanation: "bvFTD preferentially degrades the Salience Network, with early atrophy in anterior insula and ACC, causing personality changes and loss of empathy." },
  { condition: "Simultanagnosia (Balint syndrome)", networkId: "dan", explanation: "Bilateral parietal damage disrupts the Dorsal Attention Network, preventing the ability to attend to multiple objects simultaneously." },
  { condition: "Primary progressive aphasia (semantic variant)", networkId: "language", explanation: "Semantic variant PPA degrades the anterior temporal components of the Language Network, causing progressive loss of word meaning." },
];

// Network activity scenarios
const ACTIVITY_SCENARIOS = [
  { activity: "You're daydreaming about your vacation plans while sitting quietly", networkId: "dmn", explanation: "Self-referential, future-oriented, stimulus-independent thought is the hallmark of DMN activity." },
  { activity: "You hear a sudden loud noise while reading", networkId: "sn", explanation: "The Salience Network detects unexpected stimuli and initiates switching from task-negative to task-positive states." },
  { activity: "You're solving a complex math problem under time pressure", networkId: "cen", explanation: "Working memory, cognitive control, and goal-directed reasoning engage the Central Executive Network." },
  { activity: "You're visually tracking a bird flying across the sky", networkId: "dan", explanation: "Voluntary, top-down directed attention to spatial locations engages the Dorsal Attention Network." },
  { activity: "A friend taps you on the shoulder unexpectedly", networkId: "van", explanation: "Bottom-up, stimulus-driven reorienting of attention activates the Ventral Attention Network." },
  { activity: "You're having a conversation, choosing words carefully", networkId: "language", explanation: "Language production and word selection engage Broca's area and the broader Language Network." },
  { activity: "You're playing piano — your fingers move automatically", networkId: "sensorimotor", explanation: "Practiced motor sequences engage the sensorimotor network (M1, S1, SMA, cerebellum)." },
  { activity: "You're appreciating the colors in a sunset", networkId: "visual", explanation: "Visual processing of complex color and form patterns engages the Visual Network (V1-V4, ventral stream)." },
  { activity: "You smell freshly baked cookies and feel nostalgic", networkId: "limbic", explanation: "Emotionally-valenced sensory experiences processed through olfactory-limbic connections engage the Limbic Network." },
  { activity: "You're remembering what you said at yesterday's meeting and feeling embarrassed", networkId: "dmn", explanation: "Autobiographical memory retrieval combined with self-evaluative emotion is classic DMN activity." },
];

function generateRegionToNetworkQuestions(count: number): QuizQuestion[] {
  // eslint-disable-next-line @typescript-eslint/no-require-imports
  const { FUNCTIONAL_NETWORKS } = require("../../data/networks") as any;

  // Build a region-to-network lookup
  const regionNetworkPairs: { regionId: string; networkId: string; networkName: string }[] = [];
  for (const network of FUNCTIONAL_NETWORKS) {
    for (const regionId of network.memberRegions) {
      regionNetworkPairs.push({
        regionId,
        networkId: network.id,
        networkName: network.name,
      });
    }
  }

  const selected = shuffle(regionNetworkPairs).slice(0, Math.min(count, regionNetworkPairs.length));

  return selected.map((pair, i) => {
    const wrongNetworks = shuffle(
      FUNCTIONAL_NETWORKS.filter((n: { id: string }) => n.id !== pair.networkId),
    ).slice(0, 3);

    const correctNetwork = FUNCTIONAL_NETWORKS.find((n: { id: string }) => n.id === pair.networkId);
    const allOptions = shuffle([
      { id: correctNetwork.id, label: correctNetwork.name },
      ...wrongNetworks.map((n: { id: string; name: string }) => ({ id: n.id, label: n.name })),
    ]);

    const answer: MultipleChoiceAnswer = {
      type: "multiple-choice",
      options: allOptions,
      correctId: pair.networkId,
    };

    return {
      id: `region-to-network-${i}`,
      dimensionId: "networks" as const,
      quizTypeId: "region-to-network",
      difficulty: "intermediate" as const,
      prompt: `The highlighted region belongs to which functional network?`,
      answer,
      sceneDirective: "highlight-region" as const,
      explanation: `This region is a member of the ${pair.networkName}.`,
      tags: ["networks", pair.networkName],
    };
  });
}

function generateNetworkDisruptionQuestions(count: number): QuizQuestion[] {
  // eslint-disable-next-line @typescript-eslint/no-require-imports
  const { FUNCTIONAL_NETWORKS } = require("../../data/networks") as any;

  const selected = shuffle(DISRUPTION_SCENARIOS).slice(0, Math.min(count, DISRUPTION_SCENARIOS.length));

  return selected.map((scenario, i) => {
    const correctNetwork = FUNCTIONAL_NETWORKS.find((n: { id: string }) => n.id === scenario.networkId);
    const wrongNetworks = shuffle(
      FUNCTIONAL_NETWORKS.filter((n: { id: string }) => n.id !== scenario.networkId),
    ).slice(0, 3);

    const allOptions = shuffle([
      { id: correctNetwork.id, label: correctNetwork.name },
      ...wrongNetworks.map((n: { id: string; name: string }) => ({ id: n.id, label: n.name })),
    ]);

    const answer: MultipleChoiceAnswer = {
      type: "multiple-choice",
      options: allOptions,
      correctId: scenario.networkId,
    };

    return {
      id: `network-disruption-${i}`,
      dimensionId: "networks" as const,
      quizTypeId: "network-disruption",
      difficulty: "advanced" as const,
      prompt: `Which functional network is primarily disrupted in: ${scenario.condition}?`,
      answer,
      sceneDirective: "highlight-network" as const,
      explanation: scenario.explanation,
      tags: ["networks", "clinical", scenario.condition],
    };
  });
}

function generateNetworkScenarioQuestions(count: number): QuizQuestion[] {
  // eslint-disable-next-line @typescript-eslint/no-require-imports
  const { FUNCTIONAL_NETWORKS } = require("../../data/networks") as any;

  const selected = shuffle(ACTIVITY_SCENARIOS).slice(0, Math.min(count, ACTIVITY_SCENARIOS.length));

  return selected.map((scenario, i) => {
    const correctNetwork = FUNCTIONAL_NETWORKS.find((n: { id: string }) => n.id === scenario.networkId);
    const wrongNetworks = shuffle(
      FUNCTIONAL_NETWORKS.filter((n: { id: string }) => n.id !== scenario.networkId),
    ).slice(0, 3);

    const allOptions = shuffle([
      { id: correctNetwork.id, label: correctNetwork.name },
      ...wrongNetworks.map((n: { id: string; name: string }) => ({ id: n.id, label: n.name })),
    ]);

    const answer: MultipleChoiceAnswer = {
      type: "multiple-choice",
      options: allOptions,
      correctId: scenario.networkId,
    };

    return {
      id: `network-scenario-${i}`,
      dimensionId: "networks" as const,
      quizTypeId: "network-scenario",
      difficulty: "beginner" as const,
      prompt: scenario.activity,
      answer,
      sceneDirective: "neutral" as const,
      explanation: scenario.explanation,
      tags: ["networks", "scenario"],
    };
  });
}

registerGenerator("region-to-network", generateRegionToNetworkQuestions);
registerGenerator("network-disruption", generateNetworkDisruptionQuestions);
registerGenerator("network-scenario", generateNetworkScenarioQuestions);

/**
 * Single registration point for every quiz generator.
 *
 * Previously these nine side-effect imports lived inline in QuizShell.tsx,
 * which meant the build-time validator and the running app could drift apart.
 * Import this module, never the generators individually.
 */
import "./anatomy-generator";
import "./pathway-generator";
import "./network-generator";
import "./neurotransmitter-generator";
import "./clinical-generator";
import "./developmental-generator";
import "./neuroimaging-generator";
import "./cellular-generator";
import "./cranial-nerve-generator";

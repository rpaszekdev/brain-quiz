import { useState } from "react";
import {
  ActivityIndicator,
  Image,
  Modal,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  View,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { usePathname } from "expo-router";
import { colors, radius, space } from "../theme";
import { watchErrors } from "./errors";
import { captureShot, sendReport, type Shot } from "./report";

type Phase = "idle" | "capturing" | "form" | "sending" | "done";

/**
 * Dev-only bug reporter: a bug button on every screen, one tap to grab the
 * screen, a note, and it lands in ../FIXES.md on the machine running
 * `npm run bugs`.
 *
 * Mounted from app/_layout.tsx behind __DEV__, so nothing here renders — and
 * nothing here listens — in a release build. The screenshot library is
 * required on use, not on import: it is not in Expo Go, and a static import
 * would take the whole app down with it (see report.ts).
 */
export function BugReporter() {
  // In render, not an effect: the first render is the earliest this can hook
  // console.error, and errors thrown before first paint are the ones worth
  // catching. Idempotent, so a double render costs nothing.
  watchErrors();
  const screen = usePathname();
  const [phase, setPhase] = useState<Phase>("idle");
  const [shot, setShot] = useState<Shot>({ uri: null, error: null });
  const [note, setNote] = useState("");
  const [failure, setFailure] = useState<string | null>(null);

  function close() {
    setPhase("idle");
    setShot({ uri: null, error: null });
    setNote("");
    setFailure(null);
  }

  async function start() {
    setPhase("capturing");
    // The button is hidden by the phase change, but React has only queued the
    // re-render — a frame of slack keeps it out of its own screenshot.
    await new Promise((resolve) => setTimeout(resolve, 80));
    setShot(await captureShot());
    setPhase("form");
  }

  async function submit() {
    setPhase("sending");
    setFailure(null);
    try {
      await sendReport({ note, screen, shot: shot.uri });
      setPhase("done");
      setTimeout(close, 1400);
    } catch (error) {
      setFailure(error instanceof Error ? error.message : String(error));
      setPhase("form");
    }
  }

  if (phase === "done") {
    return (
      <View style={styles.toast} pointerEvents="none">
        <Ionicons name="checkmark" size={16} color={colors.white} />
        <Text style={styles.toastText}>Filed to FIXES.md</Text>
      </View>
    );
  }

  if (phase === "idle" || phase === "capturing") {
    return phase === "capturing" ? null : (
      <Pressable
        onPress={start}
        accessibilityRole="button"
        accessibilityLabel="Report a bug"
        style={({ pressed }) => [
          styles.trigger,
          pressed && styles.triggerPressed,
        ]}
      >
        <Ionicons name="bug-outline" size={18} color={colors.kitsune} />
      </Pressable>
    );
  }

  const sending = phase === "sending";
  return (
    <Modal visible transparent animationType="fade" onRequestClose={close}>
      <View style={styles.backdrop}>
        <View style={styles.sheet}>
          <View style={styles.header}>
            <View style={styles.headerText}>
              <Text style={styles.title}>Report a bug</Text>
              <Text style={styles.subtitle}>{screen}</Text>
            </View>
            <Pressable
              onPress={close}
              accessibilityRole="button"
              accessibilityLabel="Cancel"
            >
              <Ionicons name="close" size={22} color={colors.sumiLight} />
            </Pressable>
          </View>

          <ScrollView keyboardShouldPersistTaps="handled">
            {shot.uri ? (
              <Image
                source={{ uri: shot.uri }}
                style={styles.preview}
                resizeMode="contain"
              />
            ) : (
              <Text style={styles.warning}>
                Screenshot failed — the note still sends.
                {shot.error ? ` ${shot.error}` : ""}
              </Text>
            )}

            <TextInput
              value={note}
              onChangeText={setNote}
              placeholder="What went wrong here?"
              placeholderTextColor={colors.sumiLight}
              multiline
              autoFocus
              editable={!sending}
              style={styles.input}
            />

            {failure ? <Text style={styles.failure}>{failure}</Text> : null}

            <Pressable
              onPress={submit}
              disabled={sending || !note.trim()}
              accessibilityRole="button"
              style={({ pressed }) => [
                styles.send,
                (sending || !note.trim()) && styles.sendDisabled,
                pressed && styles.triggerPressed,
              ]}
            >
              {sending ? (
                <ActivityIndicator color={colors.white} />
              ) : (
                <Text style={styles.sendText}>
                  {failure ? "Try again" : "Send"}
                </Text>
              )}
            </Pressable>
          </ScrollView>
        </View>
      </View>
    </Modal>
  );
}

const styles = StyleSheet.create({
  trigger: {
    position: "absolute",
    left: space.md,
    bottom: 96,
    width: 36,
    height: 36,
    borderRadius: 18,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: colors.washiWhite,
    borderWidth: 1,
    borderColor: colors.washiWarm,
  },
  triggerPressed: { opacity: 0.7 },
  backdrop: {
    flex: 1,
    justifyContent: "flex-end",
    backgroundColor: "rgba(26, 26, 26, 0.45)",
  },
  sheet: {
    maxHeight: "88%",
    padding: space.lg,
    borderTopLeftRadius: radius.lg,
    borderTopRightRadius: radius.lg,
    backgroundColor: colors.washiWhite,
  },
  header: {
    flexDirection: "row",
    alignItems: "flex-start",
    marginBottom: space.md,
  },
  headerText: { flex: 1 },
  title: { fontSize: 18, fontWeight: "600", color: colors.sumiDeep },
  subtitle: { marginTop: 2, fontSize: 12, color: colors.sumiLight },
  preview: {
    width: "100%",
    height: 200,
    borderRadius: radius.sm,
    backgroundColor: colors.washiWarm,
  },
  warning: {
    padding: space.md,
    borderRadius: radius.sm,
    backgroundColor: colors.wrongLight,
    color: colors.wrong,
    fontSize: 13,
  },
  input: {
    marginTop: space.md,
    minHeight: 88,
    padding: space.md,
    borderRadius: radius.sm,
    borderWidth: 1,
    borderColor: colors.washiWarm,
    backgroundColor: colors.white,
    color: colors.sumiDeep,
    fontSize: 15,
    textAlignVertical: "top",
  },
  failure: { marginTop: space.sm, color: colors.wrong, fontSize: 13 },
  send: {
    marginTop: space.md,
    paddingVertical: 14,
    borderRadius: radius.sm,
    alignItems: "center",
    backgroundColor: colors.ai,
  },
  sendDisabled: { opacity: 0.4 },
  sendText: { color: colors.white, fontSize: 16, fontWeight: "600" },
  toast: {
    position: "absolute",
    right: space.md,
    bottom: 96,
    flexDirection: "row",
    alignItems: "center",
    gap: space.sm,
    paddingVertical: space.sm,
    paddingHorizontal: space.md,
    borderRadius: radius.md,
    backgroundColor: colors.correct,
  },
  toastText: { color: colors.white, fontSize: 13, fontWeight: "600" },
});

import { useFeatureFlag } from "posthog-react-native";
import { useEffect, useState } from "react";
import { StyleSheet, View } from "react-native";
import mobileAds, { AdsConsent, BannerAd, BannerAdSize, TestIds } from "react-native-google-mobile-ads";

// AdMob → Brain Anatomy Quiz → "Result screen banner".
const BANNER_UNIT_ID = "ca-app-pub-1781125740417720/2427876802";
const FLAG = "ads_enabled";

// Dev: `EXPO_PUBLIC_ADS=1 npx expo run:ios` shows Google's test banner without touching the flag.
const DEV_ADS = __DEV__ && process.env.EXPO_PUBLIC_ADS === "1";
const unitId = __DEV__ ? TestIds.ADAPTIVE_BANNER : BANNER_UNIT_ID;

let ready: Promise<boolean> | null = null;

/** EU/UK consent form (Google UMP) first, then the SDK. Runs once, only when ads are switched on. */
function startAds(): Promise<boolean> {
  ready ??= AdsConsent.gatherConsent()
    .then(() => AdsConsent.getConsentInfo())
    .then(async ({ canRequestAds }) => {
      if (canRequestAds) await mobileAds().initialize();
      return canRequestAds;
    })
    .catch((error: unknown) => {
      console.warn("[ads] consent/init failed", error);
      return false;
    });
  return ready;
}

/** Banner gated by the PostHog flag `ads_enabled`. Renders nothing until consent and a fill. */
export function AdBanner() {
  const flagOn = useFeatureFlag(FLAG) === true || DEV_ADS;
  const [canShow, setCanShow] = useState(false);

  useEffect(() => {
    if (!flagOn || !unitId) return;
    let live = true;
    startAds().then((ok) => live && setCanShow(ok));
    return () => {
      live = false;
    };
  }, [flagOn]);

  if (!flagOn || !unitId || !canShow) return null;
  return (
    <View style={styles.slot}>
      <BannerAd
        unitId={unitId}
        size={BannerAdSize.ANCHORED_ADAPTIVE_BANNER}
        // ponytail: non-personalized = no ATT prompt; personalized pays ~2× but needs ATT
        requestOptions={{ requestNonPersonalizedAdsOnly: true }}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  slot: { alignItems: "center" },
});

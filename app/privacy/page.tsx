import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Privacy policy",
  description: "What the Brain Quiz app and brainquiz.study collect: anonymous usage analytics and, where shown, ads.",
  alternates: { canonical: "/privacy" },
  robots: { index: true, follow: true },
};

const UPDATED = "9 October 2026";
const ISSUES_URL = "https://github.com/rpaszekdev/brain-quiz/issues";

/**
 * Required by the App Store and Google Play. The app ships PostHog (analytics,
 * session replay, feature flags) and AdMob (flag-gated banner); the site runs
 * PostHog. Keep this page true when that changes.
 */
export default function PrivacyPage() {
  return (
    <article className="seo-page">
      <div className="seo-wrap seo-article-wrap">
        <header>
          <h1>Privacy policy</h1>
          <p className="seo-updated">Last updated {UPDATED}</p>
        </header>

        <section>
          <h2>Brain Quiz app (iOS and Android)</h2>
          <p>The app has no accounts and never asks for your name, email or contacts.</p>
          <ul>
            <li>
              Your quiz results, streak and per-region statistics are stored on your device. Deleting the app deletes
              them.
            </li>
            <li>
              Usage analytics: the app sends anonymous usage events (screens opened, lessons started and finished,
              answers given), a random install identifier, device model, OS version and app version to PostHog, hosted
              in the EU. Sessions may be recorded as screen replays to find bugs; text you type is masked. This data
              is used only to improve the app and is never sold.
            </li>
            <li>
              Ads: the app may show a banner from Google AdMob. Ads are non-personalized. In the EU and UK you are
              asked for consent first. AdMob may collect your device&apos;s advertising ID, IP address and ad
              interaction data under{" "}
              <a href="https://policies.google.com/technologies/partner-sites">Google&apos;s privacy policy</a>.
            </li>
            <li>The 3D brain model, the questions and the articles are bundled with the app.</li>
          </ul>
          <p>
            Links to external sites (for example the source of the 3D model) open in your browser; their privacy
            terms apply there.
          </p>
        </section>

        <section>
          <h2>brainquiz.study</h2>
          <p>
            The website has no accounts or forms. It uses PostHog (EU-hosted) for anonymous usage analytics, which
            stores a random identifier in your browser. The hosting provider receives your IP address in order to
            deliver the pages; we do not use it to identify you.
          </p>
        </section>

        <section>
          <h2>Contact</h2>
          <p>
            Questions about this policy can be raised at <a href={ISSUES_URL}>{ISSUES_URL}</a>.
          </p>
        </section>
      </div>
    </article>
  );
}

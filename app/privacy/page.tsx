import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Privacy policy",
  description: "What Brain Quiz for iOS and brainquiz.study do with your data: nothing is collected.",
  alternates: { canonical: "/privacy" },
  robots: { index: true, follow: true },
};

const UPDATED = "16 September 2026";
const ISSUES_URL = "https://github.com/rpaszekdev/brain-quiz/issues";

/**
 * Required by the App Store; kept short because there is little to say. The
 * app has no accounts, no analytics and no network calls, and the site sets
 * no cookies. Keep this page true when that changes.
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
          <h2>Brain Quiz for iOS</h2>
          <p>The app collects no personal data and has no accounts.</p>
          <ul>
            <li>
              Your quiz results, streak and per-region statistics are stored in a database on your device only. They
              never leave the phone.
            </li>
            <li>
              The app makes no network requests. The 3D brain model, the questions and the articles are bundled with
              the app.
            </li>
            <li>There are no analytics, no advertising and no third-party SDKs that send data anywhere.</li>
            <li>Deleting the app deletes everything it stored.</li>
          </ul>
          <p>
            Links to external sites (for example the source of the 3D model) open in your browser; their privacy
            terms apply there.
          </p>
        </section>

        <section>
          <h2>brainquiz.study</h2>
          <p>
            The website serves static pages. It sets no cookies, runs no analytics and has no accounts or forms. Like
            any website, the hosting provider receives your IP address in order to deliver the pages; we do not use
            it to identify you.
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

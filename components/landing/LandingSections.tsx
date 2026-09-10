import Link from "next/link";
import {
  ArrowRight,
  Brain,
  BookOpenCheck,
  Check,
  GraduationCap,
  Map,
  Stethoscope,
  Waypoints,
} from "lucide-react";
import { QUESTIONS_PER_SESSION, QUIZ_TILES } from "./tiles";
import styles from "./landing.module.css";

const AUDIENCES = [
  { label: "Medical students", icon: GraduationCap },
  { label: "Nursing", icon: Stethoscope },
  { label: "Neuroscience", icon: Brain },
  { label: "Psychology", icon: BookOpenCheck },
] as const;

const SUBJECTS = [
  { href: "/browse", label: "Neuroanatomy", icon: Brain },
  { href: "/quiz/cranial-nerves", label: "Cranial nerves", icon: BookOpenCheck },
  { href: "/quiz/white-matter-tracts", label: "Pathways", icon: Map },
  { href: "/quiz/lesion-localization", label: "Clinical cases", icon: Waypoints },
] as const;

const OUTCOMES = [
  "Name all twelve cranial nerves — number, function and exit.",
  "Localise a lesion from the deficit, not from the picture.",
  "Recall a tract's route under exam pressure.",
] as const;

export function LandingSections() {
  return (
    <main className={styles.page}>
      <section className={`${styles.wrapWide} ${styles.sectionFirst}`}>
        <div className={styles.hero}>
          <div className={styles.heroCopy}>
            <h1 className={styles.heroTitle}>Learn the brain by exploring it.</h1>
            <p className={styles.heroLead}>
              Click any region on the brain. Read what it does, then quiz
              yourself on it.
            </p>
          </div>

          {/*
            The loop is rendered from the same meshes the quiz uses, so the
            marketing image cannot drift from the product. muted + playsInline
            are what let iOS autoplay it at all.
          */}
          <div className={styles.heroMedia}>
            <video
              className={styles.heroVideo}
              src="/brain-rotate.mp4"
              poster="/brain-rotate-poster.jpg"
              autoPlay
              loop
              muted
              playsInline
              aria-label="A brain model rotating, with each lobe in its own colour"
            />
          </div>

          <Link
            href={`/quiz/${QUIZ_TILES[0].slug}`}
            className={`${styles.btn} ${styles.btnPrimary} ${styles.btnLarge}`}
          >
            Start exploring
            <ArrowRight size={18} strokeWidth={2} aria-hidden />
          </Link>
        </div>
      </section>

      <section className={`${styles.wrap} ${styles.section}`}>
        <h2 className={styles.h2}>Built for people who get examined on this.</h2>
        <div className={styles.audiences}>
          {AUDIENCES.map((audience) => (
            <div key={audience.label} className={styles.audience}>
              <audience.icon size={26} strokeWidth={1.75} aria-hidden />
              <span className={styles.audienceLabel}>{audience.label}</span>
            </div>
          ))}
        </div>
      </section>

      <section className={`${styles.wrapInset} ${styles.section}`}>
        <h2 className={styles.h2}>Choose a quiz.</h2>
        <div className={styles.grid}>
          {QUIZ_TILES.map((tile) => (
            <Link
              key={tile.slug}
              href={`/quiz/${tile.slug}`}
              className={styles.tile}
            >
              <span className={styles.tileMeta}>
                {QUESTIONS_PER_SESSION} questions · {tile.category}
              </span>
              <span className={styles.tileIcon}>
                <tile.icon size={26} strokeWidth={1.6} aria-hidden />
              </span>
              <h3 className={styles.tileTitle}>{tile.label}</h3>
              <p className={styles.tileBlurb}>{tile.blurb}</p>
            </Link>
          ))}
        </div>
      </section>

      <section className={`${styles.wrap} ${styles.section}`}>
        <h2 className={styles.h2}>Or start from a subject.</h2>
        <div className={styles.subjects}>
          {SUBJECTS.map((subject) => (
            <Link
              key={subject.href}
              href={subject.href}
              className={styles.subject}
            >
              <subject.icon size={18} strokeWidth={1.75} aria-hidden />
              {subject.label}
            </Link>
          ))}
        </div>
      </section>

      <section className={`${styles.wrap} ${styles.section}`}>
        <h2 className={styles.h2}>What you&rsquo;ll be able to do.</h2>
        <ul className={styles.outcomes}>
          {OUTCOMES.map((outcome) => (
            <li key={outcome} className={styles.outcome}>
              <Check size={18} strokeWidth={2.25} aria-hidden />
              {outcome}
            </li>
          ))}
        </ul>
      </section>

      <section className={`${styles.wrap} ${styles.section}`}>
        <h2 className={styles.h2}>Use a mnemonic, then test it.</h2>
        <p className={styles.lead}>
          Short memory aids for cranial nerves, branches, exits, and other
          high-yield recall prompts.
        </p>
        <div className={styles.btnRow}>
          <Link
            href="/mnemonics/cranial-nerves"
            className={`${styles.btn} ${styles.btnQuiet}`}
          >
            <BookOpenCheck size={16} strokeWidth={1.75} aria-hidden />
            Open study guides
          </Link>
          <Link
            href="/3d-brain-model"
            className={`${styles.btn} ${styles.btnPrimary}`}
          >
            <Brain size={16} strokeWidth={1.75} aria-hidden />
            Open the 3D atlas
          </Link>
        </div>
      </section>
    </main>
  );
}

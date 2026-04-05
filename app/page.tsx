import BrainQuizLazy from "@/components/BrainQuizLazy";
import { BRAIN_REGIONS } from "@/lib/brain-regions";
import { DIMENSIONS } from "@/lib/dimensions";

/* Group regions by category for the crawlable section */
const categories = {
  cortical: "Cortical Regions",
  subcortical: "Subcortical Structures",
  brainstem: "Brainstem",
  cerebellum: "Cerebellum",
} as const;

const regionsByCategory = Object.entries(categories).map(([key, label]) => ({
  label,
  regions: BRAIN_REGIONS.filter((r) => r.category === key),
}));

export default function BrainQuizPage() {
  return (
    <>
      {/* Interactive app — loaded client-side only (Three.js needs WebGL) */}
      <BrainQuizLazy />

      {/*
        Server-rendered crawlable content.
        Visually hidden but fully accessible to search engines and screen readers.
        Uses sr-only pattern: positioned off-screen, still in DOM.
      */}
      <div
        aria-hidden="false"
        style={{
          position: "absolute",
          width: "1px",
          height: "1px",
          padding: 0,
          margin: "-1px",
          overflow: "hidden",
          clip: "rect(0, 0, 0, 0)",
          whiteSpace: "nowrap",
          borderWidth: 0,
        }}
      >
        <main>
          <h1>Brain Atlas — Interactive 3D Brain Quiz</h1>
          <p>
            Explore and learn brain anatomy with an interactive 3D model. Brain
            Atlas features {BRAIN_REGIONS.length} brain regions across{" "}
            {DIMENSIONS.length} learning dimensions, from basic neuroanatomy to
            clinical neuroscience.
          </p>

          <section>
            <h2>Quiz Modes</h2>
            <ul>
              <li>
                <strong>Explore Mode</strong> — Browse the 3D brain model
                freely. Click any region to see its name, function, and related
                neural pathways.
              </li>
              <li>
                <strong>Identify Mode</strong> — A brain region is highlighted
                on the 3D model. Name the correct structure from multiple
                choices.
              </li>
              <li>
                <strong>Locate Mode</strong> — Given a region name, click the
                correct area on the 3D brain model.
              </li>
            </ul>
          </section>

          <section>
            <h2>Learning Dimensions</h2>
            <ul>
              {DIMENSIONS.map((dim) => (
                <li key={dim.id}>
                  <strong>{dim.name}</strong> — {dim.description}
                  {dim.quizTypes.length > 0 && (
                    <ul>
                      {dim.quizTypes.map((qt) => (
                        <li key={qt.id}>
                          {qt.name} ({qt.difficulty})
                        </li>
                      ))}
                    </ul>
                  )}
                </li>
              ))}
            </ul>
          </section>

          <section>
            <h2>Brain Regions</h2>
            {regionsByCategory.map(({ label, regions }) =>
              regions.length > 0 ? (
                <div key={label}>
                  <h3>{label}</h3>
                  <ul>
                    {regions.map((r) => (
                      <li key={r.id}>
                        <strong>{r.name}</strong>
                        {r.aliases.length > 0 && (
                          <> (also known as: {r.aliases.join(", ")})</>
                        )}
                        {" — "}
                        {r.description}
                      </li>
                    ))}
                  </ul>
                </div>
              ) : null,
            )}
          </section>

          <section>
            <h2>About Brain Atlas</h2>
            <p>
              Brain Atlas is a free, open-source educational tool for learning
              neuroanatomy. Built with Three.js for real-time 3D visualization,
              it uses mesh data from the Desikan-Killiany cortical atlas. No
              account or login required.
            </p>
            <p>
              Designed for medical students, psychology students, neuroscience
              researchers, and anyone curious about the structure of the human
              brain.
            </p>
          </section>
        </main>
      </div>
    </>
  );
}

import AnimatedSection from "./AnimatedSection";
import { skills } from "../data/projects";

export default function Skills() {
  return (
    <section id="skills" style={{ padding: "7rem 6vw", background: "rgba(124,58,237,0.03)" }}>
      <div style={{ maxWidth: "900px", margin: "0 auto" }}>
        <AnimatedSection>
          <div style={{ textAlign: "center", marginBottom: "4rem" }}>
            <div style={{ fontFamily: "'DM Mono', monospace", fontSize: "0.78rem", color: "#a78bfa", letterSpacing: "0.16em", textTransform: "uppercase", marginBottom: "0.8rem", display: "flex", alignItems: "center", justifyContent: "center", gap: "0.6rem" }}>
              <span style={{ width: "24px", height: "1px", background: "#7c3aed", display: "inline-block" }} />
              Tech Stack
              <span style={{ width: "24px", height: "1px", background: "#7c3aed", display: "inline-block" }} />
            </div>
            <h2 style={{ fontFamily: "'Syne', sans-serif", fontWeight: 800, fontSize: "2.6rem", color: "#fff", letterSpacing: "-0.02em" }}>
              Tools I <span style={{ color: "#7c3aed" }}>wield</span>
            </h2>
          </div>
        </AnimatedSection>

        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(260px, 1fr))", gap: "1.5rem" }}>
          {Object.entries(skills).map(([category, items], ci) => (
            <AnimatedSection key={category} delay={ci * 80}>
              <div
                style={{
                  background: "rgba(124,58,237,0.05)",
                  border: "1px solid rgba(124,58,237,0.18)",
                  borderRadius: "12px",
                  padding: "1.6rem",
                  transition: "border-color 0.2s, transform 0.2s",
                  height: "100%",
                }}
                onMouseEnter={(e) => { e.currentTarget.style.borderColor = "rgba(124,58,237,0.5)"; e.currentTarget.style.transform = "translateY(-3px)"; }}
                onMouseLeave={(e) => { e.currentTarget.style.borderColor = "rgba(124,58,237,0.18)"; e.currentTarget.style.transform = "none"; }}
              >
                <div style={{ fontFamily: "'DM Mono', monospace", fontSize: "0.72rem", color: "#7c3aed", letterSpacing: "0.12em", textTransform: "uppercase", marginBottom: "1rem" }}>
                  {category}
                </div>
                <div style={{ display: "flex", flexWrap: "wrap", gap: "0.5rem" }}>
                  {items.map((item) => (
                    <span key={item} style={{
                      background: "rgba(124,58,237,0.1)",
                      border: "1px solid rgba(124,58,237,0.22)",
                      color: "#c4b5fd",
                      padding: "0.3rem 0.75rem",
                      borderRadius: "6px",
                      fontFamily: "'DM Sans', sans-serif",
                      fontSize: "0.82rem",
                      fontWeight: 500,
                    }}>
                      {item}
                    </span>
                  ))}
                </div>
              </div>
            </AnimatedSection>
          ))}
        </div>
      </div>
    </section>
  );
}

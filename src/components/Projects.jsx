import AnimatedSection from "./AnimatedSection";
import ProjectCard from "./ProjectCard";
import { projects } from "../data/projects";

export default function Projects() {
  return (
    <section id="projects" style={{ padding: "7rem 6vw" }}>
      <div style={{ maxWidth: "1000px", margin: "0 auto" }}>
        <AnimatedSection>
          <div style={{ textAlign: "center", marginBottom: "4rem" }}>
            <div style={{ fontFamily: "'DM Mono', monospace", fontSize: "0.78rem", color: "#a78bfa", letterSpacing: "0.16em", textTransform: "uppercase", marginBottom: "0.8rem", display: "flex", alignItems: "center", justifyContent: "center", gap: "0.6rem" }}>
              <span style={{ width: "24px", height: "1px", background: "#7c3aed", display: "inline-block" }} />
              Projects
              <span style={{ width: "24px", height: "1px", background: "#7c3aed", display: "inline-block" }} />
            </div>
            <h2 style={{ fontFamily: "'Syne', sans-serif", fontWeight: 800, fontSize: "2.6rem", color: "#fff", letterSpacing: "-0.02em" }}>
              Things I've <span style={{ color: "#7c3aed" }}>built</span>
            </h2>
          </div>
        </AnimatedSection>

        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(300px, 1fr))", gap: "1.5rem" }}>
          {projects.map((p, i) => (
            <ProjectCard key={p.id} project={p} delay={i * 100} />
          ))}
        </div>

        <AnimatedSection delay={200}>
          <div style={{ textAlign: "center", marginTop: "3rem" }}>
            <a
              href="https://github.com/Samarth-2409X?tab=repositories"
              target="_blank"
              rel="noreferrer"
              style={{
                display: "inline-flex",
                alignItems: "center",
                gap: "0.5rem",
                fontFamily: "'DM Mono', monospace",
                fontSize: "0.85rem",
                color: "#a78bfa",
                textDecoration: "none",
                border: "1px solid rgba(124,58,237,0.3)",
                padding: "0.65rem 1.5rem",
                borderRadius: "8px",
                transition: "all 0.2s",
              }}
              onMouseEnter={(e) => { e.currentTarget.style.background = "rgba(124,58,237,0.1)"; e.currentTarget.style.borderColor = "#7c3aed"; }}
              onMouseLeave={(e) => { e.currentTarget.style.background = "transparent"; e.currentTarget.style.borderColor = "rgba(124,58,237,0.3)"; }}
            >
              View All Repos on GitHub →
            </a>
          </div>
        </AnimatedSection>
      </div>
    </section>
  );
}

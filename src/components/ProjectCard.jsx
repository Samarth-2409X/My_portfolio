import { useState } from "react";
import AnimatedSection from "./AnimatedSection";

export default function ProjectCard({ project, delay }) {
  const [hovered, setHovered] = useState(false);

  return (
    <AnimatedSection delay={delay}>
      <div
        onMouseEnter={() => setHovered(true)}
        onMouseLeave={() => setHovered(false)}
        style={{
          background: hovered ? "rgba(124,58,237,0.08)" : "rgba(124,58,237,0.04)",
          border: `1px solid ${hovered ? "rgba(124,58,237,0.45)" : "rgba(124,58,237,0.15)"}`,
          borderRadius: "14px",
          padding: "2rem",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          transition: "all 0.3s ease",
          transform: hovered ? "translateY(-4px)" : "none",
          position: "relative",
          overflow: "hidden",
        }}
      >
        {/* Top accent line on hover */}
        {hovered && (
          <div style={{
            position: "absolute", top: 0, left: 0, right: 0,
            height: "2px",
            background: `linear-gradient(90deg, transparent, ${project.color}, transparent)`,
          }} />
        )}

        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: "1rem" }}>
          <div style={{ fontSize: "2rem" }}>{project.emoji}</div>
          <span style={{
            fontFamily: "'DM Mono', monospace",
            fontSize: "0.65rem",
            letterSpacing: "0.1em",
            textTransform: "uppercase",
            color: "#7c3aed",
            background: "rgba(124,58,237,0.1)",
            border: "1px solid rgba(124,58,237,0.25)",
            padding: "0.2rem 0.6rem",
            borderRadius: "100px",
          }}>{project.type}</span>
        </div>

        <div style={{ fontFamily: "'Syne', sans-serif", fontWeight: 700, fontSize: "1.25rem", color: "#fff", marginBottom: "0.25rem" }}>
          {project.name}
        </div>
        <div style={{ fontFamily: "'DM Mono', monospace", fontSize: "0.75rem", color: "#a78bfa", marginBottom: "0.9rem" }}>
          {project.subtitle}
        </div>
        <p style={{ fontFamily: "'DM Sans', sans-serif", color: "rgba(255,255,255,0.5)", fontSize: "0.88rem", lineHeight: 1.7, marginBottom: "1.2rem", flex: 1 }}>
          {project.description}
        </p>

        <div style={{ display: "flex", flexWrap: "wrap", gap: "0.4rem", marginBottom: "1.3rem" }}>
          {project.tags.map((tag) => (
            <span key={tag} style={{
              fontFamily: "'DM Sans', sans-serif",
              fontSize: "0.72rem",
              color: "rgba(167,139,250,0.7)",
              background: "rgba(124,58,237,0.08)",
              border: "1px solid rgba(124,58,237,0.15)",
              padding: "0.2rem 0.55rem",
              borderRadius: "4px",
            }}>{tag}</span>
          ))}
        </div>

        <div style={{ display: "flex", gap: "0.7rem" }}>
          {project.frontendUrl && (
            <a href={project.frontendUrl} target="_blank" rel="noreferrer" style={linkStyle}
              onMouseEnter={(e) => { e.target.style.background = "rgba(124,58,237,0.15)"; }}
              onMouseLeave={(e) => { e.target.style.background = "transparent"; }}
            >Frontend ↗</a>
          )}
          {project.backendUrl && (
            <a href={project.backendUrl} target="_blank" rel="noreferrer" style={linkStyle}
              onMouseEnter={(e) => { e.target.style.background = "rgba(124,58,237,0.15)"; }}
              onMouseLeave={(e) => { e.target.style.background = "transparent"; }}
            >Backend ↗</a>
          )}
          {project.url && (
            <a href={project.url} target="_blank" rel="noreferrer" style={linkStyle}
              onMouseEnter={(e) => { e.target.style.background = "rgba(124,58,237,0.15)"; }}
              onMouseLeave={(e) => { e.target.style.background = "transparent"; }}
            >View Code ↗</a>
          )}
        </div>
      </div>
    </AnimatedSection>
  );
}

const linkStyle = {
  fontFamily: "'DM Mono', monospace",
  fontSize: "0.75rem",
  color: "#c4b5fd",
  textDecoration: "none",
  border: "1px solid rgba(124,58,237,0.3)",
  padding: "0.35rem 0.8rem",
  borderRadius: "6px",
  transition: "all 0.2s",
  background: "transparent",
};

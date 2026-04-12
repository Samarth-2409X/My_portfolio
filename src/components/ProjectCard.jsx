import { useState } from "react";
import AnimatedSection from "./AnimatedSection";

// ── Full screen image modal ───────────────────────────────────
function ImageModal({ src, title, onClose }) {
  return (
    <div
      onClick={onClose}
      style={{
        position: "fixed",
        inset: 0,
        zIndex: 9999,
        background: "rgba(0,0,0,0.88)",
        backdropFilter: "blur(10px)",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        padding: "2rem",
        cursor: "zoom-out",
      }}
    >
      <div
        onClick={(e) => e.stopPropagation()}
        style={{
          position: "relative",
          maxWidth: "1000px",
          width: "100%",
          cursor: "default",
        }}
      >
        {/* Close button */}
        <button
          onClick={onClose}
          style={{
            position: "absolute",
            top: "-48px",
            right: 0,
            background: "rgba(124,58,237,0.2)",
            border: "1px solid rgba(124,58,237,0.5)",
            color: "#fff",
            borderRadius: "8px",
            padding: "0.4rem 1rem",
            fontFamily: "'DM Mono', monospace",
            fontSize: "0.75rem",
            cursor: "pointer",
            letterSpacing: "0.05em",
            transition: "all 0.2s",
          }}
          onMouseEnter={(e) => { e.currentTarget.style.background = "rgba(124,58,237,0.4)"; }}
          onMouseLeave={(e) => { e.currentTarget.style.background = "rgba(124,58,237,0.2)"; }}
        >
          ✕ Close
        </button>

        {/* Project image */}
        <img
          src={src}
          alt={title}
          style={{
            width: "100%",
            borderRadius: "14px",
            border: "1px solid rgba(124,58,237,0.4)",
            boxShadow: "0 32px 80px rgba(0,0,0,0.7)",
            display: "block",
          }}
        />
        <div style={{
          textAlign: "center",
          marginTop: "1rem",
          fontFamily: "'DM Sans', sans-serif",
          color: "rgba(255,255,255,0.4)",
          fontSize: "0.82rem",
          fontStyle: "italic",
        }}>
          {title}
        </div>
      </div>
    </div>
  );
}

// ── Project Card ──────────────────────────────────────────────
export default function ProjectCard({ project, delay }) {
  const [hovered, setHovered] = useState(false);
  const [imgHovered, setImgHovered] = useState(false);
  const [modalOpen, setModalOpen] = useState(false);

  const linkStyle = {
    fontFamily: "'DM Mono', monospace",
    fontSize: "0.72rem",
    color: "#c4b5fd",
    textDecoration: "none",
    border: "1px solid rgba(124,58,237,0.3)",
    padding: "0.35rem 0.8rem",
    borderRadius: "6px",
    transition: "all 0.2s",
    background: "transparent",
  };

  return (
    <>
      <AnimatedSection delay={delay}>
        <div
          onMouseEnter={() => setHovered(true)}
          onMouseLeave={() => setHovered(false)}
          style={{
            background: hovered ? "rgba(124,58,237,0.08)" : "rgba(124,58,237,0.04)",
            border: `1px solid ${hovered ? "rgba(124,58,237,0.45)" : "rgba(124,58,237,0.15)"}`,
            borderRadius: "14px",
            overflow: "hidden",
            height: "100%",
            display: "flex",
            flexDirection: "column",
            transition: "all 0.3s ease",
            transform: hovered ? "translateY(-5px)" : "none",
            boxShadow: hovered ? "0 20px 50px rgba(0,0,0,0.35)" : "none",
            position: "relative",
          }}
        >
          {/* Top color accent */}
          <div style={{
            position: "absolute",
            top: 0, left: 0, right: 0,
            height: "2px",
            background: `linear-gradient(90deg, transparent, ${project.color}99, transparent)`,
            zIndex: 1,
          }} />

          {/* ── Project image preview ── */}
          {project.image && (
            <div
              onClick={() => setModalOpen(true)}
              onMouseEnter={() => setImgHovered(true)}
              onMouseLeave={() => setImgHovered(false)}
              style={{
                position: "relative",
                width: "100%",
                paddingBottom: "56%",
                overflow: "hidden",
                cursor: "zoom-in",
                background: "rgba(0,0,0,0.4)",
                flexShrink: 0,
              }}
            >
              <img
                src={project.image}
                alt={project.name}
                style={{
                  position: "absolute",
                  inset: 0,
                  width: "100%",
                  height: "100%",
                  objectFit: "cover",
                  objectPosition: "center top",
                  transition: "transform 0.45s ease",
                  transform: imgHovered ? "scale(1.06)" : "scale(1)",
                  display: "block",
                }}
              />

              {/* Hover zoom overlay */}
              <div style={{
                position: "absolute",
                inset: 0,
                background: "rgba(5,0,15,0.5)",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                opacity: imgHovered ? 1 : 0,
                transition: "opacity 0.3s ease",
              }}>
                <div style={{
                  background: "rgba(124,58,237,0.85)",
                  border: "1px solid rgba(167,139,250,0.6)",
                  borderRadius: "10px",
                  padding: "0.55rem 1.1rem",
                  fontFamily: "'DM Mono', monospace",
                  fontSize: "0.75rem",
                  color: "#fff",
                  letterSpacing: "0.05em",
                  boxShadow: "0 8px 24px rgba(124,58,237,0.5)",
                }}>
                  🔍 Click to enlarge
                </div>
              </div>

              {/* Bottom gradient fade */}
              <div style={{
                position: "absolute",
                bottom: 0, left: 0, right: 0,
                height: "40%",
                background: "linear-gradient(to top, rgba(5,0,15,0.95), transparent)",
                pointerEvents: "none",
              }} />
            </div>
          )}

          {/* ── Card content ── */}
          <div style={{ padding: "1.4rem", flex: 1, display: "flex", flexDirection: "column" }}>

            {/* Emoji + type badge */}
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: "0.8rem" }}>
              <div style={{ fontSize: "1.8rem" }}>{project.emoji}</div>
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

            {/* Name */}
            <div style={{
              fontFamily: "'Syne', sans-serif",
              fontWeight: 700,
              fontSize: "1.15rem",
              color: "#fff",
              marginBottom: "0.25rem",
            }}>
              {project.name}
            </div>

            {/* Subtitle */}
            <div style={{
              fontFamily: "'DM Mono', monospace",
              fontSize: "0.72rem",
              color: "#a78bfa",
              marginBottom: "0.8rem",
            }}>
              {project.subtitle}
            </div>

            {/* Description */}
            <p style={{
              fontFamily: "'DM Sans', sans-serif",
              color: "rgba(255,255,255,0.5)",
              fontSize: "0.85rem",
              lineHeight: 1.7,
              marginBottom: "1rem",
              flex: 1,
            }}>
              {project.description}
            </p>

            {/* Tags */}
            <div style={{ display: "flex", flexWrap: "wrap", gap: "0.4rem", marginBottom: "1.2rem" }}>
              {project.tags.map((tag) => (
                <span key={tag} style={{
                  fontFamily: "'DM Sans', sans-serif",
                  fontSize: "0.7rem",
                  color: "rgba(167,139,250,0.7)",
                  background: "rgba(124,58,237,0.08)",
                  border: "1px solid rgba(124,58,237,0.15)",
                  padding: "0.2rem 0.55rem",
                  borderRadius: "4px",
                }}>{tag}</span>
              ))}
            </div>

            {/* Action buttons */}
            <div style={{ display: "flex", gap: "0.6rem", flexWrap: "wrap" }}>

              {/* Preview button — only if image exists */}
              {project.image && (
                <button
                  onClick={() => setModalOpen(true)}
                  style={{
                    fontFamily: "'DM Mono', monospace",
                    fontSize: "0.7rem",
                    color: "#c4b5fd",
                    background: "rgba(124,58,237,0.12)",
                    border: "1px solid rgba(124,58,237,0.35)",
                    padding: "0.35rem 0.8rem",
                    borderRadius: "6px",
                    cursor: "pointer",
                    transition: "all 0.2s",
                    letterSpacing: "0.04em",
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.background = "rgba(124,58,237,0.25)";
                    e.currentTarget.style.borderColor = "#7c3aed";
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.background = "rgba(124,58,237,0.12)";
                    e.currentTarget.style.borderColor = "rgba(124,58,237,0.35)";
                  }}
                >
                  🖼 Preview
                </button>
              )}

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
        </div>
      </AnimatedSection>

      {/* Full screen modal */}
      {modalOpen && (
        <ImageModal
          src={project.image}
          title={project.name}
          onClose={() => setModalOpen(false)}
        />
      )}
    </>
  );
}
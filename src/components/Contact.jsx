import { useState } from "react";
import AnimatedSection from "./AnimatedSection";

export default function Contact() {
  const [copied, setCopied] = useState(false);

  const copy = () => {
    navigator.clipboard.writeText("samarthgone667@gmail.com");
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const socials = [
    { name: "GitHub", url: "https://github.com/Samarth-2409X", icon: "GH" },
    { name: "LinkedIn", url: "https://www.linkedin.com/in/samarth-shirahatti-9bb8962a3/", icon: "LI" },
    { name: "Instagram", url: "https://instagram.com/samarth__7777_", icon: "IG" },
  ];

  return (
    <section id="contact" style={{ padding: "7rem 6vw", background: "rgba(124,58,237,0.03)" }}>
      <div style={{ maxWidth: "640px", margin: "0 auto", textAlign: "center" }}>
        <AnimatedSection>
          <div style={{ fontFamily: "'DM Mono', monospace", fontSize: "0.78rem", color: "#a78bfa", letterSpacing: "0.16em", textTransform: "uppercase", marginBottom: "0.8rem", display: "flex", alignItems: "center", justifyContent: "center", gap: "0.6rem" }}>
            <span style={{ width: "24px", height: "1px", background: "#7c3aed", display: "inline-block" }} />
            Get In Touch
            <span style={{ width: "24px", height: "1px", background: "#7c3aed", display: "inline-block" }} />
          </div>
          <h2 style={{ fontFamily: "'Syne', sans-serif", fontWeight: 800, fontSize: "2.6rem", color: "#fff", letterSpacing: "-0.02em", marginBottom: "1.2rem" }}>
            Let's <span style={{ color: "#7c3aed" }}>build</span> something
          </h2>
          <p style={{ fontFamily: "'DM Sans', sans-serif", color: "rgba(255,255,255,0.5)", lineHeight: 1.8, fontSize: "1rem", marginBottom: "3rem" }}>
            Focused on building high-quality MERN stack applications and meaningful tech solutions.
          </p>
        </AnimatedSection>

        <AnimatedSection delay={150}>
          <div
            onClick={copy}
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: "0.75rem",
              background: "rgba(124,58,237,0.08)",
              border: "1px solid rgba(124,58,237,0.3)",
              borderRadius: "12px",
              padding: "1.2rem 2rem",
              cursor: "pointer",
              transition: "all 0.2s",
              marginBottom: "3rem",
            }}
            onMouseEnter={(e) => { e.currentTarget.style.background = "rgba(124,58,237,0.15)"; e.currentTarget.style.borderColor = "#7c3aed"; }}
            onMouseLeave={(e) => { e.currentTarget.style.background = "rgba(124,58,237,0.08)"; e.currentTarget.style.borderColor = "rgba(124,58,237,0.3)"; }}
          >
            <span style={{ fontFamily: "'DM Mono', monospace", color: "#a78bfa", fontSize: "0.9rem" }}>samarthgone667@gmail.com</span>
            <span style={{ fontFamily: "'DM Mono', monospace", fontSize: "0.7rem", color: copied ? "#4ade80" : "rgba(255,255,255,0.3)" }}>
              {copied ? "✓ Copied!" : "Click to copy"}
            </span>
          </div>
        </AnimatedSection>

        <AnimatedSection delay={250}>
          <div style={{ display: "flex", justifyContent: "center", gap: "1rem" }}>
            {socials.map((s) => (
              <a
                key={s.name}
                href={s.url}
                target="_blank"
                rel="noreferrer"
                style={{
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                  gap: "0.4rem",
                  background: "rgba(124,58,237,0.06)",
                  border: "1px solid rgba(124,58,237,0.18)",
                  borderRadius: "10px",
                  padding: "1.1rem 1.5rem",
                  textDecoration: "none",
                  transition: "all 0.2s",
                  minWidth: "80px",
                }}
                onMouseEnter={(e) => { e.currentTarget.style.background = "rgba(124,58,237,0.14)"; e.currentTarget.style.borderColor = "rgba(124,58,237,0.5)"; e.currentTarget.style.transform = "translateY(-3px)"; }}
                onMouseLeave={(e) => { e.currentTarget.style.background = "rgba(124,58,237,0.06)"; e.currentTarget.style.borderColor = "rgba(124,58,237,0.18)"; e.currentTarget.style.transform = "none"; }}
              >
                <span style={{ fontFamily: "'DM Mono', monospace", fontWeight: 700, fontSize: "0.85rem", color: "#c4b5fd" }}>{s.icon}</span>
                <span style={{ fontFamily: "'DM Sans', sans-serif", fontSize: "0.72rem", color: "rgba(255,255,255,0.4)" }}>{s.name}</span>
              </a>
            ))}
          </div>
        </AnimatedSection>
      </div>
    </section>
  );
}

import { useState } from "react";
import AnimatedSection from "./AnimatedSection";

const certificates = [
  {
    id: 1,
    title: "Tech Vision 2026 - National Level Project Expo",
    issuer: "CMR Institute of Technology, Bengaluru",
    date: "Feb 2026",
    description:
      "Participated in a national-level project expo organized by the Department of Electronics and Communication Engineering. Presented an engineering project and competed with teams from various institutions across India.",
    credentialUrl: "",
    image: "/certificate-1.jpg",
    emoji: "🏆",
    color: "#ff6b6b",
  },
  {
    id: 2,
    title: "Web Development Cohort (100xDevs)",
    issuer: "100xDevs",
    date: "July 2025",
    description:
      "Completed a web development cohort focused on building full-stack applications. Learned core concepts of frontend and backend development, worked on real-world projects, and gained practical experience in modern web technologies.",
    credentialUrl: "",
    image: "/certificate-2.jpg",
    emoji: "💻",
    color: "#2563eb",
  },
  {
    id: 3,
    title: "Oracle Cloud Infrastructure 2025 Certified Foundations Associate",
    issuer: "Oracle University",
    date: "October 22, 2025",
    description:
      "Demonstrated foundational knowledge of Oracle Cloud Infrastructure (OCI) public cloud services including Compute, Storage, Networking, Database, Developer, Analytics, AI, Observability, and Hybrid services. Validated understanding of OCI security, identity model, compliance structure, billing, cost management, governance, and administration.",
    credentialUrl:
      "https://catalog-education.oracle.com/pls/certview/sharebadge?id=E5E0DE9CA2DDF3B59BDD3C4C844786B7947DAD7AB74185C899DE4FCC06F5DD97",
    image: "/certificate-3.jpg",
    emoji: "☁️",
    color: "#C74634",
  },
];


const STYLE = `
  @keyframes floatCard0 {
    0%   { transform: translateY(0px)   rotate(0deg); }
    33%  { transform: translateY(-7px)  rotate(0.25deg); }
    66%  { transform: translateY(-3px)  rotate(-0.2deg); }
    100% { transform: translateY(0px)   rotate(0deg); }
  }
  @keyframes floatCard1 {
    0%   { transform: translateY(0px)   rotate(0deg); }
    33%  { transform: translateY(-5px)  rotate(-0.3deg); }
    66%  { transform: translateY(-9px)  rotate(0.2deg); }
    100% { transform: translateY(0px)   rotate(0deg); }
  }
  @keyframes floatCard2 {
    0%   { transform: translateY(0px)   rotate(0deg); }
    33%  { transform: translateY(-9px)  rotate(0.2deg); }
    66%  { transform: translateY(-4px)  rotate(-0.25deg); }
    100% { transform: translateY(0px)   rotate(0deg); }
  }
  @keyframes glowPulse {
    0%, 100% { opacity: 0.55; filter: blur(0px); }
    50%       { opacity: 1;    filter: blur(1px); }
  }
  @keyframes fadeUp {
    from { opacity: 0; transform: translateY(22px); }
    to   { opacity: 1; transform: translateY(0); }
  }
`;

if (typeof document !== "undefined" && !document.getElementById("cert-anim-styles")) {
  const tag = document.createElement("style");
  tag.id = "cert-anim-styles";
  tag.textContent = STYLE;
  document.head.appendChild(tag);
}


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
          maxWidth: "900px",
          width: "100%",
          cursor: "default",
          animation: "fadeUp 0.3s ease forwards",
        }}
      >
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
        <img
          src={src}
          alt={title}
          style={{
            width: "100%",
            borderRadius: "14px",
            border: "1px solid rgba(124,58,237,0.4)",
            boxShadow: "0 32px 80px rgba(0,0,0,0.7), 0 0 0 1px rgba(124,58,237,0.15)",
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


function CertCard({ cert, delay, index, onImageClick }) {
  const [hovered, setHovered] = useState(false);
  const [imgHovered, setImgHovered] = useState(false);

  
  const floatAnim = `floatCard${index % 3}`;
 
  const floatDuration = [4.2, 5.1, 4.7][index % 3];

  return (
    <AnimatedSection delay={delay}>
      
      <div
        style={{
          animation: `${floatAnim} ${floatDuration}s ease-in-out infinite`,
          animationPlayState: hovered ? "paused" : "running",
         
          transition: "animation-play-state 0.4s",
          height: "100%",
        }}
      >
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
            transition: "background 0.3s ease, border 0.3s ease, box-shadow 0.3s ease",
            boxShadow: hovered
              ? `0 20px 50px rgba(0,0,0,0.35), 0 0 30px ${cert.color}22`
              : `0 8px 24px rgba(0,0,0,0.18)`,
            position: "relative",
          }}
        >
          
          <div style={{
            position: "absolute",
            top: 0, left: 0, right: 0,
            height: "2px",
            background: `linear-gradient(90deg, transparent, ${cert.color}cc, transparent)`,
            zIndex: 1,
            animation: `glowPulse ${floatDuration * 0.8}s ease-in-out infinite`,
          }} />

          
          <div
            onClick={() => onImageClick(cert)}
            onMouseEnter={() => setImgHovered(true)}
            onMouseLeave={() => setImgHovered(false)}
            style={{
              position: "relative",
              width: "100%",
              paddingBottom: "62%",
              overflow: "hidden",
              cursor: "zoom-in",
              background: "rgba(0,0,0,0.4)",
              flexShrink: 0,
            }}
          >
            <img
              src={cert.image}
              alt={cert.title}
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
            <div style={{
              position: "absolute",
              bottom: 0, left: 0, right: 0,
              height: "45%",
              background: "linear-gradient(to top, rgba(5,0,15,0.95), transparent)",
              pointerEvents: "none",
            }} />
          </div>

         
          <div style={{ padding: "1.3rem 1.4rem 1.5rem", flex: 1, display: "flex", flexDirection: "column" }}>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "0.75rem" }}>
              <span style={{ fontSize: "1.5rem" }}>{cert.emoji}</span>
              <div style={{
                display: "flex",
                alignItems: "center",
                gap: "0.3rem",
                background: "rgba(74,222,128,0.08)",
                border: "1px solid rgba(74,222,128,0.28)",
                borderRadius: "100px",
                padding: "0.18rem 0.55rem",
              }}>
                <div style={{ width: 5, height: 5, borderRadius: "50%", background: "#4ade80", boxShadow: "0 0 6px #4ade80" }} />
                <span style={{ fontFamily: "'DM Mono', monospace", fontSize: "0.58rem", color: "#4ade80", letterSpacing: "0.08em" }}>VERIFIED</span>
              </div>
            </div>

            <div style={{
              fontFamily: "'Syne', sans-serif",
              fontWeight: 700,
              fontSize: "1rem",
              color: "#fff",
              lineHeight: 1.35,
              marginBottom: "0.3rem",
            }}>
              {cert.title}
            </div>

            <div style={{ display: "flex", alignItems: "center", gap: "0.45rem", marginBottom: "0.75rem" }}>
              <span style={{ fontFamily: "'DM Mono', monospace", fontSize: "0.7rem", color: "#a78bfa" }}>{cert.issuer}</span>
              <span style={{ color: "rgba(255,255,255,0.2)", fontSize: "0.8rem" }}>·</span>
              <span style={{ fontFamily: "'DM Mono', monospace", fontSize: "0.68rem", color: "rgba(255,255,255,0.3)" }}>{cert.date}</span>
            </div>

            <p style={{
              fontFamily: "'DM Sans', sans-serif",
              fontSize: "0.83rem",
              color: "rgba(255,255,255,0.45)",
              lineHeight: 1.7,
              flex: 1,
              marginBottom: "1.1rem",
            }}>
              {cert.description}
            </p>

            <div style={{ display: "flex", gap: "0.6rem", flexWrap: "wrap" }}>
              <button
                onClick={() => onImageClick(cert)}
                style={{
                  fontFamily: "'DM Mono', monospace",
                  fontSize: "0.7rem",
                  color: "#c4b5fd",
                  background: "rgba(124,58,237,0.12)",
                  border: "1px solid rgba(124,58,237,0.35)",
                  padding: "0.4rem 0.85rem",
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
                🖼 View Photo
              </button>

              {cert.credentialUrl && (
                <a
                  href={cert.credentialUrl}
                  target="_blank"
                  rel="noreferrer"
                  style={{
                    fontFamily: "'DM Mono', monospace",
                    fontSize: "0.7rem",
                    color: "#c4b5fd",
                    textDecoration: "none",
                    background: "transparent",
                    border: "1px solid rgba(124,58,237,0.3)",
                    padding: "0.4rem 0.85rem",
                    borderRadius: "6px",
                    transition: "all 0.2s",
                    letterSpacing: "0.04em",
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.background = "rgba(124,58,237,0.15)";
                    e.currentTarget.style.borderColor = "#7c3aed";
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.background = "transparent";
                    e.currentTarget.style.borderColor = "rgba(124,58,237,0.3)";
                  }}
                >
                  Credential ↗
                </a>
              )}
            </div>
          </div>
        </div>
      </div>
    </AnimatedSection>
  );
}


export default function Certificates() {
  const [modalCert, setModalCert] = useState(null);

  return (
    <section id="certificates" style={{ padding: "7rem 6vw", background: "rgba(124,58,237,0.03)" }}>
      <div style={{ maxWidth: "1000px", margin: "0 auto" }}>

        <AnimatedSection>
          <div style={{ textAlign: "center", marginBottom: "4rem" }}>
            <div style={{
              fontFamily: "'DM Mono', monospace",
              fontSize: "0.78rem",
              color: "#a78bfa",
              letterSpacing: "0.16em",
              textTransform: "uppercase",
              marginBottom: "0.8rem",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              gap: "0.6rem",
            }}>
              <span style={{ width: 24, height: 1, background: "#7c3aed", display: "inline-block" }} />
              Certificates
              <span style={{ width: 24, height: 1, background: "#7c3aed", display: "inline-block" }} />
            </div>
            <h2 style={{
              fontFamily: "'Syne', sans-serif",
              fontWeight: 800,
              fontSize: "2.6rem",
              color: "#fff",
              letterSpacing: "-0.02em",
            }}>
              What I've <span style={{ color: "#7c3aed" }}>learned</span>
            </h2>
            <p style={{
              fontFamily: "'DM Sans', sans-serif",
              color: "rgba(255,255,255,0.4)",
              fontSize: "0.95rem",
              marginTop: "0.8rem",
            }}>
              Click any certificate to view it full screen
            </p>
          </div>
        </AnimatedSection>

        <div style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fill, minmax(290px, 1fr))",
          gap: "1.5rem",
         
          padding: "0.5rem 0.25rem 1rem",
        }}>
          {certificates.map((cert, i) => (
            <CertCard
              key={cert.id}
              cert={cert}
              delay={i * 100}
              index={i}
              onImageClick={setModalCert}
            />
          ))}
        </div>
      </div>

      {modalCert && (
        <ImageModal
          src={modalCert.image}
          title={modalCert.title}
          onClose={() => setModalCert(null)}
        />
      )}
    </section>
  );
}
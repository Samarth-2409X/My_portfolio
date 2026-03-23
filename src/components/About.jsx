import { useIntersection } from "../hooks/useIntersection";

export default function About() {
  const [ref, visible] = useIntersection();

  return (
    <section id="about" style={{ padding: "7rem 6vw", position: "relative" }}>
      <div
        ref={ref}
        style={{
          maxWidth: "900px",
          margin: "0 auto",
          display: "grid",
          gridTemplateColumns: "1fr 1.4fr",
          gap: "5rem",
          alignItems: "center",
          opacity: visible ? 1 : 0,
          transform: visible ? "none" : "translateY(40px)",
          transition: "all 0.8s ease",
        }}
      >
        {/* ── Photo Card ── */}
        <div style={{ position: "relative" }}>

          {/* Decorative background blur blob */}
          <div style={{
            position: "absolute",
            inset: "-20px",
            borderRadius: "24px",
            background: "radial-gradient(circle at 40% 40%, rgba(124,58,237,0.25), transparent 70%)",
            zIndex: 0,
            filter: "blur(16px)",
          }} />

          {/* Main card */}
          <div style={{
            position: "relative",
            zIndex: 1,
            borderRadius: "20px",
            overflow: "hidden",
            border: "1px solid rgba(124,58,237,0.35)",
            boxShadow: "0 24px 60px rgba(0,0,0,0.5), 0 0 0 1px rgba(124,58,237,0.1)",
            background: "#0a0015",
          }}>

            {/* Photo */}
            <div style={{ position: "relative", width: "100%", paddingBottom: "110%" }}>
              <img
                src="/samarth1.jpg"
                alt="Samarth Shirahatti"
                style={{
                  position: "absolute",
                  inset: 0,
                  width: "100%",
                  height: "100%",
                  objectFit: "cover",
                  objectPosition: "center top",
                  display: "block",
                }}
              />

              {/* Gradient overlay at bottom */}
              <div style={{
                position: "absolute",
                bottom: 0, left: 0, right: 0,
                height: "55%",
                background: "linear-gradient(to top, rgba(5,0,15,1) 0%, rgba(5,0,15,0.7) 50%, transparent 100%)",
              }} />

              {/* Purple shimmer top border */}
              <div style={{
                position: "absolute",
                top: 0, left: 0, right: 0,
                height: "2px",
                background: "linear-gradient(90deg, transparent, #7c3aed, #a78bfa, #7c3aed, transparent)",
              }} />

              {/* Name & role overlay on photo */}
              <div style={{
                position: "absolute",
                bottom: 0, left: 0, right: 0,
                padding: "1.5rem",
                zIndex: 2,
              }}>
                <div style={{
                  fontFamily: "'Syne', sans-serif",
                  fontWeight: 800,
                  fontSize: "1.15rem",
                  color: "#fff",
                  letterSpacing: "-0.01em",
                  marginBottom: "0.25rem",
                }}>
                  Samarth Shirahatti
                </div>
                <div style={{
                  fontFamily: "'DM Mono', monospace",
                  fontSize: "0.72rem",
                  color: "#a78bfa",
                  letterSpacing: "0.08em",
                  marginBottom: "0.9rem",
                }}>
                  Full Stack Developer
                </div>

                {/* Badges */}
                <div style={{ display: "flex", gap: "0.4rem", flexWrap: "wrap" }}>
                  {["🎓 KLE Tech", "📍 Hubli", "🚀 MERN"].map((b) => (
                    <span key={b} style={{
                      background: "rgba(124,58,237,0.25)",
                      border: "1px solid rgba(124,58,237,0.45)",
                      color: "rgba(255,255,255,0.8)",
                      fontSize: "0.65rem",
                      padding: "0.2rem 0.55rem",
                      borderRadius: "100px",
                      fontFamily: "'DM Sans', sans-serif",
                      fontWeight: 500,
                      backdropFilter: "blur(4px)",
                    }}>{b}</span>
                  ))}
                </div>
              </div>
            </div>

            {/* Stats bar below photo */}
            <div style={{
              display: "grid",
              gridTemplateColumns: "1fr 1fr 1fr",
              borderTop: "1px solid rgba(124,58,237,0.2)",
            }}>
              {[["10+", "Repos"], ["MERN", "Stack"], ["DSA", "Problem Solver"]].map(([val, label], i) => (
                <div key={label} style={{
                  padding: "0.9rem 0",
                  textAlign: "center",
                  borderRight: i < 2 ? "1px solid rgba(124,58,237,0.2)" : "none",
                  background: "rgba(124,58,237,0.04)",
                }}>
                  <div style={{
                    fontFamily: "'Syne', sans-serif",
                    fontWeight: 800,
                    fontSize: "1.1rem",
                    color: "#a78bfa",
                  }}>{val}</div>
                  <div style={{
                    fontFamily: "'DM Mono', monospace",
                    fontSize: "0.6rem",
                    color: "rgba(255,255,255,0.35)",
                    textTransform: "uppercase",
                    letterSpacing: "0.08em",
                    marginTop: "0.15rem",
                  }}>{label}</div>
                </div>
              ))}
            </div>
          </div>

          {/* Decorative corner squares */}
          <div style={{
            position: "absolute", bottom: "-14px", right: "-14px",
            width: "50px", height: "50px",
            border: "2px solid rgba(124,58,237,0.4)",
            borderRadius: "8px", zIndex: 0,
          }} />
          <div style={{
            position: "absolute", top: "-10px", left: "-10px",
            width: "28px", height: "28px",
            border: "2px solid rgba(124,58,237,0.25)",
            borderRadius: "4px", zIndex: 0,
          }} />
        </div>

        {/* ── Text Side ── */}
        <div>
          {/* Label */}
          <div style={{
            fontFamily: "'DM Mono', monospace",
            fontSize: "0.78rem",
            color: "#a78bfa",
            letterSpacing: "0.16em",
            textTransform: "uppercase",
            marginBottom: "1rem",
            display: "flex",
            alignItems: "center",
            gap: "0.6rem",
          }}>
            <span style={{ width: "24px", height: "1px", background: "#7c3aed", display: "inline-block" }} />
            About Me
          </div>

          {/* Heading */}
          <h2 style={{
            fontFamily: "'Syne', sans-serif",
            fontWeight: 800,
            fontSize: "2.4rem",
            color: "#fff",
            letterSpacing: "-0.02em",
            lineHeight: 1.1,
            marginBottom: "1.5rem",
          }}>
            Building things that<br />
            <span style={{ color: "#7c3aed" }}>matter.</span>
          </h2>

          {/* Bio */}
          <p style={{
            fontFamily: "'DM Sans', sans-serif",
            color: "rgba(255,255,255,0.55)",
            lineHeight: 1.8,
            fontSize: "0.98rem",
            marginBottom: "1.2rem",
          }}>
            Hey! I'm Samarth — a Full Stack Developer and MERN Stack enthusiast
            studying at KLE Tech University, Hubli. I'm passionate about turning
            ideas into real, working products that solve real problems.
          </p>
          <p style={{
            fontFamily: "'DM Sans', sans-serif",
            color: "rgba(255,255,255,0.55)",
            lineHeight: 1.8,
            fontSize: "0.98rem",
            marginBottom: "2rem",
          }}>
            Currently sharpening my Data Structures & Algorithms skills while
            building ExileDraw, a real-time chat application with Next.js, focused on scalable systems, clean architecture, and smooth real-time interactions.
          </p>

          {/* Social links */}
          <div style={{ display: "flex", gap: "0.75rem", marginBottom: "2rem" }}>
            {[
              { label: "GitHub", url: "https://github.com/Samarth-2409X" },
              { label: "LinkedIn", url: "https://www.linkedin.com/in/samarth-shirahatti-9bb8962a3/" },
              { label: "Email", url: "mailto:samarthgone667@gmail.com" },
            ].map((s) => (
              <a key={s.label} href={s.url} target="_blank" rel="noreferrer"
                style={{
                  fontFamily: "'DM Mono', monospace",
                  fontSize: "0.72rem",
                  color: "#c4b5fd",
                  textDecoration: "none",
                  border: "1px solid rgba(124,58,237,0.3)",
                  padding: "0.4rem 0.9rem",
                  borderRadius: "6px",
                  transition: "all 0.2s",
                  letterSpacing: "0.05em",
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.background = "rgba(124,58,237,0.15)";
                  e.currentTarget.style.borderColor = "#7c3aed";
                  e.currentTarget.style.transform = "translateY(-2px)";
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.background = "transparent";
                  e.currentTarget.style.borderColor = "rgba(124,58,237,0.3)";
                  e.currentTarget.style.transform = "none";
                }}
              >
                {s.label} ↗
              </a>
            ))}
          </div>

          {/* What I'm doing now */}
          <div style={{
            background: "rgba(124,58,237,0.06)",
            border: "1px solid rgba(124,58,237,0.2)",
            borderRadius: "12px",
            padding: "1.2rem 1.4rem",
            borderLeft: "3px solid #7c3aed",
          }}>
            <div style={{
              fontFamily: "'DM Mono', monospace",
              fontSize: "0.68rem",
              color: "#7c3aed",
              letterSpacing: "0.12em",
              textTransform: "uppercase",
              marginBottom: "0.6rem",
            }}>
              Currently
            </div>
            <div style={{ display: "flex", flexDirection: "column", gap: "0.4rem" }}>
              {[
                " Developing ExileDraw, a real-time chat application using Next.js",
                " Practicing Data Structures & Algorithms (200+ LeetCode problems solved)",
                " Open to collaboration on scalable MERN stack projects",
              ].map((item) => (
                <div key={item} style={{
                  fontFamily: "'DM Sans', sans-serif",
                  fontSize: "0.88rem",
                  color: "rgba(255,255,255,0.6)",
                  lineHeight: 1.5,
                }}>{item}</div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
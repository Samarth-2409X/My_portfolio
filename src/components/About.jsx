import { useEffect, useRef, useState } from "react";

// ── Intersection hook ─────────────────────────────────────────
function useInView(threshold = 0.15) {
  const ref = useRef(null);
  const [visible, setVisible] = useState(false);
  useEffect(() => {
    const obs = new IntersectionObserver(
      ([e]) => { if (e.isIntersecting) { setVisible(true); obs.disconnect(); } },
      { threshold }
    );
    if (ref.current) obs.observe(ref.current);
    return () => obs.disconnect();
  }, [threshold]);
  return [ref, visible];
}

// ── Animated counter ──────────────────────────────────────────
function Counter({ target, suffix = "", start }) {
  const [val, setVal] = useState(0);
  useEffect(() => {
    if (!start) return;
    let current = 0;
    const isNum = !isNaN(parseInt(target));
    if (!isNum) { setVal(target); return; }
    const end = parseInt(target);
    const step = Math.ceil(end / 40);
    const iv = setInterval(() => {
      current += step;
      if (current >= end) { setVal(end); clearInterval(iv); }
      else setVal(current);
    }, 40);
    return () => clearInterval(iv);
  }, [start, target]);
  if (isNaN(parseInt(target))) return <span>{target}</span>;
  return <span>{val}{suffix}</span>;
}

// ── Photo card with 3D tilt ───────────────────────────────────
function PhotoCard({ visible }) {
  const cardRef = useRef(null);
  const glowRef = useRef(null);

  const onMove = (e) => {
    const card = cardRef.current;
    if (!card) return;
    const r = card.getBoundingClientRect();
    const x = (e.clientX - r.left) / r.width  - 0.5;
    const y = (e.clientY - r.top)  / r.height - 0.5;
    card.style.transform = `perspective(800px) rotateY(${x * 14}deg) rotateX(${-y * 10}deg) scale(1.02)`;
    // Move glow with cursor
    if (glowRef.current) {
      glowRef.current.style.left = `${(x + 0.5) * 100}%`;
      glowRef.current.style.top  = `${(y + 0.5) * 100}%`;
      glowRef.current.style.opacity = "1";
    }
  };
  const onLeave = () => {
    if (cardRef.current) cardRef.current.style.transform = "perspective(800px) rotateY(0deg) rotateX(0deg) scale(1)";
    if (glowRef.current) glowRef.current.style.opacity = "0";
  };

  const stats = [
    { val: "10", suffix: "+", label: "Repos" },
    { val: "MERN",             label: "Stack" },
    { val: "DSA",              label: "Problem Solver" },
  ];

  return (
    <div style={{ position:"relative", maxWidth:"380px", margin:"0 auto", width:"100%" }}>

      {/* Floating particles behind card */}
      {[...Array(6)].map((_, i) => (
        <div key={i} style={{
          position: "absolute",
          width: `${Math.random() * 6 + 3}px`,
          height: `${Math.random() * 6 + 3}px`,
          borderRadius: "50%",
          background: i % 2 === 0 ? "#7c3aed" : "#a78bfa",
          left:  `${[-15, 105, 20, 90, -10, 110][i]}%`,
          top:   `${[20,  10,  80, 70,  50,  45][i]}%`,
          opacity: visible ? 0.5 : 0,
          animation: `floatPt ${3 + i * 0.5}s ease-in-out ${i * 0.3}s infinite alternate`,
          transition: `opacity 0.6s ease ${i * 0.1}s`,
          pointerEvents: "none",
          zIndex: 0,
        }} />
      ))}

      {/* Outer glow blob */}
      <div style={{
        position: "absolute", inset: "-24px", borderRadius: "28px",
        background: "radial-gradient(circle at 40% 40%, rgba(124,58,237,0.3), transparent 70%)",
        zIndex: 0, filter: "blur(18px)",
        opacity: visible ? 1 : 0,
        transition: "opacity 1s ease 0.3s",
        animation: visible ? "blobPulse 4s ease-in-out infinite" : "none",
      }} />

      {/* Main card */}
      <div
        ref={cardRef}
        onMouseMove={onMove}
        onMouseLeave={onLeave}
        style={{
          position: "relative", zIndex: 1,
          borderRadius: "20px", overflow: "hidden",
          border: "1px solid rgba(124,58,237,0.35)",
          boxShadow: "0 24px 60px rgba(0,0,0,0.5), 0 0 0 1px rgba(124,58,237,0.1)",
          background: "#0a0015",
          transformStyle: "preserve-3d",
          transition: "transform 0.4s cubic-bezier(.23,1,.32,1), box-shadow 0.4s",
          opacity: visible ? 1 : 0,
          transform: visible ? "none" : "translateY(30px)",
          willChange: "transform",
        }}
      >
        {/* Cursor-follow glow */}
        <div ref={glowRef} style={{
          position: "absolute", zIndex: 3, pointerEvents: "none",
          width: "160px", height: "160px",
          borderRadius: "50%",
          background: "radial-gradient(circle, rgba(124,58,237,0.25), transparent 70%)",
          transform: "translate(-50%, -50%)",
          opacity: 0,
          transition: "opacity 0.3s",
          left: "50%", top: "50%",
        }} />

        {/* Photo */}
        <div style={{ position:"relative", width:"100%", paddingBottom:"110%" }}>
          <img
            src="/samarth1.jpg"
            alt="Samarth Shirahatti"
            style={{
              position: "absolute", inset: 0,
              width: "100%", height: "100%",
              objectFit: "cover", objectPosition: "center top",
              display: "block",
              filter: visible ? "none" : "blur(8px) grayscale(0.5)",
              transition: "filter 0.8s ease 0.4s",
            }}
          />

          {/* Gradient overlay */}
          <div style={{ position:"absolute", bottom:0, left:0, right:0, height:"55%", background:"linear-gradient(to top,rgba(5,0,15,1) 0%,rgba(5,0,15,0.7) 50%,transparent 100%)" }} />

          {/* Shimmer top line */}
          <div style={{
            position: "absolute", top: 0, left: 0, right: 0, height: "2px",
            background: "linear-gradient(90deg,transparent,#7c3aed,#a78bfa,#7c3aed,transparent)",
            animation: "shimmerLine 3s ease-in-out infinite",
          }} />

          {/* Name overlay */}
          <div style={{ position:"absolute", bottom:0, left:0, right:0, padding:"1.2rem", zIndex:2 }}>
            <div style={{
              fontFamily: "'Syne',sans-serif", fontWeight: 800, fontSize: "1.1rem", color: "#fff",
              marginBottom: "0.2rem",
              transform: visible ? "translateY(0)" : "translateY(20px)",
              opacity: visible ? 1 : 0,
              transition: "all 0.6s ease 0.6s",
            }}>
              Samarth Shirahatti
            </div>
            <div style={{
              fontFamily: "'DM Mono',monospace", fontSize: "0.7rem", color: "#a78bfa",
              letterSpacing: "0.08em", marginBottom: "0.7rem",
              transform: visible ? "translateY(0)" : "translateY(20px)",
              opacity: visible ? 1 : 0,
              transition: "all 0.6s ease 0.75s",
            }}>
              Full Stack Developer
            </div>
            <div style={{
              display: "flex", gap: "0.4rem", flexWrap: "wrap",
              transform: visible ? "translateY(0)" : "translateY(20px)",
              opacity: visible ? 1 : 0,
              transition: "all 0.6s ease 0.9s",
            }}>
              {["🎓 KLE Tech", "📍 Hubli", "🚀 MERN"].map((b, i) => (
                <span key={b} style={{
                  background: "rgba(124,58,237,0.25)",
                  border: "1px solid rgba(124,58,237,0.45)",
                  color: "rgba(255,255,255,0.85)",
                  fontSize: "0.62rem",
                  padding: "0.2rem 0.55rem",
                  borderRadius: "100px",
                  fontFamily: "'DM Sans',sans-serif",
                  fontWeight: 500,
                  transform: visible ? "scale(1)" : "scale(0.8)",
                  opacity: visible ? 1 : 0,
                  transition: `all 0.4s ease ${0.95 + i * 0.1}s`,
                  display: "inline-block",
                }}>{b}</span>
              ))}
            </div>
          </div>
        </div>

        {/* Stats bar with counters */}
        <div style={{ display:"grid", gridTemplateColumns:"1fr 1fr 1fr", borderTop:"1px solid rgba(124,58,237,0.2)" }}>
          {stats.map(({ val, suffix, label }, i) => (
            <div key={label} style={{
              padding: "0.9rem 0", textAlign: "center",
              borderRight: i < 2 ? "1px solid rgba(124,58,237,0.2)" : "none",
              background: "rgba(124,58,237,0.04)",
              transition: `background 0.3s`,
            }}
              onMouseEnter={e => { e.currentTarget.style.background = "rgba(124,58,237,0.1)"; }}
              onMouseLeave={e => { e.currentTarget.style.background = "rgba(124,58,237,0.04)"; }}
            >
              <div style={{ fontFamily:"'Syne',sans-serif", fontWeight:800, fontSize:"1rem", color:"#a78bfa" }}>
                <Counter target={val} suffix={suffix || ""} start={visible} />
              </div>
              <div style={{ fontFamily:"'DM Mono',monospace", fontSize:"0.55rem", color:"rgba(255,255,255,0.3)", textTransform:"uppercase", letterSpacing:"0.08em", marginTop:"0.15rem" }}>
                {label}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Decorative corners */}
      <div style={{ position:"absolute", bottom:"-14px", right:"-14px", width:"50px", height:"50px", border:"2px solid rgba(124,58,237,0.4)", borderRadius:"8px", zIndex:0, opacity:visible?1:0, transition:"opacity 0.6s ease 0.5s", animation:visible?"cornerFloat 3s ease-in-out infinite":"none" }} />
      <div style={{ position:"absolute", top:"-10px", left:"-10px", width:"28px", height:"28px", border:"2px solid rgba(124,58,237,0.25)", borderRadius:"4px", zIndex:0, opacity:visible?1:0, transition:"opacity 0.6s ease 0.6s" }} />

      <style>{`
        @keyframes floatPt   { from{transform:translateY(0) scale(1)} to{transform:translateY(-14px) scale(1.2)} }
        @keyframes blobPulse { 0%,100%{opacity:.7;transform:scale(1)} 50%{opacity:1;transform:scale(1.04)} }
        @keyframes shimmerLine { 0%,100%{backgroundPosition:"-200% 0"} 50%{backgroundPosition:"200% 0"} }
        @keyframes cornerFloat { 0%,100%{transform:translate(0,0)} 50%{transform:translate(3px,-3px)} }
        @keyframes slideInLeft { from{opacity:0;transform:translateX(-30px)} to{opacity:1;transform:translateX(0)} }
        @keyframes slideInRight { from{opacity:0;transform:translateX(30px)} to{opacity:1;transform:translateX(0)} }
        @keyframes tagPop { from{opacity:0;transform:scale(0.7) translateY(8px)} to{opacity:1;transform:scale(1) translateY(0)} }
        @keyframes lineGrow { from{width:0} to{width:24px} }
        @keyframes currentPulse { 0%,100%{box-shadow:0 0 0 0 rgba(124,58,237,0.3)} 50%{box-shadow:0 0 0 6px rgba(124,58,237,0)} }
      `}</style>
    </div>
  );
}

// ── Staggered text block ──────────────────────────────────────
function TextSide({ visible }) {
  const items = [
    "Hey! I'm Samarth — a Full Stack Developer and MERN Stack enthusiast studying at KLE Tech University, Hubli. I'm passionate about turning ideas into real, scalable products that solve meaningful problems.",
    "I've solved 200+ LeetCode problems, strengthening my foundation in Data Structures & Algorithms, and I continuously work on improving my problem-solving skills.",
    "Currently, I'm building ExileDraw, a real-time chat application with Next.js, focused on scalable systems, clean architecture, and smooth real-time interactions.",
  ];

  const socials = [
    { label: "GitHub",   url: "https://github.com/Samarth-2409X" },
    { label: "LinkedIn", url: "https://www.linkedin.com/in/samarth-shirahatti-9bb8962a3/" },
    { label: "Email",    url: "mailto:samarthgone667@gmail.com" },
  ];

  const currently = [
    "🔭 Building ExileDraw, a real-time chat application",
    "🌱 Solved 200+ LeetCode problems and actively improving DSA",
    "👯 Open to collaboration on scalable MERN stack projects",
  ];

  return (
    <div>
      {/* Label */}
      <div style={{
        fontFamily: "'DM Mono',monospace", fontSize: "0.78rem", color: "#a78bfa",
        letterSpacing: "0.16em", textTransform: "uppercase", marginBottom: "1rem",
        display: "flex", alignItems: "center", gap: "0.6rem",
        opacity: visible ? 1 : 0,
        transition: "opacity 0.6s ease 0.1s",
      }}>
        <span style={{
          height: "1px", background: "#7c3aed", display: "inline-block",
          width: visible ? "24px" : "0px",
          transition: "width 0.5s ease 0.2s",
        }} />
        About Me
      </div>

      {/* Heading — word by word reveal */}
      <h2 style={{
        fontFamily: "'Syne',sans-serif", fontWeight: 800,
        fontSize: "clamp(1.8rem,5vw,2.4rem)", color: "#fff",
        letterSpacing: "-0.02em", lineHeight: 1.1, marginBottom: "1.4rem",
        overflow: "hidden",
      }}>
        {["Building", "things", "that"].map((word, i) => (
          <span key={word} style={{
            display: "inline-block", marginRight: "0.3em",
            opacity: visible ? 1 : 0,
            transform: visible ? "translateY(0)" : "translateY(40px)",
            transition: `opacity 0.5s ease ${0.2 + i * 0.08}s, transform 0.5s ease ${0.2 + i * 0.08}s`,
          }}>{word}</span>
        ))}
        <br />
        <span style={{
          color: "#7c3aed",
          display: "inline-block",
          opacity: visible ? 1 : 0,
          transform: visible ? "translateY(0) scale(1)" : "translateY(40px) scale(0.9)",
          transition: "opacity 0.5s ease 0.48s, transform 0.5s ease 0.48s",
        }}>
          matter.
        </span>
      </h2>

      {/* Paragraphs — staggered fade up */}
      {items.map((text, i) => (
        <p key={i} style={{
          fontFamily: "'DM Sans',sans-serif",
          color: "rgba(255,255,255,0.55)",
          lineHeight: 1.8, fontSize: "0.95rem",
          marginBottom: "1.1rem",
          opacity: visible ? 1 : 0,
          transform: visible ? "translateY(0)" : "translateY(24px)",
          transition: `opacity 0.6s ease ${0.5 + i * 0.12}s, transform 0.6s ease ${0.5 + i * 0.12}s`,
        }}>
          {text}
        </p>
      ))}

      {/* Social links — pop in */}
      <div style={{ display:"flex", gap:"0.7rem", flexWrap:"wrap", marginBottom:"1.8rem" }}>
        {socials.map((s, i) => (
          <a key={s.label} href={s.url} target="_blank" rel="noreferrer"
            style={{
              fontFamily: "'DM Mono',monospace", fontSize: "0.72rem",
              color: "#c4b5fd", textDecoration: "none",
              border: "1px solid rgba(124,58,237,0.3)",
              padding: "0.4rem 0.9rem", borderRadius: "6px",
              transition: "all 0.2s",
              opacity: visible ? 1 : 0,
              transform: visible ? "translateY(0)" : "translateY(16px)",
              display: "inline-block",
              animationDelay: `${0.8 + i * 0.1}s`,
              transitionDelay: `${0.8 + i * 0.1}s`,
            }}
            onMouseEnter={e => {
              e.currentTarget.style.background    = "rgba(124,58,237,0.15)";
              e.currentTarget.style.borderColor   = "#7c3aed";
              e.currentTarget.style.transform     = "translateY(-3px)";
              e.currentTarget.style.boxShadow     = "0 4px 16px rgba(124,58,237,0.2)";
            }}
            onMouseLeave={e => {
              e.currentTarget.style.background    = "transparent";
              e.currentTarget.style.borderColor   = "rgba(124,58,237,0.3)";
              e.currentTarget.style.transform     = "translateY(0)";
              e.currentTarget.style.boxShadow     = "none";
            }}
          >
            {s.label} ↗
          </a>
        ))}
      </div>

      {/* Currently card — slides in from right */}
      <div style={{
        background: "rgba(124,58,237,0.06)",
        border: "1px solid rgba(124,58,237,0.2)",
        borderRadius: "12px",
        padding: "1.2rem 1.4rem",
        borderLeft: "3px solid #7c3aed",
        opacity: visible ? 1 : 0,
        transform: visible ? "translateX(0)" : "translateX(30px)",
        transition: "opacity 0.7s ease 1s, transform 0.7s ease 1s",
        animation: visible ? "currentPulse 3s ease-in-out 1.5s infinite" : "none",
      }}>
        <div style={{
          fontFamily: "'DM Mono',monospace", fontSize: "0.68rem",
          color: "#7c3aed", letterSpacing: "0.12em", textTransform: "uppercase",
          marginBottom: "0.7rem",
          display: "flex", alignItems: "center", gap: "0.5rem",
        }}>
          <span style={{ width:6, height:6, borderRadius:"50%", background:"#7c3aed", display:"inline-block", boxShadow:"0 0 6px #7c3aed", animation:"blobPulse 1.5s ease-in-out infinite" }} />
          Currently
        </div>
        {currently.map((item, i) => (
          <div key={item} style={{
            fontFamily: "'DM Sans',sans-serif",
            fontSize: "0.85rem",
            color: "rgba(255,255,255,0.6)",
            lineHeight: 1.6, marginBottom: "0.35rem",
            paddingLeft: "0.5rem",
            borderLeft: "1px solid rgba(124,58,237,0.15)",
            opacity: visible ? 1 : 0,
            transform: visible ? "translateX(0)" : "translateX(16px)",
            transition: `opacity 0.5s ease ${1.1 + i * 0.1}s, transform 0.5s ease ${1.1 + i * 0.1}s`,
          }}>
            {item}
          </div>
        ))}
      </div>
    </div>
  );
}

// ── Main About section ────────────────────────────────────────
export default function About() {
  const [sectionRef, visible] = useInView(0.1);

  return (
    <section id="about" style={{ padding:"5rem 6vw", position:"relative", overflow:"hidden" }}>

      {/* Big bg text */}
      <div style={{
        position: "absolute", left: "-2%", top: "50%", transform: "translateY(-50%)",
        fontSize: "clamp(80px,14vw,180px)", fontWeight: 800,
        color: "transparent", WebkitTextStroke: "1px rgba(124,58,237,0.05)",
        userSelect: "none", pointerEvents: "none", lineHeight: 1,
        fontFamily: "'Syne',sans-serif", letterSpacing: -6,
        opacity: visible ? 1 : 0, transition: "opacity 1s ease 0.5s",
      }}>
        ABOUT
      </div>

      <div
        ref={sectionRef}
        style={{ maxWidth:"920px", margin:"0 auto", position:"relative", zIndex:1 }}
      >
        <div style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit,minmax(280px,1fr))",
          gap: "3rem",
          alignItems: "start",
        }}>
          <PhotoCard visible={visible} />
          <TextSide visible={visible} />
        </div>
      </div>
    </section>
  );
}
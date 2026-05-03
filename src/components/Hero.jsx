import { useState, useEffect, useRef } from "react";

// ── 1. CUSTOM CURSOR ─────────────────────────────────────────
function CustomCursor() {
  const cursorRef = useRef(null);
  const followerRef = useRef(null);
  const pos = useRef({ x: 0, y: 0 });
  const follower = useRef({ x: 0, y: 0 });

  useEffect(() => {
    const move = (e) => {
      pos.current = { x: e.clientX, y: e.clientY };
      if (cursorRef.current) {
        cursorRef.current.style.left = e.clientX + "px";
        cursorRef.current.style.top = e.clientY + "px";
      }
    };

    const animate = () => {
      follower.current.x += (pos.current.x - follower.current.x) * 0.12;
      follower.current.y += (pos.current.y - follower.current.y) * 0.12;
      if (followerRef.current) {
        followerRef.current.style.left = follower.current.x + "px";
        followerRef.current.style.top = follower.current.y + "px";
      }
      requestAnimationFrame(animate);
    };

    // Grow cursor on hoverable elements
    const onEnter = () => {
      if (cursorRef.current) { cursorRef.current.style.transform = "translate(-50%,-50%) scale(2.5)"; cursorRef.current.style.background = "rgba(124,58,237,0.3)"; cursorRef.current.style.borderColor = "#a78bfa"; }
      if (followerRef.current) { followerRef.current.style.transform = "translate(-50%,-50%) scale(1.8)"; }
    };
    const onLeave = () => {
      if (cursorRef.current) { cursorRef.current.style.transform = "translate(-50%,-50%) scale(1)"; cursorRef.current.style.background = "transparent"; cursorRef.current.style.borderColor = "#7c3aed"; }
      if (followerRef.current) { followerRef.current.style.transform = "translate(-50%,-50%) scale(1)"; }
    };

    window.addEventListener("mousemove", move);
    document.querySelectorAll("button, a, [data-hover]").forEach(el => {
      el.addEventListener("mouseenter", onEnter);
      el.addEventListener("mouseleave", onLeave);
    });
    animate();

    return () => { window.removeEventListener("mousemove", move); };
  }, []);

  return (
    <>
      {/* Main dot cursor */}
      <div ref={cursorRef} style={{
        position: "fixed", zIndex: 99999, pointerEvents: "none",
        width: "10px", height: "10px", borderRadius: "50%",
        background: "#7c3aed",
        left: 0, top: 0,
        transform: "translate(-50%,-50%)",
        transition: "transform 0.15s ease, background 0.2s, border-color 0.2s",
        mixBlendMode: "screen",
      }} className="custom-cursor-dot" />

      {/* Follower ring */}
      <div ref={followerRef} style={{
        position: "fixed", zIndex: 99998, pointerEvents: "none",
        width: "36px", height: "36px", borderRadius: "50%",
        border: "1.5px solid rgba(124,58,237,0.5)",
        left: 0, top: 0,
        transform: "translate(-50%,-50%)",
        transition: "transform 0.3s ease",
        backdropFilter: "blur(1px)",
      }} className="custom-cursor-ring" />

      <style>{`
        @media (max-width: 768px) {
          .custom-cursor-dot, .custom-cursor-ring { display: none !important; }
        }
        body { cursor: none; }
        @media (max-width: 768px) { body { cursor: auto; } }
      `}</style>
    </>
  );
}

// ── 2. SMOOTH PAGE LOADER ────────────────────────────────────
function PageLoader({ onDone }) {
  const [progress, setProgress] = useState(0);
  const [leaving, setLeaving] = useState(false);

  useEffect(() => {
    const interval = setInterval(() => {
      setProgress(prev => {
        if (prev >= 100) {
          clearInterval(interval);
          setTimeout(() => { setLeaving(true); setTimeout(onDone, 600); }, 200);
          return 100;
        }
        return prev + Math.random() * 18 + 5;
      });
    }, 80);
    return () => clearInterval(interval);
  }, []);

  return (
    <div style={{
      position: "fixed", inset: 0, zIndex: 99997,
      background: "#05000f",
      display: "flex", flexDirection: "column",
      alignItems: "center", justifyContent: "center",
      opacity: leaving ? 0 : 1,
      transition: "opacity 0.6s ease",
      pointerEvents: leaving ? "none" : "all",
    }}>
      {/* Logo */}
      <div style={{
        fontFamily: "'Syne', sans-serif",
        fontWeight: 800,
        fontSize: "2.5rem",
        color: "#fff",
        letterSpacing: "-0.03em",
        marginBottom: "2.5rem",
        opacity: 0,
        animation: "fadeUp 0.5s ease 0.1s forwards",
      }}>
        <span style={{ color: "#7c3aed" }}>S</span>amarth.dev
      </div>

      {/* Progress bar */}
      <div style={{
        width: "200px", height: "2px",
        background: "rgba(124,58,237,0.2)",
        borderRadius: "10px",
        overflow: "hidden",
        marginBottom: "1rem",
      }}>
        <div style={{
          height: "100%",
          width: `${Math.min(progress, 100)}%`,
          background: "linear-gradient(90deg, #5b21b6, #7c3aed, #a78bfa)",
          borderRadius: "10px",
          transition: "width 0.1s ease",
          boxShadow: "0 0 10px rgba(124,58,237,0.8)",
        }} />
      </div>

      {/* Percentage */}
      <div style={{
        fontFamily: "'DM Mono', monospace",
        fontSize: "0.72rem",
        color: "rgba(124,58,237,0.7)",
        letterSpacing: "0.12em",
      }}>
        {Math.min(Math.round(progress), 100)}%
      </div>

      {/* Decorative dots */}
      <div style={{ position: "absolute", inset: 0, overflow: "hidden", pointerEvents: "none" }}>
        {[...Array(6)].map((_, i) => (
          <div key={i} style={{
            position: "absolute",
            width: Math.random() * 3 + 1 + "px",
            height: Math.random() * 3 + 1 + "px",
            borderRadius: "50%",
            background: "#7c3aed",
            left: Math.random() * 100 + "%",
            top: Math.random() * 100 + "%",
            opacity: Math.random() * 0.5 + 0.2,
            animation: `floatLbl ${3 + i}s ease-in-out ${i * 0.5}s infinite alternate`,
          }} />
        ))}
      </div>
    </div>
  );
}

// ── 3. PARTICLE CANVAS ───────────────────────────────────────
function ParticleCanvas() {
  const canvasRef = useRef(null);
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    let W = (canvas.width = window.innerWidth);
    let H = (canvas.height = window.innerHeight);
    let animId;
    const COLORS = ["#7c3aed", "#a78bfa", "#c4b5fd", "#5b21b6", "#8b5cf6"];
    const count = W < 768 ? 25 : 55;
    const pts = Array.from({ length: count }, () => ({
      x: Math.random() * W, y: Math.random() * H,
      r: Math.random() * 2 + 0.5,
      vx: (Math.random() - 0.5) * 0.4, vy: (Math.random() - 0.5) * 0.4,
      color: COLORS[Math.floor(Math.random() * COLORS.length)],
      op: Math.random() * 0.6 + 0.2,
    }));
    let mouse = { x: W / 2, y: H / 2 };
    const onMove = e => { mouse.x = e.clientX; mouse.y = e.clientY; };
    window.addEventListener("mousemove", onMove);
    const draw = () => {
      ctx.clearRect(0, 0, W, H);
      for (const p of pts) {
        p.x += p.vx; p.y += p.vy;
        if (p.x < 0 || p.x > W) p.vx *= -1;
        if (p.y < 0 || p.y > H) p.vy *= -1;
        ctx.beginPath(); ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
        ctx.fillStyle = p.color; ctx.globalAlpha = p.op; ctx.fill();
      }
      ctx.globalAlpha = 1;
      for (let i = 0; i < pts.length; i++) {
        for (let j = i + 1; j < pts.length; j++) {
          const dx = pts[i].x - pts[j].x, dy = pts[i].y - pts[j].y;
          const d = Math.sqrt(dx * dx + dy * dy);
          if (d < 120) {
            ctx.beginPath(); ctx.moveTo(pts[i].x, pts[i].y); ctx.lineTo(pts[j].x, pts[j].y);
            ctx.strokeStyle = "#7c3aed"; ctx.globalAlpha = (1 - d / 120) * 0.18; ctx.lineWidth = 0.8; ctx.stroke();
          }
        }
        if (W >= 768) {
          const mx = pts[i].x - mouse.x, my = pts[i].y - mouse.y;
          const md = Math.sqrt(mx * mx + my * my);
          if (md < 160) {
            ctx.beginPath(); ctx.moveTo(pts[i].x, pts[i].y); ctx.lineTo(mouse.x, mouse.y);
            ctx.strokeStyle = "#a78bfa"; ctx.globalAlpha = (1 - md / 160) * 0.3; ctx.lineWidth = 1; ctx.stroke();
          }
        }
      }
      ctx.globalAlpha = 1;
      animId = requestAnimationFrame(draw);
    };
    draw();
    const onResize = () => { W = canvas.width = window.innerWidth; H = canvas.height = window.innerHeight; };
    window.addEventListener("resize", onResize);
    return () => { cancelAnimationFrame(animId); window.removeEventListener("mousemove", onMove); window.removeEventListener("resize", onResize); };
  }, []);
  return <canvas ref={canvasRef} style={{ position: "absolute", inset: 0, pointerEvents: "none", zIndex: 0 }} />;
}

// ── 4. GLOW ORB ──────────────────────────────────────────────
function GlowOrb() {
  const labels = [
    { text: "React", angle: 0, r: 195 },
    { text: "Node.js", angle: 72, r: 190 },
    { text: "MongoDB", angle: 144, r: 198 },
    { text: "TypeScript", angle: 216, r: 192 },
    { text: "Express", angle: 288, r: 196 },
  ];
  return (
    <div className="glow-orb" style={{ position: "absolute", top: "50%", right: "7vw", transform: "translateY(-50%)", width: 320, height: 320, zIndex: 1, pointerEvents: "none", animation: "orbFloat 6s ease-in-out infinite" }}>
      <div style={{ position: "absolute", inset: -30, borderRadius: "50%", background: "radial-gradient(circle,rgba(109,40,217,.35) 0%,transparent 70%)", animation: "orbPulse 4s ease-in-out infinite" }} />
      <div style={{ position: "absolute", inset: 0, borderRadius: "50%", background: "radial-gradient(circle at 35% 35%,rgba(167,139,250,.5),rgba(109,40,217,.65) 50%,rgba(5,0,15,.85))", boxShadow: "0 0 60px rgba(124,58,237,.5),0 0 120px rgba(124,58,237,.2),inset 0 0 40px rgba(167,139,250,.15)", animation: "orbMorph 8s ease-in-out infinite" }} />
      <div style={{ position: "absolute", top: "18%", left: "22%", width: "35%", height: "30%", borderRadius: "50%", background: "radial-gradient(circle,rgba(255,255,255,.18),transparent)" }} />
      <div style={{ position: "absolute", inset: -22, borderRadius: "50%", animation: "orbit 5s linear infinite" }}>
        <div style={{ position: "absolute", top: "8%", left: "50%", width: 10, height: 10, borderRadius: "50%", background: "#c4b5fd", boxShadow: "0 0 12px #a78bfa", transform: "translateX(-50%)" }} />
      </div>
      <div style={{ position: "absolute", inset: -52, borderRadius: "50%", animation: "orbit 9s linear infinite reverse" }}>
        <div style={{ position: "absolute", top: 0, left: "50%", width: 6, height: 6, borderRadius: "50%", background: "#7c3aed", boxShadow: "0 0 8px #7c3aed", transform: "translateX(-50%)" }} />
      </div>
      {labels.map(({ text, angle, r }, i) => {
        const rad = (angle * Math.PI) / 180;
        return (
          <div key={text} style={{ position: "absolute", left: 160 + r * Math.cos(rad), top: 160 + r * Math.sin(rad), transform: "translate(-50%,-50%)", background: "rgba(124,58,237,.12)", border: "1px solid rgba(124,58,237,.35)", color: "#c4b5fd", padding: ".28rem .7rem", borderRadius: 100, fontFamily: "'DM Mono',monospace", fontSize: ".68rem", whiteSpace: "nowrap", animation: `floatLbl ${3 + i * 0.4}s ease-in-out ${i * 0.3}s infinite alternate` }}>
            {text}
          </div>
        );
      })}
    </div>
  );
}

// ── 5. MAGNETIC BUTTON (micro interaction) ───────────────────
function MagneticButton({ children, onClick, style }) {
  const btnRef = useRef(null);

  const handleMouseMove = (e) => {
    const btn = btnRef.current;
    if (!btn) return;
    const rect = btn.getBoundingClientRect();
    const x = e.clientX - rect.left - rect.width / 2;
    const y = e.clientY - rect.top - rect.height / 2;
    btn.style.transform = `translate(${x * 0.25}px, ${y * 0.25}px) scale(1.05)`;
  };

  const handleMouseLeave = () => {
    if (btnRef.current) btnRef.current.style.transform = "translate(0,0) scale(1)";
  };

  return (
    <button
      ref={btnRef}
      onClick={onClick}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={{ ...style, transition: "transform 0.2s cubic-bezier(0.23,1,0.32,1), box-shadow 0.2s" }}
    >
      {children}
    </button>
  );
}

// ── 6. 3D TILT CARD ──────────────────────────────────────────
function TiltContent({ children }) {
  const ref = useRef(null);

  const handleMouseMove = (e) => {
    if (!ref.current || window.innerWidth < 768) return;
    const rect = ref.current.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width - 0.5;
    const y = (e.clientY - rect.top) / rect.height - 0.5;
    ref.current.style.transform = `perspective(1000px) rotateY(${x * 6}deg) rotateX(${-y * 4}deg)`;
  };

  const handleMouseLeave = () => {
    if (ref.current) ref.current.style.transform = "perspective(1000px) rotateY(0deg) rotateX(0deg)";
  };

  return (
    <div
      ref={ref}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={{ transition: "transform 0.4s cubic-bezier(0.23,1,0.32,1)", transformStyle: "preserve-3d", width: "100%" }}
    >
      {children}
    </div>
  );
}

// ── MAIN HERO ────────────────────────────────────────────────
export default function Hero() {
  const [loaded, setLoaded] = useState(false);
  const [typed, setTyped] = useState("");
  const [wIdx, setWIdx] = useState(0);
  const [deleting, setDeleting] = useState(false);
  const words = ["Scalable Web Apps", "MERN Projects", "Real Solutions", "Clean APIs"];

  // Typewriter
  useEffect(() => {
    if (!loaded) return;
    const word = words[wIdx];
    let t;
    if (!deleting && typed.length < word.length) t = setTimeout(() => setTyped(word.slice(0, typed.length + 1)), 80);
    else if (!deleting && typed.length === word.length) t = setTimeout(() => setDeleting(true), 1800);
    else if (deleting && typed.length > 0) t = setTimeout(() => setTyped(typed.slice(0, -1)), 40);
    else { setDeleting(false); setWIdx((wIdx + 1) % words.length); }
    return () => clearTimeout(t);
  }, [typed, deleting, wIdx, loaded]);

  const scrollTo = (id) => document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });

  return (
    <>
      {/* Custom cursor */}
      <CustomCursor />

      {/* Page loader */}
      {!loaded && <PageLoader onDone={() => setLoaded(true)} />}

      <section id="home" style={{ minHeight: "100vh", display: "flex", alignItems: "center", position: "relative", overflow: "hidden", padding: "80px 6vw 2rem" }}>
        <ParticleCanvas />

        {/* Grid */}
        <div style={{ position: "absolute", inset: 0, opacity: .04, backgroundImage: "linear-gradient(rgba(124,58,237,1) 1px,transparent 1px),linear-gradient(90deg,rgba(124,58,237,1) 1px,transparent 1px)", backgroundSize: "60px 60px", pointerEvents: "none", zIndex: 0 }} />

        {/* Extra glow blob bottom left */}
        <div style={{ position: "absolute", bottom: "-100px", left: "20%", width: "500px", height: "500px", borderRadius: "50%", background: "radial-gradient(circle,rgba(109,40,217,0.12) 0%,transparent 70%)", pointerEvents: "none", zIndex: 0 }} />

        {/* 3D Tilt wrapper */}
        <div style={{ position: "relative", zIndex: 2, maxWidth: 600, width: "100%" }}>
          <TiltContent>
            {/* Badge */}
            <div style={{ fontFamily: "'DM Mono',monospace", fontSize: ".78rem", color: "#a78bfa", letterSpacing: ".16em", textTransform: "uppercase", marginBottom: "1rem", display: "flex", alignItems: "center", gap: ".6rem", opacity: loaded ? 1 : 0, transform: loaded ? "translateY(0)" : "translateY(30px)", transition: "all 0.6s ease 0.2s" }}>
              <span style={{ width: 28, height: 1, background: "#7c3aed", display: "inline-block", flexShrink: 0 }} />
              Full Stack Developer
            </div>

            {/* Name */}
            <h1 style={{ fontFamily: "'Syne',sans-serif", fontSize: "clamp(2.4rem,10vw,5.2rem)", fontWeight: 800, color: "#fff", lineHeight: 1.05, letterSpacing: "-.03em", margin: "0 0 .4rem", opacity: loaded ? 1 : 0, transform: loaded ? "translateY(0)" : "translateY(30px)", transition: "all 0.6s ease 0.35s" }}>
              Samarth<br /><span style={{ color: "#7c3aed" }}>Shirahatti</span>
            </h1>

            {/* Typewriter */}
            <div style={{ fontFamily: "'Syne',sans-serif", fontSize: "clamp(.95rem,4vw,1.9rem)", fontWeight: 600, color: "rgba(255,255,255,.65)", marginBottom: "1.5rem", minHeight: "2rem", opacity: loaded ? 1 : 0, transform: loaded ? "translateY(0)" : "translateY(30px)", transition: "all 0.6s ease 0.5s" }}>
              I build <span style={{ color: "#c4b5fd", borderRight: "2px solid #7c3aed", paddingRight: 2 }}>{typed}</span>
            </div>

            {/* Bio */}
            <p style={{ fontFamily: "'DM Sans',sans-serif", fontSize: "clamp(.85rem,3vw,1rem)", color: "rgba(255,255,255,.48)", lineHeight: 1.75, maxWidth: 480, marginBottom: "2rem", opacity: loaded ? 1 : 0, transform: loaded ? "translateY(0)" : "translateY(30px)", transition: "all 0.6s ease 0.65s" }}>
              MERN Stack Enthusiast @ KLE Tech University, Hubli.
              Turning real-world ideas into production-ready applications.
              Solved 200+ LeetCode problems and continuously improving problem-solving skills 🚀
            </p>

            {/* Buttons with magnetic + ripple effect */}
            <div style={{ display: "flex", gap: ".8rem", flexWrap: "wrap", opacity: loaded ? 1 : 0, transform: loaded ? "translateY(0)" : "translateY(30px)", transition: "all 0.6s ease 0.8s" }}>

              {/* Primary magnetic button */}
              <MagneticButton
                onClick={() => scrollTo("projects")}
                style={{ background: "linear-gradient(135deg,#7c3aed,#5b21b6)", color: "#fff", padding: ".75rem 1.5rem", borderRadius: 6, fontFamily: "'DM Sans',sans-serif", fontWeight: 600, fontSize: ".9rem", border: "none", cursor: "none", boxShadow: "0 4px 24px rgba(124,58,237,.4)", whiteSpace: "nowrap" }}
              >
                View Projects
              </MagneticButton>

              {/* Secondary magnetic button */}
              <MagneticButton
                onClick={() => scrollTo("contact")}
                style={{ background: "transparent", color: "#a78bfa", padding: ".75rem 1.5rem", borderRadius: 6, fontFamily: "'DM Sans',sans-serif", fontWeight: 600, fontSize: ".9rem", border: "1px solid rgba(124,58,237,.5)", cursor: "none", whiteSpace: "nowrap" }}
              >
                Contact Me
              </MagneticButton>

              {/* GitHub link */}
              <a
                href="https://github.com/Samarth-2409X"
                target="_blank"
                rel="noreferrer"
                style={{ background: "transparent", color: "rgba(255,255,255,.5)", padding: ".75rem 1.2rem", borderRadius: 6, fontFamily: "'DM Sans',sans-serif", fontWeight: 600, fontSize: ".9rem", border: "1px solid rgba(255,255,255,.1)", textDecoration: "none", whiteSpace: "nowrap", transition: "all 0.2s", display: "inline-block" }}
                onMouseEnter={e => { e.currentTarget.style.color = "#fff"; e.currentTarget.style.borderColor = "rgba(255,255,255,.3)"; e.currentTarget.style.transform = "translateY(-2px)"; }}
                onMouseLeave={e => { e.currentTarget.style.color = "rgba(255,255,255,.5)"; e.currentTarget.style.borderColor = "rgba(255,255,255,.1)"; e.currentTarget.style.transform = "none"; }}
              >
                GitHub ↗
              </a>
            </div>

            {/* Scroll indicator */}
            <div style={{ marginTop: "3rem", display: "flex", alignItems: "center", gap: ".6rem", opacity: loaded ? 1 : 0, transform: loaded ? "translateY(0)" : "translateY(30px)", transition: "all 0.6s ease 1.1s" }}>
              <div style={{ width: 20, height: 34, border: "1.5px solid rgba(124,58,237,.4)", borderRadius: 10, display: "flex", justifyContent: "center", padding: "5px 0" }}>
                <div style={{ width: 3, height: 8, background: "#7c3aed", borderRadius: 2, animation: "scrollDot 1.8s ease-in-out infinite" }} />
              </div>
              <span style={{ fontFamily: "'DM Mono',monospace", fontSize: ".65rem", color: "rgba(255,255,255,.25)", letterSpacing: ".1em" }}>SCROLL</span>
            </div>
          </TiltContent>
        </div>

        <GlowOrb />

        <style>{`
          @keyframes fadeUp { from{opacity:0;transform:translateY(30px);} to{opacity:1;transform:translateY(0);} }
          @keyframes orbFloat { 0%,100%{transform:translateY(-50%) translateY(-12px);} 50%{transform:translateY(-50%) translateY(12px);} }
          @keyframes orbPulse { 0%,100%{opacity:.7;transform:scale(1);} 50%{opacity:1;transform:scale(1.06);} }
          @keyframes orbMorph { 0%,100%{border-radius:50%;} 25%{border-radius:44% 56% 52% 48%/48% 44% 56% 52%;} 50%{border-radius:56% 44% 48% 52%/52% 56% 44% 48%;} 75%{border-radius:48% 52% 44% 56%/56% 48% 52% 44%;} }
          @keyframes orbit { from{transform:rotate(0deg);} to{transform:rotate(360deg);} }
          @keyframes floatLbl { from{transform:translate(-50%,-50%) translateY(0);} to{transform:translate(-50%,-50%) translateY(-10px);} }
          @keyframes scrollDot { 0%,100%{transform:translateY(0);opacity:1;} 50%{transform:translateY(10px);opacity:.3;} }
          @media(max-width:768px) { .glow-orb { display:none !important; } }
        `}</style>
      </section>
    </>
  );
}
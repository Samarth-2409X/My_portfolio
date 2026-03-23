import { useState, useEffect, useRef } from "react";


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

    // Generate particles
    const particles = Array.from({ length: 60 }, () => ({
      x: Math.random() * W,
      y: Math.random() * H,
      r: Math.random() * 2 + 0.5,
      vx: (Math.random() - 0.5) * 0.4,
      vy: (Math.random() - 0.5) * 0.4,
      color: COLORS[Math.floor(Math.random() * COLORS.length)],
      opacity: Math.random() * 0.6 + 0.2,
    }));

    // Mouse position for connection lines
    let mouse = { x: W / 2, y: H / 2 };
    const onMove = (e) => { mouse.x = e.clientX; mouse.y = e.clientY; };
    window.addEventListener("mousemove", onMove);

    const draw = () => {
      ctx.clearRect(0, 0, W, H);

      // Update & draw particles
      for (const p of particles) {
        p.x += p.vx;
        p.y += p.vy;
        if (p.x < 0 || p.x > W) p.vx *= -1;
        if (p.y < 0 || p.y > H) p.vy *= -1;

        ctx.beginPath();
        ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
        ctx.fillStyle = p.color;
        ctx.globalAlpha = p.opacity;
        ctx.fill();
      }

      // Draw connection lines between close particles
      ctx.globalAlpha = 1;
      for (let i = 0; i < particles.length; i++) {
        for (let j = i + 1; j < particles.length; j++) {
          const dx = particles[i].x - particles[j].x;
          const dy = particles[i].y - particles[j].y;
          const dist = Math.sqrt(dx * dx + dy * dy);
          if (dist < 120) {
            ctx.beginPath();
            ctx.moveTo(particles[i].x, particles[i].y);
            ctx.lineTo(particles[j].x, particles[j].y);
            ctx.strokeStyle = "#7c3aed";
            ctx.globalAlpha = (1 - dist / 120) * 0.18;
            ctx.lineWidth = 0.8;
            ctx.stroke();
          }
        }

        // Connect to mouse
        const mdx = particles[i].x - mouse.x;
        const mdy = particles[i].y - mouse.y;
        const mdist = Math.sqrt(mdx * mdx + mdy * mdy);
        if (mdist < 160) {
          ctx.beginPath();
          ctx.moveTo(particles[i].x, particles[i].y);
          ctx.lineTo(mouse.x, mouse.y);
          ctx.strokeStyle = "#a78bfa";
          ctx.globalAlpha = (1 - mdist / 160) * 0.3;
          ctx.lineWidth = 1;
          ctx.stroke();
        }
      }

      ctx.globalAlpha = 1;
      animId = requestAnimationFrame(draw);
    };

    draw();

    const onResize = () => {
      W = canvas.width = window.innerWidth;
      H = canvas.height = window.innerHeight;
    };
    window.addEventListener("resize", onResize);

    return () => {
      cancelAnimationFrame(animId);
      window.removeEventListener("mousemove", onMove);
      window.removeEventListener("resize", onResize);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      style={{
        position: "absolute",
        inset: 0,
        pointerEvents: "none",
        zIndex: 0,
      }}
    />
  );
}

// Morphing glowing orb
function GlowOrb() {
  return (
    <div
      style={{
        position: "absolute",
        top: "50%",
        right: "12vw",
        transform: "translateY(-50%)",
        width: "340px",
        height: "340px",
        zIndex: 1,
        pointerEvents: "none",
        animation: "orbFloat 6s ease-in-out infinite",
      }}
    >
      {/* Outer glow ring */}
      <div style={{
        position: "absolute", inset: "-30px",
        borderRadius: "50%",
        background: "radial-gradient(circle, rgba(124,58,237,0.15) 0%, transparent 70%)",
        animation: "orbPulse 4s ease-in-out infinite",
      }} />
      {/* Main orb */}
      <div style={{
        position: "absolute", inset: 0,
        borderRadius: "50%",
        background: "radial-gradient(circle at 35% 35%, rgba(167,139,250,0.5), rgba(109,40,217,0.6) 50%, rgba(5,0,15,0.8))",
        boxShadow: "0 0 60px rgba(124,58,237,0.5), 0 0 120px rgba(124,58,237,0.2), inset 0 0 40px rgba(167,139,250,0.15)",
        animation: "orbMorph 8s ease-in-out infinite",
      }} />
      {/* Inner highlight */}
      <div style={{
        position: "absolute",
        top: "18%", left: "22%",
        width: "35%", height: "30%",
        borderRadius: "50%",
        background: "radial-gradient(circle, rgba(255,255,255,0.18), transparent)",
      }} />
      {/* Orbiting dot */}
      <div style={{
        position: "absolute", inset: "-20px",
        borderRadius: "50%",
        animation: "orbit 5s linear infinite",
      }}>
        <div style={{
          position: "absolute",
          top: "10%", left: "50%",
          width: "10px", height: "10px",
          borderRadius: "50%",
          background: "#c4b5fd",
          boxShadow: "0 0 12px #a78bfa",
          transform: "translateX(-50%)",
        }} />
      </div>
      {/* Second orbiting dot — different speed */}
      <div style={{
        position: "absolute", inset: "-50px",
        borderRadius: "50%",
        animation: "orbit 9s linear infinite reverse",
      }}>
        <div style={{
          position: "absolute",
          top: "0%", left: "50%",
          width: "6px", height: "6px",
          borderRadius: "50%",
          background: "#7c3aed",
          boxShadow: "0 0 8px #7c3aed",
          transform: "translateX(-50%)",
        }} />
      </div>
      {/* Tech labels floating around */}
      {[
        { label: "React", angle: 0, r: 200 },
        { label: "Node.js", angle: 72, r: 195 },
        { label: "MongoDB", angle: 144, r: 205 },
        { label: "TypeScript", angle: 216, r: 198 },
        { label: "Express", angle: 288, r: 200 },
      ].map(({ label, angle, r }, i) => {
        const rad = (angle * Math.PI) / 180;
        const x = 170 + r * Math.cos(rad);
        const y = 170 + r * Math.sin(rad);
        return (
          <div
            key={label}
            style={{
              position: "absolute",
              left: x,
              top: y,
              transform: "translate(-50%, -50%)",
              background: "rgba(124,58,237,0.12)",
              border: "1px solid rgba(124,58,237,0.35)",
              color: "#c4b5fd",
              padding: "0.28rem 0.7rem",
              borderRadius: "100px",
              fontFamily: "'DM Mono', monospace",
              fontSize: "0.68rem",
              letterSpacing: "0.04em",
              whiteSpace: "nowrap",
              animation: `float ${3 + i * 0.4}s ease-in-out ${i * 0.3}s infinite alternate`,
            }}
          >
            {label}
          </div>
        );
      })}
    </div>
  );
}

export default function Hero() {
  const [typed, setTyped] = useState("");
  const words = ["Scalable Web Apps", "MERN Projects", "Real Solutions", "Clean APIs"];
  const [wIdx, setWIdx] = useState(0);
  const [deleting, setDeleting] = useState(false);

  useEffect(() => {
    const word = words[wIdx];
    let t;
    if (!deleting && typed.length < word.length) {
      t = setTimeout(() => setTyped(word.slice(0, typed.length + 1)), 80);
    } else if (!deleting && typed.length === word.length) {
      t = setTimeout(() => setDeleting(true), 1800);
    } else if (deleting && typed.length > 0) {
      t = setTimeout(() => setTyped(typed.slice(0, -1)), 40);
    } else if (deleting && typed.length === 0) {
      setDeleting(false);
      setWIdx((wIdx + 1) % words.length);
    }
    return () => clearTimeout(t);
  }, [typed, deleting, wIdx]);

  const scrollTo = (id) => {
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <section
      id="home"
      style={{
        minHeight: "100vh",
        display: "flex",
        alignItems: "center",
        position: "relative",
        overflow: "hidden",
        padding: "0 6vw",
      }}
    >
      {/* Particle canvas */}
      <ParticleCanvas />

      {/* Grid lines background */}
      <div style={{
        position: "absolute", inset: 0, opacity: 0.025,
        backgroundImage:
          "linear-gradient(rgba(124,58,237,1) 1px, transparent 1px), linear-gradient(90deg, rgba(124,58,237,1) 1px, transparent 1px)",
        backgroundSize: "60px 60px",
        pointerEvents: "none",
        zIndex: 0,
      }} />

      {/* Deep glow bottom-right */}
      <div style={{
        position: "absolute", bottom: "-100px", left: "25%",
        width: "500px", height: "500px", borderRadius: "50%",
        background: "radial-gradient(circle, rgba(109,40,217,0.12) 0%, transparent 70%)",
        pointerEvents: "none", zIndex: 0,
      }} />

      {/* Main content */}
      <div style={{ position: "relative", zIndex: 2, maxWidth: "600px" }}>
        <div style={{
          fontFamily: "'DM Mono', monospace",
          fontSize: "0.82rem",
          color: "#a78bfa",
          letterSpacing: "0.16em",
          textTransform: "uppercase",
          marginBottom: "1.2rem",
          display: "flex",
          alignItems: "center",
          gap: "0.6rem",
          opacity: 0,
          animation: "fadeUp 0.6s ease 0.2s forwards",
        }}>
          <span style={{ width: "28px", height: "1px", background: "#7c3aed", display: "inline-block" }} />
          Full Stack Developer
        </div>

        <h1 style={{
          fontFamily: "'Syne', sans-serif",
          fontSize: "clamp(2.8rem, 7vw, 5.2rem)",
          fontWeight: 800,
          color: "#fff",
          lineHeight: 1.05,
          letterSpacing: "-0.03em",
          margin: "0 0 0.4rem",
          opacity: 0,
          animation: "fadeUp 0.6s ease 0.35s forwards",
        }}>
          Samarth
          <br />
          <span style={{ color: "#7c3aed" }}>Shirahatti</span>
        </h1>

        <div style={{
          fontFamily: "'Syne', sans-serif",
          fontSize: "clamp(1.2rem, 3vw, 1.9rem)",
          fontWeight: 600,
          color: "rgba(255,255,255,0.65)",
          marginBottom: "1.8rem",
          minHeight: "2.4rem",
          opacity: 0,
          animation: "fadeUp 0.6s ease 0.5s forwards",
        }}>
          I build{" "}
          <span style={{ color: "#c4b5fd", borderRight: "2px solid #7c3aed", paddingRight: "2px" }}>
            {typed}
          </span>
        </div>

        <p style={{
          fontFamily: "'DM Sans', sans-serif",
          fontSize: "1rem",
          color: "rgba(255,255,255,0.48)",
          lineHeight: 1.75,
          maxWidth: "480px",
          marginBottom: "2.5rem",
          opacity: 0,
          animation: "fadeUp 0.6s ease 0.65s forwards",
        }}>
          MERN Stack enthusiast @ KLE Tech University, Hubli.
          Turning real-world ideas into production-ready apps. Currently leveling up with DSA. 🚀
        </p>

        <div style={{
          display: "flex",
          gap: "1rem",
          flexWrap: "wrap",
          opacity: 0,
          animation: "fadeUp 0.6s ease 0.8s forwards",
        }}>
          <button
            onClick={() => scrollTo("projects")}
            style={{
              background: "linear-gradient(135deg, #7c3aed, #5b21b6)",
              color: "#fff",
              padding: "0.75rem 2rem",
              borderRadius: "6px",
              fontFamily: "'DM Sans', sans-serif",
              fontWeight: 600,
              fontSize: "0.95rem",
              border: "none",
              cursor: "pointer",
              transition: "transform 0.2s, box-shadow 0.2s",
              boxShadow: "0 4px 24px rgba(124,58,237,0.4)",
            }}
            onMouseEnter={(e) => { e.target.style.transform = "translateY(-2px)"; e.target.style.boxShadow = "0 8px 32px rgba(124,58,237,0.55)"; }}
            onMouseLeave={(e) => { e.target.style.transform = "none"; e.target.style.boxShadow = "0 4px 24px rgba(124,58,237,0.4)"; }}
          >
            View Projects
          </button>
          <button
            onClick={() => scrollTo("contact")}
            style={{
              background: "transparent",
              color: "#a78bfa",
              padding: "0.75rem 2rem",
              borderRadius: "6px",
              fontFamily: "'DM Sans', sans-serif",
              fontWeight: 600,
              fontSize: "0.95rem",
              border: "1px solid rgba(124,58,237,0.5)",
              cursor: "pointer",
              transition: "all 0.2s",
            }}
            onMouseEnter={(e) => { e.target.style.background = "rgba(124,58,237,0.1)"; e.target.style.borderColor = "#7c3aed"; }}
            onMouseLeave={(e) => { e.target.style.background = "transparent"; e.target.style.borderColor = "rgba(124,58,237,0.5)"; }}
          >
            Contact Me
          </button>
          <a
            href="https://github.com/Samarth-2409X"
            target="_blank"
            rel="noreferrer"
            style={{
              background: "transparent",
              color: "rgba(255,255,255,0.5)",
              padding: "0.75rem 1.5rem",
              borderRadius: "6px",
              fontFamily: "'DM Sans', sans-serif",
              fontWeight: 600,
              fontSize: "0.95rem",
              textDecoration: "none",
              border: "1px solid rgba(255,255,255,0.1)",
              transition: "all 0.2s",
              display: "inline-block",
            }}
            onMouseEnter={(e) => { e.target.style.color = "#fff"; e.target.style.borderColor = "rgba(255,255,255,0.3)"; }}
            onMouseLeave={(e) => { e.target.style.color = "rgba(255,255,255,0.5)"; e.target.style.borderColor = "rgba(255,255,255,0.1)"; }}
          >
            GitHub ↗
          </a>
        </div>

        {/* Scroll indicator */}
        <div style={{
          marginTop: "4rem",
          display: "flex",
          alignItems: "center",
          gap: "0.6rem",
          opacity: 0,
          animation: "fadeUp 0.6s ease 1.1s forwards",
        }}>
          <div style={{
            width: "20px", height: "34px",
            border: "1.5px solid rgba(124,58,237,0.4)",
            borderRadius: "10px",
            display: "flex",
            justifyContent: "center",
            padding: "5px 0",
          }}>
            <div style={{
              width: "3px", height: "8px",
              background: "#7c3aed",
              borderRadius: "2px",
              animation: "scrollDot 1.8s ease-in-out infinite",
            }} />
          </div>
          <span style={{ fontFamily: "'DM Mono', monospace", fontSize: "0.65rem", color: "rgba(255,255,255,0.25)", letterSpacing: "0.1em" }}>
            SCROLL
          </span>
        </div>
      </div>

      {/* 3D Orb on the right */}
      <GlowOrb />

      <style>{`
        @keyframes fadeUp { from { opacity: 0; transform: translateY(30px); } to { opacity: 1; transform: translateY(0); } }
        @keyframes float { from { transform: translate(-50%,-50%) translateY(0); } to { transform: translate(-50%,-50%) translateY(-10px); } }
        @keyframes orbFloat { 0%,100% { transform: translateY(-50%) translateY(-8px); } 50% { transform: translateY(-50%) translateY(8px); } }
        @keyframes orbPulse { 0%,100% { opacity: 0.7; transform: scale(1); } 50% { opacity: 1; transform: scale(1.05); } }
        @keyframes orbMorph {
          0%,100% { border-radius: 50%; }
          25% { border-radius: 44% 56% 52% 48% / 48% 44% 56% 52%; }
          50% { border-radius: 56% 44% 48% 52% / 52% 56% 44% 48%; }
          75% { border-radius: 48% 52% 44% 56% / 56% 48% 52% 44%; }
        }
        @keyframes orbit {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }
        @keyframes scrollDot {
          0%,100% { transform: translateY(0); opacity: 1; }
          50% { transform: translateY(10px); opacity: 0.3; }
        }
      `}</style>
    </section>
  );
}

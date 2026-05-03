import { useState, useEffect, useRef, useCallback } from "react";

// ── Tech orbs data ────────────────────────────────────────────
const ORBS = [
  { label: "React",      color: "#61DAFB", bg: "#071c22", x: "52%", y: "8%",  size: 70, depth: 1.3, speed: 0.9 },
  { label: "Node.js",    color: "#8CC84B", bg: "#111f06", x: "15%", y: "25%", size: 64, depth: 1.1, speed: 0.7 },
  { label: "MongoDB",    color: "#4EA94B", bg: "#0f1f0e", x: "84%", y: "28%", size: 60, depth: 0.8, speed: 1.1 },
  { label: "TypeScript", color: "#3178C6", bg: "#071527", x: "22%", y: "66%", size: 66, depth: 1.3, speed: 0.6 },
  { label: "Express",    color: "#c4b5fd", bg: "#120e1f", x: "76%", y: "68%", size: 58, depth: 1.0, speed: 0.8 },
  { label: "JWT",        color: "#d63aff", bg: "#1a0720", x: "92%", y: "50%", size: 52, depth: 0.6, speed: 1.2 },
  { label: "Git",        color: "#f05032", bg: "#1f0a07", x: "6%",  y: "54%", size: 52, depth: 1.2, speed: 0.5 },
  { label: "REST",       color: "#a78bfa", bg: "#130e1f", x: "46%", y: "88%", size: 56, depth: 0.9, speed: 1.0 },
];

// ── SVG icons per orb ─────────────────────────────────────────
function OrbIcon({ label, size = 26 }) {
  const s = size;
  if (label === "React") return (
    <svg width={s} height={s} viewBox="0 0 24 24" fill="none">
      <ellipse cx="12" cy="12" rx="2" ry="2" fill="#61DAFB"/>
      <ellipse cx="12" cy="12" rx="10" ry="4" stroke="#61DAFB" strokeWidth="1.2" fill="none"/>
      <ellipse cx="12" cy="12" rx="10" ry="4" stroke="#61DAFB" strokeWidth="1.2" fill="none" transform="rotate(60 12 12)"/>
      <ellipse cx="12" cy="12" rx="10" ry="4" stroke="#61DAFB" strokeWidth="1.2" fill="none" transform="rotate(120 12 12)"/>
    </svg>
  );
  if (label === "Node.js") return (
    <svg width={s} height={s} viewBox="0 0 24 24" fill="none">
      <path d="M12 2L3 7v10l9 5 9-5V7L12 2z" stroke="#8CC84B" strokeWidth="1.4" fill="none"/>
      <path d="M12 2v20M3 7l9 5 9-5" stroke="#8CC84B" strokeWidth="1" opacity="0.5"/>
    </svg>
  );
  if (label === "MongoDB") return (
    <svg width={s} height={s} viewBox="0 0 24 24" fill="none">
      <path d="M12 2C8 2 6 6 6 10c0 3.5 2.5 6 5.5 8l.5.3.5-.3C15.5 16 18 13.5 18 10c0-4-2-8-6-8z" fill="#4EA94B"/>
      <rect x="11.3" y="17.5" width="1.4" height="4.5" rx="0.7" fill="#4EA94B"/>
    </svg>
  );
  if (label === "TypeScript") return (
    <svg width={s} height={s} viewBox="0 0 24 24" fill="none">
      <rect x="3" y="3" width="18" height="18" rx="2" fill="#3178C6"/>
      <text x="5" y="16" fontSize="9" fill="white" fontWeight="800" fontFamily="monospace">TS</text>
    </svg>
  );
  if (label === "Express") return (
    <svg width={s} height={s} viewBox="0 0 24 24" fill="none">
      <text x="2" y="16" fontSize="10" fill="#c4b5fd" fontWeight="800" fontFamily="monospace">EX</text>
    </svg>
  );
  if (label === "JWT") return (
    <svg width={s} height={s} viewBox="0 0 24 24" fill="none">
      <circle cx="12" cy="12" r="8" stroke="#d63aff" strokeWidth="1.2" fill="none"/>
      <text x="7" y="16" fontSize="8" fill="#d63aff" fontWeight="800" fontFamily="monospace">JWT</text>
    </svg>
  );
  if (label === "Git") return (
    <svg width={s} height={s} viewBox="0 0 24 24" fill="#f05032">
      <path d="M23.546 10.93L13.067.452c-.604-.603-1.582-.603-2.188 0L8.708 2.627l2.76 2.76c.645-.215 1.379-.07 1.889.441.516.515.658 1.258.438 1.9l2.658 2.66c.645-.223 1.387-.078 1.9.435.721.72.721 1.884 0 2.604-.719.719-1.881.719-2.6 0-.539-.541-.674-1.337-.404-1.996L12.86 8.955v6.525c.176.086.342.203.488.348.713.721.713 1.883 0 2.6-.719.721-1.889.721-2.609 0-.719-.719-.719-1.879 0-2.598.182-.18.387-.316.605-.406V8.835c-.217-.091-.424-.222-.6-.401-.545-.545-.676-1.342-.396-2.009L7.636 3.7.45 10.881c-.6.605-.6 1.584 0 2.189l10.48 10.477c.604.604 1.582.604 2.186 0l10.43-10.43c.605-.603.605-1.582 0-2.187"/>
    </svg>
  );
  if (label === "REST") return (
    <svg width={s} height={s} viewBox="0 0 24 24" fill="none">
      <rect x="3" y="3" width="18" height="18" rx="3" stroke="#a78bfa" strokeWidth="1.2"/>
      <text x="4" y="15" fontSize="7.5" fill="#a78bfa" fontWeight="800" fontFamily="monospace">REST</text>
    </svg>
  );
  return null;
}

// ── Custom cursor ─────────────────────────────────────────────
function CustomCursor() {
  const dotRef = useRef(null);
  const ringRef = useRef(null);
  const pos = useRef({ x: -100, y: -100 });
  const ring = useRef({ x: -100, y: -100 });

  useEffect(() => {
    const onMove = (e) => {
      pos.current = { x: e.clientX, y: e.clientY };
      if (dotRef.current) {
        dotRef.current.style.left = e.clientX + "px";
        dotRef.current.style.top  = e.clientY + "px";
      }
    };
    const tick = () => {
      ring.current.x += (pos.current.x - ring.current.x) * 0.1;
      ring.current.y += (pos.current.y - ring.current.y) * 0.1;
      if (ringRef.current) {
        ringRef.current.style.left = ring.current.x + "px";
        ringRef.current.style.top  = ring.current.y + "px";
      }
      requestAnimationFrame(tick);
    };
    const grow = () => {
      if (dotRef.current)  dotRef.current.style.transform  = "translate(-50%,-50%) scale(3)";
      if (ringRef.current) ringRef.current.style.transform = "translate(-50%,-50%) scale(0.5)";
    };
    const shrink = () => {
      if (dotRef.current)  dotRef.current.style.transform  = "translate(-50%,-50%) scale(1)";
      if (ringRef.current) ringRef.current.style.transform = "translate(-50%,-50%) scale(1)";
    };
    window.addEventListener("mousemove", onMove);
    document.querySelectorAll("button,a").forEach(el => {
      el.addEventListener("mouseenter", grow);
      el.addEventListener("mouseleave", shrink);
    });
    requestAnimationFrame(tick);
    return () => window.removeEventListener("mousemove", onMove);
  }, []);

  return (
    <>
      <div ref={dotRef} style={{ position:"fixed", zIndex:99999, pointerEvents:"none", width:10, height:10, borderRadius:"50%", background:"#7c3aed", left:0, top:0, transform:"translate(-50%,-50%)", transition:"transform 0.15s ease", mixBlendMode:"screen" }} className="c-dot"/>
      <div ref={ringRef} style={{ position:"fixed", zIndex:99998, pointerEvents:"none", width:38, height:38, borderRadius:"50%", border:"1.5px solid rgba(124,58,237,0.5)", left:0, top:0, transform:"translate(-50%,-50%)", transition:"transform 0.3s ease" }} className="c-ring"/>
      <style>{`
        @media(max-width:768px){.c-dot,.c-ring{display:none!important} body{cursor:auto!important}}
        body{cursor:none}
      `}</style>
    </>
  );
}

// ── Page loader ───────────────────────────────────────────────
function PageLoader({ onDone }) {
  const [pct, setPct] = useState(0);
  const [out, setOut] = useState(false);

  useEffect(() => {
    let v = 0;
    const iv = setInterval(() => {
      v += Math.random() * 16 + 5;
      if (v >= 100) {
        clearInterval(iv);
        setPct(100);
        setTimeout(() => { setOut(true); setTimeout(onDone, 550); }, 250);
      } else {
        setPct(Math.floor(v));
      }
    }, 90);
    return () => clearInterval(iv);
  }, []);

  return (
    <div style={{ position:"fixed", inset:0, zIndex:99997, background:"#05000f", display:"flex", flexDirection:"column", alignItems:"center", justifyContent:"center", opacity:out?0:1, transform:out?"translateY(-100%)":"translateY(0)", transition:"opacity 0.4s,transform 0.55s cubic-bezier(.77,0,.18,1)", pointerEvents:out?"none":"all" }}>
      {/* Big name */}
      <div style={{ fontSize:"clamp(48px,10vw,96px)", fontWeight:800, letterSpacing:-4, color:"#7c3aed", lineHeight:1, fontFamily:"'Syne',sans-serif" }}>MERN</div>
      <div style={{ fontSize:11, color:"#444", letterSpacing:4, marginTop:6, fontFamily:"'DM Mono',monospace" }}>PORTFOLIO</div>
      {/* Bar */}
      <div style={{ width:260, height:2, background:"rgba(124,58,237,0.15)", borderRadius:2, overflow:"hidden", marginTop:36 }}>
        <div style={{ height:"100%", width:`${pct}%`, background:"linear-gradient(90deg,#5b21b6,#7c3aed,#a78bfa)", transition:"width 0.12s", borderRadius:2, boxShadow:"0 0 12px rgba(124,58,237,0.8)" }}/>
      </div>
      <div style={{ color:"#555", fontSize:12, marginTop:10, fontFamily:"monospace", letterSpacing:2 }}>{pct}%</div>
      {/* Floating particles */}
      {[...Array(8)].map((_, i) => (
        <div key={i} style={{ position:"absolute", width:Math.random()*3+1+"px", height:Math.random()*3+1+"px", borderRadius:"50%", background:"#7c3aed", left:Math.random()*100+"%", top:Math.random()*100+"%", opacity:Math.random()*0.4+0.1, animation:`floatP ${3+i*0.7}s ease-in-out ${i*0.4}s infinite alternate`, pointerEvents:"none" }}/>
      ))}
      <style>{`@keyframes floatP{from{transform:translateY(0)}to{transform:translateY(-14px)}}`}</style>
    </div>
  );
}

// ── 3D floating orbs cluster ──────────────────────────────────
function OrbCluster({ tilt, loaded }) {
  const [hovered, setHovered] = useState(null);
  const [t, setT] = useState(0);
  const raf = useRef(null);
  const t0 = useRef(Date.now());

  useEffect(() => {
    const tick = () => { setT((Date.now() - t0.current) / 1000); raf.current = requestAnimationFrame(tick); };
    raf.current = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf.current);
  }, []);

  const isTiltIdle = tilt.x === 0 && tilt.y === 0;

  return (
    <div style={{
      flex: "0 0 46%",
      position: "relative",
      height: 480,
      zIndex: 2,
      transformStyle: "preserve-3d",
      transform: `perspective(1200px) rotateX(${tilt.y * 0.7}deg) rotateY(${tilt.x * 0.7}deg)`,
      transition: isTiltIdle ? "transform 0.8s cubic-bezier(.23,1,.32,1)" : "transform 0.1s linear",
      opacity: loaded ? 1 : 0,
      transition2: "opacity 1s 0.8s",
    }}>
      {/* Connection lines SVG */}
      <svg style={{ position:"absolute", inset:0, width:"100%", height:"100%", pointerEvents:"none", zIndex:1, opacity:0.6 }}>
        {ORBS.map((orb, i) => (
          <line key={i}
            x1="50%" y1="50%"
            x2={orb.x} y2={orb.y}
            stroke={hovered === i ? orb.color : "rgba(124,58,237,0.12)"}
            strokeWidth={hovered === i ? "1.2" : "0.5"}
            strokeDasharray="3 8"
            style={{ transition:"stroke 0.3s,stroke-width 0.3s" }}
          />
        ))}
      </svg>

      {/* Orbital rings */}
      <div style={{ position:"absolute", left:"50%", top:"50%", transform:"translate(-50%,-50%)", width:220, height:220, borderRadius:"50%", border:"0.5px solid rgba(124,58,237,0.12)", animation:"ringCW 22s linear infinite", pointerEvents:"none", zIndex:2 }}/>
      <div style={{ position:"absolute", left:"50%", top:"50%", transform:"translate(-50%,-50%)", width:350, height:350, borderRadius:"50%", border:"0.5px solid rgba(124,58,237,0.07)", animation:"ringCCW 32s linear infinite", pointerEvents:"none", zIndex:2 }}/>

      {/* Central core */}
      <div style={{ position:"absolute", left:"50%", top:"50%", transform:"translate(-50%,-50%)", width:90, height:90, borderRadius:"50%", background:"radial-gradient(circle at 38% 38%,rgba(124,58,237,0.25),rgba(124,58,237,0.06) 65%,transparent)", border:"1px solid rgba(124,58,237,0.22)", animation:"corePulse 3s ease-in-out infinite", zIndex:5, display:"flex", alignItems:"center", justifyContent:"center" }}>
        <div style={{ width:52, height:52, borderRadius:"50%", border:"1px solid rgba(124,58,237,0.4)", display:"flex", alignItems:"center", justifyContent:"center" }}>
          <div style={{ width:26, height:26, borderRadius:"50%", background:"radial-gradient(circle at 38% 38%,#a78bfa,#7c3aed)", boxShadow:"0 0 22px rgba(124,58,237,0.8)" }}/>
        </div>
      </div>

      {/* Floating orbs */}
      {ORBS.map((orb, i) => {
        const fy = Math.sin(t * orb.speed + i * 1.3) * 10 * orb.depth;
        const fx = Math.cos(t * orb.speed * 0.6 + i * 0.9) * 5 * orb.depth;
        const isHov = hovered === i;
        return (
          <div key={orb.label}
            style={{
              position: "absolute",
              left: orb.x, top: orb.y,
              transform: `translate(-50%,-50%) translateX(${fx}px) translateY(${fy}px) translateZ(${isHov ? 40 : 0}px) scale(${isHov ? 1.18 : 1})`,
              width: orb.size, height: orb.size,
              borderRadius: "50%",
              background: orb.bg,
              border: `1px solid ${isHov ? orb.color + "88" : orb.color + "22"}`,
              display: "flex", flexDirection: "column",
              alignItems: "center", justifyContent: "center", gap: 3,
              cursor: "none",
              zIndex: isHov ? 10 : 3,
              boxShadow: isHov
                ? `0 0 28px ${orb.color}30, 0 14px 40px rgba(0,0,0,0.8), inset 0 1px 0 ${orb.color}18`
                : `0 6px 20px rgba(0,0,0,0.6), inset 0 1px 0 ${orb.color}0a`,
              backdropFilter: "blur(6px)",
              willChange: "transform",
              transition: "border-color 0.3s, box-shadow 0.3s",
            }}
            onMouseEnter={() => setHovered(i)}
            onMouseLeave={() => setHovered(null)}
          >
            <OrbIcon label={orb.label} size={Math.round(orb.size * 0.4)} />
            <span style={{ fontSize: 8, fontWeight: 700, letterSpacing: 0.5, color: isHov ? orb.color : "#555", textTransform: "uppercase", fontFamily: "'DM Mono',monospace", transition: "color 0.3s" }}>
              {orb.label}
            </span>
            {isHov && (
              <div style={{ position:"absolute", inset:-10, borderRadius:"50%", border:`1px solid ${orb.color}40`, animation:"corePulse 1.2s ease-in-out infinite", pointerEvents:"none" }}/>
            )}
          </div>
        );
      })}

      {/* Stats bar */}
      <div style={{ position:"absolute", bottom:-8, left:"50%", transform:"translateX(-50%)", background:"rgba(5,0,15,0.95)", border:"0.5px solid rgba(124,58,237,0.2)", borderRadius:10, padding:"12px 28px", display:"flex", gap:32, zIndex:8, backdropFilter:"blur(12px)", whiteSpace:"nowrap", opacity:loaded?1:0, transition:"opacity 0.8s 1.2s", boxShadow:"0 8px 32px rgba(0,0,0,0.4)" }}>
        {[["10+","Repos"],["MERN","Stack"],["DSA","200+ 🔥"]].map(([n, l]) => (
          <div key={l} style={{ textAlign:"center" }}>
            <div style={{ fontSize:17, fontWeight:800, color:"#a78bfa", letterSpacing:-1, fontFamily:"'Syne',sans-serif" }}>{n}</div>
            <div style={{ fontSize:9, color:"#555", letterSpacing:1, textTransform:"uppercase", fontFamily:"'DM Mono',monospace", marginTop:2 }}>{l}</div>
          </div>
        ))}
      </div>
    </div>
  );
}

// ── Magnetic button ───────────────────────────────────────────
function MagBtn({ children, onClick, primary }) {
  const ref = useRef(null);
  const onMove = (e) => {
    const r = ref.current.getBoundingClientRect();
    const x = (e.clientX - r.left - r.width / 2) * 0.3;
    const y = (e.clientY - r.top - r.height / 2) * 0.3;
    ref.current.style.transform = `translate(${x}px,${y}px) scale(1.05)`;
  };
  const onLeave = () => { ref.current.style.transform = "translate(0,0) scale(1)"; };
  return (
    <button ref={ref} onClick={onClick} onMouseMove={onMove} onMouseLeave={onLeave}
      style={{
        padding: ".75rem 1.8rem",
        borderRadius: 6,
        fontFamily: "'DM Sans',sans-serif",
        fontWeight: 700,
        fontSize: ".9rem",
        border: primary ? "none" : "1px solid rgba(124,58,237,0.5)",
        background: primary ? "linear-gradient(135deg,#7c3aed,#5b21b6)" : "transparent",
        color: primary ? "#fff" : "#a78bfa",
        cursor: "none",
        whiteSpace: "nowrap",
        boxShadow: primary ? "0 4px 24px rgba(124,58,237,0.4)" : "none",
        transition: "transform 0.25s cubic-bezier(.23,1,.32,1), box-shadow 0.2s",
      }}
    >
      {children}
    </button>
  );
}

// ── MAIN HERO ─────────────────────────────────────────────────
export default function Hero() {
  const [loaded, setLoaded]     = useState(false);
  const [typed, setTyped]       = useState("");
  const [wIdx, setWIdx]         = useState(0);
  const [deleting, setDeleting] = useState(false);
  const [tilt, setTilt]         = useState({ x: 0, y: 0 });
  const [scrollY, setScrollY]   = useState(0);
  const sectionRef              = useRef(null);
  const words = ["Scalable Web Apps", "MERN Projects", "Real Solutions", "Clean APIs"];

  // Typewriter — only after loader finishes
  useEffect(() => {
    if (!loaded) return;
    const word = words[wIdx]; let t;
    if (!deleting && typed.length < word.length)       t = setTimeout(() => setTyped(word.slice(0, typed.length + 1)), 80);
    else if (!deleting && typed.length === word.length) t = setTimeout(() => setDeleting(true), 1800);
    else if (deleting && typed.length > 0)             t = setTimeout(() => setTyped(typed.slice(0, -1)), 40);
    else { setDeleting(false); setWIdx((wIdx + 1) % words.length); }
    return () => clearTimeout(t);
  }, [typed, deleting, wIdx, loaded]);

  // Scroll parallax
  useEffect(() => {
    const fn = () => setScrollY(window.scrollY);
    window.addEventListener("scroll", fn, { passive: true });
    return () => window.removeEventListener("scroll", fn);
  }, []);

  // 3D tilt on mouse move
  const onMouseMove = useCallback((e) => {
    if (!sectionRef.current) return;
    const r = sectionRef.current.getBoundingClientRect();
    setTilt({
      x:  ((e.clientX - r.left)  / r.width  - 0.5) * 20,
      y: -((e.clientY - r.top)   / r.height - 0.5) * 20,
    });
  }, []);
  const onMouseLeave = () => setTilt({ x: 0, y: 0 });

  const scrollTo = (id) => document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
  const isTiltIdle = tilt.x === 0 && tilt.y === 0;

  // Parallax offsets
  const leftY  = -scrollY * 0.15;
  const rightY = -scrollY * 0.25;
  const ghostY =  scrollY * 0.1;

  return (
    <>
      <CustomCursor />
      {!loaded && <PageLoader onDone={() => setLoaded(true)} />}

      <section
        id="home"
        ref={sectionRef}
        onMouseMove={onMouseMove}
        onMouseLeave={onMouseLeave}
        style={{ minHeight:"100vh", display:"flex", alignItems:"center", justifyContent:"space-between", position:"relative", overflow:"hidden", padding:"80px 6vw 2rem", gap:"2rem" }}
      >
        {/* Grid overlay */}
        <svg style={{ position:"absolute", inset:0, width:"100%", height:"100%", opacity:0.035, pointerEvents:"none", zIndex:1 }}>
          {Array.from({length:12}).map((_,i) => <line key={`v${i}`} x1={`${(i+1)*8.33}%`} y1="0" x2={`${(i+1)*8.33}%`} y2="100%" stroke="#7c3aed" strokeWidth="0.5"/>)}
          {Array.from({length:8}).map((_,i)  => <line key={`h${i}`} x1="0" y1={`${(i+1)*12.5}%`} x2="100%" y2={`${(i+1)*12.5}%`} stroke="#7c3aed" strokeWidth="0.5"/>)}
        </svg>

        {/* Ghost bg text — parallax down */}
        <div style={{ position:"absolute", right:-10, top:`calc(50% + ${ghostY}px)`, transform:"translateY(-50%)", fontSize:"clamp(80px,16vw,220px)", fontWeight:800, color:"transparent", WebkitTextStroke:"1px rgba(124,58,237,0.08)", letterSpacing:-8, userSelect:"none", pointerEvents:"none", lineHeight:1, zIndex:1, fontFamily:"'Syne',sans-serif", opacity:loaded?1:0, transition:"opacity 1s 1s" }}>
          MERN
        </div>

        {/* Glow blobs */}
        <div style={{ position:"absolute", top:"-120px", left:"-80px", width:"500px", height:"500px", borderRadius:"50%", background:"radial-gradient(circle,rgba(124,58,237,0.1) 0%,transparent 70%)", pointerEvents:"none", zIndex:0 }}/>
        <div style={{ position:"absolute", bottom:"-80px", right:"30%", width:"400px", height:"400px", borderRadius:"50%", background:"radial-gradient(circle,rgba(91,33,182,0.08) 0%,transparent 70%)", pointerEvents:"none", zIndex:0 }}/>

        {/* ── LEFT: name & CTA — parallax up ── */}
        <div style={{
          flex: "0 0 48%", maxWidth: 540, position: "relative", zIndex: 2,
          transform: `perspective(1200px) rotateX(${tilt.y}deg) rotateY(${tilt.x}deg) translateY(${leftY}px)`,
          transition: isTiltIdle ? "transform 0.8s cubic-bezier(.23,1,.32,1)" : "transform 0.1s linear",
        }}>
          {/* Badge */}
          <p style={{ fontSize:11, letterSpacing:4, color:"#7c3aed", textTransform:"uppercase", marginBottom:20, fontFamily:"'DM Mono',monospace", opacity:loaded?1:0, transform:loaded?"translateY(0)":"translateY(20px)", transition:"opacity 0.7s 0.4s, transform 0.7s 0.4s" }}>
            Full Stack Developer — Available for hire
          </p>

          {/* Name */}
          <h1 style={{ fontSize:"clamp(48px,6vw,84px)", fontWeight:800, lineHeight:0.95, letterSpacing:-4, margin:0, fontFamily:"'Syne',sans-serif", opacity:loaded?1:0, transform:loaded?"translateY(0)":"translateY(40px)", transition:"opacity 0.8s 0.5s, transform 0.8s 0.5s" }}>
            <span style={{ color:"#fff" }}>Samarth</span><br/>
            <span style={{ color:"#7c3aed" }}>Shirahatti.</span>
          </h1>

          {/* Typewriter */}
          <div style={{ fontSize:"clamp(.95rem,2vw,1.3rem)", fontWeight:600, color:"rgba(255,255,255,0.55)", marginTop:18, marginBottom:0, minHeight:"2rem", fontFamily:"'Syne',sans-serif", opacity:loaded?1:0, transform:loaded?"translateY(0)":"translateY(20px)", transition:"opacity 0.7s 0.65s, transform 0.7s 0.65s" }}>
            I build <span style={{ color:"#a78bfa", borderRight:"2px solid #7c3aed", paddingRight:3 }}>{typed}</span>
          </div>

          {/* Bio */}
          <p style={{ fontSize:"clamp(.85rem,1.4vw,.98rem)", color:"rgba(255,255,255,0.42)", marginTop:20, lineHeight:1.75, maxWidth:460, fontFamily:"'DM Sans',sans-serif", fontWeight:400, opacity:loaded?1:0, transform:loaded?"translateY(0)":"translateY(20px)", transition:"opacity 0.8s 0.8s, transform 0.8s 0.8s" }}>
            MERN Stack Enthusiast @ KLE Tech University, Hubli. Turning real-world ideas into production-ready applications. Solved 200+ LeetCode problems and continuously improving problem-solving skills 🚀
          </p>

          {/* Buttons */}
          <div style={{ display:"flex", gap:14, marginTop:36, flexWrap:"wrap", opacity:loaded?1:0, transform:loaded?"translateY(0)":"translateY(20px)", transition:"opacity 0.8s 1s, transform 0.8s 1s" }}>
            <MagBtn primary onClick={() => scrollTo("projects")}>View Projects →</MagBtn>
            <MagBtn onClick={() => scrollTo("contact")}>Contact Me</MagBtn>
            <a href="https://github.com/Samarth-2409X" target="_blank" rel="noreferrer"
              style={{ padding:".75rem 1.2rem", borderRadius:6, fontFamily:"'DM Sans',sans-serif", fontWeight:600, fontSize:".9rem", border:"1px solid rgba(255,255,255,0.1)", color:"rgba(255,255,255,0.45)", textDecoration:"none", whiteSpace:"nowrap", transition:"all 0.2s", display:"inline-flex", alignItems:"center" }}
              onMouseEnter={e => { e.currentTarget.style.color="#fff"; e.currentTarget.style.borderColor="rgba(255,255,255,0.3)"; e.currentTarget.style.transform="translateY(-2px)"; }}
              onMouseLeave={e => { e.currentTarget.style.color="rgba(255,255,255,0.45)"; e.currentTarget.style.borderColor="rgba(255,255,255,0.1)"; e.currentTarget.style.transform="none"; }}
            >GitHub ↗</a>
          </div>

          {/* Scroll indicator */}
          <div style={{ display:"flex", alignItems:"center", gap:10, marginTop:52, opacity:loaded?1:0, transition:"opacity 1s 1.3s" }}>
            <div style={{ width:1, height:40, background:"linear-gradient(to bottom,#7c3aed,transparent)", animation:"scrollLine 2s ease-in-out infinite" }}/>
            <span style={{ fontSize:9, letterSpacing:3, color:"#444", textTransform:"uppercase", fontFamily:"'DM Mono',monospace" }}>Scroll</span>
          </div>
        </div>

        {/* ── RIGHT: 3D orb cluster — faster parallax ── */}
        <div style={{ flex:"0 0 46%", position:"relative", height:480, zIndex:2, transform:`translateY(${rightY}px)`, transition:"transform 0.1s linear" }} className="orb-cluster-wrap">
          <OrbCluster tilt={tilt} loaded={loaded} />
        </div>

        <style>{`
          @keyframes ringCW  { from{transform:translate(-50%,-50%) rotate(0deg)}   to{transform:translate(-50%,-50%) rotate(360deg)} }
          @keyframes ringCCW { from{transform:translate(-50%,-50%) rotate(360deg)} to{transform:translate(-50%,-50%) rotate(0deg)} }
          @keyframes corePulse { 0%,100%{opacity:.85;transform:translate(-50%,-50%) scale(1)} 50%{opacity:1;transform:translate(-50%,-50%) scale(1.06)} }
          @keyframes scrollLine { 0%,100%{opacity:.3;transform:scaleY(1)} 50%{opacity:1;transform:scaleY(1.15)} }
          @media(max-width:768px){
            .orb-cluster-wrap{display:none!important}
            section#home{justify-content:flex-start!important}
          }
        `}</style>
      </section>
    </>
  );
}
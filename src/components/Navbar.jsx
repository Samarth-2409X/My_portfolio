import { useState, useEffect } from "react";

export default function Navbar({ active, setActive }) {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const fn = () => setScrolled(window.scrollY > 30);
    window.addEventListener("scroll", fn, { passive: true });
    return () => window.removeEventListener("scroll", fn);
  }, []);

  const links = ["home", "about", "skills", "certificates", "projects", "contact"];

  const handleClick = (link) => {
    setActive(link);
    setMenuOpen(false);
    document.getElementById(link)?.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  return (
    <>
      <nav style={{ position:"fixed", top:0, left:0, right:0, zIndex:1000, padding:"0 1.5rem", height:"64px", display:"flex", alignItems:"center", justifyContent:"space-between", background: scrolled||menuOpen ? "rgba(5,0,15,0.97)" : "transparent", backdropFilter: scrolled||menuOpen ? "blur(16px)" : "none", borderBottom: scrolled||menuOpen ? "1px solid rgba(124,58,237,0.18)" : "none", transition:"all 0.3s ease" }}>
        <button onClick={() => handleClick("home")} style={{ fontFamily:"'Syne',sans-serif", fontWeight:800, fontSize:"1.2rem", color:"#fff", letterSpacing:"-.02em", background:"none", border:"none", cursor:"pointer", flexShrink:0 }}>
          <span style={{ color:"#7c3aed" }}>S</span>amarth.dev
        </button>
        <div className="desktop-nav" style={{ display:"flex", gap:"1.5rem", alignItems:"center" }}>
          {links.map(link => (
            <button key={link} onClick={() => handleClick(link)} style={{ fontFamily:"'DM Mono',monospace", fontSize:"0.72rem", letterSpacing:"0.08em", textTransform:"uppercase", color: active===link ? "#a78bfa" : "rgba(255,255,255,0.55)", background:"none", border:"none", cursor:"pointer", fontWeight: active===link ? 600 : 400, transition:"color 0.2s", position:"relative", padding:"4px 0", whiteSpace:"nowrap" }}>
              {link}
              <span style={{ position:"absolute", bottom:0, left:0, right:0, height:"2px", background:"#7c3aed", borderRadius:"2px", display:"block", transform: active===link ? "scaleX(1)" : "scaleX(0)", transition:"transform 0.25s ease", transformOrigin:"center" }} />
            </button>
          ))}
        </div>
        <button className="hamburger" onClick={() => setMenuOpen(!menuOpen)} style={{ display:"none", flexDirection:"column", gap:"5px", background:"none", border:"none", cursor:"pointer", padding:"4px" }}>
          <span style={{ display:"block", width:"24px", height:"2px", background:"#fff", borderRadius:"2px", transform: menuOpen ? "rotate(45deg) translate(5px,5px)" : "none", transition:"all 0.3s" }} />
          <span style={{ display:"block", width:"24px", height:"2px", background:"#fff", borderRadius:"2px", opacity: menuOpen ? 0 : 1, transition:"all 0.3s" }} />
          <span style={{ display:"block", width:"24px", height:"2px", background:"#fff", borderRadius:"2px", transform: menuOpen ? "rotate(-45deg) translate(5px,-5px)" : "none", transition:"all 0.3s" }} />
        </button>
      </nav>
      <div style={{ position:"fixed", top:"64px", left:0, right:0, zIndex:999, background:"rgba(5,0,15,0.98)", backdropFilter:"blur(20px)", borderBottom:"1px solid rgba(124,58,237,0.2)", padding: menuOpen ? "1rem 1.5rem 1.5rem" : "0 1.5rem", maxHeight: menuOpen ? "420px" : "0px", overflow:"hidden", transition:"all 0.35s ease" }}>
        {links.map(link => (
          <button key={link} onClick={() => handleClick(link)} style={{ display:"block", width:"100%", textAlign:"left", fontFamily:"'DM Mono',monospace", fontSize:"0.88rem", letterSpacing:"0.1em", textTransform:"uppercase", color: active===link ? "#a78bfa" : "rgba(255,255,255,0.6)", background: active===link ? "rgba(124,58,237,0.1)" : "none", border:"none", borderLeft: active===link ? "2px solid #7c3aed" : "2px solid transparent", cursor:"pointer", padding:"0.85rem 1rem", marginBottom:"0.3rem", borderRadius:"0 8px 8px 0", fontWeight: active===link ? 600 : 400, transition:"all 0.2s" }}>
            {link}
          </button>
        ))}
      </div>
      <style>{`
        @media (max-width: 768px) { .desktop-nav { display: none !important; } .hamburger { display: flex !important; } }
        @media (min-width: 769px) { .desktop-nav { display: flex !important; } .hamburger { display: none !important; } }
      `}</style>
    </>
  );
}
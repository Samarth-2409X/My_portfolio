import { useState, useEffect } from "react";

export default function Navbar({ active, setActive }) {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const fn = () => setScrolled(window.scrollY > 30);
    window.addEventListener("scroll", fn);
    return () => window.removeEventListener("scroll", fn);
  }, []);

  const links = ["home", "about", "skills", "projects", "contact"];

  // Smooth scroll to section by id
  const handleNavClick = (e, link) => {
    e.preventDefault();
    setActive(link);
    const el = document.getElementById(link);
    if (el) {
      el.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  };

  return (
    <nav
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        right: 0,
        zIndex: 1000,
        padding: "0 2.5rem",
        height: "64px",
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        background: scrolled ? "rgba(5,0,15,0.92)" : "transparent",
        backdropFilter: scrolled ? "blur(16px)" : "none",
        borderBottom: scrolled ? "1px solid rgba(124,58,237,0.18)" : "none",
        transition: "all 0.3s ease",
      }}
    >
      {/* Logo */}
      <button
        onClick={(e) => handleNavClick(e, "home")}
        style={{
          fontFamily: "'Syne', sans-serif",
          fontWeight: 800,
          fontSize: "1.3rem",
          color: "#fff",
          letterSpacing: "-0.02em",
          background: "none",
          border: "none",
          cursor: "pointer",
        }}
      >
        <span style={{ color: "#7c3aed" }}>S</span>amarth.dev
      </button>

      {/* Nav links */}
      <div style={{ display: "flex", gap: "2rem" }}>
        {links.map((link) => (
          <button
            key={link}
            onClick={(e) => handleNavClick(e, link)}
            style={{
              fontFamily: "'DM Mono', monospace",
              fontSize: "0.78rem",
              letterSpacing: "0.08em",
              textTransform: "uppercase",
              color: active === link ? "#a78bfa" : "rgba(255,255,255,0.55)",
              background: "none",
              border: "none",
              cursor: "pointer",
              fontWeight: active === link ? 600 : 400,
              transition: "color 0.2s",
              position: "relative",
              padding: "4px 0",
            }}
          >
            {link}
            {/* Active underline indicator */}
            <span
              style={{
                position: "absolute",
                bottom: 0,
                left: 0,
                right: 0,
                height: "2px",
                background: "#7c3aed",
                borderRadius: "2px",
                transform: active === link ? "scaleX(1)" : "scaleX(0)",
                transition: "transform 0.25s ease",
                transformOrigin: "center",
              }}
            />
          </button>
        ))}
      </div>
    </nav>
  );
}

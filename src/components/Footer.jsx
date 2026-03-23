export default function Footer() {
  return (
    <footer style={{
      borderTop: "1px solid rgba(124,58,237,0.12)",
      padding: "2rem 6vw",
      display: "flex",
      justifyContent: "space-between",
      alignItems: "center",
    }}>
      <div style={{ fontFamily: "'Syne', sans-serif", fontWeight: 700, color: "rgba(255,255,255,0.3)", fontSize: "0.9rem" }}>
        <span style={{ color: "#7c3aed" }}>S</span>amarth.dev
      </div>
      <div style={{ fontFamily: "'DM Mono', monospace", fontSize: "0.72rem", color: "rgba(255,255,255,0.2)" }}>
        samarthshirahatti7777@gmail.com
      </div>
    </footer>
  );
}

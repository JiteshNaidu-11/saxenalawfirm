import { C } from "../../data/constants";

export const FocusPage = ({ focus, setPage }) => (
  <div className="page-enter" style={{ paddingTop: 90 }}>
    <div style={{ background: `linear-gradient(145deg,${C.navy},${C.blue})`, padding: "64px 5% 56px", position: "relative", overflow: "hidden" }}>
      <div className="dot-bg-w" style={{ position: "absolute", inset: 0, opacity: .35 }} />
      <div style={{ maxWidth: 900, margin: "0 auto", position: "relative" }}>
        <button className="back-btn" onClick={() => { setPage("home"); setTimeout(() => document.getElementById("focus-areas")?.scrollIntoView({ behavior: "smooth" }), 80); }} style={{ color: "rgba(255,255,255,.7)", marginBottom: 28 }}>
          ← Back to Practice Areas
        </button>
        <div style={{ display: "inline-flex", alignItems: "center", gap: 9, background: "rgba(255,255,255,.1)", border: "1px solid rgba(255,255,255,.18)", borderRadius: 100, padding: "5px 14px", marginBottom: 20 }}>
          <span className="sans" style={{ fontSize: 11, letterSpacing: 2.5, color: "rgba(255,255,255,.75)", textTransform: "uppercase" }}>Practice Area</span>
        </div>
        <div style={{ display: "flex", alignItems: "center", gap: 16, marginBottom: 14 }}>
          <span style={{ fontSize: 42 }}>{focus.icon}</span>
          <h1 className="serif" style={{ fontSize: "clamp(28px,4.5vw,52px)", color: "#fff" }}>{focus.title}</h1>
        </div>
        <p className="sans" style={{ fontSize: 17, color: "rgba(255,255,255,.65)", maxWidth: 540, lineHeight: 1.75 }}>{focus.article.intro}</p>
      </div>
    </div>

    <div style={{ maxWidth: 900, margin: "0 auto", padding: "64px 5%" }}>
      <div className="prose">
        {focus.article.sections.map((s, i) => (
          <div key={i} style={{ marginBottom: 40, background: i % 2 === 0 ? "#fff" : "#F2F7FF", border: `1px solid ${C.border}`, borderRadius: 8, padding: "32px 36px", borderLeft: `4px solid ${C.mid}` }}>
            <h3 className="serif" style={{ fontSize: 24, color: C.navy, marginBottom: 14, marginTop: 0 }}>{s.heading}</h3>
            <p className="sans" style={{ fontSize: 15.5, lineHeight: 1.9, color: "#3a4a6a", marginBottom: 0 }}>{s.body}</p>
          </div>
        ))}
      </div>

      {/* CTA */}
      <div style={{ background: `linear-gradient(135deg,${C.navy},${C.blue})`, borderRadius: 10, padding: "40px 40px", marginTop: 40, display: "flex", alignItems: "center", justifyContent: "space-between", flexWrap: "wrap", gap: 24, position: "relative", overflow: "hidden" }}>
        <div className="dot-bg-w" style={{ position: "absolute", inset: 0, opacity: .3 }} />
        <div style={{ position: "relative" }}>
          <div className="serif" style={{ fontSize: 26, color: "#fff", marginBottom: 6 }}>Need advice on {focus.title}?</div>
          <div className="sans" style={{ fontSize: 14, color: "rgba(255,255,255,.62)" }}>Our specialists are available for a free initial consultation.</div>
        </div>
        <button className="btn-white" style={{ position: "relative" }} onClick={() => { setPage("home"); setTimeout(() => document.getElementById("contact")?.scrollIntoView({ behavior: "smooth" }), 80); }}>
          Book Free Consultation
        </button>
      </div>
    </div>
  </div>
);

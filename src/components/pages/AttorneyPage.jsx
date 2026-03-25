import { C } from "../../data/constants";

export const AttorneyPage = ({ attorney, setPage }) => (
  <div className="page-enter" style={{ paddingTop: 90 }}>
    {/* Hero Banner */}
    <div style={{ background: `linear-gradient(145deg,${C.navy},${C.blue})`, padding: "64px 5% 56px", position: "relative", overflow: "hidden" }}>
      <div className="dot-bg-w" style={{ position: "absolute", inset: 0, opacity: .35 }} />
      <div style={{ maxWidth: 1100, margin: "0 auto", position: "relative" }}>
        <button className="back-btn" onClick={() => { setPage("home"); setTimeout(() => document.getElementById("founders")?.scrollIntoView({ behavior: "smooth" }), 80); }} style={{ color: "rgba(255,255,255,.7)", marginBottom: 28 }}>
          ← Back to Team
        </button>
        <div style={{ display: "grid", gridTemplateColumns: "auto 1fr", gap: 36, alignItems: "center" }} className="g2">
          <img
            src={attorney.img}
            alt={attorney.name}
            onError={(e) => { e.currentTarget.onerror = null; e.currentTarget.src = "/Update_Logo.png"; }}
            style={{ width: 140, height: 140, borderRadius: "50%", objectFit: "cover", border: "4px solid rgba(255,255,255,.25)", flexShrink: 0 }}
          />
          <div>
            <div className="sans" style={{ fontSize: 11, letterSpacing: 3, color: "rgba(255,255,255,.55)", textTransform: "uppercase", marginBottom: 8 }}>{attorney.role}</div>
            <h1 className="serif" style={{ fontSize: "clamp(28px,4vw,46px)", color: "#fff", marginBottom: 10 }}>{attorney.name}</h1>
            <div className="sans" style={{ fontSize: 14, color: "rgba(255,255,255,.65)", marginBottom: 14 }}>{attorney.spec}</div>
            <div style={{ display: "flex", gap: 14, flexWrap: "wrap" }}>
              <span style={{ background: "rgba(255,255,255,.12)", border: "1px solid rgba(255,255,255,.18)", borderRadius: 100, padding: "4px 14px" }} className="sans">
                <span style={{ fontSize: 11, letterSpacing: 1.5, color: "rgba(255,255,255,.75)", textTransform: "uppercase" }}>
                  {(() => {
                    const exp = attorney.exp ?? "";
                    const isNumeric = /\d/.test(String(exp));
                    return isNumeric ? `${exp} Experience` : exp;
                  })()}
                </span>
              </span>
              <span style={{ background: "rgba(255,255,255,.12)", border: "1px solid rgba(255,255,255,.18)", borderRadius: 100, padding: "4px 14px" }} className="sans">
                <span style={{ fontSize: 11, letterSpacing: 1.5, color: "rgba(255,255,255,.75)", textTransform: "uppercase" }}>{attorney.bar}</span>
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>

    {/* Body */}
    <div style={{ maxWidth: 1100, margin: "0 auto", padding: "64px 5%", display: "grid", gridTemplateColumns: "1fr 340px", gap: 48, alignItems: "start" }} className="g2">
      {/* Main */}
      <div>
        {/* Quote */}
        <div style={{ background: C.pale, borderLeft: `5px solid ${C.blue}`, borderRadius: "0 8px 8px 0", padding: "24px 28px", marginBottom: 40 }}>
          <div className="serif" style={{ fontSize: 38, color: C.blue, opacity: .2, lineHeight: 1, marginBottom: 6 }}>"</div>
          <p className="serif" style={{ fontSize: 20, fontStyle: "italic", color: C.navy, lineHeight: 1.72 }}>"{attorney.quote}"</p>
        </div>

        {/* Bio */}
        <div className="sans" style={{ fontSize: 16, fontWeight: 300, lineHeight: 1.92, color: "#3a4a6a" }}>
          {attorney.bio.split("\n\n").map((para, i) => <p key={i} style={{ marginBottom: 20 }}>{para}</p>)}
        </div>

        {/* Notable Cases */}
        <div style={{ marginTop: 44 }}>
          <h2 className="serif" style={{ fontSize: 26, color: C.navy, marginBottom: 20 }}>Notable Cases & Outcomes</h2>
          <hr className="divider" style={{ width: 60, marginBottom: 24 }} />
          <div style={{ display: "flex", flexDirection: "column", gap: 14 }}>
            {attorney.cases.map((c, i) => (
              <div key={i} style={{ display: "flex", gap: 16, background: "#fff", border: `1px solid ${C.border}`, borderRadius: 6, padding: "18px 20px", borderLeft: `4px solid ${C.mid}` }}>
                <span style={{ fontSize: 18, flexShrink: 0, marginTop: 2 }}>🏆</span>
                <p className="sans" style={{ fontSize: 14.5, color: "#3a4a6a", lineHeight: 1.75 }}>{c}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Sidebar */}
      <div style={{ display: "flex", flexDirection: "column", gap: 18 }}>
        <div style={{ background: "#F2F7FF", border: `1px solid ${C.border}`, borderRadius: 8, padding: "24px" }}>
          <div className="sans" style={{ fontSize: 10.5, letterSpacing: 2.5, color: C.mid, textTransform: "uppercase", marginBottom: 14 }}>Education</div>
          <p className="sans" style={{ fontSize: 14, color: "#3a4a6a", lineHeight: 1.75 }}>{attorney.edu.split("|").map((e, i) => <span key={i} style={{ display: "block", marginBottom: 4 }}>{e.trim()}</span>)}</p>
        </div>
        {/* Awards & Recognition - commented out
        <div style={{ background: "#F2F7FF", border: `1px solid ${C.border}`, borderRadius: 8, padding: "24px" }}>
          <div className="sans" style={{ fontSize: 10.5, letterSpacing: 2.5, color: C.mid, textTransform: "uppercase", marginBottom: 14 }}>Awards & Recognition</div>
          {attorney.awards.map((a, i) => (
            <div key={i} style={{ display: "flex", gap: 10, marginBottom: 10 }}>
              <span style={{ color: "#F5A623", fontSize: 14, flexShrink: 0 }}>★</span>
              <span className="sans" style={{ fontSize: 13.5, color: "#3a4a6a", lineHeight: 1.65 }}>{a}</span>
            </div>
          ))}
        </div>
        */}
        <div style={{ background: C.navy, borderRadius: 8, padding: "24px" }}>
          <div className="sans" style={{ fontSize: 11, letterSpacing: 2, color: "rgba(255,255,255,.55)", textTransform: "uppercase", marginBottom: 10 }}>Book a Consultation</div>
          <p className="sans" style={{ fontSize: 13.5, color: "rgba(255,255,255,.65)", lineHeight: 1.7, marginBottom: 18 }}>Speak directly with {attorney.name.split(" ")[1]} about your legal matter.</p>
          <button className="btn-white" style={{ width: "100%" }} onClick={() => { setPage("home"); setTimeout(() => document.getElementById("contact")?.scrollIntoView({ behavior: "smooth" }), 80); }}>Book Consultation</button>
        </div>
      </div>
    </div>
  </div>
);

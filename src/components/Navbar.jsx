import { C } from "../data/constants";

export const Navbar = ({ page, setPage, scrolled, mobileOpen, setMobileOpen }) => {
  const navLinks = ["Home", "About", "Focus Areas", "Founders", "Blog", "Contact"];
  const isHome = page === "home";
  const showLight = isHome && !scrolled;

  return (
    <nav style={{ position: "fixed", top: 0, left: 0, right: 0, zIndex: 1000, background: scrolled || !isHome ? "rgba(255,255,255,0.97)" : "transparent", backdropFilter: scrolled || !isHome ? "blur(16px)" : "none", boxShadow: scrolled || !isHome ? "0 2px 20px rgba(15,45,94,.09)" : "none", borderBottom: scrolled || !isHome ? `1px solid ${C.border}` : "none", transition: "all .3s", padding: "0 5%" }}>
      <div style={{ maxWidth: 1300, margin: "0 auto", display: "flex", alignItems: "center", justifyContent: "space-between", height: 84 }}>
        {/* Logo */}
        <div style={{ display: "flex", alignItems: "center", cursor: "pointer" }} onClick={() => setPage("home")}>
          <img
            className="navbar-logo"
            src="/Black@2x-8.png"
            alt="Saxena & Tatke Advocates and Solicitors"
          />
        </div>

        {/* Desktop */}
        <div className="hide-mob" style={{ display: "flex", gap: 28, alignItems: "center" }}>
          {navLinks.map(l => (
            <button key={l} className={`nav-link ${showLight ? "nav-link-light" : "nav-link-dark"}`}
              onClick={() => { if (l === "Home") setPage("home"); else if (l === "Blog") setPage("blog"); else { setPage("home"); setTimeout(() => { const el = document.getElementById(l.toLowerCase().replace(/ /g, "-")); if (el) el.scrollIntoView({ behavior: "smooth" }); }, 80); } }}>
              {l}
            </button>
          ))}
          <button className="btn-navy" style={{ fontSize: 11.5, padding: "9px 20px" }} onClick={() => { setPage("home"); setTimeout(() => { document.getElementById("contact")?.scrollIntoView({ behavior: "smooth" }); }, 80); }}>Consultation</button>
        </div>

        {/* Mobile ham */}
        <button onClick={() => setMobileOpen(!mobileOpen)} style={{ display: "none", flexDirection: "column", gap: 5, background: "none", border: "none", cursor: "pointer", padding: 8 }} className="show-mob mobile-menu-btn" >
          {[0, 1, 2].map(i => <div key={i} style={{ width: i === 2 ? 14 : 22, height: 2, background: showLight ? "#fff" : C.navy, borderRadius: 2 }} />)}
        </button>
      </div>
      {mobileOpen && (
        <div style={{ background: "#fff", borderTop: `1px solid ${C.border}`, padding: "16px 5%" }}>
          {navLinks.map(l => (
            <button key={l} className="nav-link nav-link-dark" style={{ display: "block", width: "100%", textAlign: "left", padding: "11px 0", borderBottom: `1px solid ${C.pale}` }}
              onClick={() => { setMobileOpen(false); if (l === "Blog") setPage("blog"); else { setPage("home"); setTimeout(() => { document.getElementById(l.toLowerCase().replace(/ /g, "-"))?.scrollIntoView({ behavior: "smooth" }); }, 80); } }}>
              {l}
            </button>
          ))}
          <button className="btn-navy" style={{ width: "100%", marginTop: 12, padding: "12px" }} onClick={() => { setMobileOpen(false); setPage("home"); setTimeout(() => document.getElementById("contact")?.scrollIntoView({ behavior: "smooth" }), 80); }}>Consultation</button>
        </div>
      )}
    </nav>
  );
};

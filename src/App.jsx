import { useState, useEffect } from "react";
import { Navbar } from "./components/Navbar";
import { HomePage } from "./components/pages/HomePage";
import { AttorneyPage } from "./components/pages/AttorneyPage";
import { FocusPage } from "./components/pages/FocusPage";
import { BlogPage } from "./components/pages/BlogPage";
import { BlogPostPage } from "./components/pages/BlogPostPage";
import { AdminPanel } from "./components/pages/AdminPanel";
import { GLOBAL_CSS } from "./styles/globalStyles";

const isAdminPathname = (pathname) => {
  const normalized = (pathname || "/").replace(/\/+$/, "") || "/";
  return normalized.toLowerCase() === "/admin";
};

export default function App() {
  const [isAdminRoute, setIsAdminRoute] = useState(() =>
    typeof window !== "undefined" ? isAdminPathname(window.location.pathname) : false
  );
  const [page, setPage] = useState("home");
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [waOpen, setWaOpen] = useState(false);
  const [activeTeam, setActiveTeam] = useState(null);
  const [activeFocus, setActiveFocus] = useState(null);
  const [activeBlog, setActiveBlog] = useState(null);

  useEffect(() => {
    if (typeof window === "undefined") return undefined;
    const syncRoute = () => setIsAdminRoute(isAdminPathname(window.location.pathname));
    syncRoute();
    window.addEventListener("popstate", syncRoute);
    return () => window.removeEventListener("popstate", syncRoute);
  }, []);

  useEffect(() => {
    const fn = () => setScrolled(window.scrollY > 55);
    window.addEventListener("scroll", fn);
    return () => window.removeEventListener("scroll", fn);
  }, []);

  useEffect(() => { window.scrollTo(0, 0); }, [page]);

  const waMessage = encodeURIComponent(
    "Hello, I need legal consultation regarding my matter. Please guide me."
  );
  const waContacts = [
    { name: "Mitul Saxena", number: "919826235300" },
    { name: "Amit Tatke", number: "919009330202" },
  ];
  const socialLinks = [
    { label: "Instagram", href: "https://www.instagram.com/" },
    { label: "Facebook", href: "https://www.facebook.com/" },
    { label: "LinkedIn", href: "https://www.linkedin.com/" },
    { label: "WhatsApp", href: `https://wa.me/${waContacts[0].number}?text=${waMessage}` },
  ];

  const renderPage = () => {
    switch (page) {
      case "attorney": return activeTeam ? <AttorneyPage attorney={activeTeam} setPage={setPage} /> : null;
      case "focus":    return activeFocus ? <FocusPage focus={activeFocus} setPage={setPage} /> : null;
      case "blog":     return <BlogPage setPage={setPage} setActiveBlog={setActiveBlog} />;
      case "post":     return activeBlog ? <BlogPostPage post={activeBlog} setPage={setPage} setActiveBlog={setActiveBlog} /> : null;
      default:         return <HomePage setPage={setPage} setActiveTeam={setActiveTeam} setActiveFocus={setActiveFocus} setActiveBlog={setActiveBlog} />;
    }
  };

  if (isAdminRoute) {
    return (
      <>
        <style>{GLOBAL_CSS}</style>
        <AdminPanel />
      </>
    );
  }

  return (
    <>
      <style>{GLOBAL_CSS}</style>
      <Navbar page={page} setPage={setPage} scrolled={scrolled} mobileOpen={mobileOpen} setMobileOpen={setMobileOpen} />
      {renderPage()}

      {/* Global fixed social bar (site-wide) */}
      <div style={{ position: "fixed", right: 0, top: "42%", transform: "translateY(-50%)", zIndex: 1100 }}>
        <div style={{ background: "#0F2D5E", borderLeft: "2px solid #b79b52", borderTopLeftRadius: 10, borderBottomLeftRadius: 10, boxShadow: "0 10px 28px rgba(7,22,54,.35)", overflow: "hidden" }}>
          {socialLinks.map((s, idx) => (
            <a
              key={s.label}
              href={s.href}
              target="_blank"
              rel="noreferrer"
              aria-label={s.label}
              title={s.label}
              style={{
                width: 48,
                height: 48,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                color: "#fff",
                textDecoration: "none",
                borderBottom: idx === socialLinks.length - 1 ? "none" : "1px solid rgba(255,255,255,.14)",
                background: "transparent",
              }}
            >
              {s.label === "Instagram" && (
                <svg width="19" height="19" viewBox="0 0 24 24" fill="none" aria-hidden="true">
                  <rect x="3.2" y="3.2" width="17.6" height="17.6" rx="5.2" stroke="currentColor" strokeWidth="1.9" />
                  <circle cx="12" cy="12" r="4.2" stroke="currentColor" strokeWidth="1.9" />
                  <circle cx="17.4" cy="6.7" r="1.2" fill="currentColor" />
                </svg>
              )}
              {s.label === "Facebook" && (
                <svg width="19" height="19" viewBox="0 0 24 24" fill="none" aria-hidden="true">
                  <path d="M14.5 8.2H16.4V5.2H14.1C11.2 5.2 9.9 6.9 9.9 9.8V11.9H7.6V14.9H9.9V20H13V14.9H15.8L16.2 11.9H13V10.1C13 9 13.4 8.2 14.5 8.2Z" fill="currentColor" />
                </svg>
              )}
              {s.label === "LinkedIn" && (
                <svg width="19" height="19" viewBox="0 0 24 24" fill="none" aria-hidden="true">
                  <rect x="4.2" y="9.6" width="3.1" height="10.2" rx="1" fill="currentColor" />
                  <rect x="4.2" y="4.2" width="3.1" height="3.1" rx="1.55" fill="currentColor" />
                  <path d="M10 9.6H13V11.1C13.5 10.2 14.6 9.4 16.2 9.4C19.2 9.4 19.8 11.4 19.8 14V19.8H16.7V14.6C16.7 13.4 16.7 11.9 15.1 11.9C13.5 11.9 13.2 13.1 13.2 14.5V19.8H10V9.6Z" fill="currentColor" />
                </svg>
              )}
              {s.label === "WhatsApp" && (
                <svg width="19" height="19" viewBox="0 0 24 24" fill="none" aria-hidden="true">
                  <path d="M20 11.5C20 6.81 16.19 3 11.5 3S3 6.81 3 11.5C3 13.2 3.5 14.8 4.4 16.1L3.6 20.4L7.9 19.6C9.2 20.5 10.8 21 12.5 21C17.19 21 21 17.19 21 12.5" stroke="currentColor" strokeWidth="1.9" strokeLinecap="round" strokeLinejoin="round" />
                  <path d="M14.9 14.8C14.4 15.2 13.8 15.4 13.1 15.2C11.8 14.8 10.7 14.1 9.8 13.1C8.9 12 8.3 10.9 8.1 9.7C8 9 8.2 8.4 8.7 7.9L9.1 7.5C9.3 7.3 9.7 7.3 9.9 7.5L10.8 8.4C11 8.6 11 9 10.8 9.2L10.4 9.6C10.2 9.8 10.2 10 10.3 10.2C10.6 10.8 11 11.3 11.5 11.8C12 12.3 12.5 12.7 13.1 13C13.3 13.1 13.5 13 13.7 12.8L14.1 12.4C14.3 12.2 14.7 12.2 14.9 12.4L15.8 13.3C16 13.5 16 13.9 15.8 14.1L14.9 14.8Z" fill="currentColor" />
                </svg>
              )}
            </a>
          ))}
        </div>
      </div>

      {/* Global WhatsApp bubble (visible across all pages) */}
      <div style={{ position: "fixed", right: 20, bottom: 22, zIndex: 1200 }}>
        {waOpen && (
          <div style={{ width: 286, background: "#fff", border: "1px solid #dbe6f7", borderRadius: 10, boxShadow: "0 16px 42px rgba(15,45,94,.22)", padding: 12, marginBottom: 10 }}>
            <div style={{ fontSize: 11, letterSpacing: 1.3, textTransform: "uppercase", color: "#2E6DD4", marginBottom: 8, fontWeight: 600 }}>
              Chat on WhatsApp
            </div>
            {waContacts.map((c) => (
              <a
                key={c.number}
                href={`https://wa.me/${c.number}?text=${waMessage}`}
                target="_blank"
                rel="noreferrer"
                style={{ display: "block", textDecoration: "none", color: "#0F2D5E", border: "1px solid #e7eefb", borderRadius: 8, padding: "9px 10px", marginBottom: 8 }}
              >
                <div style={{ fontSize: 14, fontWeight: 600 }}>{c.name}</div>
                <div style={{ fontSize: 12.5, color: "#5A6A8A" }}>+{c.number.slice(0, 2)} {c.number.slice(2, 7)} {c.number.slice(7)}</div>
              </a>
            ))}
          </div>
        )}
        <button
          type="button"
          aria-label="Open WhatsApp contacts"
          onClick={() => setWaOpen((v) => !v)}
          style={{
            width: 58,
            height: 58,
            borderRadius: "50%",
            border: "2px solid #b79b52",
            background: "#062b63",
            color: "#25d366",
            cursor: "pointer",
            boxShadow: "0 12px 26px rgba(7,22,54,.45)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <svg width="27" height="27" viewBox="0 0 24 24" fill="none" aria-hidden="true">
            <path
              d="M20 11.5C20 6.80558 16.1944 3 11.5 3C6.80558 3 3 6.80558 3 11.5C3 13.3155 3.56863 14.9982 4.53625 16.3796L3.75 20.25L7.62037 19.4637C9.00179 20.4314 10.6845 21 12.5 21C17.1944 21 21 17.1944 21 12.5"
              stroke="currentColor"
              strokeWidth="1.8"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
            <path
              d="M14.8 14.9C14.3 15.35 13.7 15.55 13 15.35C11.7 14.98 10.62 14.28 9.75 13.25C8.82 12.18 8.25 11.03 8.05 9.8C7.94 9.1 8.17 8.5 8.63 8.03L9.1 7.57C9.35 7.32 9.75 7.32 10 7.57L11 8.57C11.25 8.82 11.25 9.22 11 9.47L10.55 9.92C10.4 10.07 10.35 10.29 10.44 10.48C10.72 11.08 11.12 11.63 11.66 12.15C12.19 12.69 12.73 13.08 13.32 13.35C13.52 13.44 13.75 13.38 13.9 13.22L14.34 12.78C14.59 12.53 14.99 12.53 15.24 12.78L16.24 13.78C16.49 14.03 16.49 14.43 16.24 14.68L14.8 14.9Z"
              fill="currentColor"
            />
          </svg>
        </button>
      </div>
    </>
  );
}

import { C } from "../../data/constants";
import { BLOG_POSTS } from "../../data/blog";
import { SLabel, SHeading } from "../common/CommonComponents";

export const BlogPage = ({ setPage, setActiveBlog }) => (
  <div className="page-enter" style={{ paddingTop: 90 }}>
    <div style={{ background: `linear-gradient(145deg,${C.navy},${C.blue})`, padding: "64px 5% 56px", position: "relative", overflow: "hidden" }}>
      <div className="dot-bg-w" style={{ position: "absolute", inset: 0, opacity: .4 }} />
      <div style={{ maxWidth: 1100, margin: "0 auto", position: "relative" }}>
        <button className="back-btn" onClick={() => setPage("home")} style={{ color: "rgba(255,255,255,.7)", marginBottom: 24 }}>← Back to Home</button>
        <SLabel>Legal Insights</SLabel>
        <h1 className="serif" style={{ fontSize: "clamp(32px,4.5vw,58px)", color: "#fff", marginBottom: 18 }}>Our Blog</h1>
        <p className="sans" style={{ fontSize: 16, color: "rgba(255,255,255,.62)", maxWidth: 520, lineHeight: 1.8 }}>
          Plain-language guides to the legal questions our clients ask most frequently — written by our advocates.
        </p>
      </div>
    </div>

    <div style={{ maxWidth: 1100, margin: "0 auto", padding: "64px 5%" }}>
      {/* Featured */}
      <div style={{ marginBottom: 56 }}>
        <div className="sans" style={{ fontSize: 10.5, letterSpacing: 3, color: C.mid, textTransform: "uppercase", marginBottom: 20, fontWeight: 600 }}>Featured Article</div>
        <div className="lift g2" style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 0, border: `1px solid ${C.border}`, borderRadius: 10, overflow: "hidden", cursor: "pointer" }}
          onClick={() => { setActiveBlog(BLOG_POSTS[0]); setPage("post"); window.scrollTo(0, 0); }}>
          <img src={BLOG_POSTS[0].img} alt={BLOG_POSTS[0].title} style={{ width: "100%", height: 340, objectFit: "cover", display: "block" }} />
          <div style={{ padding: "40px 36px", display: "flex", flexDirection: "column", justifyContent: "center" }}>
            <div style={{ display: "flex", gap: 10, marginBottom: 16 }}>
              <span className="sans" style={{ fontSize: 10, letterSpacing: 2, color: C.mid, textTransform: "uppercase", background: C.pale, padding: "3px 10px", borderRadius: 100 }}>{BLOG_POSTS[0].category}</span>
              <span className="sans" style={{ fontSize: 11.5, color: "#9aaac4" }}>{BLOG_POSTS[0].readTime}</span>
            </div>
            <h2 className="serif" style={{ fontSize: "clamp(20px,2.2vw,28px)", color: C.navy, lineHeight: 1.3, marginBottom: 14 }}>{BLOG_POSTS[0].title}</h2>
            <p className="sans" style={{ fontSize: 14.5, color: C.muted, lineHeight: 1.8, marginBottom: 24 }}>{BLOG_POSTS[0].excerpt}</p>
            <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
              <img src={BLOG_POSTS[0].authorImg} alt="" style={{ width: 32, height: 32, borderRadius: "50%", objectFit: "cover" }} />
              <span className="sans" style={{ fontSize: 13, color: C.muted }}>{BLOG_POSTS[0].author}</span>
              <span className="sans" style={{ fontSize: 12, color: "#9aaac4", marginLeft: 8 }}>{BLOG_POSTS[0].date}</span>
            </div>
          </div>
        </div>
      </div>

      {/* Category filter */}
      <div style={{ display: "flex", gap: 10, flexWrap: "wrap", marginBottom: 36 }}>
        {["All", ...new Set(BLOG_POSTS.map(p => p.category))].map(cat => (
          <span key={cat} className="sans" style={{ fontSize: 11.5, padding: "6px 16px", borderRadius: 100, border: `1px solid ${C.border}`, background: cat === "All" ? C.navy : "#fff", color: cat === "All" ? "#fff" : C.muted, cursor: "pointer", transition: "all .2s", letterSpacing: .5 }}
            onMouseEnter={e => { if (cat !== "All") { e.currentTarget.style.background = C.pale; e.currentTarget.style.borderColor = C.mid; } }}
            onMouseLeave={e => { if (cat !== "All") { e.currentTarget.style.background = "#fff"; e.currentTarget.style.borderColor = C.border; } }}>
            {cat}
          </span>
        ))}
      </div>

      {/* Grid */}
      <div style={{ display: "grid", gridTemplateColumns: "repeat(3,1fr)", gap: 22 }} className="g3">
        {BLOG_POSTS.map((p, i) => (
          <div key={p.id} className="blog-card" onClick={() => { setActiveBlog(p); setPage("post"); window.scrollTo(0, 0); }} style={{ animationDelay: `${i * .07}s` }}>
            <div style={{ overflow: "hidden" }}><img className="blog-img" src={p.img} alt={p.title} /></div>
            <div style={{ padding: "18px 18px 22px" }}>
              <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 10 }}>
                <span className="sans" style={{ fontSize: 9.5, letterSpacing: 2, color: C.mid, textTransform: "uppercase", background: C.pale, padding: "3px 9px", borderRadius: 100 }}>{p.category}</span>
                <span className="sans" style={{ fontSize: 11, color: "#9aaac4" }}>{p.readTime}</span>
              </div>
              <h3 className="serif" style={{ fontSize: 17, color: C.navy, lineHeight: 1.32, marginBottom: 8 }}>{p.title}</h3>
              <p className="sans" style={{ fontSize: 13, color: C.muted, lineHeight: 1.72, marginBottom: 14 }}>{p.excerpt}</p>
              <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
                <div style={{ display: "flex", alignItems: "center", gap: 7 }}>
                  <img src={p.authorImg} alt="" style={{ width: 26, height: 26, borderRadius: "50%", objectFit: "cover" }} />
                  <span className="sans" style={{ fontSize: 11.5, color: C.muted }}>{p.author}</span>
                </div>
                <span className="sans" style={{ fontSize: 11, color: "#9aaac4" }}>{p.date}</span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  </div>
);

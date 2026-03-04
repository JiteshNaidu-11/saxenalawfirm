import { C } from "../../data/constants";
import { BLOG_POSTS } from "../../data/blog";

export const BlogPostPage = ({ post, setPage, setActiveBlog }) => (
  <div className="page-enter" style={{ paddingTop: 90 }}>
    {/* Hero */}
    <div style={{ position: "relative", height: 420, overflow: "hidden" }}>
      <img src={post.img} alt={post.title} style={{ width: "100%", height: "100%", objectFit: "cover", display: "block", filter: "brightness(.45)" }} />
      <div style={{ position: "absolute", inset: 0, background: `linear-gradient(to top,rgba(15,45,94,.85),transparent 60%)` }} />
      <div style={{ position: "absolute", inset: 0, display: "flex", alignItems: "flex-end", padding: "0 5% 48px" }}>
        <div style={{ maxWidth: 820 }}>
          <button className="back-btn" onClick={() => setPage("blog")} style={{ color: "rgba(255,255,255,.65)", marginBottom: 20 }}>← Back to Blog</button>
          <div style={{ display: "flex", gap: 10, marginBottom: 14 }}>
            <span className="sans" style={{ fontSize: 10.5, letterSpacing: 2, color: "#fff", textTransform: "uppercase", background: "rgba(255,255,255,.18)", border: "1px solid rgba(255,255,255,.25)", padding: "3px 12px", borderRadius: 100 }}>{post.category}</span>
            <span className="sans" style={{ fontSize: 12, color: "rgba(255,255,255,.65)" }}>{post.readTime} · {post.date}</span>
          </div>
          <h1 className="serif" style={{ fontSize: "clamp(24px,3.5vw,42px)", color: "#fff", lineHeight: 1.22 }}>{post.title}</h1>
        </div>
      </div>
    </div>

    <div style={{ maxWidth: 820, margin: "0 auto", padding: "56px 5%" }}>
      {/* Author */}
      <div style={{ display: "flex", alignItems: "center", gap: 14, marginBottom: 44, padding: "18px 22px", background: C.pale, borderRadius: 8, border: `1px solid ${C.border}` }}>
        <img src={post.authorImg} alt={post.author} style={{ width: 52, height: 52, borderRadius: "50%", objectFit: "cover" }} />
        <div>
          <div className="serif" style={{ fontSize: 16, color: C.navy }}>{post.author}</div>
          <div className="sans" style={{ fontSize: 12, color: C.muted }}>Saxena Law Firm · {post.date}</div>
        </div>
      </div>

      {/* Intro */}
      <p className="sans" style={{ fontSize: 17, fontWeight: 500, lineHeight: 1.85, color: C.navy, marginBottom: 36, borderLeft: `4px solid ${C.mid}`, paddingLeft: 20, fontStyle: "italic" }}>
        {post.excerpt}
      </p>

      {/* Sections */}
      <div className="prose">
        {post.content.map((s, i) => (
          <div key={i} style={{ marginBottom: 36 }}>
            <h3 className="serif" style={{ fontSize: 24, color: C.navy, marginBottom: 14, marginTop: 0 }}>{s.heading}</h3>
            <p className="sans" style={{ fontSize: 15.5, lineHeight: 1.9, color: "#3a4a6a", marginBottom: 0 }}>{s.body}</p>
          </div>
        ))}
      </div>

      {/* Divider & more articles */}
      <hr style={{ border: "none", borderTop: `1px solid ${C.border}`, margin: "52px 0 40px" }} />
      <div className="serif" style={{ fontSize: 24, color: C.navy, marginBottom: 24 }}>More Articles</div>
      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 18 }} className="g2">
        {BLOG_POSTS.filter(p => p.id !== post.id).slice(0, 2).map(p => (
          <div key={p.id} className="blog-card" onClick={() => { setActiveBlog(p); window.scrollTo(0, 0); }}>
            <div style={{ overflow: "hidden" }}><img className="blog-img" src={p.img} alt={p.title} style={{ height: 150 }} /></div>
            <div style={{ padding: "14px 16px 18px" }}>
              <span className="sans" style={{ fontSize: 9.5, letterSpacing: 2, color: C.mid, textTransform: "uppercase", background: C.pale, padding: "2px 8px", borderRadius: 100 }}>{p.category}</span>
              <h4 className="serif" style={{ fontSize: 15, color: C.navy, lineHeight: 1.35, marginTop: 8 }}>{p.title}</h4>
            </div>
          </div>
        ))}
      </div>

      {/* Back CTA */}
      <div style={{ textAlign: "center", marginTop: 48 }}>
        <button className="btn-outline" onClick={() => setPage("blog")}>← View All Articles</button>
      </div>
    </div>
  </div>
);

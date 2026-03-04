import { useState, useEffect, useRef } from "react";
import { C } from "../../data/constants";
import { TEAM } from "../../data/team";
import { FOCUS_AREAS } from "../../data/focusAreas";
import { BLOG_POSTS } from "../../data/blog";
import { FadeIn, SLabel, SHeading } from "../common/CommonComponents";

export const HomePage = ({ setPage, setActiveTeam, setActiveFocus, setActiveBlog }) => {
  const statsRef = useRef(null);
  const [counts, setCounts] = useState([0, 0, 0, 0]);
  const [cDone, setCDone] = useState(false);
  const statNums = [2500, 25, 98, 15];

  useEffect(() => {
    const ob = new IntersectionObserver(([e]) => {
      if (e.isIntersecting && !cDone) {
        setCDone(true);
        statNums.forEach((n, i) => {
          let v = 0; const step = n / 55;
          const t = setInterval(() => {
            v += step;
            if (v >= n) { v = n; clearInterval(t); }
            setCounts(p => { const a = [...p]; a[i] = Math.floor(v); return a; });
          }, 20);
        });
      }
    }, { threshold: .3 });
    if (statsRef.current) ob.observe(statsRef.current);
    return () => ob.disconnect();
  }, [cDone]);

  const scrollTo = id => { document.getElementById(id)?.scrollIntoView({ behavior: "smooth" }); };

  return (
    <div>
      {/* HERO */}
      <section id="home" style={{ minHeight: "100vh", background: `linear-gradient(145deg, ${C.navy} 0%, #163472 45%, #1F55B0 100%)`, display: "flex", alignItems: "center", position: "relative", overflow: "hidden" }}>
        <div className="dot-bg-w" style={{ position: "absolute", inset: 0, opacity: .4 }} />
        <div style={{ position: "absolute", right: "-6%", top: "8%", width: 480, height: 480, borderRadius: "50%", border: "1px solid rgba(255,255,255,.06)" }} />
        <div style={{ position: "absolute", right: "4%", top: "16%", width: 340, height: 340, borderRadius: "50%", border: "1px solid rgba(255,255,255,.04)" }} />
        <div style={{ position: "absolute", left: "-10%", bottom: "-14%", width: 500, height: 500, borderRadius: "50%", background: "rgba(255,255,255,.018)" }} />

        <div style={{ maxWidth: 1300, margin: "0 auto", padding: "120px 5% 80px", width: "100%", display: "grid", gridTemplateColumns: "1.2fr .8fr", gap: 56, alignItems: "center" }}>
          <div>
            <div className="h-a1" style={{ display: "inline-flex", alignItems: "center", gap: 9, background: "rgba(255,255,255,.1)", border: "1px solid rgba(255,255,255,.18)", borderRadius: 100, padding: "6px 16px", marginBottom: 24 }}>
              <span className="pulse-dot" style={{ width: 7, height: 7, borderRadius: "50%", background: "#7EC8E3", display: "inline-block" }} />
              <span className="sans" style={{ fontSize: 11, letterSpacing: 2.5, color: "rgba(255,255,255,.82)", textTransform: "uppercase" }}>Established 1999 · Nashik, Maharashtra</span>
            </div>

            <h1 className="serif h-a2" style={{ fontSize: "clamp(38px,5.5vw,70px)", color: "#fff", lineHeight: 1.08, marginBottom: 22 }}>
              Defending Rights.<br />
              <span style={{ color: "#7EC8E3" }}>Delivering Justice.</span>
            </h1>

            <p className="sans h-a3" style={{ fontSize: 17, fontWeight: 300, lineHeight: 1.88, color: "rgba(255,255,255,.68)", maxWidth: 500, marginBottom: 40 }}>
              25+ years of trusted legal representation across criminal, civil, corporate and family law — by advocates who genuinely care about your outcome.
            </p>

            <div className="h-a4" style={{ display: "flex", gap: 14, flexWrap: "wrap" }}>
              <button className="btn-white" onClick={() => scrollTo("contact")}>Book Free Consultation</button>
              <button className="btn-ghost-w" onClick={() => scrollTo("focus-areas")}>Our Practice Areas</button>
            </div>

            <div className="h-a5" style={{ display: "flex", gap: 40, marginTop: 52, paddingTop: 36, borderTop: "1px solid rgba(255,255,255,.12)" }}>
              {[["2500+", "Cases"], ["25+", "Years"], ["98%", "Satisfaction"]].map(([n, l]) => (
                <div key={l}>
                  <div className="serif" style={{ fontSize: 30, color: "#7EC8E3" }}>{n}</div>
                  <div className="sans" style={{ fontSize: 10.5, letterSpacing: 2, color: "rgba(255,255,255,.38)", textTransform: "uppercase", marginTop: 4 }}>{l}</div>
                </div>
              ))}
            </div>
          </div>

          {/* Floating card */}
          <div className="float hide-mob" style={{ display: "flex", flexDirection: "column", gap: 14 }}>
            <div style={{ background: "rgba(255,255,255,.97)", borderRadius: 10, padding: "26px 28px", boxShadow: "0 24px 64px rgba(10,20,60,.3)" }}>
              <div style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 16 }}>
                <span style={{ fontSize: 28 }}>⚖️</span>
                <div><div className="serif" style={{ fontSize: 17, color: C.navy }}>Free Legal Consultation</div>
                  <div className="sans" style={{ fontSize: 12, color: C.muted }}>Speak with a senior advocate today</div></div>
              </div>
              <hr style={{ border: "none", borderTop: `1px solid ${C.border}`, marginBottom: 14 }} />
              {["Criminal Defense", "Family & Divorce", "Property Disputes", "Corporate Matters"].map(it => (
                <div key={it} style={{ display: "flex", alignItems: "center", gap: 9, marginBottom: 8 }}>
                  <div style={{ width: 16, height: 16, borderRadius: "50%", background: C.pale, display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
                    <div style={{ width: 6, height: 6, borderRadius: "50%", background: C.mid }} />
                  </div>
                  <span className="sans" style={{ fontSize: 13.5, color: "#374466" }}>{it}</span>
                </div>
              ))}
              <button className="btn-navy" style={{ width: "100%", marginTop: 14 }} onClick={() => scrollTo("contact")}>Get Started →</button>
            </div>
            <div style={{ background: "rgba(255,255,255,.1)", border: "1px solid rgba(255,255,255,.18)", borderRadius: 10, padding: "15px 20px", display: "flex", alignItems: "center", gap: 13 }}>
              <span style={{ fontSize: 24 }}>📞</span>
              <div><div className="sans" style={{ fontSize: 10, letterSpacing: 2.5, color: "rgba(255,255,255,.5)", textTransform: "uppercase" }}>Call Now</div>
                <div className="serif" style={{ fontSize: 19, color: "#fff" }}>+91 98765 43210</div></div>
            </div>
          </div>
        </div>

        <div style={{ position: "absolute", bottom: 32, left: "50%", transform: "translateX(-50%)", textAlign: "center", animation: "hFadeUp .7s ease 1.1s both" }}>
          <div className="sans" style={{ fontSize: 9.5, letterSpacing: 3, color: "rgba(255,255,255,.3)", textTransform: "uppercase", marginBottom: 9 }}>Scroll</div>
          <div className="bob" style={{ width: 1, height: 32, background: "linear-gradient(to bottom,rgba(255,255,255,.5),transparent)", margin: "0 auto" }} />
        </div>
      </section>

      {/* ABOUT */}
      <section id="about" style={{ padding: "108px 5%", background: "#fff" }}>
        <div style={{ maxWidth: 1300, margin: "0 auto", display: "grid", gridTemplateColumns: "1fr 1fr", gap: 72, alignItems: "center" }} className="g2">
          <FadeIn dir="left">
            <div style={{ position: "relative" }}>
              <div style={{ background: C.pale, borderRadius: 8, padding: "44px 38px", position: "relative", borderLeft: `5px solid ${C.blue}` }}>
                <div className="serif" style={{ fontSize: 52, color: C.blue, opacity: .18, lineHeight: 1, marginBottom: 10 }}>"</div>
                <p className="sans" style={{ fontSize: 19, fontStyle: "italic", lineHeight: 1.82, color: "#2a3a5e", marginBottom: 28 }}>
                  Law is not merely a profession for us — it is a responsibility to uphold truth, protect the innocent, and ensure justice prevails in every matter we handle.
                </p>
                <div style={{ display: "flex", alignItems: "center", gap: 13 }}>
                  <img src="https://i.pravatar.cc/80?img=11" alt="RS" style={{ width: 48, height: 48, borderRadius: "50%", objectFit: "cover" }} />
                  <div>
                    <div className="serif" style={{ fontSize: 15, color: C.navy }}>Adv. Rajesh Saxena</div>
                    <div className="sans" style={{ fontSize: 10.5, letterSpacing: 2, color: C.mid, textTransform: "uppercase" }}>Founder & Senior Partner</div>
                  </div>
                </div>
              </div>
              <div style={{ position: "absolute", bottom: -18, right: -18, background: C.navy, color: "#fff", padding: "17px 22px", borderRadius: 6, boxShadow: "0 10px 32px rgba(15,45,94,.28)", textAlign: "center" }}>
                <div className="serif" style={{ fontSize: 28 }}>25+</div>
                <div className="sans" style={{ fontSize: 10, opacity: .8, letterSpacing: 1.5 }}>Years of Practice</div>
              </div>
            </div>
          </FadeIn>
          <FadeIn dir="right">
            <div>
              <SLabel>About Our Firm</SLabel>
              <SHeading>A Firm Built on <span style={{ color: C.mid }}>Trust & Results</span></SHeading>
              <hr className="divider" style={{ width: 70, margin: "0 0 24px" }} />
              <p className="sans" style={{ fontSize: 15.5, fontWeight: 300, lineHeight: 1.9, color: C.muted, marginBottom: 18 }}>
                Founded in 1999, Saxena Law Firm has grown into one of the most respected full-service law firms in Maharashtra, with 15+ experienced advocates and a track record spanning over 2,500 cases.
              </p>
              <p className="sans" style={{ fontSize: 15.5, fontWeight: 300, lineHeight: 1.9, color: C.muted, marginBottom: 32 }}>
                We believe every client deserves personalised, strategic legal representation — from the first consultation to the final judgment.
              </p>
              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12, marginBottom: 32 }}>
                {["Client-First Approach", "Transparent Communication", "Strong Courtroom Advocacy", "Proven Track Record"].map(v => (
                  <div key={v} style={{ display: "flex", alignItems: "flex-start", gap: 9 }}>
                    <div style={{ width: 18, height: 18, borderRadius: 3, background: C.pale, display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0, marginTop: 2 }}>
                      <span style={{ color: C.blue, fontSize: 10, fontWeight: 700 }}>✓</span>
                    </div>
                    <span className="sans" style={{ fontSize: 13.5, color: "#3a4a6a" }}>{v}</span>
                  </div>
                ))}
              </div>
              <button className="btn-navy" onClick={() => scrollTo("team")}>Meet Our Advocates</button>
            </div>
          </FadeIn>
        </div>
      </section>

      {/* FOCUS AREAS */}
      <section id="focus-areas" style={{ padding: "108px 5%", background: "#F2F7FF" }}>
        <div style={{ maxWidth: 1300, margin: "0 auto" }}>
          <FadeIn>
            <div style={{ textAlign: "center", marginBottom: 58 }}>
              <SLabel>Our Focus</SLabel>
              <SHeading>Areas of <span style={{ color: C.mid }}>Legal Practice</span></SHeading>
              <hr className="divider" style={{ width: 80, margin: "0 auto 18px" }} />
              <p className="sans" style={{ fontSize: 15.5, fontWeight: 300, color: C.muted, maxWidth: 490, margin: "0 auto", lineHeight: 1.8 }}>
                Click on any area to read a detailed guide on what we do, how we approach cases, and what outcomes you can expect.
              </p>
            </div>
          </FadeIn>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(3,1fr)", gap: 18 }} className="g3">
            {FOCUS_AREAS.map((f, i) => (
              <FadeIn key={f.id} delay={i * 0.07}>
                <div className="focus-card" onClick={() => { setActiveFocus(f); setPage("focus"); window.scrollTo(0, 0); }}>
                  <div style={{ width: 50, height: 50, borderRadius: 6, background: C.pale, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 24, marginBottom: 16 }}>{f.icon}</div>
                  <h3 className="serif" style={{ fontSize: 20, color: C.navy, marginBottom: 8 }}>{f.title}</h3>
                  <hr style={{ border: "none", borderTop: `2px solid ${C.pale}`, marginBottom: 12 }} />
                  <p className="sans" style={{ fontSize: 13.5, fontWeight: 300, color: C.muted, lineHeight: 1.78, marginBottom: 16 }}>{f.tagline}</p>
                  <div className="sans" style={{ fontSize: 12.5, fontWeight: 600, color: C.mid, display: "flex", alignItems: "center", gap: 5 }}>Read More →</div>
                </div>
              </FadeIn>
            ))}
          </div>
        </div>
      </section>

      {/* STATS */}
      <section style={{ padding: "64px 5%", background: `linear-gradient(135deg,${C.navy},${C.blue})`, position: "relative", overflow: "hidden" }} ref={statsRef}>
        <div className="dot-bg-w" style={{ position: "absolute", inset: 0, opacity: .35 }} />
        <div style={{ maxWidth: 1300, margin: "0 auto", display: "grid", gridTemplateColumns: "repeat(4,1fr)", gap: 24, position: "relative" }} className="g-stat">
          {[["Cases Handled", "+"], ["Years of Practice", "+"], ["Client Satisfaction", "%"], ["Expert Advocates", "+"]].map(([l, s], i) => (
            <div key={l} style={{ textAlign: "center", padding: "20px 12px" }}>
              <div className="serif" style={{ fontSize: "clamp(42px,4.5vw,62px)", color: "#fff", lineHeight: 1, marginBottom: 10 }}>{counts[i]}{s}</div>
              <hr style={{ border: "none", borderTop: "1px solid rgba(255,255,255,.2)", width: 40, margin: "0 auto 12px" }} />
              <div className="sans" style={{ fontSize: 11, letterSpacing: 2.5, color: "rgba(255,255,255,.55)", textTransform: "uppercase" }}>{l}</div>
            </div>
          ))}
        </div>
      </section>

      {/* TEAM */}
      <section id="team" style={{ padding: "108px 5%", background: "#fff" }}>
        <div style={{ maxWidth: 1300, margin: "0 auto" }}>
          <FadeIn>
            <div style={{ textAlign: "center", marginBottom: 58 }}>
              <SLabel>Our People</SLabel>
              <SHeading>Meet Our <span style={{ color: C.mid }}>Advocates</span></SHeading>
              <hr className="divider" style={{ width: 80, margin: "0 auto 18px" }} />
              <p className="sans" style={{ fontSize: 15.5, fontWeight: 300, color: C.muted, maxWidth: 460, margin: "0 auto" }}>
                Click on any advocate to read their full profile, specialisation, and notable case highlights.
              </p>
            </div>
          </FadeIn>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(3,1fr)", gap: 22 }} className="g3">
            {TEAM.map((m, i) => (
              <FadeIn key={m.id} delay={i * 0.08}>
                <div className="team-card" onClick={() => { setActiveTeam(m); setPage("attorney"); window.scrollTo(0, 0); }}>
                  <div style={{ position: "relative", overflow: "hidden" }}>
                    <img className="team-img" src={m.img} alt={m.name} />
                    <div className="team-overlay">
                      <div className="sans" style={{ color: "#fff", fontSize: 13, fontWeight: 500 }}>Click to read full profile →</div>
                    </div>
                  </div>
                  <div style={{ padding: "20px 20px 22px", borderTop: `3px solid ${C.pale}` }}>
                    <div className="serif" style={{ fontSize: 18, color: C.navy, marginBottom: 4 }}>{m.name}</div>
                    <div className="sans" style={{ fontSize: 10.5, letterSpacing: 1.8, color: C.mid, textTransform: "uppercase", marginBottom: 8 }}>{m.role}</div>
                    <div className="sans" style={{ fontSize: 13, color: C.muted }}>{m.spec} · {m.exp}</div>
                  </div>
                </div>
              </FadeIn>
            ))}
          </div>
        </div>
      </section>

      {/* TESTIMONIALS */}
      <section style={{ padding: "108px 5%", background: "#F2F7FF" }}>
        <div style={{ maxWidth: 1300, margin: "0 auto" }}>
          <FadeIn>
            <div style={{ textAlign: "center", marginBottom: 58 }}>
              <SLabel>Client Stories</SLabel>
              <SHeading>What Our Clients <span style={{ color: C.mid }}>Say</span></SHeading>
              <hr className="divider" style={{ width: 80, margin: "0 auto" }} />
            </div>
          </FadeIn>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(3,1fr)", gap: 20 }} className="g3">
            {[
              { n: "Suresh Patel", r: "Business Owner", t: "Saxena Law Firm handled our corporate dispute with exceptional skill. Their strategic approach and clear communication made the entire process smooth. Highly recommended.", img: "https://i.pravatar.cc/60?img=12" },
              { n: "Meena Gupta", r: "Homeowner", t: "I was dealing with a complex property dispute and felt completely lost. Adv. Saxena's team was professional, empathetic, and resolved everything in my favour.", img: "https://i.pravatar.cc/60?img=48" },
              { n: "Rahul Verma", r: "IT Professional", t: "Fast, reliable, and focused on results. They handled my criminal case with total dedication. I am truly grateful to this incredible team for their unwavering support.", img: "https://i.pravatar.cc/60?img=14" },
            ].map((t, i) => (
              <FadeIn key={t.n} delay={i * .12}>
                <div className="lift" style={{ background: "#fff", border: `1px solid ${C.border}`, borderRadius: 8, padding: "32px 24px", position: "relative" }}>
                  <div style={{ position: "absolute", top: 16, right: 20, fontSize: 48, color: C.pale, fontFamily: "Georgia", fontWeight: 700, lineHeight: 1 }}>"</div>
                  <div style={{ display: "flex", gap: 2, marginBottom: 14 }}>
                    {[...Array(5)].map((_, j) => <span key={j} style={{ color: "#F5A623", fontSize: 13 }}>★</span>)}
                  </div>
                  <p className="sans" style={{ fontSize: 14.5, fontWeight: 300, lineHeight: 1.85, color: "#3a4a6a", marginBottom: 22, fontStyle: "italic" }}>"{t.t}"</p>
                  <hr style={{ border: "none", borderTop: `1px solid ${C.border}`, marginBottom: 18 }} />
                  <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
                    <img src={t.img} alt={t.n} style={{ width: 40, height: 40, borderRadius: "50%", objectFit: "cover" }} />
                    <div>
                      <div className="serif" style={{ fontSize: 15, color: C.navy }}>{t.n}</div>
                      <div className="sans" style={{ fontSize: 11, color: C.mid }}>{t.r}</div>
                    </div>
                  </div>
                </div>
              </FadeIn>
            ))}
          </div>
        </div>
      </section>

      {/* BLOG PREVIEW */}
      <section id="blog-preview" style={{ padding: "108px 5%", background: "#fff" }}>
        <div style={{ maxWidth: 1300, margin: "0 auto" }}>
          <FadeIn>
            <div style={{ display: "flex", alignItems: "flex-end", justifyContent: "space-between", flexWrap: "wrap", gap: 20, marginBottom: 50 }}>
              <div>
                <SLabel>From Our Desk</SLabel>
                <SHeading>Legal <span style={{ color: C.mid }}>Insights & Articles</span></SHeading>
                <hr className="divider" style={{ width: 72 }} />
              </div>
              <button className="btn-outline" onClick={() => { setPage("blog"); window.scrollTo(0, 0); }}>View All Articles →</button>
            </div>
          </FadeIn>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(3,1fr)", gap: 22 }} className="g3">
            {BLOG_POSTS.slice(0, 3).map((p, i) => (
              <FadeIn key={p.id} delay={i * .08}>
                <div className="blog-card" onClick={() => { setActiveBlog(p); setPage("post"); window.scrollTo(0, 0); }}>
                  <div style={{ overflow: "hidden" }}>
                    <img className="blog-img" src={p.img} alt={p.title} />
                  </div>
                  <div style={{ padding: "20px 20px 24px" }}>
                    <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 12 }}>
                      <span className="sans" style={{ fontSize: 10, letterSpacing: 2, color: C.mid, textTransform: "uppercase", background: C.pale, padding: "3px 10px", borderRadius: 100 }}>{p.category}</span>
                      <span className="sans" style={{ fontSize: 11.5, color: "#9aaac4" }}>{p.readTime}</span>
                    </div>
                    <h3 className="serif" style={{ fontSize: 18, color: C.navy, lineHeight: 1.3, marginBottom: 10 }}>{p.title}</h3>
                    <p className="sans" style={{ fontSize: 13.5, color: C.muted, lineHeight: 1.75, marginBottom: 16 }}>{p.excerpt}</p>
                    <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
                      <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
                        <img src={p.authorImg} alt={p.author} style={{ width: 28, height: 28, borderRadius: "50%", objectFit: "cover" }} />
                        <span className="sans" style={{ fontSize: 12, color: C.muted }}>{p.author}</span>
                      </div>
                      <span className="sans" style={{ fontSize: 11.5, color: "#9aaac4" }}>{p.date}</span>
                    </div>
                  </div>
                </div>
              </FadeIn>
            ))}
          </div>
        </div>
      </section>

      {/* CONTACT */}
      <section id="contact" style={{ padding: "108px 5%", background: "#F2F7FF" }}>
        <div style={{ maxWidth: 1300, margin: "0 auto" }}>
          <FadeIn>
            <div style={{ textAlign: "center", marginBottom: 58 }}>
              <SLabel>Get In Touch</SLabel>
              <SHeading>Book a <span style={{ color: C.mid }}>Free Consultation</span></SHeading>
              <hr className="divider" style={{ width: 80, margin: "0 auto 18px" }} />
              <p className="sans" style={{ fontSize: 15.5, color: C.muted, maxWidth: 440, margin: "0 auto" }}>Your first consultation is completely free. Speak with our senior advocates today.</p>
            </div>
          </FadeIn>
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1.7fr", gap: 30 }} className="g2">
            <FadeIn dir="left">
              <div style={{ display: "flex", flexDirection: "column", gap: 14 }}>
                {[["📍", "Office Address", "14, Legal Complex, Court Road\nNashik, Maharashtra 422001"], ["📞", "Phone", "+91 98765 43210\n+91 253 234 5678"], ["✉️", "Email", "contact@saxenalawfirm.com"], ["🕐", "Hours", "Mon – Sat: 10:00 AM – 7:00 PM\n24/7 Emergency Support"]].map(([ic, lb, vl]) => (
                  <div key={lb} style={{ background: "#fff", border: `1px solid ${C.border}`, borderRadius: 6, padding: "18px 20px", display: "flex", gap: 13, alignItems: "flex-start", borderLeft: `4px solid ${C.mid}` }}>
                    <span style={{ fontSize: 20 }}>{ic}</span>
                    <div>
                      <div className="sans" style={{ fontSize: 10, letterSpacing: 2, color: C.mid, textTransform: "uppercase", marginBottom: 4 }}>{lb}</div>
                      <div className="sans" style={{ fontSize: 14, color: "#2a3a5e", lineHeight: 1.7, whiteSpace: "pre-line" }}>{vl}</div>
                    </div>
                  </div>
                ))}
              </div>
            </FadeIn>
            <FadeIn dir="right">
              <div style={{ background: "#fff", border: `1px solid ${C.border}`, borderRadius: 8, padding: "42px 38px", boxShadow: "0 8px 40px rgba(15,45,94,.07)" }}>
                <div className="serif" style={{ fontSize: 22, color: C.navy, marginBottom: 24 }}>Send Us a Message</div>
                <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16, marginBottom: 16 }}>
                  {[["Full Name", "Your full name"], ["Phone", "+91 xxxxx xxxxx"]].map(([l, p]) => (
                    <div key={l}>
                      <label className="sans" style={{ fontSize: 11, fontWeight: 600, color: "#3a4a6a", letterSpacing: 1, display: "block", marginBottom: 6 }}>{l}</label>
                      <input placeholder={p} style={{ width: "100%", border: `1.5px solid ${C.border}`, borderRadius: 4, padding: "11px 13px", fontSize: 14, color: "#2a3a5e", fontFamily: "'DM Sans',sans-serif", background: "#fafcff" }} />
                    </div>
                  ))}
                </div>
                {[["Email", "your@email.com"], ["Legal Matter", null]].map(([l, p]) => (
                  <div key={l} style={{ marginBottom: 16 }}>
                    <label className="sans" style={{ fontSize: 11, fontWeight: 600, color: "#3a4a6a", letterSpacing: 1, display: "block", marginBottom: 6 }}>{l}</label>
                    {p ? <input placeholder={p} style={{ width: "100%", border: `1.5px solid ${C.border}`, borderRadius: 4, padding: "11px 13px", fontSize: 14, color: "#2a3a5e", fontFamily: "'DM Sans',sans-serif", background: "#fafcff" }} />
                      : <select style={{ width: "100%", border: `1.5px solid ${C.border}`, borderRadius: 4, padding: "11px 13px", fontSize: 14, color: "#3a4a6a", fontFamily: "'DM Sans',sans-serif", background: "#fafcff" }}>
                        <option value="">Select area</option>
                        {FOCUS_AREAS.map(f => <option key={f.id}>{f.title}</option>)}
                      </select>}
                  </div>
                ))}
                <div style={{ marginBottom: 24 }}>
                  <label className="sans" style={{ fontSize: 11, fontWeight: 600, color: "#3a4a6a", letterSpacing: 1, display: "block", marginBottom: 6 }}>Describe Your Case</label>
                  <textarea rows={4} placeholder="Briefly describe your legal situation..." style={{ width: "100%", border: `1.5px solid ${C.border}`, borderRadius: 4, padding: "11px 13px", fontSize: 14, color: "#2a3a5e", fontFamily: "'DM Sans',sans-serif", background: "#fafcff", resize: "vertical" }} />
                </div>
                <button className="btn-navy" style={{ width: "100%", padding: "14px" }}>Submit & Book Consultation →</button>
                <p className="sans" style={{ fontSize: 11.5, color: "#8a9ab8", textAlign: "center", marginTop: 12 }}>We respond within 2 business hours. All inquiries are strictly confidential.</p>
              </div>
            </FadeIn>
          </div>
        </div>
      </section>

      {/* FOOTER */}
      <footer style={{ background: C.navy, borderTop: `4px solid ${C.mid}` }}>
        <div style={{ maxWidth: 1300, margin: "0 auto", padding: "50px 5% 24px" }}>
          <div style={{ display: "grid", gridTemplateColumns: "2fr 1fr 1fr 1fr", gap: 40, marginBottom: 38 }} className="g4">
            <div>
              <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 15 }}>
                <div style={{ width: 40, height: 40, background: "#fff", borderRadius: 3, display: "flex", alignItems: "center", justifyContent: "center", fontFamily: "'DM Serif Display',serif", fontSize: 20, color: C.navy }}>S</div>
                <div>
                  <div className="serif" style={{ fontSize: 18, color: "#fff", letterSpacing: 1 }}>SAXENA</div>
                  <div className="sans" style={{ fontSize: 8.5, color: "#7EC8E3", letterSpacing: 4 }}>LAW FIRM</div>
                </div>
              </div>
              <p className="sans" style={{ fontSize: 13, color: "rgba(255,255,255,.42)", lineHeight: 1.8, maxWidth: 270, marginBottom: 16 }}>Dedicated to delivering justice with integrity since 1999. Your trusted legal partner across Maharashtra.</p>
              <div className="sans" style={{ fontSize: 11, color: "rgba(255,255,255,.28)", fontStyle: "italic" }}>"Audi Alteram Partem"</div>
            </div>
            {[["Quick Links", ["Home", "About", "Focus Areas", "Team", "Blog", "Contact"]], ["Practice Areas", FOCUS_AREAS.map(f => f.title)], ["Contact", ["+91 98765 43210", "contact@saxenalawfirm.com", "Court Road, Nashik", "Mon–Sat: 10AM–7PM"]]].map(([title, items]) => (
              <div key={title}>
                <div className="sans" style={{ fontSize: 10, letterSpacing: 3, color: "#7EC8E3", textTransform: "uppercase", marginBottom: 14, fontWeight: 600 }}>{title}</div>
                <hr style={{ border: "none", borderTop: "1px solid rgba(255,255,255,.12)", marginBottom: 14, width: 28 }} />
                {items.map(it => (
                  <div key={it} className="sans" style={{ fontSize: 12.5, color: "rgba(255,255,255,.38)", marginBottom: 8, cursor: "pointer", transition: "color .2s" }}
                    onMouseEnter={e => e.target.style.color = "rgba(255,255,255,.8)"} onMouseLeave={e => e.target.style.color = "rgba(255,255,255,.38)"}>{it}</div>
                ))}
              </div>
            ))}
          </div>
          <hr style={{ border: "none", borderTop: "1px solid rgba(255,255,255,.08)", marginBottom: 20 }} />
          <div style={{ display: "flex", justifyContent: "space-between", flexWrap: "wrap", gap: 10 }}>
            <div className="sans" style={{ fontSize: 11.5, color: "rgba(255,255,255,.25)" }}>© 2025 Saxena Law Firm. All Rights Reserved.</div>
            <div className="sans" style={{ fontSize: 11.5, color: "rgba(255,255,255,.25)" }}>Privacy Policy · Terms · Disclaimer</div>
          </div>
        </div>
      </footer>
    </div>
  );
};

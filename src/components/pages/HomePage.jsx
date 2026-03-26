import { useState } from "react";
import { C } from "../../data/constants";
import { TEAM } from "../../data/team";
import { FOCUS_AREAS } from "../../data/focusAreas";
import { BLOG_POSTS } from "../../data/blog";
import { FadeIn, SLabel, SHeading } from "../common/CommonComponents";
import { isSupabaseConfigured, supabase } from "../../lib/supabase";

export const HomePage = ({ setPage, setActiveTeam, setActiveFocus, setActiveBlog }) => {
  // Temporary toggle: keep testimonials code intact while hiding from UI.
  const SHOW_CLIENT_STORIES = false;

  const statCards = [
    { value: "20+", label: "Years (Mitul Saxena)" },
    { value: "15+", label: "Years (Amit Tatke)" },
    { value: "Decades", label: "Across Jurisdictions" },
    { value: "2", label: "Senior Partners" },
  ];


  const scrollTo = id => { document.getElementById(id)?.scrollIntoView({ behavior: "smooth" }); };
  const [inquiryForm, setInquiryForm] = useState({
    fullName: "",
    phone: "",
    email: "",
    legalMatter: "",
  });
  const [inquiryStatus, setInquiryStatus] = useState({ type: "", message: "" });
  const [isSubmittingInquiry, setIsSubmittingInquiry] = useState(false);

  const handleInquiryChange = (field, value) => {
    setInquiryForm((prev) => ({ ...prev, [field]: value }));
    if (inquiryStatus.message) {
      setInquiryStatus({ type: "", message: "" });
    }
  };

  const handleInquirySubmit = async (event) => {
    event.preventDefault();

    if (!isSupabaseConfigured || !supabase) {
      setInquiryStatus({
        type: "error",
        message: "Form is not configured yet. Please connect Supabase keys in .env.",
      });
      return;
    }

    const payload = {
      full_name: inquiryForm.fullName.trim(),
      phone: inquiryForm.phone.trim(),
      email: inquiryForm.email.trim(),
      legal_matter: inquiryForm.legalMatter,
      source: "website",
    };

    if (!payload.full_name || !payload.phone || !payload.email || !payload.legal_matter) {
      setInquiryStatus({
        type: "error",
        message: "Please fill all fields before submitting.",
      });
      return;
    }

    setIsSubmittingInquiry(true);
    setInquiryStatus({ type: "", message: "" });

    const { error } = await supabase.from("inquiries").insert(payload);

    if (error) {
      setInquiryStatus({
        type: "error",
        message: error.message || "Unable to submit right now. Please try again.",
      });
      setIsSubmittingInquiry(false);
      return;
    }

    setInquiryStatus({
      type: "success",
      message: "Thank you. Your inquiry has been submitted successfully.",
    });
    setInquiryForm({
      fullName: "",
      phone: "",
      email: "",
      legalMatter: "",
    });
    setIsSubmittingInquiry(false);
  };

  return (
    <div>
      {/* HERO */}
      <section id="home" style={{ minHeight: "100vh", background: "linear-gradient(145deg, #133D86 0%, #1E4F9D 48%, #2A62B8 100%)", display: "flex", alignItems: "center", position: "relative", overflow: "hidden" }}>
        <div className="dot-bg-w" style={{ position: "absolute", inset: 0, opacity: .26 }} />
        <div style={{ position: "absolute", right: "-6%", top: "8%", width: 480, height: 480, borderRadius: "50%", border: "1px solid rgba(255,255,255,.06)" }} />
        <div style={{ position: "absolute", right: "4%", top: "16%", width: 340, height: 340, borderRadius: "50%", border: "1px solid rgba(255,255,255,.04)" }} />
        <div style={{ position: "absolute", left: "-10%", bottom: "-14%", width: 500, height: 500, borderRadius: "50%", background: "rgba(255,255,255,.018)" }} />

        <div className="g2" style={{ maxWidth: 1300, margin: "0 auto", padding: "120px 5% 80px", width: "100%", display: "grid", gridTemplateColumns: "1.2fr .8fr", gap: 56, alignItems: "center" }}>
          <div>
            <div className="h-a1" style={{ display: "inline-flex", alignItems: "center", gap: 9, background: "rgba(255,255,255,.1)", border: "1px solid rgba(255,255,255,.18)", borderRadius: 100, padding: "6px 16px", marginBottom: 24 }}>
              <span className="pulse-dot" style={{ width: 7, height: 7, borderRadius: "50%", background: "#7EC8E3", display: "inline-block" }} />
              <span className="sans" style={{ fontSize: 11, letterSpacing: 2.5, color: "rgba(255,255,255,.82)", textTransform: "uppercase" }}>Indore, Madhya Pradesh</span>
            </div>

            <h1 className="serif h-a2" style={{ fontSize: "clamp(38px,5.5vw,70px)", color: "#fff", lineHeight: 1.08, marginBottom: 22 }}>
              Saxena & Tatke<br />
              <span style={{ color: "#7EC8E3" }}>Advocates and Solicitors</span>
            </h1>

            <p className="sans h-a3" style={{ fontSize: 17, fontWeight: 300, lineHeight: 1.88, color: "rgba(255,255,255,.68)", maxWidth: 520, marginBottom: 40 }}>
              Decades of experience across all jurisdictions. A premier multidisciplinary law firm offering comprehensive legal solutions across civil, criminal, commercial and matrimonial law — with procedural precision and unwavering integrity.
            </p>

            <div className="h-a4" style={{ display: "flex", gap: 14, flexWrap: "wrap" }}>
              <button className="btn-white" onClick={() => scrollTo("contact")}>Book Consultation</button>
              <button className="btn-ghost-w" onClick={() => scrollTo("focus-areas")}>Our Practice Areas</button>
            </div>

            <div className="h-a5" style={{ display: "flex", gap: 40, marginTop: 52, paddingTop: 36, borderTop: "1px solid rgba(255,255,255,.12)" }}>
              {[["20+", "Years"], ["15+", "Years"], ["Decades", "Experience"]].map(([n, l]) => (
                <div key={n}>
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
                <span style={{ fontSize: 28, color: "#2E6DD4" }}>{"\u2696"}</span>
                <div><div className="serif" style={{ fontSize: 17, color: C.navy }}>Legal Consultation</div>
                  <div className="sans" style={{ fontSize: 12, color: C.muted }}>Speak with a senior advocate today</div></div>
              </div>
              <hr style={{ border: "none", borderTop: `1px solid ${C.border}`, marginBottom: 14 }} />
              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "8px 16px" }}>
                {["Civil", "Criminal", "Commercial", "Matrimonial", "Writ Jurisdictions", "Courts & Tribunals", "Consumer", "Banking & Finance"].map(it => (
                  <div key={it} style={{ display: "flex", alignItems: "center", gap: 9 }}>
                    <div style={{ width: 16, height: 16, borderRadius: "50%", background: C.pale, display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
                      <div style={{ width: 6, height: 6, borderRadius: "50%", background: C.mid }} />
                    </div>
                    <span className="sans" style={{ fontSize: 12.5, color: "#374466" }}>{it}</span>
                  </div>
                ))}
              </div>
              <button className="btn-navy" style={{ width: "100%", marginTop: 14 }} onClick={() => scrollTo("contact")}>Get Started →</button>
            </div>
            <a href="tel:+919826235300" className="contact-call-card" style={{ background: "rgba(255,255,255,.1)", border: "1px solid rgba(255,255,255,.18)", borderRadius: 10, padding: "15px 20px", display: "flex", alignItems: "center", gap: 13, textDecoration: "none", color: "inherit" }}>
              <span style={{ fontSize: 24, color: "#FF4DA2" }}>{"\u260E"}</span>
              <div><div className="sans" style={{ fontSize: 10, letterSpacing: 2.5, color: "rgba(255,255,255,.5)", textTransform: "uppercase" }}>Call Now</div>
                <div className="serif" style={{ fontSize: 16, color: "#fff" }}>Mitul Saxena Advocate</div>
                <span className="contact-phone-reveal serif" style={{ display: "block", fontSize: 19, color: "#fff" }}>+91 98262 35300</span></div>
            </a>
            <a href="tel:+919009330202" className="contact-call-card" style={{ background: "rgba(255,255,255,.1)", border: "1px solid rgba(255,255,255,.18)", borderRadius: 10, padding: "15px 20px", display: "flex", alignItems: "center", gap: 13, textDecoration: "none", color: "inherit" }}>
              <span style={{ fontSize: 24, color: "#FF4DA2" }}>{"\u260E"}</span>
              <div><div className="sans" style={{ fontSize: 10, letterSpacing: 2.5, color: "rgba(255,255,255,.5)", textTransform: "uppercase" }}>Call Now</div>
                <div className="serif" style={{ fontSize: 16, color: "#fff" }}>Amit Tatke Advocate</div>
                <span className="contact-phone-reveal serif" style={{ display: "block", fontSize: 19, color: "#fff" }}>+91 90093 30202</span></div>
            </a>
          </div>

          {/* Mobile Phone Buttons */}
          <div className="show-mob" style={{ display: "none", flexDirection: "column", gap: 14 }}>
            <a href="tel:+919826235300" style={{ background: "rgba(255,255,255,.1)", border: "1px solid rgba(255,255,255,.18)", borderRadius: 10, padding: "15px 20px", display: "flex", alignItems: "center", gap: 13, textDecoration: "none", color: "inherit" }}>
              <span style={{ fontSize: 24, color: "#FF4DA2" }}>{"\u260E"}</span>
              <div><div className="sans" style={{ fontSize: 10, letterSpacing: 2.5, color: "rgba(255,255,255,.5)", textTransform: "uppercase" }}>Call Now</div>
                <div className="serif" style={{ fontSize: 16, color: "#fff" }}>Mitul Saxena Advocate</div>
                <div className="serif" style={{ fontSize: 19, color: "#fff" }}>+91 98262 35300</div></div>
            </a>
            <a href="tel:+919009330202" style={{ background: "rgba(255,255,255,.1)", border: "1px solid rgba(255,255,255,.18)", borderRadius: 10, padding: "15px 20px", display: "flex", alignItems: "center", gap: 13, textDecoration: "none", color: "inherit" }}>
              <span style={{ fontSize: 24, color: "#FF4DA2" }}>{"\u260E"}</span>
              <div><div className="sans" style={{ fontSize: 10, letterSpacing: 2.5, color: "rgba(255,255,255,.5)", textTransform: "uppercase" }}>Call Now</div>
                <div className="serif" style={{ fontSize: 16, color: "#fff" }}>Amit Tatke Advocate</div>
                <div className="serif" style={{ fontSize: 19, color: "#fff" }}>+91 90093 30202</div></div>
            </a>
          </div>
        </div>

        <div style={{ position: "absolute", bottom: 32, left: "50%", transform: "translateX(-50%)", textAlign: "center", animation: "hFadeUp 1.2s ease 1.25s both" }}>
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
                  We are uniquely positioned to handle complex writ jurisdictions and high-stakes commercial disputes with procedural precision and unwavering integrity.
                </p>
                <div style={{ display: "flex", alignItems: "center", gap: 22 }}>
                  <div style={{ display: "flex", alignItems: "center", gap: 13 }}>
                    <img src="/Saxena.jpeg" alt="Mitul Saxena" style={{ width: 48, height: 48, borderRadius: "50%", objectFit: "cover" }} />
                    <div>
                      <div className="serif" style={{ fontSize: 15, color: C.navy }}>Adv. Mitul Saxena</div>
                      <div className="sans" style={{ fontSize: 10.5, letterSpacing: 2, color: C.mid, textTransform: "uppercase" }}>Partner · 15+ Years</div>
                    </div>
                  </div>

                  <div style={{ display: "flex", alignItems: "center", gap: 13 }}>
                    <img src="/Amit.jpeg" alt="Saxena" style={{ width: 48, height: 48, borderRadius: "50%", objectFit: "cover" }} />
                    <div>
                      <div className="serif" style={{ fontSize: 15, color: C.navy }}>Adv. Amit Tatke</div>
                      <div className="sans" style={{ fontSize: 10.5, letterSpacing: 2, color: C.mid, textTransform: "uppercase" }}>Founder · 15+ Years</div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="about-years-badge" style={{ position: "absolute", bottom: -18, right: -18, background: C.navy, color: "#fff", padding: "17px 22px", borderRadius: 6, boxShadow: "0 10px 32px rgba(15,45,94,.28)", textAlign: "center" }}>
                <div className="serif" style={{ fontSize: 28 }}>15+</div>
                <div className="sans" style={{ fontSize: 10, opacity: .8, letterSpacing: 1.5 }}>Years (Amit Tatke)</div>
              </div>
            </div>
          </FadeIn>
          <FadeIn dir="right">
            <div>
              <SLabel>About Our Firm</SLabel>
              <SHeading>A Firm Built on <span style={{ color: C.mid }}>Trust & Results</span></SHeading>
              <hr className="divider" style={{ width: 70, margin: "0 0 24px" }} />
              <p className="sans" style={{ fontSize: 15.5, fontWeight: 300, lineHeight: 1.9, color: C.muted, marginBottom: 18 }}>
                Saxena and Tatke Advocates and Solicitors is a premier multidisciplinary law firm led by Mitul Saxena and Amit Tatke. The firm offers comprehensive legal solutions across civil, criminal, commercial and matrimonial law.
              </p>
              <p className="sans" style={{ fontSize: 15.5, fontWeight: 300, lineHeight: 1.9, color: C.muted, marginBottom: 18 }}>
                Our partners bring a seasoned perspective to the courtroom — Mitul Saxena with 20+ years of litigation mastery and Amit Tatke with 15+ years of strategic legal expertise. We maintain a formidable presence before the High Courts, District Courts, Tribunals and various specialized forums. We are uniquely positioned to handle complex writ jurisdictions and high-stakes commercial disputes with procedural precision and unwavering integrity.
              </p>
              <p className="sans" style={{ fontSize: 15.5, fontWeight: 300, lineHeight: 1.9, color: C.muted, marginBottom: 32 }}>
                Urgent legal consultation? We offer flexible scheduling, including Sundays and holidays by prior appointment.
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
              <button className="btn-navy" onClick={() => scrollTo("founders")}>Meet Our Founders</button>
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
                <div className="focus-card" onClick={() => { setActiveFocus(f); setPage("focus"); window.scrollTo(0, 0); }} style={{ display: "flex", flexDirection: "column", height: "100%" }}>
                  <div style={{ width: 50, height: 50, borderRadius: 6, background: C.pale, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 24, marginBottom: 16 }}>{f.icon}</div>
                  <h3 className="serif" style={{ fontSize: 20, color: C.navy, marginBottom: 8 }}>{f.title}</h3>
                  <hr style={{ border: "none", borderTop: `2px solid ${C.pale}`, marginBottom: 12 }} />
                  <p className="sans" style={{ fontSize: 13.5, fontWeight: 300, color: C.muted, lineHeight: 1.78, marginBottom: 16, minHeight: 72, flex: 1 }}>{f.tagline}</p>
                  <div className="sans" style={{ fontSize: 12.5, fontWeight: 600, color: C.mid, display: "flex", alignItems: "center", gap: 5 }}>Read More →</div>
                </div>
              </FadeIn>
            ))}
          </div>
        </div>
      </section>

      {/* STATS */}
      <section style={{ padding: "64px 5%", background: "linear-gradient(145deg, #133D86 0%, #1E4F9D 50%, #2A62B8 100%)", position: "relative", overflow: "hidden" }}>
        <div className="dot-bg-w" style={{ position: "absolute", inset: 0, opacity: .35 }} />
        <div style={{ maxWidth: 1300, margin: "0 auto", display: "grid", gridTemplateColumns: "repeat(4,1fr)", gap: 24, position: "relative" }} className="g-stat">
          {statCards.map(card => (
            <div key={card.label} style={{ textAlign: "center", padding: "20px 12px" }}>
              <div className="serif" style={{ fontSize: "clamp(42px,4.5vw,62px)", color: "#7EC8E3", lineHeight: 1, marginBottom: 10 }}>{card.value}</div>
              <hr style={{ border: "none", borderTop: "1px solid rgba(255,255,255,.2)", width: 40, margin: "0 auto 12px" }} />
              <div className="sans" style={{ fontSize: 11, letterSpacing: 2.5, color: "rgba(255,255,255,.55)", textTransform: "uppercase" }}>{card.label}</div>
            </div>
          ))}
        </div>
      </section>

      {/* FOUNDERS */}
      <section id="founders" style={{ padding: "108px 5%", background: "#fff" }}>
        <div style={{ maxWidth: 1300, margin: "0 auto" }}>
          <FadeIn>
            <div style={{ textAlign: "center", marginBottom: 58 }}>
              <SLabel>Our Team</SLabel>
              <SHeading>Meet Our <span style={{ color: C.mid }}>Attorneys</span></SHeading>
              <hr className="divider" style={{ width: 80, margin: "0 auto 18px" }} />
              <p className="sans" style={{ fontSize: 15.5, fontWeight: 300, color: C.muted, maxWidth: 460, margin: "0 auto" }}>
                Click on any attorney to read their full profile, specialisation, and key case & advisory highlights.
              </p>
            </div>
          </FadeIn>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))", gap: 22, maxWidth: 1100, margin: "0 auto" }}>
            {TEAM.map((m, i) => (
              <FadeIn key={m.id} delay={i * 0.08}>
                <div className="team-card" onClick={() => { setActiveTeam(m); setPage("attorney"); window.scrollTo(0, 0); }}>
                  <div style={{ position: "relative", overflow: "hidden" }}>
                    <img
                      className="team-img"
                      src={m.img}
                      alt={m.name}
                      onError={(e) => { e.currentTarget.onerror = null; e.currentTarget.src = "/Update_Logo.png"; }}
                    />
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
      {SHOW_CLIENT_STORIES && (
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
                { n: "Suresh Patel", r: "Business Owner", t: "Saxena and Tatke handled our commercial dispute with exceptional skill. Their strategic approach and clear communication made the entire process smooth. Highly recommended.", img: "https://i.pravatar.cc/60?img=12" },
                { n: "Meena Gupta", r: "Homeowner", t: "I was dealing with a complex property dispute and felt completely lost. Adv. Saxena and the team were professional, empathetic, and resolved everything in my favour.", img: "https://i.pravatar.cc/60?img=48" },
                { n: "Rahul Verma", r: "IT Professional", t: "Fast, reliable, and focused on results. They handled my criminal case with total dedication. I am truly grateful to this incredible team for their unwavering support.", img: "https://i.pravatar.cc/60?img=14" },
              ].map((t, i) => (
                <FadeIn key={t.n} delay={i * .12}>
                  <div className="lift" style={{ background: "#fff", border: `1px solid ${C.border}`, borderRadius: 8, padding: "32px 24px", position: "relative", display: "flex", flexDirection: "column", height: "100%" }}>
                    <div style={{ position: "absolute", top: 16, right: 20, fontSize: 48, color: C.pale, fontFamily: "Georgia", fontWeight: 700, lineHeight: 1 }}>"</div>
                    <div style={{ display: "flex", gap: 2, marginBottom: 14 }}>
                      {[...Array(5)].map((_, j) => <span key={j} style={{ color: "#F5A623", fontSize: 13 }}>★</span>)}
                    </div>
                    <p className="sans" style={{ fontSize: 14.5, fontWeight: 300, lineHeight: 1.85, color: "#3a4a6a", marginBottom: 22, fontStyle: "italic", flex: 1 }}>"{t.t}"</p>
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
      )}

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
                <div className="blog-card" onClick={() => { setActiveBlog(p); setPage("post"); window.scrollTo(0, 0); }} style={{ display: "flex", flexDirection: "column", height: "100%" }}>
                  <div style={{ overflow: "hidden" }}>
                    <img className="blog-img" src={p.img} alt={p.title} />
                  </div>
                  <div style={{ padding: "20px 20px 24px", display: "flex", flexDirection: "column", flex: 1 }}>
                    <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 12 }}>
                      <span className="sans" style={{ fontSize: 10, letterSpacing: 2, color: C.mid, textTransform: "uppercase", background: C.pale, padding: "3px 10px", borderRadius: 100 }}>{p.category}</span>
                      <span className="sans" style={{ fontSize: 11.5, color: "#9aaac4" }}>{p.readTime}</span>
                    </div>
                    <h3 className="serif" style={{ fontSize: 18, color: C.navy, lineHeight: 1.3, marginBottom: 10 }}>{p.title}</h3>
                    <p className="sans" style={{ fontSize: 13.5, color: C.muted, lineHeight: 1.75, marginBottom: 16, flex: 1 }}>{p.excerpt}</p>
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
              <SHeading>Book a <span style={{ color: C.mid }}>Consultation</span></SHeading>
              <hr className="divider" style={{ width: 80, margin: "0 auto 18px" }} />
              <p className="sans" style={{ fontSize: 15.5, color: C.muted, maxWidth: 440, margin: "0 auto" }}>Speak with our senior advocates today.</p>
            </div>
          </FadeIn>
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1.7fr", gap: 30 }} className="g2">
            <FadeIn dir="left">
              <div style={{ display: "flex", flexDirection: "column", gap: 14 }}>
                {[["📍", "Main Office", "70-A Brajeshwari Extension, Piplihana\nIndore (M.P.) 452016"], ["📍", "City Office", "412 Manas Bhawan Extension, 11 RNT Marg\nIndore (M.P.) 452001"], ["📞", "Phone", "Mitul Saxena Advocate: +91 98262 35300\nAmit Tatke Advocate: +91 90093 30202", true], ["🕐", "Hours", "Mon – Sat: 10:00 AM – 7:00 PM\nSundays & holidays by prior appointment"]].map(([ic, lb, vl, isPhone]) => (
                  <div key={lb} style={{ background: "#fff", border: `1px solid ${C.border}`, borderRadius: 6, padding: "18px 20px", display: "flex", gap: 13, alignItems: "flex-start", borderLeft: `4px solid ${C.mid}` }}>
                    <span style={{ fontSize: 20 }}>{ic}</span>
                    <div style={{ flex: 1 }}>
                      <div className="sans" style={{ fontSize: 10, letterSpacing: 2, color: C.mid, textTransform: "uppercase", marginBottom: 4 }}>{lb}</div>
                      {isPhone ? (
                        <div className="sans" style={{ fontSize: 14, color: "#2a3a5e", lineHeight: 1.7, whiteSpace: "pre-line" }}>
                          <a href="tel:+919826235300" style={{ color: "inherit", textDecoration: "none" }}>+91 98262 35300</a> (Mitul Saxena Advocate)<br />
                          <a href="tel:+919009330202" style={{ color: "inherit", textDecoration: "none" }}>+91 90093 30202</a> (Amit Tatke Advocate)
                        </div>
                      ) : (
                        <div className="sans" style={{ fontSize: 14, color: "#2a3a5e", lineHeight: 1.7, whiteSpace: "pre-line" }}>{vl}</div>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </FadeIn>
            <FadeIn dir="right">
              <div style={{ background: "#fff", border: `1px solid ${C.border}`, borderRadius: 8, padding: "42px 38px", boxShadow: "0 8px 40px rgba(15,45,94,.07)" }}>
                <div className="serif" style={{ fontSize: 22, color: C.navy, marginBottom: 24 }}>Send Us a Message</div>
	                <form onSubmit={handleInquirySubmit}>
	                  <div className="g2" style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16, marginBottom: 16 }}>
	                    <div>
	                      <label className="sans" style={{ fontSize: 11, fontWeight: 600, color: "#3a4a6a", letterSpacing: 1, display: "block", marginBottom: 6 }}>Full Name</label>
	                      <input
	                        required
	                        value={inquiryForm.fullName}
	                        onChange={(event) => handleInquiryChange("fullName", event.target.value)}
	                        placeholder="Your full name"
	                        style={{ width: "100%", border: `1.5px solid ${C.border}`, borderRadius: 4, padding: "11px 13px", fontSize: 14, color: "#2a3a5e", fontFamily: "'DM Sans',sans-serif", background: "#fafcff" }}
	                      />
	                    </div>
	                    <div>
	                      <label className="sans" style={{ fontSize: 11, fontWeight: 600, color: "#3a4a6a", letterSpacing: 1, display: "block", marginBottom: 6 }}>Phone</label>
	                      <input
	                        required
	                        type="tel"
	                        value={inquiryForm.phone}
	                        onChange={(event) => handleInquiryChange("phone", event.target.value)}
	                        placeholder="+91 xxxxx xxxxx"
	                        style={{ width: "100%", border: `1.5px solid ${C.border}`, borderRadius: 4, padding: "11px 13px", fontSize: 14, color: "#2a3a5e", fontFamily: "'DM Sans',sans-serif", background: "#fafcff" }}
	                      />
	                    </div>
	                  </div>
	                  <div style={{ marginBottom: 16 }}>
	                    <label className="sans" style={{ fontSize: 11, fontWeight: 600, color: "#3a4a6a", letterSpacing: 1, display: "block", marginBottom: 6 }}>Email</label>
	                    <input
	                      required
	                      type="email"
	                      value={inquiryForm.email}
	                      onChange={(event) => handleInquiryChange("email", event.target.value)}
	                      placeholder="your@email.com"
	                      style={{ width: "100%", border: `1.5px solid ${C.border}`, borderRadius: 4, padding: "11px 13px", fontSize: 14, color: "#2a3a5e", fontFamily: "'DM Sans',sans-serif", background: "#fafcff" }}
	                    />
	                  </div>
	                  <div style={{ marginBottom: 18 }}>
	                    <label className="sans" style={{ fontSize: 11, fontWeight: 600, color: "#3a4a6a", letterSpacing: 1, display: "block", marginBottom: 6 }}>Legal Matter</label>
	                    <select
	                      required
	                      value={inquiryForm.legalMatter}
	                      onChange={(event) => handleInquiryChange("legalMatter", event.target.value)}
	                      style={{ width: "100%", border: `1.5px solid ${C.border}`, borderRadius: 4, padding: "11px 13px", fontSize: 14, color: "#3a4a6a", fontFamily: "'DM Sans',sans-serif", background: "#fafcff" }}
	                    >
	                      <option value="">Select area</option>
	                      <option value="Other">Other</option>
	                      {FOCUS_AREAS.map((focusArea) => <option key={focusArea.id}>{focusArea.title}</option>)}
	                    </select>
	                  </div>
	                  <button
	                    type="submit"
	                    className="btn-navy"
	                    disabled={isSubmittingInquiry}
	                    style={{
	                      width: "100%",
	                      padding: "14px",
	                      opacity: isSubmittingInquiry ? 0.82 : 1,
	                      cursor: isSubmittingInquiry ? "not-allowed" : "pointer",
	                    }}
	                  >
	                    {isSubmittingInquiry ? "Submitting..." : "Submit & Book Consultation ->"}
	                  </button>
	                </form>
                <p className="sans" style={{ fontSize: 11.5, color: "#8a9ab8", textAlign: "center", marginTop: 8 }}>We respond within 2 business hours. All inquiries are strictly confidential.</p>
                {inquiryStatus.message ? (
                  <p
                    className="sans"
                    style={{
                      fontSize: 12.5,
                      textAlign: "center",
                      marginTop: 10,
                      color: inquiryStatus.type === "success" ? "#1c7a48" : "#d02146",
                    }}
                  >
                    {inquiryStatus.message}
                  </p>
                ) : null}
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
              <div style={{ display: "flex", alignItems: "center", marginBottom: 15 }}>
                <img src="/Update_Logo.png" alt="Saxena & Tatke Advocates and Solicitors" style={{ height: 88, width: "auto", objectFit: "contain" }} />
              </div>
              <p className="sans" style={{ fontSize: 13, color: "rgba(255,255,255,.42)", lineHeight: 1.8, maxWidth: 270 }}>Premier multidisciplinary law firm in Indore. Decades of experience across civil, criminal, commercial and matrimonial law.</p>
              <div style={{ marginTop: 16 }}>
                <div className="sans" style={{ fontSize: 10, letterSpacing: 2.2, color: "#7EC8E3", textTransform: "uppercase", marginBottom: 8, fontWeight: 600 }}>Social Media</div>
                <div style={{ display: "flex", gap: 10, flexWrap: "wrap" }}>
                  {[
                    { label: "Instagram", href: "https://www.instagram.com/" },
                    { label: "Facebook", href: "https://www.facebook.com/" },
                    { label: "LinkedIn", href: "https://www.linkedin.com/" },
                    { label: "WhatsApp", href: "https://wa.me/919826235300?text=Hello%2C%20I%20need%20legal%20consultation%20regarding%20my%20matter.%20Please%20guide%20me." },
                  ].map((s) => (
                    <a
                      key={s.label}
                      href={s.href}
                      target="_blank"
                      rel="noreferrer"
                      aria-label={s.label}
                      title={s.label}
                      style={{
                        width: 40,
                        height: 40,
                        borderRadius: 12,
                        textDecoration: "none",
                        display: "inline-flex",
                        alignItems: "center",
                        justifyContent: "center",
                        border: "1px solid rgba(126,200,227,.35)",
                        color: "#fff",
                        background: "linear-gradient(145deg, rgba(46,109,212,.2), rgba(15,45,94,.55))",
                        boxShadow: "0 6px 16px rgba(6,16,38,.32), inset 0 1px 0 rgba(255,255,255,.09)",
                        transition: "transform .2s ease, box-shadow .2s ease, border-color .2s ease",
                      }}
                      onMouseEnter={(e) => {
                        e.currentTarget.style.transform = "translateY(-2px)";
                        e.currentTarget.style.borderColor = "rgba(126,200,227,.7)";
                        e.currentTarget.style.boxShadow = "0 10px 22px rgba(6,16,38,.4), inset 0 1px 0 rgba(255,255,255,.15)";
                      }}
                      onMouseLeave={(e) => {
                        e.currentTarget.style.transform = "none";
                        e.currentTarget.style.borderColor = "rgba(126,200,227,.35)";
                        e.currentTarget.style.boxShadow = "0 6px 16px rgba(6,16,38,.32), inset 0 1px 0 rgba(255,255,255,.09)";
                      }}
                    >
                      {s.label === "Instagram" && (
                        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" aria-hidden="true">
                          <rect x="3.2" y="3.2" width="17.6" height="17.6" rx="5.2" stroke="currentColor" strokeWidth="1.9" />
                          <circle cx="12" cy="12" r="4.2" stroke="currentColor" strokeWidth="1.9" />
                          <circle cx="17.4" cy="6.7" r="1.2" fill="currentColor" />
                        </svg>
                      )}
                      {s.label === "Facebook" && (
                        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" aria-hidden="true">
                          <path d="M14.5 8.2H16.4V5.2H14.1C11.2 5.2 9.9 6.9 9.9 9.8V11.9H7.6V14.9H9.9V20H13V14.9H15.8L16.2 11.9H13V10.1C13 9 13.4 8.2 14.5 8.2Z" fill="currentColor" />
                        </svg>
                      )}
                      {s.label === "LinkedIn" && (
                        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" aria-hidden="true">
                          <rect x="4.2" y="9.6" width="3.1" height="10.2" rx="1" fill="currentColor" />
                          <rect x="4.2" y="4.2" width="3.1" height="3.1" rx="1.55" fill="currentColor" />
                          <path d="M10 9.6H13V11.1C13.5 10.2 14.6 9.4 16.2 9.4C19.2 9.4 19.8 11.4 19.8 14V19.8H16.7V14.6C16.7 13.4 16.7 11.9 15.1 11.9C13.5 11.9 13.2 13.1 13.2 14.5V19.8H10V9.6Z" fill="currentColor" />
                        </svg>
                      )}
                      {s.label === "WhatsApp" && (
                        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" aria-hidden="true">
                          <path d="M20 11.5C20 6.81 16.19 3 11.5 3S3 6.81 3 11.5C3 13.2 3.5 14.8 4.4 16.1L3.6 20.4L7.9 19.6C9.2 20.5 10.8 21 12.5 21C17.19 21 21 17.19 21 12.5" stroke="currentColor" strokeWidth="1.9" strokeLinecap="round" strokeLinejoin="round" />
                          <path d="M14.9 14.8C14.4 15.2 13.8 15.4 13.1 15.2C11.8 14.8 10.7 14.1 9.8 13.1C8.9 12 8.3 10.9 8.1 9.7C8 9 8.2 8.4 8.7 7.9L9.1 7.5C9.3 7.3 9.7 7.3 9.9 7.5L10.8 8.4C11 8.6 11 9 10.8 9.2L10.4 9.6C10.2 9.8 10.2 10 10.3 10.2C10.6 10.8 11 11.3 11.5 11.8C12 12.3 12.5 12.7 13.1 13C13.3 13.1 13.5 13 13.7 12.8L14.1 12.4C14.3 12.2 14.7 12.2 14.9 12.4L15.8 13.3C16 13.5 16 13.9 15.8 14.1L14.9 14.8Z" fill="currentColor" />
                        </svg>
                      )}
                    </a>
                  ))}
                </div>
              </div>
            </div>
            {[["Quick Links", ["Home", "About", "Focus Areas", "Founders", "Blog", "Contact"]], ["Practice Areas", FOCUS_AREAS.map(f => f.title)], ["Contact", ["Mitul Saxena Advocate\n+91 98262 35300", "Amit Tatke Advocate\n+91 90093 30202", "70-A Brajeshwari Ext., Indore", "412 Manas Bhawan, RNT Marg, Indore", "Mon-Sat: 10AM-7PM", "Sundays & holidays by prior appointment"]]].map(([title, items]) => (
              <div key={title}>
                <div className="sans" style={{ fontSize: 10, letterSpacing: 3, color: "#7EC8E3", textTransform: "uppercase", marginBottom: 14, fontWeight: 600 }}>{title}</div>
                <hr style={{ border: "none", borderTop: "1px solid rgba(255,255,255,.12)", marginBottom: 14, width: 28 }} />
                {items.map(it => {
                  const handleQuickLink = () => {
                    if (it === "Blog") { setPage("blog"); window.scrollTo(0, 0); }
                    else { setPage("home"); setTimeout(() => scrollTo(it.toLowerCase().replace(/ /g, "-")), 80); }
                  };
                  const handlePracticeArea = () => {
                    const focus = FOCUS_AREAS.find(f => f.title === it);
                    if (focus) { setActiveFocus(focus); setPage("focus"); window.scrollTo(0, 0); }
                  };
                  const isClickable = title === "Quick Links" || title === "Practice Areas";
                  const handleClick = title === "Quick Links" ? handleQuickLink : title === "Practice Areas" ? handlePracticeArea : undefined;
                  return (
                    <div key={it} className="sans" style={{ fontSize: 12.5, color: "rgba(255,255,255,.38)", marginBottom: 8, cursor: isClickable ? "pointer" : "default", transition: "color .2s", whiteSpace: title === "Contact" ? "pre-line" : "normal" }}
                      onMouseEnter={e => { if (isClickable) e.target.style.color = "rgba(255,255,255,.8)"; }}
                      onMouseLeave={e => { if (isClickable) e.target.style.color = "rgba(255,255,255,.38)"; }}
                      onClick={handleClick}
                      role={isClickable ? "button" : undefined}>{it}</div>
                  );
                })}
              </div>
            ))}
          </div>
          <hr style={{ border: "none", borderTop: "1px solid rgba(255,255,255,.08)", marginBottom: 20 }} />
          <div style={{ display: "flex", justifyContent: "space-between", flexWrap: "wrap", gap: 10 }}>
            <div className="sans" style={{ fontSize: 11.5, color: "rgba(255,255,255,.25)" }}>© 2026 Saxena and Tatke Advocates and Solicitors. All Rights Reserved.</div>
            <div className="sans" style={{ fontSize: 11.5, color: "rgba(255,255,255,.25)" }}>Privacy Policy · Terms · Disclaimer</div>
          </div>
        </div>
      </footer>
    </div>
  );
};




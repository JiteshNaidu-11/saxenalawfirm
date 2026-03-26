import { useCallback, useEffect, useState } from "react";
import { C } from "../../data/constants";
import { isSupabaseConfigured, supabase } from "../../lib/supabase";

const formatDateTime = (value) => {
  if (!value) return "-";
  const date = new Date(value);
  if (Number.isNaN(date.getTime())) return value;
  return date.toLocaleString("en-IN", { dateStyle: "medium", timeStyle: "short" });
};

export const AdminPanel = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [authReady, setAuthReady] = useState(false);
  const [loggedIn, setLoggedIn] = useState(false);

  const [inquiries, setInquiries] = useState([]);
  const [isLoadingInquiries, setIsLoadingInquiries] = useState(false);
  const [inquiriesError, setInquiriesError] = useState("");
  const [lastSyncedAt, setLastSyncedAt] = useState(null);

  const fetchInquiries = useCallback(async () => {
    if (!isSupabaseConfigured || !supabase) {
      setInquiries([]);
      setInquiriesError("Supabase is not configured. Add VITE_SUPABASE_URL and VITE_SUPABASE_ANON_KEY in .env.");
      return;
    }

    setIsLoadingInquiries(true);
    setInquiriesError("");

    const { data, error: fetchError } = await supabase
      .from("inquiries")
      .select("id, full_name, phone, email, legal_matter, created_at")
      .order("created_at", { ascending: false })
      .limit(500);

    if (fetchError) {
      setInquiriesError(fetchError.message || "Unable to load inquiries from Supabase.");
      setIsLoadingInquiries(false);
      return;
    }

    setInquiries(data || []);
    setLastSyncedAt(new Date());
    setIsLoadingInquiries(false);
  }, []);

  useEffect(() => {
    if (!isSupabaseConfigured || !supabase) {
      setAuthReady(true);
      return undefined;
    }

    let isMounted = true;

    supabase.auth.getSession().then(({ data, error: sessionError }) => {
      if (!isMounted) return;
      if (sessionError) {
        setError(sessionError.message || "Unable to validate admin session.");
      }
      setLoggedIn(Boolean(data.session));
      setAuthReady(true);
    });

    const { data: authListener } = supabase.auth.onAuthStateChange((_event, session) => {
      if (!isMounted) return;
      setLoggedIn(Boolean(session));
      if (!session) {
        setInquiries([]);
      }
    });

    return () => {
      isMounted = false;
      authListener?.subscription?.unsubscribe();
    };
  }, []);

  useEffect(() => {
    if (!loggedIn) return;
    fetchInquiries();
  }, [fetchInquiries, loggedIn]);

  useEffect(() => {
    if (!loggedIn) return undefined;
    const pollId = window.setInterval(() => {
      fetchInquiries();
    }, 30000);
    return () => window.clearInterval(pollId);
  }, [fetchInquiries, loggedIn]);

  const handleLogin = async (event) => {
    event.preventDefault();
    setError("");

    if (!isSupabaseConfigured || !supabase) {
      setError("Supabase is not configured. Please add .env keys first.");
      return;
    }

    const { error: authError } = await supabase.auth.signInWithPassword({
      email: email.trim(),
      password,
    });

    if (authError) {
      setError(authError.message || "Invalid email or password.");
      return;
    }

    setPassword("");
    setLoggedIn(true);
  };

  const handleLogout = async () => {
    if (supabase) {
      await supabase.auth.signOut();
    }
    setLoggedIn(false);
    setPassword("");
    setInquiries([]);
    setInquiriesError("");
    setLastSyncedAt(null);
  };

  return (
    <div style={{ minHeight: "100vh", background: "linear-gradient(145deg, #133D86 0%, #1E4F9D 48%, #2A62B8 100%)", padding: "32px 16px", display: "flex", alignItems: "center", justifyContent: "center" }}>
      <div style={{ width: loggedIn ? "min(1180px, 96vw)" : "min(460px, 92vw)", background: "#fff", border: `1px solid ${C.border}`, borderRadius: 10, padding: loggedIn ? "26px 24px" : "30px 26px", boxShadow: "0 18px 44px rgba(15,45,94,.15)" }}>
        <div className="sans" style={{ fontSize: 11, letterSpacing: 2.2, color: C.mid, textTransform: "uppercase", marginBottom: 8 }}>
          Admin Access
        </div>
        <h1 className="serif" style={{ margin: "0 0 10px", color: C.navy, fontSize: 32, lineHeight: 1.2 }}>
          Saxena Admin Panel
        </h1>

        {!authReady ? (
          <div className="sans" style={{ background: "#f8fbff", border: `1px solid ${C.border}`, borderRadius: 8, padding: "18px 14px", color: "#536488", textAlign: "center" }}>
            Checking admin session...
          </div>
        ) : null}

        {authReady && !loggedIn ? (
          <>
            <p className="sans" style={{ margin: "0 0 18px", fontSize: 13.5, color: C.muted, lineHeight: 1.7 }}>
              Login at <code>/admin</code> using a user created in Supabase Authentication.
            </p>
            <form onSubmit={handleLogin}>
              <label className="sans" style={{ display: "block", fontSize: 11, fontWeight: 600, marginBottom: 6, letterSpacing: 1, color: "#3a4a6a" }}>
                Admin Email
              </label>
              <input
                type="email"
                value={email}
                onChange={(event) => setEmail(event.target.value)}
                placeholder="admin@yourfirm.com"
                style={{ width: "100%", border: `1.5px solid ${C.border}`, borderRadius: 6, padding: "11px 12px", fontSize: 14, marginBottom: 14, fontFamily: "'DM Sans',sans-serif", background: "#fafcff" }}
                autoComplete="username"
                required
              />
              <label className="sans" style={{ display: "block", fontSize: 11, fontWeight: 600, marginBottom: 6, letterSpacing: 1, color: "#3a4a6a" }}>
                Password
              </label>
              <input
                type="password"
                value={password}
                onChange={(event) => setPassword(event.target.value)}
                placeholder="Enter password"
                style={{ width: "100%", border: `1.5px solid ${C.border}`, borderRadius: 6, padding: "11px 12px", fontSize: 14, marginBottom: 16, fontFamily: "'DM Sans',sans-serif", background: "#fafcff" }}
                autoComplete="current-password"
                required
              />
              {error ? (
                <div className="sans" style={{ marginBottom: 12, fontSize: 12.5, color: "#d02146" }}>
                  {error}
                </div>
              ) : null}
              <button type="submit" className="btn-navy" style={{ width: "100%", padding: "12px 14px" }}>
                Login
              </button>
            </form>
            <p className="sans" style={{ marginTop: 12, fontSize: 12, color: "#8a9ab8", textAlign: "center", lineHeight: 1.6 }}>
              Create user in Supabase: Authentication to Users to Add user.
            </p>
          </>
        ) : null}

        {authReady && loggedIn ? (
          <>
            <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", gap: 10, flexWrap: "wrap", marginBottom: 14 }}>
              <div className="sans" style={{ fontSize: 13.5, color: "#2a3a5e" }}>
                Showing inquiries from Supabase. Total: <strong>{inquiries.length}</strong>
              </div>
              <div style={{ display: "flex", gap: 8 }}>
                <button
                  type="button"
                  className="btn-outline"
                  onClick={fetchInquiries}
                  style={{ padding: "9px 14px" }}
                  disabled={isLoadingInquiries}
                >
                  {isLoadingInquiries ? "Refreshing..." : "Refresh"}
                </button>
                <button type="button" className="btn-navy" style={{ padding: "9px 14px" }} onClick={handleLogout}>
                  Logout
                </button>
              </div>
            </div>
            <div className="sans" style={{ fontSize: 11.5, color: "#7b8cac", marginBottom: 14 }}>
              Last synced: {lastSyncedAt ? formatDateTime(lastSyncedAt.toISOString()) : "-"}
            </div>

            {inquiriesError ? (
              <div className="sans" style={{ background: "#fff4f6", border: "1px solid #f8d2da", borderRadius: 8, padding: "12px 14px", color: "#b42745", fontSize: 12.5, marginBottom: 14 }}>
                {inquiriesError}
              </div>
            ) : null}

            {isLoadingInquiries && inquiries.length === 0 ? (
              <div className="sans" style={{ background: "#f8fbff", border: `1px solid ${C.border}`, borderRadius: 8, padding: "22px 16px", color: "#536488", textAlign: "center" }}>
                Loading inquiries...
              </div>
            ) : null}

            {!isLoadingInquiries && !inquiriesError && inquiries.length === 0 ? (
              <div className="sans" style={{ background: "#f8fbff", border: `1px solid ${C.border}`, borderRadius: 8, padding: "22px 16px", color: "#536488", textAlign: "center" }}>
                No inquiries received yet.
              </div>
            ) : null}

            {inquiries.length > 0 ? (
              <div style={{ border: `1px solid ${C.border}`, borderRadius: 8, overflow: "hidden" }}>
                <div style={{ overflowX: "auto" }}>
                  <table style={{ width: "100%", borderCollapse: "collapse", minWidth: 760 }}>
                    <thead>
                      <tr style={{ background: "#f3f7ff" }}>
                        <th style={{ textAlign: "left", padding: "12px 14px", fontSize: 12, letterSpacing: 1, color: "#4a5a78", textTransform: "uppercase" }}>Date</th>
                        <th style={{ textAlign: "left", padding: "12px 14px", fontSize: 12, letterSpacing: 1, color: "#4a5a78", textTransform: "uppercase" }}>Name</th>
                        <th style={{ textAlign: "left", padding: "12px 14px", fontSize: 12, letterSpacing: 1, color: "#4a5a78", textTransform: "uppercase" }}>Phone</th>
                        <th style={{ textAlign: "left", padding: "12px 14px", fontSize: 12, letterSpacing: 1, color: "#4a5a78", textTransform: "uppercase" }}>Email</th>
                        <th style={{ textAlign: "left", padding: "12px 14px", fontSize: 12, letterSpacing: 1, color: "#4a5a78", textTransform: "uppercase" }}>Legal Matter</th>
                      </tr>
                    </thead>
                    <tbody>
                      {inquiries.map((inquiry, index) => (
                        <tr key={inquiry.id} style={{ borderTop: index === 0 ? "none" : `1px solid ${C.border}` }}>
                          <td style={{ padding: "12px 14px", fontSize: 13, color: "#3f5170", whiteSpace: "nowrap" }}>{formatDateTime(inquiry.created_at)}</td>
                          <td style={{ padding: "12px 14px", fontSize: 13.5, color: "#1e3258", fontWeight: 600 }}>{inquiry.full_name || "-"}</td>
                          <td style={{ padding: "12px 14px", fontSize: 13, color: "#3f5170" }}>
                            {inquiry.phone ? (
                              <a href={`tel:${inquiry.phone}`} style={{ color: "inherit", textDecoration: "none" }}>
                                {inquiry.phone}
                              </a>
                            ) : "-"}
                          </td>
                          <td style={{ padding: "12px 14px", fontSize: 13, color: "#3f5170" }}>
                            {inquiry.email ? (
                              <a href={`mailto:${inquiry.email}`} style={{ color: "inherit", textDecoration: "none" }}>
                                {inquiry.email}
                              </a>
                            ) : "-"}
                          </td>
                          <td style={{ padding: "12px 14px", fontSize: 13, color: "#3f5170" }}>{inquiry.legal_matter || "-"}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            ) : null}
          </>
        ) : null}
      </div>
    </div>
  );
};

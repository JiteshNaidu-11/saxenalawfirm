import { useState, useEffect } from "react";
import { Navbar } from "./components/Navbar";
import { HomePage } from "./components/pages/HomePage";
import { AttorneyPage } from "./components/pages/AttorneyPage";
import { FocusPage } from "./components/pages/FocusPage";
import { BlogPage } from "./components/pages/BlogPage";
import { BlogPostPage } from "./components/pages/BlogPostPage";
import { GLOBAL_CSS } from "./styles/globalStyles";

export default function App() {
  const [page, setPage] = useState("home");
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [activeTeam, setActiveTeam] = useState(null);
  const [activeFocus, setActiveFocus] = useState(null);
  const [activeBlog, setActiveBlog] = useState(null);

  useEffect(() => {
    const fn = () => setScrolled(window.scrollY > 55);
    window.addEventListener("scroll", fn);
    return () => window.removeEventListener("scroll", fn);
  }, []);

  useEffect(() => { window.scrollTo(0, 0); }, [page]);

  const renderPage = () => {
    switch (page) {
      case "attorney": return activeTeam ? <AttorneyPage attorney={activeTeam} setPage={setPage} /> : null;
      case "focus":    return activeFocus ? <FocusPage focus={activeFocus} setPage={setPage} /> : null;
      case "blog":     return <BlogPage setPage={setPage} setActiveBlog={setActiveBlog} />;
      case "post":     return activeBlog ? <BlogPostPage post={activeBlog} setPage={setPage} setActiveBlog={setActiveBlog} /> : null;
      default:         return <HomePage setPage={setPage} setActiveTeam={setActiveTeam} setActiveFocus={setActiveFocus} setActiveBlog={setActiveBlog} />;
    }
  };

  return (
    <>
      <style>{GLOBAL_CSS}</style>
      <Navbar page={page} setPage={setPage} scrolled={scrolled} mobileOpen={mobileOpen} setMobileOpen={setMobileOpen} />
      {renderPage()}
    </>
  );
}

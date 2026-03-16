export const GLOBAL_CSS = `
  @import url('https://fonts.googleapis.com/css2?family=DM+Serif+Display:ital@0;1&family=DM+Sans:wght@300;400;500;600&display=swap');
  *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }
  html { scroll-behavior: smooth; overflow-x: hidden; }
  body { font-family: 'DM Sans', sans-serif; background: #fff; color: #0D1F3C; overflow-x: hidden; width: 100%; }
  #root { width: 100%; overflow-x: hidden; }
  ::-webkit-scrollbar { width: 5px; }
  ::-webkit-scrollbar-thumb { background: #2E6DD4; border-radius: 3px; }

  .serif { font-family: 'DM Serif Display', serif; }
  .sans  { font-family: 'DM Sans', sans-serif; }

  /* Buttons */
  .btn-navy { background:#0F2D5E; color:#fff; font-family:'DM Sans',sans-serif; font-weight:600; font-size:13px; letter-spacing:1.2px; text-transform:uppercase; padding:13px 30px; border:2px solid #0F2D5E; cursor:pointer; border-radius:3px; transition:all .28s; }
  .btn-navy:hover { background:#1A4A9C; border-color:#1A4A9C; transform:translateY(-2px); box-shadow:0 8px 24px rgba(15,45,94,.25); }
  .btn-outline { background:transparent; color:#0F2D5E; font-family:'DM Sans',sans-serif; font-weight:600; font-size:13px; letter-spacing:1.2px; text-transform:uppercase; padding:11px 28px; border:2px solid #0F2D5E; cursor:pointer; border-radius:3px; transition:all .28s; }
  .btn-outline:hover { background:#0F2D5E; color:#fff; transform:translateY(-2px); }
  .btn-white { background:#fff; color:#0F2D5E; font-family:'DM Sans',sans-serif; font-weight:700; font-size:13px; letter-spacing:1.2px; text-transform:uppercase; padding:13px 30px; border:2px solid #fff; cursor:pointer; border-radius:3px; transition:all .28s; }
  .btn-white:hover { background:transparent; color:#fff; transform:translateY(-2px); }
  .btn-ghost-w { background:transparent; color:rgba(255,255,255,.85); font-family:'DM Sans',sans-serif; font-weight:600; font-size:13px; letter-spacing:1.2px; text-transform:uppercase; padding:11px 28px; border:2px solid rgba(255,255,255,.45); cursor:pointer; border-radius:3px; transition:all .28s; }
  .btn-ghost-w:hover { border-color:#fff; color:#fff; background:rgba(255,255,255,.08); transform:translateY(-2px); }

  /* Cards */
  .lift { transition:transform .32s ease, box-shadow .32s ease; cursor:pointer; }
  .lift:hover { transform:translateY(-6px); box-shadow:0 16px 48px rgba(15,45,94,.13); }

  /* Team card */
  .team-card { overflow:hidden; border-radius:8px; border:1px solid #D4E3F7; background:#fff; transition:all .32s; cursor:pointer; }
  .team-card:hover { transform:translateY(-6px); box-shadow:0 16px 52px rgba(15,45,94,.15); border-color:#97BEF0; }
  .team-card:hover .team-img { transform:scale(1.05); }
  .team-img { width:100%; height:260px; object-fit:cover; object-position:top; transition:transform .5s ease; display:block; }
  .team-overlay { background:linear-gradient(to top,rgba(15,45,94,.92) 0%,transparent 60%); position:absolute; inset:0; opacity:0; transition:opacity .32s; display:flex; align-items:flex-end; padding:20px; }
  .team-card:hover .team-overlay { opacity:1; }

  /* Focus card */
  .focus-card { border-radius:8px; border:1px solid #D4E3F7; padding:32px 26px; background:#fff; cursor:pointer; transition:all .32s; position:relative; overflow:hidden; }
  .focus-card::before { content:''; position:absolute; bottom:0; left:0; right:0; height:3px; background:linear-gradient(90deg,#0F2D5E,#2E6DD4); transform:scaleX(0); transform-origin:left; transition:transform .32s; }
  .focus-card:hover { transform:translateY(-5px); box-shadow:0 16px 48px rgba(15,45,94,.12); border-color:#97BEF0; }
  .focus-card:hover::before { transform:scaleX(1); }

  /* Blog card */
  .blog-card { border-radius:8px; border:1px solid #D4E3F7; overflow:hidden; background:#fff; cursor:pointer; transition:all .32s; }
  .blog-card:hover { transform:translateY(-5px); box-shadow:0 16px 48px rgba(15,45,94,.12); border-color:#97BEF0; }
  .blog-card:hover .blog-img { transform:scale(1.04); }
  .blog-img { width:100%; height:200px; object-fit:cover; transition:transform .5s ease; display:block; }

  /* Nav */
  .nav-link { font-family:'DM Sans',sans-serif; font-weight:500; font-size:13px; letter-spacing:1.2px; text-transform:uppercase; border:none; background:none; cursor:pointer; padding:4px 0; position:relative; transition:color .2s; }
  .nav-link::after { content:''; position:absolute; bottom:0; left:0; width:0; height:2px; transition:width .25s; }
  .nav-link-dark { color:#1A4A9C; }
  .nav-link-dark:hover { color:#0F2D5E; }
  .nav-link-dark::after { background:#2E6DD4; }
  .nav-link-dark:hover::after { width:100%; }
  .nav-link-light { color:rgba(255,255,255,.78); }
  .nav-link-light:hover { color:#fff; }
  .nav-link-light::after { background:#fff; }
  .nav-link-light:hover::after { width:100%; }

  /* Page transition */
  .page-enter { animation: pageIn .45s cubic-bezier(.4,0,.2,1) both; }
  .page-exit  { animation: pageOut .3s ease both; }
  @keyframes pageIn  { from { opacity:0; transform:translateY(24px); } to { opacity:1; transform:none; } }
  @keyframes pageOut { from { opacity:1; } to { opacity:0; } }

  /* Hero animations */
  @keyframes hFadeUp   { from{opacity:0;transform:translateY(28px)} to{opacity:1;transform:none} }
  @keyframes hFadeRight{ from{opacity:0;transform:translateX(-24px)} to{opacity:1;transform:none} }
  @keyframes floatY    { 0%,100%{transform:translateY(0)} 50%{transform:translateY(-14px)} }
  @keyframes scrollBob { 0%,100%{opacity:1;transform:translateY(0)} 50%{opacity:.3;transform:translateY(6px)} }
  @keyframes pulse     { 0%,100%{box-shadow:0 0 0 0 rgba(46,109,212,.4)} 70%{box-shadow:0 0 0 12px rgba(46,109,212,0)} }

  .h-a1{animation:hFadeRight 1.05s ease .2s both}
  .h-a2{animation:hFadeUp 1.1s ease .35s both}
  .h-a3{animation:hFadeUp 1.1s ease .55s both}
  .h-a4{animation:hFadeUp 1.1s ease .75s both}
  .h-a5{animation:hFadeUp 1.1s ease .95s both}
  .float{animation:floatY 7.2s ease-in-out infinite}
  .bob{animation:scrollBob 2.9s ease-in-out infinite}
  .pulse-dot{animation:pulse 3s infinite}

  /* Divider */
  .divider { height:3px; background:linear-gradient(90deg,#0F2D5E,#2E6DD4,#EBF2FF); border:none; border-radius:2px; }

  /* Dot bg */
  .dot-bg { background-image:radial-gradient(circle,rgba(46,109,212,.09) 1px,transparent 0); background-size:26px 26px; }
  .dot-bg-w { background-image:radial-gradient(circle,rgba(255,255,255,.09) 1px,transparent 0); background-size:26px 26px; }

  /* Inputs */
  input,textarea,select { outline:none; transition:border-color .22s,box-shadow .22s; }
  input:focus,textarea:focus,select:focus { border-color:#2E6DD4!important; box-shadow:0 0 0 3px rgba(46,109,212,.1)!important; }

  /* Article prose */
  .prose p   { font-size:16px; line-height:1.9; color:#3a4a6a; margin-bottom:20px; }
  .prose h3  { font-family:'DM Serif Display',serif; font-size:22px; color:#0F2D5E; margin:36px 0 12px; }
  .prose ul  { padding-left:20px; margin-bottom:20px; }
  .prose ul li { font-size:15.5px; line-height:1.8; color:#3a4a6a; margin-bottom:8px; }

  /* Back btn */
  .back-btn { display:inline-flex; align-items:center; gap:8px; font-family:'DM Sans',sans-serif; font-size:13px; font-weight:500; color:#2E6DD4; cursor:pointer; border:none; background:none; letter-spacing:.5px; transition:gap .2s; padding:0; }
  .back-btn:hover { gap:12px; }

  /* Stat number */
  @keyframes countUp { from{opacity:0;transform:translateY(10px)} to{opacity:1;transform:none} }

  @media(max-width:900px){
    .hide-mob{display:none!important}
    .show-mob{display:flex!important}
    .mobile-menu-btn{display:flex!important}
    .g2{grid-template-columns:1fr!important}
    .g3{grid-template-columns:1fr 1fr!important}
    .g4{grid-template-columns:1fr 1fr!important}
    .about-years-badge{right:0!important;bottom:0!important}
  }
  @media(max-width:580px){
    .btn-white,.btn-ghost-w{width:100%}
    .g3{grid-template-columns:1fr!important}
    .g4{grid-template-columns:1fr!important}
    .g-stat{grid-template-columns:1fr 1fr!important}
  }
  @media(max-width:400px){
    nav img[alt*="Saxena"] { max-width: 200px !important; height: 48px !important; }
  }
`;

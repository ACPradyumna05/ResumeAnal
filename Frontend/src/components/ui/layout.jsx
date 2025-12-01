import React from "react";

const Layout = ({ children }) => {
  return (
    <div className="min-h-screen flex flex-col">
      <nav className="border-b border-slate-800 bg-slate-950/80 backdrop-blur">
        <div className="max-w-5xl mx-auto px-4 py-3 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="h-7 w-7 rounded-xl bg-sky-500/80 flex items-center justify-center text-xs font-bold text-slate-950">
              MM
            </div>
            <span className="text-sm font-semibold text-slate-50">
              MatchMyResume
            </span>
          </div>
          <span className="text-[11px] text-slate-500">
            Resume–Job Description Matching System
          </span>
        </div>
      </nav>
      <main className="flex-1">
        <div className="max-w-5xl mx-auto px-4 py-6">{children}</div>
      </main>
      <footer className="border-t border-slate-900 py-3 text-center text-xs text-slate-500">
        Session-only · No resumes stored · Prototype UI
      </footer>
    </div>
  );
};

export default Layout;

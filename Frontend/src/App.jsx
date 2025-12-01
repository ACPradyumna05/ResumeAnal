import React, { useState } from "react";
import CandidatePage from "./components/candidate/CandidatePage";
import EmployerPage from "./components/employer/EmployerPage";
import "./index.css";

function App({ initialTab = "candidate" }) {
  const [tab, setTab] = useState(initialTab);

  return (
    <div className="min-h-screen flex flex-col">
      {/* <header className="border-b border-slate-800 bg-slate-950/70 backdrop-blur sticky top-0 z-10">
        <div className="max-w-5xl mx-auto px-4 py-3 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="h-8 w-8 rounded-2xl bg-gradient-to-br from-sky-500 to-indigo-500 flex items-center justify-center text-xs font-bold text-slate-950 shadow-lg">
              MM
            </div>
            <div>
              <h1 className="text-sm font-semibold tracking-tight">
                MatchMyResume
              </h1>
              <p className="text-[11px] text-slate-400">
                Resume ↔ Job Description Matching System
              </p>
            </div>
          </div>
          <span className="text-[11px] text-slate-500">

          </span>
        </div>
      </header> */}

      <main className="flex-1">
        <div className="max-w-5xl mx-auto px-4 py-6 animate-fadeInUp">
          {/* Tab switcher */}
          <div className="flex flex-col gap-3 mb-6">
            <div className="flex items-center justify-between gap-2">
              <h2 className="text-xl font-semibold tracking-tight">
                {tab === "candidate"
                  ? "Candidate – Self Analysis"
                  : "Employer – Batch Screening"}
              </h2>
              <span className="hidden sm:inline text-[11px] text-slate-400">
                Upload PDFs / DOCX · Frontend demo · No server storage
              </span>
            </div>

            <div className="inline-flex rounded-2xl bg-slate-900/70 border border-slate-800 p-1 shadow-inner">
              <button
                onClick={() => setTab("candidate")}
                className={
                  "flex-1 px-4 py-2 rounded-xl text-xs font-medium transition-all " +
                  (tab === "candidate"
                    ? "bg-gradient-to-r from-sky-500 to-cyan-500 text-slate-950 shadow-lg scale-[1.02]"
                    : "text-slate-300 hover:bg-slate-800 hover:text-slate-50")
                }
              >
                Candidate
              </button>
              <button
                onClick={() => setTab("employer")}
                className={
                  "flex-1 px-4 py-2 rounded-xl text-xs font-medium transition-all " +
                  (tab === "employer"
                    ? "bg-gradient-to-r from-violet-500 to-indigo-500 text-slate-950 shadow-lg scale-[1.02]"
                    : "text-slate-300 hover:bg-slate-800 hover:text-slate-50")
                }
              >
                Employer
              </button>
            </div>
          </div>

          <div className="rounded-3xl border border-slate-800 bg-slate-950/70 shadow-[0_18px_40px_rgba(0,0,0,0.55)] backdrop-blur-md p-5 sm:p-6 lg:p-7 transition-transform duration-300 hover:translate-y-[1px] hover:shadow-[0_22px_50px_rgba(0,0,0,0.65)]">
            {tab === "candidate" ? <CandidatePage /> : <EmployerPage />}
          </div>
        </div>
      </main>

      <footer className="border-t border-slate-900 py-3 text-center text-[11px] text-slate-500">
        Built for Software Project · Tailwind CSS frontend
      </footer>
    </div>
  );
}

export default App;


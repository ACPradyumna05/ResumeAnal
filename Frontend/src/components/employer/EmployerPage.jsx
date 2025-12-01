import React, { useState, useEffect } from "react";
import FileUpload from "../common/FileUpload";
import TextArea from "../common/TextArea";
import LoadingOverlay from "../common/LoadingOverlay";
import ErrorAlert from "../common/ErrorAlert";
import ScoreBadge from "../common/ScoreBadge";
import { analyzeEmployer } from "../../lib/api";

const EmployerPage = () => {
  const [jobDescription, setJobDescription] = useState("");
  const [resumes, setResumes] = useState([]);
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const [decisions, setDecisions] = useState(() => {
    try {
      return JSON.parse(localStorage.getItem("mmr_decisions") || "{}");
    } catch {
      return {};
    }
  });

  useEffect(() => {
    localStorage.setItem("mmr_decisions", JSON.stringify(decisions));
  }, [decisions]);

  const markAccepted = (id) =>
    setDecisions((d) => ({ ...d, [id]: "accepted" }));

  const markRejected = (id) =>
    setDecisions((d) => ({ ...d, [id]: "rejected" }));


  const canAnalyze =
    jobDescription.trim().length >= 50 &&
    resumes.length > 0 &&
    resumes.length <= 50;

  const handleAnalyze = async () => {
    if (!canAnalyze) {
      setError(
        "Please provide a job description and upload between 1 and 50 resumes."
      );
      return;
    }

    setError(null);
    setLoading(true);
    setResults([]);

    try {
      const res = await analyzeEmployer({
        jobDescriptionText: jobDescription.trim(),
        resumeFiles: resumes.map((r) => r.file),
      });
      setResults(res.entries);
    } catch (e) {
      setError(
        e && e.message
          ? e.message
          : "Something went wrong while analyzing resumes."
      );
    } finally {
      setLoading(false);
    }
  };

  const handleReset = () => {
    setJobDescription("");
    setResumes([]);
    setResults([]);
    setError(null);
    setDecisions({});
    localStorage.removeItem("mmr_decisions");
  };

  const highestScore =
    results.length > 0 ? Math.max(...results.map((r) => r.score)) : null;

  return (
    <div className="space-y-6">
      <LoadingOverlay
        show={loading}
        label="Running batch screening for all resumes..."
      />

      <section className="space-y-4">
        <h2 className="text-sm font-semibold text-slate-100 uppercase tracking-wide">
          Employer Dashboard
        </h2>

        <p className="text-xs text-slate-400 max-w-3xl">
          Paste a single job description and upload up to{" "}
          <span className="font-semibold text-sky-400">50 resumes</span>.
        </p>

        <div className="grid gap-6 md:grid-cols-2">
          <div className="space-y-4">
            <div className="rounded-2xl border border-slate-800 bg-slate-950/60 p-4">
              <TextArea
                label="Job Description"
                value={jobDescription}
                onChange={setJobDescription}
                rows={10}
                placeholder="Paste the full job description here..."
              />
            </div>

            <div className="rounded-2xl border border-slate-800 bg-slate-950/60 p-4 space-y-3">
              <FileUpload
                label="Upload candidate resumes"
                description="Select between 1 and 50 files · PDF / DOCX"
                multiple
                onFilesSelected={(files) => {
                  setResumes((prev) => {
                    const existing = new Set(prev.map((f) => f.id));
                    const merged = [...prev];
                    for (const f of files) {
                      if (!existing.has(f.id)) merged.push(f);
                    }
                    return merged.slice(0, 50);
                  });
                }}
              />

              {resumes.length > 0 && (
                <div className="rounded-xl border border-slate-700 bg-slate-950/80 px-3 py-2 max-h-40 overflow-auto text-xs">
                  <div className="flex items-center justify-between mb-1">
                    <span className="font-medium text-slate-100">
                      Selected resumes ({resumes.length})
                    </span>
                    <button
                      type="button"
                      className="text-[11px] text-sky-300 hover:underline"
                      onClick={() => setResumes([])}
                    >
                      Clear
                    </button>
                  </div>
                  <ul className="space-y-1">
                    {resumes.map((r) => (
                      <li
                        key={r.id}
                        className="flex items-center justify-between gap-2"
                      >
                        <span className="truncate">{r.file.name}</span>
                        <span className="text-[10px] text-slate-500">
                          {(r.file.size / (1024 * 1024)).toFixed(2)} MB
                        </span>
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </div>

            <div className="flex items-center gap-3">
              <button
                onClick={handleAnalyze}
                disabled={!canAnalyze || loading}
                className={`px-4 py-2 rounded-xl text-xs font-medium transition ${
                  canAnalyze && !loading
                    ? "bg-sky-600 text-white hover:bg-sky-500"
                    : "bg-slate-800 text-slate-500 cursor-not-allowed"
                }`}
              >
                Analyze All
              </button>

              <button
                onClick={handleReset}
                className="px-4 py-2 rounded-xl text-xs font-medium border border-slate-700 bg-slate-950 text-slate-300 hover:bg-slate-900"
              >
                Reset
              </button>
            </div>

            <ErrorAlert message={error} />
          </div>

          <div className="space-y-3">
            <h3 className="text-xs font-semibold text-slate-200 uppercase tracking-wide">
              Ranked Candidates
            </h3>

            <div className="flex items-center gap-2 mb-2">
              <label className="text-xs text-slate-400">Auto-reject below score:</label>
              <input
                type="number"
                min={0}
                max={100}
                placeholder="e.g., 70"
                className="w-20 px-2 py-1 text-xs rounded bg-slate-900 border border-slate-700 text-slate-200"
                onChange={(e) => {
                  const t = Number(e.target.value);
                  if (isNaN(t)) return;
                  setDecisions((d) => {
                    const updated = { ...d };
                    results.forEach((r) => {
                      if (r.score < t) updated[r.id] = "rejected";
                    });
                    return updated;
                  });
                  localStorage.setItem("mmr_threshold", t);
                }}
                defaultValue={localStorage.getItem("mmr_threshold") || ""}
              />
            </div>

            {results.length === 0 && (
              <div className="border border-dashed border-slate-700 rounded-2xl px-4 py-6 text-sm text-slate-400 bg-slate-950/40">
                No analysis yet — run batch screening to see scores.
              </div>
            )}

            {results.length > 0 && (
              <div className="rounded-2xl border border-slate-700 bg-slate-950/60 p-3 animate-fadeIn">
                <div className="overflow-y-auto max-h-[600px] pr-2 custom-scroll">
                  <table className="w-full text-xs">
                    <thead className="bg-slate-900/80 sticky top-0 z-10">
                      <tr>
                        <th className="px-3 py-2 text-left text-slate-300">Rank</th>
                        <th className="px-3 py-2 text-left text-slate-300">Resume</th>
                        <th className="px-3 py-2 text-left text-slate-300">Score</th>
                        <th className="px-3 py-2 text-left text-slate-300">Actions</th>
                      </tr>
                    </thead>

                    <tbody>
                      {results.map((r, index) => {
                        const status = decisions[r.id];

                        const rowClass =
                          status === "accepted"
                            ? "bg-emerald-900/20"
                            : status === "rejected"
                            ? "bg-red-900/20 line-through opacity-70"
                            : index % 2 === 0
                            ? "bg-slate-900/40"
                            : "bg-slate-900/20";

                        return (
                          <tr key={r.id} className={rowClass}>
                            <td className="px-3 py-2 text-slate-200 flex items-center gap-2">
                              #{index + 1}

                              {/* Three dots */}
                              <div className="relative">
                              

                                <div
                                  id={`menu-${r.id}`}
                                  className="hidden absolute left-4 top-0 w-28 rounded bg-slate-900 border border-slate-700 shadow-lg z-20"
                                >
                                  <button
                                    onClick={() => {
                                      markAccepted(r.id);
                                      document.getElementById(
                                        `menu-${r.id}`
                                      ).classList.add("hidden");
                                    }}
                                    className="block w-full px-3 py-2 hover:bg-emerald-700/20 text-left text-xs text-slate-200"
                                  >
                                    Accept
                                  </button>

                                  <button
                                    onClick={() => {
                                      markRejected(r.id);
                                      document.getElementById(
                                        `menu-${r.id}`
                                      ).classList.add("hidden");
                                    }}
                                    className="block w-full px-3 py-2 hover:bg-red-700/20 text-left text-xs text-slate-200"
                                  >
                                    Reject
                                  </button>
                                </div>
                              </div>
                            </td>

                            <td className="px-3 py-2 text-slate-100">{r.fileName}</td>

                            <td className="px-3 py-2">
                              <ScoreBadge score={r.score} small />
                            </td>

                            <td className="px-3 py-2 flex gap-2">
                              <button
                                onClick={() => markAccepted(r.id)}
                                className={`px-2 py-1 text-xs rounded border ${
                                  status === "accepted"
                                    ? "bg-emerald-600/20 border-emerald-400 text-emerald-300"
                                    : "bg-slate-900 border-slate-700 text-slate-200 hover:bg-emerald-700/20"
                                }`}
                              >
                                Accept
                              </button>

                              <button
                                onClick={() => markRejected(r.id)}
                                className={`px-2 py-1 text-xs rounded border ${
                                  status === "rejected"
                                    ? "bg-red-600/20 border-red-400 text-red-300"
                                    : "bg-slate-900 border-slate-700 text-slate-200 hover:bg-red-700/20"
                                }`}
                              >
                                Reject
                              </button>
                            </td>
                          </tr>
                        );
                      })}
                    </tbody>
                  </table>
                </div>
              </div>
            )}
          </div>

        </div>
      </section>
    </div>
  );
};

export default EmployerPage;

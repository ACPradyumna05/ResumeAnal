import React, { useState } from "react";
import FileUpload from "../common/FileUpload";
import TextArea from "../common/TextArea";
import LoadingOverlay from "../common/LoadingOverlay";
import ErrorAlert from "../common/ErrorAlert";
import ScoreBadge from "../common/ScoreBadge";
import { analyzeCandidate } from "../../lib/api";

const CandidatePage = () => {
  const [resume, setResume] = useState(null);
  const [jobDescription, setJobDescription] = useState("");
  const [score, setScore] = useState(null);
  const [summary, setSummary] = useState(null);
  const [details, setDetails] = useState(null);   
  const [showDetails, setShowDetails] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const canAnalyze = !!resume && jobDescription.trim().length >= 50;

  const handleAnalyze = async () => {
    if (!resume) {
      setError("Please upload your resume (PDF or DOCX).");
      return;
    }
    if (jobDescription.trim().length < 50) {
      setError("Please paste a job description (at least ~50 characters).");
      return;
    }

    setError(null);
    setLoading(true);
    setScore(null);
    setSummary(null);
    setDetails(null);

    try {
      const res = await analyzeCandidate({
        resumeFile: resume.file,
        jobDescriptionText: jobDescription.trim(),
      });

      setScore(res.score);
      setSummary(res.summary);
      setDetails(res.features);  
    } catch (e) {
      setError(
        e && e.message
          ? e.message
          : "Something went wrong during analysis."
      );
    } finally {
      setLoading(false);
    }
  };

  const handleReset = () => {
    setResume(null);
    setJobDescription("");
    setScore(null);
    setSummary(null);
    setDetails(null);
    setShowDetails(false);
    setError(null);
  };

  return (
    <div className="space-y-5">
      <LoadingOverlay
        show={loading}
        label="Analyzing your resume against the job description..."
      />

      <section className="grid gap-6 md:grid-cols-2">
        <div className="space-y-4">
          <h2 className="text-sm font-semibold text-slate-100 uppercase tracking-wide">
            Candidate Input
          </h2>

          <div className="rounded-2xl border border-slate-800 bg-slate-950/60 p-4 space-y-3">
            <FileUpload
              label="Upload your resume"
              description="Supported formats: PDF, DOCX · Max 10 MB"
              multiple={false}
              onFilesSelected={(files) => {
                setResume(files[0] || null);
              }}
            />
            {resume && (
              <p className="text-xs text-slate-300">
                Selected:{" "}
                <span className="font-medium">{resume.file.name}</span>{" "}
                ({(resume.file.size / (1024 * 1024)).toFixed(2)} MB)
              </p>
            )}
          </div>

          <div className="rounded-2xl border border-slate-800 bg-slate-950/60 p-4 space-y-3">
            <TextArea
              label="Paste the Job Description"
              helperText="Paste the full JD text. The system will compare keywords, skills, and overall similarity."
              value={jobDescription}
              onChange={setJobDescription}
              rows={10}
              placeholder="Paste role responsibilities, required skills, qualifications, etc..."
            />
          </div>

          <div className="flex flex-wrap gap-3 items-center">
            <button
              type="button"
              onClick={handleAnalyze}
              disabled={!canAnalyze || loading}
              className={`px-4 py-2 rounded-xl text-xs font-medium transition inline-flex items-center gap-2 ${
                canAnalyze && !loading
                  ? "bg-sky-600 text-white hover:bg-sky-500"
                  : "bg-slate-800 text-slate-500 cursor-not-allowed"
              }`}
            >
              Analyze Resume
            </button>
            <button
              type="button"
              onClick={handleReset}
              className="px-3 py-2 rounded-xl text-[11px] text-slate-300 border border-slate-700 bg-slate-950 hover:bg-slate-900 transition"
            >
              Reset
            </button>
            <span className="text-[11px] text-slate-500">
              Tip: tweak your resume and re-run for different roles.
            </span>
          </div>

          <ErrorAlert message={error} />
        </div>

        <div className="space-y-3">
          <h2 className="text-sm font-semibold text-slate-100 uppercase tracking-wide">
            Analysis Result
          </h2>

          {!score && (
            <div className="border border-dashed border-slate-700 rounded-2xl px-4 py-6 text-sm text-slate-400 bg-slate-950/40">
              <p className="mb-2 font-medium text-slate-200">
                No analysis yet
              </p>
              <p className="text-xs">
                Upload your resume, paste a job description, and click{" "}
                <span className="font-semibold text-sky-400">
                  Analyze Resume
                </span>{" "}
                to see your match score and a short interpretation.
              </p>
            </div>
          )}

          {score !== null && (
            <div className="space-y-4">
              <ScoreBadge score={score} large />

              {summary && (
                <div className="rounded-2xl border border-slate-700 bg-slate-950/60 px-4 py-3 text-xs text-slate-200">
                  <p className="font-medium text-slate-100 mb-1">
                    How to read this:
                  </p>
                  <p className="mb-2">{summary}</p>
                </div>
              )}

              {details && (
                <div className="rounded-2xl border border-slate-700 bg-slate-950/60 px-4 py-3 text-xs">
                  <button
                    onClick={() => setShowDetails(!showDetails)}
                    className="w-full text-left font-medium text-slate-200 flex justify-between items-center"
                  >
                    Detailed Score Breakdown
                    <span className="text-slate-400 text-base">
                      {showDetails ? "▾" : "▸"}
                    </span>
                  </button>

                  <div
                    className={`transition-all duration-300 overflow-hidden ${
                      showDetails ? "max-h-[800px] mt-3" : "max-h-0"
                    }`}
                  >
                    <div className="space-y-3">
                      <div>
                        <p className="text-slate-300">Text Similarity (Cosine)</p>
                        <div className="w-full bg-slate-800 h-2 rounded">
                          <div
                            className="h-2 bg-sky-500 rounded"
                            style={{ width: `${(details.jd_resume_cosine * 100).toFixed(0)}%` }}
                          />
                        </div>
                        <p className="text-[11px] text-slate-500">
                          {(details.jd_resume_cosine * 100).toFixed(1)}%
                        </p>
                      </div>

                      <div>
                        <p className="text-slate-300">Skillset Similarity</p>
                        <div className="w-full bg-slate-800 h-2 rounded">
                          <div
                            className="h-2 bg-indigo-500 rounded"
                            style={{ width: `${(details.skill_cosine * 100).toFixed(0)}%` }}
                          />
                        </div>
                        <p className="text-[11px] text-slate-500">
                          {(details.skill_cosine * 100).toFixed(1)}%
                        </p>
                      </div>

                      <div>
                        <p className="text-slate-300">Keyword Match</p>
                        <div className="w-full bg-slate-800 h-2 rounded">
                          <div
                            className="h-2 bg-emerald-500 rounded"
                            style={{ width: `${details.keyword_match_pct}%` }}
                          />
                        </div>
                        <p className="text-[11px] text-slate-500">
                          {details.keyword_match_pct}%
                        </p>
                      </div>

                      <div>
                        <p className="text-slate-300">Skill Match</p>
                        <div className="w-full bg-slate-800 h-2 rounded">
                          <div
                            className="h-2 bg-purple-500 rounded"
                            style={{ width: `${details.skill_match_pct}%` }}
                          />
                        </div>
                        <p className="text-[11px] text-slate-500">
                          {details.skill_match_pct}%
                        </p>
                      </div>

                      <div className="pt-2">
                        <p className="font-medium text-slate-200">Matched Skills</p>
                        <div className="flex flex-wrap gap-2 mt-1">
                          {details.matched_skills?.map((s) => (
                            <span
                              key={s}
                              className="px-2 py-1 bg-emerald-900/40 border border-emerald-700 text-emerald-300 rounded text-[11px]"
                            >
                              {s}
                            </span>
                          ))}
                        </div>
                      </div>

                      <div>
                        <p className="font-medium text-slate-200">Missing / Recommended Skills</p>
                        <div className="flex flex-wrap gap-2 mt-1">
                          {details.missing_skills?.map((s) => (
                            <span
                              key={s}
                              className="px-2 py-1 bg-red-900/40 border border-red-700 text-red-300 rounded text-[11px]"
                            >
                              {s}
                            </span>
                          ))}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </div>
          )}
        </div>
      </section>
    </div>
  );
};

export default CandidatePage;

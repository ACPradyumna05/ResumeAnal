import React from "react";

function getLabel(score) {
  if (score >= 75) return "Strong Match";
  if (score >= 50) return "Moderate Match";
  return "Weak Match";
}

function getColors(score) {
  if (score >= 75) {
    return {
      ring: "from-emerald-400/70 to-emerald-500/0",
      bg: "bg-emerald-500/15",
      border: "border-emerald-500/40",
      text: "text-emerald-300",
      bar: "bg-emerald-400",
    };
  }
  if (score >= 50) {
    return {
      ring: "from-amber-400/70 to-amber-500/0",
      bg: "bg-amber-500/15",
      border: "border-amber-500/40",
      text: "text-amber-300",
      bar: "bg-amber-400",
    };
  }
  return {
    ring: "from-red-400/70 to-red-500/0",
    bg: "bg-red-500/15",
    border: "border-red-500/40",
    text: "text-red-300",
    bar: "bg-red-400",
  };
}

const ScoreBadge = ({ score, large }) => {
  const s = Math.round(score);
  const { ring, bg, border, text, bar } = getColors(s);

  return (
    <div className="relative inline-block">
      {/* soft glow ring behind the card */}
      <div
        className={
          "pointer-events-none absolute -inset-[1px] rounded-[26px] bg-gradient-to-br opacity-60 blur-xl " +
          ring
        }
      />
      <div
        className={
          `relative rounded-2xl border ${bg} ${border} px-4 py-3 flex flex-col gap-1 min-w-[220px] ` +
          "shadow-lg shadow-black/40 transform transition duration-500 ease-out " +
          "animate-fadeInUp hover:-translate-y-[1px] hover:shadow-xl hover:shadow-black/60"
        }
      >
        <div className="flex items-baseline justify-between">
          <span
            className={
              `font-semibold ${text} ` + (large ? "text-3xl" : "text-xl")
            }
          >
            {s}
            <span
              className={
                large
                  ? "text-base ml-1 text-slate-400"
                  : "text-xs ml-1 text-slate-500"
              }
            >
              / 100
            </span>
          </span>
          <span className="text-[11px] text-slate-400 uppercase tracking-wide">
            Match Score
          </span>
        </div>
        <div className="w-full h-1.5 rounded-full bg-slate-800 overflow-hidden mt-1">
          <div
            className={`${bar} h-full transition-all duration-500`}
            style={{ width: `${Math.min(Math.max(s, 0), 100)}%` }}
          />
        </div>
        <p className="text-xs text-slate-300 mt-1">{getLabel(s)}</p>
      </div>
    </div>
  );
};

export default ScoreBadge;


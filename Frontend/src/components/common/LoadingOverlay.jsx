import React from "react";

const LoadingOverlay = ({ show, label }) => {
  if (!show) return null;

  return (
    <div className="fixed inset-0 bg-slate-950/70 backdrop-blur-sm flex items-center justify-center z-50">
      <div className="bg-slate-900/95 border border-slate-700 rounded-2xl px-5 py-4 flex items-center gap-3 shadow-2xl shadow-black/60 animate-fadeInUp">
        <div className="w-6 h-6 rounded-full border-2 border-sky-400 border-t-transparent animate-spin" />
        <div className="flex flex-col">
          <span className="text-sm font-medium text-slate-50">
            {label ?? "Processing..."}
          </span>
          <span className="text-[11px] text-slate-400">
            This may take a few seconds for longer documents.
          </span>
        </div>
      </div>
    </div>
  );
};

export default LoadingOverlay;

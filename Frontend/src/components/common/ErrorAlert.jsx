import React from "react";

const ErrorAlert = ({ message }) => {
  if (!message) return null;

  return (
    <div className="rounded-xl border border-red-500/40 bg-red-500/10 px-3 py-2 text-xs text-red-200 flex items-start gap-2">
      <span className="mt-[2px] text-sm">⚠️</span>
      <p>{message}</p>
    </div>
  );
};

export default ErrorAlert;

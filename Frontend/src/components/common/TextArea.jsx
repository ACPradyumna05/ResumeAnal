import React from "react";

const TextArea = ({
  label,
  value,
  onChange,
  placeholder,
  rows = 8,
  helperText,
}) => {
  return (
    <div className="space-y-1 text-sm">
      <label className="font-medium text-slate-100">{label}</label>
      {helperText && <p className="text-xs text-slate-400">{helperText}</p>}
      <textarea
        className="mt-1 w-full rounded-xl border border-slate-700 bg-slate-950/60 px-3 py-2 text-xs text-slate-50 outline-none focus:border-sky-500 focus:ring-1 focus:ring-sky-500 resize-y"
        rows={rows}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
      />
      <div className="text-[11px] text-slate-500 text-right">
        {value.length} characters
      </div>
    </div>
  );
};

export default TextArea;

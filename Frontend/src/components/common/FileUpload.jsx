import React, { useRef, useState } from "react";

const ALLOWED_TYPES = [
  "application/pdf",
  "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
];

const FileUpload = ({
  multiple,
  maxSizeMB = 10,
  onFilesSelected,
  label,
  description,
}) => {
  const inputRef = useRef(null);
  const [error, setError] = useState(null);

  const handleChange = (e) => {
    const files = e.target.files;
    if (!files || files.length === 0) return;

    const accepted = [];
    const maxBytes = maxSizeMB * 1024 * 1024;

    for (const file of Array.from(files)) {
      if (!ALLOWED_TYPES.includes(file.type)) {
        setError("Only PDF and DOCX files are supported.");
        continue;
      }
      if (file.size > maxBytes) {
        setError(`File "${file.name}" exceeds ${maxSizeMB} MB.`);
        continue;
      }
      accepted.push({
        file,
        id: `${file.name}-${file.size}-${file.lastModified}`,
      });
    }

    if (accepted.length > 0) {
      setError(null);
      onFilesSelected(accepted);
    }

    e.target.value = "";
  };

  return (
    <div className="space-y-1 text-sm">
      <p className="font-medium text-slate-100">{label}</p>
      {description && <p className="text-xs text-slate-400">{description}</p>}

      <button
        type="button"
        className="mt-2 inline-flex items-center gap-2 rounded-xl border border-dashed border-slate-700 bg-slate-900/60 px-4 py-2 text-xs text-slate-200 hover:border-sky-500 hover:bg-slate-900 transition"
        onClick={() => inputRef.current && inputRef.current.click()}
      >
        <span className="text-lg">📄</span>
        <span>
          Select {multiple ? "files (PDF / DOCX)" : "file (PDF / DOCX)"}
        </span>
      </button>
      <input
        ref={inputRef}
        type="file"
        className="hidden"
        multiple={multiple}
        onChange={handleChange}
        accept=".pdf,.docx,application/pdf,application/vnd.openxmlformats-officedocument.wordprocessingml.document"
      />
      {error && <p className="text-xs text-red-400 mt-1">{error}</p>}
    </div>
  );
};

export default FileUpload;

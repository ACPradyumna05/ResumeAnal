import React, { useState, useEffect, useRef } from 'react';
import styles from './ResumeUploader.module.css';

export default function ResumeUploader() {
const [file, setFile] = useState(null);
const [jobDesc, setJobDesc] = useState('');
const [analyzing, setAnalyzing] = useState(false);
const [progress, setProgress] = useState(0);
const [result, setResult] = useState(null);
const [history, setHistory] = useState([
    { id: 1, name: 'res1.pdf', score: 36 },
    { id: 2, name: 'res2.pdf', score: 79 },
    { id: 3, name: 'cv1.docx', score: 96 },
]);
const progressRef = useRef(null);

function handleFile(e) {
    const f = e.target.files && e.target.files[0];
    if (f) {
    setFile(f);
    setResult(null);
    }
}

function handleAnalyze() {
    if (!file) {
    alert('Please upload a resume file first.');
    return;
    }
    setAnalyzing(true);
    setProgress(0);
    setResult(null);

    let p = 0;
    progressRef.current = setInterval(() => {
    p += Math.floor(Math.random() * 12) + 6;
    if (p >= 100) {
        p = 100;
        clearInterval(progressRef.current);
        setTimeout(() => {
        const simulated = {
            score: Math.min(99, Math.max(15, Math.round(65 + Math.random() * 30))),
            matched: ['Python', 'React', 'SQL'],
            missing: ['Django', 'REST API'],
            experience: '2 years (required: 3)',
            education: 'B.Tech — Matches',
        };
        setResult(simulated);
        setAnalyzing(false);
        setProgress(100);
        setHistory((h) => [{ id: Date.now(), name: file.name, score: simulated.score }, ...h].slice(0, 6));
        }, 350);
    }
    setProgress(p);
    }, 250);
}

useEffect(() => {
    return () => {
    if (progressRef.current) clearInterval(progressRef.current);
    };
}, []);

function handleReset() {
    setFile(null);
    setJobDesc('');
    setAnalyzing(false);
    setProgress(0);
    setResult(null);
}

function handleExport() {
    window.print();
}

return (
    <div className={styles.container}>
    <div className={styles.aura} />
    <div className={styles.floatingOrbs}>
        <div className={styles.orb1} />
        <div className={styles.orb2} />
        <div className={styles.orb3} />
    </div>

    <div className={styles.content}>
        {/* LEFT PANEL */}
        <div className={styles.panel}>
        <div className={styles.panelGlow} />
        
        <div className={styles.panelContent}>
            {/* Header */}
            <header className={styles.header}>
            <div className={styles.statusDot} />
            <h1 className={styles.title}>Resume Analyzer</h1>
            <p className={styles.subtitle}>
                Upload a candidate resume and paste the job description to see a quick match summary.
            </p>
            </header>

            {/* Upload Box */}
            <label className={styles.uploadBox}>
            <div className={styles.uploadIcon}>
                <svg viewBox="0 0 128 96" className={styles.cloudIcon}>
                <defs>
                    <linearGradient id="g1" x1="0" x2="1" y1="0" y2="1">
                    <stop offset="0%" stopColor="#ff8800"/>
                    <stop offset="100%" stopColor="#ffb703"/>
                    </linearGradient>
                    <linearGradient id="g2" x1="0" x2="1" y1="1" y2="0">
                    <stop offset="0%" stopColor="#fb923c"/>
                    <stop offset="100%" stopColor="#34d399"/>
                    </linearGradient>
                </defs>
                <path d="M38 74h52a18 18 0 0 0 2-36 26 26 0 0 0-48-8 20 20 0 0 0-6 40z"
                    fill="none" stroke="url(#g1)" strokeWidth="4" />
                <path d="M38 74h52a18 18 0 0 0 2-36 26 26 0 0 0-48-8 20 20 0 0 0-6 40z"
                    fill="none" stroke="url(#g2)" strokeWidth="2" opacity=".8" />
                </svg>
            </div>

            <div className={styles.uploadText}>
                <div className={styles.uploadTitle}>Drop or click to upload</div>
                <div className={styles.uploadDesc}>
                Supported: PDF, DOCX — max demo size 10MB
                </div>

                {file && (
                <div className={styles.fileInfo}>
                    <div className={styles.fileName} title={file.name}>{file.name}</div>
                    <div className={styles.fileSize}>
                    {(file.size / 1024).toFixed(1)} KB
                    </div>
                </div>
                )}
            </div>

            <input
                className={styles.fileInput}
                type="file"
                accept=".pdf,.docx"
                onChange={handleFile}
            />
            </label>

            {/* Job Description */}
            <div className={styles.textareaWrapper}>
            <textarea
                className={styles.textarea}
                placeholder="Paste the job description or requirements here (optional)"
                value={jobDesc}
                onChange={(e) => setJobDesc(e.target.value)}
            />
            </div>

            {/* Controls */}
            {!analyzing && (
            <div className={styles.controls}>
                <button className={styles.btnPrimary} onClick={handleAnalyze}>
                Analyze Resume
                </button>
                <button className={styles.btnSecondary} onClick={handleReset}>
                Reset
                </button>
            </div>
            )}

            {/* Analyzing */}
            {analyzing && (
            <div className={styles.analyzing}>
                <div className={styles.analyzingHeader}>
                <span className={styles.spinner} />
                <div className={styles.analyzingText}>Analyzing…</div>
                </div>
                <div className={styles.progressBar}>
                <div className={styles.progressFill} style={{ width: `${progress}%` }} />
                </div>
            </div>
            )}

            {/* Result */}
            {result && (
            <div className={styles.result}>
                <div className={styles.resultHeader}>
                <div className={styles.scoreCircle}>
                    <div className={styles.scoreRing} />
                    <span className={styles.scoreValue}>{result.score}%</span>
                </div>
                <div className={styles.resultInfo}>
                    <div className={styles.resultTitle}>Match Score</div>
                    <div className={styles.resultDetails}>
                    Experience: {result.experience} • Education: {result.education}
                    </div>
                </div>
                <button className={styles.btnExport} onClick={handleExport}>
                    Export
                </button>
                </div>

                <div className={styles.skillsSection}>
                <div>
                    <div className={styles.skillsTitle}>Matched Skills</div>
                    <div className={styles.skillsTags}>
                    {result.matched.map((s) => (
                        <div key={s} className={styles.skillMatched}>{s}</div>
                    ))}
                    </div>
                </div>

                <div>
                    <div className={styles.skillsTitle}>Missing / Recommended</div>
                    <div className={styles.skillsTags}>
                    {result.missing.map((s) => (
                        <div key={s} className={styles.skillMissing}>{s}</div>
                    ))}
                    </div>
                </div>
                </div>
            </div>
            )}
        </div>
        </div>

        {/* RIGHT PANEL */}
        <aside className={styles.panel}>
        <div className={styles.panelGlow} />
        
        <div className={styles.panelContent}>
            <h3 className={styles.sidebarTitle}>Recent Analyses</h3>

            <div className={styles.historyList}>
            {history.map((h) => (
                <div key={h.id} className={styles.historyItem}>
                <div>
                    <div className={styles.historyName} title={h.name}>{h.name}</div>
                    <div className={styles.historyMeta}>
                    processed • demo
                    </div>
                </div>
                <div className={styles.historyScore}>
                    <div className={styles.historyScoreRing} />
                    <span>{h.score}%</span>
                </div>
                </div>
            ))}
            </div>

            <div className={styles.sidebarControls}>
            <button 
                className={styles.btnSecondary}
                onClick={() => alert('This is a demo history.')}
            >
                Clear
            </button>
            <button 
                className={styles.btnPrimary}
                onClick={() => alert('Exporting history...')}
            >
                Export List
            </button>
            </div>
        </div>
        </aside>
    </div>

    <footer className={styles.footer}>
        © 2025 Resume Analyzer — Demo UI
    </footer>
    </div>
);
}
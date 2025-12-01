import React, { useState } from 'react'
import styles from './EmployerDash.module.css'

export default function EmployerDash() {
const [candidates, setCandidates] = useState([
    { id: 1, name: '[name1]', email: '[email1]', skills: ['Python', 'React', 'SQL'], exp: '2 yrs', education: 'B.Tech', score: 92 },
    { id: 2, name: '[name2]', email: '[email2]', skills: ['Java', 'Spring Boot', 'SQL'], exp: '3 yrs', education: 'B.Tech', score: 88 },
    { id: 3, name: '[name3]', email: '[email3]', skills: ['Python', 'Django', 'ML'], exp: '1 yr', education: 'B.Sc CS', score: 80 },
    { id: 4, name: '[name4]', email: '[email4]', skills: ['React', 'Node.js', 'MongoDB'], exp: '2 yrs', education: 'B.Tech', score: 76 },
])

const [sortBy, setSortBy] = useState('score')

const handleSort = (key) => {
    const sorted = [...candidates].sort((a, b) => b[key] - a[key])
    setCandidates(sorted)
    setSortBy(key)
}

const handleReject = (id) => {
    setCandidates(candidates.filter((c) => c.id !== id))
}

const handleExport = () => {
    alert('Exporting candidate list as CSV...')
}

return (
    <div className={styles.page}>
    <div className={styles.container}>
        <header className={styles.header}>
        <h1 className={styles.title}>Employer Dashboard</h1>
        <p className={styles.subtitle}>View and manage candidates ranked for your job listing</p>
        </header>

        <div className={styles.dashboard}>
        {/* LEFT: Overview */}
        <aside className={styles.sidebar}>
            <div className={styles.overviewCard}>
            <h2>Overview</h2>
            <p><strong>Total Candidates:</strong> {candidates.length}</p>
            <p><strong>Average Score:</strong> {(candidates.reduce((a, c) => a + c.score, 0) / candidates.length).toFixed(1)}%</p>
            <p><strong>Job Title:</strong> Software Developer</p>
            <p><strong>Required Skills:</strong> React, Python, SQL</p>
            </div>

            <div className={styles.actions}>
            <button className={`${styles.btn} ${styles.primary}`} onClick={() => handleSort('score')}>
                Sort by Score
            </button>
            <button className={`${styles.btn} ${styles.secondary}`} onClick={() => handleSort('exp')}>
                Sort by Experience
            </button>
            <button className={`${styles.btn} ${styles.export}`} onClick={handleExport}>
                Export List
            </button>
            </div>
        </aside>

        {/* RIGHT: Candidates */}
        <section className={styles.main}>
            {candidates.map((c) => (
            <div key={c.id} className={styles.card}>
                <div className={styles.candidateHeader}>
                <div>
                    <h3>{c.name}</h3>
                    <p className={styles.email}>{c.email}</p>
                </div>
                <div className={styles.scoreBadge}>{c.score}%</div>
                </div>

                <div className={styles.meta}>
                <p><strong>Experience:</strong> {c.exp}</p>
                <p><strong>Education:</strong> {c.education}</p>
                </div>

                <div className={styles.skills}>
                {c.skills.map((s) => (
                    <span key={s} className={styles.skillChip}>{s}</span>
                ))}
                </div>

                <div className={styles.buttons}>
                <button className={`${styles.btn} ${styles.reject}`} onClick={() => handleReject(c.id)}>
                    Reject
                </button>
                <button className={`${styles.btn} ${styles.view}`} onClick={() => alert(`Viewing ${c.name}'s resume...`)}>
                    View Resume
                </button>
                </div>
            </div>
            ))}
        </section>
        </div>
    </div>

    <footer className={styles.footer}>© 2025 Resume Analyzer — Employer Portal</footer>
    </div>
)
}

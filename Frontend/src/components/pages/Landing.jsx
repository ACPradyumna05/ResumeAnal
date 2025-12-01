import React, { useEffect, useRef } from "react";
import { Link } from "react-router-dom";

const AnimatedGridBackground = () => {
const canvasRef = useRef(null);

useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    let animationFrameId;
    let time = 0;

    const resizeCanvas = () => {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    };
    resizeCanvas();
    window.addEventListener("resize", resizeCanvas);

    const gridSize = 60;
    const pulseSpeed = 0.2;
    const waveSpeed = 0.01;

    const drawGrid = () => {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    
    time += 1;

    for (let y = 0; y < canvas.height; y += gridSize) {
        ctx.beginPath();
        ctx.strokeStyle = `rgba(56, 189, 248, ${0.1 + Math.sin(time * pulseSpeed + y * waveSpeed) * 0.05})`;
        ctx.lineWidth = 1;
        
        for (let x = 0; x <= canvas.width; x += 10) {
        const wave = Math.sin(time * waveSpeed + x * 0.01 + y * 0.005) * 8;
        if (x === 0) {
            ctx.moveTo(x, y + wave);
        } else {
            ctx.lineTo(x, y + wave);
        }
        }
        ctx.stroke();
    }

    for (let x = 0; x < canvas.width; x += gridSize) {
        ctx.beginPath();
        ctx.strokeStyle = `rgba(168, 85, 247, ${0.08 + Math.sin(time * pulseSpeed + x * waveSpeed) * 0.04})`;
        ctx.lineWidth = 1;
        
        for (let y = 0; y <= canvas.height; y += 10) {
        const wave = Math.sin(time * waveSpeed + y * 0.01 + x * 0.005) * 8;
        if (y === 0) {
            ctx.moveTo(x + wave, y);
        } else {
            ctx.lineTo(x + wave, y);
        }
        }
        ctx.stroke();
    }

    for (let x = 0; x < canvas.width; x += gridSize) {
        for (let y = 0; y < canvas.height; y += gridSize) {
        const intensity = Math.sin(time * 0.003 + x * 0.005 + y * 0.005);
        if (intensity > 0.7) {
            const size = (intensity - 0.7) * 10;
            ctx.beginPath();
            ctx.arc(x, y, size, 0, Math.PI * 2);
            ctx.fillStyle = `rgba(56, 189, 248, ${(intensity - 0.7) * 0.4})`;
            ctx.fill();
        }
        }
    }

    animationFrameId = requestAnimationFrame(drawGrid);
    };

    drawGrid();

    return () => {
    window.removeEventListener("resize", resizeCanvas);
    cancelAnimationFrame(animationFrameId);
    };
}, []);

return (
    <canvas
    ref={canvasRef}
    className="absolute inset-0 pointer-events-none"
    style={{ opacity: 0.6 }}
    />
);
};

const LandingPage = () => {
return (
    <div className="min-h-screen bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950 text-slate-200 flex flex-col relative overflow-hidden">
    <AnimatedGridBackground />

    <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-20 left-10 w-72 h-72 bg-sky-500/10 rounded-full blur-3xl"></div>
        <div className="absolute bottom-20 right-10 w-96 h-96 bg-purple-500/10 rounded-full blur-3xl"></div>
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-sky-400/5 rounded-full blur-3xl"></div>
    </div>

    <div className="flex flex-col items-center justify-center grow text-center px-6 relative z-9">
        <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-sky-500/10 border border-sky-500/20 text-sky-300 text-xs font-medium mb-8 backdrop-blur-sm">
        <div className="w-2 h-2 bg-sky-400 rounded-full animate-pulse"></div>
        AI-Powered Matching Engine
        </div>

        <h2 className="text-5xl md:text-7xl font-bold mb-6 bg-gradient-to-r from-sky-400 via-sky-300 to-purple-400 text-transparent bg-clip-text leading-tight tracking-tight">
        Match Your Resume
        <br />
        <span className="text-4xl md:text-6xl">to Perfect Opportunities</span>
        </h2>

        <p className="max-w-2xl text-slate-400 mb-12 text-base md:text-lg leading-relaxed">
        Upload a resume, paste a job description, and let our AI evaluate
        alignment instantly. Employers can rank up to 50 resumes at once with
        precision scoring.
        </p>

        
        {/* CTA Buttons */}
        <div className="flex flex-col sm:flex-row gap-4 mt-4">
        <Link
            to="/candidate"
            className="group px-8 py-4 rounded-2xl bg-gradient-to-r from-sky-600 to-sky-500 hover:from-sky-500 hover:to-sky-400 text-white font-semibold shadow-lg shadow-sky-500/25 transition-all duration-300 hover:shadow-xl hover:shadow-sky-500/40 hover:-translate-y-0.5"
        >
            <span className="flex items-center gap-2">
            For Candidates
            <svg className="w-5 h-5 group-hover:translate-x-1 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
            </svg>
            </span>
        </Link>

        <Link
            to="/employer"
            className="group px-8 py-4 rounded-2xl bg-gradient-to-r from-purple-600 to-purple-500 hover:from-purple-500 hover:to-purple-400 text-white font-semibold shadow-lg shadow-purple-500/25 transition-all duration-300 hover:shadow-xl hover:shadow-purple-500/40 hover:-translate-y-0.5"
        >
            <span className="flex items-center gap-2">
            For Employers
            <svg className="w-5 h-5 group-hover:translate-x-1 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
            </svg>
            </span>
        </Link>
        </div>



        {/* Feature highlights */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-20 max-w-4xl">
        <div className="p-6 rounded-2xl bg-slate-800/30 border border-slate-700/50 backdrop-blur-sm hover:bg-slate-800/50 transition-all duration-300 hover:border-sky-500/50">
            <div className="w-12 h-12 rounded-xl bg-sky-500/10 flex items-center justify-center mb-4 mx-auto">
            <svg className="w-6 h-6 text-sky-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
            </svg>
            </div>
            <h3 className="font-semibold text-slate-200 mb-2">Instant Analysis</h3>
            <p className="text-sm text-slate-400">Get AI-powered matching scores in seconds</p>
        </div>

        <div className="p-6 rounded-2xl bg-slate-800/30 border border-slate-700/50 backdrop-blur-sm hover:bg-slate-800/50 transition-all duration-300 hover:border-purple-500/50">
            <div className="w-12 h-12 rounded-xl bg-purple-500/10 flex items-center justify-center mb-4 mx-auto">
            <svg className="w-6 h-6 text-purple-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            </div>
            <h3 className="font-semibold text-slate-200 mb-2">Batch Processing</h3>
            <p className="text-sm text-slate-400">Rank up to 50 resumes simultaneously</p>
        </div>

        <div className="p-6 rounded-2xl bg-slate-800/30 border border-slate-700/50 backdrop-blur-sm hover:bg-slate-800/50 transition-all duration-300 hover:border-sky-500/50">
            <div className="w-12 h-12 rounded-xl bg-sky-500/10 flex items-center justify-center mb-4 mx-auto">
            <svg className="w-6 h-6 text-sky-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
            </svg>
            </div>
            <h3 className="font-semibold text-slate-200 mb-2">Detailed Insights</h3>
            <p className="text-sm text-slate-400">Understand exact alignment metrics</p>
        </div>
        </div>
    </div>

    <footer className="py-6 text-center text-xs text-slate-500 border-t border-slate-800/50 backdrop-blur-sm relative z-9">
        © {new Date().getFullYear()} MatchMyResume — AI Resume Scoring System
    </footer>
    </div>
);
};

export default LandingPage;
import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { login } from "../../lib/api";
import { useAuth } from "../../hooks/useAuth";

export default function LoginPage() {
const navigate = useNavigate();
const { setUser } = useAuth();

const [email, setEmail] = useState("");
const [password, setPassword] = useState("");

const [loading, setLoading] = useState(false);
const [error, setError] = useState(null);

const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);

    try {
    setLoading(true);

    // 1️⃣ Perform backend login (stores JWT internally in api.js)
    await login({ email, password });

    // 2️⃣ Set user globally
    setUser({
        email,
        name: email.split("@")[0],
    });

    // 3️⃣ Redirect
    navigate("/employer");

    } catch (err) {
    setError(err.message || "Login failed");
    } finally {
    setLoading(false);
    }
};

return (
    /* ⛔ DO NOT MODIFY — your UI stays intact */
    <div className="min-h-screen bg-slate-950 flex items-center justify-center px-4">
    <div className="bg-slate-900 p-8 rounded-2xl border border-slate-800 w-full max-w-md shadow-xl">
        <h1 className="text-2xl font-semibold text-sky-400 text-center mb-6">Login</h1>

        {error && <p className="text-red-400 text-xs text-center mb-3">{error}</p>}

        <form onSubmit={handleSubmit} className="space-y-4">
        <div>
            <label className="text-sm text-slate-300">Email</label>
            <input
            type="email"
            required
            className="w-full mt-1 px-3 py-2 rounded-lg bg-slate-800 text-slate-200 border border-slate-700"
            onChange={(e) => setEmail(e.target.value)}
            />
        </div>

        <div>
            <label className="text-sm text-slate-300">Password</label>
            <input
            type="password"
            required
            className="w-full mt-1 px-3 py-2 rounded-lg bg-slate-800 text-slate-200 border border-slate-700"
            onChange={(e) => setPassword(e.target.value)}
            />
        </div>

        <button
            type="submit"
            disabled={loading}
            className={`w-full py-2 rounded-lg bg-sky-600 hover:bg-sky-500 text-white text-sm font-semibold ${
            loading ? "opacity-50 cursor-not-allowed" : ""
            }`}>
            {loading ? "Logging in…" : "Login"}
        </button>

        <p className="text-xs text-center text-slate-500 mt-3">
            Don't have an account?{" "}
            <Link className="text-sky-400 hover:underline" to="/signup">Sign Up</Link>
        </p>
        </form>
    </div>
    </div>
);
}

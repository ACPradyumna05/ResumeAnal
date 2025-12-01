import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { signup } from "../../lib/api";

export default function SignupPage() {
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleSignup = async (e) => {
    e.preventDefault();
    setError(null);

    try {
      setLoading(true);

      await signup({
        email,
        password,
        full_name: email.split("@")[0]
      });

      alert("Account created! Check your email for verification.");
      navigate("/login");

    } catch (err) {
      setError(err.message || "Signup failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    /* ⛔ UI stays exactly the same */
    <div className="min-h-screen bg-slate-950 flex items-center justify-center px-4">
      <div className="bg-slate-900 p-8 rounded-2xl border border-slate-800 w/full max-w-md shadow-xl">

        <h1 className="text-2xl font-semibold text-purple-400 text-center mb-6">Create Account</h1>

        {error && <p className="text-red-400 text-xs text-center mb-3">{error}</p>}

        <form onSubmit={handleSignup} className="space-y-4">
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
            className={`w-full py-2 rounded-lg bg-purple-600 hover:bg-purple-500 text-white text-sm font-semibold ${
              loading ? "opacity-50 cursor-not-allowed" : ""
            }`}>
            {loading ? "Creating Account…" : "Sign Up"}
          </button>

          <p className="text-xs text-center text-slate-500 mt-3">
            Already registered?{" "}
            <Link className="text-purple-400 hover:underline" to="/login">
              Login
            </Link>
          </p>
        </form>
      </div>
    </div>
  );
}

import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { logout, getToken } from "../../lib/api";

export default function Navbar() {
const navigate = useNavigate();
const token = getToken();

const doLogout = () => {
    logout();
    navigate("/login");
};

return (
    <nav className="border-b border-slate-800 bg-slate-950/80 backdrop-blur px-6 py-3 flex items-center justify-between">
    <Link to="/" className="text-sky-400 font-bold text-lg">
        MatchMyResume
    </Link>

    <div className="flex items-center gap-4 text-sm">
        {!token ? (
        <>
            <Link className="hover:text-sky-400" to="/login">Login</Link>
            <Link
            to="/signup"
            className="px-3 py-1.5 rounded bg-sky-600 text-white hover:bg-sky-500"
            >
            Sign Up
            </Link>
        </>
        ) : (
        <>
            <Link className="hover:text-sky-400" to="/employer">Dashboard</Link>
            <button
            onClick={doLogout}
            className="px-3 py-1.5 rounded border border-slate-700 text-slate-200 hover:bg-slate-800"
            >
            Logout
            </button>
        </>
        )}
    </div>
    </nav>
);
}

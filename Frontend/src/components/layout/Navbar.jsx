import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../../hooks/useAuth";

export default function Navbar() {
const navigate = useNavigate();
const { user, logout } = useAuth();

const handleLogout = () => {
    logout();
    navigate("/");
};

return (
    <nav className="bg-slate-950 border-b border-slate-800 px-6 py-3 flex justify-between sticky top-0 z-10 items-center">
    <Link to="/" className="text-sky-400 font-semibold text-lg">
        MatchMyResume
    </Link>

    {/* RIGHT SIDE */}
    <div className="flex items-center gap-4 text-sm">
        {!user && (
        <>
            <Link to="/login" className="hover:text-sky-400">Login</Link>
            <Link
            to="/signup"
            className="px-3 py-1.5 rounded-lg bg-sky-600 hover:bg-sky-500 text-white"
            >
            Sign Up
            </Link>
        </>
        )}

        {user && (
        <>
            <span className="text-slate-300">
            Hello, <strong className="text-sky-400">{user.name}</strong>
            </span>

            <button
            onClick={handleLogout}
            className="px-3 py-1.5 rounded-lg bg-red-500 hover:bg-red-400 text-white"
            >
            Logout
            </button>
        </>
        )}
    </div>
    </nav>
);
}

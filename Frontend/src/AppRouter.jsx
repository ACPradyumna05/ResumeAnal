import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";

import SplashScreen from "./components/common/SplashScreen";
import LandingPage from "./components/pages/Landing.jsx";
import LoginPage from "./components/pages/Login";
import SignupPage from "./components/pages/SignUp";
import VerifyEmail from "./components/auth/VerifyEmail";
import Navbar from "./components/layout/Navbar"; // create this if you haven't
import App from "./App";
import { getToken } from "./lib/api";




const ProtectedRoute = ({ children }) => {
const token = getToken();
return token ? children : <Navigate to="/login" replace />;
};

export default function AppRouter() {
const [loading, setLoading] = useState(true);

useEffect(() => {
    const timer = setTimeout(() => setLoading(false), 700);
    return () => clearTimeout(timer);
}, []);

if (loading) return <SplashScreen />;

return (
    <Router>
    <Navbar />
    <Routes>
        <Route path="/" element={<LandingPage />} />

        <Route path="/login" element={<LoginPage />} />
        <Route path="/signup" element={<SignupPage />} />
        <Route path="/verify-email" element={<VerifyEmail />} />

        <Route path="/candidate" element={
            <ProtectedRoute>
                <App initialTab="candidate" />
            </ProtectedRoute>} />

        <Route
        path="/employer"
        element={
            <ProtectedRoute>
            <App initialTab="employer" />
            </ProtectedRoute>
        }
        />

        <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
    </Router>
);
}

import React, { useEffect, useState } from "react";
import { useSearchParams, Link } from "react-router-dom";
import { verifyEmail } from "../../lib/api";

export default function VerifyEmail() {
const [params] = useSearchParams();
const token = params.get("token");
const [status, setStatus] = useState("verifying");

useEffect(() => {
    if (!token) {
    setStatus("invalid");
    return;
    }
    verifyEmail(token).then(() => setStatus("ok")).catch(() => setStatus("error"));
}, [token]);

if (status === "verifying") return <div>Verifying...</div>;
if (status === "ok") return <div>Email verified! <Link to="/login">Login</Link></div>;
return <div>Verification failed or invalid link.</div>;
}

import React from "react";

const SplashScreen = () => {
return (
    <div className="flex items-center justify-center h-screen bg-slate-950">
    <div className="flex flex-col items-center space-y-4 animate-fadeIn">
        <div className="w-16 h-16 border-4 border-sky-500 border-t-transparent rounded-full animate-spin" />
        <p className="text-slate-300 text-sm tracking-wide">
        Initializing AI Models...
        </p>
    </div>
    </div>
);
};

export default SplashScreen;

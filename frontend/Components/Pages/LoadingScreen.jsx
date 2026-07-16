// Components/Pages/LoadingScreen.jsx

import { useEffect, useState } from "react";
import prime from "../../src/assets/autobots/prime.png";

export default function LoadingScreen() {
  const messages = [
    "Initializing NeuroLoom...",
    "Authenticating User...",
    "Creating Your Workspace...",
    "Almost Ready...",
  ];

  const [messageIndex, setMessageIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setMessageIndex((prev) => (prev + 1) % messages.length);
    }, 1800);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="fixed inset-0 z-[9999] flex flex-col items-center justify-center bg-[#070B16] overflow-hidden">

      {/* Background Glow */}
      <div className="absolute w-[600px] h-[600px] rounded-full bg-blue-600/10 blur-3xl"></div>

      {/* Optimus Prime Logo */}
      <img
        src={prime}
        alt="Optimus Prime"
        className="w-44 md:w-52 animate-pulse drop-shadow-[0_0_35px_rgba(59,130,246,0.9)]"
      />

      {/* NeuroLoom Title */}
      <h1 className="mt-8 text-4xl font-bold tracking-[0.4em] text-white">
        NEUROLOOM
      </h1>

      {/* Loading Message */}
      <p className="mt-6 text-blue-300 text-lg font-medium tracking-wide h-8">
        {messages[messageIndex]}
      </p>

      {/* Loading Dots */}
      <div className="flex gap-3 mt-8">
        <span
          className="w-3 h-3 rounded-full bg-blue-400 animate-bounce"
          style={{ animationDelay: "0s" }}
        ></span>

        <span
          className="w-3 h-3 rounded-full bg-blue-400 animate-bounce"
          style={{ animationDelay: "0.2s" }}
        ></span>

        <span
          className="w-3 h-3 rounded-full bg-blue-400 animate-bounce"
          style={{ animationDelay: "0.4s" }}
        ></span>
      </div>

      {/* Footer */}
      <p className="absolute bottom-10 text-slate-500 text-sm tracking-widest">
        POWERED BY TRANSFORMERS AI
      </p>

    </div>
  );
}
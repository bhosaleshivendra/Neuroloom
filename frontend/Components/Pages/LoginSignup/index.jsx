import { motion, AnimatePresence } from "framer-motion";
import {
  BrainCircuit,
  Mail,
  Lock,
  User,
  Building2,
  ArrowRight,
  Sparkles,
  Terminal,
  Cpu,
  Layers,
} from "lucide-react";

import api from "../../../src/utils/axios";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../../src/context/AuthContext.jsx";

import LoadingScreen from "../LoadingScreen";

export default function LoginSignup() {
  const navigate = useNavigate();
  const { login: loginUser } = useAuth();

  const [login, setLogin] = useState(true);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [companyName, setCompanyName] = useState("");

  const handleSignup = async () => {
    if (!username || !email || !password || !companyName) {
      setError("Please fill in all fields.");
      return;
    }

    setLoading(true);
    setError("");

    try {
      const response = await api.post("/api/auth/signup", {
        username,
        email,
        password,
        companyName,
      });

      setLoading(false);
      setError("");
      setLogin(true); // Switch to login form on success
      setUsername("");
      setEmail("");
      setPassword("");
      setCompanyName("");
    } catch (error) {
      setLoading(false);
      if (error.response) {
        setError(error.response.data.message || "Signup Failed");
      } else {
        setError(error.message || "Something went wrong");
      }
    }
  };

  const handleLogin = async () => {
    if (!email || !password) {
      setError("Please enter your email and password.");
      return;
    }

    setLoading(true);
    setError("");

    try {
      const response = await api.post("/api/auth/login", {
        email,
        password,
      });

      const { token, user } = response.data;
      loginUser(user, token);

      setLoading(false);
      setError("");
      setEmail("");
      setPassword("");

      navigate("/");
    } catch (error) {
      setLoading(false);
      if (error.response) {
        setError(error.response.data.message || "Login Failed");
      } else {
        setError(error.message || "Something went wrong");
      }
    }
  };

  return (
    <>
      {loading && <LoadingScreen />}

      <div className="min-h-screen flex bg-slate-950 text-slate-100 overflow-hidden relative font-sans select-none">
        {/* Futuristic Grid Overlay Background */}
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#0f172a_1px,transparent_1px),linear-gradient(to_bottom,#0f172a_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_50%,#000_70%,transparent_100%)] opacity-60 z-0" />

        {/* Dynamic Glow Orbs */}
        <motion.div
          animate={{
            y: [0, -40, 0],
            x: [0, 40, 0],
            scale: [1, 1.15, 1],
          }}
          transition={{
            repeat: Infinity,
            duration: 12,
            ease: "easeInOut",
          }}
          className="absolute w-[500px] h-[500px] bg-indigo-500/10 blur-[140px] rounded-full -top-40 -left-40 z-0 pointer-events-none"
        />

        <motion.div
          animate={{
            y: [0, 60, 0],
            x: [0, -60, 0],
            scale: [1, 1.2, 1],
          }}
          transition={{
            repeat: Infinity,
            duration: 15,
            ease: "easeInOut",
          }}
          className="absolute w-[600px] h-[600px] bg-cyan-500/10 blur-[160px] rounded-full -bottom-40 -right-40 z-0 pointer-events-none"
        />

        {/* LEFT SIDE: AUTH FORM */}
        <div className="w-full lg:w-1/2 flex items-center justify-center p-8 z-10">
          <motion.div
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.6 }}
            className="w-full max-w-[440px] bg-slate-900/40 border border-slate-800/80 backdrop-blur-xl p-10 rounded-3xl shadow-[0_20px_50px_rgba(0,0,0,0.5)] relative overflow-hidden"
          >
            {/* Ambient card outline glow */}
            <div className="absolute top-0 left-1/4 right-1/4 h-[1px] bg-gradient-to-r from-transparent via-indigo-500 to-transparent" />

            <div className="flex flex-col items-center mb-8">
              <div className="w-16 h-16 rounded-2xl bg-indigo-600/10 border border-indigo-500/20 flex items-center justify-center shadow-lg shadow-indigo-500/5 mb-4 text-indigo-400">
                <BrainCircuit size={36} className="animate-pulse" />
              </div>
              <h1 className="text-3xl font-extrabold tracking-tight bg-gradient-to-r from-white via-slate-200 to-slate-400 bg-clip-text text-transparent">
                {login ? "Welcome Commander" : "Establish Matrix"}
              </h1>
              <p className="text-slate-400 text-sm mt-2 text-center">
                {login
                  ? "Access your Transformer organization dashboard."
                  : "Register command node to initiate AI workforce."}
              </p>
            </div>

            {error && (
              <motion.div
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                className="p-4 bg-red-950/40 border border-red-500/30 text-red-300 rounded-2xl text-xs flex gap-2 items-center mb-6"
              >
                <span className="w-1.5 h-1.5 rounded-full bg-red-500 shrink-0" />
                {error}
              </motion.div>
            )}

            <div className="space-y-4">
              <AnimatePresence mode="popLayout">
                {!login && (
                  <motion.div
                    initial={{ opacity: 0, y: -15 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -15 }}
                    transition={{ duration: 0.2 }}
                  >
                    <Input
                      icon={<User size={18} />}
                      placeholder="Username"
                      value={username}
                      onChange={(e) => setUsername(e.target.value)}
                    />
                  </motion.div>
                )}
              </AnimatePresence>

              <Input
                icon={<Mail size={18} />}
                placeholder="Email Address"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />

              <Input
                icon={<Lock size={18} />}
                placeholder="Password"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />

              <AnimatePresence mode="popLayout">
                {!login && (
                  <motion.div
                    initial={{ opacity: 0, y: 15 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: 15 }}
                    transition={{ duration: 0.2 }}
                  >
                    <Input
                      icon={<Building2 size={18} />}
                      placeholder="Company Name"
                      value={companyName}
                      onChange={(e) => setCompanyName(e.target.value)}
                    />
                  </motion.div>
                )}
              </AnimatePresence>

              <motion.button
                whileHover={{ scale: 1.01 }}
                whileTap={{ scale: 0.99 }}
                onClick={login ? handleLogin : handleSignup}
                className="group w-full mt-6 bg-gradient-to-r from-indigo-600 to-violet-600 rounded-2xl text-white py-4 font-semibold flex justify-center items-center gap-3 hover:from-indigo-500 hover:to-violet-500 shadow-lg shadow-indigo-500/20 hover:shadow-indigo-500/30 transition duration-300 cursor-pointer text-sm"
              >
                {login ? "Initiate Link" : "Activate Command Node"}
                <ArrowRight size={16} className="group-hover:translate-x-1 duration-300" />
              </motion.button>
            </div>

            <div className="flex flex-col items-center mt-8 border-t border-slate-800/80 pt-6">
              <span className="text-slate-500 text-xs">
                {login ? "New Commander?" : "Registered Node?"}
              </span>
              <button
                onClick={() => setLogin(!login)}
                className="mt-3 text-sm text-indigo-400 hover:text-indigo-300 font-semibold transition cursor-pointer"
              >
                {login ? "Initialize Account Matrix" : "Return to Credentials Portal"}
              </button>
            </div>
          </motion.div>
        </div>

        {/* RIGHT SIDE: KINETIC VISUAL IDENT */}
        <div className="hidden lg:flex w-1/2 relative bg-slate-950 border-l border-slate-900 items-center justify-center p-12 overflow-hidden z-10">
          <div className="absolute inset-0 bg-slate-950 opacity-90 z-0" />
          <div className="absolute inset-0 bg-radial-[circle_800px_at_center] from-indigo-900/15 via-transparent to-transparent pointer-events-none z-0" />

          <div className="relative flex flex-col items-center justify-center text-center z-10 max-w-lg">
            {/* Holographic Spinning Emblem */}
            <motion.div
              animate={{
                rotate: [0, 360],
              }}
              transition={{
                repeat: Infinity,
                duration: 40,
                ease: "linear",
              }}
              className="relative w-48 h-48 border border-dashed border-indigo-500/20 rounded-full flex items-center justify-center mb-10"
            >
              <div className="absolute w-40 h-40 border border-slate-800 rounded-full" />
              <motion.div
                animate={{
                  scale: [1, 1.08, 1],
                  opacity: [0.3, 0.6, 0.3],
                }}
                transition={{
                  repeat: Infinity,
                  duration: 4,
                  ease: "easeInOut",
                }}
                className="absolute w-36 h-36 bg-gradient-to-tr from-indigo-500/10 to-cyan-500/10 blur-xl rounded-full"
              />
              <motion.div
                animate={{
                  y: [0, -4, 0],
                }}
                transition={{
                  repeat: Infinity,
                  duration: 6,
                  ease: "easeInOut",
                }}
                className="bg-slate-900/90 border border-slate-800 backdrop-blur-2xl rounded-3xl p-5 shadow-2xl text-indigo-400"
              >
                <BrainCircuit size={64} className="glow-indigo" />
              </motion.div>
            </motion.div>

            <h2 className="text-4xl font-extrabold tracking-tight bg-gradient-to-r from-white via-slate-200 to-indigo-300 bg-clip-text text-transparent">
              NEUROLOOM OS
            </h2>

            <p className="text-slate-400 text-sm mt-4 leading-relaxed max-w-sm">
              The futuristic command panel operated by intelligent Transformers. Streamline departments, synchronize workflows, and generate dynamic code/materials in real time.
            </p>

            {/* Feature Cards Grid */}
            <div className="grid grid-cols-2 gap-4 mt-12 w-full">
              <FeatureCard
                icon={<Cpu size={16} />}
                title="Transformer Core"
                desc="Department delegation"
              />
              <FeatureCard
                icon={<Sparkles size={16} />}
                title="RAG Context engine"
                desc="Localized AI memory"
              />
              <FeatureCard
                icon={<Terminal size={16} />}
                title="Team Orchestration"
                desc="Joint Autobot action"
              />
              <FeatureCard
                icon={<Layers size={16} />}
                title="Workflow Engine"
                desc="Interactive tree mappings"
              />
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

function Input({ icon, ...props }) {
  return (
    <div className="flex items-center gap-3 border border-slate-800 bg-slate-900/20 focus-within:bg-slate-900/50 rounded-2xl px-5 py-4 focus-within:border-indigo-500/60 focus-within:shadow-[0_0_15px_rgba(99,102,241,0.1)] transition duration-300">
      <span className="text-slate-500 focus-within:text-indigo-400 shrink-0">{icon}</span>
      <input
        {...props}
        className="outline-none w-full bg-transparent text-sm text-slate-100 placeholder-slate-500"
      />
    </div>
  );
}

function FeatureCard({ icon, title, desc }) {
  return (
    <motion.div
      whileHover={{
        y: -3,
        borderColor: "rgba(99,102,241,0.3)",
        backgroundColor: "rgba(15,23,42,0.6)",
      }}
      className="bg-slate-900/30 backdrop-blur-md rounded-2xl p-4 text-left border border-slate-900 transition-all duration-300 shadow-lg"
    >
      <div className="w-8 h-8 rounded-xl bg-indigo-500/10 flex items-center justify-center text-indigo-400 mb-3 border border-indigo-500/10">
        {icon}
      </div>
      <h3 className="text-xs font-bold text-slate-200">{title}</h3>
      <p className="text-[10px] text-slate-500 mt-1">{desc}</p>
    </motion.div>
  );
}
import { useState, useEffect } from "react";
import {
  KeyRound, ShieldAlert, Cpu, Sparkles, Save,
  Eye, EyeOff, CheckCircle, XCircle, Loader2,
  Zap, FlaskConical, Globe, Server,
} from "lucide-react";
import api from "../../src/utils/axios";
import "./index.css";

// ─── 2026 Updated Model Registry ──────────────────────────────────────────────
const MODELS_PER_PROVIDER = {
  gemini: [
    { id: "gemini-2.5-pro", name: "Gemini 2.5 Pro ⚡ (Latest, Best)" },
    { id: "gemini-2.5-flash", name: "Gemini 2.5 Flash (Fast + Smart)" },
    { id: "gemini-2.0-flash", name: "Gemini 2.0 Flash (Recommended)" },
    { id: "gemini-2.0-flash-lite", name: "Gemini 2.0 Flash Lite (Fastest)" },
    { id: "gemini-1.5-pro", name: "Gemini 1.5 Pro" },
    { id: "gemini-1.5-flash", name: "Gemini 1.5 Flash" },
    { id: "gemini-1.5-flash-8b", name: "Gemini 1.5 Flash 8B (Economy)" },
  ],
  openai: [
    { id: "gpt-4.1", name: "GPT-4.1 ⚡ (Latest, Best)" },
    { id: "gpt-4.1-mini", name: "GPT-4.1 Mini (Fast)" },
    { id: "gpt-4.1-nano", name: "GPT-4.1 Nano (Fastest)" },
    { id: "gpt-4o", name: "GPT-4o" },
    { id: "gpt-4o-mini", name: "GPT-4o Mini" },
    { id: "o3", name: "o3 (Reasoning)" },
    { id: "o4-mini", name: "o4-mini (Reasoning, Fast)" },
    { id: "gpt-3.5-turbo", name: "GPT-3.5 Turbo (Economy)" },
  ],
  claude: [
    { id: "claude-opus-4-5", name: "Claude Opus 4.5 ⚡ (Latest, Best)" },
    { id: "claude-sonnet-4-5", name: "Claude Sonnet 4.5 (Balanced)" },
    { id: "claude-haiku-4-5", name: "Claude Haiku 4.5 (Fast)" },
    { id: "claude-3-7-sonnet-20250219", name: "Claude 3.7 Sonnet" },
    { id: "claude-3-5-sonnet-20241022", name: "Claude 3.5 Sonnet" },
    { id: "claude-3-5-haiku-20241022", name: "Claude 3.5 Haiku" },
    { id: "claude-3-opus-20240229", name: "Claude 3 Opus (Legacy)" },
  ],
  deepseek: [
    { id: "deepseek-reasoner", name: "DeepSeek R2 ⚡ (Latest Reasoning)" },
    { id: "deepseek-chat", name: "DeepSeek V3 (Chat)" },
    { id: "deepseek-r1", name: "DeepSeek R1 (Reasoning)" },
    { id: "deepseek-coder", name: "DeepSeek Coder" },
  ],
  groq: [
    { id: "llama-3.3-70b-versatile", name: "Llama 3.3 70B ⚡ (Latest, Groq)" },
    { id: "llama-4-scout-17b-16e-instruct", name: "Llama 4 Scout 17B (Groq)" },
    { id: "deepseek-r1-distill-llama-70b", name: "DeepSeek R1 70B (Groq)" },
    { id: "gemma2-9b-it", name: "Gemma 2 9B (Groq)" },
    { id: "mixtral-8x7b-32768", name: "Mixtral 8x7B (Groq)" },
    { id: "llama3-8b-8192", name: "Llama 3 8B (Groq, Economy)" },
  ],
  together: [
    { id: "meta-llama/Llama-4-Scout-17B-16E-Instruct", name: "Llama 4 Scout 17B ⚡ (Latest)" },
    { id: "meta-llama/Llama-4-Maverick-17B-128E-Instruct-FP8", name: "Llama 4 Maverick 17B" },
    { id: "meta-llama/Meta-Llama-3.1-70B-Instruct-Turbo", name: "Llama 3.1 70B Turbo" },
    { id: "meta-llama/Meta-Llama-3.1-8B-Instruct-Turbo", name: "Llama 3.1 8B Turbo" },
    { id: "deepseek-ai/DeepSeek-R1", name: "DeepSeek R1 (Together)" },
    { id: "Qwen/Qwen2.5-72B-Instruct-Turbo", name: "Qwen 2.5 72B" },
    { id: "mistralai/Mixtral-8x7B-Instruct-v0.1", name: "Mixtral 8x7B (Together)" },
  ],
  mistral: [
    { id: "mistral-large-latest", name: "Mistral Large ⚡ (Latest, Best)" },
    { id: "mistral-medium-latest", name: "Mistral Medium" },
    { id: "mistral-small-latest", name: "Mistral Small (Fast)" },
    { id: "codestral-latest", name: "Codestral (Code)" },
    { id: "open-mixtral-8x22b", name: "Mixtral 8x22B (Open)" },
    { id: "open-mistral-7b", name: "Mistral 7B (Economy)" },
  ],
  openrouter: [
    { id: "meta-llama/llama-4-scout:free", name: "Llama 4 Scout ⚡ (Free)" },
    { id: "meta-llama/llama-4-maverick:free", name: "Llama 4 Maverick (Free)" },
    { id: "deepseek/deepseek-r2:free", name: "DeepSeek R2 (Free)" },
    { id: "google/gemini-2.0-flash-exp:free", name: "Gemini 2.0 Flash (Free)" },
    { id: "anthropic/claude-opus-4-5", name: "Claude Opus 4.5" },
    { id: "openai/gpt-4.1", name: "GPT-4.1" },
    { id: "mistralai/mistral-large", name: "Mistral Large" },
    { id: "qwen/qwen3-235b-a22b:free", name: "Qwen3 235B (Free)" },
  ],
  ollama: [
    { id: "llama3.2", name: "Llama 3.2 (Local, Recommended)" },
    { id: "llama3.1", name: "Llama 3.1 (Local)" },
    { id: "gemma3", name: "Gemma 3 (Local)" },
    { id: "qwen2.5", name: "Qwen 2.5 (Local)" },
    { id: "deepseek-r1", name: "DeepSeek R1 (Local)" },
    { id: "phi4", name: "Phi-4 (Local, Microsoft)" },
    { id: "mistral", name: "Mistral 7B (Local)" },
    { id: "codellama", name: "CodeLlama (Local, Code)" },
  ],
  lmstudio: [
    { id: "model-identifier", name: "Local LM Studio Model" },
  ],
  azure: [
    { id: "gpt-4.1", name: "Azure GPT-4.1 (Latest)" },
    { id: "gpt-4o", name: "Azure GPT-4o" },
    { id: "gpt-4", name: "Azure GPT-4" },
    { id: "gpt-35-turbo", name: "Azure GPT-3.5 Turbo" },
  ],
  bedrock: [
    { id: "anthropic.claude-3-5-sonnet-20241022-v2:0", name: "Claude 3.5 Sonnet (AWS)" },
    { id: "anthropic.claude-3-7-sonnet-20250219-v1:0", name: "Claude 3.7 Sonnet (AWS)" },
    { id: "amazon.nova-pro-v1:0", name: "Amazon Nova Pro" },
    { id: "amazon.nova-lite-v1:0", name: "Amazon Nova Lite" },
    { id: "meta.llama4-scout-17b-instruct-v1:0", name: "Llama 4 Scout (AWS)" },
  ],
};

const PROVIDERS = [
  { id: "gemini",     label: "Google Gemini",         icon: "🟦", badge: "Free Tier" },
  { id: "openai",    label: "OpenAI",                 icon: "⬛", badge: "GPT-4.1" },
  { id: "claude",    label: "Anthropic Claude",       icon: "🟧", badge: "Opus 4.5" },
  { id: "deepseek",  label: "DeepSeek AI",            icon: "🟩", badge: "R2 Reasoning" },
  { id: "groq",      label: "Groq (Ultra Fast)",      icon: "🟪", badge: "Llama 4" },
  { id: "together",  label: "Together AI",            icon: "🟫", badge: "Llama 4" },
  { id: "mistral",   label: "Mistral AI",             icon: "🔵", badge: "Large Latest" },
  { id: "openrouter",label: "OpenRouter",             icon: "🌐", badge: "Multi-Model" },
  { id: "ollama",    label: "Ollama (Local)",         icon: "💻", badge: "Free Local" },
  { id: "lmstudio",  label: "LM Studio (Local)",      icon: "🖥️", badge: "Free Local" },
  { id: "azure",     label: "Azure OpenAI",           icon: "☁️", badge: "Enterprise" },
  { id: "bedrock",   label: "AWS Bedrock",            icon: "🔶", badge: "Enterprise" },
];

// ─── KEY_CONFIGS: label + placeholder ─────────────────────────────────────────
const KEY_CONFIGS = [
  { id: "gemini",     label: "Google Gemini API Key",        placeholder: "AIzaSy..." },
  { id: "openai",     label: "OpenAI API Key",               placeholder: "sk-proj-..." },
  { id: "claude",     label: "Anthropic Claude API Key",     placeholder: "sk-ant-..." },
  { id: "deepseek",   label: "DeepSeek API Key",             placeholder: "sk-..." },
  { id: "groq",       label: "Groq API Key",                 placeholder: "gsk_..." },
  { id: "together",   label: "Together AI API Key",          placeholder: "tg_..." },
  { id: "mistral",    label: "Mistral API Key",              placeholder: "ms_..." },
  { id: "openrouter", label: "OpenRouter API Key",           placeholder: "sk-or-v1-..." },
  { id: "azure",      label: "Azure OpenAI Key",             placeholder: "Azure API Secret" },
  { id: "bedrock",    label: "AWS Bedrock Key",              placeholder: "AWS Secret Access Key" },
];

// ─── Component ─────────────────────────────────────────────────────────────────
const Settings = () => {
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [defaultProvider, setDefaultProvider] = useState("gemini");
  const [defaultModel, setDefaultModel] = useState("gemini-2.0-flash");

  const [apiKeys, setApiKeys] = useState({
    openai: "", gemini: "", deepseek: "", openrouter: "", claude: "",
    groq: "", together: "", mistral: "", ollama: "", azure: "", bedrock: "",
  });

  const [integrations, setIntegrations] = useState({
    github: "", notion: "", google: "", gmail: "",
  });

  const [showKeys, setShowKeys] = useState({});

  // Validation state: { [provider]: { status: 'idle'|'loading'|'valid'|'invalid', message: '' } }
  const [validations, setValidations] = useState({});

  // ─── Load settings ───────────────────────────────────────────────────────────
  useEffect(() => {
    const loadSettings = async () => {
      try {
        setLoading(true);
        const response = await api.get("/api/settings");
        if (response.data) {
          const prov = response.data.defaultProvider || "gemini";
          setDefaultProvider(prov);
          setDefaultModel(
            response.data.defaultModel ||
            MODELS_PER_PROVIDER[prov]?.[0]?.id ||
            "gemini-2.0-flash"
          );
          setApiKeys({
            openai:      response.data.apiKeys?.openai      || "",
            gemini:      response.data.apiKeys?.gemini      || "",
            deepseek:    response.data.apiKeys?.deepseek    || "",
            openrouter:  response.data.apiKeys?.openrouter  || "",
            claude:      response.data.apiKeys?.claude      || "",
            groq:        response.data.apiKeys?.groq        || "",
            together:    response.data.apiKeys?.together    || "",
            mistral:     response.data.apiKeys?.mistral     || "",
            ollama:      response.data.apiKeys?.ollama      || "",
            azure:       response.data.apiKeys?.azure       || "",
            bedrock:     response.data.apiKeys?.bedrock     || "",
          });
          setIntegrations({
            github: response.data.integrations?.github || "",
            notion: response.data.integrations?.notion || "",
            google: response.data.integrations?.google || "",
            gmail:  response.data.integrations?.gmail  || "",
          });
        }
      } catch (err) {
        console.error("Failed to load settings:", err);
      } finally {
        setLoading(false);
      }
    };
    loadSettings();
  }, []);

  // ─── Handlers ────────────────────────────────────────────────────────────────
  const handleSave = async () => {
    try {
      setSaving(true);
      await api.put("/api/settings", {
        defaultProvider,
        defaultModel,
        apiKeys,
        integrations,
      });
      alert("✓ Settings committed to the secure memory vault successfully!");
    } catch (err) {
      console.error("Failed to save settings:", err);
      alert("✗ Failed to commit settings. Please try again.");
    } finally {
      setSaving(false);
    }
  };

  const handleProviderChange = (prov) => {
    setDefaultProvider(prov);
    setDefaultModel(MODELS_PER_PROVIDER[prov]?.[0]?.id || "");
  };

  const handleKeyChange = (provider, value) => {
    setApiKeys((prev) => ({ ...prev, [provider]: value }));
    // Reset validation when key changes
    setValidations((prev) => ({ ...prev, [provider]: { status: "idle", message: "" } }));
  };

  const toggleShowKey = (provider) =>
    setShowKeys((prev) => ({ ...prev, [provider]: !prev[provider] }));

  // ─── Live API Key Validation ──────────────────────────────────────────────────
  const validateKey = async (provider) => {
    const key = apiKeys[provider];
    if (!key?.trim() && provider !== "ollama" && provider !== "lmstudio") {
      setValidations((prev) => ({
        ...prev,
        [provider]: { status: "invalid", message: "✗ Please enter an API key first." },
      }));
      return;
    }

    setValidations((prev) => ({
      ...prev,
      [provider]: { status: "loading", message: "Testing connection..." },
    }));

    try {
      const response = await api.post("/api/validate", {
        provider,
        apiKey: key,
        model: defaultProvider === provider ? defaultModel : (MODELS_PER_PROVIDER[provider]?.[0]?.id || ""),
      });

      setValidations((prev) => ({
        ...prev,
        [provider]: {
          status: response.data.valid ? "valid" : "invalid",
          message: response.data.message,
        },
      }));
    } catch (err) {
      setValidations((prev) => ({
        ...prev,
        [provider]: { status: "invalid", message: "✗ Could not reach validation service." },
      }));
    }
  };

  const getValidationIcon = (provider) => {
    const v = validations[provider];
    if (!v || v.status === "idle") return null;
    if (v.status === "loading") return <Loader2 size={14} className="text-indigo-400 animate-spin" />;
    if (v.status === "valid") return <CheckCircle size={14} className="text-green-400" />;
    return <XCircle size={14} className="text-red-400" />;
  };

  const getValidationColor = (provider) => {
    const v = validations[provider];
    if (!v || v.status === "idle") return "border-slate-800";
    if (v.status === "loading") return "border-indigo-500/60";
    if (v.status === "valid") return "border-green-500/60";
    return "border-red-500/60";
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-slate-950 text-indigo-400">
        <div className="flex flex-col items-center gap-3">
          <span className="w-10 h-10 rounded-full border-4 border-indigo-600 border-t-transparent animate-spin" />
          <span className="text-sm font-semibold tracking-wider animate-pulse">DECRYPTING SECURITY CORE...</span>
        </div>
      </div>
    );
  }

  return (
    <div className="p-8 max-w-5xl mx-auto text-slate-100 space-y-8 select-none pb-16">

      {/* Header */}
      <div>
        <h1 className="text-4xl font-extrabold bg-gradient-to-r from-white to-slate-400 bg-clip-text text-transparent">
          Command Settings &amp; Keys
        </h1>
        <p className="mt-2 text-slate-400 text-sm">
          Configure LLM providers, select models, and validate API credentials in real-time.
        </p>
      </div>

      {/* ── Cognitive Core: Provider + Model ── */}
      <div className="bg-slate-900/60 backdrop-blur-md rounded-3xl border border-slate-800/80 p-8 shadow-lg">
        <div className="flex items-center gap-3 border-b border-slate-800 pb-5 mb-6">
          <Cpu className="text-indigo-400" size={22} />
          <h2 className="text-xl font-bold text-slate-200">AI Cognitive Core</h2>
          <span className="ml-auto text-[10px] bg-indigo-500/10 text-indigo-400 border border-indigo-500/20 px-2 py-1 rounded-full font-bold">
            2026 MODELS
          </span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Provider */}
          <div>
            <label className="text-xs text-slate-500 font-bold uppercase tracking-wider block mb-2">
              Default LLM Provider
            </label>
            <select
              value={defaultProvider}
              onChange={(e) => handleProviderChange(e.target.value)}
              className="w-full bg-slate-950 border border-slate-800 rounded-2xl p-4 text-sm text-slate-300 outline-none focus:border-indigo-500 transition cursor-pointer"
            >
              {PROVIDERS.map((p) => (
                <option key={p.id} value={p.id}>
                  {p.icon} {p.label} — {p.badge}
                </option>
              ))}
            </select>
          </div>

          {/* Model */}
          <div>
            <label className="text-xs text-slate-500 font-bold uppercase tracking-wider block mb-2">
              Cognitive Model
            </label>
            <select
              value={defaultModel}
              onChange={(e) => setDefaultModel(e.target.value)}
              className="w-full bg-slate-950 border border-slate-800 rounded-2xl p-4 text-sm text-slate-300 outline-none focus:border-indigo-500 transition cursor-pointer"
            >
              {(MODELS_PER_PROVIDER[defaultProvider] || []).map((m) => (
                <option key={m.id} value={m.id}>{m.name}</option>
              ))}
            </select>
            <p className="text-[10px] text-slate-600 mt-2">
              Model ID: <span className="text-slate-400 font-mono">{defaultModel}</span>
            </p>
          </div>
        </div>

        {/* Quick model reference grid */}
        <div className="mt-6 pt-6 border-t border-slate-800/60">
          <p className="text-xs text-slate-500 font-bold uppercase tracking-wider mb-3">2026 Featured Models</p>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-2">
            {[
              { name: "Gemini 2.5 Pro", id: "gemini-2.5-pro", prov: "gemini", tag: "Google" },
              { name: "GPT-4.1", id: "gpt-4.1", prov: "openai", tag: "OpenAI" },
              { name: "Claude Opus 4.5", id: "claude-opus-4-5", prov: "claude", tag: "Anthropic" },
              { name: "Llama 4 Scout", id: "llama-4-scout-17b-16e-instruct", prov: "groq", tag: "Groq Free" },
              { name: "DeepSeek R2", id: "deepseek-reasoner", prov: "deepseek", tag: "DeepSeek" },
              { name: "Mistral Large", id: "mistral-large-latest", prov: "mistral", tag: "Mistral" },
              { name: "Llama 4 Maverick", id: "meta-llama/Llama-4-Maverick-17B-128E-Instruct-FP8", prov: "together", tag: "Together" },
              { name: "Llama 4 Free", id: "meta-llama/llama-4-scout:free", prov: "openrouter", tag: "Free!" },
            ].map((m) => (
              <button
                key={m.id}
                onClick={() => { handleProviderChange(m.prov); setDefaultModel(m.id); }}
                className={`flex flex-col items-start p-3 rounded-xl border text-left transition cursor-pointer text-xs ${
                  defaultModel === m.id && defaultProvider === m.prov
                    ? "bg-indigo-600/20 border-indigo-500/60 text-indigo-300"
                    : "bg-slate-950/40 border-slate-800/60 text-slate-400 hover:border-slate-600 hover:text-slate-200"
                }`}
              >
                <span className="font-bold leading-tight">{m.name}</span>
                <span className="text-[9px] mt-1 opacity-60">{m.tag}</span>
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* ── API Credentials + Live Validation ── */}
      <div className="bg-slate-900/60 backdrop-blur-md rounded-3xl border border-slate-800/80 p-8 shadow-lg">
        <div className="flex items-center gap-3 border-b border-slate-800 pb-5 mb-6">
          <KeyRound className="text-indigo-400" size={22} />
          <h2 className="text-xl font-bold text-slate-200">Secure API Credentials</h2>
          <span className="ml-auto text-[10px] text-slate-500 font-medium">
            Click <span className="text-indigo-400 font-bold">Test</span> to validate each key live
          </span>
        </div>

        <div className="grid gap-5 md:grid-cols-2">
          {KEY_CONFIGS.map((keyItem) => {
            const v = validations[keyItem.id] || { status: "idle" };
            return (
              <div key={keyItem.id}>
                <div className="flex items-center justify-between mb-2">
                  <label className="text-xs text-slate-500 font-bold uppercase tracking-wider">
                    {keyItem.label}
                  </label>
                  {getValidationIcon(keyItem.id)}
                </div>

                <div className={`flex items-center bg-slate-950 border ${getValidationColor(keyItem.id)} rounded-2xl overflow-hidden transition`}>
                  <input
                    type={showKeys[keyItem.id] ? "text" : "password"}
                    value={apiKeys[keyItem.id] || ""}
                    onChange={(e) => handleKeyChange(keyItem.id, e.target.value)}
                    placeholder={keyItem.placeholder}
                    className="flex-1 py-3 pl-4 pr-2 text-xs text-slate-100 font-mono bg-transparent outline-none"
                  />
                  <button
                    type="button"
                    onClick={() => toggleShowKey(keyItem.id)}
                    className="px-3 text-slate-500 hover:text-slate-200 transition cursor-pointer"
                  >
                    {showKeys[keyItem.id] ? <EyeOff size={14} /> : <Eye size={14} />}
                  </button>
                  <button
                    type="button"
                    onClick={() => validateKey(keyItem.id)}
                    disabled={v.status === "loading"}
                    className="px-3 py-3 text-[10px] font-bold text-indigo-400 hover:text-white hover:bg-indigo-600 border-l border-slate-800 transition cursor-pointer disabled:opacity-50"
                  >
                    {v.status === "loading" ? <Loader2 size={12} className="animate-spin" /> : "Test"}
                  </button>
                </div>

                {/* Validation Message */}
                {v.message && (
                  <p className={`text-[10px] mt-1.5 font-medium px-1 ${
                    v.status === "valid" ? "text-green-400" :
                    v.status === "invalid" ? "text-red-400" : "text-indigo-400"
                  }`}>
                    {v.message}
                  </p>
                )}
              </div>
            );
          })}

          {/* Ollama local endpoint */}
          <div className="md:col-span-2 border-t border-slate-800/60 pt-5">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
              <div>
                <div className="flex items-center justify-between mb-2">
                  <label className="text-xs text-slate-500 font-bold uppercase tracking-wider">
                    Ollama Local Endpoint
                  </label>
                  <div className="flex items-center gap-2">
                    {getValidationIcon("ollama")}
                  </div>
                </div>
                <div className={`flex items-center bg-slate-950 border ${getValidationColor("ollama")} rounded-2xl overflow-hidden transition`}>
                  <input
                    type="text"
                    value={apiKeys.ollama || ""}
                    onChange={(e) => handleKeyChange("ollama", e.target.value)}
                    placeholder="http://localhost:11434"
                    className="flex-1 py-3 pl-4 pr-2 text-xs text-slate-100 font-mono bg-transparent outline-none"
                  />
                  <button
                    type="button"
                    onClick={() => validateKey("ollama")}
                    disabled={validations["ollama"]?.status === "loading"}
                    className="px-3 py-3 text-[10px] font-bold text-indigo-400 hover:text-white hover:bg-indigo-600 border-l border-slate-800 transition cursor-pointer disabled:opacity-50"
                  >
                    {validations["ollama"]?.status === "loading" ? <Loader2 size={12} className="animate-spin" /> : "Test"}
                  </button>
                </div>
                {validations["ollama"]?.message && (
                  <p className={`text-[10px] mt-1.5 font-medium px-1 ${
                    validations["ollama"]?.status === "valid" ? "text-green-400" : "text-red-400"
                  }`}>
                    {validations["ollama"]?.message}
                  </p>
                )}
              </div>
              <div className="self-center">
                <div className="bg-slate-950/50 border border-slate-800/40 rounded-2xl p-4 text-[11px] text-slate-500 leading-relaxed">
                  <p className="text-slate-400 font-bold mb-1">💻 Local Models (Free)</p>
                  <p>Ollama and LM Studio run locally — no API key needed. Just enter the endpoint URL and click Test to confirm they're running.</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* ── Plugin Integration Tokens ── */}
      <div className="bg-slate-900/60 backdrop-blur-md rounded-3xl border border-slate-800/80 p-8 shadow-lg">
        <div className="flex items-center gap-3 border-b border-slate-800 pb-5 mb-6">
          <Sparkles className="text-indigo-400" size={22} />
          <h2 className="text-xl font-bold text-slate-200">Plugin Integration Tokens</h2>
        </div>

        <div className="grid gap-5 md:grid-cols-2">
          {[
            { id: "github", label: "GitHub Integration Token", placeholder: "ghp_..." },
            { id: "notion", label: "Notion Integration Key", placeholder: "secret_..." },
            { id: "google", label: "Google Drive Client Secret", placeholder: "Google Client API Secret" },
            { id: "gmail",  label: "Gmail API Credentials", placeholder: "Gmail Token Credentials" },
          ].map((item) => (
            <div key={item.id}>
              <label className="text-xs text-slate-500 font-bold uppercase tracking-wider block mb-2">
                {item.label}
              </label>
              <input
                type="password"
                value={integrations[item.id] || ""}
                onChange={(e) => setIntegrations((prev) => ({ ...prev, [item.id]: e.target.value }))}
                placeholder={item.placeholder}
                className="w-full bg-slate-950 border border-slate-800 rounded-2xl py-3.5 px-5 text-xs text-slate-100 font-mono outline-none focus:border-indigo-500 transition"
              />
            </div>
          ))}
        </div>
      </div>

      {/* ── Save Button ── */}
      <div className="flex justify-end pt-2">
        <button
          onClick={handleSave}
          disabled={saving}
          className="bg-indigo-600 hover:bg-indigo-500 text-white px-8 py-4 rounded-2xl font-bold flex items-center gap-3 transition cursor-pointer shadow-lg shadow-indigo-600/20 disabled:opacity-50"
        >
          <Save size={18} />
          {saving ? "Encrypting and Saving..." : "Commit Settings"}
        </button>
      </div>
    </div>
  );
};

export default Settings;
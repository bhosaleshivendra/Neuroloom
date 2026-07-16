import {
  Plug,
  ShieldCheck,
  GitBranch,
  Database,
  Globe,
  Mail,
  NotebookText,
  Loader2,
} from "lucide-react";
import { useState } from "react";
import api from "../../src/utils/axios";

export default function Plugins({ workspace, updateWorkspace }) {
  const [loadingPluginId, setLoadingPluginId] = useState(null);

  const offerings = [
    {
      id: "github",
      title: "GitHub Core Integrator",
      description: "Connects repositories to active engineering Autobot workflows.",
      icon: GitBranch,
      accent: "from-slate-800 to-indigo-900/50",
    },
    {
      id: "drive",
      title: "Google Drive Storage Sync",
      description: "Index files directly from cloud vaults into AI memory banks.",
      icon: Globe,
      accent: "from-emerald-900/40 to-cyan-900/40",
    },
    {
      id: "notion",
      title: "Notion Knowledge base",
      description: "Directly sync design requirements, plans, and team tasks.",
      icon: NotebookText,
      accent: "from-amber-950/40 to-stone-900/40",
    },
    {
      id: "gmail",
      title: "Gmail Command Center",
      description: "Allow Autobots to monitor queries and reply autonomously.",
      icon: Mail,
      accent: "from-red-950/40 to-rose-950/20",
    },
  ];

  const handleTogglePlugin = async (pluginId) => {
    try {
      setLoadingPluginId(pluginId);
      const response = await api.put(`/api/workspaces/${workspace._id}/plugins`, {
        pluginId,
      });
      updateWorkspace(response.data);
    } catch (err) {
      console.error("Failed to toggle plugin state:", err);
      alert("Error writing integration update to database.");
    } finally {
      setLoadingPluginId(null);
    }
  };

  const activePlugins = workspace.plugins || [];

  return (
    <div className="p-8 text-slate-100 space-y-8">
      <div>
        <h1 className="text-4xl font-extrabold bg-gradient-to-r from-white to-slate-400 bg-clip-text text-transparent">
          Integrations Hub
        </h1>
        <p className="mt-2 text-slate-400 text-sm">
          Expand your workspace capabilities by connecting external developer and communication networks.
        </p>
      </div>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4 mt-10">
        {offerings.map((plugin) => {
          const Icon = plugin.icon;
          const isInstalled = activePlugins.includes(plugin.id);
          const isLoading = loadingPluginId === plugin.id;

          return (
            <div
              key={plugin.id}
              className="rounded-3xl border border-slate-800/80 bg-slate-900/60 backdrop-blur-md p-7 shadow-lg flex flex-col justify-between"
            >
              <div>
                <div
                  className={`inline-flex items-center justify-center rounded-2xl bg-gradient-to-br ${plugin.accent} p-4 text-indigo-400 border border-slate-800/80`}
                >
                  <Icon size={24} />
                </div>

                <h2 className="mt-6 text-xl font-bold text-slate-200">{plugin.title}</h2>
                <p className="mt-3 text-slate-400 text-xs leading-relaxed">{plugin.description}</p>
              </div>

              <button
                onClick={() => handleTogglePlugin(plugin.id)}
                disabled={isLoading}
                className={`
                  mt-8
                  w-full
                  inline-flex
                  items-center
                  justify-center
                  gap-2
                  rounded-xl
                  py-3
                  text-xs
                  font-bold
                  transition
                  cursor-pointer
                  border
                  ${
                    isInstalled
                      ? "bg-emerald-500/10 text-emerald-400 border-emerald-500/25 hover:bg-emerald-500/20"
                      : "bg-indigo-600 hover:bg-indigo-500 text-white border-transparent shadow-lg shadow-indigo-600/15"
                  }
                  disabled:opacity-50
                `}
              >
                {isLoading ? (
                  <Loader2 size={14} className="animate-spin" />
                ) : (
                  <Plug size={14} />
                )}
                {isInstalled ? "Active (Disconnect)" : "Connect Node"}
              </button>
            </div>
          );
        })}
      </div>

      <div className="mt-10 rounded-3xl border border-slate-800 bg-slate-950/40 p-8 shadow-md">
        <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <p className="text-[10px] uppercase tracking-[0.25em] text-slate-500 font-bold">Integration security suite</p>
            <h2 className="mt-2 text-2xl font-bold text-slate-200">Active and fully monitoring</h2>
          </div>

          <span className="inline-flex items-center gap-2 rounded-xl bg-emerald-500/10 px-4 py-2 text-xs font-semibold text-emerald-400 border border-emerald-500/20">
            <ShieldCheck size={16} /> Secure DB Encryption Core Active
          </span>
        </div>
      </div>
    </div>
  );
}

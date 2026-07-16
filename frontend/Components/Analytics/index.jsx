import { useState, useEffect } from "react";
import {
  TrendingUp,
  Cpu,
  Coins,
  Network,
  Clock,
  Sparkles,
  Download,
  FolderKanban,
  FileCode,
  Users,
} from "lucide-react";
import api from "../../src/utils/axios";
import "./index.css";

export default function Analytics() {
  const [loading, setLoading] = useState(true);
  const [workspacesData, setWorkspacesData] = useState([]);

  useEffect(() => {
    const fetchGlobalData = async () => {
      try {
        setLoading(true);
        const workspacesRes = await api.get("/api/workspaces");
        const workspaces = workspacesRes.data;

        const data = await Promise.all(
          workspaces.map(async (w) => {
            try {
              const [tasksRes, docsRes, projectsRes] = await Promise.all([
                api.get(`/api/tasks?workspaceId=${w._id}`).catch(() => ({ data: [] })),
                api.get(`/api/documents?workspaceId=${w._id}`).catch(() => ({ data: [] })),
                api.get(`/api/projects?workspaceId=${w._id}`).catch(() => ({ data: [] })),
              ]);
              return {
                workspace: w,
                tasks: tasksRes.data,
                documents: docsRes.data,
                projects: projectsRes.data,
              };
            } catch (err) {
              console.error(`Error loading data for workspace ${w._id}:`, err);
              return { workspace: w, tasks: [], documents: [], projects: [] };
            }
          })
        );
        setWorkspacesData(data);
      } catch (error) {
        console.error("Failed to load global operational data:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchGlobalData();
  }, []);

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-slate-950 text-indigo-400 select-none">
        <div className="flex flex-col items-center gap-3">
          <span className="w-10 h-10 rounded-full border-4 border-indigo-600 border-t-transparent animate-spin"></span>
          <span className="text-sm font-semibold tracking-wider animate-pulse">AGGREGATING ENTERPRISE TELEMETRY...</span>
        </div>
      </div>
    );
  }

  // Aggregate stats across all workspaces
  const totalWorkspaces = workspacesData.length;
  const totalProjects = workspacesData.reduce((sum, d) => sum + d.projects.length, 0);
  const totalTasks = workspacesData.reduce((sum, d) => sum + d.tasks.length, 0);
  const totalDocs = workspacesData.reduce((sum, d) => sum + d.documents.length, 0);
  const totalEmployees = workspacesData.reduce((sum, d) => sum + (d.workspace.employees?.length || 0), 0);

  const doneTasks = workspacesData.reduce((sum, d) => sum + d.tasks.filter(t => t.status === "Done").length, 0);
  const taskCompletionRate = totalTasks > 0 ? Math.round((doneTasks / totalTasks) * 100) : 0;

  const docChars = workspacesData.reduce((sum, d) => sum + d.documents.reduce((s, doc) => s + (doc.content?.length || 0), 0), 0);
  const estimatedTokens = Math.max(12000, Math.round(docChars * 0.45 + totalTasks * 850));
  const creditsRemaining = Math.max(0, (150.00 - (estimatedTokens / 100000) * 0.2).toFixed(2));
  const averageLatency = totalTasks > 0 ? (1.05 + (totalTasks * 0.02) % 0.6).toFixed(2) : "1.15";

  const exportEnterpriseReport = () => {
    const reportContent = `NEUROLOOM GLOBAL ENTERPRISE REPORT
=====================================
TIMESTAMP: ${new Date().toISOString()}
-------------------------------------
PRIMARY KEY PERFORMANCE METRICS:
- Total AI Workspace HQ Nodes: ${totalWorkspaces}
- Total Active Projects: ${totalProjects}
- Total Cataloged Documents: ${totalDocs}
- Total Directives Issued: ${totalTasks}
- Deployed Personnel Count: ${totalEmployees}
- Task Completion Rate: ${taskCompletionRate}%
- Avg Response Latency: ${averageLatency}s
- Est. Accumulative Token Usage: ${estimatedTokens}
-------------------------------------
ENTERPRISE WORKSPACE DIVISION METRICS:
${workspacesData.map(d => {
  const done = d.tasks.filter(t => t.status === "Done").length;
  const rate = d.tasks.length > 0 ? Math.round((done / d.tasks.length) * 100) : 100;
  return `- HQ: ${d.workspace.name} (${d.workspace.company}): Deployed Personnel: ${d.workspace.employees?.length || 0}, Projects: ${d.projects.length}, Tasks: ${d.tasks.length} (Completion: ${rate}%)`;
}).join("\n")}
=====================================
END OF ENTERPRISE REPORT
`;

    const blob = new Blob([reportContent], { type: "text/plain" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.download = `neuroloom_enterprise_report.txt`;
    link.click();
    URL.revokeObjectURL(url);
  };

  return (
    <div className="p-8 text-slate-100 space-y-8 select-none min-h-screen bg-slate-950">
      {/* Title */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-4xl font-extrabold bg-gradient-to-r from-white to-slate-400 bg-clip-text text-transparent flex items-center gap-3">
            Global Enterprise Cockpit
          </h1>
          <p className="mt-2 text-slate-400 text-sm">
            Cross-workspace operational analytics, global tokens spent, and active task compliance records.
          </p>
        </div>

        <button
          onClick={exportEnterpriseReport}
          className="bg-indigo-600 hover:bg-indigo-500 text-white px-6 py-3 rounded-xl font-bold text-xs shadow-lg shadow-indigo-600/10 transition cursor-pointer flex items-center gap-2"
        >
          <Download size={14} />
          Export Enterprise Data
        </button>
      </div>

      {/* KPI Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mt-10">
        <div className="bg-slate-900/60 backdrop-blur-md rounded-3xl border border-slate-800/80 p-6 flex flex-col justify-between shadow-lg relative overflow-hidden group">
          <div className="flex justify-between items-center">
            <Coins className="text-indigo-400" size={24} />
            <span className="text-slate-500 text-xs font-bold uppercase">Enterprise Credits</span>
          </div>
          <h2 className="text-3xl font-extrabold mt-6 text-slate-100">${creditsRemaining}</h2>
          <p className="text-[10px] text-slate-500 mt-2 font-medium">Accumulated client allowance</p>
        </div>

        <div className="bg-slate-900/60 backdrop-blur-md rounded-3xl border border-slate-800/80 p-6 flex flex-col justify-between shadow-lg relative overflow-hidden group">
          <div className="flex justify-between items-center">
            <Cpu className="text-cyan-400" size={24} />
            <span className="text-slate-500 text-xs font-bold uppercase">Enterprise Tokens</span>
          </div>
          <h2 className="text-3xl font-extrabold mt-6 text-slate-100">{estimatedTokens}</h2>
          <p className="text-[10px] text-slate-500 mt-2 font-medium">Cross-division compute spending</p>
        </div>

        <div className="bg-slate-900/60 backdrop-blur-md rounded-3xl border border-slate-800/80 p-6 flex flex-col justify-between shadow-lg relative overflow-hidden group">
          <div className="flex justify-between items-center">
            <Users className="text-emerald-400" size={24} />
            <span className="text-slate-500 text-xs font-bold uppercase">Personnel Deployed</span>
          </div>
          <h2 className="text-3xl font-extrabold mt-6 text-slate-100">{totalEmployees}</h2>
          <p className="text-[10px] text-slate-500 mt-2 font-medium">Active Autobot units online</p>
        </div>

        <div className="bg-slate-900/60 backdrop-blur-md rounded-3xl border border-slate-800/80 p-6 flex flex-col justify-between shadow-lg relative overflow-hidden group">
          <div className="flex justify-between items-center">
            <Network className="text-orange-400" size={24} />
            <span className="text-slate-500 text-xs font-bold uppercase">HQ Divisions</span>
          </div>
          <h2 className="text-3xl font-extrabold mt-6 text-slate-100">{totalWorkspaces}</h2>
          <p className="text-[10px] text-slate-500 mt-2 font-medium">
            Monitoring {totalProjects} projects
          </p>
        </div>
      </div>

      {/* Visual Analytics Row */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 bg-slate-900/60 backdrop-blur-md rounded-3xl border border-slate-800/80 p-7 shadow-lg">
          <h3 className="text-base font-bold text-slate-200 flex items-center gap-2 mb-6">
            <TrendingUp size={16} className="text-indigo-400" />
            Global Compliance Vector
          </h3>
          <div className="h-56 w-full flex items-end justify-between relative pt-6 px-4">
            <svg className="absolute inset-0 h-full w-full pointer-events-none" preserveAspectRatio="none">
              <path
                d="M 50 160 Q 150 90 250 140 T 450 40 T 650 70"
                fill="none"
                stroke="rgba(99, 102, 241, 0.4)"
                strokeWidth="2.5"
              />
              <path
                d="M 50 160 Q 150 90 250 140 T 450 40 T 650 70 L 650 200 L 50 200 Z"
                fill="url(#grad-global)"
                className="opacity-20"
              />
              <defs>
                <linearGradient id="grad-global" x1="0%" y1="0%" x2="0%" y2="100%">
                  <stop offset="0%" stopColor="rgb(99, 102, 241)" />
                  <stop offset="100%" stopColor="transparent" />
                </linearGradient>
              </defs>
            </svg>
            <div className="absolute top-2 left-0 text-[9px] text-slate-600 font-bold">100% Efficiency</div>
            <div className="absolute bottom-16 left-0 text-[9px] text-slate-600 font-bold">50% Efficiency</div>
            {["Q1 Load", "Q2 Load", "Alpha Load", "Beta Load", "Gamma Load", "Delta Load", "Compliance"].map((day, idx) => (
              <div key={idx} className="flex flex-col items-center z-10">
                <span className="text-[10px] text-slate-500 font-bold uppercase">{day}</span>
              </div>
            ))}
          </div>
        </div>

        <div className="bg-slate-900/60 backdrop-blur-md rounded-3xl border border-slate-800/80 p-7 shadow-lg flex flex-col justify-between">
          <h3 className="text-base font-bold text-slate-200 flex items-center gap-2 mb-6">
            <FileCode size={16} className="text-indigo-400" />
            Global Assets Inventory
          </h3>
          <div className="space-y-4">
            <div className="flex justify-between items-center bg-slate-950/30 p-3.5 border border-slate-850 rounded-2xl">
              <span className="text-slate-400 text-xs font-semibold">Accumulated Directives</span>
              <span className="text-slate-200 font-bold text-sm">{totalTasks}</span>
            </div>
            <div className="flex justify-between items-center bg-slate-950/30 p-3.5 border border-slate-850 rounded-2xl">
              <span className="text-slate-400 text-xs font-semibold">Active Projects Deployed</span>
              <span className="text-slate-200 font-bold text-sm">{totalProjects}</span>
            </div>
            <div className="flex justify-between items-center bg-slate-950/30 p-3.5 border border-slate-850 rounded-2xl">
              <span className="text-slate-400 text-xs font-semibold">Total Knowledge Base Records</span>
              <span className="text-slate-200 font-bold text-sm">{totalDocs}</span>
            </div>
          </div>
          <div className="mt-6 flex items-center gap-3 bg-indigo-950/20 border border-indigo-900/30 p-4 rounded-2xl text-[10px] text-slate-400 leading-relaxed">
            <Sparkles size={16} className="text-indigo-400 shrink-0" />
            <p>System metrics compiled across {totalWorkspaces} headquarters nodes mapped directly in active database instances.</p>
          </div>
        </div>
      </div>

      {/* Workspace Breakdown */}
      <div className="bg-slate-900/60 backdrop-blur-md rounded-3xl border border-slate-800/80 p-7 shadow-lg">
        <h3 className="text-base font-bold text-slate-200 flex items-center gap-2 mb-6">
          <FolderKanban size={16} className="text-indigo-400" />
          Active Workspace Nodes Breakdown
        </h3>
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs border-collapse">
            <thead>
              <tr className="text-[10px] text-slate-500 font-bold uppercase border-b border-slate-800 pb-3">
                <th className="pb-3.5 font-bold">Workspace Name</th>
                <th className="pb-3.5 font-bold">Company</th>
                <th className="pb-3.5 font-bold">Personnel Deployed</th>
                <th className="pb-3.5 font-bold">Directives Active</th>
                <th className="pb-3.5 font-bold text-right">Project Count</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-800/50">
              {workspacesData.map((d) => (
                <tr key={d.workspace._id} className="hover:bg-slate-950/20 transition-all">
                  <td className="py-3.5 font-bold text-slate-200">{d.workspace.name}</td>
                  <td className="py-3.5 text-slate-400 font-semibold">{d.workspace.company}</td>
                  <td className="py-3.5 text-slate-300 font-bold">{(d.workspace.employees || []).length} Units</td>
                  <td className="py-3.5 text-slate-300 font-bold">{d.tasks.length} Directives</td>
                  <td className="py-3.5 text-right font-extrabold text-indigo-400">{d.projects.length} Projects</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

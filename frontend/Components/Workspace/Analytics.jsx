import { useState } from "react";
import {
  BarChart3,
  TrendingUp,
  Cpu,
  Coins,
  Network,
  Clock,
  Sparkles,
  Download,
  AlertTriangle,
  FolderKanban,
  FileCode,
  Building,
} from "lucide-react";

export default function Analytics({ workspace, tasks, projects, documents }) {
  const employees = workspace?.employees || [];
  const activePlugins = workspace?.plugins || [];

  // Simulated metrics derived dynamically from actual project statistics
  const totalTasks = tasks.length;
  const doneTasks = tasks.filter(t => t.status === "Done").length;
  const inProgressTasks = tasks.filter(t => t.status === "In Progress").length;
  const taskCompletionRate = totalTasks > 0 ? Math.round((doneTasks / totalTasks) * 100) : 0;

  // Calculate dynamic token usage (approximate chars in documents & messages)
  const docChars = documents.reduce((sum, doc) => sum + (doc.content?.length || 0), 0);
  const estimatedTokens = Math.max(4500, Math.round(docChars * 0.45 + totalTasks * 850));
  const creditsRemaining = Math.max(0, (150.00 - (estimatedTokens / 100000) * 0.2).toFixed(2));
  
  const averageLatency = totalTasks > 0 ? (1.1 + (totalTasks * 0.05) % 0.8).toFixed(2) : "1.20";
  const estimatedCost = ((estimatedTokens / 100000) * 0.2).toFixed(4);

  // Group task counts per department for department stats
  const deptTaskStats = {};
  workspace.departments.forEach(dept => {
    deptTaskStats[dept] = { total: 0, completed: 0 };
  });
  tasks.forEach(t => {
    const emp = employees.find(e => e.id === t.assignedTo);
    const dept = emp ? emp.department : "General";
    if (!deptTaskStats[dept]) {
      deptTaskStats[dept] = { total: 0, completed: 0 };
    }
    deptTaskStats[dept].total += 1;
    if (t.status === "Done") deptTaskStats[dept].completed += 1;
  });

  const exportReport = () => {
    const reportContent = `NEUROLOOM EXECUTIVE OPERATIONS REPORT
=====================================
TIMESTAMP: ${new Date().toISOString()}
HQ ID: ${workspace._id}
HEADQUARTERS NAME: ${workspace.name}
COMPANY: ${workspace.company}
-------------------------------------
PRIMARY KEY PERFORMANCE METRICS:
- Credits Remaining: $${creditsRemaining}
- Cognitive Tokens Spent: ${estimatedTokens}
- Operation Directives Issued: ${totalTasks}
- Task Completion Rate: ${taskCompletionRate}%
- Avg Response Latency: ${averageLatency}s
- Est. Accumulative Cost: $${estimatedCost}
- Active Integrations: ${activePlugins.join(", ") || "None"}
-------------------------------------
PERSONNEL DIRECTORY & PRODUCTIVITY:
${employees.map(e => {
  const empTasks = tasks.filter(t => t.assignedTo === e.id);
  const done = empTasks.filter(t => t.status === "Done").length;
  const rate = empTasks.length > 0 ? Math.round((done / empTasks.length) * 100) : 100;
  return `- [${e.status}] ${e.name} (${e.role} - ${e.department}): Tasks Assigned: ${empTasks.length}, Completion: ${rate}%`;
}).join("\n")}
-------------------------------------
DOCUMENT RECORD VAULT INVENTORY:
${documents.map(d => `- [${d.type.toUpperCase()}] ${d.title} (Project Ref: ${d.project})`).join("\n")}
=====================================
END OF REPORT
`;

    const blob = new Blob([reportContent], { type: "text/plain" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.download = `${workspace.name.toLowerCase().replace(/\s+/g, "_")}_diagnostics_report.txt`;
    link.click();
    URL.revokeObjectURL(url);
  };

  return (
    <div className="p-8 text-slate-100 space-y-8 select-none min-h-screen">
      {/* Title */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-4xl font-extrabold bg-gradient-to-r from-white to-slate-400 bg-clip-text text-transparent flex items-center gap-3">
            Analytics Command Center
          </h1>
          <p className="mt-2 text-slate-400 text-sm">
            Overview of compute allocation, task completion rates, and active Autobot efficiency scores.
          </p>
        </div>

        <button
          onClick={exportReport}
          className="bg-indigo-600 hover:bg-indigo-500 text-white px-6 py-3 rounded-xl font-bold text-xs shadow-lg shadow-indigo-600/10 transition cursor-pointer flex items-center gap-2"
        >
          <Download size={14} />
          Export Diagnostics
        </button>
      </div>

      {/* KPI Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mt-10">
        <div className="bg-slate-900/60 backdrop-blur-md rounded-3xl border border-slate-800/80 p-6 flex flex-col justify-between shadow-lg relative overflow-hidden group">
          <div className="flex justify-between items-center">
            <Coins className="text-indigo-400" size={24} />
            <span className="text-slate-500 text-xs font-bold uppercase">Credits Remaining</span>
          </div>
          <h2 className="text-3xl font-extrabold mt-6 text-slate-100">${creditsRemaining}</h2>
          <p className="text-[10px] text-slate-500 mt-2 font-medium">Cognitive limit allocation</p>
        </div>

        <div className="bg-slate-900/60 backdrop-blur-md rounded-3xl border border-slate-800/80 p-6 flex flex-col justify-between shadow-lg relative overflow-hidden group">
          <div className="flex justify-between items-center">
            <Cpu className="text-cyan-400" size={24} />
            <span className="text-slate-500 text-xs font-bold uppercase">Tokens Consumed</span>
          </div>
          <h2 className="text-3xl font-extrabold mt-6 text-slate-100">{estimatedTokens}</h2>
          <p className="text-[10px] text-slate-500 mt-2 font-medium">Accumulated model cycles</p>
        </div>

        <div className="bg-slate-900/60 backdrop-blur-md rounded-3xl border border-slate-800/80 p-6 flex flex-col justify-between shadow-lg relative overflow-hidden group">
          <div className="flex justify-between items-center">
            <Clock className="text-emerald-400" size={24} />
            <span className="text-slate-500 text-xs font-bold uppercase">Avg AI Latency</span>
          </div>
          <h2 className="text-3xl font-extrabold mt-6 text-slate-100">{averageLatency}s</h2>
          <p className="text-[10px] text-slate-500 mt-2 font-medium">Average response telemetry</p>
        </div>

        <div className="bg-slate-900/60 backdrop-blur-md rounded-3xl border border-slate-800/80 p-6 flex flex-col justify-between shadow-lg relative overflow-hidden group">
          <div className="flex justify-between items-center">
            <Network className="text-orange-400" size={24} />
            <span className="text-slate-500 text-xs font-bold uppercase">Active Directives</span>
          </div>
          <h2 className="text-3xl font-extrabold mt-6 text-slate-100">{totalTasks}</h2>
          <p className="text-[10px] text-slate-500 mt-2 font-medium">
            {taskCompletionRate}% directive completion rate
          </p>
        </div>
      </div>

      {/* Visual Analytics Row */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* SVG Chart 1: Cycle Load */}
        <div className="lg:col-span-2 bg-slate-900/60 backdrop-blur-md rounded-3xl border border-slate-800/80 p-7 shadow-lg">
          <h3 className="text-base font-bold text-slate-200 flex items-center gap-2 mb-6">
            <TrendingUp size={16} className="text-indigo-400" />
            Operational Cycle Load
          </h3>
          <div className="h-56 w-full flex items-end justify-between relative pt-6 px-4">
            {/* SVG line overlay */}
            <svg className="absolute inset-0 h-full w-full pointer-events-none" preserveAspectRatio="none">
              <path
                d="M 50 140 Q 150 70 250 160 T 450 60 T 650 90"
                fill="none"
                stroke="rgba(99, 102, 241, 0.4)"
                strokeWidth="2.5"
              />
              <path
                d="M 50 140 Q 150 70 250 160 T 450 60 T 650 90 L 650 200 L 50 200 Z"
                fill="url(#grad)"
                className="opacity-20"
              />
              <defs>
                <linearGradient id="grad" x1="0%" y1="0%" x2="0%" y2="100%">
                  <stop offset="0%" stopColor="rgb(99, 102, 241)" />
                  <stop offset="100%" stopColor="transparent" />
                </linearGradient>
              </defs>
            </svg>

            {/* Grid label markers */}
            <div className="absolute top-2 left-0 text-[9px] text-slate-600 font-bold">100k Tokens</div>
            <div className="absolute bottom-16 left-0 text-[9px] text-slate-600 font-bold">50k Tokens</div>
            
            {/* Days marker row */}
            {["Alpha", "Beta", "Gamma", "Delta", "Epsilon", "Zeta", "Eta"].map((day, idx) => (
              <div key={idx} className="flex flex-col items-center z-10">
                <span className="text-[10px] text-slate-500 font-bold uppercase">{day}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Database & Vault stats */}
        <div className="bg-slate-900/60 backdrop-blur-md rounded-3xl border border-slate-800/80 p-7 shadow-lg flex flex-col justify-between">
          <h3 className="text-base font-bold text-slate-200 flex items-center gap-2 mb-6">
            <FileCode size={16} className="text-indigo-400" />
            Vault Assets Cataloged
          </h3>

          <div className="space-y-4">
            <div className="flex justify-between items-center bg-slate-950/30 p-3.5 border border-slate-850 rounded-2xl">
              <span className="text-slate-400 text-xs font-semibold">Active Project Workspaces</span>
              <span className="text-slate-200 font-bold text-sm">{projects.length}</span>
            </div>

            <div className="flex justify-between items-center bg-slate-950/30 p-3.5 border border-slate-850 rounded-2xl">
              <span className="text-slate-400 text-xs font-semibold">Total Cataloged Documents</span>
              <span className="text-slate-200 font-bold text-sm">{documents.length}</span>
            </div>

            <div className="flex justify-between items-center bg-slate-950/30 p-3.5 border border-slate-850 rounded-2xl">
              <span className="text-slate-400 text-xs font-semibold">Connected Integration Nodes</span>
              <span className="text-slate-200 font-bold text-sm">{activePlugins.length}</span>
            </div>
          </div>

          <div className="mt-6 flex items-center gap-3 bg-indigo-950/20 border border-indigo-900/30 p-4 rounded-2xl text-[10px] text-slate-400 leading-relaxed">
            <Sparkles size={16} className="text-indigo-400 shrink-0" />
            <p>Vault records are automatically indexed into RAG memory caches for immediate assistant context retrieval.</p>
          </div>
        </div>
      </div>

      {/* Personnel Productivity Table */}
      <div className="bg-slate-900/60 backdrop-blur-md rounded-3xl border border-slate-800/80 p-7 shadow-lg">
        <h3 className="text-base font-bold text-slate-200 flex items-center gap-2 mb-6">
          <Cpu size={16} className="text-indigo-400" />
          Autobot Unit Productivity metrics
        </h3>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs border-collapse">
            <thead>
              <tr className="text-[10px] text-slate-500 font-bold uppercase border-b border-slate-800 pb-3">
                <th className="pb-3.5 font-bold">Autobot Node</th>
                <th className="pb-3.5 font-bold">Assigned Department</th>
                <th className="pb-3.5 font-bold">Task Count</th>
                <th className="pb-3.5 font-bold">Status Matrix</th>
                <th className="pb-3.5 font-bold text-right">Productivity Score</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-800/50">
              {employees.map((emp) => {
                const empTasks = tasks.filter((t) => t.assignedTo === emp.id);
                const empDone = empTasks.filter((t) => t.status === "Done").length;
                const progressPercentage = empTasks.length > 0 ? Math.round((empDone / empTasks.length) * 100) : 100;
                
                return (
                  <tr key={emp.id} className="hover:bg-slate-950/20 transition-all">
                    <td className="py-3.5 font-bold text-slate-200">{emp.name}</td>
                    <td className="py-3.5 text-slate-400 font-semibold">{emp.department}</td>
                    <td className="py-3.5 text-slate-300 font-bold">{empTasks.length}</td>
                    <td className="py-3.5">
                      <span className={`px-2.5 py-0.5 rounded-full text-[9px] font-bold border ${
                        emp.status === "WORKING"
                          ? "bg-amber-500/10 text-amber-400 border-amber-500/20 animate-pulse"
                          : emp.status === "THINKING"
                          ? "bg-indigo-500/10 text-indigo-400 border-indigo-500/20 animate-pulse"
                          : "bg-green-500/10 text-green-400 border-green-500/20"
                      }`}>
                        {emp.status || "ONLINE"}
                      </span>
                    </td>
                    <td className="py-3.5 text-right font-extrabold text-indigo-400">{progressPercentage}%</td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
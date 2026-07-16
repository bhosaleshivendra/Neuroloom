import {
  Users,
  CheckSquare,
  Building2,
  BrainCircuit,
  FolderKanban,
  FileCode,
  Activity,
} from "lucide-react";

export default function Overview({ workspace, activeProject }) {
  const isProjectActive = !!activeProject;

  return (
    <div className="p-8 text-slate-100 space-y-8 select-none min-h-screen">
      {/* Heading */}
      <div>
        <h1 className="text-4xl font-extrabold bg-gradient-to-r from-white to-slate-400 bg-clip-text text-transparent flex items-center gap-3">
          {isProjectActive ? "Project Command" : "HQ Overview"}
        </h1>
        <p className="mt-2 text-slate-400 text-sm">
          {isProjectActive 
            ? `Telemetry dashboard for project "${activeProject.name}"` 
            : `Telemetry dashboard for workspace "${workspace.name}"`}
        </p>
      </div>

      {/* Statistics Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mt-10">
        {/* Employees */}
        <div className="bg-slate-900/60 backdrop-blur-md rounded-3xl border border-slate-800/80 p-6 flex flex-col justify-between shadow-lg relative overflow-hidden group">
          <div className="flex justify-between items-center">
            <Users size={24} className="text-indigo-400" />
            <span className="text-slate-500 text-xs font-bold uppercase">Personnel Deployed</span>
          </div>
          <h2 className="mt-6 text-4xl font-extrabold text-slate-100">
            {workspace.employees?.length || 0}
          </h2>
          <p className="text-[10px] text-slate-500 mt-2 font-medium">Autobots active in this HQ</p>
        </div>

        {/* Tasks */}
        <div className="bg-slate-900/60 backdrop-blur-md rounded-3xl border border-slate-800/80 p-6 flex flex-col justify-between shadow-lg relative overflow-hidden group">
          <div className="flex justify-between items-center">
            <CheckSquare size={24} className="text-emerald-400" />
            <span className="text-slate-500 text-xs font-bold uppercase">
              {isProjectActive ? "Project Directives" : "Active Directives"}
            </span>
          </div>
          <h2 className="mt-6 text-4xl font-extrabold text-slate-100">
            {workspace.tasks?.length || 0}
          </h2>
          <p className="text-[10px] text-slate-500 mt-2 font-medium">Tasks allocated in memory vault</p>
        </div>

        {/* Departments or Project Status */}
        {!isProjectActive ? (
          <div className="bg-slate-900/60 backdrop-blur-md rounded-3xl border border-slate-800/80 p-6 flex flex-col justify-between shadow-lg relative overflow-hidden group">
            <div className="flex justify-between items-center">
              <Building2 size={24} className="text-orange-400" />
              <span className="text-slate-500 text-xs font-bold uppercase">Divisions</span>
            </div>
            <h2 className="mt-6 text-4xl font-extrabold text-slate-100">
              {workspace.departments?.length || 0}
            </h2>
            <p className="text-[10px] text-slate-500 mt-2 font-medium">Configured operational sectors</p>
          </div>
        ) : (
          <div className="bg-slate-900/60 backdrop-blur-md rounded-3xl border border-slate-800/80 p-6 flex flex-col justify-between shadow-lg relative overflow-hidden group">
            <div className="flex justify-between items-center">
              <FolderKanban size={24} className="text-orange-400" />
              <span className="text-slate-500 text-xs font-bold uppercase">Project Status</span>
            </div>
            <h2 className="mt-6 text-2xl font-bold text-indigo-400">
              {activeProject.status}
            </h2>
            <p className="text-[10px] text-slate-500 mt-2 font-medium">Current completion matrix phase</p>
          </div>
        )}

        {/* Prime or Project Progress */}
        {!isProjectActive ? (
          <div className="bg-slate-900/60 backdrop-blur-md rounded-3xl border border-slate-800/80 p-6 flex flex-col justify-between shadow-lg relative overflow-hidden group">
            <div className="flex justify-between items-center">
              <BrainCircuit size={24} className="text-cyan-400" />
              <span className="text-slate-500 text-xs font-bold uppercase">System Leader</span>
            </div>
            <h2 className="mt-6 text-xl font-bold text-green-400 flex items-center gap-2">
              <span className="w-2.5 h-2.5 rounded-full bg-green-500 animate-pulse" />
              ONLINE
            </h2>
            <p className="text-[10px] text-slate-500 mt-3.5 font-medium">Optimus Prime link active</p>
          </div>
        ) : (
          <div className="bg-slate-900/60 backdrop-blur-md rounded-3xl border border-slate-800/80 p-6 flex flex-col justify-between shadow-lg relative overflow-hidden group">
            <div className="flex justify-between items-center">
              <Activity size={24} className="text-cyan-400" />
              <span className="text-slate-500 text-xs font-bold uppercase">Project Progress</span>
            </div>
            <h2 className="mt-6 text-3xl font-extrabold text-slate-100">
              {activeProject.progress}%
            </h2>
            <div className="w-full bg-slate-950 rounded-full h-2 mt-2.5 border border-slate-800 overflow-hidden">
              <div className="bg-indigo-600 h-full rounded-full" style={{ width: `${activeProject.progress}%` }} />
            </div>
          </div>
        )}
      </div>

      {/* Workspace Information */}
      <div className="bg-slate-900/60 backdrop-blur-md rounded-3xl border border-slate-800/80 p-8 shadow-lg">
        <h2 className="text-lg font-bold text-slate-200 border-b border-slate-800 pb-4 mb-6 flex items-center gap-2">
          <Activity size={18} className="text-indigo-400" />
          {isProjectActive ? "Project Configuration Specs" : "HQ Configuration Specs"}
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 text-sm">
          <div className="bg-slate-950/40 p-4 border border-slate-850 rounded-2xl">
            <p className="text-slate-500 text-xs font-bold uppercase tracking-wider">
              {isProjectActive ? "Project Name" : "Workspace Name"}
            </p>
            <h3 className="mt-2 text-base font-bold text-slate-200">
              {isProjectActive ? activeProject.name : workspace.name}
            </h3>
          </div>

          <div className="bg-slate-950/40 p-4 border border-slate-850 rounded-2xl">
            <p className="text-slate-500 text-xs font-bold uppercase tracking-wider">Company</p>
            <h3 className="mt-2 text-base font-bold text-slate-200">
              {workspace.company}
            </h3>
          </div>

          <div className="bg-slate-950/40 p-4 border border-slate-850 rounded-2xl">
            <p className="text-slate-500 text-xs font-bold uppercase tracking-wider">
              {isProjectActive ? "Project Description" : "Total Projects"}
            </p>
            <h3 className="mt-2 text-base font-bold text-slate-200 truncate">
              {isProjectActive ? (activeProject.description || "No description provided.") : (workspace.projects?.length || 0)}
            </h3>
          </div>

          <div className="bg-slate-950/40 p-4 border border-slate-850 rounded-2xl">
            <p className="text-slate-500 text-xs font-bold uppercase tracking-wider">
              {isProjectActive ? "Associated Files" : "Total Documents Indexed"}
            </p>
            <h3 className="mt-2 text-base font-bold text-slate-200">
              {isProjectActive ? workspace.documents?.length || 0 : workspace.documents?.length || 0}
            </h3>
          </div>
        </div>
      </div>
    </div>
  );
}
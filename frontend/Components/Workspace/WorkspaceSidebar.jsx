import { useState } from "react";
import { useNavigate } from "react-router-dom";

import {
  ChevronLeft,
  ChevronRight,
  LayoutDashboard,
  Users,
  CheckSquare,
  Building2,
  BarChart3,
  Settings,
  ArrowLeft,
  FolderKanban,
  Network,
  FileText,
  Plug,
} from "lucide-react";

export default function WorkspaceSidebar({
  activeTab,
  setActiveTab,
  projects = [],
  activeProjectId,
  setActiveProjectId,
}) {

  const navigate = useNavigate();

  const [collapsed, setCollapsed] = useState(false);

  const tabs = [
    {
      id: "overview",
      label: "Overview",
      icon: LayoutDashboard,
    },
    {
      id: "projects",
      label: "Projects",
      icon: FolderKanban,
    },
    {
      id: "employees",
      label: "Employees",
      icon: Users,
    },
    {
      id: "tasks",
      label: "Tasks",
      icon: CheckSquare,
    },
    {
      id: "workflow",
      label: "Workflow",
      icon: Network,
    },
    {
      id: "documents",
      label: "Documents",
      icon: FileText,
    },
    {
      id: "departments",
      label: "Departments",
      icon: Building2,
    },
    {
      id: "analytics",
      label: "Analytics",
      icon: BarChart3,
    },
    {
      id: "plugins",
      label: "Plugins",
      icon: Plug,
    },
    {
      id: "settings",
      label: "Settings",
      icon: Settings,
    },
  ];

  return (

    <aside
      className={`
        bg-slate-950
        border-r
        border-slate-900/80
        transition-all
        duration-300
        flex
        flex-col
        h-full
        text-slate-100
        select-none
        ${
          collapsed
            ? "w-20"
            : "w-64"
        }
      `}
    >

      {/* Header */}

      <div className="p-5 border-b border-slate-900/60">

        <button
          onClick={() => navigate("/projects")}
          className="
            flex
            items-center
            gap-3
            text-slate-400
            hover:text-indigo-400
            transition
            cursor-pointer
            text-xs
            font-semibold
          "
        >

          <ArrowLeft size={16} />

          {!collapsed && (
            <span>
              All Workspaces
            </span>
          )}

        </button>

      </div>

      {/* Project Context Selector dropdown */}
      {!collapsed && (
        <div className="px-5 py-4 border-b border-slate-900/60">
          <label className="text-[9px] text-slate-500 font-bold uppercase tracking-wider block mb-1.5">Project Context</label>
          <div className="relative flex items-center">
            <select
              value={activeProjectId || ""}
              onChange={(e) => setActiveProjectId(e.target.value || null)}
              className="w-full bg-slate-900/60 border border-slate-800/80 rounded-xl py-2 px-3 text-[11px] text-slate-200 outline-none focus:border-indigo-500 transition cursor-pointer appearance-none font-semibold pr-8"
            >
              <option value="">All HQ Projects</option>
              {projects.map((p) => (
                <option key={p._id || p.id} value={p._id || p.id}>
                  {p.name}
                </option>
              ))}
            </select>
            <div className="absolute right-3 pointer-events-none text-[8px] text-slate-500">
              ▼
            </div>
          </div>
        </div>
      )}

      {/* Navigation */}

      <div className="flex-1 py-4 space-y-0.5 overflow-y-auto">

        {tabs.map((tab) => {

          const Icon = tab.icon;

          return (

            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`
                w-full
                flex
                items-center
                gap-4
                px-5
                py-3.5
                transition
                cursor-pointer
                text-xs
                font-semibold
                border-r-4
                ${
                  activeTab === tab.id
                    ? "bg-indigo-600/10 text-indigo-400 border-indigo-500"
                    : "text-slate-400 hover:text-slate-200 hover:bg-slate-900/40 border-transparent"
                }
              `}
            >

              <Icon size={18} />

              {!collapsed && (
                <span>
                  {tab.label}
                </span>
              )}

            </button>

          );

        })}

      </div>

      {/* Collapse */}

      <div className="border-t border-slate-900/80 p-4">

        <button
          onClick={() =>
            setCollapsed(!collapsed)
          }
          className="
            w-full
            flex
            items-center
            justify-center
            gap-2
            py-3
            rounded-xl
            hover:bg-slate-900/40
            text-slate-400
            hover:text-slate-200
            transition
            cursor-pointer
            text-xs
            font-semibold
          "
        >

          {collapsed ? (
            <ChevronRight size={16} />
          ) : (
            <>
              <ChevronLeft size={16} />

              <span>
                Collapse Panel
              </span>
            </>
          )}

        </button>

      </div>

    </aside>

  );

}
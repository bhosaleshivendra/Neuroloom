import { NavLink } from "react-router-dom";
import { useState } from "react";
import { useAuth } from "../../src/context/AuthContext.jsx";
import {
  House,
  FolderKanban,
  BarChart3,
  Settings,
  BrainCircuit,
  PanelLeftClose,
  PanelLeftOpen,
  LogOut,
} from "lucide-react";

import "./index.css";

export default function Sidebar() {
  const [collapsed, setCollapsed] = useState(false);
  const { logout, user } = useAuth();

  const links = [
    {
      name: "Home HQ",
      path: "/",
      icon: House,
    },
    {
      name: "Projects Hub",
      path: "/projects",
      icon: FolderKanban,
    },
    {
      name: "Analytics Core",
      path: "/analytics",
      icon: BarChart3,
    },
    {
      name: "Settings & Keys",
      path: "/settings",
      icon: Settings,
    },
  ];

  return (
    <aside
      className={`h-screen bg-slate-950 text-slate-100 flex flex-col shrink-0 transition-all duration-300 border-r border-slate-900/80 select-none z-50 ${
        collapsed ? "w-20" : "w-72"
      }`}
    >
      {/* Platform Branding Logo */}
      <div
        className={`border-b border-slate-900/60 flex items-center ${
          collapsed ? "justify-center py-6" : "justify-between px-6 py-6"
        }`}
      >
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-indigo-600/10 border border-indigo-500/30 flex items-center justify-center text-indigo-400">
            <BrainCircuit size={20} className="animate-pulse" />
          </div>
          {!collapsed && (
            <div>
              <h1 className="text-base font-extrabold tracking-tight bg-gradient-to-r from-white to-slate-400 bg-clip-text text-transparent leading-tight">
                NEUROLOOM
              </h1>
              <p className="text-[10px] text-slate-500 font-medium">
                AI OPERATING SYSTEM
              </p>
            </div>
          )}
        </div>

        {!collapsed && (
          <button
            onClick={() => setCollapsed(true)}
            className="p-1 rounded-lg text-slate-500 hover:text-slate-200 hover:bg-slate-900 transition cursor-pointer"
          >
            <PanelLeftClose size={18} />
          </button>
        )}
      </div>

      {/* Primary Links Section */}
      <nav className="flex-1 px-3 py-6 space-y-1">
        {links.map((item) => {
          const Icon = item.icon;
          return (
            <NavLink
              key={item.path}
              to={item.path}
              end={item.path === "/"}
              className={({ isActive }) =>
                `flex items-center rounded-xl transition-all duration-200 text-xs font-semibold relative group ${
                  collapsed ? "justify-center py-3.5" : "gap-4 px-4 py-3.5"
                } ${
                  isActive
                    ? "bg-indigo-600 text-white shadow-lg shadow-indigo-600/15"
                    : "text-slate-400 hover:text-slate-200 hover:bg-slate-900/40"
                }`
              }
            >
              <Icon size={18} />
              {!collapsed && <span>{item.name}</span>}

              {/* Collapsed Tooltip */}
              {collapsed && (
                <div className="absolute left-20 bg-slate-900 border border-slate-800 text-slate-200 px-3 py-2 rounded-xl text-[10px] whitespace-nowrap opacity-0 invisible group-hover:opacity-100 group-hover:visible transition duration-200 shadow-xl z-50">
                  {item.name}
                </div>
              )}
            </NavLink>
          );
        })}
      </nav>

      {/* Footer Branding Info */}
      <div className="border-t border-slate-900/80 p-4">
        {collapsed ? (
          <button
            onClick={() => setCollapsed(false)}
            className="w-full flex justify-center text-slate-500 hover:text-slate-200 py-2 hover:bg-slate-900 rounded-xl transition cursor-pointer"
          >
            <PanelLeftOpen size={18} />
          </button>
        ) : (
          <div className="bg-slate-900/20 border border-slate-900/60 rounded-2xl p-4 flex flex-col gap-2">
            <div className="flex items-center justify-between">
              <span className="text-[10px] text-slate-500">SYSTEM CORE</span>
              <span className="text-[9px] bg-indigo-500/10 text-indigo-400 border border-indigo-500/10 px-2 py-0.5 rounded-full font-bold">
                V1.0
              </span>
            </div>
            <div className="text-xs font-bold text-slate-400 mt-1 truncate">
              {user ? `CEO: ${user.username}` : "Command Node"}
            </div>
          </div>
        )}
      </div>
    </aside>
  );
}
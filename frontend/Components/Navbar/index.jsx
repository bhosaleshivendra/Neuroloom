import { NavLink } from "react-router-dom";
import { useState } from "react";

import {
  House,
  FolderKanban,
  BarChart3,
  Settings,
  BrainCircuit,
  PanelLeftClose,
  PanelLeftOpen,
} from "lucide-react";

import "./index.css";

export default function Sidebar() {

  const [collapsed, setCollapsed] = useState(false);

  const links = [
    {
      name: "Home",
      path: "/",
      icon: House,
    },
    {
      name: "Projects",
      path: "/projects",
      icon: FolderKanban,
    },
    {
      name: "Analytics",
      path: "/analytics",
      icon: BarChart3,
    },
    {
      name: "Settings",
      path: "/settings",
      icon: Settings,
    },
  ];

  return (

    <aside
      className={`
        h-screen
        bg-slate-900
        text-white
        flex
        flex-col
        shrink-0
        transition-all
        duration-300

        ${collapsed ? "w-20" : "w-72"}
      `}
    >

      {/* Logo */}

      <div
        className={`
          border-b
          border-slate-800
          flex
          items-center

          ${collapsed ? "justify-center py-6" : "justify-between px-6 py-6"}
        `}
      >

        <div className="flex items-center gap-3">

          <div
            className="
              w-12
              h-12
              rounded-2xl
              bg-indigo-600
              flex
              items-center
              justify-center
            "
          >

            <BrainCircuit size={24} />

          </div>

          {!collapsed && (

            <div>

              <h1 className="text-2xl font-bold">
                Neuroloom
              </h1>

              <p className="text-sm text-slate-400">
                AI ERP Platform
              </p>

            </div>

          )}

        </div>

        {!collapsed && (

          <button
            onClick={() => setCollapsed(true)}
            className="text-slate-400 hover:text-white"
          >

            <PanelLeftClose size={22} />

          </button>

        )}

      </div>

      {/* Navigation */}

      <nav className="flex-1 px-3 py-6 space-y-2">

        {links.map((item) => {

          const Icon = item.icon;

          return (

            <NavLink
              key={item.path}
              to={item.path}
              end={item.path === "/"}
              className={({ isActive }) =>
                `
                flex
                items-center
                rounded-2xl
                transition

                ${
                  collapsed
                    ? "justify-center py-4"
                    : "gap-4 px-5 py-4"
                }

                ${
                  isActive
                    ? "bg-indigo-600"
                    : "hover:bg-slate-800"
                }
              `
              }
            >

              <Icon size={22} />

              {!collapsed && (
                <span>{item.name}</span>
              )}

            </NavLink>

          );

        })}

      </nav>

      {/* Footer */}

      <div className="border-t border-slate-800 p-4">

        {collapsed ? (

          <button
            onClick={() => setCollapsed(false)}
            className="
              w-full
              flex
              justify-center
              text-slate-400
              hover:text-white
            "
          >

            <PanelLeftOpen size={22} />

          </button>

        ) : (

          <div
            className="
              bg-slate-800
              rounded-2xl
              p-4
            "
          >

            <p className="text-sm text-slate-400">
              Workspace Version
            </p>

            <h2 className="font-semibold mt-1">
              v1.0.0
            </h2>

          </div>

        )}

      </div>

    </aside>

  );

}
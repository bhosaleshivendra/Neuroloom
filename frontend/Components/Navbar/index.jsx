import { NavLink } from "react-router-dom";

import {
  House,
  FolderKanban,
  BarChart3,
  Settings,
  BrainCircuit,
} from "lucide-react";

import "./index.css";

export default function Sidebar() {
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
      className="
        w-72
        h-screen
        bg-slate-900
        text-white
        flex
        flex-col
        shrink-0
      "
    >
      {/* Logo */}

      <div className="px-8 py-8 border-b border-slate-800">

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
            <BrainCircuit size={26} />
          </div>

          <div>

            <h1 className="text-2xl font-bold">
              Neuroloom
            </h1>

            <p className="text-sm text-slate-400">
              AI ERP Platform
            </p>

          </div>

        </div>

      </div>

      {/* Navigation */}

      <nav className="flex-1 px-5 py-6 space-y-2">

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
                gap-4
                px-5
                py-4
                rounded-2xl
                transition
                font-medium

                ${
                  isActive
                    ? "bg-indigo-600 text-white"
                    : "text-slate-300 hover:bg-slate-800 hover:text-white"
                }
              `
              }
            >
              <Icon size={22} />

              <span>{item.name}</span>

            </NavLink>

          );
        })}

      </nav>

      {/* Footer */}

      <div className="p-6 border-t border-slate-800">

        <div
          className="
            rounded-2xl
            bg-slate-800
            p-4
          "
        >

          <p className="text-sm text-slate-400">
            Workspace Version
          </p>

          <h2 className="mt-1 font-semibold">
            v1.0.0
          </h2>

        </div>

      </div>

    </aside>
  );
}
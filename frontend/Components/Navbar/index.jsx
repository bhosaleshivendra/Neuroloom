import "./index.css";
import { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import {
  Menu,
  Home,
  Settings,
  IdCardLanyard,
  BriefcaseBusiness,
  ChartNoAxesCombined,
} from "lucide-react";

const Sidebar = () => {
  const [isOpen, setIsOpen] = useState(true);
  const location = useLocation();

  const menuItems = [
    {
      title: "Home",
      icon: <Home size={20} />,
      path: "/",
    },
    {
      title: "Employees",
      icon: <IdCardLanyard size={20} />,
      path: "/employees",
    },
    {
      title: "Projects",
      icon: <BriefcaseBusiness size={20} />,
      path: "/projects",
    },
    {
      title: "Analytics",
      icon: <ChartNoAxesCombined size={20} />,
      path: "/analytics",
    },
    {
      title: "Settings",
      icon: <Settings size={20} />,
      path: "/settings",
    },
  ];

  return (
    <aside
      className={`bg-white border-r border-slate-200 h-screen flex flex-col transition-all duration-300 ${
        isOpen ? "w-64" : "w-20"
      }`}
    >
      {/* Header */}

      <div
        className={`flex items-center ${
          isOpen ? "justify-between" : "justify-center"
        } px-5 py-5 border-b border-slate-200`}
      >
        {isOpen && (
          <Link
            to="/"
            className="text-2xl font-bold tracking-tight text-slate-900"
          >
            Neuro<span className="text-indigo-600">Loom</span>
          </Link>
        )}

        <button
          onClick={() => setIsOpen(!isOpen)}
          className="p-2 rounded-lg hover:bg-slate-100 transition cursor-pointer"
        >
          <Menu
            size={20}
            className="text-slate-600"
          />
        </button>
      </div>

      {/* Navigation */}

      <nav className="flex-1 px-3 py-5 space-y-2">
        {menuItems.map((item) => {
          const active = location.pathname === item.path;

          return (
            <Link
              key={item.title}
              to={item.path}
              className={`flex items-center gap-4 px-4 py-3 rounded-xl transition-all duration-200

              ${
                active
                  ? "bg-indigo-50 text-indigo-700 font-semibold"
                  : "text-slate-600 hover:bg-slate-100 hover:text-slate-900"
              }`}
            >
              {item.icon}

              {isOpen && (
                <span className="text-[15px]">
                  {item.title}
                </span>
              )}
            </Link>
          );
        })}
      </nav>

      {/* Footer */}

      {isOpen && (
        <div className="p-4 border-t border-slate-200">
          <div className="rounded-xl bg-slate-50 p-4">
            <p className="text-sm font-semibold text-slate-800">
              Neuroloom ERP
            </p>

            <p className="mt-1 text-xs text-slate-500 leading-5">
              AI-powered business management platform.
            </p>
          </div>
        </div>
      )}
    </aside>
  );
};

export default Sidebar;
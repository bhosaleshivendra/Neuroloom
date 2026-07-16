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
} from "lucide-react";

export default function WorkspaceSidebar({
  activeTab,
  setActiveTab,
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
      id: "settings",
      label: "Settings",
      icon: Settings,
    },
  ];

  return (

    <aside
      className={`
        bg-white
        border-r
        border-slate-200
        transition-all
        duration-300
        flex
        flex-col
        ${
          collapsed
            ? "w-20"
            : "w-64"
        }
      `}
    >

      {/* Header */}

      <div className="p-5 border-b">

        <button
          onClick={() => navigate("/projects")}
          className="
            flex
            items-center
            gap-3
            text-slate-600
            hover:text-indigo-600
            transition
            cursor-pointer
          "
        >

          <ArrowLeft size={20} />

          {!collapsed && (
            <span className="font-medium">
              Back to Projects
            </span>
          )}

        </button>

      </div>

      {/* Navigation */}

      <div className="flex-1 py-4">

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
                py-4
                transition
                cursor-pointer

                ${
                  activeTab === tab.id
                    ? "bg-indigo-50 text-indigo-600 border-r-4 border-indigo-600"
                    : "text-slate-600 hover:bg-slate-100"
                }
              `}
            >

              <Icon size={20} />

              {!collapsed && (
                <span className="font-medium">
                  {tab.label}
                </span>
              )}

            </button>

          );

        })}

      </div>

      {/* Collapse */}

      <div className="border-t p-4">

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
            hover:bg-slate-100
            transition
            cursor-pointer
          "
        >

          {collapsed ? (
            <ChevronRight />
          ) : (
            <>
              <ChevronLeft />

              <span>
                Collapse
              </span>
            </>
          )}

        </button>

      </div>

    </aside>

  );

}
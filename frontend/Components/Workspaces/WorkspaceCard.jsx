import { useNavigate } from "react-router-dom";

import {
  FolderKanban,
  Users,
  ArrowRight,
  Calendar,
  Building2,
} from "lucide-react";

export default function WorkspaceCard({
  workspace,
  setCurrentWorkspaceId,
}) {
  const navigate = useNavigate();

  const openWorkspace = () => {
    if (setCurrentWorkspaceId) {
      setCurrentWorkspaceId(workspace.id);
    }

    navigate(`/workspace/${workspace.id}`);
  };

  return (
    <div
      onClick={openWorkspace}
      className="
        group
        bg-white
        rounded-3xl
        border
        border-slate-200
        p-7
        shadow-sm
        hover:shadow-xl
        hover:-translate-y-1
        transition-all
        duration-300
        cursor-pointer
      "
    >

      {/* Top */}

      <div className="flex items-center justify-between">

        <div className="w-16 h-16 rounded-2xl bg-indigo-100 flex items-center justify-center">

          <FolderKanban
            size={30}
            className="text-indigo-600"
          />

        </div>

        <ArrowRight
          size={22}
          className="
            text-slate-400
            group-hover:text-indigo-600
            group-hover:translate-x-1
            transition-all
          "
        />

      </div>

      {/* Workspace Name */}

      <h2 className="mt-6 text-2xl font-bold text-slate-900">
        {workspace.name}
      </h2>

      {/* Company */}

      <div className="flex items-center gap-2 mt-3 text-slate-500">

        <Building2 size={17} />

        <span>{workspace.company}</span>

      </div>

      {/* Stats */}

      <div className="mt-8 flex justify-between">

        <div>

          <div className="flex items-center gap-2 text-slate-500">

            <Users size={16} />

            <span className="text-sm">
              Employees
            </span>

          </div>

          <h3 className="mt-2 text-3xl font-bold text-indigo-600">
            {workspace.employees.length}
          </h3>

        </div>

        <div>

          <div className="flex items-center gap-2 text-slate-500">

            <Calendar size={16} />

            <span className="text-sm">
              Status
            </span>

          </div>

          <h3 className="mt-2 text-lg font-semibold text-green-600">
            Active
          </h3>

        </div>

      </div>

      {/* Footer */}

      <div className="mt-8 pt-5 border-t border-slate-200 flex items-center justify-between">

        <span className="text-sm text-slate-500">
          Click to open workspace
        </span>

        <div
          className="
            px-4
            py-2
            rounded-xl
            bg-indigo-600
            text-white
            text-sm
            font-semibold
            group-hover:bg-indigo-700
            transition
          "
        >
          Open
        </div>

      </div>

    </div>
  );
}
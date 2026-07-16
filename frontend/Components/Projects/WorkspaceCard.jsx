import { useNavigate } from "react-router-dom";
import {
  Building2,
  Users,
  ArrowRight,
} from "lucide-react";

export default function WorkspaceCard({
  workspace,
  setCurrentWorkspaceId,
}) {
  const navigate = useNavigate();

 const openWorkspace = () => {
  console.log("Opening workspace:", workspace.id);

  setCurrentWorkspaceId(workspace.id);
  navigate(`/workspace/${workspace.id}`);
};

  return (
    <div
      className="
        bg-white
        rounded-3xl
        shadow-sm
        border
        border-slate-200
        p-6
        hover:shadow-xl
        transition
        duration-300
      "
    >
      {/* Header */}

      <div className="flex items-center gap-4">

        <div
          className="
            w-14
            h-14
            rounded-2xl
            bg-indigo-100
            flex
            items-center
            justify-center
          "
        >
          <Building2
            size={28}
            className="text-indigo-600"
          />
        </div>

        <div>

          <h2 className="text-xl font-bold text-slate-900">
            {workspace.name}
          </h2>

          <p className="text-slate-500">
            {workspace.company}
          </p>

        </div>

      </div>

      {/* Stats */}

      <div className="mt-8 flex items-center gap-3">

        <Users
          size={18}
          className="text-slate-500"
        />

        <span className="text-slate-700 font-medium">
          {workspace.employees.length} Employees
        </span>

      </div>

      <div className="mt-3 flex items-center gap-3">

        <span className="text-slate-700 font-medium">
          {workspace.tasks.length} Active Tasks
        </span>

      </div>

      {/* Open */}

      <button
        onClick={openWorkspace}
        className="
          mt-8
          w-full
          bg-indigo-600
          hover:bg-indigo-700
          text-white
          py-3
          rounded-xl
          font-semibold
          flex
          items-center
          justify-center
          gap-2
          transition
          cursor-pointer
        "
      >
        Open Workspace

        <ArrowRight size={18} />

      </button>
    </div>
  );
}
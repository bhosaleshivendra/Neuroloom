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
    const targetId = workspace._id || workspace.id;
    console.log("Opening workspace:", targetId);
    setCurrentWorkspaceId(targetId);
    navigate(`/workspace/${targetId}`);
  };

  return (
    <div
      className="
        bg-slate-900/60
        backdrop-blur-md
        rounded-3xl
        shadow-sm
        border
        border-slate-800/80
        p-6
        hover:shadow-indigo-500/10
        hover:shadow-xl
        hover:border-slate-700/80
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
            bg-indigo-950/40
            border
            border-indigo-500/20
            flex
            items-center
            justify-center
          "
        >
          <Building2
            size={28}
            className="text-indigo-400"
          />
        </div>

        <div>

          <h2 className="text-xl font-bold text-slate-100">
            {workspace.name}
          </h2>

          <p className="text-slate-400">
            {workspace.company}
          </p>

        </div>

      </div>

      {/* Stats */}

      <div className="mt-8 flex items-center gap-3">

        <Users
          size={18}
          className="text-slate-400"
        />

        <span className="text-slate-300 font-medium">
          {(workspace.employees || []).length} Employees
        </span>

      </div>

      <div className="mt-3 flex items-center gap-3">

        <span className="text-slate-300 font-medium">
          Active Tasks and Command Nodes configured.
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
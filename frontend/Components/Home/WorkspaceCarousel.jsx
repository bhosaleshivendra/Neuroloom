import { useState } from "react";
import { useNavigate } from "react-router-dom";

import {
  ChevronLeft,
  ChevronRight,
  FolderKanban,
  Users,
  CheckSquare,
  Bot,
  ArrowRight,
} from "lucide-react";

export default function WorkspaceCarousel({
  workspaces,
  setCurrentWorkspaceId,
}) {

  const navigate = useNavigate();

  const [currentIndex, setCurrentIndex] = useState(0);

  if (workspaces.length === 0) {
    return (
      <div className="mt-10 max-w-2xl mx-auto">
        <h2 className="text-2xl font-bold text-center text-slate-200 mb-8">
          Your Workspaces
        </h2>
        <div className="bg-slate-900/40 rounded-3xl border border-slate-800 p-16 text-center shadow-lg">
          <FolderKanban
            size={60}
            className="mx-auto text-slate-700 mb-6 animate-pulse"
          />
          <h3 className="text-xl font-bold mt-6 text-slate-200">
            No Workspaces Yet
          </h3>
          <p className="text-slate-500 mt-3 text-sm">
            Create your first workspace headquarters from the Projects Hub.
          </p>
        </div>
      </div>
    );
  }

  const workspace = workspaces[currentIndex];

  function previous() {
    setCurrentIndex(
      (currentIndex - 1 + workspaces.length) %
        workspaces.length
    );
  }

  function next() {
    setCurrentIndex(
      (currentIndex + 1) %
        workspaces.length
    );
  }

  function openWorkspace() {
    const targetId = workspace._id || workspace.id;
    if (setCurrentWorkspaceId) {
      setCurrentWorkspaceId(targetId);
    }
    navigate(`/workspace/${targetId}`);
  }

  return (
    <div className="mt-10">
      <h2 className="text-2xl font-bold text-center text-slate-200 mb-8">
        Your Workspaces
      </h2>

      <div className="flex items-center justify-center gap-6 max-w-xl mx-auto">
        {/* Left */}
        <button
          onClick={previous}
          className="w-12 h-12 rounded-xl bg-slate-900 border border-slate-900 text-slate-400 hover:text-indigo-400 hover:border-indigo-500/30 transition flex items-center justify-center cursor-pointer shrink-0"
        >
          <ChevronLeft size={20} />
        </button>

        {/* Workspace Card */}
        <div className="flex-1 bg-slate-900/60 backdrop-blur-md rounded-3xl shadow-lg border border-slate-800/80 overflow-hidden flex flex-col justify-between">
          {/* Header */}
          <div className="bg-gradient-to-r from-indigo-900/40 to-slate-900/80 border-b border-slate-800/60 p-6">
            <h3 className="text-xl font-bold text-slate-100 truncate">
              {workspace.name}
            </h3>
            <p className="text-xs text-slate-400 mt-1 truncate">
              {workspace.company}
            </p>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-3 gap-2 p-6 text-center border-b border-slate-800/40 bg-slate-950/20">
            <div>
              <Users size={18} className="mx-auto text-indigo-400" />
              <h4 className="text-lg font-bold text-slate-100 mt-2">
                {(workspace.employees || []).length}
              </h4>
              <p className="text-[10px] text-slate-500 font-medium">Personnel</p>
            </div>

            <div>
              <CheckSquare size={18} className="mx-auto text-emerald-400" />
              <h4 className="text-lg font-bold text-slate-100 mt-2">
                {(workspace.tasks || []).length}
              </h4>
              <p className="text-[10px] text-slate-500 font-medium">Tasks</p>
            </div>

            <div>
              <Bot size={18} className="mx-auto text-orange-400" />
              <h4 className="text-lg font-bold text-slate-100 mt-2">
                {(workspace.employees || []).length}
              </h4>
              <p className="text-[10px] text-slate-500 font-medium">Units</p>
            </div>
          </div>

          {/* Button */}
          <div className="p-6">
            <button
              onClick={openWorkspace}
              className="w-full bg-indigo-600 hover:bg-indigo-500 text-white rounded-xl py-3 flex justify-center items-center gap-2 transition cursor-pointer text-xs font-bold shadow-lg shadow-indigo-600/10"
            >
              Enter Headquarters
              <ArrowRight size={14} />
            </button>
          </div>
        </div>

        {/* Right */}
        <button
          onClick={next}
          className="w-12 h-12 rounded-xl bg-slate-900 border border-slate-900 text-slate-400 hover:text-indigo-400 hover:border-indigo-500/30 transition flex items-center justify-center cursor-pointer shrink-0"
        >
          <ChevronRight size={20} />
        </button>
      </div>

      {/* Dots */}
      <div className="flex justify-center gap-2.5 mt-8">
        {workspaces.map((_, index) => (
          <button
            key={index}
            onClick={() => setCurrentIndex(index)}
            className={`h-2 rounded-full transition-all duration-300 cursor-pointer ${
              currentIndex === index
                ? "bg-indigo-500 w-6"
                : "bg-slate-800 w-2 hover:bg-slate-700"
            }`}
          />
        ))}
      </div>

    </div>

  );

}
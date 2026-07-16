import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { ArrowLeft, FolderKanban } from "lucide-react";
import api from "../../src/utils/axios";

import CreateWorkspaceModal from "./CreateWorkspaceModal";
import WorkspaceCard from "./WorkspaceCard";

export default function Projects({
  workspaces,
  setWorkspaces,
  setCurrentWorkspaceId,
}) {
  const navigate = useNavigate();
  const [openModal, setOpenModal] = useState(false);

  const createWorkspace = async ({ name, company }) => {
    try {
      const response = await api.post("/api/workspaces", { name, company });
      setWorkspaces([...workspaces, response.data]);
      setOpenModal(false);
    } catch (err) {
      console.error("Failed to create workspace:", err);
      alert(err.response?.data?.message || "Failed to build workspace in memory vault.");
    }
  };

  return (
    <div className="min-h-full bg-slate-950 p-8 text-slate-100">
      {/* Back Button */}
      <button
        onClick={() => navigate("/")}
        className="flex items-center gap-2 text-slate-400 hover:text-indigo-400 transition mb-8 cursor-pointer text-sm font-semibold"
      >
        <ArrowLeft size={18} />
        <span>Home HQ</span>
      </button>

      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-4xl font-extrabold bg-gradient-to-r from-white to-slate-400 bg-clip-text text-transparent">
            Operational Workspaces
          </h1>
          <p className="mt-2 text-slate-400 text-sm">
            Access and manage active AI Headquarters.
          </p>
        </div>

        <button
          onClick={() => setOpenModal(true)}
          className="bg-indigo-600 hover:bg-indigo-500 text-white px-6 py-3.5 rounded-xl font-bold text-sm shadow-lg shadow-indigo-600/10 transition cursor-pointer self-start sm:self-auto"
        >
          Create Headquarters
        </button>
      </div>

      {/* Grid or Empty State */}
      {workspaces.length === 0 ? (
        <div className="mt-16 bg-slate-900/40 rounded-3xl border border-slate-800/80 p-20 text-center max-w-2xl mx-auto">
          <FolderKanban size={60} className="mx-auto text-slate-700 animate-pulse mb-6" />
          <h2 className="text-2xl font-bold text-slate-300">
            No Headquarters Formed
          </h2>
          <p className="mt-3 text-slate-500 text-sm">
            Deploy a new workspace directive to begin AI workforce operations.
          </p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mt-10">
          {workspaces.map((workspace) => (
            <WorkspaceCard
              key={workspace._id || workspace.id}
              workspace={workspace}
              setCurrentWorkspaceId={setCurrentWorkspaceId}
            />
          ))}
        </div>
      )}

      {openModal && (
        <CreateWorkspaceModal
          close={() => setOpenModal(false)}
          createWorkspace={createWorkspace}
        />
      )}
    </div>
  );
}
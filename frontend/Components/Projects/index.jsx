import { useState } from "react";

import CreateWorkspaceModal from "./CreateWorkspaceModal";
import WorkspaceCard from "./WorkspaceCard";

export default function Projects({
  workspaces,
  setWorkspaces,
  setCurrentWorkspaceId,
}) {
  const [openModal, setOpenModal] = useState(false);

  const createWorkspace = (workspace) => {
  setWorkspaces([...workspaces, workspace]);
  setOpenModal(false);
};

  return (
    <div className="min-h-full bg-slate-100 p-8">

      {/* Header */}

      <div className="flex items-center justify-between">

        <div>

          <h1 className="text-4xl font-bold text-slate-900">
            Projects
          </h1>

          <p className="mt-2 text-slate-500">
            Manage all your AI workspaces.
          </p>

        </div>

        <button
          onClick={() => setOpenModal(true)}
          className="
            bg-indigo-600
            hover:bg-indigo-700
            text-white
            px-6
            py-3
            rounded-xl
            font-semibold
            transition
            cursor-pointer
          "
        >
          + Create Workspace
        </button>

      </div>

      {/* Empty State */}

      {workspaces.length === 0 ? (

        <div className="mt-20 flex flex-col items-center justify-center">

          <h2 className="text-3xl font-bold text-slate-800">
            No Workspaces Yet
          </h2>

          <p className="mt-3 text-slate-500">
            Create your first AI workspace.
          </p>

        </div>

      ) : (

        <div className="grid grid-cols-3 gap-8 mt-10">

          {workspaces.map((workspace) => (

            <WorkspaceCard
              key={workspace.id}
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
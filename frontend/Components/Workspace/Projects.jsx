import { useState } from "react";
import {
  FolderKanban,
  Plus,
  CalendarDays,
  Users,
  ArrowRight,
  CircleCheckBig,
  Clock3,
  Trash2,
  Sliders,
} from "lucide-react";
import api from "../../src/utils/axios";

export default function Projects({ workspace, projects, setProjects }) {
  const [showModal, setShowModal] = useState(false);
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [dueDate, setDueDate] = useState("");

  const handleCreateProject = async () => {
    if (!name.trim()) {
      alert("Please enter a project name.");
      return;
    }

    try {
      const response = await api.post("/api/projects", {
        name,
        description,
        workspaceId: workspace._id,
        dueDate: dueDate || undefined,
      });

      setProjects([...projects, response.data]);
      resetForm();
    } catch (err) {
      console.error("Failed to create project:", err);
      alert(err.response?.data?.message || "Failed to create project workspace.");
    }
  };

  const handleUpdateProgress = async (projectId, currentProgress) => {
    let nextProgress = currentProgress + 10;
    if (nextProgress > 100) nextProgress = 0;

    let nextStatus = "In Progress";
    if (nextProgress === 0) nextStatus = "Planning";
    else if (nextProgress === 100) nextStatus = "Completed";

    try {
      const response = await api.put(`/api/projects/${projectId}`, {
        progress: nextProgress,
        status: nextStatus,
      });

      setProjects(projects.map(p => (p._id === projectId ? response.data : p)));
    } catch (err) {
      console.error("Failed to update project status:", err);
    }
  };

  const handleDeleteProject = async (projectId) => {
    if (!confirm("Are you sure you want to delete this project? All associated tasks will remain but the project link will be severed.")) return;

    try {
      await api.delete(`/api/projects/${projectId}`);
      setProjects(projects.filter(p => p._id !== projectId));
    } catch (err) {
      console.error("Failed to delete project:", err);
    }
  };

  const resetForm = () => {
    setName("");
    setDescription("");
    setDueDate("");
    setShowModal(false);
  };

  const completedCount = projects.filter(p => p.status === "Completed").length;
  const activeCount = projects.filter(p => p.status === "In Progress" || p.status === "Planning").length;

  return (
    <div className="p-8 text-slate-100 space-y-8">
      {/* Header */}
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-4xl font-extrabold bg-gradient-to-r from-white to-slate-400 bg-clip-text text-transparent">
            Workspace Projects
          </h1>
          <p className="text-slate-400 mt-2 text-sm">
            Launch and monitor operational projects within this headquarters.
          </p>
        </div>

        <button
          onClick={() => setShowModal(true)}
          className="
            flex
            items-center
            gap-2
            bg-indigo-600
            hover:bg-indigo-500
            text-white
            px-6
            py-3
            rounded-xl
            font-semibold
            text-sm
            transition
            cursor-pointer
            shadow-lg shadow-indigo-600/10
          "
        >
          <Plus size={16} />
          Launch Project
        </button>
      </div>

      {/* Grid List */}
      {projects.length === 0 ? (
        <div className="text-center p-20 bg-slate-900/40 rounded-3xl border border-slate-800/85">
          <FolderKanban size={60} className="mx-auto text-slate-700 animate-pulse mb-6" />
          <h2 className="text-2xl font-bold text-slate-300">No Projects Active</h2>
          <p className="text-slate-500 text-sm mt-3">Start a new project workflow to deploy your Transformers.</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {projects.map((project) => (
            <div
              key={project._id}
              className="
                bg-slate-900/60
                backdrop-blur-md
                rounded-3xl
                border
                border-slate-800/80
                shadow-sm
                hover:shadow-indigo-500/5
                hover:shadow-xl
                hover:border-slate-700/80
                transition
                p-7
                flex
                flex-col
                justify-between
              "
            >
              <div>
                <div className="flex justify-between items-start">
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
                    <FolderKanban
                      className="text-indigo-400"
                      size={28}
                    />
                  </div>

                  <div className="flex items-center gap-2">
                    <span
                      className={`
                        px-3
                        py-1
                        rounded-full
                        text-[10px]
                        font-bold
                        ${
                          project.status === "Completed"
                            ? "bg-green-500/10 text-green-400 border border-green-500/20"
                            : project.status === "Planning"
                            ? "bg-yellow-500/10 text-yellow-400 border border-yellow-500/20"
                            : "bg-indigo-500/10 text-indigo-400 border border-indigo-500/20"
                        }
                      `}
                    >
                      {project.status}
                    </span>

                    <button
                      onClick={() => handleDeleteProject(project._id)}
                      className="p-1.5 rounded-lg text-slate-500 hover:text-red-400 transition"
                    >
                      <Trash2 size={14} />
                    </button>
                  </div>
                </div>

                <h2 className="text-2xl font-bold mt-6 text-slate-100">
                  {project.name}
                </h2>

                <p className="mt-3 text-slate-400 text-xs leading-relaxed">
                  {project.description || "No project overview available."}
                </p>
              </div>

              {/* Progress Slider */}
              <div className="mt-8">
                <div className="flex justify-between text-xs font-semibold text-slate-400">
                  <span>Development Matrix</span>
                  <span>{project.progress || 0}%</span>
                </div>

                <div className="mt-3 h-2.5 rounded-full bg-slate-950/50 border border-slate-900 overflow-hidden relative">
                  <div
                    style={{
                      width: `${project.progress || 0}%`,
                    }}
                    className="
                      h-full
                      rounded-full
                      bg-indigo-600
                      shadow-[0_0_8px_rgba(99,102,241,0.5)]
                      transition-all
                      duration-500
                    "
                  />
                </div>
              </div>

              {/* Footer */}
              <div className="flex justify-between items-center mt-6 pt-6 border-t border-slate-900/50">
                <div className="flex items-center gap-2 text-xs text-slate-500">
                  <CalendarDays size={14} className="text-slate-600" />
                  <span>Due: {project.dueDate ? new Date(project.dueDate).toLocaleDateString() : "Flexible"}</span>
                </div>

                <button
                  onClick={() => handleUpdateProgress(project._id, project.progress || 0)}
                  className="
                    px-4
                    py-2
                    bg-slate-800
                    hover:bg-slate-700
                    text-slate-200
                    rounded-xl
                    text-xs
                    font-semibold
                    flex
                    items-center
                    gap-2
                    transition
                    cursor-pointer
                  "
                >
                  <Sliders size={12} />
                  Adjust Progress
                </button>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Summary KPI Footer */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-slate-900/40 border border-slate-800 rounded-3xl p-6 flex items-center justify-between">
          <div>
            <span className="text-xs text-slate-500 font-bold uppercase tracking-wider">Completed Matrix</span>
            <p className="text-3xl font-extrabold mt-1 text-green-400">{completedCount}</p>
          </div>
          <CircleCheckBig className="text-green-500/40" size={32} />
        </div>

        <div className="bg-slate-900/40 border border-slate-800 rounded-3xl p-6 flex items-center justify-between">
          <div>
            <span className="text-xs text-slate-500 font-bold uppercase tracking-wider">Active Programs</span>
            <p className="text-3xl font-extrabold mt-1 text-indigo-400">{activeCount}</p>
          </div>
          <Clock3 className="text-indigo-500/40" size={32} />
        </div>

        <div className="bg-slate-900/40 border border-slate-800 rounded-3xl p-6 flex items-center justify-between">
          <div>
            <span className="text-xs text-slate-500 font-bold uppercase tracking-wider">Active Core Personnel</span>
            <p className="text-3xl font-extrabold mt-1 text-emerald-400">
              {(workspace.employees || []).length}
            </p>
          </div>
          <Users className="text-emerald-500/40" size={32} />
        </div>
      </div>

      {/* Creation Modal */}
      {showModal && (
        <div className="fixed inset-0 bg-slate-950/80 backdrop-blur-sm flex items-center justify-center z-50 p-4">
          <div className="bg-slate-900 border border-slate-800 rounded-3xl w-full max-w-[500px] p-8 shadow-2xl">
            <h2 className="text-2xl font-bold bg-gradient-to-r from-white to-slate-400 bg-clip-text text-transparent">
              Initialize Project
            </h2>

            <input
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Project Title"
              className="w-full bg-slate-950 border border-slate-800 rounded-xl p-4 mt-6 text-sm text-slate-100 outline-none focus:border-indigo-500 transition"
            />

            <textarea
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="System specifications and objectives..."
              rows={4}
              className="w-full bg-slate-950 border border-slate-800 rounded-xl p-4 mt-4 text-sm text-slate-100 outline-none focus:border-indigo-500 transition"
            />

            <div className="mt-4">
              <label className="text-xs text-slate-500 font-bold block mb-1.5">ESTIMATED LAUNCH MATRIX (DUE DATE)</label>
              <input
                type="date"
                value={dueDate}
                onChange={(e) => setDueDate(e.target.value)}
                className="w-full bg-slate-950 border border-slate-800 rounded-xl p-3 text-xs text-slate-300 outline-none"
              />
            </div>

            <div className="flex justify-end gap-4 mt-8">
              <button
                onClick={resetForm}
                className="px-5 py-2.5 border border-slate-800 rounded-xl text-xs font-semibold text-slate-400 hover:text-slate-200 transition"
              >
                Cancel
              </button>
              <button
                onClick={handleCreateProject}
                className="px-5 py-2.5 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white font-semibold text-xs shadow-lg shadow-indigo-600/10 transition"
              >
                Activate Matrix
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
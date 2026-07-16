import { useState } from "react";
import {
  Plus,
  CheckSquare,
  AlertCircle,
  Calendar,
  User,
  Trash2,
  Play,
  Check,
} from "lucide-react";
import api from "../../src/utils/axios";

export default function Tasks({
  workspace,
  tasks,
  setTasks,
  projects,
}) {
  const [showModal, setShowModal] = useState(false);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [employeeId, setEmployeeId] = useState("");
  const [priority, setPriority] = useState("Medium");
  const [projectId, setProjectId] = useState("");
  const [dueDate, setDueDate] = useState("");

  const createTask = async () => {
    if (!title.trim()) {
      alert("Please enter a task title.");
      return;
    }
    if (!projectId) {
      alert("Please assign a project.");
      return;
    }

    try {
      const response = await api.post("/api/tasks", {
        title,
        description,
        priority,
        assignedTo: employeeId || "",
        projectId,
        workspaceId: workspace._id,
        dueDate: dueDate || undefined,
      });

      setTasks([...tasks, response.data]);
      resetForm();
    } catch (err) {
      console.error("Failed to create task:", err);
      alert(err.response?.data?.message || "Failed to issue directive to memory core.");
    }
  };

  const updateTaskStatus = async (taskId, currentStatus) => {
    let nextStatus = "To Do";
    if (currentStatus === "To Do") nextStatus = "In Progress";
    else if (currentStatus === "In Progress") nextStatus = "Done";

    try {
      const response = await api.put(`/api/tasks/${taskId}`, {
        status: nextStatus,
      });

      setTasks(tasks.map(t => (t._id === taskId ? response.data : t)));
    } catch (err) {
      console.error("Failed to update task status:", err);
    }
  };

  const deleteTask = async (taskId) => {
    if (!confirm("Are you sure you want to delete this task?")) return;
    try {
      await api.delete(`/api/tasks/${taskId}`);
      setTasks(tasks.filter(t => t._id !== taskId));
    } catch (err) {
      console.error("Failed to delete task:", err);
    }
  };

  const resetForm = () => {
    setTitle("");
    setDescription("");
    setEmployeeId("");
    setPriority("Medium");
    setProjectId("");
    setDueDate("");
    setShowModal(false);
  };

  return (
    <div className="p-8 text-slate-100">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-4xl font-extrabold text-slate-100 bg-gradient-to-r from-white to-slate-400 bg-clip-text text-transparent">
            Task Directives
          </h1>
          <p className="text-slate-400 mt-2 text-sm">
            Assign operations to your active Autobot departments.
          </p>
        </div>

        <button
          onClick={() => setShowModal(true)}
          className="
            bg-indigo-600
            hover:bg-indigo-500
            text-white
            px-6
            py-3
            rounded-xl
            flex
            items-center
            gap-2
            font-semibold
            text-sm
            transition
            cursor-pointer
            shadow-lg shadow-indigo-600/10
          "
        >
          <Plus size={16} />
          New Directive
        </button>
      </div>

      {tasks.length === 0 ? (
        <div
          className="
            mt-16
            bg-slate-900/40
            rounded-3xl
            border
            border-slate-800/80
            p-20
            text-center
          "
        >
          <CheckSquare
            size={60}
            className="mx-auto text-slate-700 animate-pulse"
          />
          <h2 className="mt-6 text-2xl font-bold text-slate-300">
            No Directives Active
          </h2>
          <p className="mt-3 text-slate-500 text-sm">
            Deploy a new directive to delegate work to your AI employees.
          </p>
        </div>
      ) : (
        <div className="grid gap-5 mt-10">
          {tasks.map((task) => {
            const projectObj = projects.find(p => p._id === task.project || p.id === task.project);
            const employeeObj = workspace.employees.find(e => e.id === task.assignedTo);
            
            return (
              <div
                key={task._id}
                className="
                  bg-slate-900/60
                  backdrop-blur-md
                  rounded-2xl
                  p-6
                  border
                  border-slate-800/80
                  hover:border-slate-700/80
                  shadow-sm
                  transition
                  flex
                  items-center
                  justify-between
                  gap-6
                "
              >
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-3">
                    <h2 className="text-lg font-bold text-slate-200 truncate">
                      {task.title}
                    </h2>
                    <span
                      className={`
                        px-2.5
                        py-0.5
                        rounded-full
                        text-[10px]
                        font-bold
                        ${
                          task.priority === "High"
                            ? "bg-red-500/10 text-red-400 border border-red-500/20"
                            : task.priority === "Medium"
                            ? "bg-amber-500/10 text-amber-400 border border-amber-500/20"
                            : "bg-indigo-500/10 text-indigo-400 border border-indigo-500/20"
                        }
                      `}
                    >
                      {task.priority}
                    </span>
                  </div>

                  <p className="mt-2 text-slate-400 text-xs leading-relaxed max-w-2xl">
                    {task.description || "No description provided."}
                  </p>

                  <div className="mt-4 flex flex-wrap gap-4 text-[11px] text-slate-500 font-semibold">
                    <span className="flex items-center gap-1.5 bg-slate-950/40 border border-slate-900 px-3 py-1 rounded-lg">
                      <User size={12} className="text-indigo-400" />
                      Assigned To: <span className="text-slate-300 font-bold">{employeeObj ? employeeObj.name : task.assignedTo || "Unassigned"}</span>
                    </span>

                    {projectObj && (
                      <span className="flex items-center gap-1.5 bg-slate-950/40 border border-slate-900 px-3 py-1 rounded-lg">
                        <AlertCircle size={12} className="text-emerald-400" />
                        Project: <span className="text-slate-300 font-bold">{projectObj.name}</span>
                      </span>
                    )}

                    {task.dueDate && (
                      <span className="flex items-center gap-1.5 bg-slate-950/40 border border-slate-900 px-3 py-1 rounded-lg">
                        <Calendar size={12} className="text-cyan-400" />
                        Due: <span className="text-slate-300 font-bold">{new Date(task.dueDate).toLocaleDateString()}</span>
                      </span>
                    )}
                  </div>
                </div>

                <div className="flex items-center gap-3 shrink-0">
                  <button
                    onClick={() => updateTaskStatus(task._id, task.status)}
                    className={`
                      px-4
                      py-2
                      rounded-xl
                      text-xs
                      font-bold
                      flex
                      items-center
                      gap-2
                      transition
                      cursor-pointer
                      ${
                        task.status === "Done"
                          ? "bg-emerald-500/10 text-emerald-400 border border-emerald-500/20"
                          : task.status === "In Progress"
                          ? "bg-indigo-600 hover:bg-indigo-500 text-white font-bold"
                          : "bg-slate-800 hover:bg-slate-700 text-slate-300 border border-slate-700/60"
                      }
                    `}
                  >
                    {task.status === "Done" ? (
                      <>
                        <Check size={12} />
                        Done
                      </>
                    ) : task.status === "In Progress" ? (
                      <>
                        <span className="w-1.5 h-1.5 rounded-full bg-white animate-pulse" />
                        Working
                      </>
                    ) : (
                      <>
                        <Play size={10} fill="currentColor" />
                        Start Task
                      </>
                    )}
                  </button>

                  <button
                    onClick={() => deleteTask(task._id)}
                    className="p-2.5 bg-slate-800/60 hover:bg-red-500/10 hover:text-red-400 border border-slate-800 rounded-xl transition cursor-pointer text-slate-400"
                  >
                    <Trash2 size={14} />
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      )}

      {showModal && (
        <div className="fixed inset-0 bg-slate-950/80 backdrop-blur-sm flex items-center justify-center z-50 p-4">
          <div className="bg-slate-900 border border-slate-800 rounded-3xl w-full max-w-[540px] p-8 shadow-2xl">
            <h2 className="text-2xl font-bold bg-gradient-to-r from-white to-slate-400 bg-clip-text text-transparent">
              Issue Directive
            </h2>

            <input
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="Directive Title"
              className="w-full bg-slate-950 border border-slate-800 rounded-xl p-4 mt-6 text-sm text-slate-100 outline-none focus:border-indigo-500 transition"
            />

            <textarea
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="Instructions details..."
              rows={3}
              className="w-full bg-slate-950 border border-slate-800 rounded-xl p-4 mt-4 text-sm text-slate-100 outline-none focus:border-indigo-500 transition"
            />

            <div className="grid grid-cols-2 gap-4 mt-4">
              <div>
                <label className="text-xs text-slate-500 font-bold block mb-1.5">PROJECT</label>
                <select
                  value={projectId}
                  onChange={(e) => setProjectId(e.target.value)}
                  className="w-full bg-slate-950 border border-slate-800 rounded-xl p-3.5 text-xs text-slate-300 outline-none"
                >
                  <option value="">Select Project</option>
                  {projects.map((project) => (
                    <option key={project._id} value={project._id}>
                      {project.name}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="text-xs text-slate-500 font-bold block mb-1.5">ASSIGN TO BOT</label>
                <select
                  value={employeeId}
                  onChange={(e) => setEmployeeId(e.target.value)}
                  className="w-full bg-slate-950 border border-slate-800 rounded-xl p-3.5 text-xs text-slate-300 outline-none"
                >
                  <option value="">Select Department Bot</option>
                  {workspace.employees.map((employee) => (
                    <option key={employee.id} value={employee.id}>
                      {employee.name} ({employee.department})
                    </option>
                  ))}
                </select>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4 mt-4">
              <div>
                <label className="text-xs text-slate-500 font-bold block mb-1.5">PRIORITY</label>
                <select
                  value={priority}
                  onChange={(e) => setPriority(e.target.value)}
                  className="w-full bg-slate-950 border border-slate-800 rounded-xl p-3.5 text-xs text-slate-300 outline-none"
                >
                  <option value="Low">Low Priority</option>
                  <option value="Medium">Medium Priority</option>
                  <option value="High">High Priority</option>
                </select>
              </div>

              <div>
                <label className="text-xs text-slate-500 font-bold block mb-1.5">DUE DATE</label>
                <input
                  type="date"
                  value={dueDate}
                  onChange={(e) => setDueDate(e.target.value)}
                  className="w-full bg-slate-950 border border-slate-800 rounded-xl p-3 text-xs text-slate-300 outline-none"
                />
              </div>
            </div>

            <div className="flex justify-end gap-4 mt-8">
              <button
                onClick={resetForm}
                className="px-5 py-2.5 border border-slate-800 rounded-xl text-xs font-semibold text-slate-400 hover:text-slate-200 transition"
              >
                Abort
              </button>
              <button
                onClick={createTask}
                className="px-5 py-2.5 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white font-semibold text-xs shadow-lg shadow-indigo-600/10 transition"
              >
                Deploy Directive
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
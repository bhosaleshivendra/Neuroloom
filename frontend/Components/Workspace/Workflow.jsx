import { useState } from "react";
import {
  BriefcaseBusiness,
  Building2,
  Trash2,
  Save,
  Cpu,
  Zap,
  Clock3,
  User,
  ShieldCheck,
  Sparkles,
} from "lucide-react";
import { autobotImages } from "../../src/data/autobots";
import api from "../../src/utils/axios";

export default function Workflow({ workspace, updateWorkspace }) {
  const [selectedEmpId, setSelectedEmpId] = useState(null);
  const [editingRole, setEditingRole] = useState("");
  const [editingDept, setEditingDept] = useState("");
  const [editingManager, setEditingManager] = useState("");
  const [updating, setUpdating] = useState(false);

  const employees = workspace?.employees || [];
  const departments = workspace?.departments || [];

  // Find root employee (typically prime)
  const rootEmployee = employees.find(e => e.id === "prime") || employees[0];

  const handleSelectEmployee = (emp) => {
    setSelectedEmpId(emp.id);
    setEditingRole(emp.role);
    setEditingDept(emp.department);
    setEditingManager(emp.managerId || "");
  };

  const handleSaveEmployee = async () => {
    if (!selectedEmpId) return;
    try {
      setUpdating(true);
      const response = await api.put(
        `/api/workspaces/${workspace._id}/employees/${selectedEmpId}`,
        {
          role: editingRole,
          department: editingDept,
          managerId: editingManager,
        }
      );
      updateWorkspace(response.data);
      setSelectedEmpId(null);
    } catch (err) {
      console.error("Failed to update employee details:", err);
      alert("Failed to sync employee adjustments with databases.");
    } finally {
      setUpdating(false);
    }
  };

  const handleFireEmployee = async (empId) => {
    if (empId === "prime") {
      alert("Optimus Prime cannot be fired.");
      return;
    }
    if (!confirm("Decommission this Autobot from active duty?")) return;

    try {
      setUpdating(true);
      const response = await api.delete(
        `/api/workspaces/${workspace._id}/employees/${empId}`
      );
      updateWorkspace(response.data);
      setSelectedEmpId(null);
    } catch (err) {
      console.error("Failed to fire employee:", err);
    } finally {
      setUpdating(false);
    }
  };

  const handleReassignManager = async (draggedId, targetManagerId) => {
    if (draggedId === targetManagerId) return;
    if (draggedId === "prime") {
      alert("Optimus Prime is the project leader and cannot report to anyone.");
      return;
    }

    // Prevent circular reporting
    let currentManager = targetManagerId;
    while (currentManager) {
      if (currentManager === draggedId) {
        alert("Circular reporting detected! Cannot assign an employee as their own subordinate's report.");
        return;
      }
      const managerNode = employees.find(e => e.id === currentManager);
      currentManager = managerNode ? managerNode.managerId : null;
    }

    try {
      const updatedEmployees = employees.map(emp => {
        if (emp.id === draggedId) {
          return { ...emp, managerId: targetManagerId };
        }
        return emp;
      });

      const response = await api.put(`/api/workspaces/${workspace._id}/reporting`, {
        employees: updatedEmployees.map(e => ({ id: e.id, managerId: e.managerId })),
      });
      updateWorkspace(response.data);
    } catch (err) {
      console.error("Failed to update reporting structure:", err);
      alert("Error saving reporting relationship adjustments.");
    }
  };

  const selectedEmp = employees.find(e => e.id === selectedEmpId);

  // Recursive Tree Node Renderer
  const renderTree = (employee) => {
    if (!employee) return null;
    const children = employees.filter(e => e.managerId === employee.id);
    const imgUrl = autobotImages[employee.id] || autobotImages.prime;

    return (
      <div className="flex flex-col items-center relative" key={employee.id}>
        {/* Node Box */}
        <div
          draggable={employee.id !== "prime"}
          onDragStart={(e) => {
            e.dataTransfer.setData("text/plain", employee.id);
            e.dataTransfer.effectAllowed = "move";
          }}
          onDragOver={(e) => e.preventDefault()}
          onDrop={(e) => {
            e.preventDefault();
            const draggedId = e.dataTransfer.getData("text/plain");
            handleReassignManager(draggedId, employee.id);
          }}
          onClick={() => handleSelectEmployee(employee)}
          className={`
            w-52
            bg-slate-900/80
            backdrop-blur-md
            border
            rounded-2xl
            p-4
            cursor-pointer
            transition-all
            duration-300
            hover:-translate-y-1
            select-none
            z-10
            shadow-lg
            ${
              selectedEmpId === employee.id
                ? "border-indigo-500 shadow-[0_0_15px_rgba(99,102,241,0.25)]"
                : "border-slate-800/80 hover:border-indigo-500/40 hover:shadow-indigo-500/5"
            }
          `}
        >
          <div className="flex items-center gap-3">
            <div className="relative">
              <img
                src={imgUrl}
                alt={employee.name}
                className="w-11 h-11 object-contain bg-slate-950/40 rounded-xl p-0.5"
              />
              <span
                className={`
                  absolute -bottom-0.5 -right-0.5
                  w-3
                  h-3
                  rounded-full
                  border-2
                  border-slate-900
                  ${
                    employee.status === "WORKING"
                      ? "bg-amber-500 animate-pulse"
                      : employee.status === "THINKING"
                      ? "bg-indigo-500 animate-pulse"
                      : "bg-green-500"
                  }
                `}
              />
            </div>
            <div className="min-w-0 flex-1">
              <h3 className="text-xs font-bold text-slate-100 truncate">{employee.name}</h3>
              <p className="text-[9px] text-indigo-400 font-semibold truncate mt-0.5">{employee.role}</p>
              <p className="text-[8px] text-slate-500 font-medium truncate">{employee.department}</p>
            </div>
          </div>
        </div>

        {/* Children connections */}
        {children.length > 0 && (
          <div className="flex flex-col items-center w-full relative">
            {/* Vertical connector down from parent */}
            <div className="w-0.5 h-7 bg-indigo-500/30 relative">
              {/* Glowing animated data packet */}
              <div className="absolute top-0 left-[-1.5px] w-1 h-1 bg-indigo-400 rounded-full animate-bounce" />
            </div>

            {/* Row of children */}
            <div className="flex gap-6 relative px-4">
              {/* Horizontal line spanning children */}
              {children.length > 1 && (
                <div className="absolute top-0 left-28 right-28 h-0.5 bg-indigo-500/30" />
              )}
              {children.map(child => (
                <div key={child.id} className="relative flex flex-col items-center pt-5">
                  {/* Vertical stub down to child */}
                  <div className="absolute top-0 w-0.5 h-5 bg-indigo-500/30" />
                  {renderTree(child)}
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    );
  };

  return (
    <div className="p-8 text-slate-100 h-full flex flex-col min-h-screen overflow-x-auto relative">
      {/* Title */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-4xl font-extrabold bg-gradient-to-r from-white to-slate-400 bg-clip-text text-transparent flex items-center gap-3">
            Command Structure Matrix
          </h1>
          <p className="mt-2 text-slate-400 text-sm">
            Drag and drop personnel cards to adjust reporting hierarchy and workflow lines.
          </p>
        </div>

        <div className="flex items-center gap-3 text-xs bg-slate-900 border border-slate-800 p-3 rounded-2xl">
          <Zap size={14} className="text-indigo-400 animate-pulse" />
          <span className="text-slate-400">Drag child units over new manager nodes to reassign reporting structures.</span>
        </div>
      </div>

      {/* Main Board Layout */}
      <div className="flex-1 flex gap-8 mt-12 relative items-start">
        {/* Org Chart Area */}
        <div className="flex-1 flex justify-center py-8 bg-slate-950/20 border border-slate-900/50 rounded-3xl overflow-auto min-h-[500px] shadow-inner relative">
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_80%_80%_at_50%_-20%,rgba(99,102,241,0.04),transparent)] pointer-events-none" />
          {rootEmployee && renderTree(rootEmployee)}
        </div>

        {/* Selected Drawer Overlay */}
        {selectedEmp && (
          <div className="w-80 shrink-0 bg-slate-900/90 border border-slate-800 rounded-3xl p-6 shadow-2xl space-y-6 select-none relative">
            <h2 className="text-lg font-bold text-slate-100 border-b border-slate-800 pb-3 flex items-center gap-2">
              <Cpu size={18} className="text-indigo-400" />
              Configure Unit
            </h2>

            {/* Profile */}
            <div className="flex items-center gap-4 bg-slate-950/40 p-4 rounded-2xl border border-slate-800/40">
              <img
                src={autobotImages[selectedEmp.id] || autobotImages.prime}
                alt={selectedEmp.name}
                className="w-16 h-16 object-contain bg-slate-900 rounded-xl p-1"
              />
              <div className="min-w-0">
                <h3 className="font-extrabold text-slate-100 text-sm">{selectedEmp.name}</h3>
                <span className="inline-flex mt-1.5 px-2 py-0.5 rounded-full text-[9px] font-bold bg-indigo-500/10 text-indigo-400 border border-indigo-500/20">
                  {selectedEmp.status || "ONLINE"}
                </span>
              </div>
            </div>

            {/* Editing fields */}
            <div className="space-y-4">
              <div>
                <label className="text-[10px] text-slate-500 font-bold uppercase tracking-wider block mb-1.5">Role Designation</label>
                <input
                  value={editingRole}
                  onChange={e => setEditingRole(e.target.value)}
                  className="w-full bg-slate-950 border border-slate-850 rounded-xl p-3 text-xs text-slate-200 outline-none focus:border-indigo-500 transition font-medium"
                />
              </div>

              <div>
                <label className="text-[10px] text-slate-500 font-bold uppercase tracking-wider block mb-1.5">Department Assignment</label>
                <select
                  value={editingDept}
                  onChange={e => setEditingDept(e.target.value)}
                  className="w-full bg-slate-950 border border-slate-850 rounded-xl p-3 text-xs text-slate-300 outline-none focus:border-indigo-500 transition font-medium"
                >
                  {departments.map(dept => (
                    <option key={dept} value={dept}>{dept}</option>
                  ))}
                  <option value="General">General</option>
                </select>
              </div>

              {selectedEmp.id !== "prime" && (
                <div>
                  <label className="text-[10px] text-slate-500 font-bold uppercase tracking-wider block mb-1.5">Reports to Manager</label>
                  <select
                    value={editingManager}
                    onChange={e => setEditingManager(e.target.value)}
                    className="w-full bg-slate-950 border border-slate-850 rounded-xl p-3 text-xs text-slate-300 outline-none focus:border-indigo-500 transition font-medium"
                  >
                    {employees
                      .filter(e => e.id !== selectedEmp.id)
                      .map(e => (
                        <option key={e.id} value={e.id}>{e.name} ({e.role})</option>
                      ))}
                  </select>
                </div>
              )}
            </div>

            {/* Actions */}
            <div className="pt-4 border-t border-slate-800/80 space-y-3">
              <button
                onClick={handleSaveEmployee}
                disabled={updating}
                className="w-full bg-indigo-600 hover:bg-indigo-500 text-white rounded-xl py-3 text-xs font-bold flex justify-center items-center gap-2 transition cursor-pointer disabled:opacity-50"
              >
                <Save size={14} />
                Save Directives
              </button>

              {selectedEmp.id !== "prime" && (
                <button
                  onClick={() => handleFireEmployee(selectedEmp.id)}
                  disabled={updating}
                  className="w-full bg-slate-800 hover:bg-red-500/10 hover:text-red-400 border border-slate-850 rounded-xl py-3 text-xs font-bold flex justify-center items-center gap-2 transition cursor-pointer disabled:opacity-50"
                >
                  <Trash2 size={14} />
                  Decommission Unit
                </button>
              )}

              <button
                onClick={() => setSelectedEmpId(null)}
                className="w-full bg-slate-950 hover:bg-slate-850 text-slate-400 rounded-xl py-2.5 text-xs font-semibold flex justify-center items-center transition cursor-pointer"
              >
                Close Drawer
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

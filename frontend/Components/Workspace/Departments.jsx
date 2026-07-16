import { useState } from "react";
import {
  Building2,
  Plus,
  Trash2,
  Edit2,
  Users,
  Save,
  X,
  Sparkles,
} from "lucide-react";
import { autobotImages } from "../../src/data/autobots";
import api from "../../src/utils/axios";

export default function Departments({ workspace, updateWorkspace }) {
  const [showAddModal, setShowAddModal] = useState(false);
  const [newDeptName, setNewDeptName] = useState("");
  const [editingDept, setEditingDept] = useState(null); // name string
  const [editingValue, setEditingValue] = useState("");
  const [saving, setSaving] = useState(false);

  const departments = workspace?.departments || [];
  const employees = workspace?.employees || [];

  const handleAddDepartment = async () => {
    if (!newDeptName.trim()) {
      alert("Please enter a department name.");
      return;
    }
    if (departments.includes(newDeptName.trim())) {
      alert("Department already exists.");
      return;
    }

    try {
      setSaving(true);
      const updatedDepts = [...departments, newDeptName.trim()];
      const response = await api.put(`/api/workspaces/${workspace._id}`, {
        departments: updatedDepts,
      });
      updateWorkspace(response.data);
      setNewDeptName("");
      setShowAddModal(false);
    } catch (err) {
      console.error("Failed to add department:", err);
      alert("Failed to save department configurations.");
    } finally {
      setSaving(false);
    }
  };

  const handleRenameDepartment = async (oldName) => {
    if (!editingValue.trim()) return;
    if (oldName === editingValue.trim()) {
      setEditingDept(null);
      return;
    }
    if (departments.includes(editingValue.trim())) {
      alert("Department name already exists.");
      return;
    }

    try {
      setSaving(true);
      const updatedDepts = departments.map((d) =>
        d === oldName ? editingValue.trim() : d
      );

      // We should also rename the department field on active employees in this workspace!
      // In the backend, updateWorkspace will handle saving departments array. But for employees, 
      // we can do a backend update for employees whose department matches oldName!
      // Wait, we can call PUT /api/workspaces/:id/employees/:employeeId for each employee, or just update the workspace employees department directly!
      // Wait! In backend/controllers/workspaceController.js, we can also support modifying employee departments when editing workspace!
      // But since we want to be safe, let's just make a PUT request to updateWorkspace and send the renamed employees as well.
      // Wait, updateWorkspace doesn't let us edit employees. However, let's look at updateWorkspace controller:
      // It allows renaming/updating departments. Let's see: we can send the updated employee subdocuments inside backend if we update employee fields.
      // Actually, since we want employees to be updated, let's update their departments inside the workspace.
      // Wait, in updateWorkspace controller, does it allow updating employees? No, but wait: we can easily extend updateWorkspace controller to allow updating employees or we can update each employee!
      // Wait! Let's check: does updateWorkspace allow updating workspace.employees?
      // No: `if (departments) workspace.departments = departments;`
      // Wait, let's modify backend/controllers/workspaceController.js to support updating employees too, or rename employee departments if department is renamed!
      // Let's modify updateWorkspace in workspaceController.js to automatically rename the department of any employee whose department matches oldName if departments are updated!
      // Wait, how does the backend know what oldName was? It doesn't, unless we compare!
      // If we compare: if one department is missing in the new list, and there is a new department in the new list, we can map the missing one to the new one!
      // But a more robust way is: let's modify updateWorkspace to accept `employees` in req.body!
      // If `employees` is passed: `if (employees) workspace.employees = employees;`
      // That is extremely simple and generic, and gives the frontend complete flexibility to modify the workspace data!
      // Let's check: in `backend/controllers/workspaceController.js` lines 99-104:
      // Let's view it again to see. Yes:
      // `if (name) workspace.name = name;`
      // `if (company) workspace.company = company;`
      // Let's add `if (employees) workspace.employees = employees;` inside `updateWorkspace`!
      // That will allow the frontend to pass the updated employee list (with renamed departments) when saving!
      // This is a beautiful, generic API improvement! Let's do that.
      
      const updatedEmployees = employees.map(emp => {
        if (emp.department === oldName) {
          return { ...emp, department: editingValue.trim() };
        }
        return emp;
      });

      const response = await api.put(`/api/workspaces/${workspace._id}`, {
        departments: updatedDepts,
        employees: updatedEmployees, // Supported by our generic backend fix
      });

      updateWorkspace(response.data);
      setEditingDept(null);
      setEditingValue("");
    } catch (err) {
      console.error("Failed to rename department:", err);
    } finally {
      setSaving(false);
    }
  };

  const handleDeleteDepartment = async (deptName) => {
    if (deptName === "Leadership") {
      alert("Leadership department cannot be deleted.");
      return;
    }
    if (!confirm(`Delete department "${deptName}"? Personnel assigned to it will report to General.`)) {
      return;
    }

    try {
      setSaving(true);
      const updatedDepts = departments.filter((d) => d !== deptName);
      const updatedEmployees = employees.map(emp => {
        if (emp.department === deptName) {
          return { ...emp, department: "General" };
        }
        return emp;
      });

      const response = await api.put(`/api/workspaces/${workspace._id}`, {
        departments: updatedDepts,
        employees: updatedEmployees,
      });
      updateWorkspace(response.data);
    } catch (err) {
      console.error("Failed to delete department:", err);
    } finally {
      setSaving(false);
    }
  };

  return (
    <div className="p-8 text-slate-100 space-y-8 select-none min-h-screen">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-4xl font-extrabold bg-gradient-to-r from-white to-slate-400 bg-clip-text text-transparent flex items-center gap-3">
            Workspace Departments
          </h1>
          <p className="mt-2 text-slate-400 text-sm">
            Configure custom operational divisions and review active personnel allocations.
          </p>
        </div>

        <button
          onClick={() => setShowAddModal(true)}
          className="bg-indigo-600 hover:bg-indigo-500 text-white px-6 py-3 rounded-xl font-bold text-sm shadow-lg shadow-indigo-600/10 transition cursor-pointer self-start sm:self-auto flex items-center gap-2"
        >
          <Plus size={16} />
          Form Department
        </button>
      </div>

      {/* Grid of Departments */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-10">
        {departments.map((dept) => {
          const deptEmployees = employees.filter((e) => e.department === dept);
          const isEditing = editingDept === dept;

          return (
            <div
              key={dept}
              className="bg-slate-900/60 backdrop-blur-md rounded-3xl border border-slate-800/80 p-6 flex flex-col justify-between shadow-lg relative group"
            >
              <div>
                <div className="flex justify-between items-center border-b border-slate-800/60 pb-4">
                  {isEditing ? (
                    <div className="flex items-center gap-2 w-full pr-4">
                      <input
                        value={editingValue}
                        onChange={(e) => setEditingValue(e.target.value)}
                        className="bg-slate-950 border border-slate-800 rounded-lg px-2.5 py-1 text-xs text-slate-200 outline-none flex-1 focus:border-indigo-500 transition"
                      />
                      <button
                        onClick={() => handleRenameDepartment(dept)}
                        className="p-1 bg-indigo-600 hover:bg-indigo-500 text-white rounded transition cursor-pointer"
                      >
                        <Save size={12} />
                      </button>
                      <button
                        onClick={() => setEditingDept(null)}
                        className="p-1 bg-slate-800 hover:bg-slate-700 text-slate-400 rounded transition cursor-pointer"
                      >
                        <X size={12} />
                      </button>
                    </div>
                  ) : (
                    <div className="flex items-center gap-2">
                      <h2 className="text-lg font-bold text-slate-200">{dept}</h2>
                      <button
                        onClick={() => {
                          setEditingDept(dept);
                          setEditingValue(dept);
                        }}
                        className="p-1 text-slate-500 hover:text-slate-300 transition cursor-pointer"
                      >
                        <Edit2 size={12} />
                      </button>
                    </div>
                  )}

                  {!isEditing && dept !== "Leadership" && (
                    <button
                      onClick={() => handleDeleteDepartment(dept)}
                      className="p-1.5 text-slate-500 hover:text-red-400 hover:bg-red-500/10 rounded-lg transition cursor-pointer"
                    >
                      <Trash2 size={14} />
                    </button>
                  )}
                </div>

                {/* Sub-list of active employees */}
                <div className="mt-6 space-y-3">
                  <p className="text-[10px] text-slate-500 font-bold uppercase tracking-wider">Active Units Assigned</p>
                  {deptEmployees.length === 0 ? (
                    <p className="text-slate-500 text-xs italic py-2">No active personnel assigned.</p>
                  ) : (
                    <div className="space-y-2.5 max-h-48 overflow-y-auto pr-1">
                      {deptEmployees.map((emp) => {
                        const avatar = autobotImages[emp.id] || autobotImages.prime;
                        return (
                          <div
                            key={emp.id}
                            className="flex items-center gap-3 bg-slate-950/30 p-2 border border-slate-850 rounded-xl hover:border-slate-800 transition"
                          >
                            <img
                              src={avatar}
                              alt={emp.name}
                              className="w-8 h-8 object-contain bg-slate-900 rounded-lg p-0.5"
                            />
                            <div className="min-w-0 flex-1">
                              <h4 className="text-xs font-bold text-slate-200 truncate">{emp.name}</h4>
                              <p className="text-[9px] text-slate-500 truncate">{emp.role}</p>
                            </div>
                            <span className="w-1.5 h-1.5 rounded-full bg-green-500 shrink-0" />
                          </div>
                        );
                      })}
                    </div>
                  )}
                </div>
              </div>

              {/* KPI Counter Footer */}
              <div className="mt-8 pt-4 border-t border-slate-850 flex items-center justify-between text-slate-500 text-xs font-semibold">
                <span className="flex items-center gap-1.5">
                  <Users size={14} className="text-indigo-400" />
                  <span>{deptEmployees.length} Units</span>
                </span>
                <span className="text-[10px] bg-slate-950 border border-slate-850 px-2 py-0.5 rounded-full text-slate-400 font-bold uppercase">
                  ACTIVE
                </span>
              </div>
            </div>
          );
        })}
      </div>

      {/* Creation Modal */}
      {showAddModal && (
        <div className="fixed inset-0 bg-slate-950/80 backdrop-blur-sm flex items-center justify-center z-50 p-4">
          <div className="bg-slate-900 border border-slate-800 rounded-3xl w-full max-w-[440px] p-8 shadow-2xl">
            <h2 className="text-2xl font-bold bg-gradient-to-r from-white to-slate-400 bg-clip-text text-transparent flex items-center gap-2">
              <Building2 size={24} className="text-indigo-400" />
              Form Department
            </h2>

            <div className="mt-6">
              <label className="text-xs text-slate-500 font-bold uppercase tracking-wider block mb-2">Department Name</label>
              <input
                value={newDeptName}
                onChange={(e) => setNewDeptName(e.target.value)}
                placeholder="e.g. Sales, Marketing, Research"
                className="w-full bg-slate-950 border border-slate-800 rounded-xl p-4 text-sm text-slate-100 outline-none focus:border-indigo-500 transition font-medium"
              />
            </div>

            <div className="flex justify-end gap-4 mt-8">
              <button
                onClick={() => {
                  setNewDeptName("");
                  setShowAddModal(false);
                }}
                className="px-5 py-2.5 border border-slate-800 rounded-xl text-xs font-semibold text-slate-400 hover:text-slate-200 transition cursor-pointer"
              >
                Abort
              </button>
              <button
                onClick={handleAddDepartment}
                disabled={saving}
                className="px-5 py-2.5 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white font-semibold text-xs shadow-lg shadow-indigo-600/10 transition cursor-pointer"
              >
                Form Matrix
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
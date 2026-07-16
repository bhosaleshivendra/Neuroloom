import { useState } from "react";
import { X, Building2, BriefcaseBusiness } from "lucide-react";

export default function CreateWorkspaceModal({
  close,
  createWorkspace,
}) {
  const [name, setName] = useState("");
  const [company, setCompany] = useState("");

  const handleCreate = () => {
    if (!name.trim()) {
      alert("Please enter a workspace name.");
      return;
    }

    createWorkspace({
      name,
      company: company || "Untitled Company",
    });
  };

  return (
    <div className="fixed inset-0 bg-slate-950/80 backdrop-blur-md flex items-center justify-center z-50 p-4">
      <div className="w-full max-w-[500px] bg-slate-900 border border-slate-800 rounded-3xl shadow-2xl overflow-hidden flex flex-col">
        {/* Header */}
        <div className="flex justify-between items-center px-8 py-6 border-b border-slate-800">
          <h2 className="text-2xl font-bold bg-gradient-to-r from-white to-slate-400 bg-clip-text text-transparent">
            Form Headquarters
          </h2>
          <button
            onClick={close}
            className="p-2 rounded-xl text-slate-400 hover:text-slate-100 hover:bg-slate-800 border border-slate-800 transition cursor-pointer"
          >
            <X size={18} />
          </button>
        </div>

        {/* Body */}
        <div className="p-8 space-y-6">
          <div>
            <label className="text-xs text-slate-500 font-bold uppercase tracking-wider block mb-2">
              Workspace Identifier / Name
            </label>
            <div className="flex items-center bg-slate-950 border border-slate-850 rounded-xl px-4 py-3.5 focus-within:border-indigo-500 transition">
              <BriefcaseBusiness className="text-slate-500 shrink-0" size={18} />
              <input
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Neuroloom ERP"
                className="ml-3 outline-none flex-1 text-slate-100 bg-transparent text-sm"
              />
            </div>
          </div>

          <div>
            <label className="text-xs text-slate-500 font-bold uppercase tracking-wider block mb-2">
              Company Name
            </label>
            <div className="flex items-center bg-slate-950 border border-slate-850 rounded-xl px-4 py-3.5 focus-within:border-indigo-500 transition">
              <Building2 className="text-slate-500 shrink-0" size={18} />
              <input
                value={company}
                onChange={(e) => setCompany(e.target.value)}
                placeholder="Neuroloom Technologies"
                className="ml-3 outline-none flex-1 text-slate-100 bg-transparent text-sm"
              />
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="px-8 py-6 border-t border-slate-800 flex justify-end gap-4">
          <button
            onClick={close}
            className="px-5 py-2.5 border border-slate-800 rounded-xl text-xs font-semibold text-slate-400 hover:text-slate-200 transition cursor-pointer"
          >
            Cancel
          </button>

          <button
            onClick={handleCreate}
            className="px-5 py-2.5 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white font-semibold text-xs shadow-lg shadow-indigo-600/10 transition cursor-pointer"
          >
            Initialize Headquarters
          </button>
        </div>
      </div>
    </div>
  );
}
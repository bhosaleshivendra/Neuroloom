import { useState } from "react";
import autobots from "../../../src/data/autobots";
import api from "../../../src/utils/axios";
import {
  X,
  Search,
  BriefcaseBusiness,
  Building2,
  Sparkles,
  Star,
  Shield,
} from "lucide-react";

export default function HireAutobotModal({
  employees,
  workspace,
  updateWorkspace,
  close,
}) {
  const [search, setSearch] = useState("");

  const filteredAutobots = autobots.filter((bot) =>
    bot.name.toLowerCase().includes(search.toLowerCase())
  );

  const hire = async (bot) => {
    // bot.id already matches backend schema ('prime', 'bumblebee', etc.)
    const targetId = bot.id <= 8
      ? ["prime", "bumblebee", "ratchet", "ironhide", "jazz", "mirage", "wheeljack", "arcee"][bot.id - 1]
      : String(bot.id);

    const alreadyExists = employees.some(
      (employee) => employee.id === targetId
    );

    if (alreadyExists) {
      alert(`${bot.name} is already active in this workspace.`);
      return;
    }

    try {
      const response = await api.post(`/api/workspaces/${workspace._id}/employees`, {
        id: targetId,
        name: bot.name === "Prime" ? "Optimus Prime" : bot.name,
        role: bot.role,
        department: bot.department,
        managerId: "prime",
        isCustom: false,
        description: bot.description || "",
        skills: bot.skills || [],
        experience: 75,
      });
      
      updateWorkspace(response.data);
      close();
    } catch (err) {
      console.error("Failed to hire Autobot:", err);
      alert(err.response?.data?.message || "Failed to initiate AI employee protocols.");
    }
  };

  return (
    <div className="fixed inset-0 bg-slate-950/80 backdrop-blur-md flex items-center justify-center z-50 p-4">
      <div className="w-full max-w-6xl h-[80vh] bg-slate-900 border border-slate-800 rounded-3xl shadow-2xl overflow-hidden flex flex-col">
        {/* Header */}
        <div className="flex justify-between items-center px-8 py-6 border-b border-slate-800">
          <div>
            <h1 className="text-3xl font-extrabold text-slate-100 bg-gradient-to-r from-white to-slate-400 bg-clip-text text-transparent">
              Hiring Protocol Hub
            </h1>
            <p className="text-slate-400 text-sm mt-1">
              Select and assign preset Autobot personnel to departments.
            </p>
          </div>
          <button
            onClick={close}
            className="p-2 rounded-xl text-slate-400 hover:text-slate-100 hover:bg-slate-800 border border-slate-800 transition cursor-pointer"
          >
            <X size={20} />
          </button>
        </div>

        {/* Search */}
        <div className="p-6 bg-slate-950/30 border-b border-slate-800/50">
          <div className="relative max-w-md">
            <Search
              size={18}
              className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-500"
            />
            <input
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search Autobot database..."
              className="w-full bg-slate-950 border border-slate-800 rounded-2xl py-3.5 pl-12 pr-5 text-slate-100 text-sm outline-none placeholder:text-slate-500 focus:border-indigo-500 transition"
            />
          </div>
        </div>

        {/* Bots */}
        <div className="flex-1 overflow-y-auto p-8 bg-slate-950/20">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {filteredAutobots.map((bot) => {
              const targetId = bot.id <= 8
                ? ["prime", "bumblebee", "ratchet", "ironhide", "jazz", "mirage", "wheeljack", "arcee"][bot.id - 1]
                : String(bot.id);
              const hired = employees.some(
                (employee) => employee.id === targetId
              );

              return (
                <div
                  key={bot.id}
                  className="bg-slate-900/60 border border-slate-800/80 rounded-3xl overflow-hidden hover:border-slate-700 transition flex flex-col justify-between"
                >
                  <div className="bg-slate-950/40 flex justify-center py-6 border-b border-slate-900/60 relative group">
                    <img
                      src={bot.image}
                      alt={bot.name}
                      className="h-32 object-contain filter drop-shadow-[0_0_10px_rgba(99,102,241,0.15)] group-hover:scale-110 transition duration-300"
                    />
                  </div>

                  <div className="p-6 flex-1 flex flex-col justify-between">
                    <div>
                      <h2 className="text-xl font-bold text-slate-100">
                        {bot.name}
                      </h2>
                      <p className="text-[11px] text-slate-400 mt-2 leading-relaxed line-clamp-2">
                        {bot.description}
                      </p>
                      <div className="mt-4 space-y-2 text-xs">
                        <div className="flex items-center gap-2 text-slate-400">
                          <BriefcaseBusiness size={14} className="text-indigo-400" />
                          <span>{bot.role}</span>
                        </div>
                        <div className="flex items-center gap-2 text-slate-400">
                          <Building2 size={14} className="text-emerald-400" />
                          <span>{bot.department}</span>
                        </div>
                      </div>

                      {/* Skills */}
                      {bot.skills?.length > 0 && (
                        <div className="flex flex-wrap gap-1 mt-3">
                          {bot.skills.map((s) => (
                            <span key={s} className="px-2 py-0.5 bg-indigo-500/10 text-indigo-300/80 rounded-md text-[9px] font-bold border border-indigo-500/10">
                              {s}
                            </span>
                          ))}
                        </div>
                      )}
                    </div>

                    <button
                      disabled={hired}
                      onClick={() => hire(bot)}
                      className={`
                        mt-6
                        w-full
                        py-2.5
                        rounded-xl
                        font-semibold
                        text-xs
                        transition
                        ${
                          hired
                            ? "bg-slate-800 text-slate-500 cursor-not-allowed border border-slate-800/30"
                            : "bg-indigo-600 hover:bg-indigo-500 text-white cursor-pointer shadow-lg shadow-indigo-600/10"
                        }
                      `}
                    >
                      {hired ? "✓ Assigned" : "Assign to Dept"}
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}
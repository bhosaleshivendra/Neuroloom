import { useState, useRef, useCallback, useEffect } from "react";
import {
  Cpu, Zap, Save, Trash2, Plus, X, GripVertical,
  UserPlus, Shield, Sparkles, Settings2, ChevronDown,
  ChevronRight, Move, ZoomIn, ZoomOut, Maximize2,
  Bot, Wrench, Star, Target, Eye, EyeOff, Lock,
} from "lucide-react";
import { autobotImages } from "../../src/data/autobots";
import api from "../../src/utils/axios";

// ─── Predefined Autobot IDs (non-custom) ──────────────────────────────────────
const PRESET_IDS = ["prime", "bumblebee", "ratchet", "ironhide", "jazz", "mirage", "wheeljack", "arcee"];

// ─── Preset avatar colors for custom bots ──────────────────────────────────────
const AVATAR_COLORS = [
  "#6366f1", "#8b5cf6", "#a855f7", "#d946ef", "#ec4899",
  "#f43f5e", "#ef4444", "#f97316", "#eab308", "#22c55e",
  "#14b8a6", "#06b6d4", "#3b82f6", "#2563eb", "#7c3aed",
  "#c026d3",
];

// ─── Skill suggestions ─────────────────────────────────────────────────────────
const SKILL_SUGGESTIONS = [
  "JavaScript", "Python", "React", "Node.js", "Machine Learning",
  "Data Analysis", "Writing", "Marketing", "Design", "DevOps",
  "Sales", "Customer Support", "Research", "Strategy", "Finance",
  "Legal", "Automation", "Testing", "SEO", "Database",
  "Project Management", "Communication", "Leadership", "Security",
  "Cloud Architecture", "API Development", "UX Research",
];

// ─── Custom Avatar (SVG-based) ──────────────────────────────────────────────────
function CustomAvatar({ color, name, size = 44 }) {
  const initials = name
    .split(" ")
    .map((w) => w[0])
    .join("")
    .substring(0, 2)
    .toUpperCase();

  return (
    <div
      className="rounded-xl flex items-center justify-center font-black text-white shadow-lg"
      style={{
        width: size,
        height: size,
        background: `linear-gradient(135deg, ${color}, ${color}aa)`,
        fontSize: size * 0.35,
        boxShadow: `0 0 20px ${color}33`,
      }}
    >
      {initials}
    </div>
  );
}

// ─── n8n-style SVG Connection Lines ─────────────────────────────────────────────
function ConnectionLine({ fromX, fromY, toX, toY, animated = true }) {
  const midY = (fromY + toY) / 2;
  const path = `M ${fromX} ${fromY} C ${fromX} ${midY}, ${toX} ${midY}, ${toX} ${toY}`;

  return (
    <g>
      {/* Glow effect */}
      <path
        d={path}
        fill="none"
        stroke="rgba(99,102,241,0.15)"
        strokeWidth="6"
        strokeLinecap="round"
      />
      {/* Main line */}
      <path
        d={path}
        fill="none"
        stroke="rgba(99,102,241,0.4)"
        strokeWidth="2"
        strokeLinecap="round"
        strokeDasharray={animated ? "6 4" : "none"}
      >
        {animated && (
          <animate
            attributeName="stroke-dashoffset"
            from="0"
            to="-20"
            dur="1s"
            repeatCount="indefinite"
          />
        )}
      </path>
      {/* Data packet */}
      {animated && (
        <circle r="3" fill="#818cf8">
          <animateMotion dur="2s" repeatCount="indefinite" path={path} />
        </circle>
      )}
    </g>
  );
}

// ─── Create Custom Autobot Modal ────────────────────────────────────────────────
function CreateAutobotModal({ workspace, updateWorkspace, employees, close }) {
  const [name, setName] = useState("");
  const [role, setRole] = useState("");
  const [department, setDepartment] = useState(workspace?.departments?.[0] || "Engineering");
  const [description, setDescription] = useState("");
  const [skills, setSkills] = useState([]);
  const [skillInput, setSkillInput] = useState("");
  const [experience, setExperience] = useState(50);
  const [avatarColor, setAvatarColor] = useState(AVATAR_COLORS[Math.floor(Math.random() * AVATAR_COLORS.length)]);
  const [personality, setPersonality] = useState("");
  const [managerId, setManagerId] = useState("prime");
  const [saving, setSaving] = useState(false);

  const addSkill = (skill) => {
    const s = skill.trim();
    if (s && !skills.includes(s)) {
      setSkills([...skills, s]);
    }
    setSkillInput("");
  };

  const removeSkill = (skill) => setSkills(skills.filter((s) => s !== skill));

  const handleCreate = async () => {
    if (!name.trim() || !role.trim()) {
      alert("Name and Role are required.");
      return;
    }

    const id = `custom-${name.toLowerCase().replace(/\s+/g, "-")}-${Date.now().toString(36)}`;

    try {
      setSaving(true);
      const response = await api.post(`/api/workspaces/${workspace._id}/employees`, {
        id,
        name: name.trim(),
        role: role.trim(),
        department,
        managerId,
        isCustom: true,
        description: description.trim(),
        skills,
        experience,
        avatarColor,
        personality: personality.trim(),
      });
      updateWorkspace(response.data);
      close();
    } catch (err) {
      console.error("Failed to create custom autobot:", err);
      alert(err.response?.data?.message || "Failed to deploy custom autobot.");
    } finally {
      setSaving(false);
    }
  };

  return (
    <div className="fixed inset-0 bg-slate-950/85 backdrop-blur-lg flex items-center justify-center z-50 p-4">
      <div className="w-full max-w-2xl max-h-[90vh] bg-slate-900 border border-slate-800 rounded-3xl shadow-2xl overflow-hidden flex flex-col">
        {/* Header */}
        <div className="flex justify-between items-center px-8 py-6 border-b border-slate-800">
          <div>
            <h1 className="text-2xl font-extrabold bg-gradient-to-r from-white to-slate-400 bg-clip-text text-transparent flex items-center gap-3">
              <Bot className="text-indigo-400" size={24} />
              Deploy Custom Autobot
            </h1>
            <p className="text-slate-400 text-sm mt-1">
              Create a fully customized AI agent with unique skills and personality.
            </p>
          </div>
          <button
            onClick={close}
            className="p-2 rounded-xl text-slate-400 hover:text-slate-100 hover:bg-slate-800 border border-slate-800 transition cursor-pointer"
          >
            <X size={20} />
          </button>
        </div>

        {/* Body */}
        <div className="flex-1 overflow-y-auto p-8 space-y-6">
          {/* Preview */}
          <div className="flex items-center gap-5 bg-slate-950/50 border border-slate-800/40 rounded-2xl p-5">
            <CustomAvatar color={avatarColor} name={name || "AB"} size={64} />
            <div className="flex-1 min-w-0">
              <h3 className="text-lg font-bold text-slate-100 truncate">{name || "New Autobot"}</h3>
              <p className="text-xs text-indigo-400 font-semibold">{role || "Custom Role"}</p>
              <p className="text-[10px] text-slate-500 mt-1">{department} · Exp: {experience}%</p>
            </div>
            <div className="flex items-center gap-1.5 px-3 py-1.5 bg-indigo-500/10 border border-indigo-500/20 rounded-full">
              <Sparkles size={12} className="text-indigo-400" />
              <span className="text-[10px] text-indigo-400 font-bold">CUSTOM</span>
            </div>
          </div>

          {/* Name + Role */}
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="text-[10px] text-slate-500 font-bold uppercase tracking-wider block mb-1.5">Name *</label>
              <input
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="e.g. Sentinel, Prowl..."
                className="w-full bg-slate-950 border border-slate-800 rounded-xl py-3 px-4 text-sm text-slate-100 outline-none focus:border-indigo-500 transition"
              />
            </div>
            <div>
              <label className="text-[10px] text-slate-500 font-bold uppercase tracking-wider block mb-1.5">Role *</label>
              <input
                value={role}
                onChange={(e) => setRole(e.target.value)}
                placeholder="e.g. Data Scientist"
                className="w-full bg-slate-950 border border-slate-800 rounded-xl py-3 px-4 text-sm text-slate-100 outline-none focus:border-indigo-500 transition"
              />
            </div>
          </div>

          {/* Department + Manager */}
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="text-[10px] text-slate-500 font-bold uppercase tracking-wider block mb-1.5">Department</label>
              <select
                value={department}
                onChange={(e) => setDepartment(e.target.value)}
                className="w-full bg-slate-950 border border-slate-800 rounded-xl py-3 px-4 text-sm text-slate-300 outline-none focus:border-indigo-500 transition cursor-pointer"
              >
                {(workspace?.departments || ["Engineering", "Operations"]).map((d) => (
                  <option key={d} value={d}>{d}</option>
                ))}
              </select>
            </div>
            <div>
              <label className="text-[10px] text-slate-500 font-bold uppercase tracking-wider block mb-1.5">Reports To</label>
              <select
                value={managerId}
                onChange={(e) => setManagerId(e.target.value)}
                className="w-full bg-slate-950 border border-slate-800 rounded-xl py-3 px-4 text-sm text-slate-300 outline-none focus:border-indigo-500 transition cursor-pointer"
              >
                {employees.map((emp) => (
                  <option key={emp.id} value={emp.id}>{emp.name} ({emp.role})</option>
                ))}
              </select>
            </div>
          </div>

          {/* Description */}
          <div>
            <label className="text-[10px] text-slate-500 font-bold uppercase tracking-wider block mb-1.5">Description</label>
            <textarea
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="What does this autobot specialize in?"
              rows={2}
              className="w-full bg-slate-950 border border-slate-800 rounded-xl py-3 px-4 text-sm text-slate-100 outline-none focus:border-indigo-500 transition resize-none"
            />
          </div>

          {/* Skills */}
          <div>
            <label className="text-[10px] text-slate-500 font-bold uppercase tracking-wider block mb-1.5">Skills</label>
            <div className="flex flex-wrap gap-1.5 mb-3">
              {skills.map((s) => (
                <span
                  key={s}
                  className="inline-flex items-center gap-1 px-2.5 py-1 bg-indigo-500/10 text-indigo-300 border border-indigo-500/20 rounded-lg text-[10px] font-bold"
                >
                  {s}
                  <button onClick={() => removeSkill(s)} className="hover:text-red-400 transition cursor-pointer">
                    <X size={10} />
                  </button>
                </span>
              ))}
            </div>
            <div className="flex gap-2">
              <input
                value={skillInput}
                onChange={(e) => setSkillInput(e.target.value)}
                onKeyDown={(e) => e.key === "Enter" && addSkill(skillInput)}
                placeholder="Add a skill..."
                className="flex-1 bg-slate-950 border border-slate-800 rounded-xl py-2.5 px-4 text-xs text-slate-100 outline-none focus:border-indigo-500 transition"
              />
              <button
                onClick={() => addSkill(skillInput)}
                className="px-4 bg-indigo-600 hover:bg-indigo-500 text-white rounded-xl text-xs font-bold transition cursor-pointer"
              >
                Add
              </button>
            </div>
            {/* Quick add */}
            <div className="flex flex-wrap gap-1 mt-2">
              {SKILL_SUGGESTIONS.filter((s) => !skills.includes(s)).slice(0, 12).map((s) => (
                <button
                  key={s}
                  onClick={() => addSkill(s)}
                  className="px-2 py-0.5 text-[9px] bg-slate-800/60 text-slate-400 rounded-md hover:bg-indigo-500/20 hover:text-indigo-300 transition cursor-pointer"
                >
                  + {s}
                </button>
              ))}
            </div>
          </div>

          {/* Experience */}
          <div>
            <div className="flex justify-between items-center mb-1.5">
              <label className="text-[10px] text-slate-500 font-bold uppercase tracking-wider">Experience Level</label>
              <span className="text-xs text-indigo-400 font-bold">{experience}%</span>
            </div>
            <input
              type="range"
              min="1"
              max="100"
              value={experience}
              onChange={(e) => setExperience(Number(e.target.value))}
              className="w-full accent-indigo-500"
            />
            <div className="flex justify-between text-[9px] text-slate-600 mt-1">
              <span>Novice</span>
              <span>Intermediate</span>
              <span>Expert</span>
            </div>
          </div>

          {/* Avatar Color */}
          <div>
            <label className="text-[10px] text-slate-500 font-bold uppercase tracking-wider block mb-2">Avatar Color</label>
            <div className="flex gap-2 flex-wrap">
              {AVATAR_COLORS.map((c) => (
                <button
                  key={c}
                  onClick={() => setAvatarColor(c)}
                  className={`w-7 h-7 rounded-lg transition cursor-pointer ${
                    avatarColor === c ? "ring-2 ring-white ring-offset-2 ring-offset-slate-900 scale-110" : "hover:scale-110"
                  }`}
                  style={{ backgroundColor: c }}
                />
              ))}
            </div>
          </div>

          {/* Personality */}
          <div>
            <label className="text-[10px] text-slate-500 font-bold uppercase tracking-wider block mb-1.5">
              AI Personality Prompt <span className="text-slate-600">(Optional)</span>
            </label>
            <textarea
              value={personality}
              onChange={(e) => setPersonality(e.target.value)}
              placeholder="e.g. You are a highly analytical data scientist who speaks precisely and backs claims with data..."
              rows={2}
              className="w-full bg-slate-950 border border-slate-800 rounded-xl py-3 px-4 text-xs text-slate-100 outline-none focus:border-indigo-500 transition resize-none font-mono"
            />
          </div>
        </div>

        {/* Footer */}
        <div className="px-8 py-5 border-t border-slate-800 flex justify-end gap-3">
          <button
            onClick={close}
            className="px-6 py-3 bg-slate-800 text-slate-300 rounded-xl text-xs font-bold hover:bg-slate-700 transition cursor-pointer"
          >
            Cancel
          </button>
          <button
            onClick={handleCreate}
            disabled={saving || !name.trim() || !role.trim()}
            className="px-8 py-3 bg-indigo-600 hover:bg-indigo-500 text-white rounded-xl text-xs font-bold flex items-center gap-2 transition cursor-pointer disabled:opacity-50 shadow-lg shadow-indigo-600/20"
          >
            <Sparkles size={14} />
            {saving ? "Deploying..." : "Deploy Autobot"}
          </button>
        </div>
      </div>
    </div>
  );
}

// ─── n8n-Style Workflow Node ────────────────────────────────────────────────────
function WorkflowNode({
  employee,
  isSelected,
  isDragOver,
  onSelect,
  onDragStart,
  onDragOver,
  onDrop,
  onDragLeave,
  nodeRef,
}) {
  const isPreset = PRESET_IDS.includes(employee.id);
  const isPrime = employee.id === "prime";
  const imgUrl = isPreset ? autobotImages[employee.id] : null;

  return (
    <div
      ref={nodeRef}
      data-node-id={employee.id}
      draggable={!isPrime}
      onDragStart={(e) => {
        if (isPrime) { e.preventDefault(); return; }
        e.dataTransfer.setData("text/plain", employee.id);
        e.dataTransfer.effectAllowed = "move";
        onDragStart(employee.id);
      }}
      onDragOver={(e) => { e.preventDefault(); onDragOver(employee.id); }}
      onDragLeave={() => onDragLeave()}
      onDrop={(e) => { e.preventDefault(); onDrop(e, employee.id); }}
      onClick={() => onSelect(employee)}
      className={`
        group relative
        w-56
        bg-slate-900/90
        backdrop-blur-xl
        border-2
        rounded-2xl
        p-4
        cursor-pointer
        transition-all
        duration-300
        select-none
        z-10
        ${isPrime
          ? "border-amber-500/50 shadow-[0_0_25px_rgba(245,158,11,0.15)]"
          : isSelected
            ? "border-indigo-500 shadow-[0_0_25px_rgba(99,102,241,0.3)] -translate-y-1"
            : isDragOver
              ? "border-emerald-500/60 shadow-[0_0_20px_rgba(16,185,129,0.2)] scale-105"
              : "border-slate-800/80 hover:border-indigo-500/40 hover:-translate-y-0.5"
        }
      `}
      style={{ minWidth: 224 }}
    >
      {/* Lock badge for Prime */}
      {isPrime && (
        <div className="absolute -top-2.5 -right-2.5 bg-amber-500 text-slate-950 rounded-full p-1 shadow-lg">
          <Lock size={10} />
        </div>
      )}

      {/* Custom badge */}
      {employee.isCustom && (
        <div className="absolute -top-2.5 -right-2.5 bg-indigo-600 text-white rounded-full px-2 py-0.5 text-[8px] font-black shadow-lg">
          CUSTOM
        </div>
      )}

      {/* Top connector dot */}
      {!isPrime && (
        <div className="absolute -top-2 left-1/2 -translate-x-1/2 w-3 h-3 rounded-full bg-slate-800 border-2 border-indigo-500/50 z-20" />
      )}

      {/* Bot connector dot */}
      <div className="absolute -bottom-2 left-1/2 -translate-x-1/2 w-3 h-3 rounded-full bg-slate-800 border-2 border-indigo-500/50 z-20" />

      {/* Content */}
      <div className="flex items-center gap-3">
        <div className="relative shrink-0">
          {imgUrl ? (
            <img
              src={imgUrl}
              alt={employee.name}
              className="w-11 h-11 object-contain bg-slate-950/60 rounded-xl p-0.5"
            />
          ) : (
            <CustomAvatar color={employee.avatarColor || "#6366f1"} name={employee.name} size={44} />
          )}
          <span
            className={`
              absolute -bottom-0.5 -right-0.5 w-3 h-3 rounded-full border-2 border-slate-900
              ${employee.status === "WORKING" ? "bg-amber-500 animate-pulse"
                : employee.status === "THINKING" ? "bg-indigo-500 animate-pulse"
                : "bg-green-500"
              }
            `}
          />
        </div>

        <div className="min-w-0 flex-1">
          <h3 className="text-xs font-bold text-slate-100 truncate">{employee.name}</h3>
          <p className="text-[10px] text-indigo-400 font-semibold truncate mt-0.5">{employee.role}</p>
          <p className="text-[8px] text-slate-500 font-medium truncate">{employee.department}</p>
        </div>

        {!isPrime && (
          <GripVertical size={14} className="text-slate-700 group-hover:text-slate-400 transition shrink-0" />
        )}
      </div>

      {/* Skills bar */}
      {(employee.skills?.length > 0 || employee.experience) && (
        <div className="mt-3 pt-3 border-t border-slate-800/60">
          {employee.skills?.length > 0 && (
            <div className="flex flex-wrap gap-1 mb-2">
              {employee.skills.slice(0, 3).map((s) => (
                <span key={s} className="px-1.5 py-0.5 bg-indigo-500/10 text-indigo-300/80 rounded text-[7px] font-bold">
                  {s}
                </span>
              ))}
              {employee.skills.length > 3 && (
                <span className="px-1.5 py-0.5 text-[7px] text-slate-500 font-bold">
                  +{employee.skills.length - 3}
                </span>
              )}
            </div>
          )}
          {employee.experience && (
            <div className="flex items-center gap-2">
              <div className="flex-1 h-1 bg-slate-800 rounded-full overflow-hidden">
                <div
                  className="h-full rounded-full transition-all duration-500"
                  style={{
                    width: `${employee.experience}%`,
                    background: `linear-gradient(90deg, #6366f1, #a855f7)`,
                  }}
                />
              </div>
              <span className="text-[8px] text-slate-500 font-bold">{employee.experience}%</span>
            </div>
          )}
        </div>
      )}
    </div>
  );
}

// ═══════════════════════════════════════════════════════════════════════════════
// Main Workflow Component
// ═══════════════════════════════════════════════════════════════════════════════
export default function Workflow({ workspace, updateWorkspace }) {
  const [selectedEmpId, setSelectedEmpId] = useState(null);
  const [editingRole, setEditingRole] = useState("");
  const [editingDept, setEditingDept] = useState("");
  const [editingManager, setEditingManager] = useState("");
  const [editingDescription, setEditingDescription] = useState("");
  const [editingSkills, setEditingSkills] = useState([]);
  const [editingExperience, setEditingExperience] = useState(50);
  const [editingPersonality, setEditingPersonality] = useState("");
  const [updating, setUpdating] = useState(false);
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [dragOverId, setDragOverId] = useState(null);
  const [draggingId, setDraggingId] = useState(null);

  // Canvas pan/zoom
  const [scale, setScale] = useState(1);
  const [pan, setPan] = useState({ x: 0, y: 0 });
  const [isPanning, setIsPanning] = useState(false);
  const panStart = useRef({ x: 0, y: 0 });
  const canvasRef = useRef(null);
  const nodesRef = useRef({});

  // SVG connection state
  const [connections, setConnections] = useState([]);

  const employees = workspace?.employees || [];
  const departments = workspace?.departments || [];
  const rootEmployee = employees.find((e) => e.id === "prime") || employees[0];

  // ── Build tree connections after each render ──────────────────────────────
  const computeConnections = useCallback(() => {
    if (!canvasRef.current) return;
    const canvasRect = canvasRef.current.getBoundingClientRect();
    const newConns = [];

    employees.forEach((emp) => {
      if (!emp.managerId || emp.managerId === "") return;
      const parentEl = nodesRef.current[emp.managerId];
      const childEl = nodesRef.current[emp.id];
      if (!parentEl || !childEl) return;

      const parentRect = parentEl.getBoundingClientRect();
      const childRect = childEl.getBoundingClientRect();

      const fromX = (parentRect.left + parentRect.width / 2 - canvasRect.left) / scale;
      const fromY = (parentRect.bottom - canvasRect.top) / scale;
      const toX = (childRect.left + childRect.width / 2 - canvasRect.left) / scale;
      const toY = (childRect.top - canvasRect.top) / scale;

      newConns.push({ key: `${emp.managerId}->${emp.id}`, fromX, fromY, toX, toY });
    });

    setConnections(newConns);
  }, [employees, scale]);

  useEffect(() => {
    // Small delay to let DOM settle
    const timer = setTimeout(computeConnections, 100);
    return () => clearTimeout(timer);
  }, [employees, scale, pan, computeConnections]);

  // ── Selection ──────────────────────────────────────────────────────────────
  const handleSelectEmployee = (emp) => {
    setSelectedEmpId(emp.id);
    setEditingRole(emp.role);
    setEditingDept(emp.department);
    setEditingManager(emp.managerId || "");
    setEditingDescription(emp.description || "");
    setEditingSkills(emp.skills || []);
    setEditingExperience(emp.experience || 50);
    setEditingPersonality(emp.personality || "");
  };

  // ── Save ─────────────────────────────────────────────────────────────────
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
          description: editingDescription,
          skills: editingSkills,
          experience: editingExperience,
          personality: editingPersonality,
        }
      );
      updateWorkspace(response.data);
      setSelectedEmpId(null);
    } catch (err) {
      console.error("Failed to update employee details:", err);
      alert("Failed to sync employee adjustments.");
    } finally {
      setUpdating(false);
    }
  };

  // ── Fire ─────────────────────────────────────────────────────────────────
  const handleFireEmployee = async (empId) => {
    if (empId === "prime") {
      alert("Optimus Prime cannot be decommissioned.");
      return;
    }
    if (!confirm("Decommission this unit from active duty? All subordinates will report to Prime.")) return;

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

  // ── Drag & Drop Reassignment ───────────────────────────────────────────
  const handleReassignManager = async (draggedId, targetManagerId) => {
    if (draggedId === targetManagerId) return;
    if (draggedId === "prime") {
      alert("Optimus Prime is the supreme commander and cannot report to anyone.");
      return;
    }

    // Prevent circular reporting
    let currentManager = targetManagerId;
    while (currentManager) {
      if (currentManager === draggedId) {
        alert("Circular hierarchy detected! Cannot create loops in the command chain.");
        return;
      }
      const managerNode = employees.find((e) => e.id === currentManager);
      currentManager = managerNode ? managerNode.managerId : null;
    }

    try {
      const updatedEmployees = employees.map((emp) => {
        if (emp.id === draggedId) {
          return { ...emp, managerId: targetManagerId };
        }
        return emp;
      });

      const response = await api.put(`/api/workspaces/${workspace._id}/reporting`, {
        employees: updatedEmployees.map((e) => ({ id: e.id, managerId: e.managerId })),
      });
      updateWorkspace(response.data);
    } catch (err) {
      console.error("Failed to update reporting structure:", err);
      alert("Error saving hierarchy changes.");
    }
  };

  // ── Canvas controls ─────────────────────────────────────────────────────
  const zoomIn = () => setScale((s) => Math.min(s + 0.15, 2));
  const zoomOut = () => setScale((s) => Math.max(s - 0.15, 0.3));
  const resetView = () => { setScale(1); setPan({ x: 0, y: 0 }); };

  const handleCanvasMouseDown = (e) => {
    if (e.target === canvasRef.current || e.target.closest("[data-canvas-bg]")) {
      setIsPanning(true);
      panStart.current = { x: e.clientX - pan.x, y: e.clientY - pan.y };
    }
  };

  const handleCanvasMouseMove = (e) => {
    if (isPanning) {
      setPan({ x: e.clientX - panStart.current.x, y: e.clientY - panStart.current.y });
    }
  };

  const handleCanvasMouseUp = () => setIsPanning(false);

  const handleCanvasWheel = (e) => {
    e.preventDefault();
    const delta = e.deltaY > 0 ? -0.08 : 0.08;
    setScale((s) => Math.max(0.3, Math.min(2, s + delta)));
  };

  const selectedEmp = employees.find((e) => e.id === selectedEmpId);
  const selectedIsPreset = selectedEmp && PRESET_IDS.includes(selectedEmp.id);

  // ── Build visual tree recursively ────────────────────────────────────────
  const renderTree = (employee) => {
    if (!employee) return null;
    const children = employees.filter((e) => e.managerId === employee.id);

    return (
      <div className="flex flex-col items-center" key={employee.id}>
        <WorkflowNode
          employee={employee}
          isSelected={selectedEmpId === employee.id}
          isDragOver={dragOverId === employee.id}
          onSelect={handleSelectEmployee}
          onDragStart={(id) => setDraggingId(id)}
          onDragOver={(id) => setDragOverId(id)}
          onDragLeave={() => setDragOverId(null)}
          onDrop={(e, targetId) => {
            const draggedId = e.dataTransfer.getData("text/plain");
            setDragOverId(null);
            setDraggingId(null);
            handleReassignManager(draggedId, targetId);
          }}
          nodeRef={(el) => { nodesRef.current[employee.id] = el; }}
        />

        {children.length > 0 && (
          <div className="flex flex-col items-center w-full mt-16">
            <div className="flex gap-10 relative">
              {children.map((child) => (
                <div key={child.id} className="relative flex flex-col items-center">
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
    <div className="p-6 text-slate-100 h-full flex flex-col min-h-screen overflow-hidden relative">
      {/* Create Custom Autobot Modal */}
      {showCreateModal && (
        <CreateAutobotModal
          workspace={workspace}
          updateWorkspace={updateWorkspace}
          employees={employees}
          close={() => setShowCreateModal(false)}
        />
      )}

      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 shrink-0">
        <div>
          <h1 className="text-3xl font-extrabold bg-gradient-to-r from-white to-slate-400 bg-clip-text text-transparent flex items-center gap-3">
            <Cpu className="text-indigo-400" size={28} />
            Command Structure Matrix
          </h1>
          <p className="mt-1 text-slate-400 text-sm">
            Drag nodes to reassign hierarchy · Click to configure · Prime is locked at the top
          </p>
        </div>

        <div className="flex items-center gap-3">
          {/* Create Custom Bot Button */}
          <button
            onClick={() => setShowCreateModal(true)}
            className="flex items-center gap-2 px-5 py-3 bg-indigo-600 hover:bg-indigo-500 text-white rounded-2xl text-xs font-bold transition cursor-pointer shadow-lg shadow-indigo-600/20"
          >
            <UserPlus size={16} />
            Create Custom Autobot
          </button>

          {/* Zoom controls */}
          <div className="flex items-center gap-1 bg-slate-900 border border-slate-800 rounded-2xl p-1.5">
            <button onClick={zoomOut} className="p-2 hover:bg-slate-800 rounded-xl transition cursor-pointer text-slate-400 hover:text-white">
              <ZoomOut size={14} />
            </button>
            <span className="px-2 text-[10px] text-slate-500 font-bold min-w-[40px] text-center">
              {Math.round(scale * 100)}%
            </span>
            <button onClick={zoomIn} className="p-2 hover:bg-slate-800 rounded-xl transition cursor-pointer text-slate-400 hover:text-white">
              <ZoomIn size={14} />
            </button>
            <button onClick={resetView} className="p-2 hover:bg-slate-800 rounded-xl transition cursor-pointer text-slate-400 hover:text-white">
              <Maximize2 size={14} />
            </button>
          </div>

          {/* Info badge */}
          <div className="flex items-center gap-2 text-xs bg-slate-900 border border-slate-800 p-3 rounded-2xl">
            <Zap size={14} className="text-indigo-400 animate-pulse" />
            <span className="text-slate-500">
              <span className="text-indigo-400 font-bold">{employees.length}</span> units deployed
            </span>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 flex gap-6 mt-6 relative items-start overflow-hidden">
        {/* Canvas */}
        <div
          ref={canvasRef}
          className="flex-1 relative overflow-hidden rounded-3xl border border-slate-800/60 bg-slate-950/30 shadow-inner"
          style={{ minHeight: "calc(100vh - 200px)", cursor: isPanning ? "grabbing" : "grab" }}
          onMouseDown={handleCanvasMouseDown}
          onMouseMove={handleCanvasMouseMove}
          onMouseUp={handleCanvasMouseUp}
          onMouseLeave={handleCanvasMouseUp}
          onWheel={handleCanvasWheel}
        >
          {/* Grid background */}
          <div
            data-canvas-bg="true"
            className="absolute inset-0 pointer-events-none"
            style={{
              backgroundImage: `
                radial-gradient(circle at 1px 1px, rgba(99,102,241,0.08) 1px, transparent 0),
                radial-gradient(ellipse 80% 50% at 50% 0%, rgba(99,102,241,0.04), transparent)
              `,
              backgroundSize: "24px 24px, 100% 100%",
            }}
          />

          {/* SVG connection lines */}
          <svg
            className="absolute inset-0 w-full h-full pointer-events-none z-0"
            style={{ transform: `translate(${pan.x}px, ${pan.y}px) scale(${scale})`, transformOrigin: "0 0" }}
          >
            {connections.map((c) => (
              <ConnectionLine key={c.key} fromX={c.fromX} fromY={c.fromY} toX={c.toX} toY={c.toY} />
            ))}
          </svg>

          {/* Nodes */}
          <div
            className="relative z-10 flex justify-center py-12 px-8"
            style={{
              transform: `translate(${pan.x}px, ${pan.y}px) scale(${scale})`,
              transformOrigin: "0 0",
              transition: isPanning ? "none" : "transform 0.1s ease-out",
            }}
          >
            {rootEmployee && renderTree(rootEmployee)}
          </div>
        </div>

        {/* ─── Inspector Panel ─── */}
        {selectedEmp && (
          <div className="w-80 shrink-0 bg-slate-900/95 backdrop-blur-xl border border-slate-800 rounded-3xl p-6 shadow-2xl space-y-5 select-none overflow-y-auto max-h-[calc(100vh-200px)]">
            <div className="flex items-center justify-between border-b border-slate-800 pb-3">
              <h2 className="text-sm font-bold text-slate-100 flex items-center gap-2">
                <Settings2 size={16} className="text-indigo-400" />
                Node Inspector
              </h2>
              <button
                onClick={() => setSelectedEmpId(null)}
                className="p-1.5 rounded-lg text-slate-500 hover:text-white hover:bg-slate-800 transition cursor-pointer"
              >
                <X size={14} />
              </button>
            </div>

            {/* Profile */}
            <div className="flex items-center gap-4 bg-slate-950/50 p-4 rounded-2xl border border-slate-800/40">
              {selectedIsPreset ? (
                <img
                  src={autobotImages[selectedEmp.id] || autobotImages.prime}
                  alt={selectedEmp.name}
                  className="w-14 h-14 object-contain bg-slate-900 rounded-xl p-1"
                />
              ) : (
                <CustomAvatar color={selectedEmp.avatarColor || "#6366f1"} name={selectedEmp.name} size={56} />
              )}
              <div className="min-w-0">
                <h3 className="font-extrabold text-slate-100 text-sm">{selectedEmp.name}</h3>
                <div className="flex items-center gap-2 mt-1">
                  <span className="inline-flex px-2 py-0.5 rounded-full text-[9px] font-bold bg-indigo-500/10 text-indigo-400 border border-indigo-500/20">
                    {selectedEmp.status || "ONLINE"}
                  </span>
                  {selectedEmp.isCustom && (
                    <span className="inline-flex px-2 py-0.5 rounded-full text-[9px] font-bold bg-violet-500/10 text-violet-400 border border-violet-500/20">
                      CUSTOM
                    </span>
                  )}
                  {selectedEmp.id === "prime" && (
                    <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[9px] font-bold bg-amber-500/10 text-amber-400 border border-amber-500/20">
                      <Lock size={8} /> LOCKED
                    </span>
                  )}
                </div>
              </div>
            </div>

            {/* Editable fields */}
            <div className="space-y-4">
              {/* Role */}
              <div>
                <label className="text-[10px] text-slate-500 font-bold uppercase tracking-wider block mb-1.5">
                  Role Designation
                </label>
                <input
                  value={editingRole}
                  onChange={(e) => setEditingRole(e.target.value)}
                  disabled={selectedEmp.id === "prime"}
                  className="w-full bg-slate-950 border border-slate-800 rounded-xl p-3 text-xs text-slate-200 outline-none focus:border-indigo-500 transition font-medium disabled:opacity-50"
                />
              </div>

              {/* Department */}
              <div>
                <label className="text-[10px] text-slate-500 font-bold uppercase tracking-wider block mb-1.5">Department</label>
                <select
                  value={editingDept}
                  onChange={(e) => setEditingDept(e.target.value)}
                  disabled={selectedEmp.id === "prime"}
                  className="w-full bg-slate-950 border border-slate-800 rounded-xl p-3 text-xs text-slate-300 outline-none focus:border-indigo-500 transition cursor-pointer disabled:opacity-50"
                >
                  {departments.map((dept) => (
                    <option key={dept} value={dept}>{dept}</option>
                  ))}
                  <option value="General">General</option>
                </select>
              </div>

              {/* Manager */}
              {selectedEmp.id !== "prime" && (
                <div>
                  <label className="text-[10px] text-slate-500 font-bold uppercase tracking-wider block mb-1.5">Reports To</label>
                  <select
                    value={editingManager}
                    onChange={(e) => setEditingManager(e.target.value)}
                    className="w-full bg-slate-950 border border-slate-800 rounded-xl p-3 text-xs text-slate-300 outline-none focus:border-indigo-500 transition cursor-pointer"
                  >
                    {employees
                      .filter((e) => e.id !== selectedEmp.id)
                      .map((e) => (
                        <option key={e.id} value={e.id}>{e.name} ({e.role})</option>
                      ))}
                  </select>
                </div>
              )}

              {/* Description */}
              <div>
                <label className="text-[10px] text-slate-500 font-bold uppercase tracking-wider block mb-1.5">Description</label>
                <textarea
                  value={editingDescription}
                  onChange={(e) => setEditingDescription(e.target.value)}
                  rows={2}
                  className="w-full bg-slate-950 border border-slate-800 rounded-xl py-2.5 px-3 text-xs text-slate-200 outline-none focus:border-indigo-500 transition resize-none"
                />
              </div>

              {/* Skills */}
              <div>
                <label className="text-[10px] text-slate-500 font-bold uppercase tracking-wider block mb-1.5">Skills</label>
                <div className="flex flex-wrap gap-1 mb-2">
                  {editingSkills.map((s) => (
                    <span
                      key={s}
                      className="inline-flex items-center gap-1 px-2 py-0.5 bg-indigo-500/10 text-indigo-300 border border-indigo-500/20 rounded text-[9px] font-bold"
                    >
                      {s}
                      <button
                        onClick={() => setEditingSkills(editingSkills.filter((sk) => sk !== s))}
                        className="hover:text-red-400 transition cursor-pointer"
                      >
                        <X size={8} />
                      </button>
                    </span>
                  ))}
                </div>
                <div className="flex gap-1">
                  <input
                    placeholder="Add skill..."
                    onKeyDown={(e) => {
                      if (e.key === "Enter" && e.target.value.trim()) {
                        setEditingSkills([...editingSkills, e.target.value.trim()]);
                        e.target.value = "";
                      }
                    }}
                    className="flex-1 bg-slate-950 border border-slate-800 rounded-lg py-2 px-2.5 text-[10px] text-slate-200 outline-none focus:border-indigo-500 transition"
                  />
                </div>
              </div>

              {/* Experience */}
              <div>
                <div className="flex justify-between items-center mb-1.5">
                  <label className="text-[10px] text-slate-500 font-bold uppercase tracking-wider">Experience</label>
                  <span className="text-[10px] text-indigo-400 font-bold">{editingExperience}%</span>
                </div>
                <input
                  type="range"
                  min="1"
                  max="100"
                  value={editingExperience}
                  onChange={(e) => setEditingExperience(Number(e.target.value))}
                  className="w-full accent-indigo-500"
                />
              </div>

              {/* Personality */}
              {selectedEmp.isCustom && (
                <div>
                  <label className="text-[10px] text-slate-500 font-bold uppercase tracking-wider block mb-1.5">
                    AI Personality
                  </label>
                  <textarea
                    value={editingPersonality}
                    onChange={(e) => setEditingPersonality(e.target.value)}
                    rows={2}
                    className="w-full bg-slate-950 border border-slate-800 rounded-xl py-2.5 px-3 text-[10px] text-slate-200 outline-none focus:border-indigo-500 transition resize-none font-mono"
                  />
                </div>
              )}
            </div>

            {/* Actions */}
            <div className="pt-4 border-t border-slate-800/80 space-y-3">
              <button
                onClick={handleSaveEmployee}
                disabled={updating || selectedEmp.id === "prime"}
                className="w-full bg-indigo-600 hover:bg-indigo-500 text-white rounded-xl py-3 text-xs font-bold flex justify-center items-center gap-2 transition cursor-pointer disabled:opacity-50"
              >
                <Save size={14} />
                Save Configuration
              </button>

              {selectedEmp.id !== "prime" && (
                <button
                  onClick={() => handleFireEmployee(selectedEmp.id)}
                  disabled={updating}
                  className="w-full bg-slate-800 hover:bg-red-500/10 hover:text-red-400 border border-slate-800 rounded-xl py-3 text-xs font-bold flex justify-center items-center gap-2 transition cursor-pointer disabled:opacity-50"
                >
                  <Trash2 size={14} />
                  Decommission Unit
                </button>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

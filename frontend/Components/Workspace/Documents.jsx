import { useState } from "react";
import {
  FileText,
  Search,
  Folder,
  Download,
  Plus,
  Trash2,
  Edit2,
  FileCode,
  Save,
  BookOpen,
  Activity,
  Cpu,
  Sparkles,
  FolderKanban,
  Building2,
  BrainCircuit,
} from "lucide-react";
import api from "../../src/utils/axios";

function DocumentPreview({ type, content, title }) {
  const [activeSlide, setActiveSlide] = useState(0);
  const [previewMode, setPreviewMode] = useState("preview"); // "preview" or "render" for code

  if (type === "code") {
    return (
      <div className="h-full flex flex-col">
        <div className="flex gap-2 border-b border-slate-850 pb-2 mb-4 justify-between items-center">
          <span className="text-[10px] text-slate-500 font-bold uppercase">React Sandbox Core</span>
          <div className="flex gap-1.5 bg-slate-950 p-1 rounded-xl border border-slate-850">
            <button 
              onClick={() => setPreviewMode("preview")}
              className={`px-3 py-1 rounded-lg text-[10px] font-bold transition ${previewMode === "preview" ? "bg-indigo-600 text-white" : "text-slate-400 hover:text-slate-200"}`}
            >
              Source
            </button>
            <button 
              onClick={() => setPreviewMode("render")}
              className={`px-3 py-1 rounded-lg text-[10px] font-bold transition ${previewMode === "render" ? "bg-indigo-600 text-white" : "text-slate-400 hover:text-slate-200"}`}
            >
              Interactive UI
            </button>
          </div>
        </div>
        {previewMode === "preview" ? (
          <pre className="bg-slate-950/80 p-5 rounded-2xl border border-slate-850 font-mono text-[10px] text-indigo-300 overflow-auto whitespace-pre-wrap leading-relaxed select-text flex-1">
            <code>{content}</code>
          </pre>
        ) : (
          <div className="flex-1 bg-slate-950 border border-slate-850 rounded-2xl p-6 flex flex-col items-center justify-center min-h-[250px] relative overflow-hidden">
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(99,102,241,0.06),transparent)] pointer-events-none" />
            <div className="bg-slate-900 border border-slate-800 rounded-3xl p-6 shadow-2xl max-w-sm w-full space-y-4 relative z-10">
              <div className="flex items-center gap-2.5 pb-3 border-b border-slate-800">
                <span className="w-2.5 h-2.5 rounded-full bg-indigo-500 animate-ping" />
                <span className="text-xs font-bold text-slate-200">{title} Preview</span>
              </div>
              <p className="text-[11px] text-slate-400 leading-normal">
                Rendered preview of your generated React Component node. Standard hooks and states are loaded.
              </p>
              <div className="space-y-2.5">
                <input type="text" placeholder="Enter test query..." className="w-full bg-slate-950 border border-slate-800 rounded-xl p-3 text-[10px] text-slate-200 outline-none" />
                <button className="w-full bg-indigo-600 hover:bg-indigo-500 text-white text-xs font-bold py-2.5 rounded-xl transition-all shadow-lg shadow-indigo-600/10 cursor-pointer">
                  Execute Command
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    );
  }

  if (type === "excel" || type === "invoice") {
    const rows = content.split("\n").filter(r => r.includes("|") || r.includes(","));
    const tableData = rows.map(r => r.split(/[|,]/).map(c => c.trim()).filter(Boolean));
    
    const finalTable = tableData.length > 0 ? tableData : [
      ["Operational Node ID", "Sector", "Cognitive Directives", "Status Check", "Cost Matrix"],
      ["TX-01", "Systems Dev", "Generate Database Models", "COMPLETED", "$45.00"],
      ["TX-02", "Cyber Sec", "Audit Firewall Credentials", "COMPLETED", "$120.00"],
      ["TX-03", "HR HQ", "Recruit Operations Lead", "IN_PROGRESS", "$25.00"],
      ["TX-04", "Creative Hub", "Redesign Interface Frame", "COMPLETED", "$75.00"],
      ["Total Accumulative Matrix", "", "", "", "$265.00"]
    ];

    return (
      <div className="h-full flex flex-col space-y-4">
        <div className="flex justify-between items-center border-b border-slate-850 pb-2">
          <span className="text-[10px] text-slate-500 font-bold uppercase">Spreadsheet Allocation Matrix</span>
          <span className="px-2 py-0.5 rounded-full text-[9px] font-bold bg-green-500/10 text-green-400 border border-green-500/25">Live Formulas</span>
        </div>
        <div className="flex-1 overflow-auto rounded-2xl border border-slate-850 bg-slate-950/80">
          <table className="w-full text-left border-collapse text-[10px]">
            <thead>
              <tr className="bg-slate-900 border-b border-slate-800 text-slate-400">
                {finalTable[0]?.map((col, cIdx) => (
                  <th key={cIdx} className="p-3 border-r border-slate-800 font-bold">{col}</th>
                ))}
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-800 text-slate-300">
              {finalTable.slice(1).map((row, rIdx) => {
                const isTotalRow = rIdx === finalTable.length - 2 || row[0]?.toLowerCase().includes("total");
                return (
                  <tr key={rIdx} className={isTotalRow ? "bg-slate-900/60 font-bold text-indigo-400 border-t border-slate-800" : "hover:bg-slate-900/40"}>
                    {row.map((cell, cIdx) => (
                      <td key={cIdx} className="p-3 border-r border-slate-800/60 truncate max-w-[150px]">{cell}</td>
                    ))}
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
        <div className="grid grid-cols-3 gap-4">
          <div className="bg-slate-900/40 border border-slate-850 rounded-2xl p-3 text-center">
            <span className="text-[8px] text-slate-500 font-bold uppercase">Total Columns</span>
            <p className="text-xs font-bold text-slate-200 mt-1">{finalTable[0]?.length || 0}</p>
          </div>
          <div className="bg-slate-900/40 border border-slate-850 rounded-2xl p-3 text-center">
            <span className="text-[8px] text-slate-500 font-bold uppercase">Rows Count</span>
            <p className="text-xs font-bold text-slate-200 mt-1">{finalTable.length}</p>
          </div>
          <div className="bg-slate-900/40 border border-slate-850 rounded-2xl p-3 text-center">
            <span className="text-[8px] text-slate-500 font-bold uppercase">Formulas</span>
            <p className="text-xs font-bold text-indigo-400 mt-1">SUM()</p>
          </div>
        </div>
      </div>
    );
  }

  if (type === "diagram" || type === "workflow") {
    return (
      <div className="h-full flex flex-col space-y-4">
        <div className="flex justify-between items-center border-b border-slate-850 pb-2">
          <span className="text-[10px] text-slate-500 font-bold uppercase">Interactive Flowchart Blueprint</span>
          <span className="w-2 h-2 rounded-full bg-cyan-400 animate-pulse" />
        </div>
        <div className="flex-1 bg-slate-950/80 border border-slate-850 rounded-2xl p-6 flex flex-col items-center justify-center min-h-[250px] relative overflow-hidden">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(99,102,241,0.03),transparent)] pointer-events-none" />
          
          <div className="flex flex-col md:flex-row items-center gap-6 relative z-10 w-full justify-around px-4">
            <div className="bg-slate-900/80 border border-indigo-500/30 rounded-2xl p-3 text-center w-28 shadow-lg transition-all">
              <p className="text-[8px] text-indigo-400 font-bold uppercase">1. Input</p>
              <h4 className="text-[9px] text-slate-200 font-extrabold mt-1 truncate">Commander API</h4>
            </div>

            <div className="w-0.5 h-5 md:w-10 md:h-0.5 bg-indigo-500/30 relative flex items-center justify-center">
              <span className="absolute w-1 h-1 rounded-full bg-indigo-400 animate-ping" />
            </div>

            <div className="bg-slate-900/80 border border-cyan-500/30 rounded-2xl p-3 text-center w-28 shadow-lg transition-all">
              <p className="text-[8px] text-cyan-400 font-bold uppercase">2. Router</p>
              <h4 className="text-[9px] text-slate-200 font-extrabold mt-1 truncate">Prime Core</h4>
            </div>

            <div className="w-0.5 h-5 md:w-10 md:h-0.5 bg-cyan-500/30 relative flex items-center justify-center">
              <span className="absolute w-1 h-1 rounded-full bg-cyan-400 animate-ping [animation-delay:0.3s]" />
            </div>

            <div className="bg-slate-900/80 border border-emerald-500/30 rounded-2xl p-3 text-center w-28 shadow-lg transition-all">
              <p className="text-[8px] text-emerald-400 font-bold uppercase">3. Output</p>
              <h4 className="text-[9px] text-slate-200 font-extrabold mt-1 truncate">Visual Core</h4>
            </div>
          </div>

          <div className="mt-6 text-center bg-slate-900/40 border border-slate-850 p-3 rounded-2xl max-w-sm w-full">
            <span className="text-[8px] text-slate-500 font-bold block uppercase mb-1">Blueprint Spec</span>
            <p className="text-[9px] text-slate-400 leading-normal truncate">
              {content}
            </p>
          </div>
        </div>
      </div>
    );
  }

  if (type === "powerpoint") {
    const slides = content.split(/slide:/i).map(s => s.trim()).filter(Boolean);
    const finalSlides = slides.length > 0 ? slides : [
      "# Executive Directive Slide\nOptimus Prime briefing on quarterly operations metrics.",
      "# Operational Target\nAchieve 98% task automation through Transformers command coordination.",
      "# Security Analysis\nFirewall locks loaded. Ironhide reports zero database matrix leaks."
    ];

    return (
      <div className="h-full flex flex-col space-y-4">
        <div className="flex justify-between items-center border-b border-slate-850 pb-2">
          <span className="text-[10px] text-slate-500 font-bold uppercase">Hologram Slide Deck</span>
          <span className="text-[10px] text-slate-400 font-semibold">Slide {activeSlide + 1} / {finalSlides.length}</span>
        </div>
        <div className="flex-1 bg-slate-950/80 border border-slate-850 rounded-3xl p-6 flex flex-col justify-between min-h-[250px] relative overflow-hidden transition-all duration-300">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(99,102,241,0.06),transparent)] pointer-events-none" />
          <div className="prose prose-invert max-w-none text-xs font-semibold leading-relaxed text-slate-200">
            <div className="whitespace-pre-line leading-relaxed font-sans text-xs">
              {finalSlides[activeSlide]}
            </div>
          </div>
          
          <div className="flex justify-between items-center pt-4 border-t border-slate-900 mt-4">
            <button 
              disabled={activeSlide === 0}
              onClick={() => setActiveSlide(prev => Math.max(0, prev - 1))}
              className="px-3 py-1.5 border border-slate-800 text-[9px] font-bold rounded-xl text-slate-400 hover:text-slate-200 hover:border-slate-700 transition cursor-pointer disabled:opacity-30"
            >
              Prev
            </button>
            <div className="flex gap-1">
              {finalSlides.map((_, sIdx) => (
                <span key={sIdx} className={`w-1.5 h-1.5 rounded-full transition-all ${sIdx === activeSlide ? "bg-indigo-500 w-3" : "bg-slate-800"}`} />
              ))}
            </div>
            <button 
              disabled={activeSlide === finalSlides.length - 1}
              onClick={() => setActiveSlide(prev => Math.min(finalSlides.length - 1, prev + 1))}
              className="px-3 py-1.5 bg-indigo-600 hover:bg-indigo-500 text-white text-[9px] font-bold rounded-xl transition cursor-pointer disabled:opacity-30"
            >
              Next
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="h-full flex flex-col space-y-4">
      <div className="flex justify-between items-center border-b border-slate-850 pb-2">
        <span className="text-[10px] text-slate-500 font-bold uppercase">Visual Hologram Document</span>
        <span className="text-[10px] text-slate-400 font-medium">Page 1 / 1</span>
      </div>
      <div className="flex-1 bg-slate-950/80 border border-slate-850 rounded-2xl p-6 overflow-y-auto text-slate-300 prose prose-invert max-w-none text-xs font-medium">
        <div className="border-b border-slate-900 pb-3 mb-3">
          <h2 className="text-sm font-extrabold text-slate-100">{title}</h2>
          <p className="text-[9px] text-slate-500 mt-1 font-bold">DEPARTMENT REPORT ARCHIVE • CONFIDENTIAL SECURITY MATRIX</p>
        </div>
        <div className="whitespace-pre-line leading-relaxed font-sans">
          {content}
        </div>
      </div>
    </div>
  );
}

export default function Documents({
  workspace,
  documents,
  setDocuments,
  projects,
}) {
  const [search, setSearch] = useState("");
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [title, setTitle] = useState("");
  const [type, setType] = useState("markdown");
  const [projectId, setProjectId] = useState("");
  
  // Editor State
  const [activeDoc, setActiveDoc] = useState(null);
  const [editorTitle, setEditorTitle] = useState("");
  const [editorContent, setEditorContent] = useState("");

  const handleCreateDocument = async () => {
    if (!title.trim()) {
      alert("Please enter a document title.");
      return;
    }
    if (!projectId) {
      alert("Please associate a project context.");
      return;
    }

    try {
      const response = await api.post("/api/documents", {
        title,
        type,
        workspaceId: workspace._id,
        projectId,
        content: `## ${title}\nInitialized in core memory. Start typing...`,
      });

      setDocuments([response.data, ...documents]);
      resetCreateForm();
    } catch (err) {
      console.error("Failed to create document:", err);
      alert(err.response?.data?.message || "Failed to catalog document in memory core.");
    }
  };

  const handleOpenEditor = (doc) => {
    setActiveDoc(doc);
    setEditorTitle(doc.title);
    setEditorContent(doc.content || "");
  };

  const handleSaveDocument = async () => {
    if (!activeDoc) return;
    try {
      const response = await api.put(`/api/documents/${activeDoc._id}`, {
        title: editorTitle,
        content: editorContent,
      });

      setDocuments(documents.map(d => (d._id === activeDoc._id ? response.data : d)));
      setActiveDoc(null);
    } catch (err) {
      console.error("Failed to save document:", err);
      alert("Error writing to memory bank.");
    }
  };

  const handleDeleteDocument = async (docId, e) => {
    e.stopPropagation();
    if (!confirm("Confirm permanent removal of this file from the memory vault?")) return;

    try {
      await api.delete(`/api/documents/${docId}`);
      setDocuments(documents.filter(d => d._id !== docId));
    } catch (err) {
      console.error("Failed to delete document:", err);
    }
  };

  const resetCreateForm = () => {
    setTitle("");
    setType("markdown");
    setProjectId("");
    setShowCreateModal(false);
  };

  const filteredDocs = (documents || []).filter(doc =>
    doc.title.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="p-8 text-slate-100 space-y-8">
      {/* Header */}
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-4xl font-extrabold bg-gradient-to-r from-white to-slate-400 bg-clip-text text-transparent">
            Secure Memory Vault
          </h1>
          <p className="text-slate-400 mt-2 text-sm">
            Access files, AI guides, and departmental outputs stored in the database.
          </p>
        </div>

        <button
          onClick={() => setShowCreateModal(true)}
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
          Catalog Document
        </button>
      </div>

      {/* Filters & Actions */}
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div className="relative w-full sm:w-96">
          <Search className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-slate-500" size={18} />
          <input
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search memory records..."
            className="w-full rounded-2xl border border-slate-800 bg-slate-900 px-12 py-3.5 text-slate-100 text-sm outline-none placeholder:text-slate-500 focus:border-indigo-500 transition"
          />
        </div>
      </div>

      {/* List */}
      {filteredDocs.length === 0 ? (
        <div className="mt-10 overflow-hidden rounded-3xl border border-slate-800 bg-slate-900/40 p-20 text-center">
          <FileText size={60} className="mx-auto text-slate-700 mb-6 animate-pulse" />
          <h2 className="text-2xl font-bold text-slate-300">Memory Vault Empty</h2>
          <p className="text-slate-500 text-sm mt-3">No document cores have been cataloged yet.</p>
        </div>
      ) : (
        <div className="overflow-hidden rounded-3xl border border-slate-800/80 bg-slate-900/60 backdrop-blur-md shadow-lg">
          <div className="grid grid-cols-12 gap-4 px-8 py-5 text-xs font-bold uppercase tracking-wider text-slate-500 border-b border-slate-800">
            <span className="col-span-5">Record Name</span>
            <span className="col-span-3">Assigned Project</span>
            <span className="col-span-2">Format</span>
            <span className="col-span-2 text-right">Actions</span>
          </div>

          <div className="divide-y divide-slate-800/60">
            {filteredDocs.map((doc) => {
              const projectObj = projects.find(p => p._id === doc.project || p.id === doc.project);
              return (
                <div
                  key={doc._id}
                  onClick={() => handleOpenEditor(doc)}
                  className="grid grid-cols-12 gap-4 px-8 py-5 items-center hover:bg-slate-950/40 transition cursor-pointer"
                >
                  <div className="col-span-5 flex items-center gap-4">
                    <div className="inline-flex h-12 w-12 items-center justify-center rounded-2xl bg-indigo-950/40 border border-indigo-500/20 text-indigo-400">
                      {doc.type === "code" ? <FileCode size={20} /> : <FileText size={20} />}
                    </div>
                    <div>
                      <p className="font-bold text-slate-200 text-sm truncate">{doc.title}</p>
                      <p className="text-[11px] text-slate-500 mt-0.5">Updated: {new Date(doc.updatedAt).toLocaleString()}</p>
                    </div>
                  </div>

                  <span className="col-span-3 text-slate-400 font-semibold text-xs truncate">
                    {projectObj ? projectObj.name : "Global Workspace"}
                  </span>

                  <span className="col-span-2">
                    <span className="px-2.5 py-0.5 rounded-full text-[10px] font-bold bg-slate-950 border border-slate-800 text-slate-400 uppercase">
                      {doc.type}
                    </span>
                  </span>

                  <div className="col-span-2 text-right flex items-center justify-end gap-2" onClick={e => e.stopPropagation()}>
                    <button
                      onClick={() => handleOpenEditor(doc)}
                      className="p-2 bg-slate-850 hover:bg-slate-800 text-slate-400 hover:text-slate-100 rounded-xl transition cursor-pointer"
                    >
                      <Edit2 size={12} />
                    </button>
                    <button
                      onClick={(e) => handleDeleteDocument(doc._id, e)}
                      className="p-2 bg-slate-850 hover:bg-red-500/10 text-slate-500 hover:text-red-400 rounded-xl transition cursor-pointer"
                    >
                      <Trash2 size={12} />
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}

      {/* Creation Modal */}
      {showCreateModal && (
        <div className="fixed inset-0 bg-slate-950/80 backdrop-blur-sm flex items-center justify-center z-50 p-4">
          <div className="bg-slate-900 border border-slate-800 rounded-3xl w-full max-w-[500px] p-8 shadow-2xl">
            <h2 className="text-2xl font-bold bg-gradient-to-r from-white to-slate-400 bg-clip-text text-transparent">
              Catalog Record
            </h2>

            <input
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="Record Title (e.g. System Roadmap)"
              className="w-full bg-slate-950 border border-slate-800 rounded-xl p-4 mt-6 text-sm text-slate-100 outline-none focus:border-indigo-500 transition"
            />

            <div className="grid grid-cols-2 gap-4 mt-4">
              <div>
                <label className="text-xs text-slate-500 font-bold block mb-1.5">FORMAT</label>
                <select
                  value={type}
                  onChange={(e) => setType(e.target.value)}
                  className="w-full bg-slate-950 border border-slate-800 rounded-xl p-3.5 text-xs text-slate-300 outline-none"
                >
                  <option value="markdown">Markdown (.md)</option>
                  <option value="code">React / Code (.jsx)</option>
                  <option value="pdf">Holographic PDF (.pdf)</option>
                  <option value="diagram">Visual Diagram</option>
                  <option value="invoice">invoice/Invoice</option>
                </select>
              </div>

              <div>
                <label className="text-xs text-slate-500 font-bold block mb-1.5">PROJECT</label>
                <select
                  value={projectId}
                  onChange={(e) => setProjectId(e.target.value)}
                  className="w-full bg-slate-950 border border-slate-800 rounded-xl p-3.5 text-xs text-slate-300 outline-none"
                >
                  <option value="">Select Project Target</option>
                  {projects.map((project) => (
                    <option key={project._id} value={project._id}>
                      {project.name}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            <div className="flex justify-end gap-4 mt-8">
              <button
                onClick={resetCreateForm}
                className="px-5 py-2.5 border border-slate-800 rounded-xl text-xs font-semibold text-slate-400 hover:text-slate-200 transition"
              >
                Abort
              </button>
              <button
                onClick={handleCreateDocument}
                className="px-5 py-2.5 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white font-semibold text-xs shadow-lg shadow-indigo-600/10 transition"
              >
                Create Record
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Editor Modal */}
      {activeDoc && (
        <div className="fixed inset-0 bg-slate-950/90 backdrop-blur-md flex items-center justify-center z-50 p-4">
          <div className="bg-slate-900 border border-slate-800 rounded-3xl w-full max-w-5xl h-[85vh] flex flex-col justify-between shadow-2xl">
            <div className="px-8 py-5 border-b border-slate-800 flex items-center justify-between">
              <div className="flex items-center gap-3">
                <BookOpen size={18} className="text-indigo-400" />
                <input
                  value={editorTitle}
                  onChange={e => setEditorTitle(e.target.value)}
                  className="bg-transparent font-bold text-slate-200 text-lg outline-none border-b border-transparent hover:border-slate-800 focus:border-indigo-500 transition px-2 py-0.5"
                />
              </div>
              <span className="text-slate-500 text-xs font-bold uppercase">Memory Bank Editor</span>
            </div>

            <div className="flex-1 p-6 flex gap-6 overflow-hidden">
              {/* Text Area Input */}
              <div className="flex-1 flex flex-col h-full">
                <textarea
                  value={editorContent}
                  onChange={e => setEditorContent(e.target.value)}
                  className="w-full flex-1 bg-slate-950 border border-slate-850 rounded-2xl p-6 text-slate-200 text-xs font-mono outline-none resize-none focus:border-slate-800 transition"
                />
              </div>

              {/* Live Preview Pane */}
              <div className="flex-1 bg-slate-950/40 border border-slate-850 rounded-2xl p-6 overflow-y-auto text-slate-300 prose prose-invert max-w-none text-xs">
                <DocumentPreview type={activeDoc.type} content={editorContent} title={editorTitle} />
              </div>
            </div>

            <div className="px-8 py-5 border-t border-slate-800 flex justify-end gap-4">
              <button
                onClick={() => setActiveDoc(null)}
                className="px-5 py-2.5 border border-slate-800 rounded-xl text-xs font-semibold text-slate-400 hover:text-slate-200 transition"
              >
                Close Editor
              </button>
              <button
                onClick={handleSaveDocument}
                className="px-5 py-2.5 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white font-semibold text-xs flex items-center gap-2 shadow-lg shadow-indigo-600/10 transition"
              >
                <Save size={14} />
                Save to Database
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

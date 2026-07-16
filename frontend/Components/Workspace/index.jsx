import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

import WorkspaceSidebar from "./WorkspaceSidebar";
import api from "../../src/utils/axios";

import Overview from "./Overview";
import Employees from "./Employees";
import Tasks from "./Tasks";
import Departments from "./Departments";
import Analytics from "./Analytics";
import Settings from "./Settings";
import Plugins from "./Plugins";
import Workflow from "./Workflow";
import Documents from "./Documents";
import Projects from "./Projects";

export default function Workspace({
  workspace,
  workspaces,
  setWorkspaces,
  setCurrentWorkspaceId,
  activeProjectId,
  setActiveProjectId,
}) {
  const { id } = useParams();

  const currentWorkspace =
    workspace ||
    workspaces.find(
      (w) => w._id === id || w.id === Number(id) || w.id === id
    );

  const [tasks, setTasks] = useState([]);
  const [projects, setProjects] = useState([]);
  const [documents, setDocuments] = useState([]);
  const [loadingData, setLoadingData] = useState(true);
  const [activeTab, setActiveTab] = useState("overview");

  useEffect(() => {
    if (currentWorkspace) {
      setCurrentWorkspaceId(currentWorkspace._id || currentWorkspace.id);
    }
  }, [currentWorkspace]);

  useEffect(() => {
    if (!currentWorkspace?._id) return;

    const fetchWorkspaceData = async () => {
      try {
        setLoadingData(true);
        const [tasksRes, projectsRes, docsRes] = await Promise.all([
          api.get(`/api/tasks?workspaceId=${currentWorkspace._id}`),
          api.get(`/api/projects?workspaceId=${currentWorkspace._id}`),
          api.get(`/api/documents?workspaceId=${currentWorkspace._id}`),
        ]);
        setTasks(tasksRes.data);
        setProjects(projectsRes.data);
        setDocuments(docsRes.data);
      } catch (err) {
        console.error("Failed to fetch workspace data:", err);
      } finally {
        setLoadingData(false);
      }
    };

    fetchWorkspaceData();
  }, [currentWorkspace?._id]);

  const updateEmployees = (employees) => {
    setWorkspaces(
      workspaces.map((workspace) =>
        (workspace._id === currentWorkspace._id || workspace.id === currentWorkspace.id)
          ? {
               ...workspace,
               employees,
             }
          : workspace
      )
    );
  };

  const updateTasks = (tasksList) => {
    setTasks(tasksList);
  };

  const updateWorkspaceObj = (updatedWorkspace) => {
    setWorkspaces(
      workspaces.map((w) =>
        (w._id === updatedWorkspace._id || w.id === updatedWorkspace.id)
          ? updatedWorkspace
          : w
      )
    );
  };

  const activeProjectObj = projects.find(p => p._id === activeProjectId) || null;

  const displayedTasks = activeProjectId
    ? tasks.filter(t => t.project === activeProjectId || t.project?._id === activeProjectId)
    : tasks;

  const displayedDocuments = activeProjectId
    ? documents.filter(d => d.project === activeProjectId || d.project?._id === activeProjectId)
    : documents;

  return (
    <div className="flex h-full bg-slate-950">
      {/* Workspace Sidebar */}
      <WorkspaceSidebar
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        projects={projects}
        activeProjectId={activeProjectId}
        setActiveProjectId={setActiveProjectId}
      />

      {/* Content */}
      <div className="flex-1 overflow-y-auto bg-slate-950/40 border-l border-slate-900/50">
        {loadingData ? (
          <div className="flex items-center justify-center h-full text-indigo-400">
            <div className="flex flex-col items-center gap-3">
              <span className="w-10 h-10 rounded-full border-4 border-indigo-600 border-t-transparent animate-spin"></span>
              <span className="text-sm font-semibold tracking-wider animate-pulse">SYNCHRONIZING OPERATIONAL DATA...</span>
            </div>
          </div>
        ) : (
          <>
            {activeTab === "overview" && (
              <Overview
                workspace={{
                  ...currentWorkspace,
                  tasks: displayedTasks,
                  projects,
                  documents: displayedDocuments,
                }}
                activeProject={activeProjectObj}
              />
            )}

            {activeTab === "employees" && (
              <Employees
                employees={currentWorkspace.employees}
                setEmployees={updateEmployees}
                workspace={currentWorkspace}
                updateWorkspace={updateWorkspaceObj}
              />
            )}

            {activeTab === "tasks" && (
              <Tasks
                workspace={currentWorkspace}
                tasks={displayedTasks}
                setTasks={updateTasks}
                projects={projects}
                activeProjectId={activeProjectId}
              />
            )}

            {activeTab === "projects" && (
              <Projects
                workspace={currentWorkspace}
                projects={projects}
                setProjects={setProjects}
                activeProjectId={activeProjectId}
                setActiveProjectId={setActiveProjectId}
                setActiveTab={setActiveTab}
              />
            )}

            {activeTab === "departments" && (
              <Departments
                workspace={currentWorkspace}
                updateWorkspace={updateWorkspaceObj}
              />
            )}

            {activeTab === "workflow" && (
              <Workflow
                workspace={currentWorkspace}
                updateWorkspace={updateWorkspaceObj}
              />
            )}

            {activeTab === "documents" && (
              <Documents
                workspace={currentWorkspace}
                documents={displayedDocuments}
                setDocuments={setDocuments}
                projects={projects}
                activeProjectId={activeProjectId}
              />
            )}

            {activeTab === "analytics" && (
              <Analytics
                workspace={currentWorkspace}
                tasks={displayedTasks}
                projects={projects}
                documents={displayedDocuments}
                activeProject={activeProjectObj}
              />
            )}

            {activeTab === "settings" && (
              <Settings
                workspace={currentWorkspace}
                updateWorkspace={updateWorkspaceObj}
              />
            )}

            {activeTab === "plugins" && (
              <Plugins
                workspace={currentWorkspace}
                updateWorkspace={updateWorkspaceObj}
              />
            )}
          </>
        )}
      </div>
    </div>
  );
}
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

import WorkspaceSidebar from "./WorkspaceSidebar";

import Overview from "./Overview";
import Employees from "./Employees";
import Tasks from "./Tasks";
import Departments from "./Departments";
import Analytics from "./Analytics";
import Settings from "./Settings";

export default function Workspace({
  workspace,
  workspaces,
  setWorkspaces,
  setCurrentWorkspaceId,
}) {

  const { id } = useParams();

  const currentWorkspace =
    workspace ||
    workspaces.find(
      (workspace) => workspace.id === Number(id)
    );

  useEffect(() => {

    if (currentWorkspace) {

      setCurrentWorkspaceId(currentWorkspace.id);

    }

  }, [currentWorkspace]);



  const [activeTab, setActiveTab] = useState("overview");



  if (!currentWorkspace) {

    return (

      <div className="flex h-full items-center justify-center">

        <h1 className="text-3xl font-bold">

          Workspace Not Found

        </h1>

      </div>

    );

  }



  const updateEmployees = (employees) => {

    setWorkspaces(

      workspaces.map((workspace) =>

        workspace.id === currentWorkspace.id

          ? {

              ...workspace,

              employees,

            }

          : workspace

      )

    );

  };



  const updateTasks = (tasks) => {

    setWorkspaces(

      workspaces.map((workspace) =>

        workspace.id === currentWorkspace.id

          ? {

              ...workspace,

              tasks,

            }

          : workspace

      )

    );

  };



  return (

    <div className="flex h-full">

      {/* Workspace Sidebar */}

      <WorkspaceSidebar

        activeTab={activeTab}

        setActiveTab={setActiveTab}

      />



      {/* Content */}

      <div className="flex-1 overflow-y-auto bg-slate-100">

        {activeTab === "overview" && (

          <Overview

            workspace={currentWorkspace}

          />

        )}



        {activeTab === "employees" && (

          <Employees

            employees={currentWorkspace.employees}

            setEmployees={updateEmployees}

          />

        )}



        {activeTab === "tasks" && (

          <Tasks

            workspace={currentWorkspace}

            tasks={currentWorkspace.tasks}

            setTasks={updateTasks}

          />

        )}



        {activeTab === "departments" && (

          <Departments

            workspace={currentWorkspace}

          />

        )}



        {activeTab === "analytics" && (

          <Analytics

            workspace={currentWorkspace}

          />

        )}



        {activeTab === "settings" && (

          <Settings

            workspace={currentWorkspace}

          />

        )}

      </div>

    </div>

  );

}
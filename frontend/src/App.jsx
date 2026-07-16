import "./App.css";

import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { useState } from "react";

import Header from "../Components/Header";
import Sidebar from "../Components/Navbar";

import Home from "../Components/Home";
import Projects from "../Components/Projects";

import Workspace from "../Components/Workspace";

import Analytics from "../Components/Analytics";
import Settings from "../Components/Settings";

import LoginSignup from "../Components/Pages/LoginSignup";

import AIAssistant from "../Components/AIAssistant";

import prime from "../src/assets/autobots/prime.png";

function DashboardLayout() {

  const [workspaces, setWorkspaces] = useState([
    {
      id: 1,

      name: "Neuroloom ERP",

      company: "Neuroloom Technologies",

      employees: [
        {
          id: 1,

          originalId: 1,

          name: "Prime",

          image: prime,

          role: "Chief AI Officer",

          department: "Leadership",
        },
      ],

      tasks: [],

      departments: [
        "Leadership",
        "Engineering",
        "Operations",
      ],

      createdAt: new Date(),
    },
  ]);

  /*
      Current opened workspace.
      This will later come from React Router.
  */

  const [currentWorkspaceId, setCurrentWorkspaceId] = useState(1);

  const currentWorkspace =
    workspaces.find(
      (workspace) => workspace.id === currentWorkspaceId
    ) || null;

  return (

    <div className="flex h-screen overflow-hidden bg-slate-100">

      {/* Sidebar */}

      <Sidebar />

      {/* Main */}

      <div className="flex flex-1 flex-col overflow-hidden">

        <Header
          workspace={currentWorkspace}
        />

        <main className="flex-1 overflow-y-auto">

          <Routes>

            <Route
              path="/"
              element={
                <Home
                  workspaces={workspaces}
                  setCurrentWorkspaceId={setCurrentWorkspaceId}
                />
              }
            />

            <Route
  path="/projects"
  element={
    <Projects
      workspaces={workspaces}
      setWorkspaces={setWorkspaces}
      setCurrentWorkspaceId={setCurrentWorkspaceId}
    />
  }
/>

            <Route
              path="/workspace/:id"
              element={
                <Workspace
                  workspaces={workspaces}
                  setWorkspaces={setWorkspaces}
                  setCurrentWorkspaceId={setCurrentWorkspaceId}
                />
              }
            />

            <Route
              path="/analytics"
              element={<Analytics />}
            />

            <Route
              path="/settings"
              element={<Settings />}
            />

          </Routes>

        </main>

      </div>

      <AIAssistant />

    </div>

  );

}

function AuthLayout() {

  return <LoginSignup />;

}

export default function App() {

  return (

    <Router>

      <Routes>

        <Route
          path="/sign-in"
          element={<AuthLayout />}
        />

        <Route
          path="/*"
          element={<DashboardLayout />}
        />

      </Routes>

    </Router>

  );

}
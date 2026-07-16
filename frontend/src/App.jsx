import "./App.css";

import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { useState } from "react";

import Header from "../Components/Header";
import Navbar from "../Components/Navbar";

import Home from "../Components/Home";
import Projects from "../Components/Projects";
import Analytics from "../Components/Analytics";
import Settings from "../Components/Settings";

import Workspace from "../Components/Workspace";

import LoginSignup from "../Components/Pages/LoginSignup";
import AIAssistant from "../Components/AIAssistant";

import prime from "./assets/autobots/prime.png";

const DashboardLayout = () => {
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
          role: "Chief Autobot",
          department: "Leadership",
        },
      ],

      tasks: [],
      departments: [],
    },
  ]);

  const [currentWorkspaceId, setCurrentWorkspaceId] = useState(null);

  const currentWorkspace =
    workspaces.find((w) => w.id === currentWorkspaceId) || null;

  const insideWorkspace = currentWorkspace !== null;

  return (
    <div className="flex h-screen bg-slate-100 overflow-hidden">
      {/* Sidebar */}

      {!insideWorkspace && <Navbar />}

      {/* Main */}

      <div className="flex flex-1 flex-col overflow-hidden">
        <Header
          workspace={currentWorkspace}
          employees={currentWorkspace?.employees || []}
        />

        <main className="flex-1 overflow-y-auto bg-slate-100">
          <Routes>
            <Route path="/" element={<Home />} />

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
                  workspace={currentWorkspace}
                  setCurrentWorkspaceId={setCurrentWorkspaceId}
                  workspaces={workspaces}
                  setWorkspaces={setWorkspaces}
                />
              }
            />

            <Route path="/analytics" element={<Analytics />} />

            <Route path="/settings" element={<Settings />} />
          </Routes>
        </main>
      </div>

      <AIAssistant workspace={currentWorkspace} />
    </div>
  );
};

function AuthLayout() {
  return <LoginSignup />;
}

export default function App() {
  return (
    <Router>
      <Routes>
        <Route path="/sign-in" element={<AuthLayout />} />

        <Route path="/*" element={<DashboardLayout />} />
      </Routes>
    </Router>
  );
}
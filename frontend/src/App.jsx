import "./App.css";

import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import { useState, useEffect } from "react";

import Header from "../Components/Header";
import Sidebar from "../Components/Navbar";

import Home from "../Components/Home";
import Projects from "../Components/Projects";

import Workspace from "../Components/Workspace";

import Analytics from "../Components/Analytics";
import Settings from "../Components/Settings";

import LoginSignup from "../Components/Pages/LoginSignup";
import LoadingScreen from "../Components/Pages/LoadingScreen";

import AIAssistant from "../Components/AIAssistant";

import { useAuth, AuthProvider } from "./context/AuthContext.jsx";
import api from "./utils/axios";

import prime from "./assets/autobots/prime.png";

function DashboardLayout() {
  const [workspaces, setWorkspaces] = useState([]);
  const [currentWorkspaceId, setCurrentWorkspaceId] = useState(null);
  const [activeProjectId, setActiveProjectId] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchWorkspaces = async () => {
      try {
        const response = await api.get("/api/workspaces");
        if (response.data.length > 0) {
          setWorkspaces(response.data);
          setCurrentWorkspaceId(response.data[0]._id);
        } else {
          // If no workspaces exist, create a default one
          const defaultResponse = await api.post("/api/workspaces", {
            name: "Neuroloom ERP",
            company: "Neuroloom Technologies",
          });
          setWorkspaces([defaultResponse.data]);
          setCurrentWorkspaceId(defaultResponse.data._id);
        }
      } catch (err) {
        console.error("Failed to load workspaces:", err);
      } finally {
        setLoading(false);
      }
    };
    fetchWorkspaces();
  }, []);

  // Reset active project context when switching workspaces
  useEffect(() => {
    setActiveProjectId(null);
  }, [currentWorkspaceId]);

  const currentWorkspace =
    workspaces.find(
      (workspace) => workspace._id === currentWorkspaceId || workspace.id === currentWorkspaceId
    ) || null;

  if (loading) {
    return <LoadingScreen />;
  }

  return (

    <div className="flex h-screen overflow-hidden bg-slate-950">

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
                  activeProjectId={activeProjectId}
                  setActiveProjectId={setActiveProjectId}
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

      <AIAssistant workspace={currentWorkspace} projectId={activeProjectId} />

    </div>

  );

}

function AuthLayout() {

  return <LoginSignup />;

}

// Protected Route Component
function ProtectedRoute({ children }) {
  const { isAuthenticated, isLoading } = useAuth();

  if (isLoading) {
    return <div className="flex items-center justify-center h-screen">Loading...</div>;
  }

  if (!isAuthenticated) {
    return <Navigate to="/sign-in" replace />;
  }

  return children;
}

function AppRoutes() {
  const { isAuthenticated } = useAuth();

  return (
    <Routes>
      <Route
        path="/sign-in"
        element={<AuthLayout />}
      />

      <Route
        path="/*"
        element={
          <ProtectedRoute>
            <DashboardLayout />
          </ProtectedRoute>
        }
      />
    </Routes>
  );
}

export default function App() {

  return (
    <AuthProvider>
      <Router>
        <AppRoutes />
      </Router>
    </AuthProvider>
  );

}
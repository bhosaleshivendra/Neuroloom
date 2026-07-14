import "./App.css";

import Header from "../Components/Header";
import Sidebar from "../Components/Navbar";
import Home from "../Components/Home";
import Employees from "../Components/Employees";
import Settings from "../Components/Settings";
import Analytics from "../Components/Analytics";
import Projects from "../Components/Projects";
import AIAssistant from "../Components/AIAssistant";
import LoginSignup from "../Components/Pages/LoginSignup";

import {
  BrowserRouter as Router,
  Routes,
  Route,
} from "react-router-dom";

// Dashboard Layout
const DashboardLayout = () => {
  return (
    <div className="flex h-screen overflow-hidden">
      <Sidebar />

      <div className="flex-1 flex flex-col overflow-hidden">
        <Header />

        <main className="p-6 flex-1 overflow-y-auto">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/employees" element={<Employees />} />
            <Route path="/settings" element={<Settings />} />
            <Route path="/analytics" element={<Analytics />} />
            <Route path="/projects" element={<Projects />} />
          </Routes>

          <AIAssistant />
        </main>
      </div>
    </div>
  );
};

// Auth Layout
const AuthLayout = () => {
  return <LoginSignup />;
};

const App = () => {
  return (
    <Router>
      <Routes>

        {/* Login */}
        <Route path="/sign-in" element={<AuthLayout />} />

        {/* Dashboard */}
        <Route path="/*" element={<DashboardLayout />} />

      </Routes>
    </Router>
  );
};

export default App;
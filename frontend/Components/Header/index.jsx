import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import { useAuth } from "../../src/context/AuthContext.jsx";
import { autobotImages } from "../../src/data/autobots";
import {
  UserCircle,
  User,
  Settings,
  LogOut,
  Bell,
  Cpu,
} from "lucide-react";

import "./index.css";

const Header = ({ workspace }) => {
  const navigate = useNavigate();
  const { user, logout, isAuthenticated } = useAuth();
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  const employees = workspace?.employees || [];

  const handleLogoutClick = () => {
    logout();
    navigate("/sign-in");
  };

  return (
    <header className="h-16 bg-slate-900/60 backdrop-blur-md border-b border-slate-800/80 flex items-center justify-between px-8 relative z-50 select-none">
      {/* Left Section: Breadcrumb / Active Workspace */}
      <div className="flex flex-col">
        <h1 className="text-base font-bold text-slate-100 flex items-center gap-2">
          {workspace ? (
            <>
              <span className="w-2 h-2 rounded-full bg-indigo-500 animate-pulse" />
              {workspace.name}
            </>
          ) : (
            "NeuroLoom Command"
          )}
        </h1>
        <p className="text-[11px] text-slate-400">
          {workspace ? workspace.company : "Secure AI Operating System HQ"}
        </p>
      </div>

      {/* Right Section: Employees Avatars & Auth User */}
      <div className="flex items-center gap-6">
        {/* Active AI Employees Row */}
        {employees.length > 0 && (
          <div className="flex items-center -space-x-1.5 bg-slate-950/40 p-1.5 rounded-full border border-slate-800/60">
            {employees.slice(0, 6).map((employee) => (
              <div key={employee.id} className="relative group">
                <button
                  title={`${employee.name} - ${employee.role}`}
                  className="w-8 h-8 rounded-full bg-slate-800 border-2 border-slate-900 overflow-hidden cursor-pointer hover:scale-110 transition-transform duration-200 flex items-center justify-center relative"
                >
                  <img
                    src={autobotImages[employee.id] || autobotImages.prime}
                    alt={employee.name}
                    className="w-full h-full object-contain p-0.5"
                  />
                  {/* Status Indicator */}
                  <span
                    className={`absolute bottom-0 right-0 w-2.5 h-2.5 rounded-full border border-slate-900 ${
                      employee.status === "WORKING"
                        ? "bg-amber-500 animate-pulse"
                        : "bg-green-500"
                    }`}
                  />
                </button>

                {/* Hover Details Card */}
                <div className="absolute right-0 top-11 min-w-56 bg-slate-900 border border-slate-800 rounded-2xl shadow-2xl p-4 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-300 z-[9999]">
                  <h3 className="text-sm font-bold text-slate-100">{employee.name}</h3>
                  <p className="text-[11px] text-indigo-400 font-semibold mt-0.5">{employee.role}</p>
                  <p className="text-[10px] text-slate-500">{employee.department}</p>
                  <div className="mt-3 flex items-center gap-2 border-t border-slate-800/80 pt-2 text-[10px] text-slate-400">
                    <span className="w-1.5 h-1.5 rounded-full bg-green-400" />
                    Status: {employee.status || "ONLINE"}
                  </div>
                </div>
              </div>
            ))}

            {employees.length > 6 && (
              <div className="w-8 h-8 rounded-full bg-slate-800 border-2 border-slate-900 flex items-center justify-center text-[10px] font-semibold text-slate-400">
                +{employees.length - 6}
              </div>
            )}
          </div>
        )}

        {/* Notifications */}
        <button className="p-2 rounded-xl text-slate-400 hover:text-slate-100 hover:bg-slate-800/40 border border-transparent hover:border-slate-800/40 transition cursor-pointer">
          <Bell size={18} />
        </button>

        {/* User Account Dropdown */}
        {isAuthenticated ? (
          <div className="relative">
            <button
              onClick={() => setIsDropdownOpen(!isDropdownOpen)}
              className="flex items-center rounded-xl p-1 bg-slate-800/30 hover:bg-slate-800/80 border border-slate-800/50 hover:border-slate-700/60 transition cursor-pointer"
            >
              <UserCircle size={30} className="text-slate-300" />
            </button>

            {isDropdownOpen && (
              <div className="absolute right-0 top-12 w-60 bg-slate-900 border border-slate-800 rounded-2xl shadow-[0_20px_50px_rgba(0,0,0,0.5)] overflow-hidden z-[9999]">
                <div className="px-5 py-4 border-b border-slate-800/80 bg-slate-950/20">
                  <p className="font-bold text-slate-200 text-sm leading-none">{user?.username}</p>
                  <p className="text-xs text-slate-500 mt-1 truncate">{user?.email}</p>
                </div>

                <Link
                  to="/settings"
                  onClick={() => setIsDropdownOpen(false)}
                  className="flex items-center gap-3 px-5 py-3.5 hover:bg-slate-800/40 text-xs text-slate-300 transition"
                >
                  <Settings size={14} />
                  Settings & Keys
                </Link>

                <button
                  onClick={handleLogoutClick}
                  className="flex items-center gap-3 w-full px-5 py-3.5 text-red-400 hover:bg-red-950/20 text-xs transition border-t border-slate-800/60 cursor-pointer"
                >
                  <LogOut size={14} />
                  Disconnect Node
                </button>
              </div>
            )}
          </div>
        ) : (
          <button
            onClick={() => navigate("/sign-in")}
            className="bg-indigo-600 hover:bg-indigo-500 text-white px-5 py-2 rounded-xl text-xs font-semibold shadow-md shadow-indigo-600/10 transition cursor-pointer"
          >
            Sign In
          </button>
        )}
      </div>
    </header>
  );
};

export default Header;
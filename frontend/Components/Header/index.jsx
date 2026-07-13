import { Link } from "react-router-dom";
import { UserCircle } from "lucide-react";
import {
  User,
  Settings,
  LogOut,
} from "lucide-react";
import { useState } from "react";
import "./index.css";

const Header = () => {
  const isLoggedIn = true;
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  return (
    <header className="h-10 bg-white border-b border-gray-700 flex items-center justify-between px-6 relative">
      {isLoggedIn ? (
        <div className="ml-auto relative">
          <button
            onClick={() => setIsDropdownOpen(!isDropdownOpen)}
            className="flex items-center gap-2 cursor-pointer"
          >
            <UserCircle size={28} />
          </button>

          {isDropdownOpen && (
            <div className="absolute right-0 top-10 w-56 bg-white rounded-xl shadow-xl border border-gray-200 overflow-hidden z-50">
  <div className="px-4 py-3 border-b">
    <p className="font-semibold">John Doe</p>
    <p className="text-sm text-gray-500">
      john@example.com
    </p>
  </div>

  <Link
    to="/profile"
    className="flex items-center gap-3 px-4 py-3 hover:bg-gray-100 transition-colors"
  >
    <User size={18} />
    Profile
  </Link>

  <Link
    to="/settings"
    className="flex items-center gap-3 px-4 py-3 hover:bg-gray-100 transition-colors"
  >
    <Settings size={18} />
    Settings
  </Link>

  <button className="flex items-center gap-3 w-full px-4 py-3 text-red-600 hover:bg-red-50 transition-colors">
    <LogOut size={18} />
    Logout
  </button>
</div>
          )}
        </div>
      ) : (
        <div className="flex gap-4 ml-auto">
          <Link
            to="/login"
            className="px-2 py-1 rounded-lg bg-red-500 hover:bg-red-600 transition-colors font-bold text-white text-sm"
          >
            Login
          </Link>

          <Link
            to="/signup"
            className="px-2 py-1 rounded-lg bg-blue-600 text-white hover:bg-blue-700 transition-colors font-bold text-sm"
          >
            Sign Up
          </Link>
        </div>
      )}
    </header>
  );
};

export default Header;


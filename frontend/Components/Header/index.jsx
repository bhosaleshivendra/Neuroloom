import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import {
  UserCircle,
  User,
  Settings,
  LogOut,
  Search,
  Bell,
} from "lucide-react";

import "./index.css";

const Header = () => {
  const navigate = useNavigate();

  // Replace later with authentication
  const isLoggedIn = false;

  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  return (
    <header className="h-16 bg-white border-b border-slate-200 flex items-center justify-between px-8">

      {/* Left */}

      <div>
        <h1 className="text-2xl font-bold text-slate-900">
          Dashboard
        </h1>

        <p className="text-sm text-slate-500">
          Welcome back to Neuroloom.
        </p>
      </div>

      {/* Right */}

      <div className="flex items-center gap-4">

        {/* Search */}

        <div className="hidden lg:flex items-center gap-3 bg-slate-100 rounded-xl px-4 py-2 w-72">

          <Search
            size={18}
            className="text-slate-500"
          />

          <input
            type="text"
            placeholder="Search..."
            className="bg-transparent outline-none text-sm w-full"
          />

        </div>

        {/* Notifications */}

        <button className="p-2 rounded-xl hover:bg-slate-100 transition cursor-pointer">

          <Bell
            size={20}
            className="text-slate-600"
          />

        </button>

        {/* User */}

        {isLoggedIn ? (
          <div className="relative">

            <button
              onClick={() => setIsDropdownOpen(!isDropdownOpen)}
              className="flex items-center gap-2 rounded-xl px-2 py-1 hover:bg-slate-100 transition cursor-pointer"
            >
              <UserCircle
                size={34}
                className="text-slate-700"
              />
            </button>

            {isDropdownOpen && (
              <div className="absolute right-0 top-14 w-64 bg-white border border-slate-200 rounded-2xl shadow-lg overflow-hidden z-50">

                <div className="px-5 py-4 border-b border-slate-200">

                  <p className="font-semibold text-slate-900">
                    John Doe
                  </p>

                  <p className="text-sm text-slate-500">
                    john@example.com
                  </p>

                </div>

                <Link
                  to="/profile"
                  className="flex items-center gap-3 px-5 py-3 hover:bg-slate-50 transition"
                >
                  <User size={18} />

                  Profile
                </Link>

                <Link
                  to="/settings"
                  className="flex items-center gap-3 px-5 py-3 hover:bg-slate-50 transition"
                >
                  <Settings size={18} />

                  Settings
                </Link>

                <button className="flex items-center gap-3 w-full px-5 py-3 text-red-500 hover:bg-red-50 transition cursor-pointer">

                  <LogOut size={18} />

                  Logout

                </button>

              </div>
            )}

          </div>
        ) : (
          <button
            onClick={() => navigate("/sign-in")}
            className="bg-indigo-600 hover:bg-indigo-700 text-white px-5 py-2.5 rounded-xl font-semibold transition cursor-pointer"
          >
            Sign In
          </button>
        )}

      </div>

    </header>
  );
};

export default Header;
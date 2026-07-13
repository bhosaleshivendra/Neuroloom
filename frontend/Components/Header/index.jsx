import { Link } from "react-router-dom";
import { UserCircle } from "lucide-react";

const Header = () => {
  const isLoggedIn = true; // Replace with your auth state later

  return (
    <header className="h-10 bg-white flex items-center justify-between px-6">

      {isLoggedIn ? (
        <button className="flex items-center gap-2 ml-auto cursor-pointer">
          <UserCircle size={28} />
        </button>
      ) : (
        <div className="flex gap-4 ml-auto">
          <Link
            to="/login"
            className="px-2 py-1 rounded-lg bg-red-500 hover:bg-red-600  transition-colors font-bold text-white text-sm"
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
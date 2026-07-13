import './index.css';
import { useState } from "react";
import { Link } from "react-router-dom";
import {
  Menu,
  Home,
  LayoutDashboard,
  Settings,
  IdCardLanyard,
  BriefcaseBusiness,
  ChartNoAxesCombined
} from "lucide-react";

const Sidebar=()=> {
  const [isOpen, setIsOpen] = useState(true);

  const menuItems = [
    {
      title: "Home",
      icon: <Home size={20} />,
      path: "/",
    },
    {
      title: "Employees",
      icon: <IdCardLanyard size={20} />,
      path: "/employees",
    },
    
    {
      title: "Projects",
      icon: <BriefcaseBusiness size={20} />,
      path: "/projects",
    },
    {
      title: "Analytics",
      icon: <ChartNoAxesCombined size={20} />,
      path: "/analytics",
    },
    {
      title: "Settings",
      icon: <Settings size={20} />,
      path: "/settings",
    },
  ];

  return (
    <aside
      className={`bg-gray-100 text-gray-500 border border-gray-300 h-screen transition-all duration-300 ${
        isOpen ? "w-50" : "w-15"
      }`}
    >
      {/* Header */}
      <div className={`flex items-center ${isOpen ? "justify-between" : "justify-center"} p-4 border-b border-green-700}`}>
        {isOpen && (
          <Link to="/" className="text-xl font-bold text-green-800">
            NeuroLoom
          </Link>
        )}

        <button
          onClick={() => setIsOpen(!isOpen)}
          className={`p-2 rounded-lg hover:bg-green-500 text-gray-800 transition-colors cursor-pointer `}
        >
          <Menu />
        </button>
      </div>

      {/* Menu */}
      <nav className="mt-5">
        {menuItems.map((item) => (
          <Link
            key={item.title}
            to={item.path}
            className="flex items-center gap-4 px-5 py-3 hover:bg-green-200 transition-colors"
          >
            {item.icon}

            {isOpen && (
              <span className="text-sm font-medium">
                {item.title}
              </span>
            )}
          </Link>
        ))}
      </nav>
    </aside>
  );
}
export default Sidebar;
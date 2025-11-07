import React from "react";
import { Home, Settings, Users } from "lucide-react";
import { Link } from "react-router-dom";

const Sidebar = ({ collapse }) => {
  return (
    <aside
      className={`${
        collapse ? "w-20" : "w-64"
      } min-h-screen bg-gradient-to-b from-black via-gray-900 to-black text-white p-6 hidden md:flex flex-col border-r border-gray-800 transition-all duration-300`}
    >
      <nav className="flex flex-col gap-6 text-gray-400">
        <Link
          to="/"
          className="flex items-center gap-3 text-lg hover:text-red-500 transition-all"
        >
          <Home className="w-5 h-5" />
          {!collapse && <span>Home</span>}
        </Link>

        <Link
          to="/subscriptions"
          className="flex items-center gap-3 text-lg hover:text-red-500 transition-all"
        >
          <Users className="w-5 h-5" />
          {!collapse && <span>Subscriptions</span>}
        </Link>

        <Link
          to="/settings"
          className="flex items-center gap-3 text-lg hover:text-red-500 transition-all"
        >
          <Settings className="w-5 h-5" />
          {!collapse && <span>Settings</span>}
        </Link>
      </nav>
    </aside>
  );
};

export default Sidebar;

import React from "react";
import { Home, Settings, PlayCircle, Subscript, Users } from "lucide-react";
import { Link } from "react-router-dom";

const Sidebar = () => {
  return (
    <aside className="w-64 min-h-screen bg-gradient-to-b from-black via-gray-900 to-black text-white p-6 hidden md:flex flex-col border-r border-gray-800">

      <nav className="flex flex-col gap-5 text-gray-400">
        <Link to="/"
        className="flex items-center gap-3 text-lg hover:text-red-500 transition-all"
        >
          <Home className="w-5 h-5" />
          <span>Home</span>
        </Link>

      <a
  href="#"
  className="flex items-center gap-3 text-lg hover:text-red-500 transition-all"
>
  <Users className="w-5 h-5" />
  <span>Subscriptions</span>
</a>

        <a
          href="#"
          className="flex items-center gap-3 text-lg hover:text-red-500 transition-all"
        >
          <Settings className="w-5 h-5" />
          <span>Settings</span>
        </a>
      </nav>
    </aside>
  );
};

export default Sidebar;

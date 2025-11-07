import React from "react";
import { Home, Settings, Users, X } from "lucide-react";
import { Link } from "react-router-dom";

const Sidebar = ({ sidebarOpen, mobileOpen, setMobileOpen }) => {
  return (
    <>
      {/* Desktop Sidebar */}
      <aside
        className={`hidden md:flex flex-col border-r border-gray-800 text-white bg-gradient-to-b from-black via-gray-900 to-black fixed top-0 left-0 h-full z-40 transition-transform duration-300
        ${sidebarOpen ? "translate-x-0 w-64 p-6" : "-translate-x-full w-64 p-6"}`}
      >
        {/* ✅ Close button for desktop */}
        <button
          onClick={() => setMobileOpen(false)} // you can also handle desktop toggle here
          className="absolute top-4 right-4 md:hidden"
        >
          <X className="w-6 h-6 text-white" />
        </button>

        <nav className="flex flex-col gap-6 text-gray-400 mt-20">
          <Link to="/" className="flex items-center gap-3 text-lg hover:text-red-500 transition-all">
            <Home className="w-5 h-5" />
            <span>Home</span>
          </Link>

          <Link to="/subscriptions" className="flex items-center gap-3 text-lg hover:text-red-500 transition-all">
            <Users className="w-5 h-5" />
            <span>Subscriptions</span>
          </Link>

          <Link to="/settings" className="flex items-center gap-3 text-lg hover:text-red-500 transition-all">
            <Settings className="w-5 h-5" />
            <span>Settings</span>
          </Link>
        </nav>
      </aside>

      {/* Mobile Sidebar */}
      <div
        className={`fixed top-0 left-0 h-full w-64 bg-gradient-to-b from-black via-gray-900 to-black text-white p-6 z-50 transition-transform duration-300 
        ${mobileOpen ? "translate-x-0" : "-translate-x-full"} md:hidden`}
      >
        {/* ✅ Close button */}
        <button
          onClick={() => setMobileOpen(false)}
          className="absolute top-4 right-4"
        >
          <X className="w-6 h-6 text-white" />
        </button>

        <nav className="flex flex-col gap-6 text-gray-400 mt-20">
          <Link to="/" onClick={() => setMobileOpen(false)} className="flex items-center gap-3 text-lg hover:text-red-500 transition-all">
            <Home className="w-5 h-5" />
            <span>Home</span>
          </Link>

          <Link to="/subscriptions" onClick={() => setMobileOpen(false)} className="flex items-center gap-3 text-lg hover:text-red-500 transition-all">
            <Users className="w-5 h-5" />
            <span>Subscriptions</span>
          </Link>

          <Link to="/settings" onClick={() => setMobileOpen(false)} className="flex items-center gap-3 text-lg hover:text-red-500 transition-all">
            <Settings className="w-5 h-5" />
            <span>Settings</span>
          </Link>
        </nav>
      </div>

      {/* Mobile Backdrop */}
      {mobileOpen && (
        <div
          onClick={() => setMobileOpen(false)}
          className="fixed inset-0 bg-black bg-opacity-50 z-40 md:hidden"
        ></div>
      )}
    </>
  );
};

export default Sidebar;

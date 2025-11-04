import React from "react";
import { Home, Settings, PlayCircle, Users } from "lucide-react";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";

const Sidebar = () => {
  const { data, loading } = useSelector((state) => state.user);

  if (loading)
    return <p className="text-white text-center mt-10">Loading...</p>;
  if (!data)
    return <p className="text-white text-center mt-10">No user found. Please log in.</p>;

  return (
    <div className="min-h-screen w-64 bg-linear-to-b from-black via-gray-900 to-black text-white flex flex-col items-center py-10 border-r border-gray-800">
      {/* Profile Section */}
      <div className="flex flex-col items-center mb-12">
        <div className="w-28 h-28 flex items-center justify-center rounded-full bg-gray-800 text-5xl font-bold shadow-lg">
          {data.fullname ? data.fullname.charAt(0).toUpperCase() : "?"}
        </div>

        <h2 className="text-2xl font-semibold mt-4">{data.fullname}</h2>
        <p className="text-gray-400 text-sm mt-1">@{data.username}</p>
      </div>

      {/* Navigation Links */}
      <nav className="flex flex-col gap-6 w-full px-6 text-gray-400">
        <Link
          to="/"
          className="flex items-center gap-4 text-lg hover:text-red-500 transition-all"
        >
          <Home className="w-5 h-5" />
          <span>Dashboard</span>
        </Link>

        <Link
          to="/subscriptions"
          className="flex items-center gap-4 text-lg hover:text-red-500 transition-all"
        >
          <Users className="w-5 h-5" />
          <span>Content</span>
        </Link>

        <Link
          to="/channel-customize"
          className="flex items-center gap-4 text-lg hover:text-red-500 transition-all"
        >
          <PlayCircle className="w-5 h-5" />
          <span>Customization</span>
        </Link>

        <Link
          to="/settings"
          className="flex items-center gap-4 text-lg hover:text-red-500 transition-all"
        >
          <Settings className="w-5 h-5" />
          <span>Settings</span>
        </Link>
      </nav>
    </div>
  );
};

export default Sidebar;

import React from "react";
import {
  ChevronRight,
  History,
  Home,
  PlayCircleIcon,
  Settings,
  ThumbsUp,
  Users,
  Video,
  Watch,
} from "lucide-react";
import { Link, NavLink } from "react-router-dom";

const Sidebar = ({ collapse }) => {
  const navItems = [
    { name: "Home", icon: <Home className="w-5 h-5" />, path: "/" },
    {
      name: "Subscriptions",
      icon: <Users className="w-5 h-5" />,
      path: "/subscriptions",
    },
    {
      name: "history",
      icon: <History className="w-5 h-5" />,
      path: "/History",
    },
    {
      name: "Playlist",
      icon: <PlayCircleIcon className="w-5 h-5" />,
      path: "/Playlist",
    },
    
    {
      name: "your videos",
      icon: <Video className="w-5 h-5" />,
      path: "/content",
    },
    {
      name: "watch later",
      icon: <Watch className="w-5 h-5" />,
      path: "/watchlater",
    },
    {
      name: "Liked-videos",
      icon: <ThumbsUp className="w-5 h-5" />,
      path: "/liked",
    },
    {
      name: "Subscription",
      icon: <Users className="w-5 h-5" />,
      path: "/Subscription",
    },
    {
      name: "Settings",
      icon: <Settings className="w-5 h-5" />,
      path: "/settings",
    },
  ];

  return (
    <>
      <aside
        className={`hidden md:flex flex-col ${
          collapse ? "w-20" : "w-64"
        } min-h-screen bg-linear-to-b from-black via-gray-900 to-black text-white p-6 border-r border-gray-800 transition-all duration-300`}
      >
        <nav className="flex flex-col gap-1 text-white">
          {navItems.map((item) => (
            <React.Fragment key={item.name}>
             <NavLink
  to={item.path}
  className={({ isActive }) =>
    `flex items-center justify-between text-md px-2 py-1.5 rounded-2xl transition-all duration-200 ${
      isActive
        ? "bg-[#1c1c1c] text-white shadow-md"
        : "hover:text-red-400 hover:bg-gray-800"
    }`
  }
>
  <div className="flex items-center gap-2">
    {item.icon}
    {!collapse && <span>{item.name}</span>}
  </div>

  {!collapse && item.name === "Subscription" && (
    <ChevronRight className="w-4 h-4 text-gray-400" />
  )}
</NavLink>


              {item.name === "Subscriptions" && (
                <div className="border-b border-gray-700 my-4"></div>
              )}
             
            </React.Fragment>
          ))}
        </nav>
      </aside>

      <nav className="fixed bottom-0 left-0 w-full bg-gray-900 border-t border-gray-700 flex justify-around items-center p-2 md:hidden z-50">
        {navItems.map((item) => (
         <NavLink
  key={item.name}
  to={item.path}
  className={({ isActive }) =>
              `flex items-center gap-2 text-lg px-3 rounded-xl transition-all duration-200 ${
                isActive
                  ? "bg-red-600 text-white shadow-md"
                  : "hover:text-red-400 hover:bg-gray-800"
              }`
            }
>
  {item.icon}
  {!collapse && <span>{item.name}</span>}
</NavLink>
        ))}
      </nav>
    </>
  );
};

export default Sidebar;

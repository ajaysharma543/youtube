import React from "react";
import { History, Home, PlayCircleIcon, Settings, ThumbsUp, Users, Video } from "lucide-react";
import { Link } from "react-router-dom";

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
      name: "Liked videos",
      icon: <ThumbsUp className="w-5 h-5" />,
      path: "/liked",
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
  <nav className="flex flex-col gap-6 text-gray-400">
    {navItems.map((item) => (
      <React.Fragment key={item.name}>
        <Link
          to={item.path}
          className="flex items-center gap-3 text-lg hover:text-red-500 transition-all"
        >
          {item.icon}
          {!collapse && <span>{item.name}</span>}
        </Link>

        {item.name === "Subscriptions" && (
          <div className="border-b border-gray-700 my-4"></div>
        )}
      </React.Fragment>
    ))}
  </nav>
</aside>


      <nav className="fixed bottom-0 left-0 w-full bg-gray-900 border-t border-gray-700 flex justify-around items-center p-2 md:hidden z-50">
        {navItems.map((item) => (
          <Link
            key={item.name}
            to={item.path}
            className="flex flex-col items-center text-white hover:text-red-500 transition-all"
          >
            {item.icon}
            <span className="text-xs mt-1">{item.name}</span>
          </Link>
        ))}
      </nav>
    </>
  );
};

export default Sidebar;

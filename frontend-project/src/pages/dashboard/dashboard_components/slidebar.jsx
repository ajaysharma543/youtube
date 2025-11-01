import React from "react";

const Sidebar = () => {
  return (
    <aside className="w-64 bg-black p-6 hidden md:flex flex-col">
      <h2 className="text-lg font-semibold mb-6">Menu</h2>
      <nav className="flex flex-col gap-4">
        <a href="#" className="hover:text-red-500">
          Dashboard
        </a>
        <a href="#" className="hover:text-red-500">
          Videos
        </a>
        <a href="#" className="hover:text-red-500">
          Users
        </a>
        <a href="#" className="hover:text-red-500">
          Settings
        </a>
      </nav>
    </aside>
  );
};

export default Sidebar;

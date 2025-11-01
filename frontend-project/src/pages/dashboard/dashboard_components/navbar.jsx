import React from "react";
import { Search } from "lucide-react";
function Navbar() {
  return (
    <header className="border-none shadow-md p-4 flex items-center justify-between">
      <h1 className="text-xl font-bold text-white">My Dashboard</h1>

      {/* Search Box */}
      <div className="relative w-72">
        <Search className="absolute right-3 top-2.5 text-gray-400 w-5 h-5" />
        <input
          type="search"
          placeholder="Search videos..."
          className="w-full bg-black text-white placeholder-gray-400 rounded-lg pl-10 pr-4 py-2 outline-none focus:ring-2 focus:ring-white transition"
        />
      </div>
      <div className="bg-black">
        <h1 className="text-white font-black text-2xl">creaate +</h1>
      </div>
    </header>
  );
}

export default Navbar;

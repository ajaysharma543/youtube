import React, { useEffect, useState } from "react";
import { Search } from "lucide-react";
import authApi from "../../../api/userapi";
import { Link } from "react-router-dom";

function Navbar() {
  const [user, setUser] = useState(null);
  const [showDropdown, setShowDropdown] = useState(false);

  useEffect(() => {
    authApi
      .getcurrentuser()
      .then((res) => setUser(res.data.data))
      .catch((err) => console.log("Failed to fetch user:", err));
  }, []);

  if (!user) return <p>Loading...</p>;

  const handleUploadClick = () => {
    setShowDropdown(false);
  };

  return (
    <header className="border-none shadow-md p-4 flex items-center justify-between bg-black relative">
      <h1 className="text-xl font-bold text-white">{user.fullname}</h1>

      {/* Search Box */}
      <div className="relative w-72">
        <Search className="absolute right-3 top-2.5 text-black w-5 h-5" />
        <input
          type="search"
          placeholder="Search videos..."
          className="w-full bg-black text-white placeholder-gray-800 rounded-lg pl-10 pr-4 py-2 outline-none focus:ring-2 focus:ring-white transition"
        />
      </div>

      {/* Create Dropdown */}
      <div className="relative">
        <button
          onClick={() => setShowDropdown((prev) => !prev)}
          className="bg-black cursor-pointer text-white font-bold text-lg px-4 py-2 rounded-md hover:bg-black transition"
        >
          Create +
        </button>

        {showDropdown && (
          <div className="absolute  right-0 border-white border mt-2 w-40 bg-black text-white rounded-lg shadow-lg">
            <Link to="/upload"
              onClick={handleUploadClick}
              className="block w-full cursor-pointer text-left px-4 py-2 hover:bg-black"
            >
              Upload Video
            </Link>
          </div>
        )}
      </div>
    </header>
  );
}

export default Navbar;

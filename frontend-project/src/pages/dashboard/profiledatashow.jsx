import { useState } from "react";
import Showallvideos from "./showallvideos";

function Profiledatashow({ userId }) {
  const [active, setActive] = useState("home");

  const tabs = [
    { id: "home", label: "Home" },
    { id: "videos", label: "Videos" },
    { id: "playlists", label: "Playlists" }
  ];

  return (
    <div className="mt-8">
      <div className="flex gap-10 border-b border-gray-700 pb-2">
        {tabs.map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActive(tab.id)}
            className={`pb-2 text-lg cursor-pointer font-medium transition-all ${
              active === tab.id
                ? "text-white border-b-2 border-white"
                : "text-gray-400 hover:text-white"
            }`}
          >
            {tab.label}
          </button>
        ))}
      </div>

      <div className="mt-6 text-white text-xl">
        {active === "home" && <p>Home Content</p>}
        {active === "videos" && <Showallvideos userId={userId} />}
        {active === "playlists" && <p>Playlists Content</p>}
      </div>
    </div>
  );
}

export default Profiledatashow;

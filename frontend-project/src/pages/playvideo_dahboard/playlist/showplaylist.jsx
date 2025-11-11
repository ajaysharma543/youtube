import { Save } from "lucide-react";
import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { addVideoToPlaylist } from "../../../redux/features/playlist";

function Showplaylist({ video }) {
  const { list = [], loading } = useSelector((state) => state.playlist || {});
  const dispatch = useDispatch();

  const handleAddToPlaylist = async (playlistId) => {
    try {
      await dispatch(addVideoToPlaylist(playlistId, video._id));
    } catch (error) {
      console.error("Failed to add video:", error);
    }
  };

  if (loading) return <p className="text-gray-400 px-4 py-2">Loading...</p>;

  if (!list || list.length === 0)
    return (
      <p className="text-gray-400 text-sm px-4 py-2">
        No playlists found. Create one below.
      </p>
    );

  return (
    <div className="max-h-60 overflow-y-auto">
      {list.map((playlist) => (
        <button
          key={playlist._id}
          onClick={() => handleAddToPlaylist(playlist._id)}
          className="w-full flex items-center gap-2 text-left px-4 py-2 hover:bg-[#333333] transition-colors"
        >
          <Save className="text-green-400" size={18} />
          <span>🎵 {playlist.name}</span>
        </button>
      ))}
    </div>
  );
}

export default Showplaylist;

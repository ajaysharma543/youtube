import React, { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getUserPlaylists } from "../../../redux/features/playlist";
import playlistApi from "../../../api/playlist";

function Playlist() {
  const { list = [], loading } = useSelector((state) => state.playlist || {});
  const { data: user } = useSelector((state) => state.user);
  const dispatch = useDispatch();
  const dropdownRef = useRef(null);

  const [openDropdownId, setOpenDropdownId] = useState(null);
  const [editingPlaylist, setEditingPlaylist] = useState(null);

  useEffect(() => {
    if (user?._id) {
      dispatch(getUserPlaylists(user._id));
    }
  }, [user, dispatch]);

  useEffect(() => {
    function handleClickOutside(event) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setOpenDropdownId(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleDropdownToggle = (playlistId) => {
    setOpenDropdownId(openDropdownId === playlistId ? null : playlistId);
  };

  const handleEdit = (playlist) => {
    setEditingPlaylist(playlist);
    setOpenDropdownId(null);
  };

  const deleteplaylist = async(playlistId) => {
    const res = await playlistApi.deleteToPlaylist({playlistId})
    console.log(res);
    dispatch(getUserPlaylists(user._id));
  }

  const handleCancelEdit = () => {
    setEditingPlaylist(null);
  };

  if (loading) return <p>Loading...</p>;

  return (
    <div className="flex flex-row flex-wrap gap-4 cursor-pointer py-2" ref={dropdownRef}>
      {list.map((playlist) => {
  const lastUpdated = playlist.updatedAt
    ? new Date(playlist.updatedAt).toLocaleDateString()
    : "Unknown";

  return (
    <div key={playlist._id} className="flex flex-col items-start gap-2 bg-black rounded-2xl relative w-72">
      {/* Thumbnail */}
      <div className="relative w-full h-48 rounded-2xl overflow-hidden flex-shrink-0">
        {playlist.videos && playlist.videos.length > 0 ? (
          <img
            src={playlist.videos[playlist.videos.length - 1].thumbnail.url}
            alt={playlist.name}
            className="w-full h-full object-cover rounded-2xl"
          />
        ) : (
          <div className="w-full h-full bg-black flex items-center justify-center text-white">
            🎵
          </div>
        )}
          {playlist.videos && playlist.videos.length > 0 && (
                <span className="absolute bottom-1 right-1 bg-black bg-opacity-70 text-white text-xs px-1 rounded">
                  {playlist.videos.length} videos
                </span>
              )}
      </div>

      <div className="flex flex-col w-full px-2 relative">
        <h3 className="text-white font-semibold text-md truncate">{playlist.name}</h3>
        <p className="text-white truncate">private: Playlist videos</p>

        {/* Dropdown button */}
        <div
          className="absolute top-0 right-0 text-white text-xl cursor-pointer px-2 py-1"
          onClick={() => handleDropdownToggle(playlist._id)}
        >
          ⋮
        </div>

        {/* Dropdown options */}
        {openDropdownId === playlist._id && (
          <div className="absolute top-6 right-0 bg-gray-800 border border-gray-700 rounded-md shadow-lg w-28 z-10">
            <button
              onClick={() => handleEdit(playlist)}
              className="block w-full text-left px-3 py-2 text-white hover:bg-gray-700 rounded-t-md"
            >
              Edit
            </button>
           <button
  onClick={() => deleteplaylist(playlist._id)}
  className="block w-full text-left px-3 py-2 text-white hover:bg-gray-700 rounded-b-md"
>
  Delete
</button>

          </div>
        )}

        {/* Inline Edit Box */}
        {editingPlaylist?._id === playlist._id && (
          <div className="absolute top-[-130px] right-[-120px] mr-2 bg-gray-900 border border-gray-700 rounded-xl shadow-lg w-80 z-20 p-4">
            <h2 className="text-white font-semibold mb-2">Edit Playlist</h2>

            {playlist.videos && playlist.videos.length > 0 && (
              <img
                src={playlist.videos[playlist.videos.length - 1].thumbnail.url}
                alt="Thumbnail"
                className="w-full h-32 object-cover rounded-lg mb-2"
              />
            )}

            <div className="mb-2">
              <label className="text-white text-sm">Title</label>
              <input
                type="text"
                className="w-full mt-1 p-2 rounded-md bg-gray-800 text-white"
              />
            </div>

            <div className="mb-2">
              <label className="text-white text-sm">Description</label>
              <textarea
                className="w-full mt-1 p-2 rounded-md bg-gray-800 text-white"
                rows={3}
              />
            </div>

            <div className="flex justify-end gap-2 mt-2">
              <button
                onClick={handleCancelEdit}
                className="px-3 py-1 bg-gray-700 text-white rounded-md hover:bg-gray-600"
              >
                Cancel
              </button>
              <button
                onClick={() => console.log("Save clicked")}
                className="px-3 py-1 bg-red-600 text-white rounded-md hover:bg-red-500"
              >
                Save
              </button>
            </div>
          </div>
        )}

        <p className="text-gray-400 text-sm mt-1">Last updated: {lastUpdated}</p>
        <p className="text-white text-sm mt-1 cursor-pointer">View full playlist</p>
      </div>
    </div>
  );
})}

    </div>
  );
}

export default Playlist;

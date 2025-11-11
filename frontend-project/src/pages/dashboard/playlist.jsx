import React from "react";
import { useSelector } from "react-redux";

function Playlist() {
  const { list = [], loading } = useSelector((state) => state.playlist || {});
  console.log(list);

  if (loading) return <p>Loading...</p>;
  if (!list.length) return <p>No playlists found.</p>;

  return (
    <div className="flex flex-row gap-4 cursor-pointer overflow-x-auto py-2">
      {list.map((playlist) => {
        const lastUpdated = playlist.updatedAt
          ? new Date(playlist.updatedAt).toLocaleDateString()
          : "Unknown";

        return (
          <div
            key={playlist._id}
            className="flex flex-col items-start justify-start gap-2 bg-black rounded-2xl relative w-72"
          >
            <div className="relative w-full h-48 rounded-2xl overflow-hidden flex-shrink-0">
              {playlist.videos && playlist.videos.length > 0 ? (
                <img
                  src={
                    playlist.videos[playlist.videos.length - 1].thumbnail.url
                  }
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

            {/* Playlist Info */}
            <div className="flex flex-col w-full px-2">
              <h3 className="text-white font-semibold text-md truncate">
                {playlist.name}
              </h3>
               <div className="absolute bottom-10 right-1 text-white text-xl cursor-pointer">
                ⋮
              </div>
              <p className="text-gray-400 text-sm mt-1">Last updated: {lastUpdated}</p>
              <p className="text-white text-sm mt-1 cursor-pointer ">
                View full playlist
              </p>
            </div>
           
          </div>
        );
      })}
    </div>
  );
}

export default Playlist;

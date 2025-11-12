import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import authApi from "../../api/userapi";
import Playlist from "../playvideo_dahboard/playlist/playlist";

function History() {
  const [history, setHistory] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchHistory = async () => {
      try {
        const res = await authApi.getwatchhistory();
        setHistory(res.data.data);
      } catch (error) {
        console.error(error);
      }
    };
    fetchHistory();
  }, []);

  // Format video duration
  const formatDuration = (seconds) => {
    const hrs = Math.floor(seconds / 3600);
    const mins = Math.floor((seconds % 3600) / 60);
    const secs = Math.floor(seconds % 60);
    return hrs > 0
      ? `${hrs}:${mins.toString().padStart(2, "0")}:${secs
          .toString()
          .padStart(2, "0")}`
      : `${mins}:${secs.toString().padStart(2, "0")}`;
  };

  // Truncate description
  const truncateDescription = (desc, maxWords = 100) => {
    if (!desc) return "";
    const words = desc.split(" ");
    if (words.length <= maxWords) return desc;
    return words.slice(0, maxWords).join(" ") + " ...";
  };

  // Handle video click
  const handleVideoClick = (id) => {
    navigate(`/video/${id}`);
  };

  // Group videos by date
  const groupByDate = (videos) => {
    const today = new Date();
    const yesterday = new Date();
    yesterday.setDate(today.getDate() - 1);

    const grouped = { Today: [], Yesterday: [], Earlier: [] };

    videos.forEach((video) => {
      const watchedDate = new Date(video.createdAt); // Make sure API has watchedAt
      if (watchedDate.toDateString() === today.toDateString()) {
        grouped.Today.push(video);
      } else if (watchedDate.toDateString() === yesterday.toDateString()) {
        grouped.Yesterday.push(video);
      } else {
        grouped.Earlier.push(video);
      }
    });

    return grouped;
  };

  const groupedHistory = groupByDate(history);

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-6 text-white">Watch History</h1>

      {history.length === 0 ? (
        <p className="text-black">No watch history found.</p>
      ) : (
        <div className="flex flex-col gap-8">
          {Object.entries(groupedHistory).map(
            ([group, videos]) =>
              videos.length > 0 && (
                <div key={group}>
                  <h2 className="text-white font-semibold text-lg mb-4">
                    {group}
                  </h2>

                  <div className="flex flex-col gap-6 w-[60%]">
                    {videos.map((video) => (
                      <div
                        key={video._id}
                        onClick={() => handleVideoClick(video._id)}
                        className="bg-black flex overflow-visible cursor-pointer transition-all rounded-2xl hover:bg-black relative"
                      >
                        <div className="relative w-52 aspect-video rounded-2xl overflow-hidden">
                          <img
                            src={video.thumbnail.url}
                            alt={video.title}
                            className="w-full h-full object-cover"
                          />
                          <div className="absolute bottom-2 right-2 bg-black bg-opacity-80 text-white text-xs px-2 py-1 rounded">
                            {formatDuration(video.duration)}
                          </div>
                        </div>

                        {/* Video info */}
                        <div className="p-4 flex flex-col gap-2">
                          <h3 className="text-white font-semibold text-lg truncate">
                            {video.title}
                          </h3>
                          <div className="flex gap-2 text-black text-sm">
                            <p>{video.owner?.fullname}</p>
                            <span>·</span>
                            <p>{video.views} views</p>
                          </div>
                          {video.description && (
                            <p className="text-black text-sm mt-1">
                              {truncateDescription(video.description, 100)}
                            </p>
                          )}
                        </div>

                        {/* Playlist menu */}
                        <div
                          onClick={(e) => e.stopPropagation()}
                          className="absolute top-2 right-2 z-50"
                        >
                          <Playlist video={video} />
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )
          )}
        </div>
      )}
    </div>
  );
}

export default History;

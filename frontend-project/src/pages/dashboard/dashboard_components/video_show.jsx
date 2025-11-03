import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import authApi from "../../../api/userapi";

const VideoCard = ({ video }) => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);

  const handleClick = () => {
    authApi.getcurrentuser()
    .then((video)=>console.log("🎬 Video clicked:", video))
    .catch(() => {
 setLoading(true);
      setTimeout(() => {
        setLoading(false);
        navigate("/signup");
      }, 2000);
    })
  };

  const getTimeAgo = (dateString) => {
    const now = new Date();
    const created = new Date(dateString);
    const diffInSeconds = Math.floor((now - created) / 1000);

    const intervals = {
      year: 31536000,
      month: 2592000,
      week: 604800,
      day: 86400,
      hour: 3600,
      minute: 60,
      second: 1,
    };

    for (const [unit, seconds] of Object.entries(intervals)) {
      const count = Math.floor(diffInSeconds / seconds);
      if (count >= 1) {
        return `${count} ${unit}${count > 1 ? "s" : ""} ago`;
      }
    }
    return "just now";
  };

  const uploadTime = getTimeAgo(video.createdAt);

  return (
    <>
      {loading && (
        <div className="fixed inset-0 bg-black bg-opacity-80 flex items-center justify-center z-50">
          <div className="flex flex-col items-center">
            <div className="w-12 h-12 border-4 border-white border-t-transparent rounded-full animate-spin"></div>
            <p className="text-white mt-4 text-lg">Redirecting to Signup...</p>
          </div>
        </div>
      )}

      <div
        onClick={handleClick}
        className="bg-black border-black border-2  rounded-2xl overflow-hidden shadow-md hover:shadow-lg transition cursor-pointer"
      >
        <img
          src={video.thumbnail.url}
          alt={video.title}
          className="w-full h-48 object-cover "
        />
        <div className="p-3">
          <h3 className="text-white font-semibold text-lg truncate">
            {video.title}
          </h3>

          <div className="flex items-center gap-2 mt-2">
            <img
              src={video.owner?.avatar?.url}
              alt={video.owner?.username}
              className="w-6 h-6 rounded-full"
            />
            <span className="text-gray-300 text-sm">{video.owner?.username}</span>
          </div>

          <div className="flex pl-2 items-center mt-3 text-gray-400 text-sm">
            <span className="pl-2">{video.views} views  .</span>
            <span className="pl-2">{uploadTime}</span>
          </div>
        </div>
      </div>
    </>
  );
};

export default VideoCard;

import React, { useEffect } from "react";
import { Play, Edit, Trash2, Upload } from "lucide-react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom"; // ✅ for navigation
import { fetchUserVideos } from "../../../redux/features/fetchvideoslice";

const timeAgo = (dateString) => {
  const date = new Date(dateString);
  const now = new Date();
  const seconds = Math.floor((now - date) / 1000);

  const intervals = {
    year: 31536000,
    month: 2592000,
    week: 604800,
    day: 86400,
    hour: 3600,
    minute: 60,
  };

  for (const [unit, value] of Object.entries(intervals)) {
    const interval = Math.floor(seconds / value);
    if (interval >= 1)
      return `${interval} ${unit}${interval > 1 ? "s" : ""} ago`;
  }

  return "just now";
};

function ShowAllVideos() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { videos, loading } = useSelector((state) => state.videos);
  useEffect(() => {
    dispatch(fetchUserVideos());
  }, [dispatch]);

  const handleUploadClick = () => {
    navigate("/upload"); // ✅ go to your upload page route
  };

  return (
    <div className="h-screen flex flex-col text-white bg-[#0f0f0f]">
      {/* Top Header */}
      <header className="h-[10%] flex flex-col justify-center items-start px-6">
        <h1 className="text-3xl font-bold">Channel Content</h1>
      </header>

      {/* Sub-header */}
      <header className="h-[5%] flex flex-col justify-center items-start border-b border-gray-700 px-6">
        <h1 className="text-xl font-semibold">Videos</h1>
      </header>

      {/* Main Section */}
      <main className="flex-1 overflow-y-auto px-6 py-4 space-y-3">
        {loading ? (
          <div className="text-gray-400 text-lg text-center mt-10">
            Loading videos...
          </div>
        ) : videos.length === 0 ? (
          <div className="text-gray-400 text-lg text-center mt-10">
            No published videos found.
          </div>
        ) : (
          <div className="space-y-4">
            {/* Table Header */}
            <div className="grid grid-cols-[50px_120px_1fr_100px_140px_120px_100px] text-gray-400 text-sm font-semibold border-b border-gray-700 pb-2">
              <span></span>
              <span>Thumbnail</span>
              <span>Title & Description</span>
              <span>Edit</span>
              <span>Created At</span>
              <span>Status</span>
              <span>Delete</span>
            </div>

            {/* Video Rows */}
            {videos.map((v) => (
              <div
                key={v._id}
                className="grid grid-cols-[50px_120px_1fr_100px_140px_120px_100px] items-center bg-[#181818] hover:bg-[#202020] transition rounded-lg p-2"
              >
                {/* Select */}
                <div className="flex justify-center">
                  <input type="checkbox" className="w-4 h-4 accent-red-600" />
                </div>

                {/* Thumbnail */}
                <div className="relative group">
                  <img
                    src={v.thumbnail?.url}
                    alt={v.title}
                    className="w-24 h-16 object-cover rounded-md"
                  />
                  <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 flex items-center justify-center transition">
                    <Play className="w-5 h-5 text-white" />
                  </div>
                </div>

                {/* Title + Description */}
                <div>
                  <h3 className="text-white font-semibold truncate">
                    {v.title}
                  </h3>
                  <p className="text-gray-400 text-sm truncate">
                    {v.description || "No description available"}
                  </p>
                </div>

                {/* Edit Button */}
                <div className="flex justify-center">
                  <button
                    onClick={() => navigate(`/edit_video/${v._id}`)}
                    className="flex items-center gap-1 text-blue-400 hover:text-blue-300 transition"
                  >
                    <Edit size={18} /> Edit
                  </button>
                </div>

                {/* Created At */}
                <div className="text-gray-300 text-sm text-center">
                  {timeAgo(v.createdAt)}
                </div>

                {/* Publish Status */}
                <div className="text-center">
                  {v.isPublished ? (
                    <span className="text-green-500 font-semibold">
                      Published
                    </span>
                  ) : (
                    <span className="text-yellow-500 font-semibold">Draft</span>
                  )}
                </div>

                {/* Delete Button */}
                <div className="flex justify-center">
                  <button className="text-red-500 hover:text-red-400 transition">
                    <Trash2 size={18} />
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* ✅ Upload Button at the End */}
        <div className="flex justify-end mt-6">
          <button
            onClick={handleUploadClick}
            className="flex items-center gap-2 bg-red-600 hover:bg-red-700 px-5 py-2 rounded-lg font-semibold transition"
          >
            <Upload size={18} />
            Upload Video
          </button>
        </div>
      </main>
    </div>
  );
}

export default ShowAllVideos;

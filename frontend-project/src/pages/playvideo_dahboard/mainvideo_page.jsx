import React, { useEffect, useRef, useState } from "react";
import { useParams } from "react-router-dom";
import VideoApi from "../../api/videoapi";

function Mainvideo_page() {
  const { videoId } = useParams();
  const [video, setVideo] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const videoRef = useRef(null);

  useEffect(() => {
    const fetchVideo = async () => {
      setLoading(true);
      setError(null);
      setVideo(null);
      try {
        const res = await VideoApi.getVideoById(videoId);
        setVideo(res.data.data);
        console.log("Video owner:", res.data.data.owner);
      } catch (err) {
        console.error("Error fetching video:", err);
        setError("You must be logged in to view this video.");
      } finally {
        setLoading(false);
      }
    };
    fetchVideo();
  }, [videoId]);

  if (loading)
    return (
      <div className="min-h-screen flex items-center justify-center bg-black text-white">
        <div className="flex flex-col items-center">
          <div className="w-12 h-12 border-4 border-gray-500 border-t-transparent rounded-full animate-spin mb-4"></div>
          <p>Loading video...</p>
        </div>
      </div>
    );

  if (error)
    return (
      <div className="min-h-screen flex items-center justify-center bg-black text-red-500">
        {error}
      </div>
    );

  if (!video) return null;

  return (
    <div className="flex justify-center gap-5 p-5">
      {/* Left section: Video + info */}
      <div className="w-[70%]">
        {/* Video player */}
        <div className="bg-black p-5 border-2 border-gray-800 rounded-3xl mb-4">
          <div className="relative w-full max-w-4xl mx-auto group">
            <video
              ref={videoRef}
              src={video.videoFile.url}
              className="w-full rounded-lg h-[450px] bg-black cursor-pointer"
              controls
              autoPlay
            />
            <style>{`
              video::-webkit-media-controls {
                opacity: 0;
                transition: opacity 0.3s;
              }
              .group:hover video::-webkit-media-controls {
                opacity: 1;
              }
            `}</style>
          </div>
        </div>

        {/* Video title */}
        <h1 className="text-white text-2xl font-bold mb-3">{video.title}</h1>

      <div className="flex items-center justify-between mb-4">
  {/* Left side: Owner info + Subscribe */}
  <div className="flex items-center gap-3">
    <img
      src={video.owner?.avatar?.url || "/default-avatar.png"}
      alt={video.owner?.fullname || "User"}
      className="w-12 h-12 rounded-full"
    />
    <div>
      <h2 className="text-white font-semibold">
        {video.owner?.fullname || "Unknown"}
      </h2>
      <p className="text-gray-400 text-sm">
        {video.owner?.subscriberscount || 0} subscribers
      </p>
    </div>
    <button className="bg-white text-black px-4 py-2 cursor-pointer rounded-4xl ml-4">
      {video.issubscribed ? "Subscribed" : "Subscribe"}
    </button>
  </div>

  {/* Right side: Like / Dislike / Download */}
  <div className="flex items-end justify-center">
    <div className="flex items-center bg-[#564c4c] rounded-4xl overflow-hidden mr-2">
    <button className="flex items-center justify-center text-white px-4 py-2">
      👍 Like {video.likes || 0}
    </button>
    <span className="w-px bg-[#564c4c] h-6 mx-1">|</span>
    <button className="flex items-center justify-center text-white px-4 py-2">
      👎 Dislike {video.dislikes || 0}
    </button> 
  </div>
     <button
      onClick={() => window.open(video.videoFile.url, "_blank")}
      className="flex items-center justify-center bg-[#564c4c] rounded-4xl text-white px-4 py-2"
    >
      ⬇️ Download
    </button>
  </div>
</div>
      </div>

      <div className="w-[30%] flex flex-col gap-4">
       
      </div>
    </div>
  );
}

export default Mainvideo_page;

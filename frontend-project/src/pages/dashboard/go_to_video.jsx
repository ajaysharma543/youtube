import { useParams } from "react-router-dom";
import React, { useEffect, useState } from "react";
import VideoApi from "../../api/videoapi";

const VideoDetails = () => {
  const { videoId } = useParams();
  const [video, setVideo] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchVideo = async () => {
      try {
        const res = await VideoApi.getVideoById(videoId);
        setVideo(res.data.data);
      } catch (err) {
        console.error("Error fetching video:", err);
        setError("You must be logged in to view this video.");
      }
    };
    fetchVideo();
  }, [videoId]);

  if (error) return <p className="text-red-500 text-center">{error}</p>;
  if (!video) return <p className="text-white text-center">Loading...</p>;

  return (
    <div className="p-6 text-white bg-black">
      <h1 className="text-2xl font-bold mb-4">{video.title}</h1>
      <video
        src={video.videoFile.url}
        controls
        className="w-full rounded-lg autoplay"
      ></video>
      <p className="mt-4 text-gray-300">{video.description}</p>
    </div>
  );
};

export default VideoDetails;

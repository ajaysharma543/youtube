import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import VideoApi from "../../api/videoapi";
import VideoCard from "./dashboard_components/video_show";

function Dashboard() {
  const [video, setVideo] = useState([]);
  const [loading, setLoading] = useState(false);
  const {query} = useSelector((state) => state.videos)
  const { data: user } = useSelector((state) => state.user);

    const fetchVideos = async () => {
      setLoading(true);
      try {
        const videos = await VideoApi.getallvideos({ page: 1, limit: 10 });
     const filteredVideos = user
  ? videos.data.data.docs.filter((vid) => vid.owner._id !== user._id)
  : videos.data.data.docs;
        setVideo(filteredVideos);
      } catch (error) {
        console.log("video not showing", error.response?.data || error.message);
      } finally {
        setLoading(false);
      }
    };

  useEffect(() => {
  fetchVideos();
}, []);

const displayedVideos = video.filter((v) => {
  const titleMatch = v.title?.toLowerCase().includes(query.toLowerCase());
  const descMatch = v.description?.toLowerCase().includes(query.toLowerCase());
  const useridmatch = v.owner._id?.toLowerCase().includes(query.toLowerCase());
  const usernamematch = v.owner.username?.toLowerCase().includes(query.toLowerCase());
  return titleMatch || descMatch || useridmatch || usernamematch ;
});


  if (loading) {
    return (
      <div className="text-white text-center mt-10">Loading videos...</div>
    );
  }

  return (
    <div className="p-6 min-h-screen bg-black text-white">
      {Array.isArray(video) && video.length === 0 ? (
        <p>No Video Found</p>
      ) : (
        <div className="grid sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {displayedVideos.map((item) => (
            <VideoCard key={item._id} video={item} />
          ))}
        </div>
      )}
    </div>
  );
}

export default Dashboard;

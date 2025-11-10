import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import VideoApi from "../../api/videoapi";
import VideoCard from "./dashboard_components/video_show";

function Dashboard() {
  const [video, setVideo] = useState([]);
  const [loading, setLoading] = useState(false);
  const { query } = useSelector((state) => state.videos);
  const { data: user, loading: userLoading } = useSelector(
    (state) => state.user
  );

  useEffect(() => {
    // ✅ Fetch videos only after user data is known (including null)
    if (userLoading) return;

    const fetchVideos = async () => {
      setLoading(true);
      try {
        const res = await VideoApi.getallvideos({ page: 1, limit: 10 });
        const allVideos = res.data.data.docs;

        // ✅ Always filter based on current user (even if null)
        const filteredVideos =
          user && user._id
            ? allVideos.filter((vid) => vid.owner._id !== user._id)
            : allVideos;
        // console.log(filteredVideos);

        setVideo(filteredVideos);
      } catch (error) {
        console.log("video not showing", error.response?.data || error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchVideos();
  }, [userLoading, user?._id]);

  if (loading) {
    return (
      <div className="text-white text-center mt-10">Loading videos...</div>
    );
  }

  const displayedVideos = video.filter((v) => {
    const queryLower = query.toLowerCase();
    return (
      v.title?.toLowerCase().includes(queryLower) ||
      v.description?.toLowerCase().includes(queryLower) ||
      v.owner._id?.toLowerCase().includes(queryLower) ||
      v.owner.username?.toLowerCase().includes(queryLower)
    );
  });

  return (
    <div className="p-6 min-h-screen bg-black text-white">
      {displayedVideos.length === 0 ? (
        <p>No Video Found</p>
      ) : (
        <div className="grid sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {displayedVideos.map((item) => (
            <VideoCard key={item._id} video={item} />
          ))}
        </div>
      )}
    </div>
  );
}

export default Dashboard;

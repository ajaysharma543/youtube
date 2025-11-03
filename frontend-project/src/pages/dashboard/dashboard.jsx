import React, { useEffect, useState } from 'react'
import VideoApi from '../../api/videoapi';
import VideoCard from './dashboard_components/video_show';

function Dashboard() {
const [video, setvideo] = useState([]);
const [loading, setLoading] = useState(false)

useEffect(() => {
  const fetchvideo = async () => {
    setLoading(true);
    try {
      const videos = await VideoApi.getallvideos({ page: 1, limit: 10 });
      setvideo(videos.data.data.docs);
      // console.log(videos);
    } catch (error) {
      console.log("video not showing",error.response?.data || error.message);
    }
    setLoading(false);
  };
  fetchvideo();
},[])

  if (loading) {
    return <div className="text-white text-center mt-10">Loading videos...</div>;
  }
  return (
    <div className='p-6 min-h-screen bg-black text-white'>
      {Array.isArray(video) && video.length === 0 ? (
  <p>No Video Found</p>
) : (
  <div className="grid sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
    {Array.isArray(video) &&
      video.map((item) => (
        <VideoCard key={item._id} video={item} />
      ))}
  </div>
)}
    </div>
  )
}

export default Dashboard
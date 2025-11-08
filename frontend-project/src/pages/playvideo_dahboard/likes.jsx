import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { setlikeState, togglelikeFailure, togglelikes } from "../../redux/features/likes";

function Likes({ video }) {
  const { data: user } = useSelector((state) => state.user);
  const { isliked, loading, error } = useSelector((state) => state.like);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [likesCount, setLikesCount] = useState(video?.likesCount || 0);

  useEffect(() => {
    dispatch(setlikeState(video?.isLiked || false));
    setLikesCount(video?.likesCount || 0);
  }, [video, dispatch]);

  const handleLikes = async () => {
    if (!user?._id) {
      navigate("/login");
      return;
    }

    try {
      const liked = await dispatch(togglelikes(video._id));
      dispatch(setlikeState(liked));

      setLikesCount((prev) => (liked ? prev + 1 : prev - 1));
      console.log("Liked video:", liked);
    } catch (err) {
      console.log("Like failed:", err.response?.data || err.message);
      dispatch(togglelikeFailure());
    }
  };

  if (error) return <p>Something went wrong. Please try again.</p>;

  return (
    <div className="flex items-center bg-[#564c4c] rounded-4xl overflow-hidden mr-2">
      <button
        onClick={handleLikes}
        disabled={loading}
        className={`flex cursor-pointer items-center justify-center text-white px-4 py-2 ${
          isliked ? "bg-[#564c4c]" : "bg-[#564c4c]"
        }`}
      >
        👍 {isliked ? "Liked" : "Like"} {likesCount}
      </button>

      <span className="w-px bg-[#564c4c] h-6 mx-1">|</span>

      <button className="flex items-center justify-center text-white px-4 py-2">
        👎 Dislike {video.dislikes || 0}
      </button>
    </div>
  );
}
export default Likes;

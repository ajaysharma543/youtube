import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { setlikeState, togglelikeFailure, togglelikes } from "../../redux/features/likes";
import Dislikes from "./dislike";
import { setdislikeState } from "../../redux/features/disliked";

function Likes({ video }) {
  const { data: user } = useSelector((state) => state.user);
  const { isLiked, likeCount, loading, error } = useSelector((state) => state.like);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    dispatch(setlikeState({ 
      isLiked: video?.isLiked || false, 
      likeCount: video?.likeCount || 0 
    }));
  }, [video, dispatch]);

  const handleLikes = async () => {
    if (!user?._id) return navigate("/login");

    try {
      const { isLiked, likeCount, dislikeCount } = await dispatch(togglelikes(video._id))
            dispatch(setlikeState({ isLiked, likeCount }));
      dispatch(setdislikeState({ isDisliked: false, dislikeCount })); // reset dislike
    } catch (err) {
      console.log("Like failed:", err);
      dispatch(togglelikeFailure(err.message));
    }
  };

  if (error) return <p>Something went wrong. Please try again.</p>;

  return (
    <div className="flex items-center  rounded-4xl overflow-hidden pl-1 pr-1">
      <button
        onClick={handleLikes}
        disabled={loading}
        className={`flex cursor-pointer items-center justify-center text-white pl-2 py-2`}
      >
         {isLiked ? "👍" : "like"}
      </button>

      <span className="text-white ml-2">{likeCount}</span>
      <span className="w-px bg-[#aaa] h-6 ml-2" />
      <Dislikes video={video} />
    </div>
  );
}

export default Likes;
